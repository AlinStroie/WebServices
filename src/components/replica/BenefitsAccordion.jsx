import { Plus } from "lucide-react";

import Reveal from "./Reveal";
import { benefits } from "../../data/benefits";

const detail = {
  "Design modern":
    "Layout curat, ierarhie clară și spațiere consistentă. Fără elemente puse doar ca să umple pagina.",
  Responsive:
    "Construit mobile-first și verificat pe desktop, tabletă și telefon înainte de livrare.",
  "SEO de bază":
    "Titluri, structură semantică, meta tags și sitemap — bazele de care are nevoie Google ca să indexeze corect.",
  "Viteză bună":
    "Imagini optimizate, cod împărțit pe rute și zero librării încărcate degeaba.",
  "Ușor de administrat":
    "Textele și secțiunile stau în fișiere separate, ușor de modificat fără să atingi codul.",
  "Suport după livrare":
    "Ajutor la publicare, modificări mici și verificări periodice după ce site-ul e online.",
};

/**
 * Light rounded slab set between two dark sections — the 24px radius makes
 * it read as a card floating on the page rather than a background change.
 *
 * Uses native <details> / <summary> so keyboard, screen readers and
 * find-in-page all work for free. The open/close is CSS-only (250ms
 * ease-out on block-size, via interpolate-size); where that is not yet
 * supported the panel simply opens instantly, which is a fine fallback.
 */
function BenefitsAccordion() {
  return (
    <section
      id="beneficii"
      className="relative w-full rounded-[24px] bg-[color:var(--color-surface)] px-6 py-24 transform-gpu sm:px-8 md:py-32"
    >
      <div className="mx-auto w-full max-w-[1366px]">
        <div className="mx-auto grid max-w-[60rem] justify-items-center gap-6 text-center lg:gap-8">
          <p className="eyebrow text-[color:var(--color-copy-muted)]">
            De ce noi
          </p>

          <h2 className="display text-[clamp(2rem,5vw,4rem)] text-[color:var(--color-ink)]">
            Ce primești, concret
          </h2>
        </div>

        <div className="mt-20 grid gap-8 md:grid-cols-2 md:gap-12">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;

            return (
              <Reveal key={benefit.title} delay={(index % 2) * 0.08}>
                <details className="replica-details h-full border-t border-[color:var(--color-divider)] pt-6">
                  <summary className="flex list-none items-center justify-between gap-3">
                    <span className="flex items-center gap-3">
                      <Icon
                        size={20}
                        className="text-[color:var(--color-brand)]"
                      />
                      <span className="text-lg font-semibold text-[color:var(--color-ink)]">
                        {benefit.title}
                      </span>
                    </span>

                    <Plus
                      size={20}
                      className="chev shrink-0 text-[color:var(--color-ink)]/50"
                    />
                  </summary>

                  <div className="pb-6 pt-4">
                    <p className="text-[15px] leading-relaxed text-[color:var(--color-ink)]/70">
                      {detail[benefit.title] || benefit.text}
                    </p>
                  </div>
                </details>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default BenefitsAccordion;
