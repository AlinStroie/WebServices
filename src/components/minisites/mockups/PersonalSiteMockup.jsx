import { ArrowRight, BriefcaseBusiness, Code2, Layers3, Mail, PenTool, Send, Sparkles } from "lucide-react";

function AndreiCrisanLogo() {
  return (
    <img
      src="/images/minisite/andrei-crisan-logo.png"
      alt="Andrei Crisan"
      className="h-12 w-auto object-contain md:h-14"
      draggable={false}
    />
  );
}

const DEFAULT_ITEMS = [
  { title: "Graphic Design", text: "Visual identity and creative presentation systems.", icon: "design" },
  { title: "Web Design", text: "Responsive interfaces with clear product structure.", icon: "web" },
  { title: "Frontend", text: "Modern implementation that is fast to maintain.", icon: "code" },
  { title: "Brand Assets", text: "Reusable assets for campaigns and social content.", icon: "brand" },
];

const DEFAULT_SKILLS = ["Figma", "React", "Tailwind", "UI/UX"];

const iconMap = {
  design: PenTool,
  web: Layers3,
  code: Code2,
  brand: Sparkles,
};

function initialsFromBrand(brand = "") {
  return brand
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function targetForNav(item) {
  if (item.includes("Despre")) return "about";
  if (item.includes("Servicii")) return "services";
  if (item.includes("Proiect")) return "work";
  if (item.includes("Contact")) return "contact";
  return "home";
}

function scrollTo(ref, section) {
  const node = ref.current?.querySelector(`[data-mini-section="${section}"]`);
  node?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function SkillBadge({ children }) {
  return (
    <span className="border border-[#111111]/15 bg-white px-3 py-2 text-xs font-black text-[#111111]">
      {children}
    </span>
  );
}

function ServiceBlock({ item, index }) {
  const Icon = iconMap[item.icon] || [PenTool, Layers3, Code2, Sparkles][index % 4];

  return (
    <article className="border border-[#111111] bg-[#f7f4ec] p-5 shadow-[6px_6px_0_#111111]">
      <div className="mb-5 flex items-center justify-between">
        <span className="grid h-11 w-11 place-items-center bg-[#111111] text-[#f4c430]">
          <Icon size={19} />
        </span>
        <span className="text-xs font-black text-[#2563eb]">0{index + 1}</span>
      </div>
      <h3 className="text-lg font-black uppercase text-[#111111]">{item.title}</h3>
      <p className="mt-2 text-xs leading-5 text-[#4b5563]">{item.text}</p>
    </article>
  );
}

function ProjectRow({ project, index }) {
  return (
    <article className="grid gap-3 border-b border-[#111111]/15 py-5 last:border-b-0 md:grid-cols-[auto_1fr_auto] md:items-center">
      <span className="text-xs font-black text-[#2563eb]">0{index + 1}</span>
      <div>
        <h3 className="text-2xl font-black uppercase text-[#111111]">{project.title}</h3>
        <p className="mt-1 text-xs font-bold text-[#6b7280]">{project.category}</p>
      </div>
      <span className="w-fit bg-[#111111] px-3 py-2 text-xs font-black text-white">{project.year}</span>
    </article>
  );
}

export default function PersonalSiteMockup({ mini, contentRef, isMobile }) {
  const items = mini.items?.length ? mini.items : DEFAULT_ITEMS;
  const skills = mini.skills?.length ? mini.skills : DEFAULT_SKILLS;
  const projects = mini.projects || [];
  const timeline = mini.timeline || [];
  const stats = mini.stats || [];
  const initials = initialsFromBrand(mini.brand);

  return (
    <div ref={contentRef} className="h-full overflow-y-auto bg-[#ece8dd] text-[#111111]">
      <header className="sticky top-0 z-30 border-b border-[#111111] bg-[#ece8dd]/95 px-5 py-3 backdrop-blur md:px-8">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
          <button type="button" onClick={() => scrollTo(contentRef, "home")} className="flex items-center gap-3">
            <AndreiCrisanLogo />
            <span className="text-left">
              <span className="block text-sm font-black uppercase">{mini.brand}</span>
              <span className="block text-xs font-bold text-[#6b7280]">{mini.subtitle}</span>
            </span>
          </button>
          <nav className="hidden items-center gap-5 md:flex">
            {mini.nav?.slice(0, 5).map((item) => (
              <button key={item} type="button" onClick={() => scrollTo(contentRef, targetForNav(item))} className="text-xs font-black uppercase text-[#4b5563] hover:text-[#111111]">
                {item}
              </button>
            ))}
          </nav>
          <button
            type="button"
            onClick={() => scrollTo(contentRef, "contact")}
            className="bg-[#2563eb] px-4 py-2 text-xs font-black text-white"
          >
            {mini.primaryCta}
          </button>
        </div>
      </header>

      <main>
        <section data-mini-section="home" className="grid border-b border-[#111111] bg-[#ece8dd] md:grid-cols-[1.05fr_0.95fr]">
          <div className="p-6 md:p-10">
            
            <div className="mb-6 flex items-center gap-4">
            <AndreiCrisanLogo />

            <div>
            <p className="text-xs font-black uppercase text-white/60">
            {mini.eyebrow}
             </p>

             <p className="text-[11px] text-white/45">
             Personal Portfolio • Creative Professional
            </p>
          </div>
         </div>

            <h1 className="mt-6 max-w-2xl text-5xl font-black uppercase leading-none md:text-7xl">
              {mini.brand}
            </h1>
            <p className="mt-5 max-w-xl text-sm leading-7 text-[#4b5563]">{mini.description}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => scrollTo(contentRef, "contact")}
                className="inline-flex items-center gap-2 bg-[#111111] px-5 py-3 text-xs font-black uppercase text-white"
              >
                {mini.primaryCta}
                <Send size={14} />
              </button>
              <button
                type="button"
                onClick={() => scrollTo(contentRef, "work")}
                className="border border-[#111111] bg-[#ece8dd] px-5 py-3 text-xs font-black uppercase text-[#111111]"
              >
                {mini.secondaryCta}
              </button>
            </div>
          </div>
          <div className="relative min-h-[24rem] border-t border-[#111111] bg-[#111111] p-6 text-[#f4c430] md:border-l md:border-t-0 md:p-10">
            <div className="absolute right-6 top-6 h-28 w-28 border border-[#f4c430]" />
            <div className="absolute bottom-6 left-6 h-32 w-32 bg-[#2563eb]" />
            <div className="relative z-10 grid min-h-[19rem] place-items-center border border-[#f4c430]/40">
              <span className="text-[6rem] font-black leading-none md:text-[8rem]">{initials}</span>
              <span className="absolute bottom-5 right-5 bg-[#f4c430] px-3 py-2 text-xs font-black uppercase text-[#111111]">
                {mini.accent}
              </span>
            </div>
          </div>
        </section>

        <section data-mini-section="about" className="grid bg-[#f7f4ec] md:grid-cols-[0.85fr_1.15fr]">
          <div className="border-b border-[#111111] p-6 md:border-b-0 md:border-r md:p-10">
            <p className="text-xs font-black uppercase text-[#2563eb]">About</p>
            <h2 className="mt-3 text-4xl font-black uppercase leading-none">
              {mini.about?.title || "Hello."}
            </h2>
            <p className="mt-5 text-sm leading-7 text-[#4b5563]">{mini.about?.text || mini.description}</p>
          </div>
          <div className="p-6 md:p-10">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="border border-[#111111]/15 bg-white p-5">
                <p className="text-sm font-black uppercase">Education</p>
                <p className="mt-3 text-sm text-[#4b5563]">{mini.about?.education || "Creative technology"}</p>
              </div>
              <div className="border border-[#111111]/15 bg-white p-5">
                <p className="text-sm font-black uppercase">Experience</p>
                <p className="mt-3 text-sm text-[#4b5563]">{mini.about?.experience || "5+ years"}</p>
              </div>
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              {skills.map((skill) => (
                <SkillBadge key={skill}>{skill}</SkillBadge>
              ))}
            </div>
            {!isMobile ? (
              <div className="mt-6 grid gap-3 md:grid-cols-3">
                {timeline.slice(0, 3).map((item) => (
                  <div key={`${item.role}-${item.period}`} className="border-l-4 border-[#f4c430] bg-white p-4">
                    <p className="text-sm font-black">{item.role}</p>
                    <p className="mt-1 text-xs text-[#6b7280]">{item.period}</p>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </section>

        <section data-mini-section="services" className="px-6 py-10 md:px-10">
          <div className="mb-7 flex items-center gap-3">
            <BriefcaseBusiness size={22} className="text-[#2563eb]" />
            <h2 className="text-4xl font-black uppercase">Services</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-4">
            {items.slice(0, 4).map((item, index) => (
              <ServiceBlock key={item.title} item={item} index={index} />
            ))}
          </div>
        </section>

        <section data-mini-section="work" className="grid border-y border-[#111111] bg-white md:grid-cols-[0.75fr_1.25fr]">
          <div className="border-b border-[#111111] p-6 md:border-b-0 md:border-r md:p-10">
            <p className="text-xs font-black uppercase text-[#2563eb]">Selected work</p>
            <h2 className="mt-3 text-4xl font-black uppercase leading-none">Case studies</h2>
          </div>
          <div className="px-6 py-3 md:px-10">
            {projects.slice(0, 3).map((project, index) => (
              <ProjectRow key={project.title} project={project} index={index} />
            ))}
          </div>
        </section>

        <section data-mini-section="contact" className="grid bg-[#111111] text-white md:grid-cols-[0.8fr_1.2fr]">
          <div className="border-b border-white/15 bg-[#f4c430] p-6 text-[#111111] md:border-b-0 md:border-r md:p-10">
            <Mail size={24} />
            <h2 className="mt-5 text-3xl font-black uppercase leading-tight">Let's work together</h2>
            <p className="mt-4 text-sm leading-6">{mini.contact?.email}</p>
          </div>
          <div className="p-6 md:p-10">
            <h2 className="text-4xl font-black uppercase leading-tight">Ai un proiect in minte?</h2>
            <p className="mt-4 max-w-xl text-sm leading-6 text-white/65">
              Trimite un mesaj pentru un website, portofoliu, identitate vizuala sau o prezentare digitala clara.
            </p>
            <div className="mt-6 grid gap-3 md:grid-cols-4">
              {stats.slice(0, 4).map((stat) => (
                <div key={stat.label} className="border border-white/15 bg-white/[0.06] p-4">
                  <p className="text-2xl font-black text-[#f4c430]">{stat.value}</p>
                  <p className="mt-1 text-xs text-white/55">{stat.label}</p>
                </div>
              ))}
            </div>
            <button type="button" className="mt-6 inline-flex items-center gap-2 bg-[#2563eb] px-5 py-3 text-xs font-black uppercase text-white">
              {mini.primaryCta}
              <ArrowRight size={14} />
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
