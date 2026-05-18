import { useState } from "react";
import { ArrowUpRight, Check } from "lucide-react";

import AnimatedSection from "./AnimatedSection";
import SectionHeader from "./SectionHeader";
import ProcessModal from "./ProcessModal";
import { processSteps } from "../data/process";

function Process() {
  const [activeStepIndex, setActiveStepIndex] = useState(null);

  return (
    <>
      <AnimatedSection id="proces" className="px-5 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Proces"
            title="Un proces clar, de la idee la site publicat."
            text="Fiecare etapă are un scop precis: clarificăm direcția, construim structura, dezvoltăm site-ul și îl pregătim pentru lansare."
          />

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {processSteps.map((step, index) => (
              <button
                key={step.number}
                type="button"
                onClick={() => setActiveStepIndex(index)}
                className="group overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.035] p-7 text-left transition duration-300 hover:-translate-y-1 hover:bg-white/[0.07]"
              >
                <div className="mb-8 flex items-start justify-between">
                  <span className="text-6xl font-semibold tracking-[-0.08em] text-white/10 transition group-hover:text-white/20">
                    {step.number}
                  </span>

                  <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-white/45">
                    {step.tag}
                  </span>
                </div>

                <div className="mb-8 h-32 overflow-hidden rounded-[1.4rem] border border-white/10 bg-black/40">
                  <div className="relative h-full w-full">
                    <ProcessMiniVisual type={step.previewType} />
                  </div>
                </div>

                <h3 className="text-2xl font-semibold tracking-[-0.03em] text-white">
                  {step.title}
                </h3>

                <p className="mt-4 leading-7 text-white/50">
                  {step.shortText}
                </p>

                <div className="mt-6 grid gap-3">
                  {step.hoverPoints.slice(0, 3).map((point) => (
                    <div key={point} className="flex items-center gap-3">
                      <Check size={16} className="text-white/60" />
                      <span className="text-sm text-white/50">{point}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-5">
                  <span className="text-sm font-medium text-white/60">
                    Vezi etapa
                  </span>

                  <ArrowUpRight
                    size={19}
                    className="text-white/35 transition group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-white"
                  />
                </div>
              </button>
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