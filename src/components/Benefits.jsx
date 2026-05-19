import AnimatedSection from "./AnimatedSection";
import SectionHeader from "./SectionHeader";
import { benefits } from "../data/benefits";

function Benefits() {
  return (
    <AnimatedSection className="px-5 py-14 md:py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Beneficii"
          title="Un site clar, rapid și construit cu atenție la detalii."
          text="Fiecare secțiune este gândită pentru imagine, încredere și conversie."
        />

        <div
          className="mobile-snap-row md:mx-0 md:grid md:grid-cols-2 md:gap-4 md:overflow-visible md:p-0 lg:grid-cols-3"
          aria-label="Beneficii principale"
        >
          {benefits.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="mobile-snap-card glass group rounded-[1.35rem] p-5 transition duration-300 hover:-translate-y-1 hover:bg-white/[0.07] md:flex-auto md:rounded-[1.7rem] md:p-7"
              >
                <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-black transition group-hover:scale-105 md:mb-7 md:h-12 md:w-12">
                  <Icon size={20} className="md:h-[22px] md:w-[22px]" />
                </div>

                <h3 className="text-lg font-semibold tracking-[-0.02em] md:text-xl">
                  {item.title}
                </h3>

                <p className="mt-3 mobile-line-clamp-3 text-sm leading-6 text-white/58 md:text-base md:leading-7">
                  {item.text}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </AnimatedSection>
  );
}

export default Benefits;
