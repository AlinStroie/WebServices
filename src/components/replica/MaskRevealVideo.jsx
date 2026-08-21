import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

/**
 * Scroll-linked "growing window" video reveal — dixieraizpacheco.com's own
 * case-study animation, extracted so both the homepage spotlight
 * (CaseStudy.jsx) and a full case-study page can reuse the exact same
 * mechanism instead of duplicating the nested-transform math.
 *
 * The window that grows is the rounded mask itself, not the video:
 *   - `mask` gets `scale(s)`, s: 0.35 -> 1 scroll-linked. Paint-only, so the
 *     mask's own on-screen box visibly shrinks/grows while its layout size
 *     (and the page's reserved space) never changes.
 *   - Its child gets the exact inverse, `scale(1/s)`. Nested transforms
 *     multiply, so the video's net on-screen scale is always 1 — only the
 *     mask's overflow-hidden clip determines how much of that constant-size
 *     frame is visible.
 *
 * Playback intentionally does NOT use the shared `useInViewVideo` hook,
 * which observes the <video> element itself: that element's own bounding
 * box is full-size at every scroll position (the two scales above cancel
 * out), but early in the reveal almost all of it sits outside the mask's
 * overflow-hidden clip — IntersectionObserver still counts that clipped
 * area as "not intersecting", so the 25%-visible default threshold wasn't
 * crossed until the mask had already grown most of the way open, leaving
 * a long stretch of unplayed (blank) video while scrolling in. Observing
 * `sectionRef` (the outer mask, whose own box is what's actually small-but-
 * present on screen from the moment the section is reached) with a 0
 * threshold starts playback as soon as any part of the section is visible.
 */
function MaskRevealVideo({ src, className = "" }) {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // See useInViewVideo for why `muted` is set imperatively here
          // rather than trusted from the JSX prop before calling play().
          video.muted = true;
          video.defaultMuted = true;
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      // rootMargin: same head-start fix as useInViewVideo — play() (and
      // the real data fetch it kicks off, since this sits on
      // preload="metadata") used to only fire once the section was
      // already visible, leaving a blank beat right as the mask opened.
      { threshold: 0, rootMargin: "600px 0px" }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.9", "start 0.25"],
  });

  const maskScale = useTransform(scrollYProgress, [0, 1], [0.35, 1]);
  const counterScale = useTransform(maskScale, (s) => 1 / s);

  return (
    <motion.div
      ref={sectionRef}
      className={`relative aspect-[1600/958] w-full origin-center overflow-hidden rounded-[24px] bg-[#1d2233] will-change-transform ${className}`}
      style={{ scale: reduceMotion ? 1 : maskScale }}
    >
      <motion.div
        className="h-full w-full origin-center will-change-transform"
        style={{ scale: reduceMotion ? 1 : counterScale }}
      >
        <video
          ref={videoRef}
          className="block h-full w-full object-cover"
          src={src}
          muted
          loop
          playsInline
          preload="metadata"
        />
      </motion.div>
    </motion.div>
  );
}

export default MaskRevealVideo;
