import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Monitor,
  Smartphone,
  Target,
  X,
  Zap,
} from "lucide-react";

import AnimatedSection from "./AnimatedSection";
import SectionHeader from "./SectionHeader";
import PortfolioBrowserFrame from "./PortfolioBrowserFrame";
import { portfolio } from "../data/portfolio";
import OverlayBackdrop from "./OverlayBackdrop";

const deviceOptions = [
  {
    id: "desktop",
    label: "Desktop",
    icon: Monitor,
    frameClass: "w-full max-w-4xl",
    heightClass: "h-[34rem]",
  },
  {
    id: "mobile",
    label: "Mobil",
    icon: Smartphone,
    frameClass: "w-full max-w-[19rem]",
    heightClass: "h-[34rem]",
  },
];

function getProjectCase(project) {
  return {
    goal:
      project.caseStudy?.goal ||
      project.goal ||
      "Crearea unei prezențe online clare, ușor de parcurs și orientate spre contact.",
    solution:
      project.caseStudy?.solution ||
      project.solution ||
      "Am structură pagini și secțiuni simple, cu mesaje clare, CTA-uri vizibile și design responsive.",
    benefit:
      project.caseStudy?.benefit ||
      project.benefit ||
      "Vizitatorul înțelege rapid ce oferă afacerea și are un traseu clar către cerere, programare sau contact.",
  };
}

function getProjectDeliverables(project) {
  return (
    project.deliverables || [
      "structură pagini și secțiuni",
      "design responsive",
      "formular de contact",
      "CTA-uri clare",
      "SEO de bază",
      "optimizare vizuală pentru conversie",
    ]
  );
}

function PortfolioCardPreview({ project }) {
  return (
    <div className="relative h-44 overflow-hidden rounded-[1.35rem] border border-white/10 bg-black/50 p-3 md:h-64 md:rounded-[1.7rem]">
      <div
        className={`absolute inset-0 bg-gradient-to-br ${project.theme?.glowFrom || "from-white/20"
          } ${project.theme?.glowVia || "via-white/10"} to-transparent opacity-70`}
      />

      <div
        className={`absolute -right-16 -top-16 h-44 w-44 rounded-full blur-3xl transition-transform duration-500 group-hover:scale-110 ${project.theme?.glowAccentOne || "bg-white/10"
          }`}
      />

      <div
        className={`absolute -bottom-16 -left-16 h-44 w-44 rounded-full blur-3xl transition-transform duration-500 group-hover:scale-110 ${project.theme?.glowAccentTwo || "bg-white/10"
          }`}
      />

      <div className="relative h-full transition-transform duration-500 group-hover:-translate-y-1 group-hover:scale-[1.03]">
        <PortfolioBrowserFrame project={project} size="card" device="desktop" />
      </div>

      <div className="pointer-events-none absolute bottom-5 left-5 right-5 flex translate-y-4 items-center justify-between rounded-full border border-white/10 bg-black/65 px-4 py-2 opacity-0 backdrop-blur-xl transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
        <span className="text-xs font-medium text-white/65">
          Vezi de ce funcționează
        </span>

        <ArrowRight size={15} className="text-white/65" />
      </div>
    </div>
  );
}

