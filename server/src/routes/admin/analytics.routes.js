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
      caseStudyViews,
      ctaClicks,
      pricingClicks,
      contactOpens,
      contactSuccess,
      outboundClicks,
      topPages,
      topCaseStudies,
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
          type: "CASE_STUDY_VIEW",
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
          type: "CASE_STUDY_VIEW",
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
          caseStudyViews,
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
        topCaseStudies: topCaseStudies.map((item) => ({
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

// GET /api/admin/analytics/timeseries
// Returnează date grupate pe zile pentru grafice.
router.get(
  "/timeseries",
  asyncHandler(async (req, res) => {
    const days = Math.min(Math.max(Number(req.query.days || 30), 1), 365);

    const fromDate = new Date();
    fromDate.setDate(fromDate.getDate() - days);
    fromDate.setHours(0, 0, 0, 0);

    const [events, contacts] = await Promise.all([
      prisma.analyticsEvent.findMany({
        where: {
          createdAt: {
            gte: fromDate,
          },
          type: {
            in: [
              "PAGE_VIEW",
              "CASE_STUDY_VIEW",
              "CTA_CLICK",
              "PRICING_CLICK",
              "CONTACT_OPEN",
              "CONTACT_SUCCESS",
              "OUTBOUND_CLICK",
            ],
          },
        },
        select: {
          type: true,
          createdAt: true,
        },
        orderBy: {
          createdAt: "asc",
        },
      }),

      prisma.contactSubmission.findMany({
        where: {
          createdAt: {
            gte: fromDate,
          },
        },
        select: {
          createdAt: true,
        },
        orderBy: {
          createdAt: "asc",
        },
      }),
    ]);

    const dayMap = new Map();

    for (let index = 0; index <= days; index += 1) {
      const date = new Date(fromDate);
      date.setDate(fromDate.getDate() + index);

      const key = date.toISOString().slice(0, 10);

      dayMap.set(key, {
        date: key,
        pageViews: 0,
        caseStudyViews: 0,
        ctaClicks: 0,
        pricingClicks: 0,
        contactOpens: 0,
        contactSuccess: 0,
        outboundClicks: 0,
        contacts: 0,
      });
    }

    events.forEach((event) => {
      const key = event.createdAt.toISOString().slice(0, 10);
      const row = dayMap.get(key);

      if (!row) return;

      if (event.type === "PAGE_VIEW") row.pageViews += 1;
      if (event.type === "CASE_STUDY_VIEW") row.caseStudyViews += 1;
      if (event.type === "CTA_CLICK") row.ctaClicks += 1;
      if (event.type === "PRICING_CLICK") row.pricingClicks += 1;
      if (event.type === "CONTACT_OPEN") row.contactOpens += 1;
      if (event.type === "CONTACT_SUCCESS") row.contactSuccess += 1;
      if (event.type === "OUTBOUND_CLICK") row.outboundClicks += 1;
    });

    contacts.forEach((contact) => {
      const key = contact.createdAt.toISOString().slice(0, 10);
      const row = dayMap.get(key);

      if (!row) return;

      row.contacts += 1;
    });

    return res.json({
      success: true,
      data: Array.from(dayMap.values()),
    });
  })
);

export default router;