import { useState } from "react";
import {
  ArrowUpRight,
  CheckCircle2,
  Heart,
  Menu,
  Search,
  ShieldCheck,
  ShoppingBag,
  Star,
  Truck,
  X,
} from "lucide-react";
import { NavButton, navTarget, scrollToSection } from "./shared.jsx";

const defaultProducts = [
  {
    title: "oversized signature tee",
    category: "tricou premium / oversized fit",
    price: "249 lei",
    tag: "new",
    image: "/images/minisite/vlom-oversized-tee.png",
  },
  {
    title: "heavy cotton hoodie",
    category: "hanorac premium / relaxed fit",
    price: "389 lei",
    tag: "drop",
    image: "/images/minisite/vlom-hoodie.png",
  },
  {
    title: "utility crossbody bag",
    category: "geantă crossbody / daily carry",
    price: "219 lei",
    tag: "best",
    image: "/images/minisite/vlom-crossbody-bag.png",
  },
  {
    title: "black low sneakers",
    category: "sneakers low-top / all black",
    price: "449 lei",
    tag: "limited",
    image: "/images/minisite/vlom-low-sneakers.png",
  },
];

const defaultBenefits = [
  { value: "24h", label: "procesare comandă" },
  { value: "14 zile", label: "retur simplu" },
  { value: "100%", label: "plată securizată" },
  { value: "4.8", label: "rating clienți" },
];

function VlomCustLogo({ compact = false }) {
  return (
    <img
      src="/images/minisite/vlom-cust-logo.png"
      alt="VLØM.CUST"
      className={
        compact
          ? "h-9 w-auto object-contain"
          : "h-12 w-auto object-contain"
      }
      draggable={false}
    />
  );
}

function targetForNav(item = "") {
  const label = item.toLowerCase();

  if (label.includes("acasă") || label.includes("home")) return "home";
  if (label.includes("shop") || label.includes("nout")) return "shop";
  if (label.includes("lookbook") || label.includes("brand")) return "lookbook";
  if (label.includes("benef")) return "benefits";
  if (label.includes("contact")) return "contact";

  return navTarget(item);
}

function SectionLabel({ children, light = false }) {
  return (
    <p
      className={
        light
          ? "text-xs font-black uppercase tracking-[0.12em] text-[#a3e635]"
          : "text-xs font-black uppercase tracking-[0.12em] text-[#f97316]"
      }
    >
      {children}
    </p>
  );
}

function SectionTitle({ children, mobile = false, light = false }) {
  return (
    <h2
      className={`mt-3 max-w-4xl font-black uppercase leading-[0.92] tracking-[-0.065em] ${
        light ? "text-white" : "text-[#111111]"
      }`}
      style={{
        fontSize: mobile
          ? "clamp(2.35rem, 11cqw, 3.5rem)"
          : "clamp(3rem, 5.8cqw, 5.4rem)",
        wordBreak: "normal",
        overflowWrap: "normal",
        hyphens: "none",
      }}
    >
      {children}
    </h2>
  );
}

function AnnouncementBar({ items = [] }) {
  const list = items.length
    ? items
    : ["limited drop", "premium streetwear", "secure checkout", "fast delivery"];

  return (
    <div className="flex gap-5 overflow-hidden border-b border-[#111111] bg-[#111111] px-5 py-3 text-white">
      {[...list, ...list].map((item, index) => (
        <span
          key={`${item}-${index}`}
          className="shrink-0 text-[0.68rem] font-black uppercase tracking-[0.12em] text-white/80"
        >
          / {item}
        </span>
      ))}
    </div>
  );
}

