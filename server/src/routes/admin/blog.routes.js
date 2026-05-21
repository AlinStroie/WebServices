import express from "express";
import { nanoid } from "nanoid";

import { prisma } from "../../lib/prisma.js";
import { createAuditLog } from "../../lib/auditLog.js";
import { validate } from "../../middleware/validate.js";
import { asyncHandler } from "../../middleware/asyncHandler.js";
import { requireAdmin } from "../../middleware/requireAdmin.js";
import {
  createBlogPostSchema,
  updateBlogPostSchema,
  updateBlogStatusSchema,
} from "../../validators/admin/blog.schema.js";

const router = express.Router();

router.use(requireAdmin);

function slugify(value) {
  return String(value)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ă/g, "a")
    .replace(/â/g, "a")
    .replace(/î/g, "i")
    .replace(/ș/g, "s")
    .replace(/ş/g, "s")
    .replace(/ț/g, "t")
    .replace(/ţ/g, "t")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 200);
}

async function makeUniqueSlug(baseSlug, ignoredId = null) {
  const cleanBase = slugify(baseSlug) || `articol-${nanoid(6)}`;
  let slug = cleanBase;
  let index = 1;

  while (true) {
    const existing = await prisma.blogPost.findUnique({
      where: { slug },
      select: { id: true },
    });

    if (!existing || existing.id === ignoredId) {
      return slug;
    }

    index += 1;
    slug = `${cleanBase}-${index}`;
  }
}

function normalizeContent(content) {
  if (typeof content === "string") {
    return content;
  }

  return JSON.stringify(content);
}

function normalizePublishedAt(status, value) {
  if (value) {
    return new Date(value);
  }

  if (status === "PUBLISHED") {
    return new Date();
  }

  return null;
}

// GET /api/admin/blog
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const status = req.query.status;
    const search = req.query.search;
    const page = Math.max(Number(req.query.page || 1), 1);
    const limit = Math.min(Math.max(Number(req.query.limit || 20), 1), 100);
    const skip = (page - 1) * limit;

    const where = {
      ...(status && status !== "ALL" ? { status } : {}),
      ...(search
        ? {
            OR: [
              {
                title: {
                  contains: search,
                  mode: "insensitive",
                },
              },
              {
                slug: {
                  contains: search,
                  mode: "insensitive",
                },
              },
              {
                excerpt: {
                  contains: search,
                  mode: "insensitive",
                },
              },
            ],
          }
        : {}),
    };

    const [items, total] = await Promise.all([
      prisma.blogPost.findMany({
        where,
        orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
        skip,
        take: limit,
        select: {
          id: true,
          title: true,
          slug: true,
          excerpt: true,
          coverImage: true,
          status: true,
          featured: true,
          readingMinutes: true,
          publishedAt: true,
          createdAt: true,
          updatedAt: true,
          category: {
            select: {
              id: true,
              name: true,
              slug: true,
            },
          },
        },
      }),
      prisma.blogPost.count({ where }),
    ]);

    return res.json({
      success: true,
      data: {
        items,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
        },
      },
    });
  })
);

