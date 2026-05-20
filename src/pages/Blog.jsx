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
import { useEffect, useMemo, useState } from "react";

import SEO from "../components/SEO";
import { siteConfig } from "../data/siteConfig";
import { apiFetch } from "../lib/api";

function getPostDescription(post) {
  return post.description || post.excerpt || post.metaDescription || "";
}

function getPostReadingTime(post) {
  if (post.readingTime) return post.readingTime;
  if (post.readTime) return post.readTime;
  if (post.readingMinutes) return `${post.readingMinutes} min`;
  return "5 min";
}

function getPostCategory(post) {
  if (typeof post.category === "string") return post.category;
  return post.category?.name || "Blog";
}

function getPostDate(post) {
  const date = post.publishedAt || post.date;

  if (!date) return "";

  return new Intl.DateTimeFormat("ro-RO", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

function BlogFloatingNav() {
  return (
    <div className="fixed bottom-4 left-4 z-[120] flex items-center gap-2 rounded-full border border-white/10 bg-[#080808]/80 p-2 shadow-[0_18px_70px_rgba(0,0,0,0.55)] backdrop-blur-xl md:bottom-5 md:left-5">
      <Link
        to="/blog"
        aria-label="Mergi la blog"
        className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-2 text-sm font-semibold text-black transition hover:bg-white/90 md:px-4"
      >
        <Layers size={16} />
        Blog
      </Link>

      <Link
        to="/"
        aria-label="Mergi pe site"
        className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-3 py-2 text-sm font-semibold text-white/70 transition hover:bg-white hover:text-black md:px-4"
      >
        <Home size={16} />
        Site
      </Link>
    </div>
  );
}

function Blog() {
  const [query, setQuery] = useState("");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function loadPosts() {
      try {
        setLoading(true);
        setError("");

        const response = await apiFetch("/blog");

        if (!active) return;

        setPosts(response.data || []);
      } catch (err) {
        if (!active) return;

        setError("Articolele nu au putut fi încărcate momentan.");
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadPosts();

    return () => {
      active = false;
    };
  }, []);

  const filteredPosts = useMemo(() => {
    const value = query.trim().toLowerCase();

    if (!value) return posts;

    return posts.filter((post) => {
      const text = [
        post.title,
        post.shortTitle,
        getPostCategory(post),
        post.description,
        post.excerpt,
        post.imageLabel,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return text.includes(value);
    });
  }, [query, posts]);

  const featuredPost = filteredPosts[0];
  const restPosts = filteredPosts.slice(1);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: `Blog ${siteConfig.brand.name}`,
    description:
      "Articole despre site-uri de prezentare, landing page-uri, SEO de bază și design web modern.",
    blogPost: posts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: getPostDescription(post),
      datePublished: post.publishedAt || post.date,
      url: `/blog/${post.slug}`,
    })),
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#050505] px-5 text-white">
        <p className="text-sm text-white/50">Se încarcă articolele...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#050505] px-5 text-white">
        <div className="text-center">
          <h1 className="text-3xl font-semibold text-white">
            Nu am putut încărca blogul.
          </h1>

          <p className="mt-3 text-white/55">{error}</p>

          <Link
            to="/"
            className="mt-6 inline-flex rounded-full bg-white px-6 py-3 font-semibold text-black"
          >
            Înapoi pe site
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050505] pb-24 text-white md:pb-28">
      <SEO
        title="Blog"
        description="Articole despre site-uri de prezentare, landing page-uri, SEO de bază și design web modern."
        path="/blog"
        structuredData={structuredData}
      />

      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[#050505]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.08),transparent_34%),radial-gradient(circle_at_16%_72%,rgba(255,255,255,0.035),transparent_30%)]" />
        <div className="absolute left-[-14rem] top-20 h-[28rem] w-[28rem] rounded-full bg-white/[0.03] blur-[80px] md:h-[36rem] md:w-[36rem] md:blur-[130px]" />
        <div className="absolute right-[-14rem] top-56 hidden h-[36rem] w-[36rem] rounded-full bg-[#b7aa8f]/[0.045] blur-[150px] md:block" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(5,5,5,0.28),rgba(5,5,5,1)_58%,rgba(5,5,5,0.96))]" />
      </div>

      <BlogFloatingNav />

      <main className="relative z-10 px-4 py-8 md:px-5 md:py-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <section className="grid gap-6 pb-8 pt-4 md:gap-10 md:pb-14 md:pt-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-end">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-xs text-white/55 md:mb-6 md:px-4 md:text-sm md:backdrop-blur-xl">
                <BookOpen size={16} />
                Resurse pentru website-uri mai bune
              </div>

              <h1 className="max-w-5xl text-3xl font-semibold leading-[1.02] tracking-[-0.045em] text-white md:text-7xl md:leading-[0.95] md:tracking-[-0.065em]">
                Idei practice despre site-uri, structură și prezență online.
              </h1>

              <p className="mt-4 max-w-2xl text-base leading-7 text-white/60 md:mt-7 md:text-lg md:leading-8">
                Articole scurte, clare și aplicabile pentru afaceri care vor să
                înțeleagă ce contează înainte să investească într-un website.
              </p>
            </div>

            <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.045] p-3 shadow-[0_24px_90px_rgba(0,0,0,0.45)] md:rounded-[2rem] md:p-4 md:backdrop-blur-xl">
              <label className="flex items-center gap-3 rounded-[1.2rem] border border-white/10 bg-black/30 px-4 py-3 md:rounded-[1.5rem] md:py-4">
                <Search size={19} className="text-white/40" />

                <span className="sr-only">Caută articole</span>
                <input
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Caută: SEO, prețuri, landing page..."
                  className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/35"
                />
              </label>

              <div className="mt-4 hidden gap-3 sm:grid sm:grid-cols-3">
                <BlogStat value={posts.length} label="articole" />
                <BlogStat value="5 min" label="citire medie" />
                <BlogStat value="SEO" label="conținut util" />
              </div>
            </div>
          </section>

          {featuredPost && (
            <section>
              <Link
                to={`/blog/${featuredPost.slug}`}
                className="group grid overflow-hidden rounded-[1.6rem] border border-white/10 bg-white/[0.045] text-white shadow-[0_30px_120px_rgba(0,0,0,0.55)] transition duration-300 hover:-translate-y-1 hover:bg-white/[0.065] md:rounded-[2.6rem] md:backdrop-blur-xl lg:grid-cols-[0.92fr_1.08fr]"
              >
                <div className="relative min-h-[14rem] overflow-hidden p-5 md:min-h-[25rem] md:p-10">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_24%_22%,rgba(255,255,255,0.18),transparent_28%),radial-gradient(circle_at_82%_74%,rgba(185,170,145,0.14),transparent_34%)]" />

                  <div className="relative flex h-full flex-col justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-[0.32em] text-white/40">
                        Articol recomandat
                      </p>

                      <h2 className="mt-4 max-w-xl text-3xl font-semibold leading-[1.02] tracking-[-0.045em] md:mt-5 md:text-6xl md:leading-[1] md:tracking-[-0.055em]">
                        {featuredPost.shortTitle ||
                          featuredPost.imageLabel ||
                          featuredPost.title}
                      </h2>
                    </div>

                    <div className="mt-6 flex flex-wrap gap-2 md:mt-10 md:gap-3">
                      <span className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-black">
                        {getPostCategory(featuredPost)}
                      </span>

                      <span className="rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-sm text-white/70">
                        {getPostReadingTime(featuredPost)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col justify-between border-t border-white/10 bg-black/20 p-5 md:p-10 lg:border-l lg:border-t-0">
                  <div>
                    <div className="flex flex-wrap items-center gap-3 text-sm text-white/45">
                      <span>{getPostDate(featuredPost)}</span>
                      <span aria-hidden="true">•</span>
                      <span>{getPostCategory(featuredPost)}</span>
                    </div>

                    <h3 className="mt-4 max-w-xl text-2xl font-semibold leading-[1.12] tracking-[-0.04em] md:mt-6 md:text-3xl md:leading-[1.08] md:tracking-[-0.045em]">
                      {featuredPost.title}
                    </h3>

                    <p className="mt-3 mobile-line-clamp-3 max-w-xl text-sm leading-6 text-white/60 md:mt-5 md:text-lg md:leading-8">
                      {getPostDescription(featuredPost)}
                    </p>
                  </div>

                  <div className="mt-6 inline-flex w-fit items-center gap-3 rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition group-hover:bg-white/90 md:mt-10 md:px-6">
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

          <section className="mt-6 md:mt-10">
            {filteredPosts.length === 0 ? (
              <div className="rounded-[2rem] border border-white/10 bg-white/[0.045] p-10 text-center text-white/60 md:backdrop-blur-xl">
                Nu am găsit articole pentru căutarea ta.
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-3">
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
      <p className="mt-1 text-sm text-white/50">{label}</p>
    </div>
  );
}

function BlogPostCard({ post }) {
  const category = getPostCategory(post);

  return (
    <Link
      to={`/blog/${post.slug}`}
      className="group block overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.045] p-3 shadow-[0_20px_80px_rgba(0,0,0,0.38)] transition duration-300 hover:-translate-y-1 hover:bg-white/[0.065] md:rounded-[2rem] md:p-4 md:backdrop-blur-xl"
    >
      <div className="relative h-36 overflow-hidden rounded-[1.2rem] border border-white/10 bg-black p-4 text-white md:h-48 md:rounded-[1.5rem] md:p-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(255,255,255,0.18),transparent_28%),radial-gradient(circle_at_85%_75%,rgba(185,170,145,0.12),transparent_30%)]" />

        <div className="relative flex h-full flex-col justify-between">
          <div className="flex items-center justify-between gap-4">
            <p className="text-xs uppercase tracking-[0.3em] text-white/40">
              {category}
            </p>

            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.07] transition group-hover:bg-white group-hover:text-black">
              <ArrowRight size={17} />
            </span>
          </div>

          <h3 className="max-w-sm text-xl font-semibold leading-[1.08] tracking-[-0.04em] md:text-2xl md:leading-[1.05] md:tracking-[-0.045em]">
            {post.shortTitle || post.imageLabel || category}
          </h3>
        </div>
      </div>

      <div className="px-1 py-4 md:px-2 md:py-5">
        <div className="flex items-center gap-3 text-sm text-white/45">
          <span>{getPostDate(post)}</span>
          <span aria-hidden="true">•</span>
          <span className="inline-flex items-center gap-1">
            <Clock size={14} />
            {getPostReadingTime(post)}
          </span>
        </div>

        <h4 className="mt-3 text-xl font-semibold leading-[1.16] tracking-[-0.04em] text-white md:mt-4 md:text-2xl md:leading-[1.12] md:tracking-[-0.045em]">
          {post.title}
        </h4>

        <p className="mt-3 mobile-line-clamp-3 text-sm leading-6 text-white/55 md:mt-4 md:text-base md:leading-7">
          {getPostDescription(post)}
        </p>

        <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-white/65 transition group-hover:text-white md:mt-6">
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
    <section className="mt-12 md:mt-20">
      <div className="relative overflow-hidden rounded-[1.6rem] border border-white/10 bg-white/[0.05] p-5 text-white shadow-[0_30px_110px_rgba(0,0,0,0.48)] md:rounded-[2.5rem] md:p-10 md:backdrop-blur-xl">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute right-[-8rem] top-[-8rem] hidden h-80 w-80 rounded-full bg-white/[0.08] blur-[100px] md:block" />
        </div>

        <div className="relative grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3 py-2 text-xs font-medium uppercase tracking-[0.2em] text-white/50 md:mb-6 md:px-4 md:tracking-[0.24em]">
              <Sparkles size={14} />
              Din idee în structură
            </div>

            <h2 className="max-w-3xl text-3xl font-semibold leading-[1.02] tracking-[-0.045em] md:text-6xl md:leading-[0.98] md:tracking-[-0.06em]">
              Nu știi ce tip de site ți se potrivește?
            </h2>

            <p className="mt-4 max-w-2xl text-sm leading-6 text-white/60 md:mt-6 md:text-lg md:leading-8">
              Poți începe de la obiectivul afacerii, nu de la un pachet ales la
              întâmplare. Structura potrivită se decide în funcție de ce vrei să
              obții.
            </p>
          </div>

          <div className="rounded-[1.4rem] border border-white/10 bg-black/20 p-4 md:rounded-[2rem] md:p-5">
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
      <span className="text-sm text-white/65">{text}</span>
    </div>
  );
}

export default Blog;