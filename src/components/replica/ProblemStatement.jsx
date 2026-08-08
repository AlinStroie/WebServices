import { Link } from "react-router-dom";
import { ArrowUpRight, CircleCheck } from "lucide-react";

import ShowcaseGrid from "./ShowcaseGrid";

// Checklist mirrors the reference's four promises, in A Squared's voice.
const checklist = [
  "Captează atenția în sub 3 secunde",
  "Construiesc credibilitate instantaneu",
  "Au un design unic, adaptat brandului tău",
  "Oferă o experiență fluidă, ca o aplicație",
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
          {/* Left — copy */}
          <div className="max-w-[36rem]">
            <h2 className="display title-gradient text-[clamp(2.25rem,5.2vw,4rem)]">
              Site-ul tău <span className="accent-serif">costă</span> clienți în
              fiecare zi?
            </h2>

            <p className="mt-8 text-base leading-6 text-[color:var(--color-copy-on-dark)]">
              Dacă site-ul tău nu reflectă calitatea muncii tale, alungă exact
              clienții pe care îi meriți.
            </p>

            <p className="mt-6 text-base leading-6 text-[color:var(--color-copy-on-dark)]">
              Construim site-uri care:
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
              conversii și oportunități. Un site construit pe măsura brandului și
              a publicului tău lucrează 24/7 ca să-ți crească autoritatea și
              să-ți aducă mai mulți clienți.
            </p>

            <Link
              to="/discovery"
              className="group mt-10 inline-flex w-fit items-center gap-2 rounded-full bg-[color:var(--color-brand)] px-6 py-3 text-sm font-medium text-white transition-transform duration-300 hover:scale-[1.03]"
            >
              Consultanță gratuită
              <ArrowUpRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
          </div>

          {/* Right — scroll-drifting screenshot collage, bleeding off-edge */}
          <div className="lg:-mr-[10vw]">
            <ShowcaseGrid />
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProblemStatement;
