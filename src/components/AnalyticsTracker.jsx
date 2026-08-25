import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

import {
  hasAnalyticsConsent,
  trackEvent,
  trackPageView,
  trackOutboundClick,
  trackPricingView,
  trackError,
} from "../lib/analytics";
import { loadGoogleAnalytics, trackGaPageView } from "../lib/googleAnalytics";

function getClosestLink(target) {
  if (!target) return null;

  if (target.tagName === "A") return target;

  if (typeof target.closest === "function") {
    return target.closest("a");
  }

  return null;
}

function getOutboundLabel(link) {
  const href = link.getAttribute("href") || "";
  const text = link.innerText?.trim();

  if (href.startsWith("mailto:")) return "email";
  if (href.startsWith("tel:")) return "telefon";
  if (href.includes("wa.me") || href.includes("whatsapp")) return "whatsapp";
  if (href.includes("instagram")) return "instagram";
  if (href.includes("tiktok")) return "tiktok";
  if (href.includes("facebook")) return "facebook";
  if (href.includes("linkedin")) return "linkedin";
  if (href.includes("github")) return "github";

  return text || "external_link";
}

function isOutboundLink(link) {
  const href = link.getAttribute("href");

  if (!href) return false;

  if (href.startsWith("mailto:")) return true;
  if (href.startsWith("tel:")) return true;
  if (href.includes("wa.me")) return true;
  if (href.includes("whatsapp")) return true;

  try {
    const url = new URL(href, window.location.origin);

    return url.origin !== window.location.origin;
  } catch {
    return false;
  }
}

function AnalyticsTracker() {
  const location = useLocation();

  const startTimeRef = useRef(Date.now());
  const scrollDepthsRef = useRef(new Set());
  const pricingViewedRef = useRef(false);

  useEffect(() => {
    loadGoogleAnalytics();

    window.addEventListener("cookie-consent-updated", loadGoogleAnalytics);

    return () => {
      window.removeEventListener("cookie-consent-updated", loadGoogleAnalytics);
    };
  }, []);

  useEffect(() => {
    const path = location.pathname + location.search;

    startTimeRef.current = Date.now();
    scrollDepthsRef.current = new Set();
    pricingViewedRef.current = false;

    trackPageView(path);
    loadGoogleAnalytics();
    trackGaPageView(path);

    function handleScroll() {
      if (!hasAnalyticsConsent()) return;

      const documentHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      if (documentHeight <= 0) return;

      const percent = Math.round((window.scrollY / documentHeight) * 100);
      const milestones = [25, 50, 75, 90];

      milestones.forEach((milestone) => {
        if (percent >= milestone && !scrollDepthsRef.current.has(milestone)) {
          scrollDepthsRef.current.add(milestone);

          trackEvent("SCROLL_DEPTH", {
            path,
            label: `${milestone}%`,
            value: String(milestone),
          });
        }
      });
    }

    function trackTimeOnPage() {
      if (!hasAnalyticsConsent()) return;

      const seconds = Math.round((Date.now() - startTimeRef.current) / 1000);

      if (seconds >= 3) {
        trackEvent("TIME_ON_PAGE", {
          path,
          label: "seconds",
          value: String(seconds),
        });
      }
    }

    function handleVisibilityChange() {
      if (document.visibilityState === "hidden") {
        trackTimeOnPage();
      }
    }

    function handleOutboundClick(event) {
      const link = getClosestLink(event.target);

      if (!link) return;
      if (!isOutboundLink(link)) return;

      const href = link.getAttribute("href") || "";
      const label = getOutboundLabel(link);

      trackOutboundClick(label, href);
    }

    function handleError(event) {
      trackError("frontend_error", event.error || event.message);
    }

    function handleUnhandledRejection(event) {
      trackError("unhandled_promise", event.reason || "Unhandled promise");
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("beforeunload", trackTimeOnPage);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // capture=true îl face să prindă clickul mai sigur,
    // înainte ca linkul să deschidă WhatsApp/email/telefon.
    document.addEventListener("click", handleOutboundClick, true);

    window.addEventListener("error", handleError);
    window.addEventListener("unhandledrejection", handleUnhandledRejection);

    const pricingSection =
      document.getElementById("preturi") ||
      document.querySelector("[data-analytics-section='pricing']");

    let pricingObserver = null;

    if (pricingSection && hasAnalyticsConsent()) {
      pricingObserver = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !pricingViewedRef.current) {
            pricingViewedRef.current = true;
            trackPricingView("pricing_section");
            pricingObserver.disconnect();
          }
        },
        {
          threshold: 0.35,
        }
      );

      pricingObserver.observe(pricingSection);
    }

    return () => {
      trackTimeOnPage();

      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("beforeunload", trackTimeOnPage);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      document.removeEventListener("click", handleOutboundClick, true);
      window.removeEventListener("error", handleError);
      window.removeEventListener("unhandledrejection", handleUnhandledRejection);

      if (pricingObserver) {
        pricingObserver.disconnect();
      }
    };
  }, [location.pathname, location.search]);

  return null;
}

export default AnalyticsTracker;