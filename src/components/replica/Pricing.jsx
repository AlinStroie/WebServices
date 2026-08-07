import { Check } from "lucide-react";

import Reveal from "./Reveal";
import { pricing } from "../../data/pricing";

/**
 * Pricing — three-up, holds its columns down to the md breakpoint and
 * stacks at mobile, same ladder as the process cards. The recommended
 * plan carries the dual-speed conic glow used on the highlighted card
 * elsewhere on the page, so the emphasis device stays consistent.
 */
function Pricing({ onSelectPlan }) {
  return (
    <section
      id="preturi"
      className="isolate w-full bg-[color:var(--color-ink)] px-6 py-32 sm:px-8 lg:py-40"
    >
      <div className="mx-auto w-full max-w-[1366px]">
        <div className="flex flex-col items-center gap-4 text-center lg:gap-8">
          <p className="eyebrow text-[color:var(--color-copy-subtle-on-dark)]">
            Prețuri
          </p>

          <h2 className="display text-[clamp(2rem,5vw,4rem)] text-white">
            Pachete
          </h2>

          <p className="measure-tight text-[color:var(--color-copy-on-dark)]">
            Prețurile de mai jos sunt puncte de pornire. Bugetul final depinde
            de numărul de pagini și de funcționalitățile cerute.
          </p>
        </div>

        <div className="mt-20 grid gap-8 md:grid-cols-3">
          {pricing.map((plan, index) => (
            <Reveal key={plan.name} delay={index * 0.05}>
              <article
                className={`h-full rounded-3xl p-px ${
                  plan.highlight ? "replica-glow" : ""
                }`}
              >
                <div className="flex h-full flex-col gap-8 rounded-3xl border border-[color:var(--color-divider-on-dark)] bg-[color:var(--color-ink-soft)] p-8">
                  <div className="grid gap-3">
                    <div className="flex items-center justify-between gap-3">
                      <p className="eyebrow text-[color:var(--color-copy-subtle-on-dark)]">
                        {plan.eyebrow}
                      </p>

                      {plan.badge && (
                        <span className="rounded-full bg-[color:var(--color-accent)]/15 px-3 py-1 text-xs font-medium text-[color:var(--color-accent)]">
                          {plan.badge}
                        </span>
                      )}
                    </div>

                    <h3 className="text-xl font-semibold text-white">
                      {plan.name}
                    </h3>

                    <p className="display text-[clamp(2rem,3vw,2.75rem)] text-white">
                      {plan.price}
                    </p>

                    <p className="text-[15px] leading-relaxed text-[color:var(--color-copy-on-dark)]">
                      {plan.description}
                    </p>
                  </div>

                  <ul className="grid flex-1 gap-3">
                    {plan.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-3 text-sm text-[color:var(--color-copy-on-dark)]"
                      >
                        <Check
                          size={16}
                          className="mt-0.5 shrink-0 text-[color:var(--color-accent)]"
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <button
                    type="button"
                    onClick={() => onSelectPlan?.(plan.name)}
                    className={`w-full rounded-full px-6 py-4 text-[15px] font-medium transition-transform duration-200 hover:scale-[1.02] ${
                      plan.highlight
                        ? "bg-[color:var(--color-brand)] text-white"
                        : "border border-[color:var(--color-divider-on-dark)] text-white"
                    }`}
                  >
                    {plan.cta}
                  </button>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Pricing;
