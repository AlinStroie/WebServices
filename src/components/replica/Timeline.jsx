import { useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "framer-motion";

import { processSteps } from "../../data/process";

/**
 * Scroll-linked process timeline.
 *
 * This is the only genuinely scroll-LINKED effect on the page (everything
 * else is scroll-triggered). Measured behaviour from the reference:
 *
 *   - progress fill is exactly linear and 1:1 with scroll distance —
 *     no easing, no spring, no lerp. A spring here lags behind the
 *     scroll position and reads as broken rather than smooth.
 *   - transform-origin must be `top`, or the bar grows from the middle.
 *   - markers flip grey -> accent with a 300ms background-color
 *     transition as the fill passes them.
 *   - the step number rolls between DISCRETE stops on a 700ms
 *     ease-in-out, rather than tracking scroll continuously.
 *
 * The sidebar is `sm:sticky` and goes static below the sm breakpoint —
 * a pinned sidebar on a 375px viewport eats the whole screen.
 */
function Timeline() {
  const listRef = useRef(null);
  const [active, setActive] = useState(0);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    const index = Math.min(
      processSteps.length - 1,
      Math.max(0, Math.round(value * (processSteps.length - 1)))
    );

    setActive(index);
  });

  return (
    <section
      id="proces"
      className="relative w-full bg-gradient-to-b from-[color:var(--color-surface-2)] from-0% via-[color:var(--color-surface-2)] via-90% to-[color:var(--color-surface)] px-6 py-32 sm:px-8 lg:py-40"
    >
      <div className="mx-auto w-full max-w-[1366px]">
        <div className="grid gap-4 md:grid-cols-12 md:gap-8">
          {/* Sticky sidebar: eyebrow, rolling number, active step title */}
          <div className="h-fit md:col-span-4 md:sticky md:top-20">
            <p className="eyebrow text-[color:var(--color-copy-muted)]">
              Proces
            </p>

            <div
              className="relative mt-6 overflow-hidden"
              style={{ height: "0.8em", fontSize: "clamp(5rem,14vw,16rem)" }}
              aria-hidden="true"
            >
              <motion.div
                className="absolute inset-x-0 top-0 flex w-fit flex-col"
                animate={{ y: `${-active * 0.8}em` }}
                transition={
                  reduceMotion
                    ? { duration: 0 }
                    : { duration: 0.7, ease: [0.4, 0, 0.2, 1] }
                }
              >
                {processSteps.map((step) => (
                  <span
                    key={step.number}
                    className="display block text-[color:var(--color-ink)]"
                    style={{ lineHeight: 0.8 }}
                  >
                    {step.number.replace(/^0/, "")}.
                  </span>
                ))}
              </motion.div>
            </div>

            <h2 className="display mt-8 max-w-[14ch] text-[clamp(1.5rem,2.5vw,2rem)] text-[color:var(--color-ink)]">
              {processSteps[active].title}
            </h2>

            <p className="mt-4 max-w-[36ch] text-[15px] text-[color:var(--color-ink)]/65">
              {processSteps[active].shortText}
            </p>
          </div>

          {/* Milestone list with the progress rail */}
          <div
            ref={listRef}
            className="relative pl-10 md:col-span-7 md:col-start-6"
          >
            {/* rail track */}
            <div className="absolute left-0 top-2 h-[calc(100%-1rem)] w-0.5 bg-[color:var(--color-ink)]/15" />

            {/* rail fill — linear, origin top */}
            <motion.div
              className="absolute left-0 top-2 h-[calc(100%-1rem)] w-0.5 origin-top bg-[color:var(--color-accent)]"
              style={{ scaleY: scrollYProgress }}
            />

            <div className="grid gap-16">
              {processSteps.map((step, index) => (
                <div key={step.number} className="relative">
                  {/* marker, centred on the rail */}
                  <span
                    className="absolute -left-10 top-2 h-3 w-3 rounded-full transition-colors duration-300"
                    style={{
                      transform: "translate(-5px, 0)",
                      backgroundColor:
                        index <= active
                          ? "var(--color-accent)"
                          : "rgb(209 213 219)",
                    }}
                  />

                  <p className="eyebrow text-[color:var(--color-copy-muted)]">
                    {step.tag}
                  </p>

                  <h3 className="display mt-3 text-[clamp(1.25rem,2vw,1.75rem)] text-[color:var(--color-ink)]">
                    {step.title}
                  </h3>

                  <p className="mt-4 max-w-[52ch] text-[15px] leading-relaxed text-[color:var(--color-ink)]/70">
                    {step.details.intro}
                  </p>

                  <ul className="mt-5 grid gap-2">
                    {step.details.points.slice(0, 3).map((point) => (
                      <li
                        key={point}
                        className="flex gap-3 text-sm text-[color:var(--color-ink)]/60"
                      >
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[color:var(--color-ink)]/30" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Timeline;
