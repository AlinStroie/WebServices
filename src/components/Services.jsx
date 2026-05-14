import AnimatedSection from "./AnimatedSection";
import SectionHeader from "./SectionHeader";
import { services } from "../data/services";
import { ArrowUpRight } from "lucide-react";

function Services() {
  return (
    <AnimatedSection id="servicii" className="px-5 py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Servicii"
          title="Tot ce ai nevoie pentru o prezență online profesionistă."
          text="Servicii flexibile pentru afaceri locale, freelanceri, cabinete, saloane, restaurante și branduri personale."
        />

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <div
                key={service.title}
                className={`group rounded-[2rem] border border-white/10 bg-white/[0.035] p-7 transition duration-300 hover:-translate-y-1 hover:bg-white/[0.07] ${
                  index === 0 ? "lg:col-span-2" : ""
                }`}
              >
                <div className="mb-10 flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-black">
                    <Icon size={22} />
                  </div>

                  <ArrowUpRight
                    size={22}
                    className="text-white/30 transition group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-white"
                  />
                </div>

                <h3 className="text-2xl font-semibold tracking-[-0.03em]">
                  {service.title}
                </h3>

                <p className="mt-4 max-w-xl leading-7 text-white/50">
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