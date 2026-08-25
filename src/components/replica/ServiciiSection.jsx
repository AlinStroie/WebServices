import { useCallback, useEffect, useMemo, useRef } from "react";
import {
  motion,
  motionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

import Reveal from "./Reveal";
import MagneticCta from "./MagneticCta";
import { services } from "../../data/services";

// Same scroll-linked rail as Timeline's "proces" section — a fixed
// reference line in the VIEWPORT that the page scrolls content past, not a
// per-element progress value — except the reference line sits at dead
// centre (0.5) instead of Timeline's 2/3, because here the effect it
// drives is "fully lit exactly when the text is in the middle of the
// screen," fading back out again as it's scrolled past, not "arrive once
// and stay inked."
const HEAD_LINE = 0.5;

// How far (as a fraction of viewport height) either side of the head line
// a row's opacity ramps over. Wide enough that the fade reads as a smooth
// spotlight sweeping down the page, not a hard cut.
const FADE_RANGE_VH = 0.42;

// Never fully to 0 — a momentarily invisible row mid-scroll reads as a
// glitch, not a design choice.
const MIN_OPACITY = 0.16;

const MUTED_DOT = "rgba(255, 255, 255, 0.18)";
const LIT_DOT = "#10b981"; // var(--color-accent)

const clamp01 = (value) => (value < 0 ? 0 : value > 1 ? 1 : value);

function ServiciiSection() {
  const trackRef = useRef(null);
  const rowRefs = useRef([]);
  const metricsRef = useRef(null);
  const reduceMotion = useReducedMotion();

  const rowValues = useMemo(
    () => services.map(() => motionValue(reduceMotion ? 1 : 0)),
    [reduceMotion]
  );
  const fill = useMemo(() => motionValue(reduceMotion ? 1 : 0), [reduceMotion]);
  const trackHeight = useMemo(() => motionValue(0), []);
  const trackTop = useMemo(() => motionValue(0), []);

  const registerRow = useCallback((index, el) => {
    rowRefs.current[index] = el;
  }, []);

  const update = useCallback(() => {
    if (reduceMotion) return;

    const metrics = metricsRef.current;
    if (!metrics || metrics.dots.length === 0) return;

    const { dots, containerTop, viewport } = metrics;
    const scrolled = window.scrollY;
    const head = viewport * HEAD_LINE;
    const fadeRange = viewport * FADE_RANGE_VH;

    const firstDotViewport = dots[0] - scrolled;
    const totalSpan = dots[dots.length - 1] - dots[0] || 1;
    fill.set(clamp01((head - firstDotViewport) / totalSpan));

    dots.forEach((dotY, index) => {
      const dot = dotY - scrolled;
      const distance = Math.abs(dot - head);
      const strength = clamp01(1 - distance / fadeRange);
      rowValues[index].set(MIN_OPACITY + (1 - MIN_OPACITY) * strength);
    });

    trackTop.set(dots[0] - containerTop);
    trackHeight.set(dots[dots.length - 1] - dots[0]);
  }, [fill, reduceMotion, rowValues, trackHeight, trackTop]);

  const measure = useCallback(() => {
    const container = trackRef.current;
    if (!container) return;

    const scrolled = window.scrollY;
    const containerTop = container.getBoundingClientRect().top + scrolled;

    const dots = rowRefs.current.map((el) => {
      if (!el) return containerTop;
      const rect = el.getBoundingClientRect();
      return rect.top + scrolled + rect.height / 2;
    });

    metricsRef.current = { dots, containerTop, viewport: window.innerHeight };
    update();
  }, [update]);

  useEffect(() => {
    measure();

    let raf = 0;
    const observer = new ResizeObserver(() => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(measure);
    });
    if (trackRef.current) observer.observe(trackRef.current);
    window.addEventListener("resize", measure);
    document.fonts?.ready?.then(measure);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", update);

  return (
    <section
      id="servicii"
      className="grad-dark isolate w-full px-6 py-32 sm:px-8 lg:py-40"
    >
      <div className="mx-auto w-full max-w-[1366px]">
        <div className="flex flex-col items-center gap-4 text-center lg:gap-8">
          <p className="eyebrow text-[color:var(--color-copy-subtle-on-dark)]">
            Ce construim pentru tine
          </p>

          <h2 className="display title-gradient max-w-4xl text-[clamp(2.25rem,5.2vw,4rem)]">
            Un serviciu potrivit pentru{" "}
            <span className="accent-serif">fiecare etapă</span> a afacerii
            tale.
          </h2>
        </div>

        <div ref={trackRef} className="relative mt-24">
          {/* Background track, spanning first dot to last dot. Centred at
              md+ (the alternating layout); pulled to the left edge below
              md, where rows stack single-column instead. */}
          <motion.div
            className="absolute left-4 w-0.5 bg-white/10 md:left-1/2 md:-translate-x-1/2"
            style={{ top: trackTop, height: trackHeight }}
          />

          {/* The green fill — anchored top, scaled down to 0 initially and
              grown to 1 as the head line travels from the first dot to the
              last. transformOrigin: top keeps it growing downward, exactly
              like Timeline's rail. */}
          <motion.div
            className="absolute left-4 w-0.5 origin-top bg-[color:var(--color-accent)] md:left-1/2 md:-translate-x-1/2"
            style={{ top: trackTop, height: trackHeight, scaleY: fill }}
          />

          <div className="grid gap-16 md:gap-20">
            {services.map((service, index) => (
              <ServiceRow
                key={service.title}
                service={service}
                index={index}
                isLeft={index % 2 === 0}
                registerRow={registerRow}
                opacity={rowValues[index]}
              />
            ))}
          </div>
        </div>

        <Reveal
          className="mt-24 flex flex-col items-center gap-8 text-center"
          delay={0.15}
        >
          <h3 className="title-gradient max-w-3xl text-[clamp(1.5rem,1.1rem+2vw,2.25rem)] font-bold leading-tight">
            Nu găsești exact ce cauți? Hai să vorbim direct despre proiectul
            tău.
          </h3>

          <MagneticCta
            to="/discovery"
            className="px-6 py-3.5 text-sm font-medium text-white sm:px-8 sm:py-4 sm:text-base"
          >
            Programează un apel gratuit
          </MagneticCta>
        </Reveal>
      </div>
    </section>
  );
}

function ServiceRow({ service, index, isLeft, registerRow, opacity }) {
  const setRef = useCallback(
    (el) => registerRow(index, el),
    [registerRow, index]
  );
  const Icon = service.icon;

  const dotColor = useTransform(opacity, [MIN_OPACITY, 1], [MUTED_DOT, LIT_DOT]);

  return (
    <div
      ref={setRef}
      className="relative grid grid-cols-[2.5rem_1fr] items-center gap-6 md:grid-cols-[1fr_2.5rem_1fr] md:gap-10"
    >
      <motion.span
        aria-hidden="true"
        className="relative z-10 col-start-1 row-start-1 h-4 w-4 justify-self-center rounded-full border-2 border-[#0b0d14] md:col-start-2"
        style={{ backgroundColor: dotColor }}
      />

      <motion.div
        style={{ opacity }}
        className={`col-start-2 flex flex-col gap-3 ${
          isLeft
            ? "md:col-start-1 md:items-end md:text-right"
            : "md:col-start-3 md:items-start md:text-left"
        }`}
      >
        <div
          className={`flex items-center gap-3 ${
            isLeft ? "md:flex-row-reverse" : ""
          }`}
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-white">
            <Icon size={18} />
          </span>

          <h3 className="text-xl font-bold text-white sm:text-2xl">
            {service.title}
          </h3>
        </div>

        <p className="max-w-md text-[15px] leading-relaxed text-[color:var(--color-copy-on-dark)]">
          {service.result}
        </p>

        <div
          className={`flex flex-wrap gap-2 ${isLeft ? "md:justify-end" : ""}`}
        >
          {service.benefits.slice(0, 3).map((benefit) => (
            <span
              key={benefit}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-[color:var(--color-copy-subtle-on-dark)]"
            >
              {benefit}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default ServiciiSection;
