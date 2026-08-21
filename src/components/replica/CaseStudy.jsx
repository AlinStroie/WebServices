import { Link } from "react-router-dom";

import { caseStudy } from "../../data/caseStudy";
import MaskRevealVideo from "./MaskRevealVideo";

/**
 * Case study spotlight — rebuilt on dixieraizpacheco.com's own case-study
 * section (`.cs` / `.cs__*`, read from its live computed styles).
 *
 * The window that grows is the rounded mask itself, not the video. Two
 * nested transforms make that work:
 *   - `mask` gets `scale(s)`, s: 0.35 -> 1 scroll-linked. This is a paint-only
 *     transform, so the mask's own on-screen box visibly shrinks/grows
 *     (that's "the rounded zone effectively moving") while its layout size
 *     — and therefore the page's reserved space, and the text below it —
 *     never changes.
 *   - Its child gets the exact inverse, `scale(1/s)`. Nested transforms
 *     multiply, so the video's net on-screen scale is s * (1/s) = 1 at every
 *     point: it always paints at true, un-zoomed size. Only the clip
 *     (mask's overflow-hidden, applied before the outer scale) determines
 *     how much of that constant-size frame is visible — a small centered
 *     crop at s=0.35, growing to the full frame at s=1.
 */
function CaseStudy() {
  return (
    <section
      id="studiu-caz"
      className="grad-dark w-full px-4 py-[clamp(4rem,9vw,8rem)] sm:px-6"
    >
      <div className="mx-auto flex w-full max-w-[72rem] flex-col items-center text-center">
        <p className="mb-[clamp(1.5rem,3vw,2.5rem)] text-xs font-semibold uppercase tracking-[0.12em] text-[#9db5ff]">
          {caseStudy.kicker}
        </p>

        <MaskRevealVideo src={caseStudy.video} />

        <div className="my-[clamp(2rem,4vw,3rem)] grid w-full grid-cols-2 gap-x-6 gap-y-7 sm:grid-cols-4 sm:gap-[clamp(1.75rem,4vw,3rem)]">
          {caseStudy.stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-[0.4rem]">
              <span className="text-[clamp(2.75rem,1.75rem+3.5vw,4.5rem)] font-bold leading-[0.95] tracking-[-0.04em] text-[#9db5ff]">
                {stat.value}
              </span>
              <span className="max-w-[22ch] text-[0.9375rem] leading-[1.4] text-[#8491ab]">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        <div className="flex max-w-[46rem] flex-col items-center gap-5">
          <h2 className="title-gradient text-[clamp(1.75rem,1.2rem+2vw,2.75rem)] font-bold leading-[1.12] text-balance">
            {caseStudy.title}
          </h2>

          <p className="max-w-[56ch] text-[1.0625rem] leading-[1.65] text-[color:var(--color-copy-on-dark)]">
            {caseStudy.description}
          </p>

          {caseStudy.cta.href.startsWith("http") ? (
            <a
              href={caseStudy.cta.href}
              target="_blank"
              rel="noreferrer noopener"
              className="mt-3 rounded-full border-2 border-white px-4 py-2 text-sm text-white transition-colors duration-300 hover:border-[color:var(--color-accent)] hover:text-[color:var(--color-accent)]"
            >
              {caseStudy.cta.label}
            </a>
          ) : (
            <Link
              to={caseStudy.cta.href}
              className="mt-3 rounded-full border-2 border-white px-4 py-2 text-sm text-white transition-colors duration-300 hover:border-[color:var(--color-accent)] hover:text-[color:var(--color-accent)]"
            >
              {caseStudy.cta.label}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}

export default CaseStudy;
