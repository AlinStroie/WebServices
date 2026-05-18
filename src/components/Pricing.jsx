import { ArrowRight, Check } from "lucide-react";

import AnimatedSection from "./AnimatedSection";
import SectionHeader from "./SectionHeader";
import { pricing } from "../data/pricing";

function Pricing({ onSelectPlan }) {
  return (
    <AnimatedSection id="preturi" className="relative px-5 py-24 lg:px-8">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-24 h-72 w-72 -translate-x-1/2 rounded-full bg-white/[0.05] blur-[120px]" />
        <div className="absolute bottom-10 left-20 h-40 w-40 rounded-full bg-white/[0.03] blur-[100px]" />
        <div className="absolute bottom-0 right-20 h-44 w-44 rounded-full bg-white/[0.025] blur-[110px]" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Prețuri"
          title="Pachete clare, fără complicații."
          text="Alege varianta potrivită în funcție de obiectivul proiectului. Dacă nu ești sigur, îți recomand varianta potrivită."
        />

        <div className="grid gap-6 lg:grid-cols-3">
          {pricing.map((plan) => (
            <div
              key={plan.name}
              className={`group relative flex h-full flex-col rounded-[2rem] border p-7 transition duration-300 ${
                plan.highlight
                  ? "border-white/20 bg-white text-black shadow-[0_18px_70px_rgba(255,255,255,0.08)]"
                  : "border-white/10 bg-white/[0.035] text-white hover:-translate-y-1 hover:bg-white/[0.05]"
              }`}
            >
              {plan.badge && (
                <div className="absolute right-6 top-6 rounded-full bg-black px-3 py-1 text-xs font-medium text-white">
                  {plan.badge}
                </div>
              )}

              <div className="mb-8">
                <p
                  className={`text-sm uppercase tracking-[0.28em] ${
                    plan.highlight ? "text-black/55" : "text-white/35"
                  }`}
                >
                  {plan.eyebrow}
                </p>

                <h3 className="mt-4 text-3xl font-semibold tracking-[-0.04em]">
                  {plan.name}
                </h3>

                <p
                  className={`mt-6 text-5xl font-semibold tracking-[-0.06em] ${
                    plan.highlight ? "text-black" : "text-white"
                  }`}
                >
                  {plan.price}
                </p>

                <p
                  className={`mt-5 max-w-sm text-base leading-8 ${
                    plan.highlight ? "text-black/60" : "text-white/55"
                  }`}
                >
                  {plan.description}
                </p>
              </div>

              <div
                className={`mb-8 h-px w-full ${
                  plan.highlight ? "bg-black/10" : "bg-white/10"
                }`}
              />

              <div className="flex-1">
                <ul className="space-y-4">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <span
                        className={`mt-0.5 flex h-5 w-5 items-center justify-center rounded-full ${
                          plan.highlight
                            ? "bg-black/6 text-black"
                            : "bg-white/[0.06] text-white"
                        }`}
                      >
                        <Check size={14} />
                      </span>

                      <span
                        className={`text-[15px] leading-7 ${
                          plan.highlight ? "text-black/75" : "text-white/65"
                        }`}
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                type="button"
                onClick={() => onSelectPlan?.(plan.name)}
                className={`mt-10 inline-flex items-center justify-between rounded-full px-5 py-4 text-sm font-semibold transition ${
                  plan.highlight
                    ? "bg-black text-white hover:bg-black/90"
                    : "border border-white/10 bg-white/[0.03] text-white hover:bg-white hover:text-black"
                }`}
              >
                <span>{plan.cta}</span>
                <ArrowRight size={17} />
              </button>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-[2rem] border border-white/10 bg-white/[0.03] p-5 md:p-6">
          <div className="flex flex-col items-start justify-between gap-5 md:flex-row md:items-center">
            <div>
              <p className="text-xl font-semibold tracking-[-0.03em] text-white">
                Nu știi ce pachet ți se potrivește?
              </p>
              <p className="mt-2 max-w-2xl text-sm leading-7 text-white/50 md:text-base">
                Spune-mi ce tip de site îți dorești și îți recomand varianta
                potrivită în funcție de obiectiv, structură și buget.
              </p>
            </div>

            <button
              type="button"
              onClick={() => onSelectPlan?.("Standard")}
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-black transition hover:bg-white/90"
            >
              Cere recomandare
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}

export default Pricing;