import { Link } from "react-router-dom";

import Reveal from "./Reveal";
import { usps } from "../../data/usps";

/**
 * Benefits section — rebuilt 1:1 on dixieraizpacheco.com's own "step-card"
 * section (verified by reading its live computed styles, not just
 * screenshots): 380px-min-height cards, 34px bold white titles, an
 * animated-gradient-angle orbit glow on card 1 (`--replica-usp-glow-angle`,
 * see index.css), and a -4px hover lift with an under-shadow.
 *
 * Top and closing headings both use `.title-gradient` (reference's shared
 * `.gradient-text`) but at reference's own two sizes: the top headline is
 * `.text-heading-md` (clamp 40-64px), the closing one is a flat 50px bold —
 * smaller and non-responsive on their site too, not a scaled-down top title.
 */
const titleClass =
  "display title-gradient max-w-4xl text-[clamp(2.25rem,5.2vw,4rem)]";
const closingTitleClass =
  "title-gradient max-w-5xl text-[50px] font-bold leading-tight";

function ServiceCards() {
  return (
    <section
      id="servicii"
      className="grad-dark isolate w-full px-6 py-32 sm:px-8 lg:py-40"
    >
      <div className="mx-auto w-full max-w-[1366px]">
        <div className="flex flex-col items-center gap-4 text-center lg:gap-8">
          <p className="eyebrow text-[color:var(--color-copy-subtle-on-dark)]">
            Servicii de web design în România
          </p>

          <h2 className={titleClass}>
            Îți crești <span className="accent-serif">conversiile</span>{" "}
            obținând un <span className="accent-serif">website</span>{" "}
            personalizat, la nivelul lucrărilor de agenție de $20k+.
          </h2>
        </div>

        <div className="mx-auto mt-20 grid max-w-5xl gap-8 md:grid-cols-3">
          {usps.map((usp, index) => {
            const highlighted = index === 0;

            return (
              <Reveal key={usp.title} delay={index * 0.05}>
                <div
                  className={`relative h-full ${
                    highlighted ? "replica-usp-glow" : ""
                  }`}
                >
                  <div className="relative flex h-full min-h-[23.75rem] flex-col gap-4 overflow-hidden rounded-2xl border border-[#36425d] bg-[#171b27] p-8 transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-[#4c5a73] hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.4)]">
                    <h3 className="text-[34px] font-bold leading-tight text-white">
                      {usp.title}
                    </h3>

                    <p className="text-[18px] leading-tight text-[#babad0]">
                      {usp.text}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal
          className="mt-20 flex flex-col items-center gap-8 text-center"
          delay={0.15}
        >
          <h3 className={closingTitleClass}>
            Dacă te lupți cu un site care arată neprofesionist și nu reușește
            să transforme vizitatorii în clienți, un web design personalizat
            este cea mai bună investiție pe care o poți face pentru afacerea
            ta.
          </h3>

          <div className="flex flex-col items-center gap-3">
            <Link
              to="/discovery"
              className="rounded-full bg-[color:var(--color-brand)] px-8 py-4 text-2xl font-normal text-white transition-transform duration-200 hover:scale-[1.03]"
            >
              Programează un Apel Gratuit
            </Link>

            <p className="text-sm text-[color:var(--color-copy-subtle-on-dark)]">
              Apel de 15 minute · Fără obligații
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default ServiceCards;
