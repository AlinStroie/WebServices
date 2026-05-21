import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import rateLimit from "express-rate-limit";
import { z } from "zod";

import { prisma } from "../lib/prisma.js";
import { env, isProduction } from "../config/env.js";
import { asyncHandler } from "../middleware/asyncHandler.js";
import { requireAdmin } from "../middleware/requireAdmin.js";

const router = express.Router();

const ADMIN_COOKIE_NAME = "admin_token";
const ADMIN_SESSION_HOURS = 8;

const adminLoginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 8,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Prea multe încercări de login. Încearcă din nou mai târziu.",
  },
});

function getAdminCookieOptions() {
  return {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    maxAge: ADMIN_SESSION_HOURS * 60 * 60 * 1000,
    path: "/",
  };
}

function createAdminToken(admin) {
  return jwt.sign(
    {
      id: admin.id,
      email: admin.email,
      role: admin.role,
    },
    env.JWT_SECRET,
    {
      expiresIn: `${ADMIN_SESSION_HOURS}h`,
    }
  );
}

const loginSchema = z.object({
  email: z.string().email("Email invalid."),
  password: z.string().min(8, "Parola trebuie să aibă minim 8 caractere."),
});

const blogPostSchema = z.object({
  title: z.string().min(3),
  slug: z.string().min(3).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  excerpt: z.string().optional().nullable(),
  content: z.string().min(20),
  coverImage: z.string().url().optional().nullable().or(z.literal("")),
  status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]).default("DRAFT"),
  featured: z.boolean().default(false),
  readingMinutes: z.number().int().positive().optional().nullable(),
  metaTitle: z.string().optional().nullable(),
  metaDescription: z.string().optional().nullable(),
  categoryId: z.string().optional().nullable(),
  tagIds: z.array(z.string()).optional().default([]),
});

const contactStatusSchema = z.object({
  status: z.enum(["NEW", "READ", "REPLIED", "ARCHIVED"]),
});

function calculateReadingMinutes(content) {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 220));
}

function getDateRange(days = 30) {
  const to = new Date();
  const from = new Date();
  from.setDate(to.getDate() - days);

  return { from, to };
}

/* ------------------------- AUTH ------------------------- */

// POST /api/admin/auth/login
router.post(
  "/auth/login",
  adminLoginLimiter,
  asyncHandler(async (req, res) => {
    const parsed = loginSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        message: "Date de login invalide.",
        errors: parsed.error.flatten().fieldErrors,
      });
    }

    const { email, password } = parsed.data;

    const admin = await prisma.adminUser.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (!admin || !admin.active) {
      return res.status(401).json({
        success: false,
        message: "Email sau parolă incorectă.",
      });
    }

    const passwordOk = await bcrypt.compare(password, admin.passwordHash);

    if (!passwordOk) {
      return res.status(401).json({
        success: false,
        message: "Email sau parolă incorectă.",
      });
    }

    await prisma.adminUser.update({
      where: { id: admin.id },
      data: { lastLoginAt: new Date() },
    });

    const token = createAdminToken(admin);

    res.cookie(ADMIN_COOKIE_NAME, token, getAdminCookieOptions());

    return res.json({
      success: true,
      message: "Autentificare reușită.",
      data: {
        id: admin.id,
        email: admin.email,
        role: admin.role,
      },
    });
  })
);

// GET /api/admin/auth/me
router.get(
  "/auth/me",
  requireAdmin(),
  asyncHandler(async (req, res) => {
    return res.json({
      success: true,
      data: req.admin,
    });
  })
);

// POST /api/admin/auth/logout
router.post(
  "/auth/logout",
  requireAdmin(),
  asyncHandler(async (req, res) => {
    res.clearCookie(ADMIN_COOKIE_NAME, {
      ...getAdminCookieOptions(),
      maxAge: 0,
    });

    return res.json({
      success: true,
      message: "Ai fost delogat.",
    });
  })
);

/* ------------------------- DASHBOARD ------------------------- */

