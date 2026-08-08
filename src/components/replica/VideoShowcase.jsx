import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import Reveal from "./Reveal";
import PortfolioBrowserFrame from "../PortfolioBrowserFrame";
import { portfolio } from "../../data/portfolio";

/**
 * Full-bleed showcase carousel.
 *
 * Slides are sized to ~65% of the track so the next one always peeks in
 * at roughly half-visible — `snap-start` (not `snap-center`) is what keeps
 * the active slide flush against the left edge instead of centered. (The
 * max-width cap only guards against ultra-wide viewports; on normal desktop
 * widths the percentage is what produces the half-peek.)
 *
 * Only the leftmost (active) slide plays: video playback is driven by
 * `index`, not the `autoPlay` attribute, so every other slide sits paused
 * on its first frame as a preview.
 *
 * Title matches every other section header: `.display .title-gradient`,
 * centered, same clamp size.
 */
function VideoShowcase() {
  const trackRef = useRef(null);
  const videoRefs = useRef([]);
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
        const maxScroll = track.scrollWidth - track.clientWidth;

        // The last slide's peek layout means the browser clamps scrollLeft
        // to maxScroll before the uniform width*index grid gets there, so
        // rounding against that grid under-counts and the last slide never
        // registers as active. Once we're pinned at the scroll end, it's
        // unambiguously the last slide regardless of the grid math.
        if (track.scrollLeft >= maxScroll - 2) {
          setIndex(portfolio.length - 1);
        } else {
          setIndex(Math.round(track.scrollLeft / width));
        }
      });
    }

    track.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      track.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    videoRefs.current.forEach((video, i) => {
      if (!video) return;
      if (i === index) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
  }, [index]);

  function page(delta) {
    const track = trackRef.current;
    if (!track) return;

    const slide = track.firstElementChild;
    if (!slide) return;

    // Absolute target by index, not a relative scrollBy: the last slide
    // sits at the clamped scroll end, short of where the uniform
    // width*index grid would put it, so a relative step from there
    // overshoots backward past the correct previous slide.
    const width = slide.getBoundingClientRect().width + 24;
    const maxScroll = track.scrollWidth - track.clientWidth;
    const targetIndex = Math.min(
      Math.max(index + delta, 0),
      portfolio.length - 1,
    );
    const targetScroll =
      targetIndex === portfolio.length - 1
        ? maxScroll
        : targetIndex * width;

    track.scrollTo({ left: targetScroll, behavior: "smooth" });
  }

  return (
    <section
      id="showcase"
      className="grad-dark w-full overflow-hidden py-32 lg:py-40"
    >
      <div className="mx-auto w-full max-w-[1366px] px-6 sm:px-8">
        <Reveal>
          <div className="flex flex-col items-center gap-4 text-center lg:gap-8">
            <p className="eyebrow text-[color:var(--color-copy-subtle-on-dark)]">
              Showcase
            </p>

            <h2 className="display title-gradient max-w-4xl text-[clamp(2.25rem,5.2vw,4rem)]">
              Interfețe în mișcare
            </h2>
          </div>
        </Reveal>
      </div>

      <div
        ref={trackRef}
        className="mt-16 flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-4 sm:px-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {portfolio.map((project, i) => (
          <article
            key={project.id}
            className="video-thumb relative w-[65%] max-w-[1040px] shrink-0 snap-start overflow-hidden rounded-2xl"
          >
            <div className="aspect-[16/10] w-full">
              {project.video ? (
                <video
                  ref={(el) => (videoRefs.current[i] = el)}
                  className="h-full w-full object-cover"
                  src={project.video}
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

      <div className="mt-6 flex w-full items-center justify-between px-6 sm:px-8">
        <div className="flex gap-3">
          <button
            type="button"
            aria-label="Slide-ul anterior"
            onClick={() => page(-1)}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-colors duration-300 hover:bg-white hover:text-[color:var(--color-ink)]"
          >
            <ChevronLeft size={19} />
          </button>

          <button
            type="button"
            aria-label="Slide-ul următor"
            onClick={() => page(1)}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-colors duration-300 hover:bg-white hover:text-[color:var(--color-ink)]"
          >
            <ChevronRight size={19} />
          </button>
        </div>

        <div className="flex gap-2">
          {portfolio.map((project, i) => (
            <span
              key={project.id}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === index ? "w-8 bg-white" : "w-1.5 bg-white/30"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default VideoShowcase;
