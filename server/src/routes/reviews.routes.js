import express from "express";

import { asyncHandler } from "../middleware/asyncHandler.js";
import { env } from "../config/env.js";

const router = express.Router();

// Google Places "Place Details" only ever returns up to 5 reviews (its own
// hard limit, not something a fetch option changes) — this is a snapshot,
// not a live feed. Cached in-memory for a few hours since each call to
// Google is billed; there is no reason to spend one per site visitor.
const CACHE_TTL_MS = 6 * 60 * 60 * 1000;
let cache = { data: null, fetchedAt: 0 };

function emptyPayload(configured) {
  return { configured, rating: null, totalReviews: 0, reviews: [], mapsUrl: null };
}

router.get(
  "/",
  asyncHandler(async (req, res) => {
    if (!env.GOOGLE_PLACES_API_KEY || !env.GOOGLE_PLACE_ID) {
      return res.json({ success: true, data: emptyPayload(false) });
    }

    const isFresh = cache.data && Date.now() - cache.fetchedAt < CACHE_TTL_MS;
    if (isFresh) {
      return res.json({ success: true, data: cache.data });
    }

    const url = new URL("https://maps.googleapis.com/maps/api/place/details/json");
    url.searchParams.set("place_id", env.GOOGLE_PLACE_ID);
    url.searchParams.set("fields", "reviews,rating,user_ratings_total");
    url.searchParams.set("language", "ro");
    url.searchParams.set("key", env.GOOGLE_PLACES_API_KEY);

    let payload;
    try {
      const response = await fetch(url);
      payload = await response.json();
    } catch (error) {
      console.error("Eroare la interogarea Google Places API:", error.message);
      return res.json({ success: true, data: cache.data || emptyPayload(true) });
    }

    if (payload.status !== "OK") {
      console.error("Google Places API a răspuns cu status:", payload.status, payload.error_message);
      return res.json({ success: true, data: cache.data || emptyPayload(true) });
    }

    const result = payload.result || {};

    const data = {
      configured: true,
      rating: result.rating ?? null,
      totalReviews: result.user_ratings_total ?? 0,
      mapsUrl: `https://www.google.com/maps/place/?q=place_id:${env.GOOGLE_PLACE_ID}`,
      // 4-5★ only — a low outlier review sitting in the site's own
      // testimonials grid isn't the same context as it sitting on the
      // neutral, third-party Google Maps listing.
      reviews: (result.reviews || [])
        .filter((review) => review.rating >= 4)
        .map((review) => ({
          author: review.author_name,
          avatarUrl: review.profile_photo_url || null,
          rating: review.rating,
          text: review.text,
          relativeTime: review.relative_time_description,
        })),
    };

    cache = { data, fetchedAt: Date.now() };

    res.json({ success: true, data });
  })
);

export default router;
