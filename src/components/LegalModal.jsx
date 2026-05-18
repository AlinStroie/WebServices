import { X, Check, Cookie, ShieldCheck, FileText, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { siteConfig } from "../data/siteConfig";
import OverlayBackdrop from "./OverlayBackdrop";

function getLegalData(type) {
  if (!type) return null;

  const legal = siteConfig.legal || {};

  const aliases = {
    privacy: ["privacy", "gdpr", "confidentialitate", "privacyPolicy"],
    gdpr: ["gdpr", "privacy", "confidentialitate", "privacyPolicy"],
    cookies: ["cookies", "cookie", "cookiePolicy"],
    cookie: ["cookies", "cookie", "cookiePolicy"],
    terms: ["terms", "termeni", "termsAndConditions"],
  };

  const possibleKeys = aliases[type] || [type];

  for (const key of possibleKeys) {
    if (legal[key]) {
      return legal[key];
    }
  }

  return null;
}

function getModalIcon(type) {
  if (type === "cookies" || type === "cookie") return Cookie;
  if (type === "privacy" || type === "gdpr") return ShieldCheck;
  return FileText;
}

function normalizeSections(data) {
  if (Array.isArray(data.sections)) {
    return data.sections;
  }

  if (Array.isArray(data.content)) {
    return [
      {
        label: "01",
        title: "Informații generale",
        content: data.content,
      },
    ];
  }

  return [];
}

function LegalModal({ type, onClose }) {
  const data = getLegalData(type);
  const Icon = getModalIcon(type);
  const sections = data ? normalizeSections(data) : [];
  const highlights = Array.isArray(data?.highlights) ? data.highlights : [];

  return (
    <AnimatePresence>
      {type && data && (
        <motion.div
          className="fixed inset-0 z-[999] flex items-center justify-center px-4 py-6"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 1 }}
        >
          <OverlayBackdrop
            onClick={onClose}
            blur={8}
            opacity={0.66}
            duration={0.65}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.965, y: 22 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.975, y: 16 }}
            transition={{
              duration: 0.42,
              delay: 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative flex max-h-[88vh] w-full max-w-5xl flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-[#070707]/95 shadow-[0_32px_120px_rgba(0,0,0,0.75)] backdrop-blur-2xl"
          >
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              <div className="absolute -right-28 -top-28 h-80 w-80 rounded-full bg-white/[0.07] blur-[120px]" />
              <div className="absolute -bottom-32 left-10 h-80 w-80 rounded-full bg-white/[0.035] blur-[130px]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.045),transparent_38%)]" />
            </div>

            <div className="relative border-b border-white/10 px-6 py-6 md:px-8">
              <div className="flex items-start justify-between gap-5">
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white text-black">
                    <Icon size={22} />
                  </div>

                  <div>
                    <p className="text-xs font-medium uppercase tracking-[0.3em] text-white/35">
                      {data.eyebrow || "Document legal"}
                    </p>

                    <h2 className="mt-3 max-w-2xl pr-8 text-3xl font-semibold tracking-[-0.045em] text-white md:text-5xl">
                      {data.title || "Informații legale"}
                    </h2>

                    {data.subtitle && (
                      <p className="mt-4 max-w-2xl text-sm leading-7 text-white/50">
                        {data.subtitle}
                      </p>
                    )}
                  </div>
                </div>

                <button
                  onClick={onClose}
                  className="group flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.045] text-white/60 transition hover:bg-white hover:text-black"
                  aria-label="Închide"
                  type="button"
                >
                  <X size={20} className="transition group-hover:rotate-90" />
                </button>
              </div>
            </div>

            <div className="legal-scroll relative overflow-y-auto px-6 py-6 md:px-8">
              <div className="grid gap-5 lg:grid-cols-[0.72fr_1.28fr]">
                <aside className="rounded-[1.6rem] border border-white/10 bg-white/[0.035] p-5">
                  <p className="text-xs uppercase tracking-[0.28em] text-white/30">
                    Pe scurt
                  </p>

                  {highlights.length > 0 ? (
                    <div className="mt-5 space-y-4">
                      {highlights.map((item) => (
                        <div key={item} className="flex gap-3">
                          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/[0.08] text-white/70">
                            <Check size={13} />
                          </span>

                          <p className="text-sm leading-6 text-white/55">
                            {item}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="mt-5 space-y-4">
                      <div className="flex gap-3">
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/[0.08] text-white/70">
                          <Check size={13} />
                        </span>
                        <p className="text-sm leading-6 text-white/55">
                          Datele sunt folosite doar pentru scopul pentru care au
                          fost transmise.
                        </p>
                      </div>

                      <div className="flex gap-3">
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/[0.08] text-white/70">
                          <Check size={13} />
                        </span>
                        <p className="text-sm leading-6 text-white/55">
                          Nu vindem și nu distribuim datele către terți în scopuri
                          comerciale.
                        </p>
                      </div>

                      <div className="flex gap-3">
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/[0.08] text-white/70">
                          <Check size={13} />
                        </span>
                        <p className="text-sm leading-6 text-white/55">
                          Poți solicita oricând informații despre datele trimise.
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="mt-6 rounded-[1.2rem] border border-white/10 bg-black/30 p-4">
                    <p className="text-sm font-medium text-white/60">
                      Ultima actualizare
                    </p>

                    <p className="mt-2 text-sm text-white/40">
                      {data.updatedAt || "Mai 2026"}
                    </p>
                  </div>
                </aside>

                <div className="space-y-4">
                  {sections.map((section, index) => (
                    <section
                      key={`${section.title}-${index}`}
                      className="rounded-[1.6rem] border border-white/10 bg-white/[0.035] p-5 md:p-6"
                    >
                      <p className="text-xs uppercase tracking-[0.25em] text-white/30">
                        {section.label || `0${index + 1}`}
                      </p>

                      <h3 className="mt-3 text-xl font-semibold tracking-[-0.03em] text-white md:text-2xl">
                        {section.title || "Detalii"}
                      </h3>

                      <div className="mt-4 space-y-3 text-sm leading-7 text-white/55 md:text-[15px]">
                        {(section.content || []).map((paragraph) => (
                          <p key={paragraph}>{paragraph}</p>
                        ))}
                      </div>

                      {Array.isArray(section.points) && (
                        <ul className="mt-5 grid gap-3">
                          {section.points.map((point) => (
                            <li key={point} className="flex gap-3">
                              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-white/55" />
                              <span className="text-sm leading-6 text-white/55">
                                {point}
                              </span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </section>
                  ))}
                </div>
              </div>
            </div>

            <div className="relative border-t border-white/10 px-6 py-4 md:px-8">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-white/35">
                  Pentru întrebări legate de date sau cookies, ne poți contacta
                  direct.
                </p>

                <button
                  onClick={onClose}
                  type="button"
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-white/90"
                >
                  Am înțeles
                  <ArrowRight
                    size={16}
                    className="transition group-hover:translate-x-1"
                  />
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default LegalModal;