import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";

import { getConsent, saveConsent } from "../../lib/cookieConsent";

/**
 * Light-themed consent banner for the replica design.
 *
 * Deliberately NOT a restyle of the old CookieBanner — that component is
 * still used by the legacy home page and every other route, so it has to
 * stay dark and untouched.
 *
 * Consent is read/written through src/lib/cookieConsent.js — the same
 * module the always-available preferences panel on /cookies uses — so
 * a choice made here or there agrees with the other, and withdrawing
 * analytics consent from either place clears the same session/UTM keys.
 */
function ConsentBanner() {
  const [visible, setVisible] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const stored = getConsent();

    if (stored) return;

    // Hold it back briefly so it does not collide with the hero intro.
    const timer = window.setTimeout(() => setVisible(true), 1200);

    return () => window.clearTimeout(timer);
  }, []);

  function decide(analytics) {
    saveConsent({ analytics, marketing: false });
    setVisible(false);
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="dialog"
          aria-label="Preferințe cookie"
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
          className="fixed inset-x-4 bottom-[calc(1rem+env(safe-area-inset-bottom))] z-[160] mx-auto max-w-[480px] rounded-2xl border border-black/[0.07] bg-white/90 p-5 shadow-[0_18px_60px_rgba(0,0,0,0.14)] backdrop-blur-xl sm:inset-x-6 sm:bottom-[calc(1.5rem+env(safe-area-inset-bottom))]"
        >
          <p className="text-[15px] font-semibold text-[color:var(--color-ink)]">
            Cookie-uri
          </p>

          <p className="mt-2 text-[13px] leading-relaxed text-[color:var(--color-ink)]/70">
            Folosim cookie-uri esențiale pentru funcționarea site-ului și, doar
            cu acordul tău, cookie-uri de analiză.{" "}
            <Link to="/cookies" className="underline underline-offset-2">
              Detalii
            </Link>
          </p>

          {/* Same border, fill, size and weight on both buttons —
              accept and reject read as equally prominent, on purpose:
              nudging toward "accept" with a filled/accent button while
              "reject" gets a bare outline is exactly the dark-pattern
              consent-banner shape EU regulators (ANSPDCP included) flag
              first. */}
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => decide(false)}
              className="flex-1 rounded-full border border-black/[0.14] px-5 py-3 text-sm font-medium text-[color:var(--color-ink)] transition-colors duration-200 hover:bg-black/[0.04]"
            >
              Doar esențiale
            </button>

            <button
              type="button"
              onClick={() => decide(true)}
              className="flex-1 rounded-full border border-black/[0.14] px-5 py-3 text-sm font-medium text-[color:var(--color-ink)] transition-colors duration-200 hover:bg-black/[0.04]"
            >
              Acceptă
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default ConsentBanner;
