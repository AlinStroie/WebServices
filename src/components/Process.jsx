import { useState } from "react";
import { ArrowUpRight, Check } from "lucide-react";

import AnimatedSection from "./AnimatedSection";
import SectionHeader from "./SectionHeader";
import ProcessModal from "./ProcessModal";
import { processSteps } from "../data/process";

function Process() {
  const [activeStepIndex, setActiveStepIndex] = useState(null);
  const [mobileStepIndex, setMobileStepIndex] = useState(0);

  const mobileStep = processSteps[mobileStepIndex];
  const isFirstMobileStep = mobileStepIndex === 0;
  const isLastMobileStep = mobileStepIndex === processSteps.length - 1;

  function goPrevMobileStep() {
    setMobileStepIndex((prev) => Math.max(prev - 1, 0));
  }

  function goNextMobileStep() {
    setMobileStepIndex((prev) => Math.min(prev + 1, processSteps.length - 1));
  }

  return (
    <>
      <AnimatedSection id="proces" className="px-5 py-14 md:py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Proces"
            title="Un proces clar, de la idee la site publicat."
            text="Fiecare etapă are un scop precis: clarificăm direcția, construim structura, dezvoltăm site-ul și îl pregătim pentru lansare."
          />

          <div className="md:hidden">
            <ProcessStepCard
              step={mobileStep}
              onClick={() => setActiveStepIndex(mobileStepIndex)}
              compact
            />

            <div className="mt-4 flex items-center justify-between gap-4">
              <div className="text-sm text-white/45">
                Pasul {mobileStepIndex + 1} / {processSteps.length}
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={goPrevMobileStep}
                  disabled={isFirstMobileStep}
                  aria-label="Pasul anterior"
                  className={`flex h-10 w-10 items-center justify-center rounded-full border transition ${
                    isFirstMobileStep
                      ? "cursor-not-allowed border-white/5 bg-white/[0.02] text-white/20"
                      : "border-white/10 bg-white/[0.04] text-white/70 hover:bg-white hover:text-black"
                  }`}
                >
                  ←
                </button>

                <button
                  type="button"
                  onClick={goNextMobileStep}
                  disabled={isLastMobileStep}
                  aria-label="Pasul următor"
                  className={`flex h-10 w-10 items-center justify-center rounded-full border transition ${
                    isLastMobileStep
                      ? "cursor-not-allowed border-white/5 bg-white/[0.02] text-white/20"
                      : "border-white/10 bg-white/[0.04] text-white/70 hover:bg-white hover:text-black"
                  }`}
                >
                  →
                </button>
              </div>
            </div>
          </div>

          <div className="hidden gap-5 md:grid md:grid-cols-2 lg:grid-cols-3">
            {processSteps.map((step, index) => (
              <ProcessStepCard
                key={step.number}
                step={step}
                onClick={() => setActiveStepIndex(index)}
              />
            ))}
          </div>
        </div>
      </AnimatedSection>

      <ProcessModal
        steps={processSteps}
        activeIndex={activeStepIndex}
        setActiveIndex={setActiveStepIndex}
        onClose={() => setActiveStepIndex(null)}
      />
    </>
  );
}

function ProcessStepCard({ step, onClick, compact = false }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`Vezi etapa ${step.number}: ${step.title}`}
      className={`group overflow-hidden rounded-[1.55rem] border border-white/10 bg-white/[0.035] text-left transition duration-300 hover:-translate-y-1 hover:bg-white/[0.07] ${
        compact ? "p-5" : "p-7"
      } md:rounded-[2rem] md:p-7`}
    >
      <div className="mb-5 flex items-start justify-between md:mb-8">
        <span className="text-5xl font-semibold tracking-[-0.08em] text-white/10 transition group-hover:text-white/20 md:text-6xl">
          {step.number}
        </span>

        <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-white/50">
          {step.tag}
        </span>
      </div>

      <div className="mb-5 h-24 overflow-hidden rounded-[1.2rem] border border-white/10 bg-black/40 md:mb-8 md:h-32 md:rounded-[1.4rem]">
        <div className="relative h-full w-full">
          <ProcessMiniVisual type={step.previewType} />
        </div>
      </div>

      <h3 className="text-xl font-semibold tracking-[-0.03em] text-white md:text-2xl">
        {step.title}
      </h3>

      <p className="mt-3 mobile-line-clamp-3 text-sm leading-6 text-white/58 md:mt-4 md:text-base md:leading-7">
        {step.shortText}
      </p>

      <div className="mt-5 grid gap-2 md:mt-6 md:gap-3">
        {step.hoverPoints.slice(0, compact ? 2 : 3).map((point) => (
          <div key={point} className="flex items-center gap-3">
            <Check size={16} className="text-white/60" />
            <span className="text-sm text-white/55">{point}</span>
          </div>
        ))}
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4 md:mt-8 md:pt-5">
        <span className="text-sm font-medium text-white/65">Vezi etapa</span>

        <ArrowUpRight
          size={19}
          className="text-white/35 transition group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-white"
        />
      </div>
    </button>
  );
}

function ProcessMiniVisual({ type }) {
  if (type === "sitemap") {
    return (
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="grid gap-2">
          <div className="mx-auto h-4 w-24 rounded-full bg-white/25" />
          <div className="grid grid-cols-3 gap-2">
            <div className="h-10 w-16 rounded-xl bg-white/10" />
            <div className="h-10 w-16 rounded-xl bg-white/20" />
            <div className="h-10 w-16 rounded-xl bg-white/10" />
          </div>
        </div>
      </div>
    );
  }

  if (type === "design") {
    return (
      <div className="absolute inset-0 p-5">
        <div className="h-full rounded-[1.2rem] border border-white/10 bg-white/[0.04] p-4">
          <div className="mb-4 h-5 w-28 rounded-full bg-white/20" />
          <div className="grid grid-cols-2 gap-3">
            <div className="h-12 rounded-xl bg-white/10" />
            <div className="h-12 rounded-xl bg-white/20" />
          </div>
        </div>
      </div>
    );
  }

  if (type === "code") {
    return (
      <div className="absolute inset-0 p-5 font-mono text-xs text-white/35">
        <div className="space-y-2">
          <div className="h-2 w-32 rounded-full bg-white/25" />
          <div className="h-2 w-44 rounded-full bg-white/10" />
          <div className="h-2 w-28 rounded-full bg-white/20" />
          <div className="h-2 w-52 rounded-full bg-white/10" />
        </div>
      </div>
    );
  }

  if (type === "checklist") {
    return (
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="space-y-3">
          {[1, 2, 3].map((item) => (
            <div key={item} className="flex items-center gap-3">
              <div className="h-5 w-5 rounded-full bg-white/80" />
              <div className="h-3 w-28 rounded-full bg-white/15" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (type === "support") {
    return (
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative h-20 w-20 rounded-full border border-white/15 bg-white/[0.04]">
          <div className="absolute -right-5 top-2 h-10 w-10 rounded-full bg-white/15" />
          <div className="absolute -bottom-4 left-2 h-12 w-12 rounded-full bg-white/10" />
        </div>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="h-20 w-40 rounded-[1.4rem] border border-white/10 bg-white/[0.06] p-4">
        <div className="mb-3 h-3 w-24 rounded-full bg-white/25" />
        <div className="h-3 w-16 rounded-full bg-white/15" />
      </div>
    </div>
  );
}

export default Process;
