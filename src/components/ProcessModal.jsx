import { X, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function ProcessPreview({ type }) {
  if (type === "brief") {
    return (
      <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-5">
        <p className="mb-5 text-sm text-white/35">Project Brief</p>
        <div className="space-y-3">
          <div className="flex justify-between rounded-xl bg-white/[0.05] px-4 py-3">
            <span className="text-white/40">Goal</span>
            <span className="text-white">More leads</span>
          </div>
          <div className="flex justify-between rounded-xl bg-white/[0.05] px-4 py-3">
            <span className="text-white/40">Target</span>
            <span className="text-white">Local business</span>
          </div>
          <div className="flex justify-between rounded-xl bg-white/[0.05] px-4 py-3">
            <span className="text-white/40">Style</span>
            <span className="text-white">Premium dark</span>
          </div>
        </div>
      </div>
    );
  }

  if (type === "sitemap") {
    return (
      <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-5">
        <p className="mb-5 text-sm text-white/35">Sitemap</p>
        <div className="space-y-3 text-sm text-white/65">
          <div className="rounded-xl bg-white/[0.06] p-3">Home</div>
          <div className="ml-5 rounded-xl bg-white/[0.04] p-3">Servicii</div>
          <div className="ml-5 rounded-xl bg-white/[0.04] p-3">Portofoliu</div>
          <div className="ml-5 rounded-xl bg-white/[0.04] p-3">Prețuri</div>
          <div className="ml-5 rounded-xl bg-white/[0.04] p-3">Contact</div>
        </div>
      </div>
    );
  }

  if (type === "design") {
    return (
      <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-5">
        <p className="mb-5 text-sm text-white/35">Design System</p>
        <div className="mb-5 grid grid-cols-4 gap-3">
          <span className="h-12 rounded-xl bg-white" />
          <span className="h-12 rounded-xl bg-white/50" />
          <span className="h-12 rounded-xl bg-white/20" />
          <span className="h-12 rounded-xl bg-white/10" />
        </div>
        <div className="space-y-3">
          <div className="h-5 w-4/5 rounded-full bg-white/30" />
          <div className="h-3 w-full rounded-full bg-white/15" />
          <div className="h-3 w-2/3 rounded-full bg-white/15" />
        </div>
      </div>
    );
  }

  if (type === "code") {
    return (
      <div className="rounded-[1.5rem] border border-white/10 bg-[#050505] p-5 font-mono text-sm">
        <p className="mb-5 text-white/35">Code Preview</p>
        <div className="space-y-3 text-white/60">
          <p>
            <span className="text-white/30">&lt;</span>Hero{" "}
            <span className="text-white/30">/&gt;</span>
          </p>
          <p>
            <span className="text-white/30">&lt;</span>Services{" "}
            <span className="text-white/30">/&gt;</span>
          </p>
          <p>
            <span className="text-white/30">&lt;</span>ResponsiveLayout{" "}
            <span className="text-white/30">/&gt;</span>
          </p>
          <p className="text-white">npm run build</p>
        </div>
      </div>
    );
  }

  if (type === "checklist") {
    return (
      <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-5">
        <p className="mb-5 text-sm text-white/35">Launch Checklist</p>
        <div className="space-y-3">
          {["Mobile responsive", "Formular verificat", "Linkuri corecte", "Build final"].map(
            (item) => (
              <div key={item} className="flex items-center gap-3 rounded-xl bg-white/[0.05] px-4 py-3">
                <Check size={17} className="text-white" />
                <span className="text-white/65">{item}</span>
              </div>
            )
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-5">
      <p className="mb-5 text-sm text-white/35">Support Dashboard</p>
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-xl bg-white/[0.06] p-4">
          <p className="text-2xl font-semibold">12</p>
          <p className="mt-1 text-sm text-white/40">Updates</p>
        </div>
        <div className="rounded-xl bg-white/[0.06] p-4">
          <p className="text-2xl font-semibold">24h</p>
          <p className="mt-1 text-sm text-white/40">Response</p>
        </div>
        <div className="col-span-2 rounded-xl bg-white/[0.06] p-4">
          <p className="text-sm text-white/40">Maintenance</p>
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
            <div className="h-full w-[78%] rounded-full bg-white" />
          </div>
        </div>
      </div>
    </div>
  );
}

function ProcessModal({ step, onClose }) {
  return (
    <AnimatePresence>
      {step && (
        <motion.div
          className="fixed inset-0 z-[210] flex items-center justify-center px-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            onClick={onClose}
            className="absolute inset-0 bg-black/75 backdrop-blur-xl"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 24 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="relative max-h-[88vh] w-full max-w-5xl overflow-y-auto rounded-[2rem] border border-white/10 bg-[#080808] p-7 shadow-2xl md:p-9"
          >
            <button
              onClick={onClose}
              className="absolute right-5 top-5 rounded-full border border-white/10 bg-white/[0.04] p-2 text-white/60 transition hover:bg-white/10 hover:text-white"
              aria-label="Închide"
            >
              <X size={20} />
            </button>

            <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
              <div>
                <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-white/35">
                  {step.number} — {step.tag}
                </p>

                <h2 className="max-w-2xl text-3xl font-semibold tracking-[-0.04em] text-white md:text-5xl">
                  {step.title}
                </h2>

                <p className="mt-6 leading-8 text-white/55">
                  {step.details.intro}
                </p>

                <div className="mt-8 space-y-3">
                  {step.details.points.map((point) => (
                    <div key={point} className="flex gap-3">
                      <Check size={18} className="mt-1 shrink-0 text-white" />
                      <span className="text-white/60">{point}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-8 rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-5">
                  <p className="text-sm uppercase tracking-[0.25em] text-white/35">
                    Rezultat
                  </p>
                  <p className="mt-3 leading-7 text-white/65">
                    {step.details.result}
                  </p>
                </div>
              </div>

              <div className="lg:pt-16">
                <ProcessPreview type={step.previewType} />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default ProcessModal;