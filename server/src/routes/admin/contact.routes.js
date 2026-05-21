import express from "express";

import { prisma } from "../../lib/prisma.js";
import { createAuditLog } from "../../lib/auditLog.js";
import { validate } from "../../middleware/validate.js";
import { asyncHandler } from "../../middleware/asyncHandler.js";
import { requireAdmin } from "../../middleware/requireAdmin.js";
import { updateContactStatusSchema } from "../../validators/admin/contact.schema.js";

const router = express.Router();

router.use(requireAdmin);

// GET /api/admin/contact-submissions
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const status = req.query.status;
    const search = req.query.search;
    const page = Math.max(Number(req.query.page || 1), 1);
    const limit = Math.min(Math.max(Number(req.query.limit || 20), 1), 100);
    const skip = (page - 1) * limit;

    const where = {
      ...(status && status !== "ALL"
        ? {
            status,
          }
        : {}),
      ...(search
        ? {
            OR: [
              {
                name: {
                  contains: search,
                  mode: "insensitive",
                },
              },
              {
                email: {
                  contains: search,
                  mode: "insensitive",
                },
              },
              {
                phone: {
                  contains: search,
                  mode: "insensitive",
                },
              },
              {
                selectedPlan: {
                  contains: search,
                  mode: "insensitive",
                },
              },
            ],
          }
        : {}),
    };

    const [items, total] = await Promise.all([
      prisma.contactSubmission.findMany({
        where,
        orderBy: {
          createdAt: "desc",
        },
        skip,
        take: limit,
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          selectedPlan: true,
          status: true,
          sourcePage: true,
          utmSource: true,
          utmMedium: true,
          utmCampaign: true,
          emailSent: true,
          createdAt: true,
          updatedAt: true,
        },
      }),
      prisma.contactSubmission.count({
        where,
      }),
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

// GET /api/admin/contact-submissions/:id
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const submission = await prisma.contactSubmission.findUnique({
      where: {
        id: req.params.id,
      },
    });

    if (!submission) {
      return res.status(404).json({
        success: false,
        message: "Cererea nu a fost găsită.",
      });
    }

    return res.json({
      success: true,
      data: submission,
    });
  })
);

// PATCH /api/admin/contact-submissions/:id/status
router.patch(
  "/:id/status",
  validate(updateContactStatusSchema),
  asyncHandler(async (req, res) => {
    const { status } = req.validatedBody;

    const existing = await prisma.contactSubmission.findUnique({
      where: {
        id: req.params.id,
      },
      select: {
        id: true,
        status: true,
      },
    });

    if (!existing) {
      return res.status(404).json({
        success: false,
        message: "Cererea nu a fost găsită.",
      });
    }

    const updated = await prisma.contactSubmission.update({
      where: {
        id: req.params.id,
      },
      data: {
        status,
      },
    });

    await createAuditLog({
      req,
      action: "CONTACT_STATUS_UPDATED",
      entity: "ContactSubmission",
      entityId: updated.id,
      metadata: {
        from: existing.status,
        to: status,
      },
    });

    return res.json({
      success: true,
      data: updated,
    });
  })
);

export default router;