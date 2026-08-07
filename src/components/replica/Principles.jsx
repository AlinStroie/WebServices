import { Quote } from "lucide-react";

import Reveal from "./Reveal";

/**
 * Two-column card grid occupying the reference's testimonials slot.
 *
 * Layout and motion are replicated exactly (2 cols -> 1 at mobile, 40px
 * gaps, inset by one column at xl so the grid sits narrower than the rest
 * of the page, standard translateY(100px) reveal per card).
 *
 * The CONTENT is deliberately not testimonials. We have no client quotes
 * cleared for publication, and inventing them — or reusing the reference
 * site's — would be fabricated social proof about a real business.
 * These are our actual working principles instead.
 *
 * TO SWAP IN REAL TESTIMONIALS: replace `principles` with an array of
 * { text, name, role } and render name/role in the footer of each card.
 * The layout needs no other change.
 */
const principles = [
  {
    text: "Structura vine înaintea decorului. Dacă vizitatorul nu găsește informația, nu contează cât de bine arată pagina.",
    label: "Principiu de lucru",
  },
  {
    text: "Mobile-first, nu mobile-după. Peste jumătate din trafic vine de pe telefon, deci acolo se decide dacă site-ul funcționează.",
    label: "Principiu de lucru",
  },
  {
    text: "Fără librării încărcate degeaba. Fiecare kilobyte trimis către utilizator trebuie să își merite locul.",
    label: "Principiu de lucru",
  },
  {
    text: "Site-ul rămâne al tău. Textele stau în fișiere simple, ușor de editat, fără să depinzi de noi pentru fiecare virgulă.",
    label: "Principiu de lucru",
  },
];

function Principles() {
  return (
    <section className="relative z-30 w-full overflow-clip bg-[color:var(--color-surface)]">
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
            {principles.map((item, index) => (
              <Reveal key={item.text} delay={(index % 2) * 0.08}>
                <figure className="relative grid h-full gap-y-6 overflow-hidden rounded-2xl bg-white/60 p-8 backdrop-blur-sm">
                  <Quote
                    size={28}
                    className="text-[color:var(--color-brand)]"
                    aria-hidden="true"
                  />

                  <blockquote className="text-lg leading-relaxed text-[color:var(--color-ink)]">
                    {item.text}
                  </blockquote>

                  <figcaption className="text-sm text-[color:var(--color-copy-muted)]">
                    {item.label}
                  </figcaption>
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
