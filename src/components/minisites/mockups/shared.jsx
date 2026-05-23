import {
  Calendar,
  CheckCircle,
  Clock,
  HeartPulse,
  Home,
  Package,
  Scissors,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Star,
  Truck,
  User,
  Utensils,
  Zap,
} from "lucide-react";

export const iconMap = {
  kineto: [HeartPulse, ShieldCheck, Zap],
  beauty: [Scissors, Sparkles, Star],
  transport: [Truck, Clock, ShieldCheck],
  restaurant: [Utensils, Star, Calendar],
  personal: [Sparkles, Zap, User],
  shop: [Home, ShoppingBag, Package],
};

export function getMiniSite(project) {
  const fallbackItems = (project.features || []).slice(0, 3).map((feature) => ({
    title: feature,
    text: "Secțiune construită pentru claritate, conversie și navigare rapidă.",
  }));

  return {
    layout: project.miniSite?.layout || project.id || "kineto",
    brand: project.miniSite?.brand || project.title,
    subtitle: project.miniSite?.subtitle || project.category,
    eyebrow: project.miniSite?.eyebrow || project.category,
    headline: project.miniSite?.headline || project.title,
    accent: project.miniSite?.accent || "Design responsive",
    description: project.miniSite?.description || project.text,
    primaryCta: project.miniSite?.primaryCta || "Cere ofertă",
    secondaryCta: project.miniSite?.secondaryCta || "Vezi serviciile",
    contact: project.miniSite?.contact || {
      address: "Brașov, România",
      phone: "+40 700 000 000",
      email: "contact@demo.ro",
    },
    nav: project.miniSite?.nav || ["Acasă", "Servicii", "Contact"],
    items: project.miniSite?.items?.length ? project.miniSite.items : fallbackItems,
    stats: project.miniSite?.stats?.length
      ? project.miniSite.stats
      : [
          { value: "10+", label: "proiecte" },
          { value: "98%", label: "claritate" },
          { value: "24h", label: "contact" },
          { value: "100%", label: "responsive" },
        ],
  };
}

export function scrollToSection(ref, section) {
  const node = ref.current?.querySelector(`[data-mini-section="${section}"]`);
  node?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function navTarget(item) {
  if (item.includes("Servicii") || item.includes("Meniu") || item.includes("Shop")) {
    return "services";
  }
  if (item.includes("Contact") || item.includes("Program")) {
    return "contact";
  }
  return "home";
}

export function NavButton({ children, onClick, dark = false }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`text-[0.62rem] font-semibold transition hover:opacity-100 md:text-xs ${
        dark ? "text-white/70 hover:text-white" : "text-black/65 hover:text-black"
      }`}
    >
      {children}
    </button>
  );
}

export function MiniLogo({ mini, dark = false }) {
  const initials = mini.brand
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="flex items-center gap-2">
      <span
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border text-[0.7rem] font-black ${
          dark
            ? "border-white/15 bg-white/[0.08] text-white"
            : "border-black/10 bg-black text-white"
        }`}
      >
        {initials}
      </span>
      <span>
        <span
          className={`block text-xs font-black leading-none md:text-sm ${
            dark ? "text-white" : "text-black"
          }`}
        >
          {mini.brand}
        </span>
        <span
          className={`mt-1 block text-[0.55rem] uppercase tracking-[0.22em] ${
            dark ? "text-white/45" : "text-black/45"
          }`}
        >
          {mini.subtitle}
        </span>
      </span>
    </div>
  );
}

export function ServiceCards({ mini, projectId, dark = false, compact = false }) {
  const icons = iconMap[projectId] || iconMap.personal;

  return (
    <div className={`grid gap-3 ${compact ? "grid-cols-1" : "md:grid-cols-3"}`}>
      {mini.items.slice(0, 3).map((item, index) => {
        const Icon = icons[index % icons.length];

        return (
          <article
            key={item.title}
            className={`rounded-2xl border p-4 ${
              dark
                ? "border-white/10 bg-white/[0.055] text-white"
                : "border-black/5 bg-white text-black shadow-sm"
            }`}
          >
            <span
              className={`mb-4 flex h-10 w-10 items-center justify-center rounded-full ${
                dark ? "bg-white/10 text-white" : "bg-black text-white"
              }`}
            >
              <Icon size={17} />
            </span>
            <h4 className="text-sm font-bold">{item.title}</h4>
            <p className={`mt-2 text-xs leading-5 ${dark ? "text-white/55" : "text-black/55"}`}>
              {item.text}
            </p>
          </article>
        );
      })}
    </div>
  );
}

export function StatsRow({ mini, dark = false }) {
  return (
    <div
      className={`grid grid-cols-2 gap-3 rounded-3xl border p-4 md:grid-cols-4 ${
        dark ? "border-white/10 bg-white/[0.045]" : "border-black/5 bg-white shadow-sm"
      }`}
    >
      {mini.stats.slice(0, 4).map((stat) => (
        <div key={`${stat.value}-${stat.label}`}>
          <p className={`text-xl font-black ${dark ? "text-white" : "text-black"}`}>
            {stat.value}
          </p>
          <p className={`text-[0.65rem] leading-4 ${dark ? "text-white/45" : "text-black/45"}`}>
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  );
}
