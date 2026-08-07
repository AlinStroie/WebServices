import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import Reveal from "./Reveal";
import PortfolioBrowserFrame from "../PortfolioBrowserFrame";
import { portfolio } from "../../data/portfolio";

/**
 * Full-bleed showcase carousel.
 *
 * The reference's #awards section is not a badge row (my first pass got
 * this wrong) — it is 11 looping muted videos in near-full-viewport
 * slides, `w-[calc(100vw-2rem)]`, each with a blurred dark overlay and a
 * play affordance. Videos start paused and begin on intersection.
 *
 * This is the shell for that, wired for real video: drop a `video` path
 * onto a portfolio entry and it renders a <video> instead of the mockup
 * fallback. Until then it shows our own mini-site mockups, which are real
 * UI rather than a placeholder box.
 *
 * Scroll-snap does the paging so it stays usable with a trackpad, touch,
 * or the arrow buttons — no carousel dependency.
 */
function VideoShowcase() {
  const trackRef = useRef(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let frame = 0;

    function onScroll() {
      if (frame) return;

      frame = requestAnimationFrame(() => {
        frame = 0;
        const slide = track.firstElementChild;
        if (!slide) return;
        const width = slide.getBoundingClientRect().width + 24;
        setIndex(Math.round(track.scrollLeft / width));
      });
    }

    track.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      track.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  function page(delta) {
    const track = trackRef.current;
    if (!track) return;

    const slide = track.firstElementChild;
    if (!slide) return;

    track.scrollBy({
      left: (slide.getBoundingClientRect().width + 24) * delta,
      behavior: "smooth",
    });
  }

  return (
    <section
      id="showcase"
      className="grad-dark w-full overflow-hidden py-32 lg:py-40"
    >
      <div className="mx-auto w-full max-w-[1366px] px-6 sm:px-8">
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div className="grid gap-5">
              <p className="eyebrow text-[color:var(--color-copy-subtle-on-dark)]">
                Showcase
              </p>

              <h2 className="display max-w-[16ch] text-[clamp(2rem,5vw,4rem)] text-white">
                Interfețe în mișcare
              </h2>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                aria-label="Slide-ul anterior"
                onClick={() => page(-1)}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-[color:var(--color-divider-on-dark)] text-white transition-colors duration-300 hover:bg-white hover:text-[color:var(--color-ink)]"
              >
                <ChevronLeft size={19} />
              </button>

              <button
                type="button"
                aria-label="Slide-ul următor"
                onClick={() => page(1)}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-[color:var(--color-divider-on-dark)] text-white transition-colors duration-300 hover:bg-white hover:text-[color:var(--color-ink)]"
              >
                <ChevronRight size={19} />
              </button>
            </div>
          </div>
        </Reveal>
      </div>

      <div
        ref={trackRef}
        className="mt-16 flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-4 sm:px-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {portfolio.map((project) => (
          <article
            key={project.id}
            className="video-thumb relative w-[calc(100vw-3rem)] max-w-[980px] shrink-0 snap-center overflow-hidden rounded-2xl"
          >
            <div className="aspect-[16/10] w-full">
              {project.video ? (
                <video
                  className="h-full w-full object-cover"
                  src={project.video}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                />
              ) : (
                <PortfolioBrowserFrame project={project} size="card" />
              )}
            </div>

            <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-6">
              <p className="eyebrow text-white/60">{project.category}</p>
              <p className="mt-1 text-lg font-semibold text-white">
                {project.title}
              </p>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-6 flex justify-center gap-2">
        {portfolio.map((project, i) => (
          <span
            key={project.id}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === index ? "w-8 bg-white" : "w-1.5 bg-white/30"
            }`}
          />
        ))}
      </div>
    </section>
  );
}

export default VideoShowcase;
