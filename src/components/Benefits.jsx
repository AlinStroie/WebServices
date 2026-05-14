import AnimatedSection from "./AnimatedSection";
import SectionHeader from "./SectionHeader";
import { benefits } from "../data/benefits";

function Benefits() {
  return (
    <AnimatedSection className="px-5 py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Beneficii"
          title="Un site clar, rapid și construit cu atenție la detalii."
          text="Fiecare secțiune este gândită pentru imagine, încredere și conversie."
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="glass group rounded-[1.7rem] p-7 transition duration-300 hover:-translate-y-1 hover:bg-white/[0.07]"
              >
                <div className="mb-7 flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-black transition group-hover:scale-105">
                  <Icon size={22} />
                </div>

                <h3 className="text-xl font-semibold tracking-[-0.02em]">
                  {item.title}
                </h3>

                <p className="mt-3 leading-7 text-white/50">{item.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </AnimatedSection>
  );
}

export default Benefits;