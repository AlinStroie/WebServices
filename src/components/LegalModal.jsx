import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "../data/siteConfig";

function LegalModal({ type, onClose }) {
  const data = type ? siteConfig.legal[type] : null;

  return (
    <AnimatePresence>
      {type && data && (
        <motion.div
          className="fixed inset-0 z-[300] flex items-center justify-center px-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            onClick={onClose}
            className="absolute inset-0 bg-black/75"
            initial={{
              opacity: 0,
              backdropFilter: "blur(0px)",
              WebkitBackdropFilter: "blur(0px)",
            }}
            animate={{
              opacity: 1,
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
            }}
            exit={{
              opacity: 0,
              backdropFilter: "blur(0px)",
              WebkitBackdropFilter: "blur(0px)",
            }}
            transition={{
              duration: 0.28,
              ease: "easeOut",
            }}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 18 }}
            transition={{
              duration: 0.24,
              ease: "easeOut",
              delay: 0.04,
            }}
            className="relative max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-[2rem] border border-white/10 bg-[#080808]/95 p-7 shadow-2xl md:p-9"
          >
            <button
              onClick={onClose}
              className="group absolute right-5 top-5 rounded-full border border-white/10 bg-white/[0.04] p-3 text-white/60 transition hover:bg-white hover:text-black"
              aria-label="Închide"
            >
              <X size={20} className="transition group-hover:rotate-90" />
            </button>

            <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-white/35">
              {data.eyebrow}
            </p>

            <h2 className="max-w-xl text-3xl font-semibold tracking-[-0.04em] text-white md:text-5xl">
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
                className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-white/90"
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