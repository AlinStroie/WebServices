import { useRef } from "react";
import { ArrowUpRight, Check, Target } from "lucide-react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

import Reveal from "./Reveal";
import MagneticCta from "./MagneticCta";
import { pricing, pricingIncludes } from "../../data/pricing";

/**
 * Pricing — narrow, centered content column (reference runs its whole
 * pricing block at ~1080px inside a much wider viewport, not edge-to-edge),
 * a flat near-black surface (.pricing-surface, darker than the site's usual
 * .grad-dark), and a 2x2 card grid.
 *
 * The recommended plan gets `.replica-halo-glow` (index.css, shared with
 * the homepage USP section's first card): a blurred conic-gradient sitting
 * entirely behind the card, angle driven by an animated `@property` for
 * smooth rotation, opacity/scale pulsing on top for the "breathing" read.
 * The card's own fill/border are unchanged from the other tiers — only the
 * halo behind it differs. Its "best value" pill is a sibling, not a child
 * of the glow, so it never gets clipped by anything the glow layer does.
 *
 * The headline fills from a dim, barely-there gray to full white as it
 * scrolls up through the viewport — reference's title reads flat white
 * only once fully in view; on entry it's a dark, half-legible gray.
 */
function Pricing() {
  const reduceMotion = useReducedMotion();
  const titleRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: titleRef,
    offset: ["start 0.9", "start 0.4"],
  });
  const titleColor = useTransform(
    scrollYProgress,
    [0, 1],
    ["rgba(255, 255, 255, 0.2)", "#ffffff"],
  );

  return (
    <section
      id="preturi"
      className="pricing-surface isolate w-full px-6 py-32 sm:px-8 lg:py-40"
    >
      <div className="mx-auto w-full max-w-[1080px]">
        <div className="max-w-[42rem]">
          <p className="eyebrow text-[color:var(--color-copy-subtle-on-dark)]">
            Pachete și prețuri
          </p>

          <motion.h2
            ref={titleRef}
            className="display mt-4 text-[clamp(2rem,4.6vw,3.5rem)]"
            style={reduceMotion ? { color: "#ffffff" } : { color: titleColor }}
          >
            Afacerile serioase merită
            <br />
            site-uri la fel de serioase.
          </motion.h2>

          <p className="mt-6 text-base leading-7 text-[color:var(--color-copy-on-dark)]">
            Orice mai puțin de atât te face să pari că nu îți iei în serios
            propriul succes.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {pricing.map((plan, index) => (
            <Reveal key={plan.name} delay={index * 0.05}>
              <div className="relative h-full">
                {plan.badge && (
                  <span className="absolute -top-3 right-8 z-20 rounded-full border border-[color:var(--color-accent)]/60 bg-[color:var(--color-ink)] px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-[color:var(--color-accent)] shadow-[0_0_16px_rgba(16,185,129,0.45)]">
                    {plan.badge}
                  </span>
                )}

                <div
                  className={`relative h-full ${
                    plan.highlight ? "replica-halo-glow" : ""
                  }`}
                >
                  <article className="relative h-full rounded-3xl">
                    <div className="flex h-full flex-col gap-7 rounded-3xl border border-[color:var(--color-divider-on-dark)] bg-[#121525] p-7">
                      <div className="grid gap-2">
                        <h3 className="text-xl font-semibold text-white">
                          {plan.name}
                        </h3>

                        <p className="text-sm leading-relaxed text-[color:var(--color-copy-on-dark)]">
                          {plan.eyebrow}
                        </p>

                        <p className="text-sm italic leading-relaxed text-[color:var(--color-copy-subtle-on-dark)]">
                          {plan.audience}
                        </p>
                      </div>

                      <div className="border-t border-[color:var(--color-divider-on-dark)]" />

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

                      <div className="border-t border-[color:var(--color-divider-on-dark)]" />

                      <div className="grid gap-4">
                        <div>
                          <p
                            className="display text-[clamp(1.5rem,2.2vw,1.875rem)]"
                            style={{ color: "#c084fc" }}
                          >
                            {plan.price}
                          </p>
                          <p className="mt-1 text-sm text-[color:var(--color-copy-subtle-on-dark)]">
                            {plan.timeline}
                          </p>
                        </div>

                        <MagneticCta
                          to="/discovery"
                          className="w-fit px-5 py-2.5 text-sm font-medium text-white sm:px-6 sm:py-3"
                        >
                          {plan.cta}
                          <ArrowUpRight
                            size={16}
                            className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                          />
                        </MagneticCta>
                      </div>
                    </div>
                  </article>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-6">
          <div className="rounded-3xl border border-[color:var(--color-divider-on-dark)] bg-black/20 p-8 lg:p-10">
            <div className="flex items-center gap-3">
              <Target size={22} className="text-[color:var(--color-accent)]" />
              <h3 className="text-xl font-semibold text-white">
                Toate pachetele includ:
              </h3>
            </div>

            <div className="mt-8 grid gap-8 sm:grid-cols-2">
              {pricingIncludes.map((group) => (
                <div key={group.title} className="grid gap-3">
                  <p className="font-semibold text-white">{group.title}</p>

                  <ul className="grid gap-2">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="text-sm leading-relaxed text-[color:var(--color-copy-on-dark)]"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal className="mt-16">
          <p className="text-[clamp(1.125rem,2vw,1.5rem)] leading-[1.5] text-[color:var(--color-copy-on-dark)]">
            Fiecare pachet include o{" "}
            <span className="font-semibold text-white">
              construcție complet personalizată
            </span>{" "}
            adaptată obiectivului tău,{" "}
            <span className="font-semibold text-white">
              performanță rapidă tip aplicație
            </span>{" "}
            cu navigare fără reîncărcări de pagină, o{" "}
            <span className="font-semibold text-white">
              experiență mobilă impecabilă
            </span>{" "}
            pe orice dispozitiv și{" "}
            <span className="font-semibold text-white">optimizare SEO</span>{" "}
            care te aduce în fața clienților potriviți.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

export default Pricing;
