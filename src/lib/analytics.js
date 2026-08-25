import { SESSION_KEY, UTM_KEY, hasAnalyticsConsent } from "./cookieConsent";

const API_BASE =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

export { hasAnalyticsConsent };

export function getSessionId() {
  try {
    let sessionId = sessionStorage.getItem(SESSION_KEY);

    if (!sessionId) {
      sessionId = crypto.randomUUID();
      sessionStorage.setItem(SESSION_KEY, sessionId);
    }

    return sessionId;
  } catch {
    return "unknown-session";
  }
}

export function captureUtmParams() {
  try {
    const params = new URLSearchParams(window.location.search);

    const utm = {
      utmSource: params.get("utm_source") || "",
      utmMedium: params.get("utm_medium") || "",
      utmCampaign: params.get("utm_campaign") || "",
      utmContent: params.get("utm_content") || "",
      utmTerm: params.get("utm_term") || "",
    };

    const hasUtm = Object.values(utm).some(Boolean);

    if (hasUtm) {
      sessionStorage.setItem(UTM_KEY, JSON.stringify(utm));
      return utm;
    }

    const saved = sessionStorage.getItem(UTM_KEY);
    return saved ? JSON.parse(saved) : {};
  } catch {
    return {};
  }
}

export function getAnalyticsContext() {
  return {
    sessionId: getSessionId(),
    consentAnalytics: hasAnalyticsConsent(),
    ...captureUtmParams(),
  };
}

export function trackEvent(type, payload = {}) {
  const consentAnalytics = hasAnalyticsConsent();

  // Variantă conservatoare GDPR:
  // nu trimitem niciun eveniment de analytics fără acord explicit.
  if (!consentAnalytics) {
    return;
  }

  const body = {
    type,
    sessionId: getSessionId(),
    consentAnalytics: true,

    path: payload.path || window.location.pathname,
    label: payload.label,
    value: payload.value,

    referrer: document.referrer || undefined,

    ...captureUtmParams(),

    metadata: payload.metadata,
  };

  const url = `${API_BASE}/analytics/event`;

  try {
    const json = JSON.stringify(body);

    if (navigator.sendBeacon) {
      const blob = new Blob([json], {
        type: "application/json",
      });

      navigator.sendBeacon(url, blob);
      return;
    }

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: json,
      keepalive: true,
    }).catch(() => {});
  } catch {
    // Analytics nu trebuie să strice site-ul.
  }
}

export function trackPageView(path) {
  trackEvent("PAGE_VIEW", { path });
}

export function trackCaseStudyView(slug) {
  trackEvent("CASE_STUDY_VIEW", {
    label: slug,
    value: slug,
  });
}

export function trackCtaClick(label, value) {
  trackEvent("CTA_CLICK", {
    label,
    value,
  });
}

export function trackPricingView(plan) {
  trackEvent("PRICING_VIEW", {
    label: plan,
    value: plan,
  });
}

export function trackPricingClick(plan) {
  trackEvent("PRICING_CLICK", {
    label: plan,
    value: plan,
  });
}

export function trackContactOpen(source) {
  trackEvent("CONTACT_OPEN", {
    label: source || "unknown",
  });
}

export function trackContactStart(field) {
  trackEvent("CONTACT_START", {
    label: field || "form_started",
  });
}

export function trackContactSubmit(plan) {
  trackEvent("CONTACT_SUBMIT", {
    label: plan || "Nespecificat",
  });
}

export function trackContactSuccess(plan) {
  trackEvent("CONTACT_SUCCESS", {
    label: plan || "Nespecificat",
  });
}

export function trackContactError(message) {
  trackEvent("CONTACT_ERROR", {
    label: "contact_error",
    value: message,
  });
}

export function trackOutboundClick(label, url) {
  trackEvent("OUTBOUND_CLICK", {
    label,
    value: url,
  });
}

export function trackError(label, error) {
  trackEvent("ERROR", {
    label,
    value: error?.message || String(error),
  });
}