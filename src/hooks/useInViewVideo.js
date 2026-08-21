import { useEffect, useRef } from "react";

// Every autoplaying <video> on the site (case-study reveals, project
// thumbnails) played unconditionally regardless of scroll position, so a
// page with several of them had every one running simultaneously on
// mobile — real battery/data cost. This pauses a video the moment it
// scrolls off-screen and resumes it once it's back in view, instead of
// letting it run forever off-screen.
//
// rootMargin expands the trigger zone outward (default: 600px above/below
// the real viewport) so `play()` — and the actual data fetch it kicks off,
// since these all sit on `preload="metadata"` — fires while the video is
// still off-screen. Without it, play() only fired once the video had
// already scrolled into view, so the first frame took a beat to arrive:
// a blank/white gap right as the section appeared. This gives it a head
// start instead.
export default function useInViewVideo(threshold = 0.25, rootMargin = "600px 0px") {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // React's `muted` prop on a <video> sets the attribute, but
          // browsers gate autoplay on the live DOM *property* — the two
          // can desync (a known React/video quirk), and an unmuted
          // programmatic .play() is silently rejected by autoplay policy.
          // Setting it imperatively right before play() is what actually
          // satisfies the check every time.
          video.muted = true;
          video.defaultMuted = true;
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return videoRef;
}
