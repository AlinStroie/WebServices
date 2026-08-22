import express from "express";

import { prisma } from "../../lib/prisma.js";
import { asyncHandler } from "../../middleware/asyncHandler.js";
import { requireAdmin } from "../../middleware/requireAdmin.js";

const router = express.Router();

router.use(requireAdmin);

// GET /api/admin/dashboard
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const [
      totalContacts,
      newContacts,
      repliedContacts,
      totalCaseStudies,
      publishedCaseStudies,
      draftCaseStudies,
      totalSessions,
      convertedSessions,
      totalEvents,
    ] = await Promise.all([
      prisma.contactSubmission.count(),
      prisma.contactSubmission.count({
        where: {
          status: "NEW",
        },
      }),
      prisma.contactSubmission.count({
        where: {
          status: "REPLIED",
        },
      }),
      prisma.caseStudy.count(),
      prisma.caseStudy.count({
        where: {
          status: "PUBLISHED",
        },
      }),
      prisma.caseStudy.count({
        where: {
          status: "DRAFT",
        },
      }),
      prisma.analyticsSession.count(),
      prisma.analyticsSession.count({
        where: {
          convertedAt: {
            not: null,
          },
        },
      }),
      prisma.analyticsEvent.count(),
    ]);

    const conversionRate =
      totalSessions > 0
        ? Number(((convertedSessions / totalSessions) * 100).toFixed(2))
        : 0;

    const latestContacts = await prisma.contactSubmission.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 5,
      select: {
        id: true,
        name: true,
        email: true,
        selectedPlan: true,
        status: true,
        createdAt: true,
      },
    });

    const latestCaseStudies = await prisma.caseStudy.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 5,
      select: {
        id: true,
        title: true,
        slug: true,
        status: true,
        publishedAt: true,
        createdAt: true,
      },
    });

    return res.json({
      success: true,
      data: {
        stats: {
          totalContacts,
          newContacts,
          repliedContacts,
          totalCaseStudies,
          publishedCaseStudies,
          draftCaseStudies,
          totalSessions,
          convertedSessions,
          totalEvents,
          conversionRate,
        },
        latestContacts,
        latestCaseStudies,
      },
    });
  })
);

export default router;