function PortfolioListCard({ project, onOpen, compact = false }) {
  return (
    <button
      type="button"
      onClick={() => onOpen(project)}
      aria-label={`Deschide studiul de caz ${project.title}`}
      className={`group rounded-[1.55rem] border border-white/10 bg-white/[0.035] p-3 text-left transition-transform duration-300 will-change-transform hover:-translate-y-2 hover:bg-white/[0.05] md:rounded-[2rem] md:p-4 ${
        compact ? "w-full" : ""
      }`}
    >
      <PortfolioCardPreview project={project} />

      <div className="p-3 md:p-4">
        <div className="mb-3 flex items-center justify-between gap-4 md:mb-4">
          <p className="text-xs text-white/45 md:text-sm">{project.category}</p>

          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-white/45 transition group-hover:bg-white group-hover:text-black md:h-9 md:w-9">
            <ArrowUpRight size={17} />
          </span>
        </div>

        <h3 className="text-xl font-semibold tracking-[-0.03em] text-white md:text-2xl">
          {project.title}
        </h3>

        <p className="mt-2 mobile-line-clamp-3 text-sm leading-6 text-white/55 md:mt-3 md:text-base md:leading-7">
          {project.text}
        </p>

        <div className="mt-4 flex flex-wrap gap-2 md:mt-5">
          {(project.features || []).slice(0, compact ? 2 : 3).map((feature) => (
            <span
              key={feature}
              className="rounded-full border border-white/10 bg-white/[0.035] px-3 py-1.5 text-xs text-white/50"
            >
              {feature}
            </span>
          ))}
        </div>
      </div>
    </button>
  );
}

function CaseStudySummary({ project }) {
  const projectCase = getProjectCase(project);

  return (
    <div className="grid gap-3">
      <CaseRow
        icon={Target}
        label="Obiectiv"
        text={projectCase.goal}
      />

      <CaseRow
        icon={Zap}
        label="Soluție"
        text={projectCase.solution}
      />

      <CaseRow
        icon={Check}
        label="Beneficiu"
        text={projectCase.benefit}
      />
    </div>
  );
}

function CaseRow({ icon: Icon, label, text }) {
  return (
    <div className="rounded-[1.4rem] border border-white/10 bg-white/[0.035] p-4">
      <div className="mb-3 flex items-center gap-2 text-sm font-medium text-white/70">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-black">
          <Icon size={16} />
        </span>
        {label}
      </div>

      <p className="text-sm leading-6 text-white/50">{text}</p>
    </div>
  );
}