function HeroImageSection({ mini, mobile }) {
  const heroImage =
    mini.heroImage || "/images/minisite/vlom-hero-tshirt-banner.png";

  const heroTitle = (mini.headline || mini.heroWord || "streetwear premium")
    .replace(/\bcustom\b/gi, "")
    .replace(/\s+/g, " ")
    .trim();

  return (
    <section
      data-mini-section="home"
      className="relative min-h-[34rem] overflow-hidden border-b border-[#111111] bg-[#111111] md:min-h-[43rem]"
      style={{ containerType: "inline-size" }}
    >
      <img
        src={heroImage}
        alt={mini.brand || "VLØM.CUST"}
        className="absolute inset-0 h-full w-full object-cover"
        draggable={false}
      />

      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,.82)_0%,rgba(0,0,0,.52)_42%,rgba(0,0,0,.10)_100%)]" />

      <div className="relative z-10 flex min-h-[34rem] items-end px-5 py-10 md:min-h-[43rem] md:px-10 md:py-14">
        <div className="max-w-4xl">
          <p className="inline-flex bg-[#a3e635] px-4 py-2 text-[0.68rem] font-black uppercase tracking-[0.12em] text-[#111111]">
            {mini.accent || "drop 01 / live now"}
          </p>

          <h1
            className="mt-5 max-w-4xl font-black uppercase leading-[0.86] tracking-[-0.075em] text-white"
            style={{
              fontSize: mobile
                ? "clamp(2.8rem, 13cqw, 4.7rem)"
                : "clamp(5rem, 9cqw, 8.5rem)",
              wordBreak: "normal",
              overflowWrap: "normal",
              hyphens: "none",
            }}
          >
            {heroTitle}
          </h1>

          <p className="mt-6 max-w-xl text-sm font-semibold leading-7 text-white/78">
            {mini.description}
          </p>
        </div>
      </div>
    </section>
  );
}

function getProductImage(product = {}) {
  const title = String(product.title || "").toLowerCase();
  const category = String(product.category || "").toLowerCase();

  if (
    title.includes("tee") ||
    title.includes("tricou") ||
    title.includes("oversized")
  ) {
    return "/images/minisite/vlom-oversized-tee.png";
  }

  if (title.includes("hoodie") || title.includes("hanorac")) {
    return "/images/minisite/vlom-hoodie.png";
  }

  if (
    title.includes("bag") ||
    title.includes("crossbody") ||
    category.includes("geantă") ||
    category.includes("geanta")
  ) {
    return "/images/minisite/vlom-crossbody-bag.png";
  }

  if (title.includes("sneaker") || category.includes("sneaker")) {
    return "/images/minisite/vlom-low-sneakers.png";
  }

  return product.image || "/images/minisite/vlom-oversized-tee.png";
}

function ProductVisual({ product = {} }) {
  const image = getProductImage(product);

  return (
    <div className="relative aspect-square min-w-0 overflow-hidden border-b border-[#111111] bg-[#f4f4ef]">
      <img
        src={image}
        alt={product.title || "VLØM.CUST product"}
        className="h-full w-full object-cover"
        draggable={false}
      />

      <div className="absolute left-4 top-4 bg-[#a3e635] px-3 py-1 text-[0.62rem] font-black uppercase text-[#111111]">
        {product.tag || "drop"}
      </div>
    </div>
  );
}

function ProductCard({ product }) {
  return (
    <article className="group min-w-0 overflow-hidden border border-[#111111] bg-white">
      <ProductVisual product={product} />

      <div className="p-4">
        <div className="mb-4 flex items-center justify-between gap-3">
          <span className="bg-[#a3e635] px-2.5 py-1 text-[0.62rem] font-black uppercase text-[#111111]">
            {product.tag}
          </span>

          <button
            type="button"
            aria-label="Adaugă la favorite"
            className="grid h-9 w-9 shrink-0 place-items-center border border-[#111111] bg-white transition group-hover:bg-[#111111] group-hover:text-white"
          >
            <Heart size={15} />
          </button>
        </div>

        <h3 className="text-lg font-black uppercase leading-tight tracking-[-0.035em] text-[#111111]">
          {product.title}
        </h3>

        <p className="mt-1 text-sm font-bold text-[#6b7280]">
          {product.category}
        </p>

        <div className="mt-5 flex items-end justify-between gap-4">
          <p className="text-xl font-black text-[#111111]">{product.price}</p>

          <button
            type="button"
            className="inline-flex items-center gap-2 bg-[#111111] px-4 py-3 text-[0.68rem] font-black uppercase text-white"
          >
            add
            <ArrowUpRight size={14} />
          </button>
        </div>
      </div>
    </article>
  );
}

