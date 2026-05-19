import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, X } from "lucide-react";

import OverlayBackdrop from "./OverlayBackdrop";

const slideTransition = {
  duration: 0.42,
  ease: [0.22, 1, 0.36, 1],
};

function ProcessModal({ steps, activeIndex, setActiveIndex, onClose }) {
  const [direction, setDirection] = useState(1);

  const isOpen = activeIndex !== null && activeIndex !== undefined;
  const step = isOpen ? steps[activeIndex] : null;

  const isFirst = activeIndex === 0;
  const isLast = activeIndex === steps.length - 1;

  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        onClose();
      }

      if (event.key === "ArrowRight" && !isLast) {
        setDirection(1);
        setActiveIndex((prev) => Math.min(prev + 1, steps.length - 1));
      }

      if (event.key === "ArrowLeft" && !isFirst) {
        setDirection(-1);
        setActiveIndex((prev) => Math.max(prev - 1, 0));
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, isFirst, isLast, onClose, setActiveIndex, steps.length]);

  function goNext() {
    if (isLast) return;
    setDirection(1);
    setActiveIndex((prev) => prev + 1);
  }

  function goPrev() {
    if (isFirst) return;
    setDirection(-1);
    setActiveIndex((prev) => prev - 1);
  }

  function goTo(index) {
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
  }

  if (!steps?.length) return null;

  return (
    <AnimatePresence>
      {isOpen && step && (
        <motion.div
          className="fixed inset-0 z-[260] flex items-center justify-center px-5"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 1 }}
        >
          <OverlayBackdrop
            onClick={onClose}
            blur={8}
            opacity={0.62}
            duration={0.65}
          />

          <motion.div
            className="relative z-10 w-full max-w-5xl overflow-hidden rounded-[2rem] border border-white/10 bg-[#080808]/95 shadow-[0_30px_120px_rgba(0,0,0,0.65)] backdrop-blur-2xl"
            initial={{ opacity: 0, scale: 0.96, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 18 }}
            transition={{
              duration: 0.35,
              ease: [0.22, 1, 0.36, 1],
            }}
            role="dialog"
            aria-modal="true"
          >
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
              <div className="flex items-center gap-3">
                <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-white/40">
                  Proces
                </span>

                <span className="text-sm text-white/35">
                  {activeIndex + 1} / {steps.length}
                </span>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="group rounded-full border border-white/10 bg-white/[0.04] p-2 text-white/60 transition hover:bg-white hover:text-black"
                aria-label="Închide"
              >
                <X size={20} className="transition group-hover:rotate-90" />
              </button>
            </div>

            <div className="relative min-h-[31rem] overflow-hidden">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={step.number}
                  custom={direction}
                  initial={{ opacity: 0, x: direction > 0 ? 80 : -80 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction > 0 ? -80 : 80 }}
                  transition={slideTransition}
                  className="grid gap-0 lg:grid-cols-[0.95fr_1.05fr]"
                >
                  <div className="relative hidden min-h-[31rem] border-r border-white/10 bg-white/[0.025] p-7 lg:block">
                    <ProcessModalVisual type={step.previewType} />

                    <div className="absolute bottom-7 left-7 right-7 rounded-[1.5rem] border border-white/10 bg-black/35 p-5 backdrop-blur-xl">
                      <p className="text-xs uppercase tracking-[0.3em] text-white/30">
                        Rezultat
                      </p>

                      <p className="mt-3 text-sm leading-6 text-white/60">
                        {step.details.result}
                      </p>
                    </div>
                  </div>

                  <div className="p-6 md:p-8">
                    <div className="mb-7 flex items-start justify-between gap-5">
                      <div>
                        <p className="text-sm uppercase tracking-[0.3em] text-white/35">
                          {step.tag}
                        </p>

                        <h2 className="mt-4 max-w-xl text-3xl font-semibold tracking-[-0.05em] text-white md:text-5xl">
                          {step.title}
                        </h2>
                      </div>

                      <span className="hidden text-7xl font-semibold tracking-[-0.08em] text-white/10 md:block">
                        {step.number}
                      </span>
                    </div>

                    <p className="max-w-2xl text-base leading-8 text-white/55 md:text-lg">
                      {step.details.intro}
                    </p>

                    <div className="mt-7 rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-5">
                      <p className="text-xs uppercase tracking-[0.28em] text-white/30">
                        Ce se întâmplă în etapa asta
                      </p>

                      <div className="mt-5 grid gap-3">
                        {step.details.points.slice(0, 4).map((point) => (
                          <div key={point} className="flex items-start gap-3">
                            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/[0.07] text-white/70">
                              <Check size={13} />
                            </span>

                            <span className="text-sm leading-6 text-white/58">
                              {point}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6 rounded-[1.5rem] border border-white/10 bg-white/[0.025] p-5 lg:hidden">
                      <p className="text-xs uppercase tracking-[0.28em] text-white/30">
                        Rezultat
                      </p>

                      <p className="mt-3 text-sm leading-6 text-white/58">
                        {step.details.result}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex flex-col gap-4 border-t border-white/10 px-5 py-4 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center justify-center gap-2 md:justify-start">
                {steps.map((item, index) => (
                  <button
                    key={item.number}
                    type="button"
                    onClick={() => goTo(index)}
                    aria-label={`Mergi la pasul ${index + 1}`}
                    className={`h-2 rounded-full transition-all duration-300 ${index === activeIndex
                        ? "w-8 bg-white"
                        : "w-2 bg-white/20 hover:bg-white/40"
                      }`}
                  />
                ))}
              </div>

              <div className="flex items-center justify-center gap-3 md:justify-end">
                <button
                  type="button"
                  onClick={goPrev}
                  disabled={isFirst}
                  className={`inline-flex items-center gap-2 rounded-full border px-5 py-3 text-sm font-semibold transition ${isFirst
                      ? "cursor-not-allowed border-white/5 bg-white/[0.02] text-white/20"
                      : "border-white/10 bg-white/[0.04] text-white/70 hover:bg-white hover:text-black"
                    }`}
                >
                  <ArrowLeft size={16} />
                  Înapoi
                </button>

                <button
                  type="button"
                  onClick={goNext}
                  disabled={isLast}
                  className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition ${isLast
                      ? "cursor-not-allowed border-white/5 bg-white/[0.02] text-white/20"
                      : "bg-white text-black hover:bg-white/90"
                    }`}
                >
                  Urmatorul
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ProcessModalVisual({ type }) {
  if (type === "sitemap") {
  return (
    <div className="relative h-full overflow-hidden p-7">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(255,255,255,0.08),transparent_34%)]" />

      <div className="relative mx-auto h-[22rem] max-w-sm overflow-hidden rounded-[1.8rem] border border-white/10 bg-white/[0.035] p-5 shadow-[0_24px_90px_rgba(0,0,0,0.35)]">
        {/* Browser bar */}
        <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
          </div>

          <div className="h-5 w-20 rounded-full border border-white/10 bg-white/[0.04]" />
        </div>

        {/* Hero section */}
        <div className="rounded-[1.35rem] border border-white/10 bg-white/[0.06] p-4">
          <div className="h-4 w-32 rounded-full bg-white/25" />
          <div className="mt-3 h-3 w-44 rounded-full bg-white/12" />
          <div className="mt-2 h-3 w-32 rounded-full bg-white/10" />

          <div className="mt-5 flex gap-2">
            <div className="h-7 w-20 rounded-full bg-white/80" />
            <div className="h-7 w-20 rounded-full border border-white/10 bg-white/[0.04]" />
          </div>
        </div>

        {/* Middle sections */}
        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3">
            <div className="mb-3 h-3 w-16 rounded-full bg-white/18" />
            <div className="h-12 rounded-xl bg-white/[0.06]" />
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3">
            <div className="mb-3 h-3 w-20 rounded-full bg-white/18" />
            <div className="grid gap-2">
              <div className="h-3 rounded-full bg-white/[0.08]" />
              <div className="h-3 w-3/4 rounded-full bg-white/[0.08]" />
              <div className="h-3 w-1/2 rounded-full bg-white/[0.08]" />
            </div>
          </div>
        </div>

        {/* Bottom flow */}
        <div className="mt-4 rounded-[1.25rem] border border-white/10 bg-white/[0.035] p-4">
          <div className="mb-4 flex items-center justify-between">
            <div className="h-3 w-24 rounded-full bg-white/16" />
            <div className="h-6 w-16 rounded-full bg-white/[0.08]" />
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div className="h-12 rounded-xl bg-white/[0.05]" />
            <div className="h-12 rounded-xl bg-white/[0.09]" />
            <div className="h-12 rounded-xl bg-white/[0.05]" />
          </div>
        </div>
      </div>
    </div>
  );
}

  if (type === "design") {
    return (
      <div className="relative h-full">
        <div className="absolute left-8 right-8 top-12 rounded-[1.8rem] border border-white/10 bg-white/[0.045] p-5">
          <div className="mb-8 h-8 w-40 rounded-full bg-white/20" />
          <div className="grid grid-cols-2 gap-4">
            <div className="h-32 rounded-2xl bg-white/[0.06]" />
            <div className="h-32 rounded-2xl bg-white/[0.12]" />
          </div>
        </div>
      </div>
    );
  }

  if (type === "code") {
    return (
      <div className="relative h-full p-6 font-mono text-sm">
        <div className="rounded-[1.5rem] border border-white/10 bg-black/40 p-5">
          <div className="mb-5 h-3 w-32 rounded-full bg-white/25" />
          <div className="space-y-3">
            <div className="h-2 w-60 rounded-full bg-white/10" />
            <div className="h-2 w-44 rounded-full bg-white/20" />
            <div className="h-2 w-72 rounded-full bg-white/10" />
            <div className="h-2 w-52 rounded-full bg-white/15" />
            <div className="h-2 w-64 rounded-full bg-white/10" />
          </div>
        </div>
      </div>
    );
  }

  if (type === "checklist") {
    return (
      <div className="relative h-full p-8">
        <div className="space-y-4">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-black">
                <Check size={16} />
              </div>
              <div className="h-3 w-44 rounded-full bg-white/15" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (type === "support") {
    return (
      <div className="relative h-full">
        <div className="absolute left-1/2 top-20 h-44 w-44 -translate-x-1/2 rounded-full border border-white/10 bg-white/[0.04]" />
        <div className="absolute left-[28%] top-36 h-20 w-20 rounded-full bg-white/[0.08] blur-xl" />
        <div className="absolute right-[22%] top-24 h-24 w-24 rounded-full bg-white/[0.06] blur-xl" />
      </div>
    );
  }

  return (
    <div className="relative h-full">
      <div className="absolute left-1/2 top-20 h-44 w-72 -translate-x-1/2 rounded-[2rem] border border-white/10 bg-white/[0.045] p-6">
        <div className="mb-6 h-4 w-36 rounded-full bg-white/20" />
        <div className="h-4 w-52 rounded-full bg-white/10" />
      </div>
    </div>
  );
}

export default ProcessModal;
