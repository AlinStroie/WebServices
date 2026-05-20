import crypto from "crypto";
import express from "express";

import { prisma } from "../lib/prisma.js";
import { validate } from "../middleware/validate.js";
import { asyncHandler } from "../middleware/asyncHandler.js";
import { analyticsLimiter } from "../middleware/rateLimiters.js";
import { analyticsSchema } from "../validators/analytics.schema.js";

const router = express.Router();

const minimalEvents = new Set([
  "PAGE_VIEW",
  "BLOG_VIEW",
  "CTA_CLICK",
  "PRICING_CLICK",
  "CONTACT_OPEN",
  "CONTACT_SUBMIT",
  "CONTACT_SUCCESS",
  "CONTACT_ERROR",
  "OUTBOUND_CLICK",
  "ERROR",
]);

function hashValue(value) {
  if (!value) return null;

  return crypto
    .createHash("sha256")
    .update(String(value))
    .digest("hex");
}

function getDeviceType(userAgent = "") {
  const ua = userAgent.toLowerCase();

  if (/mobile|android|iphone|ipod/.test(ua)) return "mobile";
  if (/ipad|tablet/.test(ua)) return "tablet";

  return "desktop";
}

function getBrowser(userAgent = "") {
  const ua = userAgent.toLowerCase();

  if (ua.includes("edg")) return "edge";
  if (ua.includes("chrome")) return "chrome";
  if (ua.includes("safari") && !ua.includes("chrome")) return "safari";
  if (ua.includes("firefox")) return "firefox";

  return "unknown";
}

router.post(
  "/event",
  analyticsLimiter,
  validate(analyticsSchema),
  asyncHandler(async (req, res) => {
    const data = req.validatedBody;
    const userAgent = req.headers["user-agent"] || "";
    const consentAnalytics = Boolean(data.consentAnalytics);

    const isMinimalEvent = minimalEvents.has(data.type);

    // Evenimentele avansate se acceptă doar cu consimțământ.
    if (!isMinimalEvent && !consentAnalytics) {
      return res.json({
        success: true,
        skipped: true,
      });
    }

    const session = await prisma.analyticsSession.upsert({
      where: {
        sessionId: data.sessionId,
      },
      update: {
        lastPath: data.path || undefined,
        lastSeenAt: new Date(),
        consentAnalytics: consentAnalytics ? true : undefined,

        referrer: data.referrer || undefined,

        utmSource: data.utmSource || undefined,
        utmMedium: data.utmMedium || undefined,
        utmCampaign: data.utmCampaign || undefined,
        utmContent: data.utmContent || undefined,
        utmTerm: data.utmTerm || undefined,

        convertedAt:
          data.type === "CONTACT_SUCCESS" ? new Date() : undefined,
      },
      create: {
        sessionId: data.sessionId,
        consentAnalytics,

        firstPath: data.path || null,
        lastPath: data.path || null,
        referrer: data.referrer || null,

        utmSource: data.utmSource || null,
        utmMedium: data.utmMedium || null,
        utmCampaign: data.utmCampaign || null,
        utmContent: data.utmContent || null,
        utmTerm: data.utmTerm || null,

        deviceType: getDeviceType(userAgent),
        browser: getBrowser(userAgent),

        ipHash: hashValue(req.ip),
        userAgentHash: hashValue(userAgent),

        convertedAt:
          data.type === "CONTACT_SUCCESS" ? new Date() : null,
      },
    });

    await prisma.analyticsEvent.create({
      data: {
        sessionId: session.sessionId,
        type: data.type,
        path: data.path || null,
        label: data.label || null,
        value: data.value || null,

        // Metadata doar dacă există consimțământ.
        metadata: consentAnalytics ? data.metadata || undefined : undefined,
      },
    });

    res.json({
      success: true,
    });
  })
);

export default router;