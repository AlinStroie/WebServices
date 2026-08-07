import Reveal from "./Reveal";
import { stats } from "../../data/stats";

/**
 * Stat row — 4 columns -> 2 -> 1, with a deliberately tight 0.4rem gap
 * between each number and its label so the pair reads as one unit.
 *
 * No count-up animation, matching the reference. That restraint is a
 * feature: count-ups are also an accessibility nuisance, since some
 * screen readers announce every intermediate value.
 *
 * Content lives in src/data/stats.js — swap placeholders for real,
 * defensible numbers there; no change needed here.
 */
function Stats() {
  return (
    <section className="grad-dark w-full px-6 py-32 sm:px-8">
      <div className="mx-auto flex w-full max-w-[1366px] flex-col items-center">
        <div className="grid w-full grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Reveal key={stat.label} delay={index * 0.05}>
              <div className="flex flex-col items-center gap-[0.4rem] text-center">
                <span className="display text-[clamp(3rem,6vw,4.5rem)] text-white">
                  {stat.value}
                </span>
                <span className="text-sm text-[color:var(--color-copy-subtle-on-dark)]">
                  {stat.label}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Stats;
