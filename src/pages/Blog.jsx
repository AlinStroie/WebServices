import { Link } from "react-router-dom";
import {
  ArrowRight,
  BookOpen,
  Clock,
  Home,
  Layers,
  Search,
  Sparkles,
} from "lucide-react";
import { useMemo, useState } from "react";

import SEO from "../components/SEO";
import { blogPosts } from "../data/blogPosts";

function getPostDescription(post) {
  return post.description || post.excerpt || "";
}

function getPostReadingTime(post) {
  return post.readingTime || post.readTime || "5 min";
}

function BlogFloatingNav() {
  return (
    <div className="fixed bottom-5 left-1/2 z-[120] flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/10 bg-[#080808]/80 p-2 shadow-[0_18px_70px_rgba(0,0,0,0.55)] backdrop-blur-2xl md:left-5 md:translate-x-0">
      <Link
        to="/blog"
        className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-black transition hover:bg-white/90"
      >
        <Layers size={16} />
        Blog
      </Link>

      <Link
        to="/"
        className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-sm font-semibold text-white/65 transition hover:bg-white hover:text-black"
      >
        <Home size={16} />
        Site
      </Link>
    </div>
  );
}

function Blog() {
  const [query, setQuery] = useState("");

  const filteredPosts = useMemo(() => {
    const value = query.trim().toLowerCase();

    if (!value) return blogPosts;

    return blogPosts.filter((post) => {
      const text = [
        post.title,
        post.shortTitle,
        post.category,
        post.description,
        post.excerpt,
        post.imageLabel,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return text.includes(value);
    });
  }, [query]);

  const featuredPost = filteredPosts[0];
  const restPosts = filteredPosts.slice(1);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050505] pb-28 text-white">
      <SEO
        title="Blog"
        description="Articole despre site-uri de prezentare, landing page-uri, SEO de bază și design web modern."
      />

      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[#050505]" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.08),transparent_34%),radial-gradient(circle_at_16%_72%,rgba(255,255,255,0.035),transparent_30%),radial-gradient(circle_at_88%_26%,rgba(185,170,145,0.055),transparent_32%)]" />

        <div className="absolute left-[-14rem] top-20 h-[36rem] w-[36rem] rounded-full bg-white/[0.035] blur-[130px]" />
        <div className="absolute right-[-14rem] top-56 h-[36rem] w-[36rem] rounded-full bg-[#b7aa8f]/[0.045] blur-[150px]" />
        <div className="absolute bottom-[-18rem] left-1/3 h-[40rem] w-[40rem] rounded-full bg-white/[0.025] blur-[150px]" />

        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(5,5,5,0.28),rgba(5,5,5,1)_58%,rgba(5,5,5,0.96))]" />
      </div>

      <BlogFloatingNav />

      <main className="relative z-10 px-5 py-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <section className="grid gap-10 pt-8 pb-14 lg:grid-cols-[1.08fr_0.92fr] lg:items-end">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white/50 backdrop-blur-xl">
                <BookOpen size={16} />
                Resurse pentru website-uri mai bune
              </div>

              <h1 className="max-w-5xl text-5xl font-semibold leading-[0.95] tracking-[-0.065em] text-white md:text-7xl">
                Idei practice despre site-uri, structură și prezență online.
              </h1>

              <p className="mt-7 max-w-2xl text-lg leading-8 text-white/52">
                Articole scurte, clare și aplicabile pentru afaceri care vor să
                înțeleagă ce contează înainte să investească într-un website.
              </p>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/[0.045] p-4 shadow-[0_24px_90px_rgba(0,0,0,0.45)] backdrop-blur-xl">
              <div className="flex items-center gap-3 rounded-[1.5rem] border border-white/10 bg-black/30 px-4 py-4">
                <Search size={19} className="text-white/35" />

                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Caută: SEO, prețuri, landing page..."
                  className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/30"
                />
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                <BlogStat value={blogPosts.length} label="articole" />
                <BlogStat value="5 min" label="citire medie" />
                <BlogStat value="SEO" label="conținut util" />
              </div>
            </div>
          </section>

          {featuredPost && (
            <section>
              <Link
                to={`/blog/${featuredPost.slug}`}
                className="group grid overflow-hidden rounded-[2.6rem] border border-white/10 bg-white/[0.045] text-white shadow-[0_30px_120px_rgba(0,0,0,0.55)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:bg-white/[0.065] lg:grid-cols-[0.92fr_1.08fr]"
              >
                <div className="relative min-h-[25rem] overflow-hidden p-8 md:p-10">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_24%_22%,rgba(255,255,255,0.18),transparent_28%),radial-gradient(circle_at_82%_74%,rgba(185,170,145,0.14),transparent_34%)]" />
                  <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-white/[0.08] blur-[90px]" />

                  <div className="relative flex h-full flex-col justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-[0.32em] text-white/35">
                        Articol recomandat
                      </p>

                      <h2 className="mt-5 max-w-xl text-4xl font-semibold leading-[1] tracking-[-0.055em] md:text-6xl">
                        {featuredPost.shortTitle || featuredPost.title}
                      </h2>
                    </div>

                    <div className="mt-10 flex flex-wrap gap-3">
                      <span className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-black">
                        {featuredPost.category}
                      </span>

                      <span className="rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-sm text-white/60">
                        {getPostReadingTime(featuredPost)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col justify-between border-t border-white/10 bg-black/20 p-8 md:p-10 lg:border-l lg:border-t-0">
                  <div>
                    <div className="flex flex-wrap items-center gap-3 text-sm text-white/38">
                      <span>{featuredPost.date}</span>
                      <span>•</span>
                      <span>{featuredPost.category}</span>
                    </div>

                    <h3 className="mt-6 max-w-xl text-3xl font-semibold leading-[1.08] tracking-[-0.045em]">
                      {featuredPost.title}
                    </h3>

                    <p className="mt-5 max-w-xl text-lg leading-8 text-white/55">
                      {getPostDescription(featuredPost)}
                    </p>
                  </div>

                  <div className="mt-10 inline-flex w-fit items-center gap-3 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition group-hover:bg-white/90">
                    Citește articolul
                    <ArrowRight
                      size={16}
                      className="transition group-hover:translate-x-1"
                    />
                  </div>
                </div>
              </Link>
            </section>
          )}

          <section className="mt-10">
            {filteredPosts.length === 0 ? (
              <div className="rounded-[2rem] border border-white/10 bg-white/[0.045] p-10 text-center text-white/55 backdrop-blur-xl">
                Nu am găsit articole pentru căutarea ta.
              </div>
            ) : (
              <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {restPosts.map((post) => (
                  <BlogPostCard key={post.slug} post={post} />
                ))}
              </div>
            )}
          </section>

          <BlogCTA />
        </div>
      </main>
    </div>
  );
}

