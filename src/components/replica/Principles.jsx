import { Quote } from "lucide-react";

import Reveal from "./Reveal";
import { testimonials } from "../../data/testimonials";

/**
 * Two-column card grid occupying the reference's testimonials slot.
 *
 * Layout and motion are replicated exactly (2 cols -> 1 at mobile, 40px
 * gaps, inset by one column at xl so the grid sits narrower than the rest
 * of the page, standard translateY(100px) reveal per card).
 *
 * Content lives in src/data/testimonials.js. Each entry renders as a
 * working principle by default; the moment its `name` is filled in, the
 * same card renders as a real testimonial with an author footer. We do
 * not fabricate client quotes, so placeholders ship author-less.
 */
function Principles() {
  return (
    <section className="grad-light relative z-30 w-full overflow-clip">
      <div className="relative z-10 mx-auto grid w-full max-w-[1366px] gap-24 px-6 py-40 sm:px-8">
        <div className="grid gap-6">
          <p className="eyebrow text-[color:var(--color-copy-muted)]">
            Cum lucrăm
          </p>

          <h2 className="display max-w-[18ch] text-[clamp(2rem,5vw,3.5rem)] text-[color:var(--color-ink)]">
            Patru reguli de la care nu ne abatem
          </h2>
        </div>

        <div className="grid gap-10 xl:grid-cols-12">
          <div className="grid gap-10 md:grid-cols-2 xl:col-span-10 xl:col-start-2">
            {testimonials.map((item, index) => (
              <Reveal key={item.quote} delay={(index % 2) * 0.08}>
                <figure className="relative grid h-full gap-y-6 overflow-hidden rounded-2xl bg-white/60 p-8 backdrop-blur-sm">
                  <Quote
                    size={28}
                    className="text-[color:var(--color-brand)]"
                    aria-hidden="true"
                  />

                  <blockquote className="text-lg leading-relaxed text-[color:var(--color-ink)]">
                    {item.quote}
                  </blockquote>

                  {item.name ? (
                    <figcaption className="mt-auto flex items-center gap-3">
                      {item.avatar && (
                        <img
                          src={item.avatar}
                          alt={item.name}
                          className="h-10 w-10 shrink-0 rounded-full object-cover"
                        />
                      )}
                      <span className="grid">
                        <span className="text-sm font-semibold text-[color:var(--color-ink)]">
                          {item.name}
                        </span>
                        <span className="text-sm text-[color:var(--color-copy-muted)]">
                          {[item.role, item.company]
                            .filter(Boolean)
                            .join(", ")}
                        </span>
                      </span>
                    </figcaption>
                  ) : (
                    <figcaption className="text-sm text-[color:var(--color-copy-muted)]">
                      {item.label}
                    </figcaption>
                  )}
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Principles;
