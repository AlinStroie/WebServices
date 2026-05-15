import { useEffect, useState } from "react";

function CookieBanner({ onOpenPolicy }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");

    if (!consent) {
      setVisible(true);
    }
  }, []);

  function acceptCookies() {
    localStorage.setItem("cookieConsent", "accepted");
    setVisible(false);
  }

  function rejectCookies() {
    localStorage.setItem("cookieConsent", "rejected");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-5 left-1/2 z-[100] w-[calc(100%-2rem)] max-w-4xl -translate-x-1/2 rounded-[1.5rem] border border-white/10 bg-black/90 p-5 shadow-2xl backdrop-blur-xl">
      <div className="grid gap-5 md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <h3 className="text-lg font-semibold text-white">
            Folosim cookies
          </h3>

          <p className="mt-2 text-sm leading-6 text-white/55">
            Folosim cookies necesare pentru funcționarea site-ului și, opțional,
            cookies pentru analiză și îmbunătățirea experienței.
          </p>

          <div className="mt-3 flex flex-wrap gap-3 text-sm">
            <button
              type="button"
              onClick={() => onOpenPolicy("cookies")}
              className="text-white underline underline-offset-4"
            >
              Politica de cookies
            </button>

            <button
              type="button"
              onClick={() => onOpenPolicy("privacy")}
              className="text-white underline underline-offset-4"
            >
              Politica de confidențialitate
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            onClick={rejectCookies}
            className="rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            Refuz
          </button>

          <button
            onClick={acceptCookies}
            className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-white/90"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}

export default CookieBanner;