function BlogStat({ value, label }) {
  return (
    <div className="rounded-[1.3rem] border border-white/10 bg-white/[0.04] p-4">
      <p className="text-xl font-semibold tracking-[-0.04em] text-white">
        {value}
      </p>
      <p className="mt-1 text-sm text-white/42">{label}</p>
    </div>
  );
}

function BlogPostCard({ post }) {
  return (
    <Link
      to={`/blog/${post.slug}`}
      className="group block overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.045] p-4 shadow-[0_20px_80px_rgba(0,0,0,0.38)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:bg-white/[0.065]"
    >
      <div className="relative h-48 overflow-hidden rounded-[1.5rem] border border-white/10 bg-black p-5 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(255,255,255,0.18),transparent_28%),radial-gradient(circle_at_85%_75%,rgba(185,170,145,0.12),transparent_30%)]" />

        <div className="relative flex h-full flex-col justify-between">
          <div className="flex items-center justify-between gap-4">
            <p className="text-xs uppercase tracking-[0.3em] text-white/35">
              {post.category}
            </p>

            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.07] transition group-hover:bg-white group-hover:text-black">
              <ArrowRight size={17} />
            </span>
          </div>

          <h3 className="max-w-sm text-2xl font-semibold leading-[1.05] tracking-[-0.045em]">
            {post.shortTitle || post.imageLabel || post.category}
          </h3>
        </div>
      </div>

      <div className="px-2 py-5">
        <div className="flex items-center gap-3 text-sm text-white/35">
          <span>{post.date}</span>
          <span>•</span>
          <span className="inline-flex items-center gap-1">
            <Clock size={14} />
            {getPostReadingTime(post)}
          </span>
        </div>

        <h4 className="mt-4 text-2xl font-semibold leading-[1.12] tracking-[-0.045em] text-white">
          {post.title}
        </h4>

        <p className="mt-4 leading-7 text-white/48">
          {getPostDescription(post)}
        </p>

        <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white/58 transition group-hover:text-white">
          Citește articolul
          <ArrowRight
            size={15}
            className="transition group-hover:translate-x-1"
          />
        </div>
      </div>
    </Link>
  );
}

function BlogCTA() {
  return (
    <section className="mt-20">
      <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.05] p-8 text-white shadow-[0_30px_110px_rgba(0,0,0,0.48)] backdrop-blur-xl md:p-10">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute right-[-8rem] top-[-8rem] h-80 w-80 rounded-full bg-white/[0.08] blur-[100px]" />
          <div className="absolute bottom-[-10rem] left-1/3 h-96 w-96 rounded-full bg-[#b7aa8f]/[0.055] blur-[120px]" />
        </div>

        <div className="relative grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-xs font-medium uppercase tracking-[0.24em] text-white/45">
              <Sparkles size={14} />
              Din idee în structură
            </div>

            <h2 className="max-w-3xl text-4xl font-semibold leading-[0.98] tracking-[-0.06em] md:text-6xl">
              Nu știi ce tip de site ți se potrivește?
            </h2>

            <p className="mt-6 max-w-2xl text-base leading-8 text-white/55 md:text-lg">
              Poți începe de la obiectivul afacerii, nu de la un pachet ales la
              întâmplare. Structura potrivită se decide în funcție de ce vrei să
              obții.
            </p>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-black/20 p-5">
            <div className="grid gap-3">
              <CTAItem text="alegem tipul potrivit de site" />
              <CTAItem text="stabilim paginile importante" />
              <CTAItem text="clarificăm ce trebuie optimizat" />
            </div>

            <Link
              to="/#preturi"
              className="group mt-6 inline-flex w-full items-center justify-center gap-3 rounded-full bg-white px-6 py-4 font-semibold text-black transition hover:bg-white/90"
            >
              Vezi pachetele
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-black text-white transition group-hover:translate-x-1">
                <ArrowRight size={16} />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function CTAItem({ text }) {
  return (
    <div className="flex items-center gap-3 rounded-[1.2rem] border border-white/10 bg-white/[0.04] p-4">
      <span className="h-2 w-2 rounded-full bg-white/70" />
      <span className="text-sm text-white/60">{text}</span>
    </div>
  );
}

export default Blog;