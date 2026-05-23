import { useMemo, useRef } from "react";

import BeautySiteMockup from "./BeautySiteMockup.jsx";
import MedicalSiteMockup from "./MedicalSiteMockup.jsx";
import PersonalSiteMockup from "./PersonalSiteMockup.jsx";
import RestaurantSiteMockup from "./RestaurantSiteMockup.jsx";
import ShopSiteMockup from "./ShopSiteMockup.jsx";
import TransportSiteMockup from "./TransportSiteMockup.jsx";
import { getMiniSite } from "./shared.jsx";

const mockupMap = {
  kineto: MedicalSiteMockup,
  medical: MedicalSiteMockup,
  beauty: BeautySiteMockup,
  transport: TransportSiteMockup,
  restaurant: RestaurantSiteMockup,
  personal: PersonalSiteMockup,
  shop: ShopSiteMockup,
};

export function MiniSiteRenderer({ project, size, device }) {
  const contentRef = useRef(null);
  const mini = useMemo(() => getMiniSite(project), [project]);
  const isMobile = device === "mobile" || size === "card";
  const MockupComponent = mockupMap[mini.layout] || MedicalSiteMockup;

  return (
    <MockupComponent
      mini={mini}
      projectId={project.id}
      contentRef={contentRef}
      isMobile={isMobile}
    />
  );
}

export function MiniSiteCardPreview({ project }) {
  const mini = getMiniSite(project);
  const darkLayouts = ["beauty", "transport", "restaurant", "personal"];
  const isDark = darkLayouts.includes(mini.layout);
  const isBeauty = mini.layout === "beauty";
  const isTransport = mini.layout === "transport";
  const isRestaurant = mini.layout === "restaurant";
  const isPersonal = mini.layout === "personal";
  const isShop = mini.layout === "shop";
  const isKineto = mini.layout === "kineto" || mini.layout === "medical";

  const accentClass = isKineto
    ? "bg-emerald-100 text-emerald-700"
    : isShop
    ? "bg-emerald-100 text-emerald-700"
    : isBeauty
    ? "bg-pink-400/15 text-pink-100"
    : isTransport
    ? "bg-amber-400/15 text-amber-100"
    : isRestaurant
    ? "bg-orange-500/20 text-orange-200"
    : isPersonal
    ? "bg-[#d9c8a6]/15 text-[#d9c8a6]"
    : "bg-white/10 text-white";

  const heroBackground = isKineto
    ? "bg-[radial-gradient(circle_at_82%_38%,rgba(20,184,166,.28),transparent_24%),linear-gradient(135deg,#ffffff,#f1fbf7)]"
    : isShop
    ? "bg-[radial-gradient(circle_at_78%_34%,rgba(132,204,22,.20),transparent_25%),linear-gradient(135deg,#ffffff,#f7f7f3)]"
    : isBeauty
    ? "bg-[radial-gradient(circle_at_74%_34%,rgba(244,114,182,.28),transparent_28%),linear-gradient(135deg,#050505,#21160f)]"
    : isTransport
    ? "bg-[radial-gradient(circle_at_80%_35%,rgba(245,158,11,.24),transparent_28%),linear-gradient(135deg,#020617,#12100c)]"
    : isRestaurant
    ? "bg-[radial-gradient(circle_at_84%_40%,rgba(249,115,22,.32),transparent_26%),linear-gradient(135deg,#041b17,#052e25)]"
    : isPersonal
    ? "bg-[radial-gradient(circle_at_72%_25%,rgba(217,200,166,.18),transparent_28%),linear-gradient(135deg,#080705,#0f0d09)]"
    : "bg-black";

  const initials = mini.brand
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className={`relative h-full w-full overflow-hidden ${heroBackground} ${isDark ? "text-white" : "text-slate-950"}`}>
      <div className={isDark ? "absolute inset-0 bg-black/20" : "absolute inset-0 bg-white/5"} />

      <div className="relative z-10 flex h-full flex-col p-5 sm:p-6">
        <header className="flex items-start justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <span
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[0.62rem] font-black ${
                isDark ? "bg-white/10 text-white ring-1 ring-white/15" : "bg-black text-white"
              }`}
            >
              {initials}
            </span>
            <span className="min-w-0">
              <span className="block truncate text-sm font-black leading-none">{mini.brand}</span>
              <span className={`mt-1 block max-w-[7rem] truncate text-[0.52rem] uppercase tracking-[0.22em] ${isDark ? "text-white/45" : "text-black/45"}`}>
                {mini.subtitle}
              </span>
            </span>
          </div>

          <nav className={`hidden shrink-0 items-center gap-4 pt-1 text-[0.6rem] font-semibold sm:flex ${isDark ? "text-white/65" : "text-black/60"}`}>
            {mini.nav.slice(0, 3).map((item) => (
              <span key={item}>{item}</span>
            ))}
          </nav>
        </header>

        <main className="mt-auto max-w-[78%] pb-1">
          <p className={`mb-3 inline-flex max-w-full truncate rounded-full px-3 py-1 text-[0.5rem] font-black uppercase tracking-[0.13em] ${accentClass}`}>
            {mini.eyebrow}
          </p>
          <h3
            className={`line-clamp-3 text-[1.75rem] font-black leading-[0.92] tracking-[-0.06em] sm:text-[2rem] ${
              isBeauty || isRestaurant ? "font-serif" : ""
            } ${isPersonal ? "font-light text-[#d9c8a6]" : ""}`}
          >
            {mini.headline}
          </h3>
          <p className={`mt-3 line-clamp-2 text-xs leading-5 ${isDark ? "text-white/58" : "text-black/55"}`}>
            {mini.description}
          </p>
        </main>
      </div>
    </div>
  );
}