function BenefitCard({ benefit, index }) {
  const icons = [Truck, ShieldCheck, CheckCircle2, Star];
  const Icon = icons[index % icons.length];

  return (
    <article className="min-w-0 border border-white/15 bg-white/[0.06] p-5">
      <Icon size={20} className="text-[#a3e635]" />

      <p className="mt-4 text-2xl font-black uppercase text-white">
        {benefit.value}
      </p>

      <p className="mt-1 text-sm font-semibold text-white/55">
        {benefit.label}
      </p>
    </article>
  );
}

function ReviewCard({ review }) {
  return (
    <article className="min-w-0 border border-[#111111] bg-[#f4f4ef] p-5">
      <div className="flex items-center gap-1 text-[#f97316]">
        {Array.from({ length: review.stars || 5 }).map((_, index) => (
          <Star key={`${review.name}-${index}`} size={14} fill="currentColor" />
        ))}
      </div>

      <p className="mt-4 text-sm font-semibold leading-7 text-[#374151]">
        “{review.text}”
      </p>

      <p className="mt-5 text-sm font-black uppercase text-[#111111]">
        {review.name}
      </p>
    </article>
  );
}

export default function ShopSiteMockup({ mini, contentRef, isMobile }) {
  const mobile = Boolean(isMobile);
  const [menuOpen, setMenuOpen] = useState(false);

  const nav = (
    mini.nav || ["Acasă", "Shop", "Lookbook", "Beneficii", "Contact"]
  ).filter((item) => {
    const label = String(item || "").toLowerCase();

    return !label.includes("categor") && !label.includes("colec");
  });

  const products = mini.products?.length ? mini.products : defaultProducts;
  const benefits = mini.benefits?.length ? mini.benefits : defaultBenefits;
  const reviews = mini.reviews || [];

  function handleNavClick(item) {
    scrollToSection(contentRef, targetForNav(item));
    setMenuOpen(false);
  }

  return (
    <div
      ref={contentRef}
      className="h-full overflow-y-auto overflow-x-hidden bg-[#f4f4ef] text-[#111111]"
    >
      <header className="sticky top-0 z-40 border-b border-[#111111] bg-[#f4f4ef]/95 px-5 py-3 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <VlomCustLogo compact={mobile} />

          {!mobile ? (
            <nav className="flex items-center gap-5">
              {nav.map((item) => (
                <NavButton key={item} onClick={() => handleNavClick(item)}>
                  {item}
                </NavButton>
              ))}
            </nav>
          ) : null}

          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Caută produse"
              className="grid h-10 w-10 place-items-center border border-[#111111] bg-white"
            >
              <Search size={16} />
            </button>

            <button
              type="button"
              aria-label="Coș cumpărături"
              className="relative grid h-10 w-10 place-items-center bg-[#111111] text-white"
            >
              <ShoppingBag size={16} />

              <span className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center bg-[#a3e635] text-[0.62rem] font-black text-[#111111]">
                2
              </span>
            </button>

            {mobile ? (
              <button
                type="button"
                aria-label={menuOpen ? "Închide meniul" : "Deschide meniul"}
                onClick={() => setMenuOpen((value) => !value)}
                className="grid h-10 w-10 place-items-center border border-[#111111] bg-white"
              >
                {menuOpen ? <X size={17} /> : <Menu size={17} />}
              </button>
            ) : null}
          </div>
        </div>

        {mobile && menuOpen ? (
          <nav className="mt-4 grid gap-2 border-t border-[#111111]/10 pt-4">
            {nav.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => handleNavClick(item)}
                className="border border-[#111111] bg-white px-4 py-3 text-left text-xs font-black uppercase tracking-[0.08em]"
              >
                {item}
              </button>
            ))}
          </nav>
        ) : null}
      </header>

      <HeroImageSection mini={mini} mobile={mobile} />

      <AnnouncementBar items={mini.marquee} />

      <main>
        <section
          data-mini-section="shop"
          className="border-b border-[#111111] bg-white px-6 py-12 md:px-10"
          style={{ containerType: "inline-size" }}
        >
          <div className="mx-auto max-w-7xl">
            <div className="mb-8 flex flex-wrap items-end justify-between gap-5">
              <div>
                <SectionLabel>new arrivals</SectionLabel>

                <SectionTitle mobile={mobile}>
                  Produse din drop-ul curent.
                </SectionTitle>
              </div>

              <button
                type="button"
                onClick={() => scrollToSection(contentRef, "contact")}
                className="inline-flex items-center gap-2 bg-[#111111] px-5 py-4 text-xs font-black uppercase tracking-[0.08em] text-white"
              >
                custom order
                <ArrowUpRight size={15} />
              </button>
            </div>

            <div
              className="grid gap-4"
              style={{
                gridTemplateColumns: mobile
                  ? "1fr"
                  : "repeat(auto-fit, minmax(14rem, 1fr))",
              }}
            >
              {products.slice(0, 4).map((product) => (
                <ProductCard key={product.title} product={product} />
              ))}
            </div>
          </div>
        </section>

        <section
          data-mini-section="lookbook"
          className="border-t border-[#111111] bg-[#f4f4ef] px-6 py-12 md:px-10"
          style={{ containerType: "inline-size" }}
        >
          <div
            className="mx-auto grid max-w-7xl gap-6"
            style={{
              gridTemplateColumns: mobile
                ? "1fr"
                : "minmax(18rem, 1.05fr) minmax(0, 0.95fr)",
            }}
          >
            <div className="relative min-h-[34rem] overflow-hidden border border-[#111111] bg-[#111111]">
              <img
                src={
                  mini.lookbookImage ||
                  "/images/minisite/vlom-lookbook-outfit.png"
                }
                alt="VLØM.CUST lookbook outfit"
                className="absolute inset-0 h-full w-full object-cover"
                draggable={false}
              />

              <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(0,0,0,.68)_0%,rgba(0,0,0,.08)_58%)]" />

              <div className="absolute left-6 top-6 bg-[#a3e635] px-4 py-2 text-xs font-black uppercase tracking-[0.1em] text-[#111111]">
                lookbook
              </div>

              <div
                className={
                  mobile
                    ? "absolute bottom-4 left-4 right-4 border border-white/15 bg-black/45 p-4 text-white backdrop-blur-md"
                    : "absolute bottom-6 left-6 right-6 border border-white/15 bg-white/10 p-5 text-white backdrop-blur"
                }
              >
                <p className="text-[0.68rem] font-black uppercase tracking-[0.12em] text-[#a3e635]">
                  styling guide
                </p>

                <h3
                  className={
                    mobile
                      ? "mt-3 max-w-full text-[1.45rem] font-black uppercase leading-[0.95] tracking-[-0.035em]"
                      : "mt-3 text-4xl font-black uppercase leading-[0.9] tracking-[-0.05em]"
                  }
                  style={{
                    wordBreak: "normal",
                    overflowWrap: "normal",
                    hyphens: "none",
                    textWrap: "balance",
                  }}
                >
                  hoodie, crossbody bag, loose denim și sneakers all black.
                </h3>
              </div>
            </div>

            <div className="min-w-0 border border-[#111111] bg-white p-6">
              <SectionLabel>brand story</SectionLabel>

              <h2 className="mt-4 text-4xl font-black uppercase leading-none tracking-[-0.05em]">
                {mini.brandStoryTitle}
              </h2>

              <p className="mt-5 text-sm font-semibold leading-7 text-[#4b5563]">
                {mini.brandStory}
              </p>

              <div className="mt-7 grid gap-3">
                {[
                  "drop-uri scurte, ușor de urmărit",
                  "produse premium cu identitate vizuală clară",
                  "experiență de cumpărare rapidă și coerentă",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 border border-[#111111] bg-[#f4f4ef] p-4"
                  >
                    <CheckCircle2
                      size={18}
                      className="shrink-0 text-[#f97316]"
                    />

                    <p className="text-sm font-black uppercase leading-5">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {reviews.length ? (
          <section className="border-y border-[#111111] bg-white px-6 py-12 md:px-10">
            <div className="mx-auto max-w-7xl">
              <SectionLabel>reviews</SectionLabel>

              <h2 className="mt-3 text-4xl font-black uppercase leading-none tracking-[-0.05em]">
                Feedback de la clienți.
              </h2>

              <div
                className="mt-8 grid gap-4"
                style={{
                  gridTemplateColumns: mobile
                    ? "1fr"
                    : "repeat(auto-fit, minmax(14rem, 1fr))",
                }}
              >
                {reviews.slice(0, 3).map((review) => (
                  <ReviewCard key={review.name} review={review} />
                ))}
              </div>
            </div>
          </section>
        ) : null}

        <section
          data-mini-section="benefits"
          className="bg-[#111111] px-6 py-12 text-white md:px-10"
          style={{ containerType: "inline-size" }}
        >
          <div className="mx-auto max-w-7xl">
            <div
              className="grid gap-8"
              style={{
                gridTemplateColumns: mobile
                  ? "1fr"
                  : "minmax(0, 0.8fr) minmax(18rem, 1.2fr)",
              }}
            >
              <div className="min-w-0">
                <SectionLabel light>shop benefits</SectionLabel>

                <SectionTitle mobile={mobile} light>
                  Comandă simplă, livrare clară, checkout sigur.
                </SectionTitle>

                <p className="mt-5 max-w-lg text-sm font-semibold leading-7 text-white/62">
                  {mini.benefitsTitle ||
                    "Un shop construit pentru cumpărare rapidă, produse clare și încredere înainte de checkout."}
                </p>
              </div>

              <div
                className="grid gap-4"
                style={{
                  gridTemplateColumns: mobile
                    ? "1fr"
                    : "repeat(2, minmax(0, 1fr))",
                }}
              >
                {benefits.slice(0, 4).map((benefit, index) => (
                  <BenefitCard
                    key={benefit.label}
                    benefit={benefit}
                    index={index}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        <section
          data-mini-section="contact"
          className="grid bg-[#a3e635]"
          style={{
            gridTemplateColumns: mobile
              ? "1fr"
              : "minmax(0, 1fr) minmax(18rem, 0.75fr)",
          }}
        >
          <div className="min-w-0 p-6 md:p-10">
            <p className="text-xs font-black uppercase tracking-[0.12em] text-[#111111]/70">
              {mini.contact?.email}
            </p>

            <h2 className="mt-4 max-w-3xl text-5xl font-black uppercase leading-[0.92] tracking-[-0.06em] text-[#111111]">
              {mini.contactTitle || "Creează-ți propriul look unic."}
            </h2>
          </div>

          <div className="border-t border-[#111111] p-6 md:border-l md:border-t-0 md:p-10">
            <button
              type="button"
              className="inline-flex w-full items-center justify-center gap-2 bg-[#111111] px-6 py-5 text-xs font-black uppercase tracking-[0.08em] text-white"
            >
              începe comanda
              <ArrowUpRight size={15} />
            </button>

            <div className="mt-5 grid gap-2 text-sm font-bold text-[#111111]/70">
              <p>{mini.contact?.phone}</p>
              <p>{mini.contact?.address}</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}