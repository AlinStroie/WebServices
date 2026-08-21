import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Plus } from "lucide-react";

/**
 * FAQ accordion — rebuilt on the reference's own section (`section9_1`):
 * a big plain heading (no eyebrow, no italic accent — the reference has
 * neither), then a numbered list where each row is "01" + question, a
 * +/x toggle at the far right, and a hairline divider underneath.
 *
 * The only pure-white section on the page — after a long dark scroll the
 * switch to white is what signals "we are at the end".
 *
 * Two behaviours not in the reference's own static screenshot, added per
 * brief:
 *
 *   - Hovering a row sweeps its numeral, question and divider from muted
 *     grey to full ink via a shared circular reveal expanding from the
 *     bottom-centre of each element (`.faq-reveal`, driven by one
 *     `clip-path: circle()` transition per element, all on the same
 *     timing so they read as one motion). The open row sits permanently
 *     revealed; hovering a closed row previews the same reveal and lets
 *     go of it on mouse-leave.
 *   - Opening is a real height animation (framer-motion, not native
 *     `<details>`, which cannot animate `height: auto` smoothly), and
 *     only one row is open at a time — clicking a question closes
 *     whichever other one was open. The toggle is a single `Plus` glyph
 *     rotated 45° into an "x" rather than swapped for a second icon.
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

function FaqRow({ faq, index, isOpen, onToggle }) {
  const reduceMotion = useReducedMotion();
  const numeral = String(index + 1).padStart(2, "0");

  return (
    <div className="faq-row relative" data-open={isOpen || undefined}>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-start justify-between gap-6 py-7 text-left sm:py-8"
      >
        <span className="flex items-baseline gap-4 sm:gap-5">
          <span className="relative inline-block shrink-0 text-sm font-medium text-[color:var(--color-copy-muted)] sm:text-base">
            {numeral}
            <span
              aria-hidden="true"
              className="faq-reveal absolute inset-0 text-[color:var(--color-ink)]"
            >
              {numeral}
            </span>
          </span>

          <span className="relative inline-block text-xl font-semibold leading-snug text-[color:var(--color-copy-muted)] sm:text-2xl">
            {faq.q}
            <span
              aria-hidden="true"
              className="faq-reveal absolute inset-0 text-[color:var(--color-ink)]"
            >
              {faq.q}
            </span>
          </span>
        </span>

        <Plus
          size={20}
          className={`mt-1 shrink-0 text-[color:var(--color-ink)] transition-transform duration-300 ${
            isOpen ? "rotate-45" : ""
          }`}
        />
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={reduceMotion ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
            transition={{
              height: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
              opacity: { duration: 0.3 },
            }}
            className="overflow-hidden"
          >
            <p className="pb-7 pr-10 text-[15px] leading-relaxed text-[color:var(--color-copy-muted)] sm:pb-8">
              {faq.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <span className="relative block h-px w-full bg-[color:var(--color-divider)]">
        <span
          aria-hidden="true"
          className="faq-reveal absolute inset-0 bg-[color:var(--color-ink)]"
        />
      </span>
    </div>
  );
}

function Faqs() {
  // -1 = nothing open on mount. Was `useState(0)`, which opened the first
  // question by default even though nobody clicked it.
  const [openIndex, setOpenIndex] = useState(-1);

  return (
    <section
      id="faq"
      className="grad-white relative z-20 w-full px-6 py-32 sm:px-8 lg:py-40"
    >
      <div className="mx-auto w-full max-w-[896px]">
        <h2 className="display pb-20 text-[clamp(2.25rem,6vw,4.5rem)] text-[color:var(--color-ink)] sm:pb-24">
          Ce ne întreabă lumea
        </h2>

        <div className="grid">
          {faqs.map((faq, index) => (
            <FaqRow
              key={faq.q}
              faq={faq}
              index={index}
              isOpen={openIndex === index}
              onToggle={() =>
                setOpenIndex((current) => (current === index ? -1 : index))
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Faqs;
