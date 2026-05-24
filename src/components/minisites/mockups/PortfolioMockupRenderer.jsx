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
  const layout = mini.layout === "medical" ? "kineto" : mini.layout;
  const themes = {
    kineto: {
      root: "bg-[#fbfaf4] text-[#10211f]",
      mark: "bg-[#134e4a] text-white",
      badge: "bg-[#eaf7f2] text-[#0f766e]",
      muted: "text-[#64748b]",
      accent: "bg-[#f97316]",
      title: "",
    },
    beauty: {
      root: "bg-[#241515] text-[#f7e5d5]",
      mark: "bg-[#f7e5d5] text-[#241515]",
      badge: "bg-[#8e4f53] text-white",
      muted: "text-white/65",
      accent: "bg-[#d6a064]",
      title: "font-serif",
    },
    transport: {
      root: "bg-[#243226] text-white",
      mark: "bg-[#f97316] text-white",
      badge: "bg-white/[0.10] text-[#fbbf24]",
      muted: "text-white/65",
      accent: "bg-[#1f766f]",
      title: "",
    },
    restaurant: {
      root: "bg-[#fffaf1] text-[#17382e]",
      mark: "bg-[#dc2626] text-white",
      badge: "bg-[#e8f8e4] text-[#16a34a]",
      muted: "text-[#64748b]",
      accent: "bg-[#f97316]",
      title: "font-serif italic text-[#dc2626]",
    },
    personal: {
      root: "bg-[#ece8dd] text-[#111111]",
      mark: "bg-[#111111] text-[#f4c430]",
      badge: "bg-[#f4c430] text-[#111111]",
      muted: "text-[#4b5563]",
      accent: "bg-[#2563eb]",
      title: "uppercase",
    },
    shop: {
      root: "bg-[#f4f4ef] text-[#111111]",
      mark: "bg-[#111111] text-[#a3e635]",
      badge: "bg-[#a3e635] text-[#111111]",
      muted: "text-[#4b5563]",
      accent: "bg-[#f97316]",
      title: "uppercase",
    },
  };
  const theme = themes[layout] || themes.kineto;

  const initials = mini.brand
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const visual = {
    kineto: (
      <div className="absolute bottom-5 right-5 h-32 w-32 border border-[#134e4a]/20 bg-[#eaf7f2]">
        <span className="absolute left-5 top-5 h-14 w-14 rounded-full border-[10px] border-[#9be7d0]" />
        <span className="absolute bottom-5 right-5 h-12 w-12 rounded-full border-[10px] border-[#ffd9a8]" />
        <span className="absolute left-12 top-14 h-3 w-20 rotate-12 bg-[#134e4a]" />
      </div>
    ),
    beauty: (
      <div className="absolute bottom-5 right-5 h-36 w-28 border border-[#f7e5d5]/25 bg-[#c98979]">
        <span className="absolute inset-5 bg-[#f7e5d5]" />
        <span className="absolute left-9 top-10 h-12 w-10 rounded-full bg-[#8e4f53]" />
        <span className="absolute bottom-4 left-4 h-10 w-10 border-[8px] border-[#d6a064]" />
      </div>
    ),
    transport: (
      <div className="absolute bottom-5 right-5 h-32 w-40 border border-white/15 bg-white/[0.08]">
        <svg className="h-full w-full" viewBox="0 0 160 120" aria-hidden="true">
          <path d="M14 92 C46 34 72 72 104 28 C124 4 140 18 152 12" fill="none" stroke="#f97316" strokeWidth="6" strokeLinecap="round" />
          <path d="M16 104 C52 84 70 102 106 76 C128 60 138 66 152 48" fill="none" stroke="#1f766f" strokeWidth="4" strokeLinecap="round" />
        </svg>
      </div>
    ),
    restaurant: (
      <div className="absolute bottom-4 right-4 h-36 w-36 rounded-full bg-[#f97316]">
        <span className="absolute inset-3 rounded-full bg-white" />
        <span className="absolute left-9 top-10 h-8 w-12 rotate-[-20deg] rounded-full bg-[#16a34a]" />
        <span className="absolute right-8 top-11 h-9 w-9 rounded-full bg-[#fb923c]" />
        <span className="absolute bottom-9 left-9 h-9 w-9 rounded-full bg-[#ef4444]" />
      </div>
    ),
    personal: (
      <div className="absolute bottom-5 right-5 grid h-32 w-32 place-items-center border border-[#111111] bg-[#111111] text-[#f4c430] shadow-[6px_6px_0_#f4c430]">
        <span className="text-5xl font-black">{initials}</span>
      </div>
    ),
    shop: (
      <div className="absolute bottom-5 right-5 h-36 w-28 border border-[#111111] bg-[#111111]">
        <span className="absolute left-1/2 top-6 h-16 w-12 -translate-x-1/2 rounded-t-[2rem] bg-white" />
        <span className="absolute left-1/2 top-12 h-16 w-20 -translate-x-1/2 bg-[#f4f4ef]" />
        <span className="absolute bottom-0 left-1/2 h-14 w-9 -translate-x-[98%] bg-[#94a3b8]" />
        <span className="absolute bottom-0 left-1/2 h-14 w-9 -translate-x-[2%] bg-[#64748b]" />
      </div>
    ),
  };

  return (
    <div className={`relative h-full w-full overflow-hidden ${theme.root}`}>
      <div className={`absolute right-0 top-0 h-24 w-24 ${theme.accent} opacity-80`} />
      {visual[layout] || visual.kineto}

      <div className="relative z-10 flex h-full flex-col p-5 sm:p-6">
        <header className="flex items-start justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <span className={`flex h-8 w-8 shrink-0 items-center justify-center text-[0.62rem] font-black ${theme.mark}`}>
              {initials}
            </span>
            <span className="min-w-0">
              <span className="block truncate text-sm font-black leading-none">{mini.brand}</span>
              <span className={`mt-1 block max-w-[7rem] truncate text-[0.55rem] uppercase ${theme.muted}`}>
                {mini.subtitle}
              </span>
            </span>
          </div>

          <nav className={`hidden shrink-0 items-center gap-4 pt-1 text-[0.6rem] font-semibold sm:flex ${theme.muted}`}>
            {mini.nav.slice(0, 3).map((item) => (
              <span key={item}>{item}</span>
            ))}
          </nav>
        </header>

        <main className="mt-auto max-w-[78%] pb-1">
          <p className={`mb-3 inline-flex max-w-full truncate px-3 py-1 text-[0.55rem] font-black uppercase ${theme.badge}`}>
            {mini.eyebrow}
          </p>
          <h3 className={`line-clamp-3 text-[1.75rem] font-black leading-none sm:text-[2rem] ${theme.title}`}>
            {mini.headline}
          </h3>
          <p className={`mt-3 line-clamp-2 text-xs leading-5 ${theme.muted}`}>
            {mini.description}
          </p>
        </main>
      </div>
    </div>
  );
}
