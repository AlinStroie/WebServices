import AnimatedSection from "./AnimatedSection";
import SectionHeader from "./SectionHeader";
import { pricing } from "../data/pricing";
import { Check } from "lucide-react";

function Pricing() {
  return (
    <AnimatedSection id="preturi" className="px-5 py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Prețuri"
          title="Pachete simple, ușor de adaptat."
          text="Prețurile sunt orientative și pot fi modificate în funcție de complexitatea proiectului."
        />

        <div className="grid gap-5 lg:grid-cols-3">
          {pricing.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-[2rem] border p-8 ${
                plan.highlight
                  ? "border-white bg-white text-black"
                  : "border-white/10 bg-white/[0.035] text-white"
              }`}
            >
              <p className={plan.highlight ? "text-black/55" : "text-white/45"}>
                {plan.name}
              </p>

              <h3 className="mt-4 text-4xl font-semibold tracking-[-0.04em]">
                {plan.price}
              </h3>

              <p className={plan.highlight ? "mt-4 text-black/60" : "mt-4 text-white/50"}>
                {plan.description}
              </p>

              <ul className="mt-8 space-y-4">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex gap-3">
                    <Check
                      size={19}
                      className={plan.highlight ? "text-black" : "text-white"}
                    />
                    <span className={plan.highlight ? "text-black/70" : "text-white/60"}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                className={`mt-9 inline-flex w-full justify-center rounded-full px-6 py-4 font-semibold transition ${
                  plan.highlight
                    ? "bg-black text-white hover:bg-black/85"
                    : "border border-white/10 bg-white/[0.04] text-white hover:bg-white/[0.08]"
                }`}
              >
                Alege pachetul
              </a>
            </div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}

export default Pricing;