// GET /api/admin/blog/:id
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const post = await prisma.blogPost.findUnique({
      where: {
        id: req.params.id,
      },
      include: {
        category: true,
        tags: true,
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
  "/",
  validate(createBlogPostSchema),
  asyncHandler(async (req, res) => {
    const data = req.validatedBody;

    const slug = await makeUniqueSlug(data.slug || data.title);

    const created = await prisma.blogPost.create({
      data: {
        title: data.title,
        slug,
        excerpt: data.excerpt,
        content: normalizeContent(data.content),
        coverImage: data.coverImage || null,
        status: data.status,
        featured: Boolean(data.featured),
        readingMinutes: data.readingMinutes,
        metaTitle: data.metaTitle || data.title,
        metaDescription: data.metaDescription || data.excerpt,
        publishedAt: normalizePublishedAt(data.status, data.publishedAt),

        ...(data.categoryId
          ? {
              categoryId: data.categoryId,
            }
          : {}),
      },
    });

    await createAuditLog({
      req,
      action: "BLOG_POST_CREATED",
      entity: "BlogPost",
      entityId: created.id,
      metadata: {
        title: created.title,
        status: created.status,
      },
    });

    return res.status(201).json({
      success: true,
      data: created,
    });
  })
);

// PATCH /api/admin/blog/:id
router.patch(
  "/:id",
  validate(updateBlogPostSchema),
  asyncHandler(async (req, res) => {
    const existing = await prisma.blogPost.findUnique({
      where: {
        id: req.params.id,
      },
    });

    if (!existing) {
      return res.status(404).json({
        success: false,
        message: "Articolul nu a fost găsit.",
      });
    }

    const data = req.validatedBody;

    const nextSlug =
      data.slug || data.title
        ? await makeUniqueSlug(data.slug || data.title, existing.id)
        : existing.slug;

    const updated = await prisma.blogPost.update({
      where: {
        id: existing.id,
      },
      data: {
        ...(data.title !== undefined ? { title: data.title } : {}),
        ...(nextSlug !== existing.slug ? { slug: nextSlug } : {}),
        ...(data.excerpt !== undefined ? { excerpt: data.excerpt } : {}),
        ...(data.content !== undefined
          ? { content: normalizeContent(data.content) }
          : {}),
        ...(data.coverImage !== undefined
          ? { coverImage: data.coverImage || null }
          : {}),
        ...(data.status !== undefined ? { status: data.status } : {}),
        ...(data.featured !== undefined
          ? { featured: Boolean(data.featured) }
          : {}),
        ...(data.readingMinutes !== undefined
          ? { readingMinutes: data.readingMinutes }
          : {}),
        ...(data.metaTitle !== undefined
          ? { metaTitle: data.metaTitle || null }
          : {}),
        ...(data.metaDescription !== undefined
          ? { metaDescription: data.metaDescription || null }
          : {}),
        ...(data.publishedAt !== undefined
          ? {
              publishedAt: data.publishedAt ? new Date(data.publishedAt) : null,
            }
          : {}),
        ...(data.categoryId !== undefined
          ? {
              categoryId: data.categoryId || null,
            }
          : {}),
      },
    });

    await createAuditLog({
      req,
      action: "BLOG_POST_UPDATED",
      entity: "BlogPost",
      entityId: updated.id,
      metadata: {
        title: updated.title,
        status: updated.status,
      },
    });

    return res.json({
      success: true,
      data: updated,
    });
  })
);

// PATCH /api/admin/blog/:id/status
router.patch(
  "/:id/status",
  validate(updateBlogStatusSchema),
  asyncHandler(async (req, res) => {
    const { status } = req.validatedBody;

    const existing = await prisma.blogPost.findUnique({
      where: {
        id: req.params.id,
      },
      select: {
        id: true,
        title: true,
        status: true,
      },
    });

    if (!existing) {
      return res.status(404).json({
        success: false,
        message: "Articolul nu a fost găsit.",
      });
    }

    const updated = await prisma.blogPost.update({
      where: {
        id: existing.id,
      },
      data: {
        status,
        ...(status === "PUBLISHED"
          ? {
              publishedAt: new Date(),
            }
          : {}),
      },
    });

    await createAuditLog({
      req,
      action: "BLOG_POST_STATUS_UPDATED",
      entity: "BlogPost",
      entityId: updated.id,
      metadata: {
        from: existing.status,
        to: updated.status,
      },
    });

    return res.json({
      success: true,
      data: updated,
    });
  })
);

// DELETE /api/admin/blog/:id
// Nu ștergem direct articolul. Îl arhivăm.
// Este mai sigur pentru producție.
router.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    const existing = await prisma.blogPost.findUnique({
      where: {
        id: req.params.id,
      },
      select: {
        id: true,
        title: true,
        status: true,
      },
    });

    if (!existing) {
      return res.status(404).json({
        success: false,
        message: "Articolul nu a fost găsit.",
      });
    }

    const updated = await prisma.blogPost.update({
      where: {
        id: existing.id,
      },
      data: {
        status: "ARCHIVED",
      },
    });

    await createAuditLog({
      req,
      action: "BLOG_POST_ARCHIVED",
      entity: "BlogPost",
      entityId: updated.id,
      metadata: {
        title: updated.title,
      },
    });

    return res.json({
      success: true,
      message: "Articolul a fost arhivat.",
      data: updated,
    });
  })
);

export default router;