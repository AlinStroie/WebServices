import { useEffect, useState } from "react";
import { Cookie, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function CookieBanner({ onOpenPolicy }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const cookieChoice = localStorage.getItem("cookie-consent");

    if (!cookieChoice) {
      const timer = setTimeout(() => {
        setVisible(true);
      }, 700);

      return () => clearTimeout(timer);
    }
  }, []);

  function acceptCookies() {
    localStorage.setItem("cookie-consent", "accepted");
    setVisible(false);
  }

  function rejectCookies() {
    localStorage.setItem("cookie-consent", "rejected");
    setVisible(false);
  }

  function openPrivacy() {
  setVisible(false);
  onOpenPolicy?.("privacy");
}

function openCookies() {
  setVisible(false);
  onOpenPolicy?.("cookies");
}

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed bottom-5 left-1/2 z-[220] w-[calc(100%-2rem)] max-w-3xl -translate-x-1/2"
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.98 }}
          transition={{
            duration: 0.35,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <div className="rounded-[1.7rem] border border-white/10 bg-[#080808]/95 p-5 shadow-[0_24px_90px_rgba(0,0,0,0.65)] backdrop-blur-xl">
            <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
              <div className="flex gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-white/70">
                  <Cookie size={20} />
                </div>

                <div>
                  <h3 className="text-lg font-semibold tracking-[-0.03em] text-white">
                    Folosim cookies
                  </h3>

                  <p className="mt-2 max-w-xl text-sm leading-6 text-white/50">
                    Folosim cookies necesare pentru funcționarea site-ului și
                    pentru îmbunătățirea experienței de navigare.
                  </p>

                  <div className="mt-3 flex flex-wrap gap-3 text-sm">
                    <button
                      type="button"
                      onClick={openPrivacy}
                      className="text-white/55 underline underline-offset-4 transition hover:text-white"
                    >
                      Politica de confidențialitate
                    </button>

                    <button
                      type="button"
                      onClick={openCookies}
                      className="text-white/55 underline underline-offset-4 transition hover:text-white"
                    >
                      Politica de cookies
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex shrink-0 flex-col gap-2 sm:flex-row md:flex-col">
                <button
                  type="button"
                  onClick={acceptCookies}
                  className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition hover:scale-[1.02] hover:bg-white/90"
                >
                  Accept
                </button>

                <button
                  type="button"
                  onClick={rejectCookies}
                  className="rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-white/70 transition hover:bg-white/[0.08] hover:text-white"
                >
                  Refuz
                </button>
              </div>
            </div>

            <button
              type="button"
              onClick={rejectCookies}
              aria-label="Închide banner cookies"
              className="absolute right-4 top-4 rounded-full p-2 text-white/35 transition hover:bg-white/[0.06] hover:text-white"
            >
              <X size={18} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default CookieBanner;