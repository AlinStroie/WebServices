import { useState } from "react";
import {
  ArrowRight,
  Award,
  ChevronDown,
  Clock3,
  Mail,
  MapPin,
  Menu,
  Phone,
  ShoppingBag,
  Sparkles,
  Star,
  Utensils,
  X,
} from "lucide-react";
import { NavButton, navTarget, scrollToSection } from "./shared.jsx";

const productCardTones = [
  "bg-[#fff7ed]",
  "bg-[#ecfdf5]",
  "bg-[#fefce8]",
  "bg-[#f5f3ff]",
];

// Imaginea principală din hero.
// Fișierul trebuie să fie în: public/images/minisite/hieu-bowl-hero.png
const HERO_BOWL_IMAGE = "/images/minisite/hieu-bowl-hero.png";

// Logo-ul folosit în navbar și în secțiunea About.
// Fișierul trebuie să fie în: public/images/minisite/hieu-bowl-logo.png
const HIEU_BOWL_LOGO = "/images/minisite/hieu-bowl-logo.png";

const defaultDishes = [
  {
    title: "chicken teriyaki bowl",
    text: "orez jasmine, pui teriyaki, edamame, morcov, castravete și sos dulce-sărat.",
    price: "34 lei",
    tag: "hot",
    category: "teriyaki bowl",
    image: "/images/minisite/hieu-chicken-teriyaki-bowl.png",
  },
  {
    title: "bibimbap cu orez",
    text: "orez cald, vită marinată, spanac, kimchi, morcov și mix de legume asiatice.",
    price: "36 lei",
    tag: "new",
    category: "korean rice",
    image: "/images/minisite/hieu-bibimbap-cu-orez.png",
  },
  {
    title: "thai basil beef rice",
    text: "orez cu vită aromată, busuioc thailandez, ardei, ceapă verde și sos fresh.",
    price: "38 lei",
    tag: "hot",
    category: "thai rice",
    image: "/images/minisite/hieu-thai-basil-beef-rice.png",
  },
  {
    title: "salmon poke rice",
    text: "orez sushi, somon, avocado, mango, castravete și topping crocant.",
    price: "39 lei",
    tag: "fresh",
    category: "poke bowl",
    image: "/images/minisite/hieu-salmon-poke-rice.png",
  },
];

const defaultReviews = [
  {
    name: "Ana M.",
    stars: 5,
    text: "Boluri foarte fresh, servire rapidă și combinații echilibrate.",
  },
  {
    name: "Radu C.",
    stars: 4,
    text: "Loc plăcut și meniu clar, ideal pentru prânz sau cină rapidă.",
  },
  {
    name: "Bianca T.",
    stars: 5,
    text: "Ingrediente bune, plating curat și preparate pe care le reiei ușor.",
  },
];

function targetForNav(item) {
  if (item.includes("Despre")) return "about";
  if (item.includes("Meniu") || item.includes("Servicii")) return "services";
  if (item.includes("Rezerv") || item.includes("Contact")) return "contact";

  return navTarget(item);
}

function HieuBowlLogo({ compact = false }) {
  return (
    <img
      src={HIEU_BOWL_LOGO}
      alt="Hieu Bowl"
      className={
        compact
          ? "h-10 w-auto max-w-[5.5rem] object-contain"
          : "h-14 w-auto max-w-[7rem] object-contain"
      }
      draggable={false}
    />
  );
}

function HeroVisual({ mobile = false }) {
  return (
    <div
      className={
        mobile
          ? "relative min-h-[32rem] overflow-hidden bg-[#17382e]"
          : "relative min-h-[40rem] overflow-hidden bg-[#17382e]"
      }
    >
      <img
        src={HERO_BOWL_IMAGE}
        alt="asian bowl"
        className="absolute inset-0 h-full w-full object-cover object-center"
        draggable={false}
      />
    </div>
  );
}

