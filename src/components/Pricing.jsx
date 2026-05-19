import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";

import AnimatedSection from "./AnimatedSection";
import SectionHeader from "./SectionHeader";
import { pricing } from "../data/pricing";

function Pricing({ onSelectPlan }) {
  const [activePlanIndex, setActivePlanIndex] = useState(
    Math.max(
      pricing.findIndex((plan) => plan.highlight),
      0
    )
  );

  const activePlan = pricing[activePlanIndex];

  return (
    <AnimatedSection id="preturi" className="relative px-5 py-14 md:py-24 lg:px-8">
      <div className="pointer-events-none absolute inset-0 hidden overflow-hidden md:block">
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

        <div className="md:hidden">
          <div
            className="mb-4 grid grid-cols-3 gap-2 rounded-[1.4rem] border border-white/10 bg-white/[0.035] p-2"
            role="tablist"
            aria-label="Alege pachetul"
          >
            {pricing.map((plan, index) => {
              const active = activePlanIndex === index;

              return (
                <button
                  key={plan.name}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  aria-label={`Afișează pachetul ${plan.name}`}
                  onClick={() => setActivePlanIndex(index)}
                  className={`rounded-full px-3 py-2 text-xs font-semibold transition ${
                    active
                      ? "bg-white text-black"
                      : "text-white/60 hover:bg-white/[0.06] hover:text-white"
                  }`}
                >
                  {plan.name}
                </button>
              );
            })}
          </div>

          <PricingCard plan={activePlan} onSelectPlan={onSelectPlan} compact />
        </div>

        <div className="hidden gap-6 md:grid lg:grid-cols-3">
          {pricing.map((plan) => (
            <PricingCard
              key={plan.name}
              plan={plan}
              onSelectPlan={onSelectPlan}
            />
          ))}
        </div>

        <div className="mt-6 rounded-[1.55rem] border border-white/10 bg-white/[0.03] p-5 md:mt-8 md:rounded-[2rem] md:p-6">
          <div className="flex flex-col items-start justify-between gap-5 md:flex-row md:items-center">
            <div>
              <p className="text-lg font-semibold tracking-[-0.03em] text-white md:text-xl">
                Nu știi ce pachet ți se potrivește?
              </p>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-white/58 md:text-base md:leading-7">
                Spune-mi ce tip de site îți dorești și îți recomand varianta
                potrivită în funcție de obiectiv, structură și buget.
              </p>
            </div>

            <button
              type="button"
              onClick={() => onSelectPlan?.("Standard")}
              aria-label="Cere recomandare pentru pachet"
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

function PricingCard({ plan, onSelectPlan, compact = false }) {
  return (
    <div
      className={`group relative flex h-full flex-col rounded-[1.55rem] border transition duration-300 md:rounded-[2rem] ${
        compact ? "p-5" : "p-7"
      } ${
        plan.highlight
          ? "border-white/20 bg-white text-black shadow-[0_18px_70px_rgba(255,255,255,0.08)]"
          : "border-white/10 bg-white/[0.035] text-white hover:-translate-y-1 hover:bg-white/[0.05]"
      }`}
    >
      {plan.badge && (
        <div className="absolute right-5 top-5 rounded-full bg-black px-3 py-1 text-xs font-medium text-white md:right-6 md:top-6">
          {plan.badge}
        </div>
      )}

      <div className="mb-5 md:mb-8">
        <p
          className={`text-xs uppercase tracking-[0.24em] md:text-sm md:tracking-[0.28em] ${
            plan.highlight ? "text-black/55" : "text-white/40"
          }`}
        >
          {plan.eyebrow}
        </p>

        <h3 className="mt-3 text-2xl font-semibold tracking-[-0.04em] md:mt-4 md:text-3xl">
          {plan.name}
        </h3>

        <p
          className={`mt-4 text-4xl font-semibold tracking-[-0.06em] md:mt-6 md:text-5xl ${
            plan.highlight ? "text-black" : "text-white"
          }`}
        >
          {plan.price}
        </p>

        <p
          className={`mt-4 max-w-sm text-sm leading-6 md:mt-5 md:text-base md:leading-8 ${
            plan.highlight ? "text-black/65" : "text-white/60"
          }`}
        >
          {plan.description}
        </p>
      </div>

      <div className={`mb-5 h-px w-full md:mb-8 ${plan.highlight ? "bg-black/10" : "bg-white/10"}`} />

      <div className="flex-1">
        <ul className="grid gap-3 md:gap-4">
          {plan.features.slice(0, compact ? 5 : plan.features.length).map((feature) => (
            <li key={feature} className="flex items-start gap-3">
              <span
                className={`mt-0.5 flex h-5 w-5 items-center justify-center rounded-full ${
                  plan.highlight ? "bg-black/6 text-black" : "bg-white/[0.06] text-white"
                }`}
              >
                <Check size={14} />
              </span>

              <span
                className={`text-sm leading-6 md:text-[15px] md:leading-7 ${
                  plan.highlight ? "text-black/75" : "text-white/68"
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
        aria-label={`Alege pachetul ${plan.name}`}
        className={`mt-6 inline-flex items-center justify-between rounded-full px-5 py-4 text-sm font-semibold transition md:mt-10 ${
          plan.highlight
            ? "bg-black text-white hover:bg-black/90"
            : "border border-white/10 bg-white/[0.03] text-white hover:bg-white hover:text-black"
        }`}
      >
        <span>{plan.cta}</span>
        <ArrowRight size={17} />
      </button>
    </div>
  );
}

export default Pricing;
