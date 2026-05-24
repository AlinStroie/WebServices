import { ArrowUpRight, CheckCircle2, Menu, Search, Shirt, ShoppingBag, Sparkles, Tag } from "lucide-react";
import { MiniLogo, NavButton, navTarget, scrollToSection } from "./shared.jsx";

function targetForNav(item) {
  if (item.includes("Categor")) return "categories";
  if (item.includes("Benef")) return "benefits";
  if (item.includes("Shop")) return "shop";
  return navTarget(item);
}

function ProductVisual({ tone = "dark", className = "" }) {
  const isDark = tone === "dark";

  return (
    <div className={`relative overflow-hidden border border-[#111111] ${isDark ? "bg-[#111111]" : "bg-[#f4f4ef]"} ${className}`}>
      <div className="absolute inset-0 bg-[linear-gradient(135deg,transparent_0_42%,rgba(132,204,22,.28)_42%_47%,transparent_47%_100%)]" />
      <div className={`absolute left-1/2 top-8 h-32 w-20 -translate-x-1/2 rounded-t-[2rem] ${isDark ? "bg-[#f4f4ef]" : "bg-[#111111]"}`} />
      <div className={`absolute left-1/2 top-16 h-24 w-36 -translate-x-1/2 ${isDark ? "bg-white" : "bg-[#262626]"}`} />
      <div className={`absolute left-1/2 top-24 -translate-x-1/2 -rotate-6 text-lg font-black uppercase ${isDark ? "text-[#111111]" : "text-white"}`}>
        CUSTOM
      </div>
      <div className={`absolute bottom-0 left-1/2 h-24 w-16 -translate-x-[96%] ${isDark ? "bg-[#cbd5e1]" : "bg-[#4b5563]"}`} />
      <div className={`absolute bottom-0 left-1/2 h-24 w-16 -translate-x-[4%] ${isDark ? "bg-[#94a3b8]" : "bg-[#111111]"}`} />
      <div className="absolute right-4 top-4 bg-[#a3e635] px-3 py-1 text-xs font-black text-[#111111]">DROP</div>
    </div>
  );
}

function MiniProduct({ product, index }) {
  return (
    <article className="border border-[#111111] bg-white">
      <ProductVisual tone={index % 2 ? "light" : "dark"} className="h-40 border-x-0 border-t-0" />
      <div className="grid grid-cols-[1fr_auto] items-end gap-3 p-4">
        <div>
          <p className="mb-2 inline-flex bg-[#a3e635] px-2 py-1 text-[0.65rem] font-black uppercase text-[#111111]">
            {product.tag}
          </p>
          <h4 className="text-sm font-black uppercase leading-tight">{product.title}</h4>
          <p className="mt-1 text-xs font-bold text-[#6b7280]">{product.category}</p>
          <p className="mt-3 text-lg font-black">{product.price}</p>
        </div>
        <button type="button" className="grid h-9 w-9 place-items-center bg-[#111111] text-white">
          <ArrowUpRight size={16} />
        </button>
      </div>
    </article>
  );
}

function CategoryCard({ item, index }) {
  const colors = ["bg-[#a3e635]", "bg-[#f97316]", "bg-[#e5e7eb]", "bg-[#d8b4fe]"];

  return (
    <article className={`border border-[#111111] p-4 shadow-[5px_5px_0_#111111] ${colors[index % colors.length]}`}>
      <div className="mb-5 grid h-11 w-11 place-items-center bg-[#111111] text-white">
        {index % 2 ? <Sparkles size={19} /> : <Shirt size={19} />}
      </div>
      <h4 className="text-base font-black uppercase">{item.title}</h4>
      <p className="mt-2 text-xs font-semibold leading-5 text-black/65">{item.text}</p>
    </article>
  );
}

