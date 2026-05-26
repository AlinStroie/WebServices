import { useState } from "react";
import {
  ArrowRight,
  Award,
  BriefcaseBusiness,
  CheckCircle2,
  Code2,
  ExternalLink,
  Layers3,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Palette,
  Phone,
  Sparkles,
  Star,
  UserRound,
  X,
} from "lucide-react";
import { NavButton, navTarget, scrollToSection } from "./shared.jsx";

const defaultServices = [
  {
    title: "Graphic Design",
    text: "Identitate vizuală, materiale de prezentare și direcție grafică pentru branduri coerente.",
    icon: "✎",
  },
  {
    title: "Web Design",
    text: "Landing page-uri, portofolii și interfețe responsive cu structură clară și impact vizual.",
    icon: "◈",
  },
  {
    title: "Frontend",
    text: "Implementări rapide, curate și ușor de extins, pregătite pentru proiecte reale.",
    icon: "</>",
  },
  {
    title: "Brand Assets",
    text: "Elemente vizuale pentru social media, campanii, lansări și comunicare digitală.",
    icon: "▣",
  },
];

const defaultProjects = [
  {
    title: "Brand Refresh",
    category: "Visual Identity",
    year: "2026",
    text: "Repoziționare vizuală pentru un brand digital: sistem de culori, direcție grafică și asset-uri pentru lansare.",
    role: "Design lead",
    result: "identitate coerentă",
    tags: ["Branding", "Art Direction", "Social Assets"],
  },
  {
    title: "Portfolio Website",
    category: "Web Design",
    year: "2026",
    text: "Website personal cu structură clară, secțiuni de proiecte, servicii și contact rapid pentru colaborări.",
    role: "UI / Frontend",
    result: "experiență responsive",
    tags: ["React", "Tailwind", "UI/UX"],
  },
  {
    title: "Launch Campaign",
    category: "Creative Direction",
    year: "2025",
    text: "Direcție vizuală pentru campanie de lansare, cu mesaje clare și materiale adaptate canalelor digitale.",
    role: "Creative direction",
    result: "lansare memorabilă",
    tags: ["Campaign", "Visuals", "Copy"],
  },
];

const defaultTimeline = [
  {
    role: "Frontend & UI designer",
    period: "2024 — prezent",
  },
  {
    role: "Graphic designer freelance",
    period: "2022 — prezent",
  },
  {
    role: "Content design specialist",
    period: "2021 — 2023",
  },
];

const defaultStats = [
  { value: "30+", label: "proiecte" },
  { value: "5+", label: "ani" },
  { value: "100%", label: "custom" },
  { value: "24h", label: "răspuns" },
];

const defaultReviews = [
  {
    name: "Mara I.",
    role: "Fondator brand local",
    stars: 5,
    text: "Alex a transformat o idee vagă într-o identitate vizuală clară, ușor de folosit și memorabilă.",
  },
  {
    name: "Vlad P.",
    role: "Consultant digital",
    stars: 5,
    text: "Proces rapid, comunicare bună și un website care arată profesionist pe desktop și mobil.",
  },
];

function targetForNav(item) {
  if (item.includes("Acasă")) return "home";
  if (item.includes("Despre")) return "about";
  if (item.includes("Servicii")) return "services";
  if (item.includes("Proiecte") || item.includes("Work")) return "projects";
  if (item.includes("Contact")) return "contact";

  return navTarget(item);
}

