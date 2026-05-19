import { ArrowUpRight } from "lucide-react";

import AnimatedSection from "./AnimatedSection";
import SectionHeader from "./SectionHeader";
import { services } from "../data/services";

function Services() {
  return (
    <AnimatedSection id="servicii" className="px-5 py-14 md:py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Servicii"
          title="Tot ce ai nevoie pentru o prezență online profesionistă."
          text="Servicii flexibile pentru afaceri locale, freelanceri, cabinete, saloane, restaurante și branduri personale."
        />

        <div
          className="mobile-snap-row md:mx-0 md:grid md:grid-cols-2 md:gap-5 md:overflow-visible md:p-0 lg:grid-cols-3"
          aria-label="Servicii disponibile"
        >
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <div
                key={service.title}
                className={`mobile-snap-card-wide group rounded-[1.45rem] border border-white/10 bg-white/[0.035] p-5 transition duration-300 hover:-translate-y-1 hover:bg-white/[0.07] md:flex-auto md:rounded-[2rem] md:p-7 ${
                  service.wide ? "lg:col-span-2" : ""
                }`}
              >
                <div className="mb-5 flex items-center justify-between md:mb-10">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-black md:h-12 md:w-12">
                    <Icon size={20} className="md:h-[22px] md:w-[22px]" />
                  </div>

                  <ArrowUpRight
                    size={20}
                    className="text-white/35 transition group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-white md:h-[22px] md:w-[22px]"
                  />
                </div>

                <h3 className="text-xl font-semibold tracking-[-0.03em] md:text-2xl">
                  {service.title}
                </h3>

                <p className="mt-3 mobile-line-clamp-3 max-w-xl text-sm leading-6 text-white/58 md:mt-4 md:text-base md:leading-7">
                  {service.text}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </AnimatedSection>
  );
}

export default Services;
