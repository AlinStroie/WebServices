import AnimatedSection from "./AnimatedSection";
import SectionHeader from "./SectionHeader";
import { processSteps } from "../data/process";

function Process() {
  return (
    <AnimatedSection id="proces" className="px-5 py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Proces"
          title="De la idee la site publicat, într-un proces simplu."
          text="Lucrăm etapizat, ca să fie clar ce construim și de ce."
        />

        <div className="relative">
          <div className="absolute left-6 top-0 hidden h-full w-px bg-white/10 md:block" />

          <div className="grid gap-5">
            {processSteps.map((step, index) => (
              <div
                key={step.title}
                className="glass relative rounded-[2rem] p-7 md:ml-16"
              >
                <div className="absolute -left-[5.2rem] top-7 hidden h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-black text-white md:flex">
                  {String(index + 1).padStart(2, "0")}
                </div>

                <p className="mb-4 text-sm text-white/35 md:hidden">
                  {String(index + 1).padStart(2, "0")}
                </p>

                <h3 className="text-2xl font-semibold tracking-[-0.03em]">
                  {step.title}
                </h3>

                <p className="mt-3 max-w-3xl leading-7 text-white/50">
                  {step.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}

export default Process;