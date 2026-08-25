export const CONSENT_KEY = "asquared_cookie_consent";
export const SESSION_KEY = "asquared_session_id";
export const UTM_KEY = "asquared_utm_data";

export function getConsent() {
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function hasAnalyticsConsent() {
  return Boolean(getConsent()?.analytics);
}

/**
 * Single write path for consent, used by both the first-visit banner and
 * the always-available preferences panel on /cookies (Section 5 promises
 * consent can be changed or withdrawn there, so both have to agree on the
 * exact same storage shape). Withdrawing analytics also clears the
 * session/UTM keys immediately — Section 5 of the privacy policy says a
 * refusal means those aren't saved, which a stale sessionStorage entry
 * from before the withdrawal would otherwise contradict.
 */
export function saveConsent({ analytics, marketing }) {
  try {
    localStorage.setItem(
      CONSENT_KEY,
      JSON.stringify({
        essential: true,
        analytics: Boolean(analytics),
        marketing: Boolean(marketing),
        updatedAt: new Date().toISOString(),
      })
    );
  } catch {
    // Private mode / storage disabled — nothing to persist.
  }

  if (!analytics) {
    try {
      sessionStorage.removeItem(SESSION_KEY);
      sessionStorage.removeItem(UTM_KEY);
    } catch {
      // Ignore.
    }
  }

  window.dispatchEvent(new Event("cookie-consent-updated"));
}