function getInitials(name = "") {
  return name
    .split(" ")
    .filter(Boolean)
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function PortfolioMark({ brand, compact = false }) {
  const initials = getInitials(brand);

  return (
    <div className="flex min-w-0 items-center gap-3">
      <span
        className={
          compact
            ? "grid h-10 w-10 shrink-0 place-items-center bg-[#111111] text-sm font-black text-[#f4c430] shadow-[4px_4px_0_#2563eb]"
            : "grid h-12 w-12 shrink-0 place-items-center bg-[#111111] text-base font-black text-[#f4c430] shadow-[5px_5px_0_#2563eb]"
        }
      >
        {initials}
      </span>

      <span className="min-w-0">
        <span className="block truncate text-sm font-black leading-none text-[#111111]">
          {brand}
        </span>
        <span className="mt-1 block truncate text-[0.62rem] font-bold uppercase tracking-[0.08em] text-[#64748b]">
          Portfolio
        </span>
      </span>
    </div>
  );
}

function SectionEyebrow({ children, light = false }) {
  return (
    <p
      className={
        light
          ? "text-xs font-black uppercase tracking-[0.10em] text-[#f4c430]"
          : "text-xs font-black uppercase tracking-[0.10em] text-[#2563eb]"
      }
    >
      {children}
    </p>
  );
}

function SectionTitle({ children, mobile, light = false, className = "" }) {
  return (
    <h2
      className={`mt-4 font-black leading-tight tracking-[-0.055em] ${
        light ? "text-white" : "text-[#111111]"
      } ${className}`}
      style={{
        fontSize: mobile
          ? "clamp(2.15rem, 10.5cqw, 3.05rem)"
          : "clamp(2.85rem, 5cqw, 4.6rem)",
        wordBreak: "normal",
        overflowWrap: "normal",
        hyphens: "none",
      }}
    >
      {children}
    </h2>
  );
}

function HeroVisual({ mini, mobile = false }) {
  const initials = getInitials(mini.brand);
  const skills = mini.skills?.slice(0, 4) || [];

  return (
    <div
      className={
        mobile
          ? "relative min-h-[31rem] overflow-hidden bg-[#111111]"
          : "relative min-h-[42rem] overflow-hidden bg-[#111111]"
      }
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,rgba(244,196,48,.35),transparent_28%),radial-gradient(circle_at_76%_70%,rgba(37,99,235,.42),transparent_35%),linear-gradient(135deg,#111111_0%,#18181b_48%,#f4c430_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,.07)_1px,transparent_1px),linear-gradient(rgba(255,255,255,.07)_1px,transparent_1px)] [background-size:36px_36px]" />

      <div
        className={
          mobile
            ? "absolute left-5 right-5 top-6 border border-white/15 bg-white/10 p-4 text-white backdrop-blur-md"
            : "absolute left-8 right-8 top-8 border border-white/15 bg-white/10 p-5 text-white backdrop-blur-md"
        }
      >
        <div className="flex items-center justify-between gap-4">
          <span className="inline-flex items-center gap-2 text-[0.68rem] font-black uppercase tracking-[0.08em] text-[#f4c430]">
            <Sparkles size={14} />
            {mini.availability || "Available for selected projects"}
          </span>

          <span className="shrink-0 rounded-full bg-[#22c55e] px-2.5 py-1 text-[0.62rem] font-black uppercase text-[#052e16]">
            Open
          </span>
        </div>
      </div>

      <div
        className={
          mobile
            ? "absolute left-1/2 top-[8.5rem] h-52 w-52 -translate-x-1/2 border border-white/15 bg-[#f4c430] shadow-[12px_12px_0_#2563eb]"
            : "absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 border border-white/15 bg-[#f4c430] shadow-[18px_18px_0_#2563eb]"
        }
      >
        <div className="absolute inset-5 grid place-items-center bg-[#111111] text-[#f4c430]">
          <span
            className={
              mobile
                ? "text-7xl font-black tracking-[-0.08em]"
                : "text-9xl font-black tracking-[-0.08em]"
            }
          >
            {initials}
          </span>
        </div>

        <div className="absolute -bottom-5 -left-5 bg-white px-4 py-3 text-[#111111] shadow-[0_18px_45px_rgba(0,0,0,.25)]">
          <p className="text-[0.62rem] font-black uppercase tracking-[0.08em] text-[#2563eb]">
            Role
          </p>
          <p className="mt-1 text-sm font-black">{mini.subtitle}</p>
        </div>
      </div>

      <div
        className={
          mobile
            ? "absolute bottom-6 left-5 right-5 grid grid-cols-2 gap-2"
            : "absolute bottom-8 left-8 right-8 grid grid-cols-4 gap-3"
        }
      >
        {skills.map((skill) => (
          <span
            key={skill}
            className="border border-white/15 bg-white/10 px-3 py-3 text-center text-[0.68rem] font-black uppercase tracking-[0.06em] text-white backdrop-blur-md"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}

function StatCard({ stat }) {
  return (
    <article className="min-w-0 border border-[#111111]/10 bg-white p-5 shadow-[0_18px_45px_rgba(17,17,17,.06)]">
      <p className="text-3xl font-black leading-none tracking-[-0.05em] text-[#111111]">
        {stat.value}
      </p>
      <p className="mt-2 text-[0.68rem] font-black uppercase tracking-[0.08em] text-[#64748b]">
        {stat.label}
      </p>
    </article>
  );
}

function ServiceCard({ item, index }) {
  const icons = [Palette, Layers3, Code2, BriefcaseBusiness];
  const Icon = icons[index % icons.length];

  return (
    <article className="group min-w-0 border border-[#111111]/10 bg-white p-5 transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(17,17,17,.10)]">
      <div className="mb-6 flex items-start justify-between gap-4">
        <span className="grid h-12 w-12 shrink-0 place-items-center bg-[#111111] text-[#f4c430] shadow-[5px_5px_0_#2563eb]">
          <Icon size={19} />
        </span>

        <span className="text-[0.65rem] font-black uppercase tracking-[0.08em] text-[#2563eb]">
          0{index + 1}
        </span>
      </div>

      <h3 className="text-xl font-black leading-tight tracking-[-0.03em] text-[#111111]">
        {item.title}
      </h3>
      <p className="mt-3 text-sm leading-7 text-[#64748b]">{item.text}</p>
    </article>
  );
}

function ProjectVisual({ project, index }) {
  return (
    <div className="relative mb-5 h-56 overflow-hidden bg-[#111111]">
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(244,196,48,.90),rgba(37,99,235,.85))]" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,.18)_1px,transparent_1px),linear-gradient(rgba(255,255,255,.18)_1px,transparent_1px)] [background-size:30px_30px]" />

      <div className="absolute left-5 top-5 rounded-full bg-white px-3 py-1 text-[0.62rem] font-black uppercase tracking-[0.08em] text-[#111111]">
        {project.category}
      </div>

      <div className="absolute bottom-5 left-5 right-5 border border-white/20 bg-white/15 p-4 text-white backdrop-blur-md">
        <p className="text-[0.65rem] font-black uppercase tracking-[0.10em] text-[#f4c430]">
          Case study 0{index + 1}
        </p>
        <p className="mt-2 text-2xl font-black leading-none tracking-[-0.04em]">
          {project.title}
        </p>
      </div>
    </div>
  );
}

function ProjectCard({ project, index }) {
  const tags = project.tags || [];

  return (
    <article className="min-w-0 border border-white/10 bg-[#18181b] p-5 text-white">
      <ProjectVisual project={project} index={index} />

      <div className="mb-4 flex items-center justify-between gap-4">
        <span className="text-xs font-black uppercase tracking-[0.08em] text-[#f4c430]">
          {project.year}
        </span>
        <span className="truncate text-xs font-bold text-white/55">
          {project.role || "Creative role"}
        </span>
      </div>

      <h3 className="text-2xl font-black leading-tight tracking-[-0.04em]">
        {project.title}
      </h3>
      <p className="mt-3 text-sm leading-7 text-white/68">{project.text}</p>

      <div className="mt-5 flex flex-wrap gap-2">
        {tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="border border-white/10 bg-white/10 px-3 py-1.5 text-[0.62rem] font-black uppercase tracking-[0.06em] text-white/80"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-5 flex items-center justify-between gap-4 border-t border-white/10 pt-5">
        <span className="text-xs font-black uppercase tracking-[0.08em] text-white/55">
          {project.result || "rezultat clar"}
        </span>
        <ExternalLink size={16} className="text-[#f4c430]" />
      </div>
    </article>
  );
}

function TimelineItem({ item, index }) {
  return (
    <div className="relative min-w-0 border border-[#111111]/10 bg-[#f7f3e8] p-5">
      <span className="absolute -left-2 top-6 h-4 w-4 bg-[#2563eb] shadow-[4px_4px_0_#f4c430]" />
      <p className="text-[0.65rem] font-black uppercase tracking-[0.08em] text-[#2563eb]">
        0{index + 1} / {item.period}
      </p>
      <p className="mt-2 text-lg font-black leading-tight text-[#111111]">
        {item.role}
      </p>
    </div>
  );
}

function ProcessCard({ item, index }) {
  return (
    <article className="min-w-0 border border-[#111111]/10 bg-white p-5">
      <div className="mb-5 flex items-center justify-between gap-4">
        <span className="text-3xl font-black tracking-[-0.08em] text-[#111111]">
          0{index + 1}
        </span>
        <CheckCircle2 size={18} className="text-[#2563eb]" />
      </div>
      <h3 className="text-lg font-black text-[#111111]">{item.title}</h3>
      <p className="mt-3 text-sm leading-7 text-[#64748b]">{item.text}</p>
    </article>
  );
}

function ReviewCard({ review }) {
  return (
    <article className="min-w-0 border border-[#111111]/10 bg-white p-5">
      <div className="flex items-center gap-1 text-[#f4c430]">
        {Array.from({ length: review.stars || 5 }).map((_, index) => (
          <Star key={`${review.name}-${index}`} size={14} fill="currentColor" />
        ))}
      </div>
      <p className="mt-4 text-sm leading-7 text-[#374151]">“{review.text}”</p>
      <p className="mt-5 text-sm font-black text-[#111111]">{review.name}</p>
      <p className="mt-1 text-xs font-bold uppercase tracking-[0.08em] text-[#64748b]">
        {review.role}
      </p>
    </article>
  );
}

function ContactLine({ icon: Icon, label, value, href, mobile = false }) {
  const content = (
    <div className="flex min-w-0 items-center gap-4 border border-white/12 bg-white/10 p-4 text-white">
      <span className="grid h-11 w-11 shrink-0 place-items-center bg-[#f4c430] text-[#111111]">
        <Icon size={17} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-[0.65rem] font-black uppercase tracking-[0.08em] text-white/55">
          {label}
        </span>
        <span
          className={
            mobile
              ? "mt-1 block max-w-full text-sm font-bold leading-6 text-white [overflow-wrap:anywhere]"
              : "mt-1 block truncate text-sm font-bold leading-6 text-white"
          }
        >
          {value}
        </span>
      </span>
    </div>
  );

  if (!href) return content;

  return (
    <a href={href} className="block transition hover:-translate-y-0.5">
      {content}
    </a>
  );
}

function ContactPanel({ mini, mobile = false }) {
  const email = mini.contact?.email || "hello@alexnova.ro";
  const phone = mini.contact?.phone || "+40 700 777 888";
  const location = mini.contact?.address || "Remote / România";
  const social = mini.contact?.social || "@alexnova.design";

  return (
    <div className="grid gap-3">
      <ContactLine
        mobile={mobile}
        icon={Mail}
        label="Email"
        value={email}
        href={`mailto:${email}`}
      />
      <ContactLine
        mobile={mobile}
        icon={Phone}
        label="Telefon"
        value={phone}
        href={`tel:${phone.replace(/\s/g, "")}`}
      />
      <ContactLine mobile={mobile} icon={MapPin} label="Locație" value={location} />
      <ContactLine mobile={mobile} icon={MessageCircle} label="Social" value={social} />
    </div>
  );
}

export default function PersonalSiteMockup({ mini, contentRef, isMobile }) {
  const mobile = Boolean(isMobile);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const services = mini.items?.length ? mini.items : defaultServices;
  const projects = mini.projects?.length ? mini.projects : defaultProjects;
  const timeline = mini.timeline?.length ? mini.timeline : defaultTimeline;
  const stats = mini.stats?.length ? mini.stats : defaultStats;
  const reviews = mini.reviews?.length ? mini.reviews : defaultReviews;
  const process = mini.process?.length
    ? mini.process
    : [
        {
          title: "Clarificare",
          text: "Stabilim obiectivul, publicul și direcția vizuală potrivită proiectului.",
        },
        {
          title: "Design",
          text: "Construim o direcție coerentă, cu accent pe ierarhie, ritm și detalii vizuale.",
        },
        {
          title: "Livrare",
          text: "Pregătim materialele finale pentru implementare, lansare sau comunicare digitală.",
        },
      ];

  function handleNavClick(item) {
    scrollToSection(contentRef, targetForNav(item));
    setMobileMenuOpen(false);
  }

  return (
    <div
      ref={contentRef}
      className="h-full overflow-y-auto overflow-x-hidden bg-[#ece8dd] text-[#111111]"
    >
      <header className="sticky top-0 z-40 border-b border-[#111111]/10 bg-[#ece8dd]/95 px-5 py-3 backdrop-blur-xl">
        {mobile ? (
          <div>
            <div className="flex items-center justify-between gap-3">
              <PortfolioMark brand={mini.brand} compact />

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => scrollToSection(contentRef, "projects")}
                  className="shrink-0 bg-[#111111] px-3 py-3 text-[0.62rem] font-black uppercase tracking-[0.06em] text-[#f4c430]"
                >
                  Work
                </button>

                <button
                  type="button"
                  onClick={() => setMobileMenuOpen((value) => !value)}
                  className="grid h-10 w-10 shrink-0 place-items-center border border-[#111111]/12 bg-white text-[#111111]"
                  aria-label={
                    mobileMenuOpen ? "Închide meniul" : "Deschide meniul"
                  }
                >
                  {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
                </button>
              </div>
            </div>

            {mobileMenuOpen ? (
              <nav className="mt-4 grid gap-2 border-t border-[#111111]/10 pt-4">
                {mini.nav?.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => handleNavClick(item)}
                    className="w-full border border-[#111111]/10 bg-white px-4 py-3 text-left text-xs font-black uppercase tracking-[0.06em] text-[#111111]"
                  >
                    {item}
                  </button>
                ))}
              </nav>
            ) : null}
          </div>
        ) : (
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-5">
            <PortfolioMark brand={mini.brand} />

            <nav className="flex items-center gap-6">
              {mini.nav?.map((item) => (
                <NavButton
                  key={item}
                  onClick={() => scrollToSection(contentRef, targetForNav(item))}
                >
                  {item}
                </NavButton>
              ))}
            </nav>

            <button
              type="button"
              onClick={() => scrollToSection(contentRef, "contact")}
              className="bg-[#111111] px-5 py-3 text-xs font-black uppercase tracking-[0.06em] text-[#f4c430] transition hover:bg-[#2563eb] hover:text-white"
            >
              {mini.primaryCta}
            </button>
          </div>
        )}
      </header>

      <main>
        <section
          data-mini-section="home"
          className="bg-[#ece8dd]"
          style={{ containerType: "inline-size" }}
        >
          {mobile ? (
            <div>
              <div className="px-6 py-10">
                <SectionEyebrow>{mini.eyebrow}</SectionEyebrow>

                <p className="mt-5 inline-flex bg-[#f4c430] px-4 py-2 text-[0.68rem] font-black uppercase tracking-[0.08em] text-[#111111]">
                  {mini.accent}
                </p>

                <h1
                  className="mt-5 max-w-full font-black uppercase leading-[0.92] tracking-[-0.075em] text-[#111111]"
                  style={{
                    fontSize: "clamp(3.05rem, 15cqw, 4.6rem)",
                    wordBreak: "normal",
                    overflowWrap: "normal",
                    hyphens: "none",
                  }}
                >
                  {mini.headline}
                </h1>

                <p className="mt-6 max-w-xl text-sm leading-7 text-[#4b5563]">
                  {mini.description}
                </p>

                <div className="mt-7 grid gap-3">
                  <button
                    type="button"
                    onClick={() => scrollToSection(contentRef, "projects")}
                    className="inline-flex w-full items-center justify-center gap-2 bg-[#2563eb] px-5 py-4 text-xs font-black uppercase tracking-[0.06em] text-white"
                  >
                    {mini.secondaryCta}
                    <ArrowRight size={15} />
                  </button>
                  <button
                    type="button"
                    onClick={() => scrollToSection(contentRef, "contact")}
                    className="inline-flex w-full items-center justify-center gap-2 border border-[#111111]/12 bg-white px-5 py-4 text-xs font-black uppercase tracking-[0.06em] text-[#111111]"
                  >
                    {mini.primaryCta}
                    <Mail size={15} />
                  </button>
                </div>
              </div>

              <HeroVisual mini={mini} mobile />
            </div>
          ) : (
            <div
              className="grid min-h-[44rem]"
              style={{
                gridTemplateColumns: "minmax(0, 0.95fr) minmax(24rem, 1.05fr)",
              }}
            >
              <div className="flex min-w-0 flex-col justify-center border-r border-[#111111]/10 px-10 py-14">
                <SectionEyebrow>{mini.eyebrow}</SectionEyebrow>

                <p className="mt-6 inline-flex w-fit bg-[#f4c430] px-4 py-2 text-[0.7rem] font-black uppercase tracking-[0.08em] text-[#111111]">
                  {mini.accent}
                </p>

                <h1
                  className="mt-5 max-w-4xl font-black uppercase leading-[0.9] tracking-[-0.08em] text-[#111111]"
                  style={{
                    fontSize: "clamp(4rem, 7.2cqw, 7.4rem)",
                    wordBreak: "normal",
                    overflowWrap: "normal",
                    hyphens: "none",
                  }}
                >
                  {mini.headline}
                </h1>

                <p className="mt-7 max-w-xl text-sm leading-7 text-[#4b5563]">
                  {mini.description}
                </p>

                <div className="mt-8 flex flex-wrap gap-4">
                  <button
                    type="button"
                    onClick={() => scrollToSection(contentRef, "projects")}
                    className="inline-flex items-center gap-2 bg-[#2563eb] px-6 py-4 text-xs font-black uppercase tracking-[0.06em] text-white transition hover:bg-[#111111]"
                  >
                    {mini.secondaryCta}
                    <ArrowRight size={16} />
                  </button>

                  <button
                    type="button"
                    onClick={() => scrollToSection(contentRef, "contact")}
                    className="inline-flex items-center gap-2 border border-[#111111]/12 bg-white px-6 py-4 text-xs font-black uppercase tracking-[0.06em] text-[#111111] transition hover:bg-[#f4c430]"
                  >
                    {mini.primaryCta}
                    <Mail size={16} />
                  </button>
                </div>
              </div>

              <HeroVisual mini={mini} />
            </div>
          )}
        </section>

        <section className="relative z-10 -mt-7 px-6">
          <div
            className="mx-auto grid max-w-7xl gap-3"
            style={{
              gridTemplateColumns: mobile
                ? "repeat(2, minmax(0, 1fr))"
                : "repeat(4, minmax(0, 1fr))",
            }}
          >
            {stats.slice(0, 4).map((stat) => (
              <StatCard key={stat.label} stat={stat} />
            ))}
          </div>
        </section>

        <section
          data-mini-section="projects"
          className="bg-[#111111] px-6 py-14 text-white"
          style={{ containerType: "inline-size" }}
        >
          <div className="mx-auto max-w-7xl">
            <div
              className={
                mobile
                  ? "grid gap-5"
                  : "grid grid-cols-[minmax(0,0.9fr)_minmax(18rem,0.55fr)] items-end gap-8"
              }
            >
              <div>
                <SectionEyebrow light>Selected projects</SectionEyebrow>
                <SectionTitle mobile={mobile} light>
                  Proiecte care arată direcția, detaliul și rezultatul final.
                </SectionTitle>
              </div>

              <p className="text-sm leading-7 text-white/62">
                {mini.projectsText ||
                  "O selecție de lucrări construite pentru branduri, website-uri și campanii digitale cu personalitate vizuală clară."}
              </p>
            </div>

            <div
              className="mt-10 grid gap-5"
              style={{
                gridTemplateColumns: mobile
                  ? "1fr"
                  : "repeat(3, minmax(0, 1fr))",
              }}
            >
              {projects.slice(0, 3).map((project, index) => (
                <ProjectCard key={project.title} project={project} index={index} />
              ))}
            </div>
          </div>
        </section>

        <section
          data-mini-section="services"
          className="bg-[#ece8dd] px-6 py-14"
          style={{ containerType: "inline-size" }}
        >
          <div className="mx-auto max-w-7xl">
            <div className="max-w-4xl">
              <SectionEyebrow>Servicii</SectionEyebrow>
              <SectionTitle mobile={mobile}>
                Design, interfețe și asset-uri pentru branduri digitale.
              </SectionTitle>
              <p className="mt-5 max-w-2xl text-sm leading-7 text-[#4b5563]">
                {mini.servicesText ||
                  "De la identitate vizuală la website-uri responsive, fiecare livrabil este construit pentru claritate, consistență și utilizare reală."}
              </p>
            </div>

            <div
              className="mt-10 grid gap-5"
              style={{
                gridTemplateColumns: mobile
                  ? "1fr"
                  : "repeat(4, minmax(0, 1fr))",
              }}
            >
              {services.slice(0, 4).map((item, index) => (
                <ServiceCard key={item.title} item={item} index={index} />
              ))}
            </div>
          </div>
        </section>

        <section
          data-mini-section="about"
          className="bg-white px-6 py-14"
          style={{ containerType: "inline-size" }}
        >
          <div
            className="mx-auto grid max-w-7xl gap-8"
            style={{
              gridTemplateColumns: mobile
                ? "1fr"
                : "minmax(18rem,0.78fr) minmax(0,1.22fr)",
            }}
          >
            <aside className="min-w-0 border border-[#111111]/10 bg-[#f7f3e8] p-6">
              <div className="mb-7 flex items-center gap-4">
                <span className="grid h-16 w-16 shrink-0 place-items-center bg-[#111111] text-2xl font-black text-[#f4c430] shadow-[6px_6px_0_#2563eb]">
                  {getInitials(mini.brand)}
                </span>
                <div className="min-w-0">
                  <p className="truncate text-lg font-black text-[#111111]">
                    {mini.brand}
                  </p>
                  <p className="mt-1 truncate text-xs font-bold uppercase tracking-[0.08em] text-[#64748b]">
                    {mini.subtitle}
                  </p>
                </div>
              </div>

              <h2 className="text-4xl font-black tracking-[-0.06em] text-[#111111]">
                {mini.about?.title || "Hello."}
              </h2>
              <p className="mt-5 text-sm leading-7 text-[#4b5563]">
                {mini.about?.text}
              </p>

              <div className="mt-7 grid gap-3">
                <div className="border border-[#111111]/10 bg-white p-4">
                  <p className="text-[0.65rem] font-black uppercase tracking-[0.08em] text-[#2563eb]">
                    Educație
                  </p>
                  <p className="mt-1 text-sm font-black text-[#111111]">
                    {mini.about?.education || "Design & frontend"}
                  </p>
                </div>
                <div className="border border-[#111111]/10 bg-white p-4">
                  <p className="text-[0.65rem] font-black uppercase tracking-[0.08em] text-[#2563eb]">
                    Experiență
                  </p>
                  <p className="mt-1 text-sm font-black text-[#111111]">
                    {mini.about?.experience || "5+ ani experiență"}
                  </p>
                </div>
              </div>
            </aside>

            <div className="min-w-0">
              <SectionEyebrow>Proces & experiență</SectionEyebrow>
              <SectionTitle mobile={mobile}>
                Un flux clar, de la idee la livrare.
              </SectionTitle>

              <div
                className="mt-8 grid gap-4"
                style={{
                  gridTemplateColumns: mobile
                    ? "1fr"
                    : "repeat(3, minmax(0, 1fr))",
                }}
              >
                {process.slice(0, 3).map((item, index) => (
                  <ProcessCard key={item.title} item={item} index={index} />
                ))}
              </div>

              <div
                className="mt-8 grid gap-5"
                style={{
                  gridTemplateColumns: mobile
                    ? "1fr"
                    : "minmax(0,0.95fr) minmax(16rem,0.65fr)",
                }}
              >
                <div className="grid gap-3 border-l border-[#111111]/10 pl-4">
                  {timeline.slice(0, 3).map((item, index) => (
                    <TimelineItem key={item.role} item={item} index={index} />
                  ))}
                </div>

                <div className="border border-[#111111]/10 bg-[#111111] p-5 text-white">
                  <p className="text-xs font-black uppercase tracking-[0.08em] text-[#f4c430]">
                    Skillset
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {mini.skills?.map((skill) => (
                      <span
                        key={skill}
                        className="border border-white/10 bg-white/10 px-3 py-2 text-[0.65rem] font-black uppercase tracking-[0.06em] text-white/80"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#f7f3e8] px-6 py-14">
          <div
            className="mx-auto grid max-w-7xl gap-5"
            style={{
              gridTemplateColumns: mobile
                ? "1fr"
                : "minmax(0,0.7fr) minmax(0,1fr)",
            }}
          >
            <div>
              <SectionEyebrow>Feedback</SectionEyebrow>
              <SectionTitle mobile={mobile}>
                Colaborări clare, livrări curate și rezultate vizibile.
              </SectionTitle>
            </div>

            <div
              className="grid gap-4"
              style={{
                gridTemplateColumns: mobile
                  ? "1fr"
                  : "repeat(2, minmax(0, 1fr))",
              }}
            >
              {reviews.slice(0, 2).map((review) => (
                <ReviewCard key={review.name} review={review} />
              ))}
            </div>
          </div>
        </section>

        <section
          data-mini-section="contact"
          className="relative overflow-hidden bg-[#111111] px-6 py-14 text-white"
          style={{ containerType: "inline-size" }}
        >
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full border-[44px] border-[#f4c430]/65" />
          <div className="pointer-events-none absolute -bottom-20 left-8 h-52 w-52 bg-[#2563eb]/55" />

          <div
            className="relative z-10 mx-auto grid max-w-7xl gap-8"
            style={{
              gridTemplateColumns: mobile
                ? "1fr"
                : "minmax(0,0.95fr) minmax(18rem,0.75fr)",
            }}
          >
            <div className="min-w-0">
              <SectionEyebrow light>Contact</SectionEyebrow>
              <SectionTitle mobile={mobile} light>
                {mini.contactTitle || "Hai să construim ceva memorabil."}
              </SectionTitle>
              <p className="mt-5 max-w-xl text-sm leading-7 text-white/70">
                {mini.contactText ||
                  "Scrie-mi pentru identitate vizuală, website-uri, interfețe sau materiale digitale. Răspund rapid cu pașii următori."}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={`mailto:${mini.contact?.email || "hello@alexnova.ro"}`}
                  className="inline-flex items-center gap-2 bg-[#f4c430] px-5 py-4 text-xs font-black uppercase tracking-[0.06em] text-[#111111]"
                >
                  Trimite email
                  <ArrowRight size={15} />
                </a>
                <button
                  type="button"
                  onClick={() => scrollToSection(contentRef, "projects")}
                  className="inline-flex items-center gap-2 border border-white/15 bg-white/10 px-5 py-4 text-xs font-black uppercase tracking-[0.06em] text-white"
                >
                  Vezi proiecte
                  <BriefcaseBusiness size={15} />
                </button>
              </div>
            </div>

            <ContactPanel mini={mini} mobile={mobile} />
          </div>
        </section>

        <footer className="border-t border-[#111111]/10 bg-[#ece8dd] px-6 py-5">
          <div
            className={
              mobile
                ? "mx-auto flex max-w-7xl flex-col gap-3 text-xs text-[#4b5563]"
                : "mx-auto flex max-w-7xl items-center justify-between gap-6 text-xs text-[#4b5563]"
            }
          >
            <p>© 2026 {mini.brand}. Portfolio personal.</p>
            <div className="flex flex-wrap gap-4">
              <span className="inline-flex items-center gap-2">
                <UserRound size={14} />
                {mini.subtitle}
              </span>
              <span className="inline-flex items-center gap-2">
                <Award size={14} />
                Selected work
              </span>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}