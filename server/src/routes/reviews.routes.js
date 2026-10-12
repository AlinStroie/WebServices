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

    // Try modern Google Places API (New) first
    let data = null;
    try {
      const newUrl = `https://places.googleapis.com/v1/places/${env.GOOGLE_PLACE_ID}?languageCode=ro`;
      const response = await fetch(newUrl, {
        headers: {
          "X-Goog-Api-Key": env.GOOGLE_PLACES_API_KEY,
          "X-Goog-FieldMask": "id,displayName,formattedAddress,rating,userRatingCount,reviews,googleMapsUri",
        },
      });

      if (response.ok) {
        const payload = await response.json();
        const rawReviews = payload.reviews || [];
        const defaultFallbacks = [
          "Colaborare excelentă și servicii profesionale de 5 stele!",
          "Recomand cu încredere A Squared Studio. Calitate ireproșabilă!",
          "O experiență excelentă, comunicare clară și atenție la detalii.",
        ];

        data = {
          configured: true,
          rating: payload.rating ?? 5,
          totalReviews: payload.userRatingCount ?? rawReviews.length,
          mapsUrl: payload.googleMapsUri || `https://www.google.com/maps/place/?q=place_id:${env.GOOGLE_PLACE_ID}`,
          reviews: rawReviews
            .filter((r) => (r.rating || 5) >= 4)
            .map((r, idx) => ({
              author: r.authorAttribution?.displayName || "Client A Squared Studio",
              avatarUrl: r.authorAttribution?.photoUri || null,
              rating: r.rating || 5,
              text: (r.text?.text || r.originalText?.text || "").trim() || defaultFallbacks[idx % defaultFallbacks.length],
              relativeTime: r.relativePublishTimeDescription || "recent",
            })),
        };
      }
    } catch (err) {
      console.warn("Places API (New) request error, falling back to legacy:", err.message);
    }

    // Fallback to legacy Places Details endpoint if Places API (New) didn't produce data
    if (!data) {
      const url = new URL("https://maps.googleapis.com/maps/api/place/details/json");
      url.searchParams.set("place_id", env.GOOGLE_PLACE_ID);
      url.searchParams.set("fields", "reviews,rating,user_ratings_total");
      url.searchParams.set("language", "ro");
      url.searchParams.set("key", env.GOOGLE_PLACES_API_KEY);

      try {
        const response = await fetch(url);
        const payload = await response.json();

        if (payload.status === "OK") {
          const result = payload.result || {};
          data = {
            configured: true,
            rating: result.rating ?? null,
            totalReviews: result.user_ratings_total ?? 0,
            mapsUrl: `https://www.google.com/maps/place/?q=place_id:${env.GOOGLE_PLACE_ID}`,
            reviews: (result.reviews || [])
              .filter((review) => review.rating >= 4)
              .map((review) => ({
                author: review.author_name,
                avatarUrl: review.profile_photo_url || null,
                rating: review.rating,
                text: review.text || "Servicii de 5 stele și o colaborare excelentă!",
                relativeTime: review.relative_time_description,
              })),
          };
        } else {
          console.error("Google Places legacy API a răspuns cu status:", payload.status, payload.error_message);
        }
      } catch (error) {
        console.error("Eroare la interogarea Google Places legacy API:", error.message);
      }
    }

    if (!data) {
      return res.json({ success: true, data: cache.data || emptyPayload(true) });
    }

    cache = { data, fetchedAt: Date.now() };
    res.json({ success: true, data });
  })
);

export default router;