function OrderPanel({ mini, contentRef }) {
  return (
    <div className="border border-[#17382e]/12 bg-white p-5 shadow-[0_24px_60px_rgba(23,56,46,.14)]">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <p className="text-[0.68rem] font-black uppercase tracking-[0.08em] text-[#dc2626]">
            Comandă rapidă
          </p>

          <h4 className="mt-1 text-xl font-black leading-tight text-[#17382e]">
            Alege bowl-ul preferat
          </h4>
        </div>

        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#fff7ed] text-[#dc2626]">
          <ShoppingBag size={19} />
        </span>
      </div>

      <div className="grid gap-2.5">
        {["Tip bowl", "Proteină", "Sos", "Ridicare"].map((field, index) => (
          <button
            key={field}
            type="button"
            className="grid min-w-0 grid-cols-[0.9fr_1.1fr] border border-[#17382e]/12 bg-[#fffaf1] text-left"
          >
            <span className="border-r border-[#17382e]/12 px-4 py-3 text-xs font-bold text-[#64748b]">
              {field}
            </span>

            <span className="flex min-w-0 items-center justify-between gap-2 px-4 py-3 text-xs font-black text-[#17382e]">
              <span className="truncate">
                {index === 0 ? "Signature" : "Alege"}
              </span>
              <ChevronDown size={14} className="shrink-0 text-[#16a34a]" />
            </span>
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={() => scrollToSection(contentRef, "services")}
        className="mt-4 inline-flex w-full items-center justify-center gap-2 bg-[#dc2626] px-5 py-4 text-xs font-black uppercase tracking-[0.04em] text-white transition hover:bg-[#b91c1c]"
      >
        {mini.primaryCta}
        <ArrowRight size={16} />
      </button>
    </div>
  );
}

function FeaturePill({ item }) {
  return (
    <article className="border border-[#17382e]/12 bg-white p-4">
      <h4 className="text-sm font-black text-[#17382e]">{item.title}</h4>
      <p className="mt-2 text-xs leading-5 text-[#64748b]">{item.text}</p>
    </article>
  );
}

function ProductImageSlot({ src, alt }) {
  if (src) {
    return (
      <div className="mb-5 h-44 overflow-hidden border border-[#17382e]/10 bg-white">
        <img
          src={src}
          alt={alt}
          className="h-full w-full object-cover object-center"
          draggable={false}
        />
      </div>
    );
  }

  return (
    <div className="mb-5 grid h-44 place-items-center border border-dashed border-[#17382e]/20 bg-white/65 text-center">
      <div>
        <p className="text-sm font-black tracking-[0.05em] text-[#17382e]">
          imagine preparat
        </p>
        <p className="mt-2 text-xs text-[#64748b]">
          poți adăuga aici fotografia produsului.
        </p>
      </div>
    </div>
  );
}

function MenuCard({ item, index }) {
  return (
    <article
      className={`min-w-0 border border-white/10 p-5 text-[#17382e] ${
        productCardTones[index % productCardTones.length]
      }`}
    >
      <div className="mb-4 flex items-center justify-between gap-4">
        <span className="rounded-full bg-white px-3 py-1 text-[0.65rem] font-black tracking-[0.04em] text-[#dc2626]">
          {item.tag}
        </span>

        <span className="text-xs font-black tracking-[0.05em] text-[#16a34a]">
          {item.category}
        </span>
      </div>

      <ProductImageSlot src={item.image} alt={item.title} />

      <h4 className="text-2xl font-black leading-tight text-[#17382e]">
        {item.title}
      </h4>

      <p className="mt-3 text-sm leading-7 text-[#64748b]">{item.text}</p>

      <div className="mt-5 flex items-center justify-between gap-4">
        <p className="text-2xl font-black text-[#dc2626]">{item.price}</p>

        <button
          type="button"
          className="inline-flex items-center gap-2 bg-[#17382e] px-4 py-3 text-xs font-black uppercase text-white"
        >
          Comandă
          <ArrowRight size={14} />
        </button>
      </div>
    </article>
  );
}

function StatCard({ stat }) {
  return (
    <div className="flex min-w-0 items-center gap-4 border border-[#17382e]/12 bg-white p-4">
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#ecfdf5] text-[#16a34a]">
        <Award size={18} />
      </span>

      <div className="min-w-0">
        <p className="whitespace-nowrap text-2xl font-black leading-none text-[#17382e]">
          {stat.value}
        </p>

        <p className="mt-1 text-[0.65rem] font-black uppercase tracking-[0.05em] text-[#64748b]">
          {stat.label}
        </p>
      </div>
    </div>
  );
}

function ReviewCard({ review }) {
  return (
    <article className="border border-[#17382e]/12 bg-[#fffaf1] p-4">
      <div className="flex items-center gap-1 text-[#fbbf24]">
        {Array.from({ length: review.stars }).map((_, index) => (
          <Star key={`${review.name}-${index}`} size={14} fill="currentColor" />
        ))}
      </div>

      <p className="mt-3 text-sm leading-6 text-[#64748b]">“{review.text}”</p>

      <p className="mt-4 text-xs font-black uppercase tracking-[0.05em] text-[#16a34a]">
        {review.name}
      </p>
    </article>
  );
}

function CommunitySection({ mini, reviews, mobile }) {
  return (
    <section
      className="bg-white px-6 py-12"
      style={{ containerType: "inline-size" }}
    >
      <div className="mx-auto max-w-7xl">
        <p className="text-xs font-black uppercase tracking-[0.08em] text-[#16a34a]">
          Comunitate
        </p>

        <div
          className="mt-6 grid gap-4"
          style={{
            gridTemplateColumns: mobile
              ? "1fr"
              : "repeat(3, minmax(0, 1fr))",
          }}
        >
          {reviews.map((review) => (
            <ReviewCard key={review.name} review={review} />
          ))}
        </div>

        <div className="mt-8 max-w-3xl">
          <h2
            className="font-black leading-tight tracking-[-0.04em] text-[#17382e]"
            style={{
              fontSize: mobile
                ? "clamp(2.1rem, 10cqw, 2.9rem)"
                : "clamp(2.7rem, 5cqw, 4rem)",
              wordBreak: "normal",
              overflowWrap: "normal",
              hyphens: "none",
            }}
          >
            {mini.customersTitle}
          </h2>

          <p className="mt-5 max-w-2xl text-sm leading-7 text-[#64748b]">
            {mini.customersText}
          </p>
        </div>
      </div>
    </section>
  );
}

function ContactItem({ icon: Icon, label, value, mobile = false }) {
  return (
    <div
      className={
        mobile
          ? "flex w-full min-w-0 items-center gap-4 border border-white/20 bg-white/10 p-5"
          : "flex min-h-[6.25rem] min-w-0 items-center gap-4 border border-white/20 bg-white/10 p-5"
      }
    >
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white text-[#dc2626]">
        <Icon size={17} />
      </span>

      <div className="min-w-0 flex-1">
        <p className="text-[0.68rem] font-black uppercase tracking-[0.06em] text-white/75">
          {label}
        </p>

        <p className="mt-1 max-w-full text-sm leading-6 text-white [overflow-wrap:anywhere]">
          {value}
        </p>
      </div>
    </div>
  );
}

function ContactScheduleBlock({ mini, mobile = false }) {
  return (
    <div
      className={mobile ? "grid w-full gap-3" : "grid gap-3 lg:pt-[3.05rem]"}
    >
      <div
        className={
          mobile
            ? "flex w-full items-center gap-4 bg-[#fffaf1] p-5 text-[#17382e]"
            : "flex min-h-[6.25rem] items-center gap-4 bg-[#fffaf1] p-5 text-[#17382e]"
        }
      >
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#ecfdf5] text-[#16a34a]">
          <Clock3 size={18} />
        </span>

        <div className="min-w-0 flex-1">
          <p className="text-[0.68rem] font-black uppercase tracking-[0.08em] text-[#dc2626]">
            Program
          </p>

          <p className="mt-1 text-sm font-black leading-7">
            Luni – Duminică / 10:00 – 22:00
          </p>
        </div>
      </div>

      <div className="w-full border border-white/20 bg-white p-2 text-[#17382e]">
        <div
          className={
            mobile ? "grid gap-2" : "flex min-h-[3.5rem] items-center gap-2"
          }
        >
          <input
            readOnly
            value={mini.contact?.email || "rezervari@hieubowl.ro"}
            className={
              mobile
                ? "w-full min-w-0 bg-transparent px-4 py-3 text-xs text-[#64748b] outline-none"
                : "min-w-0 flex-1 bg-transparent px-4 text-xs text-[#64748b] outline-none"
            }
          />

          <button
            type="button"
            className={
              mobile
                ? "inline-flex h-11 w-full items-center justify-center gap-2 bg-[#17382e] px-4 text-xs font-black uppercase text-white"
                : "inline-flex h-11 shrink-0 items-center gap-2 bg-[#17382e] px-4 text-xs font-black uppercase text-white"
            }
          >
            Trimite
            <Mail size={13} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function RestaurantSiteMockup({ mini, contentRef, isMobile }) {
  const mobile = Boolean(isMobile);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const featureSource =
    mini.highlights?.length ? mini.highlights : mini.items || [];

  const menuSource = mini.menu?.length ? mini.menu : [];

  const menuItems = defaultDishes.map((dish, index) => ({
    ...dish,
    title: menuSource[index]?.title || dish.title,
    text: menuSource[index]?.text || dish.text,
    image: menuSource[index]?.image || dish.image,
    price: menuSource[index]?.price || dish.price,
    category: menuSource[index]?.category || dish.category,
    tag: menuSource[index]?.tag || dish.tag,
  }));

  const reviews =
    mini.reviews?.length && mini.reviews.length >= 3
      ? mini.reviews.slice(0, 3)
      : defaultReviews;

  function handleNavClick(item) {
    scrollToSection(contentRef, targetForNav(item));
    setMobileMenuOpen(false);
  }

  return (
    <div
      ref={contentRef}
      className="h-full overflow-y-auto overflow-x-hidden bg-[#fffaf1] text-[#17382e]"
    >
      <header className="sticky top-0 z-40 border-b border-[#17382e]/12 bg-[#fffaf1]/95 px-5 py-3 backdrop-blur-xl">
        {mobile ? (
          <div>
            <div className="flex items-center justify-between gap-3">
              <HieuBowlLogo compact />

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => scrollToSection(contentRef, "services")}
                  className="shrink-0 bg-[#dc2626] px-3 py-3 text-[0.62rem] font-black uppercase tracking-[0.04em] text-white"
                >
                  Meniu
                </button>

                <button
                  type="button"
                  onClick={() => setMobileMenuOpen((value) => !value)}
                  className="grid h-10 w-10 shrink-0 place-items-center border border-[#17382e]/12 bg-white text-[#17382e]"
                  aria-label={
                    mobileMenuOpen ? "Închide meniul" : "Deschide meniul"
                  }
                >
                  {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
                </button>
              </div>
            </div>

            {mobileMenuOpen ? (
              <nav className="mt-4 grid gap-2 border-t border-[#17382e]/12 pt-4">
                {mini.nav?.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => handleNavClick(item)}
                    className="w-full border border-[#17382e]/12 bg-white px-4 py-3 text-left text-xs font-black uppercase tracking-[0.04em] text-[#17382e]"
                  >
                    {item}
                  </button>
                ))}
              </nav>
            ) : null}
          </div>
        ) : (
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-5">
            <HieuBowlLogo />

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
              onClick={() => scrollToSection(contentRef, "services")}
              className="bg-[#dc2626] px-5 py-3 text-xs font-black uppercase tracking-[0.04em] text-white"
            >
              {mini.secondaryCta}
            </button>
          </div>
        )}
      </header>

      <main>
        <section
          data-mini-section="home"
          className="bg-[#fffaf1]"
          style={{ containerType: "inline-size" }}
        >
          {mobile ? (
            <div>
              <div className="px-6 py-10">
                <div className="mb-6 flex items-center gap-4">
                  <HieuBowlLogo />

                  <div className="min-w-0">
                    <p className="text-xs font-black uppercase tracking-[0.08em] text-[#dc2626]">
                      {mini.eyebrow}
                    </p>

                    <p className="mt-1 text-[0.72rem] leading-5 text-[#64748b]">
                      Asian Bowls • Fresh Food • Restaurant
                    </p>
                  </div>
                </div>

                <p className="font-serif text-4xl font-black italic leading-none text-[#dc2626]">
                  {mini.accent}
                </p>

                <h1
                  className="mt-4 max-w-full font-black uppercase leading-tight tracking-[-0.04em] text-[#17382e]"
                  style={{
                    fontSize: "clamp(2.25rem, 10.5cqw, 3.1rem)",
                    wordBreak: "normal",
                    overflowWrap: "normal",
                    hyphens: "none",
                  }}
                >
                  {mini.headline}
                </h1>

                <p className="mt-5 max-w-xl text-sm leading-7 text-[#64748b]">
                  {mini.description}
                </p>

                <div className="mt-7 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => scrollToSection(contentRef, "services")}
                    className="inline-flex items-center gap-2 bg-[#f97316] px-5 py-3 text-xs font-black uppercase text-white"
                  >
                    {mini.primaryCta}
                    <ArrowRight size={15} />
                  </button>

                  <button
                    type="button"
                    onClick={() => scrollToSection(contentRef, "about")}
                    className="border border-[#17382e]/15 bg-white px-5 py-3 text-xs font-black uppercase text-[#17382e]"
                  >
                    Despre noi
                  </button>
                </div>
              </div>

              <HeroVisual mobile />

              <div className="bg-[#fffaf1] px-6 py-6">
                <OrderPanel mini={mini} contentRef={contentRef} />
              </div>
            </div>
          ) : (
            <div
              className="grid min-h-[42rem]"
              style={{
                gridTemplateColumns: "minmax(0, 0.92fr) minmax(22rem, 1.08fr)",
              }}
            >
              <div className="flex min-w-0 flex-col justify-center border-r border-[#17382e]/12 px-10 py-12">
                <div className="mb-7 flex items-center gap-4">
                  <HieuBowlLogo />

                  <div className="min-w-0">
                    <p className="text-xs font-black uppercase tracking-[0.08em] text-[#dc2626]">
                      {mini.eyebrow}
                    </p>

                    <p className="mt-1 text-[0.72rem] leading-5 text-[#64748b]">
                      Asian Bowls • Fresh Food • Restaurant
                    </p>
                  </div>
                </div>

                <p className="font-serif text-5xl font-black italic leading-none text-[#dc2626]">
                  {mini.accent}
                </p>

                <h1
                  className="mt-4 max-w-[36rem] font-black uppercase leading-tight tracking-[-0.05em] text-[#17382e]"
                  style={{
                    fontSize: "clamp(3rem, 5.4cqw, 5.1rem)",
                    wordBreak: "normal",
                    overflowWrap: "normal",
                    hyphens: "none",
                  }}
                >
                  {mini.headline}
                </h1>

                <p className="mt-6 max-w-xl text-sm leading-7 text-[#64748b]">
                  {mini.description}
                </p>

                <div className="mt-8 flex flex-wrap gap-4">
                  <button
                    type="button"
                    onClick={() => scrollToSection(contentRef, "services")}
                    className="inline-flex items-center gap-2 bg-[#f97316] px-6 py-4 text-xs font-black uppercase text-white"
                  >
                    {mini.primaryCta}
                    <ArrowRight size={16} />
                  </button>

                  <button
                    type="button"
                    onClick={() => scrollToSection(contentRef, "about")}
                    className="border border-[#17382e]/15 bg-white px-6 py-4 text-xs font-black uppercase text-[#17382e]"
                  >
                    Despre noi
                  </button>
                </div>
              </div>

              <div className="relative pb-10">
                <HeroVisual />

                <div className="absolute bottom-8 left-8 right-8 z-10">
                  <OrderPanel mini={mini} contentRef={contentRef} />
                </div>
              </div>
            </div>
          )}
        </section>

        <section className="relative z-10 -mt-5 flex justify-center px-6">
          <button
            type="button"
            onClick={() => scrollToSection(contentRef, "services")}
            className="inline-flex items-center gap-2 bg-[#17382e] px-5 py-3 text-xs font-black uppercase text-white shadow-[0_14px_35px_rgba(23,56,46,.24)]"
          >
            <Utensils size={14} />
            {mini.filterLabel || "Ce aleg astăzi?"}
            <ChevronDown size={14} />
          </button>
        </section>

        <section
          data-mini-section="about"
          className="bg-white px-6 py-12"
          style={{ containerType: "inline-size" }}
        >
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[minmax(18rem,0.8fr)_minmax(0,1.2fr)] lg:items-center">
            <div className="border border-[#17382e]/12 bg-[#fff7ed] p-6">
              <div className="flex items-center gap-5">
                <div className="grid h-28 w-28 shrink-0 place-items-center border border-[#17382e]/10 bg-white p-4 shadow-[0_18px_45px_rgba(23,56,46,.10)]">
                  <img
                    src={HIEU_BOWL_LOGO}
                    alt={mini.brand}
                    className="h-full w-full object-contain"
                    draggable={false}
                  />
                </div>

                <div>
                  <p className="text-xs font-black uppercase tracking-[0.08em] text-[#16a34a]">
                    About
                  </p>

                  <h2 className="mt-2 font-serif text-4xl font-black italic leading-none text-[#dc2626]">
                    {mini.brand}
                  </h2>
                </div>
              </div>

              <div className="mt-6 grid gap-3">
                {featureSource.slice(0, 3).map((item) => (
                  <FeaturePill key={item.title} item={item} />
                ))}
              </div>
            </div>

            <div className="min-w-0">
              <p className="text-xs font-black uppercase tracking-[0.08em] text-[#16a34a]">
                Fresh food, clear concept
              </p>

              <h2
                className="mt-4 max-w-4xl font-black leading-tight tracking-[-0.04em] text-[#17382e]"
                style={{
                  fontSize: mobile
                    ? "clamp(2.25rem, 10.5cqw, 3rem)"
                    : "clamp(2.8rem, 5cqw, 4.4rem)",
                  wordBreak: "normal",
                  overflowWrap: "normal",
                  hyphens: "none",
                }}
              >
                Bowls rapide, ingrediente fresh și experiență urbană.
              </h2>

              <p className="mt-5 max-w-2xl text-sm leading-7 text-[#64748b]">
                {mini.aboutText}
              </p>

              <div
                className="mt-8 grid gap-3"
                style={{
                  gridTemplateColumns: mobile
                    ? "1fr"
                    : "repeat(auto-fit, minmax(9rem, 1fr))",
                }}
              >
                {mini.stats?.slice(0, 4).map((stat) => (
                  <StatCard key={stat.label} stat={stat} />
                ))}
              </div>
            </div>
          </div>
        </section>

        <section
          data-mini-section="services"
          className="bg-[#17382e] px-6 py-12 text-white"
          style={{ containerType: "inline-size" }}
        >
          <div className="mx-auto max-w-7xl">
            <div className="max-w-4xl">
              <p className="text-xs font-black uppercase tracking-[0.08em] text-[#fbbf24]">
                Meniu
              </p>

              <h2
                className="mt-4 font-black leading-tight tracking-[-0.04em]"
                style={{
                  fontSize: mobile
                    ? "clamp(2.2rem, 10cqw, 3rem)"
                    : "clamp(2.7rem, 5cqw, 4.4rem)",
                  wordBreak: "normal",
                  overflowWrap: "normal",
                  hyphens: "none",
                }}
              >
                Fresh bowls, pregătite rapid și ușor de comandat.
              </h2>

              <p className="mt-5 max-w-2xl text-sm leading-7 text-white/65">
                {mini.menuText}
              </p>
            </div>

            <div
              className="mt-10 grid gap-5"
              style={{
                gridTemplateColumns: mobile
                  ? "1fr"
                  : "repeat(auto-fit, minmax(15rem, 1fr))",
              }}
            >
              {menuItems.map((item, index) => (
                <MenuCard key={item.title} item={item} index={index} />
              ))}
            </div>
          </div>
        </section>

        <CommunitySection mini={mini} reviews={reviews} mobile={mobile} />

        <section
          data-mini-section="contact"
          className={
            mobile
              ? "relative overflow-hidden bg-[#dc2626] px-5 py-10 text-white"
              : "relative overflow-hidden bg-[#dc2626] px-6 py-12 text-white"
          }
          style={{ containerType: "inline-size" }}
        >
          <div
            className={
              mobile
                ? "pointer-events-none absolute -right-20 -top-20 h-44 w-44 rounded-full border-[28px] border-[#fbbf24]/40"
                : "absolute -right-16 -top-16 h-52 w-52 rounded-full border-[32px] border-[#fbbf24]/60"
            }
          />
          <div
            className={
              mobile
                ? "pointer-events-none absolute -bottom-24 left-4 h-44 w-44 rounded-full bg-[#f97316]/30"
                : "absolute -bottom-20 left-8 h-52 w-52 rounded-full bg-[#f97316]/40"
            }
          />

          <div
            className={
              mobile
                ? "relative z-10 mx-auto grid max-w-7xl gap-5"
                : "relative z-10 mx-auto grid max-w-7xl gap-8 lg:grid-cols-2 lg:items-start"
            }
          >
            <div className="min-w-0">
              <p className="text-xs font-black uppercase tracking-[0.08em] text-[#fbbf24]">
                Contact
              </p>

              <div className="mt-7 grid gap-3">
                <ContactItem
                  mobile={mobile}
                  icon={Mail}
                  label="Email"
                  value={mini.contact?.email || "rezervari@hieubowl.ro"}
                />

                <ContactItem
                  mobile={mobile}
                  icon={Phone}
                  label="Telefon"
                  value={mini.contact?.phone || "+40 700 555 666"}
                />

                <ContactItem
                  mobile={mobile}
                  icon={MapPin}
                  label="Adresă"
                  value={mini.contact?.address || "Centrul vechi, Brașov"}
                />
              </div>
            </div>

            <ContactScheduleBlock mini={mini} mobile={mobile} />
          </div>
        </section>

        <footer className="border-t border-[#17382e]/12 bg-[#fffaf1] px-6 py-5">
          <div
            className={
              mobile
                ? "mx-auto flex max-w-7xl flex-col gap-3 text-xs text-[#64748b]"
                : "mx-auto flex max-w-7xl items-center justify-between gap-6 text-xs text-[#64748b]"
            }
          >
            <p>© 2024 {mini.brand}. Toate drepturile rezervate.</p>

            <div className="flex flex-wrap gap-4">
              <span className="inline-flex items-center gap-2">
                <Sparkles size={14} />
                Fresh bowls
              </span>

              <span className="inline-flex items-center gap-2">
                <Utensils size={14} />
                Asian food
              </span>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}