// GET /api/admin/dashboard
router.get(
  "/dashboard",
  requireAdmin(),
  asyncHandler(async (req, res) => {
    const { from } = getDateRange(30);

    const [
      totalPosts,
      publishedPosts,
      draftPosts,
      totalLeads,
      newLeads,
      totalSessions,
      totalEvents,
      recentLeads,
      topPages,
      topBlogPosts,
      ctaClicks,
      contactSuccess,
    ] = await Promise.all([
      prisma.blogPost.count(),
      prisma.blogPost.count({ where: { status: "PUBLISHED" } }),
      prisma.blogPost.count({ where: { status: "DRAFT" } }),

      prisma.contactSubmission.count(),
      prisma.contactSubmission.count({ where: { status: "NEW" } }),

      prisma.analyticsSession.count({
        where: { startedAt: { gte: from } },
      }),

      prisma.analyticsEvent.count({
        where: { createdAt: { gte: from } },
      }),

      prisma.contactSubmission.findMany({
        orderBy: { createdAt: "desc" },
        take: 5,
        select: {
          id: true,
          name: true,
          email: true,
          selectedPlan: true,
          status: true,
          createdAt: true,
        },
      }),

      prisma.analyticsEvent.groupBy({
        by: ["path"],
        where: {
          type: "PAGE_VIEW",
          createdAt: { gte: from },
          path: { not: null },
        },
        _count: { id: true },
        orderBy: { _count: { id: "desc" } },
        take: 5,
      }),

      prisma.analyticsEvent.groupBy({
        by: ["path"],
        where: {
          type: "BLOG_VIEW",
          createdAt: { gte: from },
          path: { not: null },
        },
        _count: { id: true },
        orderBy: { _count: { id: "desc" } },
        take: 5,
      }),

      prisma.analyticsEvent.count({
        where: {
          type: "CTA_CLICK",
          createdAt: { gte: from },
        },
      }),

      prisma.analyticsEvent.count({
        where: {
          type: "CONTACT_SUCCESS",
          createdAt: { gte: from },
        },
      }),
    ]);

    return res.json({
      success: true,
      data: {
        cards: {
          totalPosts,
          publishedPosts,
          draftPosts,
          totalLeads,
          newLeads,
          totalSessionsLast30Days: totalSessions,
          totalEventsLast30Days: totalEvents,
          ctaClicksLast30Days: ctaClicks,
          contactSuccessLast30Days: contactSuccess,
        },
        recentLeads,
        topPages,
        topBlogPosts,
      },
    });
  })
);

/* ------------------------- BLOG CRUD ------------------------- */

// GET /api/admin/blog
router.get(
  "/blog",
  requireAdmin(),
  asyncHandler(async (req, res) => {
    const page = Math.max(Number(req.query.page) || 1, 1);
    const limit = Math.min(Math.max(Number(req.query.limit) || 10, 1), 50);
    const skip = (page - 1) * limit;

    const status = req.query.status;
    const search = req.query.search;

    const where = {
      ...(status && ["DRAFT", "PUBLISHED", "ARCHIVED"].includes(status)
        ? { status }
        : {}),
      ...(search
        ? {
            OR: [
              { title: { contains: search, mode: "insensitive" } },
              { excerpt: { contains: search, mode: "insensitive" } },
              { slug: { contains: search, mode: "insensitive" } },
            ],
          }
        : {}),
    };

    const [posts, total] = await Promise.all([
      prisma.blogPost.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
        include: {
          category: true,
          tags: {
            include: {
              tag: true,
            },
          },
        },
      }),
      prisma.blogPost.count({ where }),
    ]);

    return res.json({
      success: true,
      data: posts,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  })
);

// GET /api/admin/blog/:id
router.get(
  "/blog/:id",
  requireAdmin(),
  asyncHandler(async (req, res) => {
    const post = await prisma.blogPost.findUnique({
      where: { id: req.params.id },
      include: {
        category: true,
        tags: {
          include: {
            tag: true,
          },
        },
      },
    });

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Articolul nu a fost găsit.",
      });
    }

    return res.json({
      success: true,
      data: post,
    });
  })
);

// POST /api/admin/blog
router.post(
  "/blog",
  requireAdmin(["OWNER", "ADMIN", "EDITOR"]),
  asyncHandler(async (req, res) => {
    const parsed = blogPostSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        message: "Date articol invalide.",
        errors: parsed.error.flatten().fieldErrors,
      });
    }

    const data = parsed.data;

    const post = await prisma.blogPost.create({
      data: {
        title: data.title,
        slug: data.slug,
        excerpt: data.excerpt || null,
        content: data.content,
        coverImage: data.coverImage || null,
        status: data.status,
        featured: data.featured,
        readingMinutes:
          data.readingMinutes || calculateReadingMinutes(data.content),
        metaTitle: data.metaTitle || null,
        metaDescription: data.metaDescription || null,
        publishedAt: data.status === "PUBLISHED" ? new Date() : null,
        categoryId: data.categoryId || null,
        tags: {
          create: data.tagIds.map((tagId) => ({
            tag: {
              connect: { id: tagId },
            },
          })),
        },
      },
      include: {
        category: true,
        tags: {
          include: {
            tag: true,
          },
        },
      },
    });

    return res.status(201).json({
      success: true,
      message: "Articol creat.",
      data: post,
    });
  })
);

