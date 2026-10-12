import crypto from "node:crypto";
import { Router } from "express";

import { env } from "../config/env.js";
import { asyncHandler } from "../middleware/asyncHandler.js";
import { deleteExpiredContactSubmissions } from "../jobs/contactRetention.js";
import { deleteExpiredRateLimits } from "../lib/rateLimitStore.js";

const router = Router();

// Vercel Cron trimite `Authorization: Bearer <CRON_SECRET>`.
function isAuthorizedCron(req) {
  if (!env.CRON_SECRET) return false;

  const expected = Buffer.from(`Bearer ${env.CRON_SECRET}`);
  const received = Buffer.from(req.get("authorization") || "");

  return (
    expected.length === received.length &&
    crypto.timingSafeEqual(expected, received)
  );
}

// Pe Vercel nu există proces care să stea pornit pentru node-cron,
// așa că jobul zilnic e declanșat din vercel.json → crons.
router.get(
  "/daily",
  asyncHandler(async (req, res) => {
    if (!isAuthorizedCron(req)) {
      return res.status(401).json({ success: false, message: "Unauthorized." });
    }

    const contacts = await deleteExpiredContactSubmissions();
    const rateLimits = await deleteExpiredRateLimits();

    res.json({ success: true, deleted: { contacts, rateLimits } });
  })
);

export default router;
