import { ArrowUpRight, CircleCheck } from "lucide-react";

import ShowcaseGrid from "./ShowcaseGrid";
import MagneticCta from "./MagneticCta";

// Checklist mirrors the reference's four promises, in A Squared's voice.
const checklist = [
  "Captează atenția din prima secundă",
  "Construiesc credibilitate instantaneu",
  "Au un design unic, făcut pentru brandul tău",
  "Oferă o experiență la fel de fluidă ca o aplicație premium",
];

/**
 * ProblemStatement — rebuilt 1:1 on the reference's first section.
 *
 * This is also the section that performs the hero wipe: `z-20` + a fully
 * opaque dark background are what let it cover the pinned, fading hero
 * rather than blend with it, so both must stay.
 *
 * Left: a gradient-clipped headline with a Times-italic accent, muted body
 * copy (#a3aabf), a green-checked list, and the brand CTA. There are no
 * entrance animations on the text — the reference keeps it static.
 *
 * Right: ShowcaseGrid — three scroll-drifting rows of site thumbnails with
 * a cursor-following 2× hover preview. It bleeds off the right edge, clipped
 * by the section's overflow.
 */
function ProblemStatement() {
  return (
    <section
      id="despre"
      className="grad-dark relative z-20 w-full shrink-0 overflow-clip"
    >
      <div className="mx-auto w-full max-w-[1366px] px-6 py-28 sm:px-8 lg:py-36">
        <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-10">
          {/* min-w-0 on both items: grid items default to min-width:auto,
              so ShowcaseGrid's intentionally-unshrinkable min-w-max rows
              would otherwise force the whole (implicit, single-column)
              track wider than the viewport below lg — dragging this copy
              column along and clipping its text at the section's
              overflow-clip edge. */}
          {/* Left — copy */}
          <div className="min-w-0 max-w-[36rem]">
            <h2 className="display title-gradient text-[clamp(2.25rem,5.2vw,4rem)]">
              Site-ul tău <span className="accent-serif">costă</span> clienți în
              fiecare zi?
            </h2>

            <p className="mt-8 text-base leading-6 text-[color:var(--color-copy-on-dark)]">
              Dacă site-ul tău nu reflectă calitatea muncii tale, îi alungi
              exact spre concurență pe clienții pe care îi meriți.
            </p>

            <p className="mt-6 text-base leading-6 text-[color:var(--color-copy-on-dark)]">
              Echipa noastră construiește site-uri care:
            </p>

            <ul className="mt-6 grid gap-3">
              {checklist.map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <CircleCheck
                    size={18}
                    className="shrink-0 text-[color:var(--color-accent)]"
                  />
                  <span className="text-base text-white">{item}</span>
                </li>
              ))}
            </ul>

            <p className="mt-8 text-base leading-6 text-[color:var(--color-copy-on-dark)]">
              Un site generic te costă mai mult decât crezi: credibilitate,
              conversii și oportunități. Un site construit de echipa noastră,
              pe măsura brandului și a publicului tău, muncește 24/7 ca
              să-ți crească autoritatea și să-ți aducă un flux constant de
              clienți noi.
            </p>

            <MagneticCta
              to="/discovery"
              className="mt-10 inline-flex w-fit px-5 py-2.5 text-sm font-medium text-white sm:px-6 sm:py-3"
            >
              Consultanță gratuită
              <ArrowUpRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </MagneticCta>
          </div>

          {/* Right — scroll-drifting screenshot collage, bleeding off-edge */}
          <div className="min-w-0 overflow-clip lg:-mr-[10vw] lg:overflow-visible">
            <ShowcaseGrid />
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProblemStatement;
