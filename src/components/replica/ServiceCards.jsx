import { memo, useEffect, useRef, useState } from "react";
import { AnimatePresence, animate, motion } from "framer-motion";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import {
  ArrowUpRight,
  CheckCheck,
  ChevronDown,
  Clock,
  Search,
  Star,
  TrendingUp,
  Zap,
} from "lucide-react";

gsap.registerPlugin(useGSAP);

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


function AnimatedStat({ value, suffix = "", className = "" }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const controls = animate(0, value, {
      duration: 2.2,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => setDisplay(Math.round(latest)),
    });

    return () => controls.stop();
  }, [value]);

  return (
    <span
      className={`font-bold leading-none tracking-[-0.03em] text-white ${className}`}
    >
      {display}
      {suffix}
    </span>
  );
}

const CHART_POINTS = [
  { x: 55, y: 144.2 },
  { x: 145, y: 127.7 },
  { x: 235, y: 94.0 },
  { x: 325, y: 53.9 },
  { x: 415, y: 28.0, isPeak: true },
];

function ConversionWidget({ usp }) {
  const containerRef = useRef(null);
  const clipRectRef = useRef(null);
  const cursorLineRef = useRef(null);
  const tooltipRef = useRef(null);
  const dotsRef = useRef([]);
  const rateNumberRef = useRef(null);

  useGSAP(
    () => {
      // Initial state
      if (clipRectRef.current) clipRectRef.current.setAttribute("width", "0");
      if (cursorLineRef.current) {
        cursorLineRef.current.setAttribute("x1", "40");
        cursorLineRef.current.setAttribute("x2", "40");
        gsap.set(cursorLineRef.current, { opacity: 0 });
      }
      if (tooltipRef.current) {
        gsap.set(tooltipRef.current, { opacity: 0, scale: 0.7, y: 12 });
      }
      if (rateNumberRef.current) {
        rateNumberRef.current.textContent = "+0%";
      }
      dotsRef.current.forEach((dotEl) => {
        if (dotEl) {
          dotEl.setAttribute("data-visible", "false");
          gsap.set(dotEl, { scale: 0, opacity: 0 });
        }
      });

      const tl = gsap.timeline();

      // Scanner laser line appears smoothly as the line starts drawing
      tl.fromTo(
        cursorLineRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.25, ease: "power1.in" },
        0.05
      );

      // Animate clip mask width, scanner line, and live counter strictly in sync over 2.3s!
      const animState = { width: 40, rate: 0 };

      tl.to(
        animState,
        {
          width: 460,
          rate: 280,
          duration: 2.3,
          ease: "power2.inOut",
          onUpdate: () => {
            const currentW = animState.width;
            if (clipRectRef.current) {
              clipRectRef.current.setAttribute("width", currentW.toString());
            }
            if (cursorLineRef.current) {
              const scanX = Math.min(Math.max(currentW, 40), 415);
              cursorLineRef.current.setAttribute("x1", scanX.toString());
              cursorLineRef.current.setAttribute("x2", scanX.toString());
            }
            if (rateNumberRef.current) {
              rateNumberRef.current.textContent = `+${Math.round(animState.rate)}%`;
            }

            // Smoothly reveal non-stretched circular dots as scanner arrives at each milestone
            CHART_POINTS.forEach((pt, i) => {
              const dotEl = dotsRef.current[i];
              if (!dotEl) return;
              if (currentW >= pt.x) {
                if (dotEl.getAttribute("data-visible") !== "true") {
                  dotEl.setAttribute("data-visible", "true");
                  gsap.to(dotEl, {
                    scale: 1,
                    opacity: 1,
                    duration: 0.35,
                    ease: "back.out(2)",
                  });
                }
              } else {
                dotEl.setAttribute("data-visible", "false");
                gsap.set(dotEl, { scale: 0, opacity: 0 });
              }
            });
          },
        },
        0
      );

      // Fade out scanner line at the peak
      tl.to(
        cursorLineRef.current,
        {
          opacity: 0,
          duration: 0.25,
          ease: "power1.out",
        },
        2.05
      );

      // Spring up the peak milestone tooltip
      tl.to(
        tooltipRef.current,
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.5,
          ease: "back.out(1.8)",
        },
        2.0
      );
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="flex h-full flex-col justify-between">
      {/* Main Motion Graphics Line Chart - wide and expansive across the card */}
      <div className="relative my-auto w-full aspect-[460/190] flex items-center justify-center">
        <svg
          viewBox="0 0 460 190"
          className="h-full w-full overflow-visible"
        >
          <defs>
            {/* GSAP-controlled clipPath: line and shade are revealed strictly together */}
            <clipPath id="conversionChartRevealClip">
              <rect ref={clipRectRef} x="0" y="0" width="0" height="195" />
            </clipPath>

            <linearGradient id="lineAreaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#babad0" stopOpacity="0.32" />
              <stop offset="45%" stopColor="#8191b8" stopOpacity="0.14" />
              <stop offset="85%" stopColor="#53628d" stopOpacity="0.03" />
              <stop offset="100%" stopColor="#53628d" stopOpacity="0" />
            </linearGradient>

            <linearGradient id="lineStrokeGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#babad0" />
              <stop offset="50%" stopColor="#8a99bf" />
              <stop offset="100%" stopColor="#53628d" />
            </linearGradient>

            <linearGradient id="scannerGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#babad0" stopOpacity="0" />
              <stop offset="25%" stopColor="#babad0" stopOpacity="0.95" />
              <stop offset="70%" stopColor="#8191b8" stopOpacity="1" />
              <stop offset="100%" stopColor="#53628d" stopOpacity="0" />
            </linearGradient>

            <filter id="chartGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Background horizontal grid lines */}
          <line x1="40" y1="30" x2="445" y2="30" stroke="rgba(255,255,255,0.06)" strokeDasharray="2 4" />
          <line x1="40" y1="72" x2="445" y2="72" stroke="rgba(255,255,255,0.06)" strokeDasharray="2 4" />
          <line x1="40" y1="114" x2="445" y2="114" stroke="rgba(255,255,255,0.06)" strokeDasharray="2 4" />
          <line x1="40" y1="156" x2="445" y2="156" stroke="rgba(255,255,255,0.08)" />

          {/* Perpendicular vertical axis line at chart start */}
          <line x1="40" y1="30" x2="40" y2="156" stroke="rgba(255,255,255,0.08)" />

          {/* Faint vertical telemetry guides under milestone columns */}
          <line x1="55" y1="26" x2="55" y2="156" stroke="rgba(255,255,255,0.025)" strokeDasharray="2 4" />
          <line x1="145" y1="26" x2="145" y2="156" stroke="rgba(255,255,255,0.025)" strokeDasharray="2 4" />
          <line x1="235" y1="26" x2="235" y2="156" stroke="rgba(255,255,255,0.025)" strokeDasharray="2 4" />
          <line x1="325" y1="26" x2="325" y2="156" stroke="rgba(255,255,255,0.025)" strokeDasharray="2 4" />
          <line x1="415" y1="26" x2="415" y2="156" stroke="rgba(255,255,255,0.025)" strokeDasharray="2 4" />

          {/* Y-axis percentage labels */}
          <text x="8" y="33" fill="rgba(255,255,255,0.32)" fontSize="8.5" fontFamily="monospace">+280%</text>
          <text x="8" y="75" fill="rgba(255,255,255,0.32)" fontSize="8.5" fontFamily="monospace">+200%</text>
          <text x="8" y="117" fill="rgba(255,255,255,0.32)" fontSize="8.5" fontFamily="monospace">+100%</text>
          <text x="20" y="159" fill="rgba(255,255,255,0.22)" fontSize="8.5" fontFamily="monospace">0%</text>

          {/* CLIPPED GROUP: Line and Shade move together from left to right */}
          <g clipPath="url(#conversionChartRevealClip)">
            {/* Area Shade under the curve */}
            <path
              d="M 40 145 C 105 143, 175 122, 235 94 C 295 66, 360 35, 415 28 L 415 156 L 40 156 Z"
              fill="url(#lineAreaGrad)"
            />

            {/* Glowing line bloom underlay */}
            <path
              d="M 40 145 C 105 143, 175 122, 235 94 C 295 66, 360 35, 415 28"
              fill="none"
              stroke="#babad0"
              strokeWidth="6"
              strokeLinecap="round"
              opacity="0.25"
              filter="url(#chartGlow)"
            />

            {/* Sharp curved line stroke */}
            <path
              d="M 40 145 C 105 143, 175 122, 235 94 C 295 66, 360 35, 415 28"
              fill="none"
              stroke="url(#lineStrokeGrad)"
              strokeWidth="3.2"
              strokeLinecap="round"
            />
          </g>

          {/* Scanner laser line following the leading edge */}
          <line
            ref={cursorLineRef}
            x1="40"
            y1="18"
            x2="40"
            y2="156"
            stroke="url(#scannerGrad)"
            strokeWidth="1.5"
            filter="url(#chartGlow)"
            className="pointer-events-none"
          />

          {/* Month labels at bottom */}
          <text x="55" y="174" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="9" fontFamily="monospace">Luna 1</text>
          <text x="145" y="174" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="9" fontFamily="monospace">Luna 2</text>
          <text x="235" y="174" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="9" fontFamily="monospace">Luna 3</text>
          <text x="325" y="174" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="9" fontFamily="monospace">Luna 4</text>
          <text x="415" y="174" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="9" fontFamily="monospace">Luna 5</text>
        </svg>

        {/* PERFECTLY CIRCULAR DATA POINT NODES (Positioned mathematically on the curve) */}
        {CHART_POINTS.map((pt, i) => {
          if (pt.isPeak) {
            return (
              <div
                key={i}
                ref={(el) => (dotsRef.current[i] = el)}
                data-visible="false"
                className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 flex items-center justify-center opacity-0 scale-0 z-10"
                style={{
                  left: `${(pt.x / 460) * 100}%`,
                  top: `${(pt.y / 190) * 100}%`,
                }}
              >
                {/* Radar pulse ping */}
                <div className="absolute h-6 w-6 rounded-full bg-[#babad0]/40 animate-ping" />
                {/* Glowing halo aura */}
                <div className="absolute h-6 w-6 rounded-full bg-[#babad0]/25 blur-sm" />
                {/* Peak circle */}
                <div className="relative flex h-4 w-4 items-center justify-center rounded-full border-2 border-white bg-[#6b7b9f] shadow-[0_0_14px_rgba(186,186,208,0.85)]">
                  <div className="h-1.5 w-1.5 rounded-full bg-white shadow-[0_0_6px_#ffffff]" />
                </div>
              </div>
            );
          }

          return (
            <div
              key={i}
              ref={(el) => (dotsRef.current[i] = el)}
              data-visible="false"
              className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 flex items-center justify-center opacity-0 scale-0"
              style={{
                left: `${(pt.x / 460) * 100}%`,
                top: `${(pt.y / 190) * 100}%`,
              }}
            >
              {/* Outer halo */}
              <div className="absolute h-5 w-5 rounded-full bg-[#babad0]/20 blur-sm" />
              {/* Circular disk */}
              <div className="relative flex h-3 w-3 items-center justify-center rounded-full border-[2px] border-[#babad0] bg-[#0c101a] shadow-[0_0_8px_rgba(186,186,208,0.65)]">
                {/* Pure white core */}
                <div className="h-1 w-1 rounded-full bg-white shadow-[0_0_4px_#ffffff]" />
              </div>
            </div>
          );
        })}

        {/* Floating peak milestone tooltip */}
        <div
          ref={tooltipRef}
          className="absolute -top-3.5 right-0 sm:right-2 z-20 flex items-center gap-1.5 sm:gap-2 rounded-xl border border-[#8191b8]/40 bg-[#0d1322]/95 px-2.5 py-1 sm:px-3 sm:py-1.5 shadow-[0_12px_28px_rgba(0,0,0,0.6),0_0_24px_rgba(83,98,141,0.25)] backdrop-blur-xl opacity-0 pointer-events-none"
        >
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#babad0] opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#8191b8]" />
          </span>
          <div className="flex flex-col">
            <span className="text-[8px] sm:text-[9px] font-semibold uppercase tracking-wider text-white/50">Vârf Conversii</span>
            <div className="flex items-center gap-1">
              <span className="font-mono text-[11px] sm:text-xs font-bold text-[#babad0]">+96.4% CR</span>
              <span className="text-[9px] sm:text-[10px] text-white/60">record</span>
            </div>
          </div>
        </div>
      </div>

      {/* Centered pill badge under graph */}
      <div className="flex justify-center -mt-1 sm:mt-0 mb-2 sm:mb-3">
        <div className="flex items-center gap-1.5 rounded-full border border-[#8191b8]/30 bg-[#53628d]/15 px-3 py-1 text-xs font-semibold text-[#babad0] shadow-[0_0_14px_rgba(186,186,208,0.15)] backdrop-blur-md">
          <TrendingUp size={13} className="text-[#babad0]" />
          <span ref={rateNumberRef} className="font-mono font-bold">+0%</span>
          <span className="text-[10px] text-[#babad0]/75 font-normal">Creștere</span>
        </div>
      </div>

      {/* Bottom stats */}
      <div className="flex items-end justify-between border-t border-white/[0.08] pt-3.5 sm:pt-4">
        <div>
          <AnimatedStat value={usp.stat} suffix={usp.suffix} className="text-3xl sm:text-4xl" />
          <p className="mt-1 text-xs text-[#8491ab]">{usp.statLabel}</p>
        </div>
      </div>
    </div>
  );
}

