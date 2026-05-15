import { motion } from "framer-motion";
import { CheckCircle2, X } from "lucide-react";

import OverlayBackdrop from "./OverlayBackdrop";
import ProcessStepVisual from "./ProcessStepVisual";

function ProcessModal({ step, onClose }) {
  if (!step) return null;

  const details = step.details || {};
  const points = details.points || step.hoverPoints || [];

  return (
    <motion.div
      className="fixed inset-0 z-[270] flex items-center justify-center px-5"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 1 }}
    >
      <OverlayBackdrop
        onClick={onClose}
        blur={7}
        opacity={0.6}
        duration={0.75}
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
        className="relative max-h-[88vh] w-full max-w-5xl overflow-hidden rounded-[2rem] border border-white/10 bg-[#080808]/95 shadow-[0_24px_80px_rgba(0,0,0,0.55)]"
      >
        <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.04] px-6 py-5">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-white/35">
              Etapa {step.number}
            </p>

            <h2 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-white md:text-3xl">
              {step.title}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Închide"
            className="group rounded-full border border-white/10 bg-white/[0.04] p-2 text-white/60 transition hover:bg-white hover:text-black"
          >
            <X size={20} className="transition group-hover:rotate-90" />
          </button>
        </div>

        <div className="grid max-h-[calc(88vh-5rem)] overflow-y-auto lg:grid-cols-[0.9fr_1.1fr]">
          <div className="border-b border-white/10 p-5 lg:border-b-0 lg:border-r lg:p-7">
            <div className="sticky top-0">
              <div className="h-[23rem] rounded-[1.7rem] border border-white/10 bg-white/[0.025] p-3 shadow-[0_20px_70px_rgba(0,0,0,0.35)]">
                <ProcessStepVisual type={step.previewType} />
              </div>

              <div className="mt-5 rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-5">
                <p className="text-sm uppercase tracking-[0.25em] text-white/30">
                  Focus
                </p>

                <p className="mt-3 text-sm leading-6 text-white/55">
                  {step.shortText}
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 md:p-8">
            <div className="mb-7 inline-flex rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white/50">
              {step.tag}
            </div>

            <p className="text-lg leading-8 text-white/60">
              {details.intro || step.shortText}
            </p>

            {points.length > 0 && (
              <div className="mt-8 grid gap-4 md:grid-cols-2">
                {points.map((point) => (
                  <div
                    key={point}
                    className="rounded-[1.4rem] border border-white/10 bg-white/[0.035] p-5 transition hover:bg-white/[0.055]"
                  >
                    <CheckCircle2 size={20} className="text-white/70" />

                    <p className="mt-4 text-sm leading-6 text-white/55">
                      {point}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {details.result && (
              <div className="mt-8 rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-5">
                <p className="text-sm uppercase tracking-[0.25em] text-white/30">
                  Rezultat
                </p>

                <p className="mt-4 leading-7 text-white/55">
                  {details.result}
                </p>
              </div>
            )}

            <button
              type="button"
              onClick={onClose}
              className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-white px-6 py-4 font-semibold text-black transition hover:scale-[1.02] hover:bg-white/90"
            >
              Am înțeles
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default ProcessModal;