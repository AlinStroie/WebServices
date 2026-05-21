import express from "express";

import { prisma } from "../../lib/prisma.js";
import { asyncHandler } from "../../middleware/asyncHandler.js";
import { requireAdmin } from "../../middleware/requireAdmin.js";

const router = express.Router();

router.use(requireAdmin);

// GET /api/admin/analytics/overview
router.get(
  "/overview",
  asyncHandler(async (req, res) => {
    const days = Math.min(Math.max(Number(req.query.days || 30), 1), 365);

    const fromDate = new Date();
    fromDate.setDate(fromDate.getDate() - days);

    const [
      sessions,
      convertedSessions,
      pageViews,
      blogViews,
      ctaClicks,
      pricingClicks,
      contactOpens,
      contactSuccess,
      outboundClicks,
      topPages,
      topBlogPosts,
      topCtas,
      topUtmSources,
      selectedPlans,
    ] = await Promise.all([
      prisma.analyticsSession.count({
        where: {
          startedAt: {
            gte: fromDate,
          },
        },
      }),

      prisma.analyticsSession.count({
        where: {
          startedAt: {
            gte: fromDate,
          },
          convertedAt: {
            not: null,
          },
        },
      }),

      prisma.analyticsEvent.count({
        where: {
          type: "PAGE_VIEW",
          createdAt: {
            gte: fromDate,
          },
        },
      }),

      prisma.analyticsEvent.count({
        where: {
          type: "BLOG_VIEW",
          createdAt: {
            gte: fromDate,
          },
        },
      }),

      prisma.analyticsEvent.count({
        where: {
          type: "CTA_CLICK",
          createdAt: {
            gte: fromDate,
          },
        },
      }),

      prisma.analyticsEvent.count({
        where: {
          type: "PRICING_CLICK",
          createdAt: {
            gte: fromDate,
          },
        },
      }),

      prisma.analyticsEvent.count({
        where: {
          type: "CONTACT_OPEN",
          createdAt: {
            gte: fromDate,
          },
        },
      }),

      prisma.analyticsEvent.count({
        where: {
          type: "CONTACT_SUCCESS",
          createdAt: {
            gte: fromDate,
          },
        },
      }),

      prisma.analyticsEvent.count({
        where: {
          type: "OUTBOUND_CLICK",
          createdAt: {
            gte: fromDate,
          },
        },
      }),

      prisma.analyticsEvent.groupBy({
        by: ["path"],
        where: {
          type: "PAGE_VIEW",
          path: {
            not: null,
          },
          createdAt: {
            gte: fromDate,
          },
        },
        _count: {
          path: true,
        },
        orderBy: {
          _count: {
            path: "desc",
          },
        },
        take: 10,
      }),

      prisma.analyticsEvent.groupBy({
        by: ["label"],
        where: {
          type: "BLOG_VIEW",
          label: {
            not: null,
          },
          createdAt: {
            gte: fromDate,
          },
        },
        _count: {
          label: true,
        },
        orderBy: {
          _count: {
            label: "desc",
          },
        },
        take: 10,
      }),

      prisma.analyticsEvent.groupBy({
        by: ["label"],
        where: {
          type: "CTA_CLICK",
          label: {
            not: null,
          },
          createdAt: {
            gte: fromDate,
          },
        },
        _count: {
          label: true,
        },
        orderBy: {
          _count: {
            label: "desc",
          },
        },
        take: 10,
      }),

      prisma.analyticsSession.groupBy({
        by: ["utmSource"],
        where: {
          utmSource: {
            not: null,
          },
          startedAt: {
            gte: fromDate,
          },
        },
        _count: {
          utmSource: true,
        },
        orderBy: {
          _count: {
            utmSource: "desc",
          },
        },
        take: 10,
      }),

      prisma.contactSubmission.groupBy({
        by: ["selectedPlan"],
        where: {
          selectedPlan: {
            not: null,
          },
          createdAt: {
            gte: fromDate,
          },
        },
        _count: {
          selectedPlan: true,
        },
        orderBy: {
          _count: {
            selectedPlan: "desc",
          },
        },
        take: 10,
      }),
    ]);

    const conversionRate =
      sessions > 0
        ? Number(((convertedSessions / sessions) * 100).toFixed(2))
        : 0;

    return res.json({
      success: true,
      data: {
        range: {
          days,
          from: fromDate,
          to: new Date(),
        },
        totals: {
          sessions,
          convertedSessions,
          conversionRate,
          pageViews,
          blogViews,
          ctaClicks,
          pricingClicks,
          contactOpens,
          contactSuccess,
          outboundClicks,
        },
        topPages: topPages.map((item) => ({
          path: item.path,
          count: item._count.path,
        })),
        topBlogPosts: topBlogPosts.map((item) => ({
          slug: item.label,
          count: item._count.label,
        })),
        topCtas: topCtas.map((item) => ({
          label: item.label,
          count: item._count.label,
        })),
        topUtmSources: topUtmSources.map((item) => ({
          source: item.utmSource,
          count: item._count.utmSource,
        })),
        selectedPlans: selectedPlans.map((item) => ({
          plan: item.selectedPlan,
          count: item._count.selectedPlan,
        })),
      },
    });
  })
);

export default router;