import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";

import AnimatedSection from "./AnimatedSection";
import SectionHeader from "./SectionHeader";
import PortfolioBrowserFrame from "./PortfolioBrowserFrame";
import PortfolioMockupRenderer from "./mockups/PortfolioMockupRenderer";
import { portfolio } from "../data/portfolio";
import OverlayBackdrop from "./OverlayBackdrop";

function PortfolioCardPreview({ project }) {
  return (
    <div className="relative h-64 overflow-hidden rounded-[1.7rem] border border-white/10 bg-black/50 p-3">
      <div
        className={`absolute inset-0 bg-gradient-to-br ${
          project.theme?.glowFrom || "from-white/20"
        } ${
          project.theme?.glowVia || "via-white/10"
        } to-transparent opacity-70`}
      />

      <div
        className={`absolute -right-16 -top-16 h-44 w-44 rounded-full blur-3xl transition-transform duration-500 group-hover:scale-110 ${
          project.theme?.glowAccentOne || "bg-white/10"
        }`}
      />

      <div
        className={`absolute -bottom-16 -left-16 h-44 w-44 rounded-full blur-3xl transition-transform duration-500 group-hover:scale-110 ${
          project.theme?.glowAccentTwo || "bg-white/10"
        }`}
      />

      <div className="relative h-full transition-transform duration-500 group-hover:-translate-y-1 group-hover:scale-[1.03]">
        <PortfolioBrowserFrame project={project} size="card" />
      </div>
    </div>
  );
}

function PortfolioProjectModal({ project, onClose }) {
  return (
    <motion.div
      className="fixed inset-0 z-[260] flex items-center justify-center px-5"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 1 }}
    >
      {/* Layer întunecare */}
      <motion.div
        onClick={onClose}
        className="absolute inset-0 bg-black/60"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{
          duration: 0.45,
          ease: [0.22, 1, 0.36, 1],
        }}
      />

      {/* Layer blur smooth */}
      <motion.div
        onClick={onClose}
        className="absolute inset-0 will-change-[opacity,backdrop-filter] [contain:paint]"
        initial={{
          opacity: 0,
          backdropFilter: "blur(0px)",
          WebkitBackdropFilter: "blur(0px)",
        }}
        animate={{
          opacity: 1,
          backdropFilter: "blur(7px)",
          WebkitBackdropFilter: "blur(7px)",
        }}
        exit={{
          opacity: 0,
          backdropFilter: "blur(0px)",
          WebkitBackdropFilter: "blur(0px)",
        }}
        transition={{
          duration: 0.9,
          ease: [0.22, 1, 0.36, 1],
        }}
      />

      <motion.div
        initial={{
          opacity: 0,
          scale: 0.985,
          y: 14,
        }}
        animate={{
          opacity: 1,
          scale: 1,
          y: 0,
        }}
        exit={{
          opacity: 0,
          scale: 0.985,
          y: 10,
        }}
        transition={{
          duration: 0.42,
          delay: 0.14,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="relative max-h-[90vh] w-full max-w-6xl overflow-hidden rounded-[2rem] border border-white/10 bg-[#080808] shadow-[0_24px_80px_rgba(0,0,0,0.55)] will-change-transform"
      >
        <div className="flex h-12 items-center justify-between border-b border-white/10 bg-white/[0.04] px-5">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-red-400" />
            <span className="h-3 w-3 rounded-full bg-yellow-400" />
            <span className="h-3 w-3 rounded-full bg-green-400" />

            <div className="ml-4 hidden rounded-full border border-white/10 bg-black/30 px-4 py-1 text-xs text-white/40 sm:block">
              preview / {project.title.toLowerCase()}
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="group rounded-full border border-white/10 bg-white/[0.04] p-2 text-white/60 transition hover:bg-white hover:text-black"
            aria-label="Închide preview"
          >
            <X size={20} className="transition group-hover:rotate-90" />
          </button>
        </div>

        <div className="grid max-h-[calc(90vh-3rem)] overflow-y-auto lg:grid-cols-[0.72fr_1.28fr]">
          <div className="border-b border-white/10 p-7 lg:border-b-0 lg:border-r">
            <p className="text-sm uppercase tracking-[0.3em] text-white/35">
              {project.category}
            </p>

            <h2 className="mt-5 text-4xl font-semibold tracking-[-0.05em] text-white md:text-5xl">
              {project.title}
            </h2>

            <p className="mt-5 leading-8 text-white/55">{project.text}</p>

            <div className="mt-8 rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-5">
              <p className="text-sm uppercase tracking-[0.25em] text-white/30">
                Preview include
              </p>

              <ul className="mt-4 space-y-3 text-sm text-white/60">
                {project.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            </div>
          </div>

          <div
            className={`bg-gradient-to-br p-4 md:p-7 ${
              project.theme?.modalBg ||
              "from-white/10 via-white/5 to-transparent"
            }`}
          >
            <div className="h-[34rem] overflow-hidden rounded-[1.7rem] border border-white/10 bg-white shadow-2xl">
              <PortfolioMockupRenderer project={project} />
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function Portfolio({ onOverlayChange }) {
  const [selectedProject, setSelectedProject] = useState(null);

  function openProject(project) {
    setSelectedProject(project);
    onOverlayChange?.(true);
  }

  function closeProject() {
    setSelectedProject(null);
    onOverlayChange?.(false);
  }

  return (
    <>
      <AnimatedSection id="portofoliu" className="px-5 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Portofoliu"
            title="Exemple de proiecte pe care le putem construi."
            text="Mockup-uri orientative pentru afaceri locale, servicii, portofolii și magazine online simple."
          />

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {portfolio.map((project) => (
              <button
                key={project.id}
                type="button"
                onClick={() => openProject(project)}
                className="group rounded-[2rem] border border-white/10 bg-white/[0.035] p-4 text-left transition-transform duration-300 will-change-transform hover:-translate-y-2 hover:bg-white/[0.05]"
              >
                <PortfolioCardPreview project={project} />

                <div className="p-4">
                  <div className="mb-4 flex items-center justify-between gap-4">
                    <p className="text-sm text-white/40">
                      {project.category}
                    </p>

                    <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/45 transition group-hover:bg-white group-hover:text-black">
                      <ArrowUpRight size={18} />
                    </span>
                  </div>

                  <h3 className="text-2xl font-semibold tracking-[-0.03em] text-white">
                    {project.title}
                  </h3>

                  <p className="mt-3 leading-7 text-white/50">
                    {project.text}
                  </p>
                </div>
              </button>
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
          />
        )}
      </AnimatePresence>
    </>
  );
}

export default Portfolio;