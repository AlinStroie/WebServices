import { ArrowUpRight, CheckCircle, Menu, Search, ShoppingBag, Sparkles } from "lucide-react";
import { MiniLogo, NavButton, navTarget, scrollToSection } from "./shared.jsx";

const ProductVisual = ({ className = "" }) => (
  <div className={`relative overflow-hidden rounded-[1.25rem] border border-black bg-neutral-100 ${className}`}>
    <div className="absolute inset-0 bg-[linear-gradient(135deg,transparent_0_38%,rgba(0,0,0,.08)_38%_40%,transparent_40%_100%)]" />
    <div className="absolute left-1/2 top-7 h-28 w-16 -translate-x-1/2 rounded-t-[2rem] bg-black" />
    <div className="absolute left-1/2 top-12 h-20 w-28 -translate-x-1/2 rounded-[1.5rem] bg-neutral-800" />
    <div className="absolute left-1/2 top-20 -translate-x-1/2 -rotate-6 text-[1.15rem] font-black uppercase tracking-[-0.08em] text-white">
      CUSTOM
    </div>
    <div className="absolute bottom-0 left-1/2 h-24 w-14 -translate-x-[92%] rounded-t-md bg-neutral-700" />
    <div className="absolute bottom-0 left-1/2 h-24 w-14 -translate-x-[8%] rounded-t-md bg-neutral-900" />
    <div className="absolute bottom-2 left-1/2 h-4 w-16 -translate-x-[98%] rounded-full bg-black" />
    <div className="absolute bottom-2 left-1/2 h-4 w-16 -translate-x-[2%] rounded-full bg-black" />
  </div>
);

const MiniProduct = ({ product }) => (
  <article className="group overflow-hidden rounded-[1.35rem] border border-black bg-white">
    <div className="relative h-36 border-b border-black bg-neutral-100 p-3">
      <ProductVisual className="h-full" />
      <span className="absolute left-3 top-3 rounded-full bg-white px-3 py-1 text-[0.55rem] font-black uppercase tracking-[0.18em] text-black">
        {product.tag}
      </span>
    </div>
    <div className="grid grid-cols-[1fr_auto] items-end gap-3 p-4">
      <div>
        <h4 className="text-[0.72rem] font-black uppercase leading-tight tracking-[-0.03em]">{product.title}</h4>
        <p className="mt-1 text-[0.62rem] font-semibold text-black/45">{product.category}</p>
        <p className="mt-2 text-sm font-black">{product.price}</p>
      </div>
      <button type="button" className="grid h-8 w-8 place-items-center rounded-full bg-black text-white transition group-hover:rotate-12">
        <ArrowUpRight size={15} />
      </button>
    </div>
  </article>
);

