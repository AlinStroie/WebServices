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
  },
  {
    title: "Web Design",
    text: "Landing page-uri, portofolii și interfețe responsive cu structură clară și impact vizual.",
  },
  {
    title: "Frontend",
    text: "Implementări rapide, curate și ușor de extins, pregătite pentru proiecte reale.",
  },
  {
    title: "Brand Assets",
    text: "Elemente vizuale pentru social media, campanii, lansări și comunicare digitală.",
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
    text: "Andrei a transformat o idee vagă într-o identitate vizuală clară, ușor de folosit și memorabilă.",
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
    .slice(0, 3)
    .toUpperCase();
}

function PortfolioMark({ brand, compact = false }) {
  const initials = getInitials(brand);

  return (
    <div className="flex min-w-0 items-center gap-3">
      <span
        className={
          compact
            ? "grid h-10 w-10 shrink-0 place-items-center bg-[#111111] text-xs font-black text-[#f4c430] shadow-[4px_4px_0_#2563eb]"
            : "grid h-12 w-12 shrink-0 place-items-center bg-[#111111] text-sm font-black text-[#f4c430] shadow-[5px_5px_0_#2563eb]"
        }
      >
        {initials}
      </span>

      <span className={compact ? "min-w-0 max-w-[9.5rem]" : "min-w-0"}>
        <span
          className={
            compact
              ? "block text-[0.72rem] font-black leading-[0.98] text-[#111111]"
              : "block text-sm font-black leading-tight text-[#111111]"
          }
        >
          {brand}
        </span>

        <span className="mt-1 block text-[0.62rem] font-bold uppercase tracking-[0.08em] text-[#64748b]">
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

function SectionTitle({
  children,
  mobile,
  light = false,
  compact = false,
  className = "",
}) {
  return (
    <h2
      className={`mt-4 max-w-full font-black leading-[0.98] tracking-[-0.055em] ${
        light ? "text-white" : "text-[#111111]"
      } ${className}`}
      style={{
        fontSize: compact
          ? mobile
            ? "clamp(2rem, 9cqw, 2.8rem)"
            : "clamp(2.4rem, 4.2cqw, 3.45rem)"
          : mobile
            ? "clamp(2.05rem, 9.5cqw, 3rem)"
            : "clamp(2.55rem, 4.6cqw, 4.25rem)",
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
  const skills = mini.skills?.slice(0, 4) || [];

  return (
    <div
      className={
        mobile
          ? "relative min-h-[31rem] overflow-hidden bg-[#111111]"
          : "relative min-h-[40rem] overflow-hidden bg-[#111111]"
      }
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(244,196,48,.38),transparent_29%),radial-gradient(circle_at_82%_78%,rgba(37,99,235,.42),transparent_36%),linear-gradient(135deg,#111111_0%,#18181b_48%,#f4c430_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,.07)_1px,transparent_1px),linear-gradient(rgba(255,255,255,.07)_1px,transparent_1px)] [background-size:36px_36px]" />

      <div
        className={
          mobile
            ? "absolute left-1/2 top-16 h-64 w-64 -translate-x-1/2"
            : "absolute left-1/2 top-1/2 h-[22rem] w-[22rem] -translate-x-1/2 -translate-y-1/2"
        }
      >
        <div className="absolute inset-0 rotate-6 bg-[#2563eb]" />
        <div className="absolute inset-4 -rotate-3 border-[1.4rem] border-[#f4c430] bg-[#111111]" />

        <div className="absolute left-8 top-9 h-20 w-20 rounded-full bg-[#f4c430]" />
        <div className="absolute right-10 top-14 h-14 w-28 bg-white/12 backdrop-blur-md" />
        <div className="absolute bottom-12 left-12 h-16 w-32 bg-[#2563eb]" />
        <div className="absolute bottom-16 right-12 h-24 w-4 bg-[#f4c430]" />

        <div className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rotate-45 border border-white/20 bg-white/10 backdrop-blur-md" />

        <div className="absolute inset-x-10 bottom-8 grid grid-cols-3 gap-2">
          {["UI", "WEB", "BRAND"].map((item) => (
            <span
              key={item}
              className="border border-white/15 bg-white/10 px-2 py-2 text-center text-[0.62rem] font-black uppercase tracking-[0.08em] text-white"
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      <div
        className={
          mobile
            ? "absolute bottom-6 left-5 right-5 grid grid-cols-2 gap-2"
            : "absolute bottom-8 left-8 right-8 grid grid-cols-2 gap-3 xl:grid-cols-4"
        }
      >
        {skills.map((skill) => (
          <span
            key={skill}
            className="min-w-0 border border-white/15 bg-white/10 px-3 py-3 text-center text-[0.68rem] font-black uppercase tracking-[0.06em] text-white backdrop-blur-md"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}

function SkillPanel({ skills = [] }) {
  const skillList = skills.length
    ? skills
    : ["Figma", "React", "Tailwind", "Illustrator", "Photoshop", "UI/UX"];

  const focusAreas = [
    {
      title: "Design system",
      text: "Componente, reguli vizuale și consistență de brand.",
      value: "95%",
    },
    {
      title: "Frontend UI",
      text: "Interfețe responsive, curate și ușor de extins.",
      value: "90%",
    },
    {
      title: "Brand assets",
      text: "Materiale vizuale pentru lansări și comunicare digitală.",
      value: "88%",
    },
  ];

  return (
    <div className="min-w-0 border border-[#111111]/10 bg-[#111111] p-5 text-white">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.08em] text-[#f4c430]">
            Creative stack
          </p>
          <h3 className="mt-3 max-w-xs text-2xl font-black leading-tight tracking-[-0.04em]">
            Tool-uri și direcții folosite în proiecte reale.
          </h3>
        </div>

        <span className="grid h-12 w-12 shrink-0 place-items-center bg-[#f4c430] text-[#111111] shadow-[5px_5px_0_#2563eb]">
          <Sparkles size={18} />
        </span>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {skillList.map((skill) => (
          <span
            key={skill}
            className="border border-white/10 bg-white/10 px-3 py-2 text-[0.65rem] font-black uppercase tracking-[0.06em] text-white/85"
          >
            {skill}
          </span>
        ))}
      </div>

      <div className="mt-7 grid gap-3">
        {focusAreas.map((area) => (
          <div
            key={area.title}
            className="border border-white/10 bg-white/[0.06] p-4"
          >
            <div className="flex items-center justify-between gap-4">
              <p className="text-sm font-black text-white">{area.title}</p>
              <span className="text-xs font-black text-[#f4c430]">
                {area.value}
              </span>
            </div>

            <p className="mt-2 text-xs leading-5 text-white/60">{area.text}</p>

            <div className="mt-4 h-2 bg-white/10">
              <div
                className="h-full bg-[#f4c430]"
                style={{ width: area.value }}
              />
            </div>
          </div>
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
        <ExternalLink size={16} className="shrink-0 text-[#f4c430]" />
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
        <CheckCircle2 size={18} className="shrink-0 text-[#2563eb]" />
      </div>

      <h3 className="text-lg font-black leading-tight text-[#111111]">
        {item.title}
      </h3>

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
  const email = mini.contact?.email || "contact@andreicrisandesign.ro";
  const phone = mini.contact?.phone || "+40 700 777 888";
  const location = mini.contact?.address || "Remote / România";
  const social = mini.contact?.social || "@andreicrisandesign";

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

      <ContactLine
        mobile={mobile}
        icon={MapPin}
        label="Locație"
        value={location}
      />

      <ContactLine
        mobile={mobile}
        icon={MessageCircle}
        label="Social"
        value={social}
      />
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
                  onClick={() =>
                    scrollToSection(contentRef, targetForNav(item))
                  }
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
                  className="mt-5 max-w-full font-black uppercase leading-[0.94] tracking-[-0.065em] text-[#111111]"
                  style={{
                    fontSize: "clamp(2.6rem, 12cqw, 4rem)",
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
              className="grid min-h-[42rem]"
              style={{
                gridTemplateColumns: "repeat(auto-fit, minmax(20rem, 1fr))",
              }}
            >
              <div className="flex min-w-0 flex-col justify-center border-r border-[#111111]/10 px-10 py-14">
                <SectionEyebrow>{mini.eyebrow}</SectionEyebrow>

                <p className="mt-6 inline-flex w-fit bg-[#f4c430] px-4 py-2 text-[0.7rem] font-black uppercase tracking-[0.08em] text-[#111111]">
                  {mini.accent}
                </p>

                <h1
                  className="mt-5 max-w-[34rem] font-black uppercase leading-[0.94] tracking-[-0.068em] text-[#111111]"
                  style={{
                    fontSize: "clamp(3rem, 4.8cqw, 5.2rem)",
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
                : "repeat(auto-fit, minmax(9rem, 1fr))",
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
              className="grid gap-8"
              style={{
                gridTemplateColumns: mobile
                  ? "1fr"
                  : "repeat(auto-fit, minmax(18rem, 1fr))",
              }}
            >
              <div className="min-w-0">
                <SectionEyebrow light>Selected projects</SectionEyebrow>
                <SectionTitle mobile={mobile} light>
                  Proiecte care arată direcția, detaliul și rezultatul final.
                </SectionTitle>
              </div>

              <p className="max-w-xl self-end text-sm leading-7 text-white/62">
                {mini.projectsText ||
                  "O selecție de lucrări construite pentru branduri, website-uri și campanii digitale cu personalitate vizuală clară."}
              </p>
            </div>

            <div
              className="mt-10 grid gap-5"
              style={{
                gridTemplateColumns: mobile
                  ? "1fr"
                  : "repeat(auto-fit, minmax(16rem, 1fr))",
              }}
            >
              {projects.slice(0, 3).map((project, index) => (
                <ProjectCard
                  key={project.title}
                  project={project}
                  index={index}
                />
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
                  : "repeat(auto-fit, minmax(14rem, 1fr))",
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
          <div className="mx-auto max-w-7xl">
            <div className="max-w-4xl">
              <SectionEyebrow>Proces & experiență</SectionEyebrow>

              <SectionTitle mobile={mobile} compact>
                Un flux clar, de la idee la livrare.
              </SectionTitle>
            </div>

            <div
              className="mt-8 grid gap-4"
              style={{
                gridTemplateColumns: mobile
                  ? "1fr"
                  : "repeat(auto-fit, minmax(12.5rem, 1fr))",
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
                  : "repeat(auto-fit, minmax(16rem, 1fr))",
              }}
            >
              <div className="grid min-w-0 gap-3 border-l border-[#111111]/10 pl-4">
                {timeline.slice(0, 3).map((item, index) => (
                  <TimelineItem key={item.role} item={item} index={index} />
                ))}
              </div>

              <SkillPanel skills={mini.skills} />
            </div>
          </div>
        </section>

        <section className="bg-[#f7f3e8] px-6 py-14">
          <div
            className="mx-auto grid max-w-7xl gap-8"
            style={{
              gridTemplateColumns: mobile
                ? "1fr"
                : "repeat(auto-fit, minmax(18rem, 1fr))",
            }}
          >
            <div className="min-w-0">
              <SectionEyebrow>Feedback</SectionEyebrow>

              <SectionTitle mobile={mobile} compact>
                Colaborări clare, livrări curate și rezultate vizibile.
              </SectionTitle>
            </div>

            <div
              className="grid min-w-0 gap-4"
              style={{
                gridTemplateColumns: mobile
                  ? "1fr"
                  : "repeat(auto-fit, minmax(13rem, 1fr))",
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
                : "repeat(auto-fit, minmax(18rem, 1fr))",
            }}
          >
            <div className="min-w-0">
              <SectionEyebrow light>Contact</SectionEyebrow>

              <SectionTitle mobile={mobile} light compact>
                {mini.contactTitle || "Hai să construim ceva memorabil."}
              </SectionTitle>

              <p className="mt-5 max-w-xl text-sm leading-7 text-white/70">
                {mini.contactText ||
                  "Scrie pentru identitate vizuală, website-uri, interfețe sau materiale digitale. Răspund rapid cu pașii următori."}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={`mailto:${
                    mini.contact?.email || "contact@andreicrisandesign.ro"
                  }`}
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