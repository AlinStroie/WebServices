import AnimatedSection from "./AnimatedSection";
import { ArrowRight } from "lucide-react";

function CTA({ onOpenContact }) {
  return (
    <AnimatedSection className="px-5 py-24 lg:px-8">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] border border-white/10 bg-white p-8 text-black md:p-14">
        <div className="grid items-center gap-8 lg:grid-cols-[1fr_auto]">
          <div>
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-black/45">
              Start project
            </p>

            <h2 className="max-w-3xl text-4xl font-semibold tracking-[-0.05em] md:text-6xl">
              Ai nevoie de un site care să arate profesionist?
            </h2>
          </div>

          <button
            type="button"
            onClick={onOpenContact}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-black px-8 py-4 font-semibold text-white transition hover:scale-[1.03] hover:bg-black/85"
          >
            Hai să discutăm <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </AnimatedSection>
  );
}

export default CTA;