const DEFAULT_ITEMS = [
  { title: "Graphic Design", text: "Identitate vizuală și materiale creative.", icon: "✎" },
  { title: "Web Design", text: "Interfețe moderne pentru branduri și servicii.", icon: "◈" },
  { title: "Frontend", text: "Implementări responsive și rapide.", icon: "</>" },
  { title: "Brand Assets", text: "Elemente vizuale coerente pentru campanii.", icon: "▣" },
];

const DEFAULT_SKILLS = ["Figma", "React", "Tailwind", "UI/UX"];

function initialsFromBrand(brand = "") {
  return brand
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function SectionTag({ children }) {
  return (
    <div className="mb-5 flex items-center gap-3">
      <span className="text-[0.58rem] font-black uppercase tracking-[0.22em] text-neutral-700">
        {children}
      </span>
      <span className="h-px flex-1 bg-neutral-300" />
      <span className="grid h-6 w-6 place-items-center rounded-full border border-neutral-500 text-[0.65rem] font-black">
        ›
      </span>
    </div>
  );
}

function SkillBadge({ children }) {
  return (
    <span className="rounded-xl bg-neutral-900 px-3 py-2 text-[0.62rem] font-black uppercase tracking-[0.1em] text-[#f6b51b] shadow-sm">
      {children}
    </span>
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
    <div
      ref={contentRef}
      className="h-full overflow-y-auto bg-[#e7e6e2] text-neutral-900"
    >
      <div className="relative min-h-full overflow-hidden font-sans">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_8%,rgba(246,181,27,.24),transparent_18%),radial-gradient(circle_at_88%_24%,rgba(0,0,0,.08),transparent_24%)]" />
        <div className="pointer-events-none absolute left-5 top-5 right-5 h-px bg-neutral-900/60" />
        <div className="pointer-events-none absolute bottom-12 left-[-2rem] text-[8rem] font-black leading-none text-neutral-900/[0.035]">
          03
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[980px] px-6 py-6 sm:px-8">
          <header className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="h-4 w-4 rounded-full bg-neutral-900" />
              <span className="h-4 w-4 -ml-2 rounded-full bg-[#f6b51b]" />
            </div>

            <nav className="hidden items-center gap-5 text-[0.6rem] font-black uppercase tracking-[0.16em] text-neutral-700 sm:flex">
              {mini.nav?.slice(0, 4).map((item) => (
                <span key={item}>{item}</span>
              ))}
            </nav>

            <span className="text-[0.6rem] font-black uppercase tracking-[0.18em] [writing-mode:vertical-rl]">
              Ready • 2026
            </span>
          </header>

          <section className="relative mt-8 min-h-[330px] border-b border-neutral-900/15 pb-8">
            <div className="absolute right-2 top-6 hidden h-48 w-48 rounded-full border border-neutral-900/55 sm:block" />
            <div className="absolute right-8 top-24 hidden h-40 w-32 rounded-t-[3rem] bg-[#f6b51b] sm:block" />

            <div className="relative grid gap-8 sm:grid-cols-[1.1fr_.9fr] sm:items-center">
              <div>
                <p className="mb-3 inline-flex -rotate-2 rounded-md bg-[#f6b51b] px-3 py-1 text-[0.65rem] font-black uppercase italic tracking-[0.05em]">
                  {mini.eyebrow}
                </p>

                <h1 className="max-w-[30rem] text-[3.4rem] font-black uppercase leading-[0.78] tracking-[-0.08em] text-neutral-800 sm:text-[5.2rem]">
                  Porto
                  <span className="block">
                    Folio<span className="text-[#f6b51b]">.</span>
                  </span>
                </h1>

                <p className="mt-5 max-w-sm text-xs leading-5 text-neutral-700">
                  {mini.description}
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <a
                    href="#personal-contact"
                    className="rounded-full bg-neutral-900 px-5 py-3 text-[0.65rem] font-black uppercase tracking-[0.12em] text-white shadow-sm transition hover:bg-[#f6b51b] hover:text-neutral-950"
                  >
                    {mini.primaryCta}
                  </a>
                  <a
                    href="#personal-work"
                    className="rounded-full border border-neutral-900/45 px-5 py-3 text-[0.65rem] font-black uppercase tracking-[0.12em]"
                  >
                    {mini.secondaryCta}
                  </a>
                </div>
              </div>

              <div className="relative mx-auto grid h-56 w-56 place-items-center rounded-[2.5rem] bg-neutral-900 text-[#f6b51b] shadow-[14px_14px_0_rgba(246,181,27,.95)] sm:h-72 sm:w-72">
                <div className="absolute -left-6 top-8 rotate-[-12deg] rounded-xl border border-neutral-900/20 bg-white/65 px-3 py-2 text-[0.62rem] font-black uppercase tracking-[0.1em] text-neutral-900 shadow-sm">
                  Creative Visual
                </div>
                <span className="text-[5rem] font-black tracking-[-0.12em] sm:text-[7rem]">
                  {initials}
                </span>
                <span className="absolute bottom-5 right-5 rounded-full bg-[#f6b51b] px-3 py-1 text-[0.62rem] font-black uppercase text-neutral-900">
                  {mini.accent}
                </span>
              </div>
            </div>
          </section>

          <section className="grid gap-7 border-b border-neutral-900/15 py-8 sm:grid-cols-[.85fr_1.15fr]">
            <div>
              <SectionTag>About</SectionTag>
              <div className="relative overflow-hidden rounded-t-[4rem] bg-[#f6b51b] p-6 text-neutral-900 shadow-sm">
                <div className="grid h-52 place-items-center rounded-t-[3rem] bg-neutral-900 text-[4rem] font-black text-[#f6b51b]">
                  {initials}
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-4xl font-black uppercase leading-none tracking-[-0.06em]">
                <span className="text-[#f6b51b]">"</span>
                {mini.about?.title || "Hello."}
              </h2>
              <p className="mt-4 max-w-xl text-xs leading-6 text-neutral-700">
                {mini.about?.text || mini.description}
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-sm font-black underline decoration-[#f6b51b] decoration-4 underline-offset-4">
                    Education.
                  </p>
                  <p className="mt-3 text-xs font-bold text-neutral-700">
                    {mini.about?.education || "Creative technology"}
                  </p>
                </div>

                <div>
                  <p className="text-sm font-black underline decoration-[#f6b51b] decoration-4 underline-offset-4">
                    Software Skill.
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {skills.map((skill) => (
                      <SkillBadge key={skill}>{skill}</SkillBadge>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <p className="text-sm font-black underline decoration-[#f6b51b] decoration-4 underline-offset-4">
                  Working Experience.
                </p>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {timeline.slice(0, 4).map((item) => (
                    <div key={`${item.role}-${item.period}`} className="border-l-2 border-neutral-900/45 pl-3">
                      <p className="text-xs font-black">{item.role}</p>
                      <p className="mt-1 text-[0.65rem] font-semibold text-neutral-500">{item.period}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section id="personal-work" className="py-8">
            <SectionTag>Table Of Content</SectionTag>

            <h2 className="text-center text-3xl font-black uppercase leading-none tracking-[-0.05em] sm:text-5xl">
              Table <span className="bg-[#f6b51b] px-2">of</span> Content.
            </h2>

            <div className="mt-8 grid gap-4 sm:grid-cols-4">
              {items.slice(0, 4).map((item) => (
                <article
                  key={item.title}
                  className="group rounded-[2rem] bg-[#f6b51b] p-4 text-center shadow-[0_10px_24px_rgba(0,0,0,.12)] transition hover:-translate-y-1"
                >
                  <div className="mx-auto grid h-20 w-20 place-items-center rounded-3xl bg-neutral-900 text-xl font-black text-[#f6b51b]">
                    {item.icon || "◈"}
                  </div>
                  <h3 className="mt-4 text-sm font-black">{item.title}</h3>
                  <p className="mt-2 line-clamp-3 text-[0.62rem] leading-4 text-neutral-700">
                    {item.text}
                  </p>
                </article>
              ))}
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {projects.slice(0, 3).map((project) => (
                <article key={project.title} className="rounded-3xl border border-neutral-900/15 bg-white/45 p-5">
                  <p className="text-[0.58rem] font-black uppercase tracking-[0.18em] text-neutral-500">
                    {project.category} • {project.year}
                  </p>
                  <h3 className="mt-3 text-xl font-black uppercase tracking-[-0.04em]">
                    {project.title}
                  </h3>
                </article>
              ))}
            </div>
          </section>

          <section id="personal-contact" className="mb-8 grid gap-5 rounded-[2.2rem] bg-neutral-900 p-6 text-white sm:grid-cols-[.8fr_1.2fr]">
            <div className="rounded-3xl bg-[#f6b51b] p-5 text-neutral-900">
              <p className="text-sm font-black uppercase tracking-[0.15em]">Let's work together</p>
              <div className="mt-6 grid h-24 w-24 place-items-center rounded-2xl bg-white text-3xl font-black">
                QR
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-black uppercase leading-none tracking-[-0.06em]">
                Ai un proiect în minte?
              </h2>
              <p className="mt-3 max-w-md text-xs leading-5 text-white/60">
                Trimite un mesaj pentru un website, portofoliu, identitate vizuală sau o prezentare digitală construită clar.
              </p>

              <div className="mt-5 grid gap-2 text-xs text-white/75">
                <span>{mini.contact?.email}</span>
                <span>{mini.contact?.phone}</span>
                <span>{mini.contact?.social}</span>
              </div>

              <div className="mt-5 grid grid-cols-4 gap-3">
                {stats.slice(0, 4).map((stat) => (
                  <div key={stat.label} className="rounded-2xl bg-white/8 p-3">
                    <p className="text-lg font-black text-[#f6b51b]">{stat.value}</p>
                    <p className="mt-1 text-[0.58rem] uppercase tracking-[0.13em] text-white/50">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
