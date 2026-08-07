import { motion, useReducedMotion } from "framer-motion";
import { Check, Star } from "lucide-react";

import SplitText from "./SplitText";

const proofPoints = ["Design curat", "Livrare rapidă", "Optimizat mobil"];

/**
 * Sticky hero.
 *
 * The wrapper carries `mb-[-100svh]` and the section is `sticky top-0`,
 * so the next section is pulled up by exactly one viewport height and
 * scrolls OVER the pinned hero. Pure CSS — no scroll listener, no
 * IntersectionObserver.
 *
 * The 100svh spacer below the hero is load-bearing: a sticky element can
 * only travel within its containing block, so without it the wrapper is
 * exactly as tall as the hero and the pin has nowhere to go (the hero
 * just scrolls away). The reference does the same thing — its wrapper is
 * 1793px around an 864px hero, the difference being one viewport.
 *
 * Two hard requirements for this to work, both satisfied in Home.jsx:
 *   1. No ancestor may have `overflow: hidden` (it would become the
 *      scroll container and silently kill the stickiness).
 *   2. The following section must be opaque and stacked above.
 */
function Hero({ onBook }) {
  const reduceMotion = useReducedMotion();
  const fade = (delay) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, delay, ease: [0.33, 1, 0.68, 1] },
        };

  return (
    <div className="mb-[-100svh] bg-[color:var(--color-surface)]">
      <section
        id="hero"
        className="sticky top-0 overflow-clip"
        style={{ height: "min(880px, 100svh)" }}
      >
        <div className="mx-auto h-full w-full max-w-[1366px] px-6 sm:px-8">
          <div className="grid h-full items-center md:grid-cols-6 lg:grid-cols-12">
            {/* No top padding: the grid is already `items-center`, so any
                pt fights the centring and pushes content below the fold. */}
            <div className="col-span-full grid gap-10 pt-12 md:col-span-6 lg:col-span-8 lg:gap-16 lg:pt-0">
              <div className="grid gap-8">
                <motion.p
                  className="eyebrow text-[color:var(--color-copy-muted)]"
                  {...fade(0)}
                >
                  Web design · Brașov
                </motion.p>

                <h1 className="display text-[clamp(2.25rem,7vw,4.5rem)] text-[color:var(--color-ink)]">
                  <SplitText text={"Site-uri clare,\nrapide și bine\nstructurate."} />
                </h1>

                <motion.ul
                  className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm"
                  {...fade(0.5)}
                >
                  {proofPoints.map((point) => (
                    <li key={point} className="flex items-center gap-2">
                      <Check
                        size={16}
                        className="text-[color:var(--color-accent)]"
                      />
                      <span className="text-[color:var(--color-ink)]/80">
                        {point}
                      </span>
                    </li>
                  ))}
                </motion.ul>
              </div>

              <motion.div
                className="flex flex-col gap-5 sm:flex-row sm:items-center"
                {...fade(0.65)}
              >
                <button
                  type="button"
                  onClick={onBook}
                  className="rounded-full bg-[color:var(--color-brand)] px-8 py-4 text-base font-medium text-white transition-transform duration-200 hover:scale-[1.03]"
                >
                  Programează o discuție
                </button>

                <div className="flex items-center gap-4">
                  <div className="flex" aria-hidden="true">
                    {[0, 1, 2, 3, 4].map((i) => (
                      <Star
                        key={i}
                        size={18}
                        className="fill-[color:var(--color-ink)] text-[color:var(--color-ink)]"
                      />
                    ))}
                  </div>
                  <p className="text-sm text-[color:var(--color-copy-muted)]">
                    Proiecte livrate pentru afaceri locale
                  </p>
                </div>
              </motion.div>
            </div>

            {/*
              Decorative panel. The reference bleeds a portrait photo off the
              right edge; we have no such asset, so this is a generic
              composition built from our own brand mark — no borrowed imagery.
            */}
            <motion.div
              className="pointer-events-none relative col-span-4 hidden self-center lg:block"
              {...fade(0.4)}
            >
              <div className="relative ml-auto aspect-[4/5] w-full max-w-[420px] overflow-hidden rounded-[2rem] bg-[color:var(--color-ink)]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(47,75,255,0.45),transparent_60%),radial-gradient(circle_at_75%_80%,rgba(16,185,129,0.35),transparent_55%)]" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="display text-[9rem] text-white/90">A²</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Scroll room for the pin. See the note above — without this the
          sticky hero has no travel distance and simply scrolls away. */}
      <div aria-hidden="true" className="h-[100svh]" />
    </div>
  );
}

export default Hero;