// PUT /api/admin/blog/:id
router.put(
  "/blog/:id",
  requireAdmin(["OWNER", "ADMIN", "EDITOR"]),
  asyncHandler(async (req, res) => {
    const parsed = blogPostSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        message: "Date articol invalide.",
        errors: parsed.error.flatten().fieldErrors,
      });
    }

    const existing = await prisma.blogPost.findUnique({
      where: { id: req.params.id },
    });

    if (!existing) {
      return res.status(404).json({
        success: false,
        message: "Articolul nu a fost găsit.",
      });
    }

    const data = parsed.data;

    const post = await prisma.$transaction(async (tx) => {
      await tx.blogPostTag.deleteMany({
        where: { postId: req.params.id },
      });

      return tx.blogPost.update({
        where: { id: req.params.id },
        data: {
          title: data.title,
          slug: data.slug,
          excerpt: data.excerpt || null,
          content: data.content,
          coverImage: data.coverImage || null,
          status: data.status,
          featured: data.featured,
          readingMinutes:
            data.readingMinutes || calculateReadingMinutes(data.content),
          metaTitle: data.metaTitle || null,
          metaDescription: data.metaDescription || null,
          publishedAt:
            existing.status !== "PUBLISHED" && data.status === "PUBLISHED"
              ? new Date()
              : existing.publishedAt,
          categoryId: data.categoryId || null,
          tags: {
            create: data.tagIds.map((tagId) => ({
              tag: {
                connect: { id: tagId },
              },
            })),
          },
        },
        include: {
          category: true,
          tags: {
            include: {
              tag: true,
            },
          },
        },
      });
    });

    return res.json({
      success: true,
      message: "Articol actualizat.",
      data: post,
    });
  })
);

// DELETE /api/admin/blog/:id
router.delete(
  "/blog/:id",
  requireAdmin(["OWNER", "ADMIN"]),
  asyncHandler(async (req, res) => {
    const existing = await prisma.blogPost.findUnique({
      where: { id: req.params.id },
    });

    if (!existing) {
      return res.status(404).json({
        success: false,
        message: "Articolul nu a fost găsit.",
      });
    }

    await prisma.blogPost.delete({
      where: { id: req.params.id },
    });

    return res.json({
      success: true,
      message: "Articol șters.",
    });
  })
);

/* ------------------------- BLOG CATEGORIES / TAGS ------------------------- */

// GET /api/admin/blog-categories
router.get(
  "/blog-categories",
  requireAdmin(),
  asyncHandler(async (req, res) => {
    const categories = await prisma.blogCategory.findMany({
      orderBy: { name: "asc" },
    });

    return res.json({
      success: true,
      data: categories,
    });
  })
);

// GET /api/admin/blog-tags
router.get(
  "/blog-tags",
  requireAdmin(),
  asyncHandler(async (req, res) => {
    const tags = await prisma.blogTag.findMany({
      orderBy: { name: "asc" },
    });

    return res.json({
      success: true,
      data: tags,
    });
  })
);

/* ------------------------- LEADS ------------------------- */

// GET /api/admin/leads
router.get(
  "/leads",
  requireAdmin(),
  asyncHandler(async (req, res) => {
    const page = Math.max(Number(req.query.page) || 1, 1);
    const limit = Math.min(Math.max(Number(req.query.limit) || 10, 1), 50);
    const skip = (page - 1) * limit;

    const status = req.query.status;
    const search = req.query.search;

    const where = {
      ...(status && ["NEW", "READ", "REPLIED", "ARCHIVED"].includes(status)
        ? { status }
        : {}),
      ...(search
        ? {
            OR: [
              { name: { contains: search, mode: "insensitive" } },
              { email: { contains: search, mode: "insensitive" } },
              { selectedPlan: { contains: search, mode: "insensitive" } },
            ],
          }
        : {}),
    };

    const [leads, total] = await Promise.all([
      prisma.contactSubmission.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.contactSubmission.count({ where }),
    ]);

    return res.json({
      success: true,
      data: leads,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  })
);

// PATCH /api/admin/leads/:id/status
router.patch(
  "/leads/:id/status",
  requireAdmin(),
  asyncHandler(async (req, res) => {
    const parsed = contactStatusSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        message: "Status invalid.",
      });
    }

    const lead = await prisma.contactSubmission.update({
      where: { id: req.params.id },
      data: {
        status: parsed.data.status,
      },
    });

    return res.json({
      success: true,
      message: "Status actualizat.",
      data: lead,
    });
  })
);

