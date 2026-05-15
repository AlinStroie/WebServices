import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { siteConfig } from "../data/siteConfig";

function Hero({ onOpenContact }) {
  return (
    <section id="home" className="relative overflow-hidden px-5 pb-20 pt-32 md:pt-40 lg:px-8">
      <div className="absolute inset-0 -z-10 soft-grid opacity-60" />
      <div className="absolute left-1/2 top-20 -z-10 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-white/10 blur-[120px]" />

      <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
        <motion.div
          initial={{ opacity: 0, y: 34 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: "easeOut" }}
        >
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white/65">
            <Sparkles size={16} />
            {siteConfig.hero.eyebrow}
          </div>

          <h1 className="text-balance text-5xl font-semibold leading-[0.95] tracking-[-0.06em] text-white md:text-7xl lg:text-8xl">
            {siteConfig.hero.title}
          </h1>

          <p className="mt-7 max-w-2xl text-lg leading-8 text-white/55 md:text-xl">
            {siteConfig.hero.subtitle}
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a
              href="#servicii"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-4 font-semibold text-black transition hover:scale-[1.03] hover:bg-white/90"
            >
              {siteConfig.hero.primaryButton} <ArrowRight size={18} />
            </a>

            <button
              type="button"
              onClick={onOpenContact}
              className="inline-flex items-center justify-center rounded-full border border-white/12 bg-white/[0.03] px-7 py-4 font-semibold text-white transition hover:bg-white/[0.08]"
            >
              {siteConfig.hero.secondaryButton}
            </button>
          </div>

          <div className="mt-12 grid max-w-xl grid-cols-3 gap-5 border-t border-white/10 pt-8">
            <div>
              <p className="text-2xl font-semibold">20+</p>
              <p className="mt-1 text-sm text-white/45">secțiuni reusable</p>
            </div>
            <div>
              <p className="text-2xl font-semibold">100%</p>
              <p className="mt-1 text-sm text-white/45">responsive</p>
            </div>
            <div>
              <p className="text-2xl font-semibold">SEO</p>
              <p className="mt-1 text-sm text-white/45">structură basic</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
          className="relative"
        >
          <div className="absolute -inset-6 -z-10 rounded-[3rem] bg-white/10 blur-3xl" />

          <div className="glass overflow-hidden rounded-[2rem] p-4 shadow-2xl">
            <div className="rounded-[1.5rem] border border-white/10 bg-[#080808] p-4">
              <div className="mb-5 flex items-center justify-between">
                <div className="flex gap-2">
                  <span className="h-3 w-3 rounded-full bg-white/20" />
                  <span className="h-3 w-3 rounded-full bg-white/20" />
                  <span className="h-3 w-3 rounded-full bg-white/20" />
                </div>
                <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/45">
                  live preview
                </span>
              </div>

              <div className="grid gap-4">
                <div className="rounded-[1.4rem] border border-white/10 bg-gradient-to-br from-white/16 to-white/[0.02] p-6">
                  <p className="mb-14 text-sm text-white/45">Premium landing page</p>
                  <h3 className="max-w-sm text-3xl font-semibold tracking-[-0.04em]">
                    Digital presence for modern brands.
                  </h3>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-[1.4rem] border border-white/10 bg-white/[0.04] p-5">
                    <div className="mb-10 h-16 rounded-2xl bg-white/10" />
                    <p className="text-sm text-white/50">Portfolio layout</p>
                  </div>

                  <div className="rounded-[1.4rem] border border-white/10 bg-white/[0.04] p-5">
                    <div className="mb-10 grid grid-cols-2 gap-2">
                      <span className="h-7 rounded-lg bg-white/10" />
                      <span className="h-7 rounded-lg bg-white/20" />
                      <span className="h-7 rounded-lg bg-white/20" />
                      <span className="h-7 rounded-lg bg-white/10" />
                    </div>
                    <p className="text-sm text-white/50">Service grid</p>
                  </div>
                </div>

                <div className="rounded-[1.4rem] border border-white/10 bg-white/[0.04] p-5">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-white/45">Conversion score</span>
                    <span className="text-sm text-white">94%</span>
                  </div>
                  <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
                    <div className="h-full w-[94%] rounded-full bg-white" />
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

export default Hero;