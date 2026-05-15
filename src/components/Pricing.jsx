import { ArrowRight, Check } from "lucide-react";

import AnimatedSection from "./AnimatedSection";
import SectionHeader from "./SectionHeader";
import { pricing } from "../data/pricing";

function Pricing({ onSelectPlan }) {
  return (
    <AnimatedSection id="preturi" className="px-5 py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Prețuri"
          title="Pachete simple, ușor de adaptat."
          text="Alege pachetul potrivit și trimite rapid o cerere de ofertă."
        />

        <div className="grid gap-5 lg:grid-cols-3">
          {pricing.map((plan) => (
            <div
              key={plan.name}
              className={`group relative overflow-hidden rounded-[2rem] border p-8 transition duration-300 hover:-translate-y-2 ${
                plan.highlight
                  ? "border-white bg-white text-black shadow-[0_0_80px_rgba(255,255,255,0.12)]"
                  : "border-white/10 bg-white/[0.035] text-white hover:border-white/20"
              }`}
            >
              <div
                className={`pointer-events-none absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100 ${
                  plan.highlight
                    ? "bg-[radial-gradient(circle_at_top,rgba(0,0,0,0.16),transparent_45%)]"
                    : "bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.13),transparent_45%)]"
                }`}
              />

              <div
                className={`pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full blur-3xl transition duration-500 group-hover:scale-125 ${
                  plan.highlight ? "bg-black/10" : "bg-white/10"
                }`}
              />

              <div className="relative z-10 flex h-full flex-col">
                <div className="mb-8 flex items-center justify-between">
                  <p className={plan.highlight ? "text-black/55" : "text-white/45"}>
                    {plan.name}
                  </p>

                  {plan.highlight && (
                    <span className="rounded-full bg-black px-3 py-1 text-xs font-semibold text-white">
                      Recomandat
                    </span>
                  )}
                </div>

                <h3 className="text-4xl font-semibold tracking-[-0.04em]">
                  {plan.price}
                </h3>

                <p
                  className={
                    plan.highlight
                      ? "mt-4 leading-7 text-black/60"
                      : "mt-4 leading-7 text-white/50"
                  }
                >
                  {plan.description}
                </p>

                <ul className="mt-8 mb-10 space-y-4">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex gap-3">
                      <Check
                        size={19}
                        className={plan.highlight ? "text-black" : "text-white"}
                      />

                      <span
                        className={
                          plan.highlight ? "text-black/70" : "text-white/60"
                        }
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  onClick={() => onSelectPlan(plan.name)}
                  className={`mt-auto inline-flex items-center justify-between gap-3 rounded-full px-5 py-4 text-sm font-semibold transition duration-300 ${
                    plan.highlight
                      ? "bg-black text-white hover:scale-[1.02] hover:bg-black/85"
                      : "border border-white/10 bg-white/[0.04] text-white hover:scale-[1.02] hover:bg-white/[0.08]"
                  }`}
                >
                  Alege {plan.name}
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-10 flex max-w-3xl flex-col items-center justify-between gap-5 rounded-[2rem] border border-white/10 bg-white/[0.035] p-6 text-center md:flex-row md:text-left">
          <div>
            <h3 className="text-xl font-semibold tracking-[-0.03em]">
              Nu știi ce pachet ți se potrivește?
            </h3>
            <p className="mt-2 text-white/50">
              Deschide formularul și îți recomandăm varianta potrivită.
            </p>
          </div>

          <button
            type="button"
            onClick={() => onSelectPlan("Standard")}
            className="shrink-0 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:scale-[1.03] hover:bg-white/90"
          >
            Cere recomandare
          </button>
        </div>
      </div>
    </AnimatedSection>
  );
}

export default Pricing;