function TypewriterSearchQuery() {
  const [typedQuery, setTypedQuery] = useState("");

  useEffect(() => {
    const target = "servicii web design si seo";
    let curr = "";
    let i = 0;
    const timer = setInterval(() => {
      if (i < target.length) {
        curr += target[i];
        setTypedQuery(curr);
        i++;
      } else {
        clearInterval(timer);
      }
    }, 40); // 27 * 40ms ≈ 1.08s typing
    return () => clearInterval(timer);
  }, []);

  return (
    <span className="text-xs text-white/90 font-mono tracking-tight flex items-center">
      {typedQuery}
      <span className="ml-0.5 inline-block h-3.5 w-0.5 bg-[#babad0] animate-pulse" />
    </span>
  );
}

function SeoWidget({ usp }) {
  return (
    <div className="flex h-full flex-col justify-between">
      {/* Centered Compact Group: Search Bar + Google Result Card */}
      <div className="my-auto flex flex-col justify-center gap-2.5 sm:gap-3">
        {/* Simulated Google Search Bar */}
        <div className="relative overflow-hidden rounded-xl border border-white/10 bg-[#0d1324]/90 px-3.5 py-2 shadow-lg backdrop-blur-md ring-1 ring-white/5">
          <div className="flex items-center gap-2.5">
            <div className="flex h-5 w-5 items-center justify-center rounded-md bg-white/10 text-[#babad0]">
              <Search size={12} />
            </div>
            <TypewriterSearchQuery />
            <div className="ml-auto flex items-center gap-1.5">
              <span className="hidden sm:inline-flex rounded-md border border-white/10 bg-white/5 px-1.5 py-0.5 font-mono text-[9px] text-white/40">
                ⌘K
              </span>
            </div>
          </div>
        </div>

        {/* Google Result Card #1 */}
        <motion.div
          initial={{ opacity: 0, y: 12, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, delay: 1.25, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-2xl border border-[#53628d]/30 bg-[#111728]/95 p-3.5 sm:p-4 shadow-[0_14px_32px_rgba(0,0,0,0.5),0_0_24px_rgba(83,98,141,0.15)] backdrop-blur-xl"
        >
          <div className="flex flex-wrap items-center justify-between gap-1.5 sm:gap-2">
            <div className="flex items-center gap-2 text-[11px] text-white/60">
              <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#babad0] to-[#53628d] shadow-[0_0_12px_rgba(186,186,208,0.5)]">
                <img
                  src="/logo_black.svg"
                  alt="A Squared Studio"
                  className="h-3.5 w-3.5 object-contain"
                />
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:gap-1">
                <span className="font-semibold text-white/90">A Squared Studio</span>
                <span className="hidden sm:inline text-white/30">·</span>
                <span className="font-mono text-[9px] sm:text-[10px] text-white/50 truncate max-w-[120px] sm:max-w-none">
                  asquaredstudio.ro/servicii
                </span>
              </div>
            </div>

            <motion.span
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 1.8, duration: 0.45, ease: [0.34, 1.56, 0.64, 1] }}
              className="shrink-0 flex items-center gap-1 sm:gap-1.5 rounded-full border border-[#8191b8]/40 bg-[#53628d]/20 px-2 py-0.5 sm:px-2.5 text-[9px] sm:text-[10px] font-bold text-[#babad0] shadow-[0_0_14px_rgba(186,186,208,0.25)]"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#babad0] opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#8191b8]" />
              </span>
              <CheckCheck size={11} className="text-[#babad0]" />
              <span>#1 pe Google</span>
            </motion.span>
          </div>

          <p className="mt-2 text-sm sm:text-base font-bold text-white tracking-tight">
            A Squared Studio — Web Design &amp; SEO Tehnic de Elită
          </p>

          {/* Rating stars & review counts */}
          <div className="mt-1 flex items-center gap-1.5 text-xs text-amber-400">
            <div className="flex gap-0.5">
              {[0, 1, 2, 3, 4].map((i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.7 + i * 0.04, duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
                >
                  <Star size={12} className="fill-amber-400 text-amber-400 drop-shadow-[0_0_4px_rgba(251,191,36,0.35)]" />
                </motion.span>
              ))}
            </div>
            <span className="text-[11px] font-bold text-amber-300">5.0</span>
            <span className="text-[11px] text-white/40">·</span>
            <span className="text-[11px] font-medium text-white/80">40+ recenzii verificate</span>
          </div>

          <p className="mt-1.5 text-xs text-white/65 line-clamp-2 leading-relaxed">
            Site-uri construite cu arhitectură SEO tehnică avansată, Schema.org și optimizare de conținut din prima zi.
          </p>

          {/* Sitelinks Micro Tags */}
          <div className="mt-2.5 flex items-center gap-1.5 flex-wrap">
            {["Audit Gratuit", "Portofoliu 2026", "Consultanță 1-la-1"].map((tag, idx) => (
              <motion.span
                key={tag}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.95 + idx * 0.07, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="rounded-md border border-white/10 bg-white/[0.04] px-2 py-0.5 font-mono text-[10px] text-white/60"
              >
                {tag}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom stats */}
      <div className="flex items-end justify-between border-t border-white/[0.08] pt-3.5 sm:pt-4">
        <div>
          <AnimatedStat value={usp.stat} suffix={usp.suffix} className="text-3xl sm:text-4xl" />
          <p className="mt-1 text-xs text-[#8491ab]">{usp.statLabel}</p>
        </div>
      </div>
    </div>
  );
}

const CORE_METRICS = [
  { label: "TTFB", name: "Răspuns Server", val: "18ms", status: "Instant", delay: 0.4, pct: 99 },
  { label: "FCP", name: "First Contentful Paint", val: "0.38s", status: "Optim", delay: 0.8, pct: 98 },
  { label: "LCP", name: "Largest Contentful Paint", val: "0.74s", status: "Ultra-Rapid", delay: 1.2, pct: 96 },
  { label: "CLS", name: "Stabilitate Vizuală", val: "0.00", status: "Zero Shift", delay: 1.6, pct: 100 },
];

function GaugeScoreCounter({ targetScore }) {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const controls = animate(0, targetScore, {
      duration: 2.2,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => setCounter(Math.round(latest)),
    });
    return () => controls.stop();
  }, [targetScore]);

  return (
    <span className="font-mono text-3xl sm:text-5xl font-black tracking-tight text-white drop-shadow-[0_0_16px_rgba(186,186,208,0.7)]">
      {counter}
    </span>
  );
}

function SpeedWidget({ usp }) {
  const circumference = 2 * Math.PI * 62;
  const targetScore = usp.stat || 98;
  const filled = circumference * (targetScore / 100);

  return (
    <div className="flex h-full flex-col justify-between">
      {/* Main Gauge + Metrics Row */}
      <div className="my-auto flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6">
        {/* Expanded Speedometer Gauge */}
        <div className="relative flex h-28 w-28 sm:h-44 sm:w-44 shrink-0 items-center justify-center">
          {/* Subtle radial background glow */}
          <div className="absolute inset-2 rounded-full bg-[#53628d]/20 blur-xl" />

          {/* Rotating dashed accent ring */}
          <div className="absolute inset-0 animate-spin [animation-duration:22s] rounded-full border border-dashed border-[#8191b8]/20" />

          <svg viewBox="0 0 160 160" className="relative h-full w-full -rotate-90">
            <defs>
              <linearGradient id="speedGaugeGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#babad0" />
                <stop offset="100%" stopColor="#53628d" />
              </linearGradient>
            </defs>

            {/* Concentric subtle calibration ring */}
            <circle
              cx="80"
              cy="80"
              r="74"
              fill="none"
              stroke="rgba(186,186,208,0.12)"
              strokeDasharray="3 6"
              strokeWidth="1.5"
            />

            {/* Background track */}
            <circle
              cx="80"
              cy="80"
              r="62"
              fill="none"
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="10"
            />

            {/* Glowing animated progress stroke over 2.2s */}
            <motion.circle
              cx="80"
              cy="80"
              r="62"
              fill="none"
              stroke="url(#speedGaugeGrad)"
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset: circumference - filled }}
              transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
            />

            {/* Inner decorative ring */}
            <circle
              cx="80"
              cy="80"
              r="48"
              fill="none"
              stroke="rgba(255,255,255,0.04)"
              strokeWidth="1"
            />
          </svg>

          <div className="absolute flex flex-col items-center">
            <GaugeScoreCounter targetScore={targetScore} />
            <span className="rounded-full bg-[#53628d]/25 border border-[#8191b8]/30 px-1.5 py-0.2 sm:px-2 sm:py-0.5 text-[8px] sm:text-[9px] font-bold uppercase tracking-wider text-[#babad0] mt-0.5">
              Performanță
            </span>
            <span className="font-mono text-[9px] sm:text-[10px] text-white/45 mt-0.5">
              Timp: 0.38s
            </span>
          </div>
        </div>

        {/* 4 Core Web Vitals SaaS Metric Cards */}
        <div className="grid grid-cols-2 gap-1.5 sm:flex sm:flex-col sm:gap-2 w-full sm:max-w-[230px] flex-1">
          {CORE_METRICS.map((m) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, x: 18 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: m.delay, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col gap-0.5 sm:gap-1 rounded-xl border border-white/10 bg-[#101626]/90 p-1.5 sm:p-2.5 shadow-sm backdrop-blur-md"
            >
              <div className="flex items-center justify-between text-[10px] sm:text-[11px]">
                <div className="flex items-center gap-1 sm:gap-1.5">
                  <span className="font-mono font-bold text-white text-[11px] sm:text-xs">{m.label}</span>
                  <span className="text-[9px] sm:text-[10px] text-white/45 hidden md:inline">({m.name.split(" ")[0]})</span>
                </div>
                <div className="flex items-center gap-1 sm:gap-1.5">
                  <span className="font-mono font-bold text-[#babad0] text-[11px] sm:text-xs">{m.val}</span>
                  <span className="rounded-full bg-[#53628d]/20 border border-[#8191b8]/30 px-1 py-0.2 sm:px-1.5 font-mono text-[8px] sm:text-[9px] font-semibold text-[#babad0]">
                    {m.status}
                  </span>
                </div>
              </div>

              {/* Animated mini progress bar */}
              <div className="h-1 sm:h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: `${m.pct}%` }}
                  transition={{ delay: m.delay + 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="h-full rounded-full bg-gradient-to-r from-[#babad0] to-[#53628d]"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom stats */}
      <div className="flex items-end justify-between border-t border-white/[0.08] pt-3.5 sm:pt-4">
        <div>
          <AnimatedStat value={usp.stat} suffix={usp.suffix} className="text-3xl sm:text-4xl" />
          <p className="mt-1 text-xs text-[#8491ab]">{usp.statLabel}</p>
        </div>
      </div>
    </div>
  );
}

function TeamWidget({ usp }) {
  const [showReply, setShowReply] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowReply(true), 1100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex h-full flex-col justify-between">
      {/* Top Direct Team Header with Overlapping Avatars */}
      <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
        <div className="flex items-center gap-2.5">
          {/* Stacked specialist avatars with online status */}
          <div className="flex -space-x-1.5">
            <div className="relative flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-full border-2 border-[#0c101a] bg-gradient-to-br from-[#babad0] to-[#53628d] text-[9px] sm:text-[10px] font-bold text-white shadow-sm">
              A
              <span className="absolute bottom-0 right-0 h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full border border-[#0c101a] bg-emerald-400" />
            </div>
            <div className="relative flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-full border-2 border-[#0c101a] bg-gradient-to-br from-[#8191b8] to-[#2a344f] text-[9px] sm:text-[10px] font-bold text-white shadow-sm">
              M
              <span className="absolute bottom-0 right-0 h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full border border-[#0c101a] bg-emerald-400" />
            </div>
            <div className="relative flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-full border-2 border-[#0c101a] bg-gradient-to-br from-[#53628d] to-[#121829] text-[9px] sm:text-[10px] font-bold text-[#babad0] shadow-sm">
              R
              <span className="absolute bottom-0 right-0 h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full border border-[#0c101a] bg-emerald-400" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-white">Echipa Ta Dedicată</span>
            <span className="text-[10px] font-mono text-[#babad0]/80">Specialiști Seniori Direct</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 font-mono text-[10px] text-[#babad0]/70">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>Activ</span>
        </div>
      </div>

      {/* Main Chat Thread */}
      <div className="my-auto flex flex-col gap-2 w-full max-w-[440px] mx-auto">
        {/* Client message */}
        <motion.div
          initial={{ opacity: 0, x: -14, scale: 0.97 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.45, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-[88%] rounded-2xl rounded-tl-sm border border-white/10 bg-[#121829]/95 p-2.5 sm:p-3 text-xs sm:text-[13px] text-white shadow-lg backdrop-blur-md"
        >
          <div className="flex items-center gap-1.5 mb-1 text-[10px] text-white/50">
            <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-white/15 text-[8px] font-bold text-white">C</span>
            <span className="font-medium text-white/70">Alex M. · Client Founder</span>
          </div>
          <p className="leading-relaxed text-[11px] sm:text-[13px]">Putem lansa noua campanie și secțiunea de ofertă până mâine dimineață?</p>
          <span className="mt-1 block font-mono text-[9px] text-white/35">10:14</span>
        </motion.div>

        {/* Typing indicator or Developer Reply */}
        <AnimatePresence mode="wait">
          {!showReply ? (
            <motion.div
              key="typing"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, transition: { duration: 0.2 } }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="ml-auto flex items-center gap-2 rounded-2xl rounded-tr-sm border border-white/10 bg-white/[0.08] px-3 py-1.5 text-xs text-white/70 backdrop-blur-md"
            >
              <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#babad0] to-[#53628d] p-0.5 shadow-sm">
                <img src="/logo_black.svg" alt="A Squared Studio" className="h-2.5 w-2.5 object-contain" />
              </div>
              <span className="text-[11px]">Alin tastează</span>
              <span className="flex gap-1 ml-0.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#babad0] animate-bounce" />
                <span className="h-1.5 w-1.5 rounded-full bg-[#babad0] animate-bounce [animation-delay:0.15s]" />
                <span className="h-1.5 w-1.5 rounded-full bg-[#babad0] animate-bounce [animation-delay:0.3s]" />
              </span>
            </motion.div>
          ) : (
            <motion.div
              key="reply"
              initial={{ opacity: 0, x: 14, scale: 0.96 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="ml-auto max-w-[88%] rounded-2xl rounded-tr-sm border border-[#8191b8]/40 bg-gradient-to-br from-[#2a344f]/95 to-[#182033]/95 p-2.5 sm:p-3 text-xs sm:text-[13px] text-white shadow-[0_10px_28px_rgba(83,98,141,0.25)]"
            >
              <div className="flex items-center justify-between mb-1 text-[10px] text-[#babad0]/80">
                <div className="flex items-center gap-1.5">
                  <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#babad0] to-[#53628d] p-0.5 shadow-sm">
                    <img src="/logo_black.svg" alt="A Squared Studio" className="h-2.5 w-2.5 object-contain" />
                  </div>
                  <span className="font-semibold text-white">Alin · Senior Lead Dev</span>
                </div>
                <span className="flex items-center gap-0.5 text-[#babad0] font-semibold font-mono">
                  <CheckCheck size={12} />
                  <span>Livrat</span>
                </span>
              </div>
              <p className="leading-relaxed text-[11px] sm:text-[13px]">Gata! Modificările sunt live pe staging. Viteză maximă și optimizare verificată pe mobil.</p>
              
              {/* Staging preview pill */}
              <div className="mt-1.5 flex items-center justify-between rounded-lg border border-[#8191b8]/30 bg-black/30 px-2.5 py-1 text-[10px]">
                <div className="flex items-center gap-1.5 truncate">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  <span className="font-mono text-[#babad0]/90 truncate">staging.asquared.ro/oferta</span>
                </div>
                <span className="shrink-0 ml-1 font-semibold text-[#babad0]">Gata de Live ↗</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Client instant approval reaction (without rocket emoji) */}
        {showReply && (
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.25, duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
            className="flex items-center gap-1.5 self-end rounded-full border border-white/10 bg-[#101626]/90 px-2.5 py-0.5 text-[10px] text-white/80 shadow-md backdrop-blur-md"
          >
            <span className="font-semibold text-white">Aprobat pentru Live</span>
            <span className="font-mono text-white/40">· 10:17</span>
          </motion.div>
        )}
      </div>

      {/* Bottom stats */}
      <div className="flex items-end justify-between border-t border-white/[0.08] pt-3.5 sm:pt-4">
        <div>
          <AnimatedStat value={usp.stat} suffix={usp.suffix} className="text-3xl sm:text-4xl" />
          <p className="mt-1 text-xs text-[#8491ab]">{usp.statLabel}</p>
        </div>
      </div>
    </div>
  );
}

const WIDGETS = [ConversionWidget, SeoWidget, SpeedWidget, TeamWidget];

const AccordionItem = memo(function AccordionItem({ usp, index, isActive, onSelect }) {
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
});

function MediaPanel({ activeIndex }) {
  const usp = usps[activeIndex];
  const Widget = WIDGETS[activeIndex];

  return (
    <div className="order-first lg:sticky lg:top-32 lg:order-2">
      <div className="relative h-[410px] sm:h-auto sm:aspect-[4/3] w-full flex flex-col overflow-hidden rounded-[1.75rem] border border-white/[0.12] bg-[#0c101a] p-4 sm:p-7 shadow-[0_24px_60px_-12px_rgba(0,0,0,0.7),0_0_50px_rgba(83,98,141,0.12)] ring-1 ring-white/[0.06]">
        {/* Subtle ambient lighting inside the card */}
        <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#53628d]/[0.18] blur-3xl" />
        <div className="pointer-events-none absolute -left-24 -bottom-24 h-64 w-64 rounded-full bg-indigo-500/[0.05] blur-3xl" />

        {/* Subtle background dot matrix pattern */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)",
            backgroundSize: "24px 24px",
          }}
        />

        <AnimatePresence mode="wait">
          <motion.div
            key={usp.title}
            initial={{ opacity: 0, y: 12, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.985 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 flex flex-1 flex-col h-full w-full"
          >
            <Widget usp={usp} />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function ServiceCards() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section
      id="de-ce-noi"
      className="grad-dark isolate w-full px-4 py-20 sm:px-8 sm:py-32 lg:py-40"
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

        <div className="mt-10 sm:mt-16 grid gap-8 sm:gap-10 lg:grid-cols-2 lg:items-start lg:gap-16">
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
