import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "../data/siteConfig";
import OverlayBackdrop from "./OverlayBackdrop";

function getLegalData(type) {
  if (!type) return null;

  const legal = siteConfig.legal || {};

  const aliases = {
    privacy: ["privacy", "gdpr", "confidentialitate", "privacyPolicy"],
    gdpr: ["gdpr", "privacy", "confidentialitate", "privacyPolicy"],
    cookies: ["cookies", "cookie", "cookiePolicy"],
    cookie: ["cookies", "cookie", "cookiePolicy"],
    terms: ["terms", "termeni", "termsAndConditions"],
  };

  const possibleKeys = aliases[type] || [type];

  for (const key of possibleKeys) {
    if (legal[key]) {
      return legal[key];
    }
  }

  return null;
}

function LegalModal({ type, onClose }) {
  const data = getLegalData(type);

  return (
    <AnimatePresence>
      {type && data && (
        <motion.div
          className="fixed inset-0 z-[999] flex items-center justify-center px-5"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 1 }}
        >
          <OverlayBackdrop
            onClick={onClose}
            blur={8}
            opacity={0.62}
            duration={0.85}
          />

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.985,
              y: 14,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.985,
              y: 10,
            }}
            transition={{
              duration: 0.42,
              delay: 0.14,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-[2rem] border border-white/10 bg-[#080808]/95 p-7 shadow-[0_24px_80px_rgba(0,0,0,0.55)] md:p-9"
          >
            <button
              onClick={onClose}
              className="group absolute right-5 top-5 rounded-full border border-white/10 bg-white/[0.04] p-3 text-white/60 transition hover:bg-white hover:text-black"
              aria-label="Închide"
              type="button"
            >
              <X size={20} className="transition group-hover:rotate-90" />
            </button>

            <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-white/35">
              {data.eyebrow}
            </p>

            <h2 className="max-w-xl pr-12 text-3xl font-semibold tracking-[-0.04em] text-white md:text-5xl">
              {data.title}
            </h2>

            <div className="mt-8 space-y-5 text-sm leading-7 text-white/55 md:text-base">
              {data.content.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-8 flex justify-end">
              <button
                onClick={onClose}
                type="button"
                className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:scale-[1.02] hover:bg-white/90"
              >
                Am înțeles
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default LegalModal;