import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";

import AnimatedSection from "./AnimatedSection";
import SectionHeader from "./SectionHeader";
import MedicalSiteMockup from "./MedicalSiteMockup";
import { portfolio } from "../data/portfolio";

function KinetoPortfolioPreview() {
  return (
    <div className="relative h-64 overflow-hidden rounded-[1.7rem] border border-white/10 bg-black/50 p-3">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/20 via-cyan-300/10 to-transparent opacity-80" />

      <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-emerald-400/20 blur-3xl transition duration-500 group-hover:scale-125" />
      <div className="absolute -bottom-16 -left-16 h-44 w-44 rounded-full bg-cyan-300/20 blur-3xl transition duration-500 group-hover:scale-125" />

      <div className="relative h-full transition duration-500 group-hover:scale-[1.05] group-hover:-translate-y-1">
        <div className="h-full overflow-hidden rounded-[1.5rem] border border-white/10 bg-white shadow-2xl">
          <div className="flex h-9 items-center gap-2 border-b border-slate-200 bg-slate-50 px-4">
            <span className="h-3 w-3 rounded-full bg-red-400" />
            <span className="h-3 w-3 rounded-full bg-yellow-400" />
            <span className="h-3 w-3 rounded-full bg-green-400" />
            <div className="ml-3 h-4 flex-1 rounded-full bg-slate-200" />
          </div>

          <div className="h-[calc(100%-2.25rem)]">
            <MedicalSiteMockup />
          </div>
        </div>
      </div>
    </div>
  );
}

function DefaultPortfolioPreview({ project }) {
  return (
    <div
      className={`relative h-64 overflow-hidden rounded-[1.7rem] border border-white/10 ${project.gradient}`}
    >
      <div className="absolute inset-0 bg-black/20" />

      <div className="absolute left-5 top-5 flex gap-2">
        <span className="h-3 w-3 rounded-full bg-red-400/80" />
        <span className="h-3 w-3 rounded-full bg-yellow-300/80" />
        <span className="h-3 w-3 rounded-full bg-green-400/80" />
      </div>

      <div className="absolute bottom-5 left-5 right-5 rounded-[1.3rem] border border-white/10 bg-black/35 p-5 backdrop-blur-md transition duration-500 group-hover:-translate-y-1">
        <div className="mb-4 h-3 w-2/3 rounded-full bg-white/30" />
        <div className="mb-2 h-2 w-full rounded-full bg-white/15" />
        <div className="h-2 w-1/2 rounded-full bg-white/15" />
      </div>
    </div>
  );
}

function PortfolioPreview({ project }) {
  if (project.title === "Cabinet kinetoterapie") {
    return <KinetoPortfolioPreview />;
  }

  return <DefaultPortfolioPreview project={project} />;
}

function PortfolioProjectModal({ project, onClose }) {
  if (!project) return null;

  const isKineto = project.title === "Cabinet kinetoterapie";

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[260] flex items-center justify-center px-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            onClick={onClose}
            className="absolute inset-0 bg-black/75"
            initial={{
              opacity: 0,
              backdropFilter: "blur(0px)",
              WebkitBackdropFilter: "blur(0px)",
            }}
            animate={{
              opacity: 1,
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
            }}
            exit={{
              opacity: 0,
              backdropFilter: "blur(0px)",
              WebkitBackdropFilter: "blur(0px)",
            }}
            transition={{
              duration: 0.3,
              ease: "easeOut",
            }}
          />

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.94,
              y: 28,
              filter: "blur(8px)",
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
              filter: "blur(0px)",
            }}
            exit={{
              opacity: 0,
              scale: 0.96,
              y: 18,
              filter: "blur(6px)",
            }}
            transition={{
              duration: 0.34,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="relative max-h-[90vh] w-full max-w-6xl overflow-hidden rounded-[2rem] border border-white/10 bg-[#080808] shadow-2xl"
          >
            <div className="flex h-12 items-center justify-between border-b border-white/10 bg-white/[0.04] px-5">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-red-400" />
                <span className="h-3 w-3 rounded-full bg-yellow-400" />
                <span className="h-3 w-3 rounded-full bg-green-400" />

                <div className="ml-4 hidden flex-1 rounded-full border border-white/10 bg-black/30 px-4 py-1 text-xs text-white/40 sm:block">
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
                    <li>Design responsive pentru mobil și desktop</li>
                    <li>Secțiuni pentru servicii și beneficii</li>
                    <li>Call-to-action pentru programări sau contact</li>
                    <li>Structură orientată spre încredere și conversie</li>
                  </ul>
                </div>
              </div>

              <div className="bg-gradient-to-br from-emerald-400/10 via-cyan-300/5 to-transparent p-4 md:p-7">
                {isKineto ? (
                  <div className="h-[34rem] overflow-hidden rounded-[1.7rem] border border-white/10 bg-white shadow-2xl">
                    <MedicalSiteMockup />
                  </div>
                ) : (
                  <div
                    className={`h-[34rem] rounded-[1.7rem] border border-white/10 ${project.gradient}`}
                  />
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Portfolio() {
  const [selectedProject, setSelectedProject] = useState(null);

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
                key={project.title}
                type="button"
                onClick={() => setSelectedProject(project)}
                className="group rounded-[2rem] border border-white/10 bg-white/[0.035] p-4 text-left transition duration-300 hover:-translate-y-2 hover:bg-white/[0.06] hover:shadow-[0_30px_90px_rgba(255,255,255,0.06)]"
              >
                <PortfolioPreview project={project} />

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

      <PortfolioProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </>
  );
}

export default Portfolio;