import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

function CTA({ onOpenContact }) {
  return (
    <section className="px-5 py-20 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{
          duration: 0.6,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] border border-white/10 bg-white text-black"
      >
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute right-[-8rem] top-[-8rem] h-80 w-80 rounded-full bg-black/10 blur-[100px]" />
          <div className="absolute bottom-[-10rem] left-1/3 h-96 w-96 rounded-full bg-black/[0.06] blur-[120px]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(0,0,0,0.08),transparent_34%)]" />
        </div>

        <div className="relative grid gap-10 px-7 py-10 md:px-12 md:py-14 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-black/10 bg-black/[0.04] px-4 py-2 text-xs font-medium uppercase tracking-[0.24em] text-black/45">
              <Sparkles size={14} />
              Claritate înainte de ofertă
            </div>

            <h2 className="max-w-3xl text-4xl font-semibold leading-[0.98] tracking-[-0.06em] md:text-6xl">
              Nu știi ce variantă ți se potrivește?
            </h2>

            <p className="mt-6 max-w-2xl text-base leading-8 text-black/55 md:text-lg">
              Spune-mi câteva detalii despre proiect, iar eu îți recomand
              structura potrivită, pachetul corect și pașii necesari pentru
              lansare.
            </p>
          </div>

          <div className="flex flex-col gap-4 lg:items-end">
            <button
              type="button"
              onClick={onOpenContact}
              className="group inline-flex w-full items-center justify-center gap-3 rounded-full bg-black px-7 py-4 font-semibold text-white transition hover:scale-[1.02] hover:bg-black/90 sm:w-auto"
            >
              Cere recomandare
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-black transition group-hover:translate-x-1">
                <ArrowRight size={16} />
              </span>
            </button>

            <p className="max-w-xs text-center text-sm leading-6 text-black/40 lg:text-right">
              Recomandarea pornește de la obiectiv, buget și nivelul actual al
              afacerii.
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

export default CTA;