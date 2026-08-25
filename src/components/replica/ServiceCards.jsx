import { useEffect, useRef, useState } from "react";
import { AnimatePresence, animate, motion, useInView, useReducedMotion } from "framer-motion";
import { ChevronDown, Play } from "lucide-react";

import Reveal from "./Reveal";
import MagneticCta from "./MagneticCta";
import { usps } from "../../data/usps";

/**
 * "De ce noi" — feature-tabs pattern (Meta's Ray-Ban Display page is the
 * reference): a click-to-expand accordion on the left drives a synced media
 * panel on the right, sticky on desktop so it stays in view while you work
 * down the list. First and last items are framed as future video slots (a
 * play-button affordance), the two middle ones as future screenshots — same
 * split the reference uses — but every panel today is a built, no-real-
 * asset-needed placeholder that's still suggestive of the real thing
 * (a conversion funnel, a Google result card, a Lighthouse gauge, a chat
 * thread), not a grey box.
 */
const titleClass =
  "display title-gradient max-w-4xl text-[clamp(2.25rem,5.2vw,4rem)]";
const closingTitleClass =
  "title-gradient max-w-5xl text-[clamp(1.75rem,1.1rem+3.2vw,3.125rem)] font-bold leading-tight";

// First and last are framed as video slots (play-button affordance); the
// two middle ones as screenshots — mirrors the reference's own split.
const IS_VIDEO_SLOT = [true, false, false, true];

function AnimatedStat({ value, suffix = "", className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduceMotion = useReducedMotion();
  const [display, setDisplay] = useState(reduceMotion ? value : 0);

  useEffect(() => {
    if (!inView || reduceMotion) return;

    const controls = animate(0, value, {
      duration: 1.4,
      ease: [0.33, 1, 0.68, 1],
      onUpdate: (latest) => setDisplay(Math.round(latest)),
    });

    return () => controls.stop();
  }, [inView, value, reduceMotion]);

  return (
    <span
      ref={ref}
      className={`font-bold leading-none tracking-[-0.03em] text-white ${className}`}
    >
      {display}
      {suffix}
    </span>
  );
}

const BAR_HEIGHTS = [28, 44, 36, 62, 84];

function ConversionWidget({ usp }) {
  return (
    <div className="flex h-full flex-col justify-between">
      <div className="flex h-40 items-end justify-center gap-3">
        {BAR_HEIGHTS.map((height, index) => (
          <motion.div
            key={index}
            initial={{ height: 0 }}
            animate={{ height: `${height}%` }}
            transition={{ duration: 0.8, delay: index * 0.08, ease: [0.33, 1, 0.68, 1] }}
            className={`w-8 rounded-t-lg sm:w-10 ${
              index === BAR_HEIGHTS.length - 1
                ? "bg-[color:var(--color-accent)]"
                : "bg-white/15"
            }`}
          />
        ))}
      </div>

      <div className="flex items-end justify-between border-t border-white/10 pt-5">
        <div>
          <AnimatedStat value={usp.stat} suffix={usp.suffix} className="text-4xl" />
          <p className="mt-1 text-xs text-[#8491ab]">{usp.statLabel}</p>
        </div>
      </div>
    </div>
  );
}

function SeoWidget({ usp }) {
  return (
    <div className="flex h-full flex-col justify-between">
      <div className="rounded-xl bg-white p-4 shadow-lg">
        <div className="flex items-center gap-2 text-xs text-[#1a0dab]">
          <span className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 text-[9px] font-bold text-white">
            A²
          </span>
          asquaredstudio.ro
        </div>
        <p className="mt-1.5 text-base font-medium text-[#1a0dab]">
          A Squared Studio — Agenție Web Design
        </p>
        <div className="mt-2 space-y-1.5">
          <div className="h-2 w-full rounded-full bg-slate-200" />
          <div className="h-2 w-4/5 rounded-full bg-slate-200" />
        </div>
        <span className="mt-3 inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-700">
          Rezultatul #1
        </span>
      </div>

      <div className="border-t border-white/10 pt-5">
        <AnimatedStat value={usp.stat} suffix={usp.suffix} className="text-4xl" />
        <p className="mt-1 text-xs text-[#8491ab]">{usp.statLabel}</p>
      </div>
    </div>
  );
}

function SpeedWidget({ usp }) {
  const circumference = 2 * Math.PI * 54;
  const filled = circumference * (usp.stat / 100);

  return (
    <div className="flex h-full flex-col justify-between">
      <div className="flex flex-1 items-center justify-center">
        <div className="relative flex h-36 w-36 items-center justify-center">
          <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
            <circle cx="60" cy="60" r="54" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="10" />
            <motion.circle
              cx="60"
              cy="60"
              r="54"
              fill="none"
              stroke="#10b981"
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              whileInView={{ strokeDashoffset: circumference - filled }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.33, 1, 0.68, 1] }}
            />
          </svg>
          <span className="absolute text-3xl font-bold text-white">
            {usp.stat}
            {usp.suffix}
          </span>
        </div>
      </div>

      <div className="border-t border-white/10 pt-5 text-center">
        <p className="text-xs text-[#8491ab]">{usp.statLabel}</p>
      </div>
    </div>
  );
}

