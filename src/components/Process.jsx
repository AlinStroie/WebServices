import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { ArrowUpRight, Check } from "lucide-react";

import AnimatedSection from "./AnimatedSection";
import SectionHeader from "./SectionHeader";
import ProcessModal from "./ProcessModal";
import ProcessStepVisual from "./ProcessStepVisual";
import { processSteps } from "../data/process";

function Process() {
  const [selectedStep, setSelectedStep] = useState(null);

  function openStep(step) {
    setSelectedStep(step);
  }

  function closeStep() {
    setSelectedStep(null);
  }

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
            {processSteps.map((step) => (
              <button
                key={step.number}
                type="button"
                onClick={() => openStep(step)}
                className="group overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.035] p-4 text-left transition duration-300 hover:-translate-y-2 hover:bg-white/[0.06]"
              >
                <div className="h-44">
                  <ProcessStepVisual type={step.previewType} />
                </div>

                <div className="p-3 pt-6">
                  <div className="mb-8 flex items-start justify-between">
                    <span className="text-5xl font-semibold tracking-[-0.08em] text-white/10 transition group-hover:text-white/20">
                      {step.number}
                    </span>

                    <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-white/45">
                      {step.tag}
                    </span>
                  </div>

                  <h3 className="text-2xl font-semibold tracking-[-0.03em] text-white">
                    {step.title}
                  </h3>

                  <p className="mt-4 leading-7 text-white/50">
                    {step.shortText}
                  </p>

                  <div className="mt-6 grid max-h-0 gap-3 overflow-hidden opacity-0 transition-all duration-300 group-hover:max-h-40 group-hover:opacity-100">
                    {(step.hoverPoints || []).map((point) => (
                      <div key={point} className="flex items-center gap-3">
                        <Check size={16} className="text-white/70" />
                        <span className="text-sm text-white/55">{point}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-5">
                    <span className="text-sm font-medium text-white/60">
                      Vezi detalii
                    </span>

                    <ArrowUpRight
                      size={19}
                      className="text-white/35 transition group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-white"
                    />
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </AnimatedSection>

      <AnimatePresence mode="wait">
        {selectedStep && (
          <ProcessModal
            key={selectedStep.number}
            step={selectedStep}
            onClose={closeStep}
          />
        )}
      </AnimatePresence>
    </>
  );
}

export default Process;