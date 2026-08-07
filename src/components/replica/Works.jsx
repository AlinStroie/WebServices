import { ArrowUpRight } from "lucide-react";

import Reveal from "./Reveal";
import PortfolioBrowserFrame from "../PortfolioBrowserFrame";
import { portfolio } from "../../data/portfolio";

/**
 * Featured projects.
 *
 * Layout follows the reference: a `2fr 1fr` split so the visual gets twice
 * the width of the copy, the copy column vertically centred against it,
 * and a generous 160px between projects. That spacing is why the section
 * is so tall — each project gets its own moment instead of reading as a
 * grid.
 *
 * Rows alternate direction on desktop so the eye zig-zags down the page.
 *
 * We keep PortfolioBrowserFrame (our own browser-chrome mockup) rather
 * than the reference's bare images — it is a stronger presentation and
 * it is ours.
 */
function Works({ onBook }) {
  return (
    <section id="lucrari" className="w-full bg-[color:var(--color-ink)]">
      <div className="mx-auto grid w-full max-w-[1366px] gap-24 px-6 pb-40 pt-40 sm:px-8 md:gap-40">
        <div className="grid gap-6">
          <p className="eyebrow text-[color:var(--color-copy-subtle-on-dark)]">
            Lucrări
          </p>

          <h2 className="display max-w-[16ch] text-[clamp(2rem,5vw,4rem)] text-white">
            Proiecte și concepte
          </h2>
        </div>

        <div className="grid gap-20 md:gap-40">
          {portfolio.map((project, index) => {
            const flipped = index % 2 === 1;

            return (
              <Reveal key={project.id}>
                <article className="grid justify-between gap-10 md:gap-20 lg:grid-cols-[2fr_1fr]">
                  <div
                    className={`aspect-[16/10] w-full ${
                      flipped ? "lg:order-2" : ""
                    }`}
                  >
                    <PortfolioBrowserFrame project={project} size="card" />
                  </div>

                  <div
                    className={`grid content-center gap-10 lg:gap-16 ${
                      flipped ? "lg:order-1" : ""
                    }`}
                  >
                    <div className="grid gap-5">
                      <p className="eyebrow text-[color:var(--color-accent)]">
                        {project.category}
                      </p>

                      <h3 className="display text-[clamp(1.75rem,3vw,2.5rem)] text-white">
                        {project.title}
                      </h3>

                      <p className="text-[15px] leading-relaxed text-[color:var(--color-copy-on-dark)]">
                        {project.text}
                      </p>
                    </div>

                    <ul className="grid gap-3">
                      {project.features.slice(0, 3).map((feature) => (
                        <li
                          key={feature}
                          className="flex gap-3 border-t border-[color:var(--color-divider-on-dark)] pt-3 text-sm text-[color:var(--color-copy-subtle-on-dark)]"
                        >
                          <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[color:var(--color-accent)]" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <button
                      type="button"
                      onClick={onBook}
                      className="inline-flex w-fit items-center gap-2 text-sm font-medium text-white transition-opacity duration-200 hover:opacity-70"
                    >
                      Vreau ceva similar
                      <ArrowUpRight size={16} />
                    </button>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Works;