export default function ShopSiteMockup({ mini, contentRef }) {
  const products = mini.products || mini.items || [];
  const categories = mini.categories || mini.items || [];
  const benefits = mini.benefits || mini.stats || [];

  return (
    <div ref={contentRef} className="h-full overflow-y-auto bg-[#f2f2f2] text-black">
      <section data-mini-section="home" className="relative overflow-hidden bg-[#1b1b1b] px-5 pb-6 pt-5 text-white">
        <header className="relative z-20 flex items-center justify-between border border-white/20 bg-white px-5 py-3 text-black">
          <MiniLogo mini={mini} />
          <nav className="hidden items-center gap-5 md:flex">
            {mini.nav.map((item) => (
              <NavButton key={item} onClick={() => scrollToSection(contentRef, navTarget(item))}>
                {item}
              </NavButton>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <Search size={15} />
            <ShoppingBag size={16} />
            <Menu size={17} className="md:hidden" />
          </div>
        </header>

        <div className="relative z-10 mt-6 min-h-[26rem] overflow-hidden rounded-[1.6rem] bg-white text-black">
          <div className="absolute inset-x-0 top-16 z-0 whitespace-nowrap text-[5.2rem] font-black uppercase leading-none tracking-[-0.12em] text-black md:text-[7rem]">
            {mini.heroWord || "Customization"}
          </div>
          <div className="absolute right-8 top-8 hidden h-64 w-40 rounded-t-[5rem] bg-[#f5ad16] md:block" />
          <ProductVisual className="absolute bottom-12 left-1/2 z-10 h-72 w-48 -translate-x-1/2 border-0 bg-transparent" />

          <div className="relative z-20 flex min-h-[26rem] flex-col justify-between p-6">
            <div className="flex items-start justify-between gap-6">
              <div>
                <p className="text-[0.62rem] uppercase tracking-[0.34em] text-black/45">{mini.subtitle}</p>
                <h3 className="mt-16 max-w-xs text-5xl font-black uppercase leading-[0.82] tracking-[-0.1em] md:text-6xl">
                  {mini.headline}
                </h3>
              </div>
              <p className="hidden max-w-[10rem] text-right text-[0.62rem] font-bold uppercase leading-4 text-black/45 md:block">
                {mini.collectionLabel || "New drop / limited pieces"}
              </p>
            </div>

            <div className="flex items-end justify-between gap-4">
              <button
                type="button"
                onClick={() => scrollToSection(contentRef, "shop")}
                className="flex w-full max-w-md items-center justify-between rounded-full bg-black px-5 py-3 text-xs font-black uppercase tracking-[0.14em] text-white"
              >
                {mini.primaryCta}
                <ArrowUpRight size={16} />
              </button>
              <div className="hidden rounded-full border border-black px-4 py-2 text-[0.6rem] font-black uppercase tracking-[0.22em] md:block">
                {mini.accent}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-3 flex gap-2 overflow-hidden rounded-full bg-white py-2 text-black">
          {[...(mini.marquee || []), ...(mini.marquee || [])].map((item, index) => (
            <span key={`${item}-${index}`} className="shrink-0 px-3 text-[0.58rem] font-black uppercase tracking-[0.2em]">
              / {item}
            </span>
          ))}
        </div>
      </section>

      <section data-mini-section="categories" className="grid gap-5 px-5 py-8 md:grid-cols-[1.1fr_.9fr]">
        <div className="relative min-h-[18rem] overflow-hidden rounded-[1.6rem] bg-neutral-900 p-6 text-white">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_70%_30%,white,transparent_35%)]" />
          <h3 className="relative z-10 max-w-sm text-5xl font-black uppercase leading-[0.82] tracking-[-0.1em]">
            {mini.brandStoryTitle}
          </h3>
          <p className="relative z-10 mt-4 max-w-xs text-xs leading-5 text-white/60">{mini.brandStory}</p>
          <button type="button" className="relative z-10 mt-5 rounded-full bg-white px-5 py-3 text-[0.65rem] font-black uppercase tracking-[0.16em] text-black">
            {mini.secondaryCta}
          </button>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {categories.slice(0, 4).map((item) => (
            <div key={item.title} className="rounded-[1.3rem] border border-black bg-[#f5ad16] p-4 shadow-[5px_5px_0_#111]">
              <div className="mb-5 grid h-12 w-12 place-items-center rounded-full bg-black text-white">
                <Sparkles size={20} />
              </div>
              <h4 className="text-sm font-black uppercase leading-tight tracking-[-0.04em]">{item.title}</h4>
              <p className="mt-2 text-[0.62rem] font-semibold leading-4 text-black/60">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section data-mini-section="shop" className="px-5 py-8">
        <div className="mb-5 flex items-end justify-between gap-4">
          <h3 className="max-w-sm text-5xl font-black uppercase leading-[0.82] tracking-[-0.1em]">
            {mini.productsTitle || "Bestseller"}
          </h3>
          <button type="button" onClick={() => scrollToSection(contentRef, "contact")} className="rounded-full bg-black px-5 py-3 text-[0.65rem] font-black uppercase tracking-[0.16em] text-white">
            View looks
          </button>
        </div>
        <div className="grid gap-3 md:grid-cols-3">
          {products.slice(0, 6).map((product) => (
            <MiniProduct key={product.title} product={product} />
          ))}
        </div>
      </section>

      <section data-mini-section="benefits" className="bg-black px-5 py-8 text-white">
        <h3 className="text-4xl font-black uppercase tracking-[-0.08em]">{mini.benefitsTitle || "Custom - what is it?"}</h3>
        <p className="mt-3 max-w-xl text-xs leading-5 text-white/55">{mini.description}</p>
        <div className="mt-6 grid gap-3 md:grid-cols-4">
          {benefits.slice(0, 4).map((benefit) => (
            <div key={benefit.label} className="rounded-[1.1rem] border border-white/15 bg-white/5 p-4">
              <CheckCircle size={17} className="text-[#f5ad16]" />
              <p className="mt-3 text-lg font-black uppercase tracking-[-0.04em]">{benefit.value}</p>
              <p className="text-[0.62rem] font-bold uppercase tracking-[0.16em] text-white/45">{benefit.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section data-mini-section="contact" className="px-5 py-8">
        <div className="rounded-[1.6rem] bg-[#f5ad16] p-6 text-black md:flex md:items-center md:justify-between md:gap-6">
          <div>
            <p className="text-[0.62rem] font-black uppercase tracking-[0.28em]">{mini.contact.email}</p>
            <h3 className="mt-3 max-w-md text-4xl font-black uppercase leading-[0.9] tracking-[-0.08em]">
              {mini.contactTitle || "Ready for your custom look?"}
            </h3>
          </div>
          <button type="button" className="mt-5 rounded-full bg-black px-6 py-3 text-xs font-black uppercase tracking-[0.16em] text-white md:mt-0">
            {mini.primaryCta}
          </button>
        </div>
      </section>
    </div>
  );
}
