import { Plus } from "lucide-react";

/**
 * FAQ accordion.
 *
 * The only pure-white section on the page — after a long dark scroll the
 * switch to white is what signals "we are at the end".
 *
 * Content measure capped at 896px (narrower than the 1366px container)
 * because answers are pure prose and need a readable line length.
 * Native <details>, full-width left-aligned trigger, 250ms ease-out.
 */
const faqs = [
  {
    q: "Cât durează construirea unui site?",
    a: "Un landing page simplu durează în jur de o săptămână. Un site de prezentare complet, cu 5–6 secțiuni, între două și trei săptămâni. Termenul depinde cel mai mult de cât de repede primim textele și imaginile.",
  },
  {
    q: "Ce trebuie să pregătesc înainte să începem?",
    a: "Ideal: textele despre serviciile tale, logo-ul dacă există și câteva poze reale. Dacă nu ai textele, le putem structura împreună în etapa de brief — nu e nevoie să vii cu totul gata.",
  },
  {
    q: "Site-ul va arăta bine pe telefon?",
    a: "Da. Construim mobile-first și verificăm fiecare secțiune pe telefon, tabletă și desktop înainte de livrare. Peste jumătate din trafic vine de pe mobil, deci acolo se decide dacă site-ul funcționează sau nu.",
  },
  {
    q: "Pot modifica singur textele după livrare?",
    a: "Da. Textele și informațiile importante stau în fișiere separate, ușor de editat, fără să fie nevoie să umbli prin cod. Îți arătăm exact unde sunt la predare.",
  },
  {
    q: "Ce se întâmplă după ce site-ul e publicat?",
    a: "Rămânem disponibili pentru modificări mici, verificări și extinderi ulterioare. Un site nu trebuie să rămână blocat în forma inițială — pe măsură ce afacerea crește, se pot adăuga secțiuni noi.",
  },
  {
    q: "Cât costă?",
    a: "De la 300€ pentru un site simplu de prezentare, de la 600€ pentru unul complet cu structură personalizată. Pentru proiecte cu funcționalități extra, prețul se stabilește după ce discutăm ce e nevoie.",
  },
];

function Faqs() {
  return (
    <section
      id="faq"
      className="relative z-20 w-full bg-white px-6 py-32 sm:px-8 lg:py-40"
    >
      <div className="mx-auto w-full max-w-[896px]">
        <div className="grid gap-6 pb-16">
          <p className="eyebrow text-[color:var(--color-copy-muted)]">
            Întrebări frecvente
          </p>

          <h2 className="display text-[clamp(2rem,5vw,3.5rem)] text-[color:var(--color-ink)]">
            Ce ne întreabă lumea
          </h2>
        </div>

        <div className="grid gap-4">
          {faqs.map((faq) => (
            <details
              key={faq.q}
              className="replica-details border-b border-[color:var(--color-divider)]"
            >
              <summary className="flex w-full cursor-pointer items-center justify-between gap-2 py-6 text-left">
                <span className="flex items-start gap-5 text-lg font-medium text-[color:var(--color-ink)] sm:font-medium">
                  {faq.q}
                </span>

                <Plus
                  size={20}
                  className="chev shrink-0 text-[color:var(--color-ink)]/45"
                />
              </summary>

              <div className="pb-6 pr-10">
                <p className="text-[15px] leading-relaxed text-[color:var(--color-ink)]/70">
                  {faq.a}
                </p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Faqs;
