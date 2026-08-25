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

export function trackGaPageView(path) {
  if (!loaded || !hasAnalyticsConsent() || typeof window.gtag !== "function") {
    return;
  }

  window.gtag("event", "page_view", {
    page_path: path,
    page_title: document.title,
    page_location: window.location.href,
  });
}