// DELETE /api/admin/leads/:id
router.delete(
  "/leads/:id",
  requireAdmin(["OWNER", "ADMIN"]),
  asyncHandler(async (req, res) => {
    await prisma.contactSubmission.delete({
      where: { id: req.params.id },
    });

    return res.json({
      success: true,
      message: "Cerere ștearsă.",
    });
  })
);

/* ------------------------- ANALYTICS ------------------------- */

// GET /api/admin/analytics/summary?days=30
router.get(
  "/analytics/summary",
  requireAdmin(),
  asyncHandler(async (req, res) => {
    const days = Math.min(Math.max(Number(req.query.days) || 30, 1), 365);
    const { from } = getDateRange(days);

    const [
      sessions,
      events,
      conversions,
      pageViews,
      blogViews,
      ctaClicks,
      pricingClicks,
      contactOpens,
      contactSubmits,
      contactSuccess,
      byDevice,
      byBrowser,
      bySource,
      topPages,
      topEvents,
    ] = await Promise.all([
      prisma.analyticsSession.count({
        where: { startedAt: { gte: from } },
      }),

      prisma.analyticsEvent.count({
        where: { createdAt: { gte: from } },
      }),

      prisma.analyticsSession.count({
        where: {
          startedAt: { gte: from },
          convertedAt: { not: null },
        },
      }),

      prisma.analyticsEvent.count({
        where: { type: "PAGE_VIEW", createdAt: { gte: from } },
      }),

      prisma.analyticsEvent.count({
        where: { type: "BLOG_VIEW", createdAt: { gte: from } },
      }),

      prisma.analyticsEvent.count({
        where: { type: "CTA_CLICK", createdAt: { gte: from } },
      }),

      prisma.analyticsEvent.count({
        where: { type: "PRICING_CLICK", createdAt: { gte: from } },
      }),

      prisma.analyticsEvent.count({
        where: { type: "CONTACT_OPEN", createdAt: { gte: from } },
      }),

      prisma.analyticsEvent.count({
        where: { type: "CONTACT_SUBMIT", createdAt: { gte: from } },
      }),

      prisma.analyticsEvent.count({
        where: { type: "CONTACT_SUCCESS", createdAt: { gte: from } },
      }),

      prisma.analyticsSession.groupBy({
        by: ["deviceType"],
        where: { startedAt: { gte: from } },
        _count: { id: true },
        orderBy: { _count: { id: "desc" } },
      }),

      prisma.analyticsSession.groupBy({
        by: ["browser"],
        where: { startedAt: { gte: from } },
        _count: { id: true },
        orderBy: { _count: { id: "desc" } },
      }),

      prisma.analyticsSession.groupBy({
        by: ["utmSource"],
        where: { startedAt: { gte: from } },
        _count: { id: true },
        orderBy: { _count: { id: "desc" } },
        take: 10,
      }),

      prisma.analyticsEvent.groupBy({
        by: ["path"],
        where: {
          type: "PAGE_VIEW",
          createdAt: { gte: from },
          path: { not: null },
        },
        _count: { id: true },
        orderBy: { _count: { id: "desc" } },
        take: 10,
      }),

      prisma.analyticsEvent.groupBy({
        by: ["type"],
        where: { createdAt: { gte: from } },
        _count: { id: true },
        orderBy: { _count: { id: "desc" } },
      }),
    ]);

    const conversionRate =
      sessions > 0 ? Number(((conversions / sessions) * 100).toFixed(2)) : 0;

    return res.json({
      success: true,
      data: {
        range: {
          days,
          from,
          to: new Date(),
        },
        totals: {
          sessions,
          events,
          conversions,
          conversionRate,
          pageViews,
          blogViews,
          ctaClicks,
          pricingClicks,
          contactOpens,
          contactSubmits,
          contactSuccess,
        },
        breakdowns: {
          byDevice,
          byBrowser,
          bySource,
          topPages,
          topEvents,
        },
      },
    });
  })
);

export default router;