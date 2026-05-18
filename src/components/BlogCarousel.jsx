import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";

import AnimatedSection from "./AnimatedSection";
import { blogPosts } from "../data/blogPosts";

const smoothTransition = {
  duration: 0.95,
  ease: [0.16, 1, 0.3, 1],
};

function useCarouselSizes() {
  const [sizes, setSizes] = useState({
    cardWidth: 390,
    spacing: 385,
    height: 600,
  });

  useEffect(() => {
    function updateSizes() {
      const width = window.innerWidth;

      if (width < 640) {
        setSizes({
          cardWidth: Math.min(width * 0.82, 330),
          spacing: width * 0.72,
          height: 585,
        });
        return;
      }

      if (width < 1024) {
        setSizes({
          cardWidth: 360,
          spacing: 330,
          height: 595,
        });
        return;
      }

      setSizes({
        cardWidth: 390,
        spacing: 380,
        height: 605,
      });
    }

    updateSizes();
    window.addEventListener("resize", updateSizes);

    return () => window.removeEventListener("resize", updateSizes);
  }, []);

  return sizes;
}

function BlogCard({ post, active }) {
  return (
    <Link
      to={`/blog/${post.slug}`}
      className={`group block h-full overflow-hidden rounded-[2rem] border bg-[#101010] p-3 transition-colors duration-500 ${
        active
          ? "border-white/20 shadow-[0_35px_120px_rgba(255,255,255,0.10)]"
          : "border-white/10"
      }`}
    >
      <div className="relative h-60 overflow-hidden rounded-[1.5rem] border border-white/10 bg-black">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.18),transparent_28%),radial-gradient(circle_at_80%_80%,rgba(255,255,255,0.08),transparent_34%)]" />

        <div
          className={`absolute -right-20 -top-20 h-52 w-52 rounded-full bg-white/[0.08] blur-3xl transition duration-700 ${
            active ? "scale-125 opacity-100" : "scale-100 opacity-35"
          }`}
        />

        <div
          className={`absolute -bottom-20 -left-20 h-52 w-52 rounded-full bg-white/[0.05] blur-3xl transition duration-700 ${
            active ? "scale-125 opacity-100" : "scale-100 opacity-25"
          }`}
        />

        <div className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-white/50 transition group-hover:bg-white group-hover:text-black">
          <ArrowUpRight size={18} />
        </div>

        <div className="absolute inset-x-6 bottom-6">
          <p className="text-xs uppercase tracking-[0.35em] text-white/35">
            {post.category}
          </p>

          <h3 className="mt-3 text-3xl font-semibold tracking-[-0.05em] text-white">
            {post.imageLabel}
          </h3>
        </div>
      </div>

      <div className="flex min-h-[16rem] flex-col p-4">
        <div
          className={`mb-4 flex items-center gap-3 text-sm transition-colors duration-500 ${
            active ? "text-white/40" : "text-white/28"
          }`}
        >
          <span>{post.date}</span>
          <span>•</span>
          <span>{post.readingTime}</span>
        </div>

        <h3 className="min-h-[4rem] text-2xl font-semibold tracking-[-0.04em] text-white">
          {post.title}
        </h3>

        <p
          className={`mt-4 min-h-[5.25rem] leading-7 transition-colors duration-500 ${
            active ? "text-white/50" : "text-white/32"
          }`}
        >
          {post.description}
        </p>

        <div className="mt-auto pt-6">
          <span
            className={`inline-flex items-center gap-2 text-sm font-medium transition-colors duration-500 group-hover:text-white ${
              active ? "text-white/65" : "text-white/35"
            }`}
          >
            Citește articolul
            <ArrowRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </span>
        </div>
      </div>
    </Link>
  );
}