function TeamWidget({ usp }) {
  return (
    <div className="flex h-full flex-col justify-between">
      <div className="flex flex-col gap-2.5">
        <div className="max-w-[80%] rounded-2xl rounded-tl-sm bg-white/10 px-4 py-2.5 text-sm text-white">
          Putem muta CTA-ul mai sus?
        </div>
        <div className="ml-auto max-w-[80%] rounded-2xl rounded-tr-sm bg-[color:var(--color-accent)] px-4 py-2.5 text-sm text-white">
          Gata, e live. Verifică acum ↗
        </div>
        <div className="flex items-center gap-1.5 pl-1 text-xs text-[#8491ab]">
          <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--color-accent)]" />
          echipa răspunde direct
        </div>
      </div>

      <div className="border-t border-white/10 pt-5">
        <AnimatedStat value={usp.stat} suffix={usp.suffix} className="text-4xl" />
        <p className="mt-1 text-xs text-[#8491ab]">{usp.statLabel}</p>
      </div>
    </div>
  );
}

const WIDGETS = [ConversionWidget, SeoWidget, SpeedWidget, TeamWidget];

function AccordionItem({ usp, index, isActive, onSelect }) {
  return (
    <div className="border-b border-white/10">
      <button
        type="button"
        onClick={() => onSelect(index)}
        aria-expanded={isActive}
        className="flex w-full items-center justify-between gap-4 py-6 text-left"
      >
        <span
          className={`text-xl font-bold transition-colors sm:text-2xl ${
            isActive ? "text-white" : "text-white/50"
          }`}
        >
          {usp.title}
        </span>

        <ChevronDown
          size={20}
          className={`shrink-0 text-white/40 transition-transform duration-300 ${
            isActive ? "rotate-180 text-white" : ""
          }`}
        />
      </button>

      {/* CSS grid-rows 0fr->1fr trick — animates to the content's real
          height without measuring it in JS, and never clips at a wrong
          guessed value. */}
      <div
        className="grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
        style={{ gridTemplateRows: isActive ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <p className="max-w-lg pb-6 text-[15px] leading-relaxed text-[color:var(--color-copy-on-dark)]">
            {usp.text}
          </p>
        </div>
      </div>
    </div>
  );
}

function MediaPanel({ activeIndex }) {
  const usp = usps[activeIndex];
  const Widget = WIDGETS[activeIndex];
  const isVideoSlot = IS_VIDEO_SLOT[activeIndex];

  return (
    <div className="order-first lg:sticky lg:top-32 lg:order-2">
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#171b27] p-6 sm:p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={usp.title}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
            className="h-full"
          >
            <Widget usp={usp} />
          </motion.div>
        </AnimatePresence>

        {isVideoSlot && (
          <span className="pointer-events-none absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 backdrop-blur-md sm:right-8 sm:top-8">
            <Play size={16} className="ml-0.5 fill-white text-white" />
          </span>
        )}
      </div>
    </div>
  );
}

function ServiceCards() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section
      id="de-ce-noi"
      className="grad-dark isolate w-full px-6 py-32 sm:px-8 lg:py-40"
    >
      <div className="mx-auto w-full max-w-[1366px]">
        <div className="flex flex-col items-center gap-4 text-center lg:gap-8">
          <p className="eyebrow text-[color:var(--color-copy-subtle-on-dark)]">
            De ce noi
          </p>

          <h2 className={titleClass}>
            Îți multiplici <span className="accent-serif">conversiile</span>{" "}
            cu un <span className="accent-serif">website</span> personalizat,
            construit de echipa noastră la nivelul lucrărilor de agenție de
            20.000€+.
          </h2>
        </div>

        <div className="mt-16 grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-16">
          <MediaPanel activeIndex={activeIndex} />

          <div>
            {usps.map((usp, index) => (
              <AccordionItem
                key={usp.title}
                usp={usp}
                index={index}
                isActive={index === activeIndex}
                onSelect={setActiveIndex}
              />
            ))}
          </div>
        </div>

        <Reveal
          className="mt-24 flex flex-col items-center gap-8 text-center"
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
