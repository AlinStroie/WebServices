import { hasAnalyticsConsent } from "./cookieConsent";

// Measurement ID e public prin design (apare oricum în sursa paginii odată
// încărcat gtag.js), deci nu are nevoie de variabilă de mediu / secret.
const GA_MEASUREMENT_ID = "G-86XXRQ16ZD";

let loaded = false;

function injectGtagScript() {
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];

  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };

  window.gtag("js", new Date());

  // send_page_view: false — trimitem noi manual page_view la fiecare
  // schimbare de rută (vezi AnalyticsTracker), altfel pageview-ul automat
  // al gtag nu prinde navigarea client-side dintr-un SPA.
  window.gtag("config", GA_MEASUREMENT_ID, {
    send_page_view: false,
    anonymize_ip: true,
  });
}

export function loadGoogleAnalytics() {
  if (loaded || !hasAnalyticsConsent()) return;

  injectGtagScript();
  loaded = true;
}

// Numele evenimentelor interne (din trackEvent, lib/analytics.js) mapate la
// nume de evenimente GA4. CONTACT_SUCCESS -> generate_lead e evenimentul
// standard GA4 recomandat pentru lead-uri — ăsta trebuie marcat drept "Key
// event" în GA4 (Admin → Events), e conversia reală de urmărit.
const GA_EVENT_NAME_MAP = {
  PAGE_VIEW: "page_view",
  CONTACT_SUCCESS: "generate_lead",
};

export function trackGaEvent(type, { label, value, path, metadata } = {}) {
  if (!loaded || !hasAnalyticsConsent() || typeof window.gtag !== "function") {
    return;
  }

  const eventName = GA_EVENT_NAME_MAP[type] || type.toLowerCase();

  const params = {};

  if (path !== undefined) {
    params.page_path = path;
    params.page_title = document.title;
    params.page_location = window.location.href;
  }

  if (label !== undefined) params.label = label;
  if (value !== undefined) params.detail = value;

  if (metadata !== undefined) {
    try {
      params.metadata = JSON.stringify(metadata);
    } catch {
      // Ignorăm — metadata nu trebuie să strice trimiterea evenimentului.
    }
  }

  window.gtag("event", eventName, params);
}