function BlogCarousel() {
  const sectionRef = useRef(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [pausedByHover, setPausedByHover] = useState(false);
  const [isInView, setIsInView] = useState(false);

  const { cardWidth, spacing, height } = useCarouselSizes();

  const total = blogPosts.length;
  const isFirst = activeIndex === 0;
  const isLast = activeIndex === total - 1;

  const visiblePosts = useMemo(() => {
    return blogPosts.map((post, index) => {
      const distance = index - activeIndex;

      return {
        post,
        index,
        distance,
        visible: Math.abs(distance) <= 1,
        active: distance === 0,
      };
    });
  }, [activeIndex]);

  function goNext() {
    if (isLast) return;
    setActiveIndex((prev) => prev + 1);
  }

  function goPrev() {
    if (isFirst) return;
    setActiveIndex((prev) => prev - 1);
  }

  function goTo(index) {
    setActiveIndex(index);
  }

  useEffect(() => {
    const element = sectionRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      {
        threshold: 0.35,
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isInView) return;
    if (pausedByHover) return;
    if (isLast) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => {
        if (prev >= total - 1) return prev;
        return prev + 1;
      });
    }, 5500);

    return () => clearInterval(interval);
  }, [isInView, pausedByHover, isLast, total]);

  return (
    <AnimatedSection id="blog" className="px-5 py-16 md:py-20 lg:px-8">
      <div ref={sectionRef} className="mx-auto max-w-7xl">
        <div className="mb-10 text-center md:mb-14">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.35em] text-white/35">
            Blog
          </p>

          <h2 className="mx-auto max-w-4xl text-4xl font-semibold tracking-[-0.05em] text-white md:text-6xl">
            Resurse utile pentru afaceri online.
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-white/50">
            Articole despre site-uri, SEO, design, landing page-uri și decizii
            mai bune înainte de a investi într-un website.
          </p>
        </div>

        <div
          className="relative mx-auto overflow-visible"
          style={{ height }}
          onMouseEnter={() => setPausedByHover(true)}
          onMouseLeave={() => setPausedByHover(false)}
        >
          <AnimatePresence initial={false}>
            {visiblePosts.map(({ post, distance, visible, active }) => {
              if (!visible) return null;

              const x = distance * spacing - cardWidth / 2;

              return (
                <motion.div
                  key={post.slug}
                  className="absolute left-1/2 top-0"
                  style={{ width: cardWidth }}
                  initial={false}
                  animate={{
                    x,
                    scale: active ? 1 : 0.84,
                    opacity: active ? 1 : 0.58,
                    filter: "blur(0px)",
                    zIndex: active ? 10 : 5,
                  }}
                  transition={smoothTransition}
                >
                  <motion.div
                    animate={{
                      y: active ? 0 : 28,
                    }}
                    transition={smoothTransition}
                  >
                    <BlogCard post={post} active={active} />
                  </motion.div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        <div className="mt-2 flex flex-col items-center justify-center gap-5 md:mt-3">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={goPrev}
              disabled={isFirst}
              className={`flex h-10 w-10 items-center justify-center rounded-full border transition ${
                isFirst
                  ? "cursor-not-allowed border-white/5 bg-white/[0.02] text-white/20"
                  : "border-white/10 bg-white/[0.04] text-white/60 hover:bg-white hover:text-black"
              }`}
              aria-label="Articol anterior"
            >
              <ArrowLeft size={17} />
            </button>

            <button
              type="button"
              onClick={goNext}
              disabled={isLast}
              className={`flex h-10 w-10 items-center justify-center rounded-full border transition ${
                isLast
                  ? "cursor-not-allowed border-white/5 bg-white/[0.02] text-white/20"
                  : "border-white/10 bg-white/[0.04] text-white/60 hover:bg-white hover:text-black"
              }`}
              aria-label="Articol următor"
            >
              <ArrowRight size={17} />
            </button>
          </div>

          <div className="flex items-center gap-2">
            {blogPosts.map((post, index) => (
              <button
                key={post.slug}
                type="button"
                onClick={() => goTo(index)}
                aria-label={`Mergi la articolul ${index + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  activeIndex === index
                    ? "w-8 bg-white"
                    : "w-2 bg-white/20 hover:bg-white/40"
                }`}
              />
            ))}
          </div>

          <Link
            to="/blog"
            className="rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-white/70 transition hover:bg-white hover:text-black"
          >
            Vezi toate articolele
          </Link>
        </div>
      </div>
    </AnimatedSection>
  );
}

export default BlogCarousel;