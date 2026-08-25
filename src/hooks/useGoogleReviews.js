import { useEffect, useState } from "react";

import { apiFetch } from "../lib/api";

/**
 * Live Google reviews, fetched from our own backend (which proxies + caches
 * Google Places Details — see server/src/routes/reviews.routes.js). Until a
 * Place ID and API key are configured there, `configured` stays false and
 * `reviews` stays empty — callers should fall back to static placeholder
 * content in that case, not render an empty state.
 */
function useGoogleReviews() {
  const [state, setState] = useState({
    loading: true,
    configured: false,
    reviews: [],
    rating: null,
    totalReviews: 0,
    mapsUrl: null,
  });

  useEffect(() => {
    let cancelled = false;

    apiFetch("/reviews")
      .then((response) => {
        if (cancelled) return;
        const data = response?.data || {};

        setState({
          loading: false,
          configured: Boolean(data.configured),
          reviews: data.reviews || [],
          rating: data.rating ?? null,
          totalReviews: data.totalReviews || 0,
          mapsUrl: data.mapsUrl || null,
        });
      })
      .catch(() => {
        if (!cancelled) setState((current) => ({ ...current, loading: false }));
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}

export default useGoogleReviews;