export default function ShopSiteMockup({ mini, contentRef }) {
  const products = mini.products || mini.items || [];
  const categories = mini.categories || mini.items || [];
  const benefits = mini.benefits || mini.stats || [];

  return (
    <div ref={contentRef} className="h-full overflow-y-auto bg-[#f4f4ef] text-[#111111]">
      <header className="sticky top-0 z-30 border-b border-[#111111] bg-[#f4f4ef]/95 px-5 py-3 backdrop-blur md:px-8">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
          <MiniLogo mini={mini} />
          <nav className="hidden items-center gap-5 md:flex">
            {mini.nav.map((item) => (
              <NavButton key={item} onClick={() => scrollToSection(contentRef, targetForNav(item))}>
                {item}
              </NavButton>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <button type="button" aria-label="Search" className="grid h-9 w-9 place-items-center border border-[#111111] bg-white">
              <Search size={15} />
            </button>
            <button type="button" aria-label="Cart" className="grid h-9 w-9 place-items-center bg-[#111111] text-white">
              <ShoppingBag size={16} />
            </button>
            <button type="button" aria-label="Menu" className="grid h-9 w-9 place-items-center border border-[#111111] bg-white md:hidden">
              <Menu size={16} />
            </button>
          </div>
        </div>
      </header>

      <main>
        <section data-mini-section="home" className="grid border-b border-[#111111] bg-[#f4f4ef] md:grid-cols-[1fr_1fr]">
          <div className="p-6 md:p-10">
            <p className="inline-flex bg-[#a3e635] px-3 py-2 text-xs font-black uppercase">{mini.eyebrow}</p>
            <h1 className="mt-6 max-w-xl text-5xl font-black uppercase leading-none md:text-7xl">
              {mini.heroWord || mini.brand}
            </h1>
            <p className="mt-5 max-w-md text-sm leading-7 text-[#4b5563]">{mini.description}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => scrollToSection(contentRef, "shop")}
                className="inline-flex items-center gap-2 bg-[#111111] px-5 py-3 text-xs font-black uppercase text-white"
              >
                {mini.primaryCta}
                <ArrowUpRight size={15} />
              </button>
              <button
                type="button"
                onClick={() => scrollToSection(contentRef, "categories")}
                className="border border-[#111111] bg-white px-5 py-3 text-xs font-black uppercase"
              >
                {mini.secondaryCta}
              </button>
            </div>
          </div>
          <div className="relative border-t border-[#111111] bg-[#111111] p-6 md:border-l md:border-t-0 md:p-10">
            <ProductVisual className="h-[24rem]" />
            <div className="absolute bottom-10 left-10 bg-white px-4 py-3">
              <p className="text-xs font-black uppercase text-[#6b7280]">{mini.collectionLabel}</p>
              <p className="mt-1 text-xl font-black">{mini.accent}</p>
            </div>
          </div>
        </section>

        <div className="flex gap-4 overflow-hidden border-b border-[#111111] bg-[#111111] py-3 text-white">
          {[...(mini.marquee || []), ...(mini.marquee || [])].map((item, index) => (
            <span key={`${item}-${index}`} className="shrink-0 text-xs font-black uppercase">
              / {item}
            </span>
          ))}
        </div>

        <section data-mini-section="categories" className="grid gap-6 px-6 py-10 md:grid-cols-[0.95fr_1.05fr] md:px-10">
          <div className="border border-[#111111] bg-[#111111] p-6 text-white">
            <p className="text-xs font-black uppercase text-[#a3e635]">Story</p>
            <h2 className="mt-3 text-4xl font-black uppercase leading-none">{mini.brandStoryTitle}</h2>
            <p className="mt-4 max-w-md text-sm leading-6 text-white/65">{mini.brandStory}</p>
            <button type="button" className="mt-6 inline-flex items-center gap-2 bg-[#a3e635] px-5 py-3 text-xs font-black uppercase text-[#111111]">
              {mini.secondaryCta}
              <ArrowUpRight size={14} />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {categories.slice(0, 4).map((item, index) => (
              <CategoryCard key={item.title} item={item} index={index} />
            ))}
          </div>
        </section>

        <section data-mini-section="shop" className="border-y border-[#111111] bg-white px-6 py-10 md:px-10">
          <div className="mb-7 flex items-end justify-between gap-5">
            <div>
              <p className="text-xs font-black uppercase text-[#f97316]">Bestseller</p>
              <h2 className="mt-2 text-5xl font-black uppercase leading-none">{mini.productsTitle || "Bestseller"}</h2>
            </div>
            <button
              type="button"
              onClick={() => scrollToSection(contentRef, "contact")}
              className="hidden bg-[#111111] px-5 py-3 text-xs font-black uppercase text-white md:inline-flex"
            >
              View looks
            </button>
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            {products.slice(0, 6).map((product, index) => (
              <MiniProduct key={product.title} product={product} index={index} />
            ))}
          </div>
        </section>

        <section data-mini-section="benefits" className="grid bg-[#111111] text-white md:grid-cols-[0.8fr_1.2fr]">
          <div className="border-b border-white/15 p-6 md:border-b-0 md:border-r md:p-10">
            <Tag size={24} className="text-[#a3e635]" />
            <h2 className="mt-4 text-4xl font-black uppercase leading-none">{mini.benefitsTitle || "Custom pieces"}</h2>
            <p className="mt-4 text-sm leading-6 text-white/65">{mini.description}</p>
          </div>
          <div className="grid gap-3 p-6 md:grid-cols-4 md:p-10">
            {benefits.slice(0, 4).map((benefit) => (
              <div key={benefit.label} className="border border-white/15 bg-white/[0.06] p-4">
                <CheckCircle2 size={18} className="text-[#a3e635]" />
                <p className="mt-3 text-xl font-black">{benefit.value}</p>
                <p className="mt-1 text-xs text-white/55">{benefit.label}</p>
              </div>
            ))}
          </div>
        </section>

        <section data-mini-section="contact" className="grid bg-[#a3e635] md:grid-cols-[1fr_0.9fr]">
          <div className="p-6 md:p-10">
            <p className="text-xs font-black uppercase">{mini.contact.email}</p>
            <h2 className="mt-4 max-w-xl text-4xl font-black uppercase leading-tight">
              {mini.contactTitle || "Ready for your custom look?"}
            </h2>
          </div>
          <div className="border-t border-[#111111] p-6 md:border-l md:border-t-0 md:p-10">
            <button type="button" className="inline-flex w-full items-center justify-center gap-2 bg-[#111111] px-6 py-4 text-xs font-black uppercase text-white">
              {mini.primaryCta}
              <ArrowUpRight size={15} />
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
