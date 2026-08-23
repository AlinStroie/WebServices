import express from "express";

import { prisma } from "../../lib/prisma.js";
import { createAuditLog } from "../../lib/auditLog.js";
import { validate } from "../../middleware/validate.js";
import { asyncHandler } from "../../middleware/asyncHandler.js";
import { requireAdmin } from "../../middleware/requireAdmin.js";
import {
  createCaseStudySchema,
  updateCaseStudySchema,
  updateCaseStudyStatusSchema,
} from "../../validators/admin/casestudy.schema.js";

const router = express.Router();

router.use(requireAdmin);

function normalizePublishedAt(status, value) {
  if (value) {
    return new Date(value);
  }

  if (status === "PUBLISHED") {
    return new Date();
  }

  return null;
}

// GET /api/admin/case-studies
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
              { title: { contains: search, mode: "insensitive" } },
              { slug: { contains: search, mode: "insensitive" } },
              { description: { contains: search, mode: "insensitive" } },
            ],
          }
        : {}),
    };

    const [items, total] = await Promise.all([
      prisma.caseStudy.findMany({
        where,
        orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
        skip,
        take: limit,
        select: {
          id: true,
          slug: true,
          title: true,
          description: true,
          status: true,
          featured: true,
          publishedAt: true,
          createdAt: true,
          updatedAt: true,
        },
      }),
      prisma.caseStudy.count({ where }),
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

// GET /api/admin/case-studies/:id
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const item = await prisma.caseStudy.findUnique({
      where: { id: req.params.id },
    });

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Studiul de caz nu a fost găsit.",
      });
    }

    return res.json({
      success: true,
      data: item,
    });
  })
);

// POST /api/admin/case-studies
router.post(
  "/",
  validate(createCaseStudySchema),
  asyncHandler(async (req, res) => {
    const data = req.validatedBody;

    const created = await prisma.caseStudy.create({
      data: {
        slug: data.slug,
        kicker: data.kicker,
        title: data.title,
        description: data.description,
        role: data.role,
        timeline: data.timeline,
        overview: data.overview,
        challengeIntro: data.challengeIntro,
        challengePoints: data.challengePoints,
        approach: data.approach,
        solution: data.solution,
        results: data.results,
        gallery: data.gallery,
        stats: data.stats,
        status: data.status,
        featured: Boolean(data.featured),
        metaTitle: data.metaTitle || data.title,
        metaDescription: data.metaDescription || data.description,
        publishedAt: normalizePublishedAt(data.status, data.publishedAt),
      },
    });

    await createAuditLog({
      req,
      action: "CASE_STUDY_CREATED",
      entity: "CaseStudy",
      entityId: created.id,
      metadata: { title: created.title, status: created.status },
    });

    return res.status(201).json({
      success: true,
      data: created,
    });
  })
);

// PATCH /api/admin/case-studies/:id
router.patch(
  "/:id",
  validate(updateCaseStudySchema),
  asyncHandler(async (req, res) => {
    const existing = await prisma.caseStudy.findUnique({
      where: { id: req.params.id },
    });

    if (!existing) {
      return res.status(404).json({
        success: false,
        message: "Studiul de caz nu a fost găsit.",
      });
    }

    const data = req.validatedBody;

    const updated = await prisma.caseStudy.update({
      where: { id: existing.id },
      data: {
        ...(data.slug !== undefined ? { slug: data.slug } : {}),
        ...(data.kicker !== undefined ? { kicker: data.kicker } : {}),
        ...(data.title !== undefined ? { title: data.title } : {}),
        ...(data.description !== undefined
          ? { description: data.description }
          : {}),
        ...(data.role !== undefined ? { role: data.role } : {}),
        ...(data.timeline !== undefined ? { timeline: data.timeline } : {}),
        ...(data.overview !== undefined ? { overview: data.overview } : {}),
        ...(data.challengeIntro !== undefined
          ? { challengeIntro: data.challengeIntro }
          : {}),
        ...(data.challengePoints !== undefined
          ? { challengePoints: data.challengePoints }
          : {}),
        ...(data.approach !== undefined ? { approach: data.approach } : {}),
        ...(data.solution !== undefined ? { solution: data.solution } : {}),
        ...(data.results !== undefined ? { results: data.results } : {}),
        ...(data.gallery !== undefined ? { gallery: data.gallery } : {}),
        ...(data.stats !== undefined ? { stats: data.stats } : {}),
        ...(data.status !== undefined ? { status: data.status } : {}),
        ...(data.featured !== undefined
          ? { featured: Boolean(data.featured) }
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
      },
    });

    await createAuditLog({
      req,
      action: "CASE_STUDY_UPDATED",
      entity: "CaseStudy",
      entityId: updated.id,
      metadata: { title: updated.title, status: updated.status },
    });

    return res.json({
      success: true,
      data: updated,
    });
  })
);

// PATCH /api/admin/case-studies/:id/status
router.patch(
  "/:id/status",
  validate(updateCaseStudyStatusSchema),
  asyncHandler(async (req, res) => {
    const { status } = req.validatedBody;

    const existing = await prisma.caseStudy.findUnique({
      where: { id: req.params.id },
      select: { id: true, title: true, status: true },
    });

    if (!existing) {
      return res.status(404).json({
        success: false,
        message: "Studiul de caz nu a fost găsit.",
      });
    }

    const updated = await prisma.caseStudy.update({
      where: { id: existing.id },
      data: {
        status,
        ...(status === "PUBLISHED" ? { publishedAt: new Date() } : {}),
      },
    });

    await createAuditLog({
      req,
      action: "CASE_STUDY_STATUS_UPDATED",
      entity: "CaseStudy",
      entityId: updated.id,
      metadata: { from: existing.status, to: updated.status },
    });

    return res.json({
      success: true,
      data: updated,
    });
  })
);

// DELETE /api/admin/case-studies/:id
// Nu ștergem direct — îl arhivăm, mai sigur pentru producție.
router.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    const existing = await prisma.caseStudy.findUnique({
      where: { id: req.params.id },
      select: { id: true, title: true, status: true },
    });

    if (!existing) {
      return res.status(404).json({
        success: false,
        message: "Studiul de caz nu a fost găsit.",
      });
    }

    const updated = await prisma.caseStudy.update({
      where: { id: existing.id },
      data: { status: "ARCHIVED" },
    });

    await createAuditLog({
      req,
      action: "CASE_STUDY_ARCHIVED",
      entity: "CaseStudy",
      entityId: updated.id,
      metadata: { title: updated.title },
    });

    return res.json({
      success: true,
      message: "Studiul de caz a fost arhivat.",
      data: updated,
    });
  })
);

export default router;
