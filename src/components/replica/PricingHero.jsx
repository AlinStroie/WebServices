import { useEffect, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

import SplitText from "./SplitText";

/**
 * Pricing hero — reference's centered light hero: a pill eyebrow, a
 * 3-line centered headline with a serif-italic accent line, and a muted
 * subhead. No image/CTA in the reference at this fold (those start in the
 * next, dark section), so this stays text-only.
 *
 * Same sticky scroll-fade as the homepage Hero (mb-[-100svh] + sticky pin
 * + scrollY-driven opacity/scale) so the two pages share one animation
 * language.
 */
function PricingHero() {
  const reduceMotion = useReducedMotion();

  const [viewportH, setViewportH] = useState(() =>
    typeof window !== "undefined" ? window.innerHeight : 800
  );
  useEffect(() => {
    const onResize = () => setViewportH(window.innerHeight);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, viewportH * 0.8], [1, 0]);
  const scale = useTransform(scrollY, [0, viewportH * 0.9], [1, 0.93]);

  const fade = (delay) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, delay, ease: [0.33, 1, 0.68, 1] },
        };

  return (
    <div className="grad-light mb-[-100svh]">
      <section
        className="relative sticky top-0 overflow-clip"
        style={{ height: "min(880px, 100svh)" }}
      >
        <div className="hero-bloom" aria-hidden="true" />

        <motion.div
          className="relative z-10 mx-auto flex h-full w-full max-w-[900px] flex-col items-center justify-center gap-8 px-6 text-center sm:px-8"
          style={reduceMotion ? undefined : { opacity, scale }}
        >
          <motion.p className="eyebrow-pill" {...fade(0)}>
            Pachete și prețuri
          </motion.p>

          <h1 className="display text-[clamp(2.25rem,6vw,4.5rem)] text-[color:var(--color-ink)]">
            <SplitText
              text={"Prețuri corecte\n*pentru un site* care\nchiar performează"}
            />
          </h1>

          <motion.p
            className="measure-tight text-[clamp(1rem,2vw,1.25rem)] text-[color:var(--color-copy-muted)]"
            {...fade(0.5)}
          >
            Aceeași calitate pentru care agențiile mari cer 20.000€+.
            Prețuri transparente, fără surprize, fără șabloane.
          </motion.p>
        </motion.div>
      </section>

      {/* Scroll room for the pin. */}
      <div aria-hidden="true" className="h-[100svh]" />
    </div>
  );
}

export default PricingHero;
