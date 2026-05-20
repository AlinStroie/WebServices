import express from "express";

import { prisma } from "../lib/prisma.js";
import { validate } from "../middleware/validate.js";
import { asyncHandler } from "../middleware/asyncHandler.js";
import { analyticsLimiter } from "../middleware/rateLimiters.js";
import { analyticsSchema } from "../validators/analytics.schema.js";

const router = express.Router();

// POST /api/analytics/event
// Salvează evenimente simple: page view, click CTA, submit formular etc.
router.post(
  "/event",
  analyticsLimiter,
  validate(analyticsSchema),
  asyncHandler(async (req, res) => {
    const data = req.validatedBody;

    await prisma.analyticsEvent.create({
      data: {
        type: data.type,
        path: data.path || null,
        label: data.label || null,
        value: data.value || null,
        sessionId: data.sessionId || null,
        referrer: data.referrer || null,
        userAgent: req.headers["user-agent"] || null,
        ipAddress: req.ip || null,
      },
    });

    res.json({
      success: true,
    });
  })
);

export default router;