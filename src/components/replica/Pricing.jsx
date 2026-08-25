import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ArrowUpRight, Check, ChevronLeft, ChevronRight, Target } from "lucide-react";
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
 * pricing block at ~1080px inside a much wider viewport, not edge-to-edge)
 * and a flat near-black surface (.pricing-surface, darker than the site's
 * usual .grad-dark).
 *
 * Tiers render as a drag/snap carousel (same native scroll-snap idiom as
 * VideoShowcase and the mobile Testimonials strip — no carousel library,
 * despite one sitting in package.json unused) rather than a static grid:
 * each card gets `snap-center` with side padding on the track so the
 * neighbouring tiers peek in at the edges, and the active (centred) card
 * is picked out via IntersectionObserver rather than scroll-position math,
 * since percentage-width peek cards don't sit on VideoShowcase's uniform
 * width*index grid. The carousel opens centred on the recommended tier
 * (Pro) instead of tier 0, so the "Cel mai ales" card is the first thing
 * seen, not something you have to swipe to find.
 *
 * The recommended plan additionally gets `.replica-halo-glow` (index.css,
 * shared with the homepage USP section's first card) plus an accent
 * border — that distinction is permanent (which tier is recommended),
 * independent of which card the carousel currently has centred (which
 * tier the visitor is looking at).
 *
 * The headline fills from a dim, barely-there gray to full white as it
 * scrolls up through the viewport — reference's title reads flat white
 * only once fully in view; on entry it's a dark, half-legible gray.
 */
function PricingCard({ plan }) {
  return (
    <div
      className={`relative h-full origin-center ${
        plan.highlight ? "replica-halo-glow" : ""
      }`}
    >
      {plan.badge && (
        <span className="absolute -top-3 right-8 z-20 rounded-full border border-[color:var(--color-accent)]/60 bg-[color:var(--color-ink)] px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-[color:var(--color-accent)] shadow-[0_0_16px_rgba(16,185,129,0.45)]">
          {plan.badge}
        </span>
      )}

      <article className="relative h-full rounded-3xl">
        <div
          className={`flex h-full flex-col gap-7 rounded-3xl border p-7 ${
            plan.highlight
              ? "border-[color:var(--color-accent)]/50 bg-[#161a2e]"
              : "border-[color:var(--color-divider-on-dark)] bg-[#121525]"
          }`}
        >
          <div className="grid gap-2">
            <h3 className="text-xl font-semibold text-white">{plan.name}</h3>

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
  );
}

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

  const trackRef = useRef(null);
  const cardRefs = useRef([]);
  const startIndex = Math.max(
    pricing.findIndex((plan) => plan.highlight),
    0,
  );
  const [activeIndex, setActiveIndex] = useState(startIndex);

  // Track side padding has to equal (track content width - card width) / 2
  // in PIXELS for the first/last card to ever be able to scroll all the way
  // to centre — Tailwind arbitrary-% padding can't do this: a flex item's
  // width% resolves against the container's content box (clientWidth minus
  // that container's own padding), so a %-padding and a %-width on the same
  // track feed back into each other (raising the padding% shrinks the
  // content box, which shrinks the card's own width%, which changes what
  // padding% would even need to be). Card width is set in `vw` instead
  // (viewport-relative, independent of the track's own box) specifically so
  // this measure-then-set-padding pass converges in one pass instead of
  // chasing a moving target.
  useLayoutEffect(() => {
    function syncEdgePadding() {
      const track = trackRef.current;
      const card = cardRefs.current[0];
      if (!track || !card) return;

      const padding = Math.max((track.clientWidth - card.offsetWidth) / 2, 0);
      track.style.paddingLeft = `${padding}px`;
      track.style.paddingRight = `${padding}px`;
    }

    syncEdgePadding();
    window.addEventListener("resize", syncEdgePadding);
    return () => window.removeEventListener("resize", syncEdgePadding);
  }, []);

  // Opens already centred on the recommended tier instead of tier 0 —
  // scrollIntoView with an "instant" behavior runs before paint, so there's
  // no visible scroll-snap animation on load. Deliberately runs once on
  // mount only — re-centring on the recommended tier every re-render would
  // fight the visitor's own scroll position.
  useLayoutEffect(() => {
    cardRefs.current[startIndex]?.scrollIntoView({
      inline: "center",
      block: "nearest",
      behavior: "instant",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Which card is "active" is tracked by nearest-to-centre rather than
  // an IntersectionObserver threshold: with vw-width peek cards, two
  // neighbours can both cross any fixed visibility threshold at once, so
  // isIntersecting would flip activeIndex to whichever entry happened to
  // be last in that batch rather than whichever card was actually
  // centred. Recomputing on every scroll frame — same rAF-throttled
  // approach VideoShowcase uses — reads correctly through the whole drag,
  // not just at rest.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return undefined;

    let frame = 0;

    function onScroll() {
      if (frame) return;

      frame = requestAnimationFrame(() => {
        frame = 0;
        const trackCenter = track.scrollLeft + track.clientWidth / 2;

        let nearest = 0;
        let nearestDistance = Infinity;
        cardRefs.current.forEach((card, i) => {
          if (!card) return;
          const cardCenter = card.offsetLeft + card.offsetWidth / 2;
          const distance = Math.abs(cardCenter - trackCenter);
          if (distance < nearestDistance) {
            nearestDistance = distance;
            nearest = i;
          }
        });

        setActiveIndex(nearest);
      });
    }

    track.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      track.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  function goTo(index) {
    cardRefs.current[index]?.scrollIntoView({
      inline: "center",
      block: "nearest",
      behavior: reduceMotion ? "instant" : "smooth",
    });
  }

  function page(delta) {
    goTo(Math.min(Math.max(activeIndex + delta, 0), pricing.length - 1));
  }

  return (
    <section
      id="preturi"
      className="pricing-surface isolate w-full overflow-hidden px-6 py-32 sm:px-8 lg:py-40"
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
      </div>

      <div
        ref={trackRef}
        // Horizontal padding is set imperatively (syncEdgePadding above),
        // not here — it has to match the card's rendered pixel width
        // exactly for the first/last card to be centerable at all.
        className="mt-16 flex snap-x snap-proximity gap-6 overflow-x-auto py-24 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {pricing.map((plan, index) => {
          const distance = Math.abs(index - activeIndex);

          return (
            // The scale/opacity live on an INNER wrapper, not this
            // snap-center flex item — scroll-snap computes each card's
            // snap point off its own (post-transform) box, so scaling
            // this element directly would shift its snap point out from
            // under the offsetLeft-based scroll math below, and the
            // carousel would never quite settle on the first/last card.
            <div
              key={plan.name}
              ref={(el) => (cardRefs.current[index] = el)}
              data-index={index}
              className="w-[84vw] shrink-0 snap-center sm:w-[60vw] lg:w-[38vw]"
            >
              <div
                className="origin-center transition-[opacity,transform] duration-500 ease-out"
                style={{
                  opacity: distance === 0 ? 1 : distance === 1 ? 0.55 : 0.3,
                  transform: `scale(${distance === 0 ? 1 : distance === 1 ? 0.92 : 0.85})`,
                }}
              >
                <PricingCard plan={plan} />
              </div>
            </div>
          );
        })}
      </div>

      <div className="mx-auto flex w-full max-w-[1080px] items-center justify-between px-6 sm:px-8">
        <div className="flex gap-3">
          <button
            type="button"
            aria-label="Pachetul anterior"
            onClick={() => page(-1)}
            disabled={activeIndex === 0}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-colors duration-300 hover:bg-white hover:text-[color:var(--color-ink)] disabled:pointer-events-none disabled:opacity-30"
          >
            <ChevronLeft size={19} />
          </button>

          <button
            type="button"
            aria-label="Pachetul următor"
            onClick={() => page(1)}
            disabled={activeIndex === pricing.length - 1}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-colors duration-300 hover:bg-white hover:text-[color:var(--color-ink)] disabled:pointer-events-none disabled:opacity-30"
          >
            <ChevronRight size={19} />
          </button>
        </div>

        <div className="flex gap-2">
          {pricing.map((plan, index) => (
            <button
              key={plan.name}
              type="button"
              aria-label={`Vezi pachetul ${plan.name}`}
              onClick={() => goTo(index)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === activeIndex
                  ? "w-8 bg-[color:var(--color-accent)]"
                  : "w-1.5 bg-white/30"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="mx-auto w-full max-w-[1080px]">
        <Reveal className="mt-10">
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
