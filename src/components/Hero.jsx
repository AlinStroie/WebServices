import { motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  Gauge,
  LayoutGrid,
  MousePointerClick,
  Smartphone,
} from "lucide-react";

function Hero({ onOpenContact }) {
  return (
    <section
      id="home"
      className="relative overflow-hidden px-5 pb-20 pt-32 md:pt-40 lg:px-8"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-8 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-white/[0.05] blur-[140px]" />
        <div className="absolute right-[-10rem] top-28 h-[26rem] w-[26rem] rounded-full bg-white/[0.025] blur-[120px]" />
        <div className="absolute left-[-10rem] bottom-0 h-[24rem] w-[24rem] rounded-full bg-white/[0.02] blur-[110px]" />
      </div>

      <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[0.94fr_1.06fr]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.72,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white/55 backdrop-blur-xl">
            <span className="h-2 w-2 rounded-full bg-white/70" />
            Web design / website development
          </div>

          <h1 className="max-w-4xl text-balance text-5xl font-semibold leading-[0.96] tracking-[-0.065em] text-white md:text-7xl lg:text-8xl">
            Site-uri clare, rapide și bine structurate.
          </h1>

          <p className="mt-7 max-w-2xl text-lg leading-8 text-white/55 md:text-xl">
            Realizăm website-uri de prezentare, landing page-uri și portofolii
            pentru afaceri care au nevoie de o prezență online modernă, coerentă
            și ușor de înțeles.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a
              href="#portofoliu"
              className="group inline-flex items-center justify-center gap-3 rounded-full bg-white px-7 py-4 font-semibold text-black transition hover:scale-[1.03] hover:bg-white/90"
            >
              Vezi exemple
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-black text-white transition group-hover:translate-x-1">
                <ArrowRight size={16} />
              </span>
            </a>

            <button
              type="button"
              onClick={onOpenContact}
              className="group inline-flex items-center justify-center gap-3 rounded-full border border-white/12 bg-white/[0.035] px-7 py-4 font-semibold text-white transition hover:bg-white/[0.08]"
            >
              Cere recomandare
              <MousePointerClick size={18} className="text-white/60" />
            </button>
          </div>

          <div className="mt-11 grid max-w-2xl gap-3 sm:grid-cols-3">
            <SmallPoint
              icon={<LayoutGrid size={16} />}
              title="Structură clară"
            />
            <SmallPoint
              icon={<Smartphone size={16} />}
              title="Responsive"
            />
            <SmallPoint icon={<Gauge size={16} />} title="SEO basic" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.965, y: 22 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{
            duration: 0.82,
            delay: 0.12,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="relative"
        >
          <div className="pointer-events-none absolute -inset-8 -z-10 rounded-[3rem] bg-white/[0.045] blur-[85px]" />

          <div className="relative overflow-hidden rounded-[2.25rem] border border-white/10 bg-[#0b0c10]/80 p-3 shadow-[0_28px_120px_rgba(0,0,0,0.65)] backdrop-blur-2xl">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(210,220,235,0.14),transparent_30%),radial-gradient(circle_at_85%_75%,rgba(150,170,195,0.12),transparent_28%)]" />

            <div className="relative overflow-hidden rounded-[1.8rem] border border-white/10 bg-[#0e1015]">
              <div className="flex items-center justify-between border-b border-white/10 bg-[#11141b] px-5 py-4">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-[#5f6672]" />
                  <span className="h-3 w-3 rounded-full bg-[#4d5460]" />
                  <span className="h-3 w-3 rounded-full bg-[#404754]" />
                </div>

                <span className="hidden rounded-full border border-white/10 bg-[#181b22] px-4 py-1.5 text-xs text-[#b1bac7] sm:block">
                  project preview
                </span>
              </div>

              <div className="grid gap-4 p-5 md:p-6">
                <div className="rounded-[1.7rem] border border-white/10 bg-[linear-gradient(135deg,rgba(214,223,234,0.16),rgba(145,159,178,0.08))] p-6">
                  <div className="flex items-start justify-between gap-5">
                    <div className="max-w-md">
                      <p className="text-xs uppercase tracking-[0.28em] text-[#cad3df]/60">
                        Homepage overview
                      </p>

                      <h3 className="mt-5 max-w-sm text-3xl font-semibold leading-[1.04] tracking-[-0.045em] text-[#eef3f8]">
                        O structură clară pentru un site care se înțelege repede.
                      </h3>

                      <div className="mt-5 space-y-2">
                        <div className="h-2.5 w-52 rounded-full bg-[#dbe5f3]/30" />
                        <div className="h-2.5 w-72 rounded-full bg-[#dbe5f3]/18" />
                      </div>

                      <div className="mt-7 flex flex-wrap gap-3">
                        <span className="rounded-full bg-[#ecf1f7] px-4 py-2 text-sm font-semibold text-[#11151c]">
                          Cere ofertă
                        </span>
                        <span className="rounded-full border border-[#dbe5f3]/15 bg-[#141821] px-4 py-2 text-sm text-[#c0cad7]">
                          Vezi servicii
                        </span>
                      </div>
                    </div>

                    <div className="hidden h-14 w-14 shrink-0 rounded-full bg-[#eef3f8] md:block" />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-[0.9fr_1.1fr]">
                  <div className="rounded-[1.5rem] border border-white/10 bg-[#131720] p-5">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#e8edf5] text-[#11151c]">
                      <LayoutGrid size={18} />
                    </div>

                    <p className="mt-8 text-sm text-[#9ca7b6]">
                      Structură modulară
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      <Tag>pagini clare</Tag>
                      <Tag>secțiuni logice</Tag>
                      <Tag>CTA-uri</Tag>
                    </div>
                  </div>

                  <div className="rounded-[1.5rem] border border-white/10 bg-[#131720] p-5">
                    <div className="mb-5 flex items-center justify-between">
                      <span className="text-sm text-[#9ca7b6]">Status</span>

                      <span className="rounded-full bg-[#e8edf5] px-3 py-1 text-xs font-semibold text-[#11151c]">
                        ready
                      </span>
                    </div>

                    <div className="space-y-3">
                      <StatusItem text="layout responsive" />
                      <StatusItem text="formular contact" />
                      <StatusItem text="SEO de bază" />
                    </div>
                  </div>
                </div>

                <div className="rounded-[1.5rem] border border-white/10 bg-[#131720] p-5">
                  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                      <p className="text-sm text-[#9ca7b6]">Scor estimat</p>
                      <p className="mt-1 text-2xl font-semibold tracking-[-0.04em] text-[#eef3f8]">
                        94%
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <MetricChip label="claritate" value="high" />
                      <MetricChip label="viteză" value="good" />
                      <MetricChip label="mobil" value="ready" />
                    </div>
                  </div>

                  <div className="mt-5 h-2 overflow-hidden rounded-full bg-[#202632]">
                    <motion.div
                      initial={{ width: "0%" }}
                      animate={{ width: "94%" }}
                      transition={{
                        duration: 1.15,
                        delay: 0.45,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="h-full rounded-full bg-[#edf2f8]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function SmallPoint({ icon, title }) {
  return (
    <div className="flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.035] px-4 py-3 text-sm text-white/65 backdrop-blur-xl">
      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-black">
        {icon}
      </span>
      {title}
    </div>
  );
}

function Tag({ children }) {
  return (
    <span className="rounded-full border border-white/10 bg-[#181d26] px-3 py-1.5 text-xs text-[#c3ccd8]">
      {children}
    </span>
  );
}

function StatusItem({ text }) {
  return (
    <div className="flex items-center gap-3">
      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#202632] text-[#d6dee8]">
        <Check size={13} />
      </span>

      <span className="text-sm text-[#c1cad6]">{text}</span>
    </div>
  );
}

function MetricChip({ label, value }) {
  return (
    <div className="rounded-full border border-white/10 bg-[#181d26] px-3 py-1.5 text-xs text-[#c3ccd8]">
      <span className="text-[#8f9aab]">{label}</span>
      <span className="mx-1.5 text-white/20">•</span>
      <span className="text-[#eef3f8]">{value}</span>
    </div>
  );
}

export default Hero;