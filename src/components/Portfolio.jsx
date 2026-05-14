import AnimatedSection from "./AnimatedSection";
import SectionHeader from "./SectionHeader";
import { portfolio } from "../data/portfolio";

function Portfolio() {
  return (
    <AnimatedSection id="portofoliu" className="px-5 py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Showcase"
          title="Proiecte concept pentru industrii diferite."
          text="Carduri demo care pot fi înlocuite ușor cu proiecte reale când apar primii clienți."
        />

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {portfolio.map((project, index) => (
            <article
              key={project.title}
              className={`group overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.035] ${
                index === 0 ? "md:col-span-2" : ""
              }`}
            >
              <div className={`h-64 ${project.gradient} p-5`}>
                <div className="h-full rounded-[1.5rem] border border-white/20 bg-black/25 p-5 backdrop-blur-xl">
                  <div className="mb-16 flex gap-2">
                    <span className="h-3 w-3 rounded-full bg-white/40" />
                    <span className="h-3 w-3 rounded-full bg-white/25" />
                    <span className="h-3 w-3 rounded-full bg-white/20" />
                  </div>

                  <div className="space-y-3">
                    <div className="h-5 w-2/3 rounded-full bg-white/45" />
                    <div className="h-3 w-full rounded-full bg-white/20" />
                    <div className="h-3 w-4/5 rounded-full bg-white/20" />
                  </div>
                </div>
              </div>

              <div className="p-7">
                <p className="mb-3 text-sm text-white/40">{project.category}</p>
                <h3 className="text-2xl font-semibold tracking-[-0.03em]">
                  {project.title}
                </h3>
                <p className="mt-3 leading-7 text-white/50">{project.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}

export default Portfolio;