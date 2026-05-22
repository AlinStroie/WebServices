import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

const CONSENT_KEY = "asquared_cookie_consent";

function getSavedConsent() {
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function saveConsent(consent) {
  localStorage.setItem(
    CONSENT_KEY,
    JSON.stringify({
      essential: true,
      analytics: Boolean(consent.analytics),
      marketing: Boolean(consent.marketing),
      updatedAt: new Date().toISOString(),
    })
  );

  window.dispatchEvent(new Event("cookie-consent-updated"));
}

function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    const saved = getSavedConsent();

    if (!saved) {
      const timer = window.setTimeout(() => setVisible(true), 600);
      return () => window.clearTimeout(timer);
    }

    setAnalytics(Boolean(saved.analytics));
    setMarketing(Boolean(saved.marketing));
  }, []);

  // Permite redeschiderea setărilor din footer:
  // window.dispatchEvent(new Event("open-cookie-settings"))
  useEffect(() => {
    function openCookieSettings() {
      const saved = getSavedConsent();

      setAnalytics(Boolean(saved?.analytics));
      setMarketing(Boolean(saved?.marketing));
      setVisible(false);
      setSettingsOpen(true);
    }

    window.addEventListener("open-cookie-settings", openCookieSettings);

    return () => {
      window.removeEventListener("open-cookie-settings", openCookieSettings);
    };
  }, []);

  function acceptAll() {
    saveConsent({
      analytics: true,
      marketing: true,
    });

    setAnalytics(true);
    setMarketing(true);
    setVisible(false);
    setSettingsOpen(false);
  }

  function optOut() {
    saveConsent({
      analytics: false,
      marketing: false,
    });

    setAnalytics(false);
    setMarketing(false);
    setVisible(false);
    setSettingsOpen(false);
  }

  function confirmSettings() {
    saveConsent({
      analytics,
      marketing,
    });

    setVisible(false);
    setSettingsOpen(false);
  }

  function openSettings() {
    const saved = getSavedConsent();

    setAnalytics(Boolean(saved?.analytics));
    setMarketing(Boolean(saved?.marketing));
    setVisible(false);
    setSettingsOpen(true);
  }

  return (
    <>
      <AnimatePresence>
        {visible && !settingsOpen && (
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.98 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-4 left-4 z-[240] w-[calc(100%-2rem)] max-w-[430px] rounded-xl border border-white/10 bg-[#171717]/95 p-5 text-white shadow-[0_24px_90px_rgba(0,0,0,0.55)] backdrop-blur-xl"
          >
            <p className="text-sm font-semibold leading-6 text-white/90">
              Folosim cookie-uri esențiale pentru funcționarea site-ului și,
              doar cu acordul tău, cookie-uri de analiză pentru a îmbunătăți
              experiența.{" "}
              <Link
                to="/cookies"
                className="underline decoration-white/40 underline-offset-4 transition hover:text-white"
              >
                Află mai multe
              </Link>
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={acceptAll}
                className="rounded-md border border-white/10 bg-white px-4 py-2 text-sm font-semibold text-black transition hover:bg-white/90"
              >
                Acceptă
              </button>

              <button
                type="button"
                onClick={optOut}
                className="rounded-md border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/[0.08]"
              >
                Respinge
              </button>

              <button
                type="button"
                onClick={openSettings}
                className="rounded-md px-3 py-2 text-sm font-semibold text-white/60 transition hover:text-white"
              >
                Setări cookies
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {settingsOpen && (
          <motion.div
            className="fixed inset-0 z-[260] flex items-center justify-center bg-black/55 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 18, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 18, scale: 0.98 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="w-full max-w-2xl overflow-hidden rounded-xl border border-white/10 bg-[#171717] text-white shadow-[0_24px_120px_rgba(0,0,0,0.75)]"
            >
              <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
                <h2 className="text-lg font-semibold">Setări cookies</h2>

                <button
                  type="button"
                  onClick={() => setSettingsOpen(false)}
                  className="text-2xl leading-none text-white/30 transition hover:text-white"
                  aria-label="Închide setările cookies"
                >
                  ×
                </button>
              </div>

              <div className="divide-y divide-white/10">
                <div className="flex items-center justify-between gap-6 px-6 py-5">
                  <div>
                    <h3 className="font-semibold">Esențiale</h3>

                    <p className="mt-1 max-w-lg text-sm leading-6 text-white/55">
                      Acestea sunt necesare pentru funcționarea site-ului,
                      salvarea preferințelor de confidențialitate și protejarea
                      serviciului.
                    </p>

                    <Link
                      to="/cookies"
                      onClick={() => setSettingsOpen(false)}
                      className="mt-1 inline-block text-sm text-white/75 underline underline-offset-4 transition hover:text-white"
                    >
                      Află mai multe
                    </Link>
                  </div>

                  <div className="flex shrink-0 flex-col items-end gap-1">
                    <button
                      type="button"
                      disabled
                      aria-label="Cookie-urile esențiale sunt mereu active"
                      title="Cookie-urile esențiale sunt mereu active"
                      className="relative h-7 w-12 cursor-not-allowed rounded-full bg-emerald-500/80 opacity-90 ring-1 ring-emerald-300/40"
                    >
                      <span className="absolute right-1 top-1 h-5 w-5 rounded-full bg-white shadow-sm" />
                    </button>

                    <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-emerald-300/70">
                      Mereu active
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-6 px-6 py-5">
                  <div>
                    <h3 className="font-semibold">Analytics</h3>

                    <p className="mt-1 max-w-lg text-sm leading-6 text-white/55">
                      Ne ajută să măsurăm folosirea site-ului: pagini vizitate,
                      clickuri, interacțiuni cu blogul și formularul. Sunt
                      active doar dacă accepți.
                    </p>

                    <Link
                      to="/cookies"
                      onClick={() => setSettingsOpen(false)}
                      className="mt-1 inline-block text-sm text-white/75 underline underline-offset-4 transition hover:text-white"
                    >
                      Află mai multe
                    </Link>
                  </div>

                  <button
                    type="button"
                    onClick={() => setAnalytics((current) => !current)}
                    className={`relative h-6 w-11 shrink-0 rounded-full transition ${
                      analytics ? "bg-emerald-500/80" : "bg-white/15"
                    }`}
                    aria-label="Activează sau dezactivează cookie-urile de analytics"
                  >
                    <span
                      className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
                        analytics ? "right-1" : "left-1"
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between gap-6 px-6 py-5">
                  <div>
                    <h3 className="font-semibold">Marketing</h3>

                    <p className="mt-1 max-w-lg text-sm leading-6 text-white/55">
                      În prezent nu folosim cookie-uri de marketing activ, dar
                      această categorie rămâne separată pentru eventuale
                      campanii viitoare.
                    </p>

                    <Link
                      to="/cookies"
                      onClick={() => setSettingsOpen(false)}
                      className="mt-1 inline-block text-sm text-white/75 underline underline-offset-4 transition hover:text-white"
                    >
                      Află mai multe
                    </Link>
                  </div>

                  <button
                    type="button"
                    onClick={() => setMarketing((current) => !current)}
                    className={`relative h-6 w-11 shrink-0 rounded-full transition ${
                      marketing ? "bg-emerald-500/80" : "bg-white/15"
                    }`}
                    aria-label="Activează sau dezactivează cookie-urile de marketing"
                  >
                    <span
                      className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
                        marketing ? "right-1" : "left-1"
                      }`}
                    />
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-3 border-t border-white/10 px-6 py-5 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={optOut}
                  className="rounded-md border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/[0.08]"
                >
                  Respinge opționalele
                </button>

                <button
                  type="button"
                  onClick={confirmSettings}
                  className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-500"
                >
                  Salvează setările
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default CookieBanner;