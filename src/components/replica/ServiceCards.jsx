import Reveal from "./Reveal";
import MagneticCta from "./MagneticCta";
import { usps } from "../../data/usps";

/**
 * Benefits section — rebuilt 1:1 on dixieraizpacheco.com's own "step-card"
 * section (verified by reading its live computed styles, not just
 * screenshots): 380px-min-height cards, 34px bold white titles, a breathing
 * halo behind card 1 (`.replica-halo-glow`, shared with Pricing's
 * best-value card — see index.css), and a -4px hover lift with an
 * under-shadow.
 *
 * Top and closing headings both use `.title-gradient` (reference's shared
 * `.gradient-text`) but at reference's own two sizes: the top headline is
 * `.text-heading-md` (clamp 40-64px), the closing one is a flat 50px bold —
 * smaller and non-responsive on their site too, not a scaled-down top title.
 */
const titleClass =
  "display title-gradient max-w-4xl text-[clamp(2.25rem,5.2vw,4rem)]";
// 50px flat on the reference desktop too, but unlike the reference this
// needs to survive down to a 320px viewport — clamp() down to it instead
// of holding the literal px value, which was oversizing/wrapping badly
// on phones.
const closingTitleClass =
  "title-gradient max-w-5xl text-[clamp(1.75rem,1.1rem+3.2vw,3.125rem)] font-bold leading-tight";

function ServiceCards() {
  return (
    <section
      id="servicii"
      className="grad-dark isolate w-full px-6 py-32 sm:px-8 lg:py-40"
    >
      <div className="mx-auto w-full max-w-[1366px]">
        <div className="flex flex-col items-center gap-4 text-center lg:gap-8">
          <p className="eyebrow text-[color:var(--color-copy-subtle-on-dark)]">
            Web design de nivel agenție, în România
          </p>

          <h2 className={titleClass}>
            Îți multiplici <span className="accent-serif">conversiile</span>{" "}
            cu un <span className="accent-serif">website</span> personalizat,
            construit de echipa noastră la nivelul lucrărilor de agenție de
            20.000€+.
          </h2>
        </div>

        {/* Below md: a horizontal scroll-snap carousel (cards slide in from
            the side) instead of stacking full-width — the highlighted
            card's glow bleeding into the card below it was a symptom of
            that stack, not just the glow's own size.

            overflow-y-hidden is required, not decorative: setting only
            overflow-x makes the browser compute overflow-y as `auto` too
            (a CSS rule — one axis can't stay `visible` once the other
            isn't), and each card's Reveal entrance transform (y: 100 -> 0)
            counts toward that axis's scrollable overflow. Left implicit,
            the row grew its own vertical scroll range for that transform
            and clipped the resting card against it.

            Any non-`visible` overflow value (hidden OR auto) also clips
            painted content that spills past the box — including the first
            card's blurred glow — regardless of whether anything actually
            needs to scroll. There's no CSS overflow value that scrolls one
            axis while leaving the other's paint unclipped, so instead the
            clip boundary is pushed well past the glow with generous
            vertical padding (py-9), and a matching negative margin
            (-my-6) pulls the row's own footprint back in so that extra
            padding doesn't also widen the gap to the sections above/below. */}
        <div className="-mx-6 mt-20 flex snap-x snap-mandatory gap-4 overflow-x-auto overflow-y-hidden px-6 py-9 -my-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:-mx-8 sm:px-8 md:mx-auto md:my-0 md:grid md:max-w-5xl md:snap-none md:gap-8 md:overflow-visible md:px-0 md:py-0 md:grid-cols-3">
          {usps.map((usp, index) => {
            const highlighted = index === 0;

            return (
              <Reveal
                key={usp.title}
                delay={index * 0.05}
                className="w-[82%] max-w-[21rem] shrink-0 snap-center md:w-auto md:max-w-none md:shrink"
              >
                <div
                  className={`relative h-full ${
                    highlighted ? "replica-halo-glow" : ""
                  }`}
                >
                  <div className="relative flex h-full min-h-[23.75rem] flex-col gap-4 overflow-hidden rounded-2xl border border-[#36425d] bg-[#171b27] p-8 transition-[translate,box-shadow,border-color] duration-500 ease-out hover:-translate-y-1 hover:border-[#4c5a73] hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.4)]">
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
            Dacă site-ul tău actual arată neprofesionist și îți pierde
            clienți în fiecare zi, un web design personalizat, construit de
            echipa noastră, este cea mai bună investiție pe care o poți face
            pentru afacerea ta anul acesta.
          </h3>

          <div className="flex flex-col items-center gap-3">
            <MagneticCta
              to="/discovery"
              className="px-6 py-3.5 text-sm font-medium text-white sm:px-8 sm:py-4 sm:text-base"
            >
              Programează un apel gratuit
            </MagneticCta>

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