function DeviceSwitcher({ device, setDevice }) {
  return (
    <div className="flex flex-wrap gap-2">
      {deviceOptions.map((item) => {
        const Icon = item.icon;
        const active = device === item.id;

        return (
          <button
            key={item.id}
            type="button"
            onClick={() => setDevice(item.id)}
            className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition ${active
                ? "border-white bg-white text-black"
                : "border-white/10 bg-white/[0.04] text-white/55 hover:bg-white/[0.08] hover:text-white"
              }`}
          >
            <Icon size={16} />
            {item.label}
          </button>
        );
      })}
    </div>
  );
}

function PortfolioProjectModal({
  project,
  onClose,
  onNext,
  onPrev,
  onOpenContact,
}) {
  const [device, setDevice] = useState("desktop");

  const selectedDevice = useMemo(
    () => deviceOptions.find((item) => item.id === device) || deviceOptions[0],
    [device]
  );

  useEffect(() => {
    if (!project) return undefined;

    function handleKeyDown(event) {
      if (event.key === "Escape") onClose?.();
      if (event.key === "ArrowRight") onNext?.();
      if (event.key === "ArrowLeft") onPrev?.();
    }

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose, onNext, onPrev, project]);

  if (!project) return null;

  const deliverables = getProjectDeliverables(project);

  return (
    <motion.div
      className="fixed inset-0 z-[260] flex items-center justify-center px-3 py-2 sm:px-5"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 1 }}
    >
      <OverlayBackdrop onClick={onClose} blur={7} opacity={0.62} duration={0.85} />

      <motion.div
        initial={{ opacity: 0, scale: 0.985, y: 14 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.985, y: 10 }}
        transition={{
          duration: 0.42,
          delay: 0.12,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="relative max-h-[calc(100dvh-1rem)] w-full max-w-7xl overflow-hidden rounded-[1.35rem] border border-white/10 bg-[#080808] shadow-[0_24px_90px_rgba(0,0,0,0.65)] md:max-h-[92vh] md:rounded-[2rem]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="portfolio-modal-title"
      >
        <div className="flex h-14 items-center justify-between border-b border-white/10 bg-white/[0.04] px-4 md:px-5">
          <div className="flex items-center gap-3">
            <div className="flex gap-2">
              <span className="h-3 w-3 rounded-full bg-red-400" />
              <span className="h-3 w-3 rounded-full bg-yellow-400" />
              <span className="h-3 w-3 rounded-full bg-green-400" />
            </div>

            <div className="hidden rounded-full border border-white/10 bg-black/30 px-4 py-1 text-xs text-white/40 sm:block">
              case study / {project.title.toLowerCase()}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onPrev}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/65 transition hover:bg-white hover:text-black sm:h-9 sm:w-9"
              aria-label="Proiect anterior"
            >
              <ChevronLeft size={18} />
            </button>

            <button
              type="button"
              onClick={onNext}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/65 transition hover:bg-white hover:text-black sm:h-9 sm:w-9"
              aria-label="Proiect următor"
            >
              <ChevronRight size={18} />
            </button>

            <button
              type="button"
              onClick={onClose}
              className="group flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-white/75 transition hover:bg-white hover:text-black sm:h-9 sm:w-9"
              aria-label="Închide preview-ul proiectului"
            >
              <X size={18} className="transition group-hover:rotate-90" />
            </button>
          </div>
        </div>

        <div className="grid max-h-[calc(100dvh-4.5rem)] overflow-y-auto md:max-h-[calc(92vh-3.5rem)] lg:grid-cols-[0.42fr_0.58fr]">
          <aside className="border-b border-white/10 p-4 lg:border-b-0 lg:border-r lg:p-7">
            <p className="text-sm uppercase tracking-[0.3em] text-white/35">
              {project.category}
            </p>

            <h2
              id="portfolio-modal-title"
              className="mt-4 text-2xl font-semibold tracking-[-0.04em] text-white md:mt-5 md:text-5xl md:tracking-[-0.055em]"
            >
              {project.title}
            </h2>

            <p className="mt-3 mobile-line-clamp-3 text-sm leading-6 text-white/60 md:mt-5 md:text-base md:leading-8">
              {project.text}
            </p>

            <div className="mt-7 hidden md:block">
              <CaseStudySummary project={project} />
            </div>

            <div className="mt-5 rounded-[1.25rem] border border-white/10 bg-white/[0.035] p-4 md:mt-7 md:rounded-[1.5rem] md:p-5">
              <p className="text-xs uppercase tracking-[0.22em] text-white/35 md:text-sm md:tracking-[0.25em] md:text-white/30">
                Ce primește clientul
              </p>

              <div className="mt-4 grid gap-3">
                {deliverables.slice(0, 4).map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-black">
                      <Check size={13} />
                    </span>

                    <span className="text-sm text-white/58">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                onClose();
                setTimeout(() => {
                  onOpenContact?.("Standard");
                }, 180);
              }}
              className="group mt-5 inline-flex w-full items-center justify-center gap-3 rounded-full bg-white px-6 py-4 font-semibold text-black transition hover:scale-[1.02] hover:bg-white/90 md:mt-7"
            >
              Vreau un site asemănător
              <ArrowRight size={18} className="transition group-hover:translate-x-1" />
            </button>
          </aside>

          <section
            className={`relative hidden overflow-hidden bg-gradient-to-br p-4 md:block md:p-7 ${project.theme?.modalBg ||
              "from-white/10 via-white/5 to-transparent"
              }`}
          >
            <div className="mb-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm font-medium text-white/70">
                  Preview minisite
                </p>
                <p className="mt-1 text-sm text-white/40">
                  Explorează structura vizuală a minisite-ului.
                </p>
              </div>

              <DeviceSwitcher device={device} setDevice={setDevice} />
            </div>

            <div className="flex min-h-[36rem] items-center justify-center">
              <motion.div
                key={device}
                initial={{ opacity: 0, scale: 0.96, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className={`relative ${selectedDevice.frameClass}`}
              >
                <div className={`relative overflow-hidden ${selectedDevice.heightClass}`}>
                  <PortfolioBrowserFrame
                    project={project}
                    size="full"
                    device={device}
                    interactive
                  />
                </div>
              </motion.div>
            </div>
          </section>
        </div>
      </motion.div>
    </motion.div>
  );
}

function Portfolio({ onOverlayChange, onOpenContact }) {
  const [selectedProject, setSelectedProject] = useState(null);
  const [mobileIndex, setMobileIndex] = useState(0);

  const mobileProject = portfolio[mobileIndex];
  const isMobileFirst = mobileIndex === 0;
  const isMobileLast = mobileIndex === portfolio.length - 1;

  function openProject(project) {
    setSelectedProject(project);
    onOverlayChange?.(true);
  }

  function closeProject() {
    setSelectedProject(null);
    onOverlayChange?.(false);
  }

  function getCurrentIndex() {
    return portfolio.findIndex((item) => item.id === selectedProject?.id);
  }

  function goNextProject() {
    const currentIndex = getCurrentIndex();
    const nextIndex = currentIndex >= portfolio.length - 1 ? 0 : currentIndex + 1;
    setSelectedProject(portfolio[nextIndex]);
  }

  function goPrevProject() {
    const currentIndex = getCurrentIndex();
    const prevIndex = currentIndex <= 0 ? portfolio.length - 1 : currentIndex - 1;
    setSelectedProject(portfolio[prevIndex]);
  }

  function goNextMobileProject() {
    setMobileIndex((prev) => Math.min(prev + 1, portfolio.length - 1));
  }

  function goPrevMobileProject() {
    setMobileIndex((prev) => Math.max(prev - 1, 0));
  }

  return (
    <>
      <AnimatedSection id="portofoliu" className="px-5 py-14 md:py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Portofoliu"
            title="Nu arătăm doar cum arată un site. Arătăm de ce funcționează."
            text="Explorează proiectele ca studii de caz: obiectiv, soluție, beneficii și preview vizual al interfeței."
          />

          <div className="md:hidden">
            <PortfolioListCard
              project={mobileProject}
              onOpen={openProject}
              compact
            />

            <div className="mt-4 flex items-center justify-between gap-4">
              <div className="text-sm text-white/45">
                {mobileIndex + 1} / {portfolio.length}
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={goPrevMobileProject}
                  disabled={isMobileFirst}
                  aria-label="Proiect anterior"
                  className={`flex h-10 w-10 items-center justify-center rounded-full border transition ${
                    isMobileFirst
                      ? "cursor-not-allowed border-white/5 bg-white/[0.02] text-white/20"
                      : "border-white/10 bg-white/[0.04] text-white/70 hover:bg-white hover:text-black"
                  }`}
                >
                  <ChevronLeft size={18} />
                </button>

                <button
                  type="button"
                  onClick={goNextMobileProject}
                  disabled={isMobileLast}
                  aria-label="Proiect următor"
                  className={`flex h-10 w-10 items-center justify-center rounded-full border transition ${
                    isMobileLast
                      ? "cursor-not-allowed border-white/5 bg-white/[0.02] text-white/20"
                      : "border-white/10 bg-white/[0.04] text-white/70 hover:bg-white hover:text-black"
                  }`}
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>

          <div className="hidden gap-5 md:grid md:grid-cols-2 lg:grid-cols-3">
            {portfolio.map((project) => (
              <PortfolioListCard
                key={project.id}
                project={project}
                onOpen={openProject}
              />
            ))}
          </div>
        </div>
      </AnimatedSection>

      <AnimatePresence mode="wait">
        {selectedProject && (
          <PortfolioProjectModal
            key={selectedProject.id}
            project={selectedProject}
            onClose={closeProject}
            onNext={goNextProject}
            onPrev={goPrevProject}
            onOpenContact={onOpenContact}
          />
        )}
      </AnimatePresence>
    </>
  );
}

export default Portfolio;
