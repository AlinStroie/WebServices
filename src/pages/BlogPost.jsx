import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, Clock, Home, Layers } from "lucide-react";

import SEO from "../components/SEO";
import { siteConfig } from "../data/siteConfig";
import { apiFetch } from "../lib/api";

function getPostDescription(post) {
  return post?.description || post?.excerpt || post?.metaDescription || "";
}

function getPostReadingTime(post) {
  if (post?.readingTime) return post.readingTime;
  if (post?.readTime) return post.readTime;
  if (post?.readingMinutes) return `${post.readingMinutes} min`;
  return "5 min";
}

function getPostCategory(post) {
  if (typeof post?.category === "string") return post.category;
  return post?.category?.name || "Blog";
}

function formatDate(date) {
  if (!date) return "";

  return new Intl.DateTimeFormat("ro-RO", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

function parseContent(content) {
  if (Array.isArray(content)) return content;
  if (typeof content !== "string") return [];

  try {
    const parsed = JSON.parse(content);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function BlogPostFloatingNav() {
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

function renderBlock(block, index) {
  if (block.type === "heading") {
    return (
      <h2
        key={`${block.text}-${index}`}
        className="mt-8 text-2xl font-semibold tracking-[-0.035em] text-white md:mt-12 md:text-4xl md:tracking-[-0.04em]"
      >
        {block.text}
      </h2>
    );
  }

  if (block.type === "list") {
    return (
      <ul key={`list-${index}`} className="mt-4 space-y-3 md:mt-6">
        {(block.items || []).map((item, itemIndex) => (
          <li
            key={`${item}-${itemIndex}`}
            className="flex gap-3 text-base leading-7 text-white/65 md:text-lg md:leading-8"
          >
            <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-white/55 md:mt-3" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    );
  }

  if (block.type === "quote") {
    return (
      <blockquote
        key={`${block.text}-${index}`}
        className="mt-6 rounded-[1.25rem] border border-white/10 bg-white/[0.045] p-4 text-lg leading-7 text-white/75 md:mt-8 md:rounded-[1.5rem] md:p-6 md:text-xl md:leading-8"
      >
        “{block.text}”
      </blockquote>
    );
  }

  return (
    <p
      key={`${block.text}-${index}`}
      className="mt-4 text-base leading-7 text-white/68 md:mt-6 md:text-lg md:leading-9"
    >
      {block.text}
    </p>
  );
}

function RelatedPostCard({ post }) {
  return (
    <Link
      to={`/blog/${post.slug}`}
      className="group block rounded-[1.5rem] border border-white/10 bg-white/[0.045] p-4 shadow-[0_18px_70px_rgba(0,0,0,0.35)] transition duration-300 hover:-translate-y-1 hover:bg-white/[0.065] md:backdrop-blur-xl"
    >
      <div className="mb-4 flex items-center justify-between gap-4">
        <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-white/50">
          {getPostCategory(post)}
        </span>

        <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-white/45 transition group-hover:bg-white group-hover:text-black">
          <ArrowRight size={15} />
        </span>
      </div>

      <h3 className="text-lg font-semibold leading-6 tracking-[-0.03em] text-white">
        {post.title}
      </h3>

      <p className="mt-3 text-sm leading-6 text-white/55">
        {getPostDescription(post)}
      </p>

      <div className="mt-4 flex items-center gap-2 text-xs text-white/45">
        <Clock size={13} />
        <span>{getPostReadingTime(post)}</span>
      </div>
    </Link>
  );
}

function BlogPost() {
  const { slug } = useParams();

  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const contentBlocks = useMemo(() => {
    return parseContent(post?.content);
  }, [post]);

  useEffect(() => {
    let active = true;

    async function loadPost() {
      try {
        setLoading(true);
        setError("");

        const [postResponse, blogResponse] = await Promise.all([
          apiFetch(`/blog/${slug}`),
          apiFetch("/blog"),
        ]);

        if (!active) return;

        const currentPost = postResponse.data;
        const allPosts = blogResponse.data || [];

        setPost(currentPost);

        setRelatedPosts(
          allPosts
            .filter((item) => item.slug !== currentPost.slug)
            .slice(0, 3)
        );
      } catch (err) {
        if (!active) return;
        setError("Articolul nu există sau nu a putut fi încărcat.");
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadPost();

    return () => {
      active = false;
    };
  }, [slug]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#050505] px-5 text-white">
        <p className="text-sm text-white/50">Se încarcă articolul...</p>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#050505] px-5 text-white">
        <div className="text-center">
          <h1 className="text-4xl font-semibold">Articolul nu există.</h1>

          <Link
            to="/blog"
            className="mt-6 inline-flex rounded-full bg-white px-6 py-3 font-semibold text-black"
          >
            Înapoi la blog
          </Link>
        </div>
      </div>
    );
  }

  const postCategory = getPostCategory(post);
  const postDate = formatDate(post.publishedAt || post.date);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: getPostDescription(post),
    datePublished: post.publishedAt || post.date,
    mainEntityOfPage: `/blog/${post.slug}`,
    author: {
      "@type": "Organization",
      name: siteConfig.brand.name,
    },
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050505] pb-24 text-white md:pb-28">
      <SEO
        title={post.metaTitle || post.title}
        description={getPostDescription(post)}
        type="article"
        path={`/blog/${post.slug}`}
        structuredData={structuredData}
      />

      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[#050505]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.08),transparent_34%),radial-gradient(circle_at_88%_26%,rgba(185,170,145,0.055),transparent_30%)]" />
        <div className="absolute left-[-14rem] top-24 h-[28rem] w-[28rem] rounded-full bg-white/[0.035] blur-[80px] md:h-[36rem] md:w-[36rem] md:blur-[130px]" />
        <div className="absolute right-[-14rem] top-72 hidden h-[34rem] w-[34rem] rounded-full bg-[#b7aa8f]/[0.045] blur-[150px] md:block" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(5,5,5,0.28),rgba(5,5,5,1)_58%,rgba(5,5,5,0.96))]" />
      </div>

      <BlogPostFloatingNav />

      <main className="relative z-10 px-4 py-8 md:px-5 md:py-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-14">
            <article className="min-w-0">
              <section className="pb-8 pt-4 md:pb-12 md:pt-8">
                <Link
                  to="/blog"
                  className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-semibold text-white/65 transition hover:bg-white hover:text-black md:mb-8"
                >
                  <ArrowLeft size={16} />
                  Înapoi la articole
                </Link>

                <div className="mb-5 flex flex-wrap items-center gap-2 text-sm text-white/50 md:mb-6 md:gap-3">
                  <span className="rounded-full border border-white/10 bg-white/[0.045] px-4 py-2">
                    {postCategory}
                  </span>
                  <span>{postDate}</span>
                  <span className="flex items-center gap-2">
                    <Clock size={15} />
                    {getPostReadingTime(post)}
                  </span>
                </div>

                <h1 className="max-w-4xl text-3xl font-semibold leading-[1.04] tracking-[-0.045em] text-white md:text-7xl md:leading-[0.95] md:tracking-[-0.06em]">
                  {post.title}
                </h1>

                <p className="mt-4 max-w-3xl text-base leading-7 text-white/62 md:mt-7 md:text-xl md:leading-9">
                  {getPostDescription(post)}
                </p>
              </section>

              <div className="relative mb-8 h-48 overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.045] text-white shadow-[0_24px_90px_rgba(0,0,0,0.42)] md:mb-12 md:h-80 md:rounded-[2rem] md:backdrop-blur-xl">
                {post.coverImage ? (
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="absolute inset-0 h-full w-full object-cover opacity-70"
                  />
                ) : (
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.16),transparent_28%),radial-gradient(circle_at_80%_80%,rgba(185,170,145,0.12),transparent_34%)]" />
                )}

                <div className="absolute inset-0 bg-black/20" />

                <div className="absolute bottom-5 left-5 right-5 md:bottom-8 md:left-8 md:right-8">
                  <p className="text-sm uppercase tracking-[0.3em] text-white/40">
                    {postCategory}
                  </p>
                  <p className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-white md:text-4xl md:tracking-[-0.05em]">
                    {post.imageLabel || post.shortTitle || postCategory}
                  </p>
                </div>
              </div>

              <section className="rounded-[1.5rem] border border-white/10 bg-white/[0.045] p-4 shadow-[0_24px_90px_rgba(0,0,0,0.35)] md:rounded-[2rem] md:p-10 md:backdrop-blur-xl">
                <div className="mx-auto max-w-3xl">
                  {contentBlocks.map(renderBlock)}
                </div>
              </section>

              <section className="my-8 overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.05] p-5 text-white shadow-[0_24px_90px_rgba(0,0,0,0.38)] md:my-12 md:rounded-[2rem] md:p-7 md:backdrop-blur-xl">
                <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
                  <div>
                    <h2 className="text-2xl font-semibold tracking-[-0.04em] text-white md:text-3xl">
                      Vrei să aplici ideile astea pe site-ul tău?
                    </h2>

                    <p className="mt-3 max-w-2xl text-sm leading-6 text-white/60 md:mt-4 md:text-base md:leading-7">
                      Poți porni de la structură, conținut și obiectiv, nu doar
                      de la design.
                    </p>
                  </div>

                  <Link
                    to="/#preturi"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-black transition hover:scale-[1.02] hover:bg-white/90"
                  >
                    Vezi pachetele
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </section>
            </article>

            <aside className="hidden lg:block lg:pt-32">
              <div className="sticky top-28 space-y-5">
                <div className="rounded-[2rem] border border-white/10 bg-white/[0.045] p-5 shadow-[0_18px_70px_rgba(0,0,0,0.35)] md:backdrop-blur-xl">
                  <p className="text-sm uppercase tracking-[0.3em] text-white/40">
                    Continuă lectura
                  </p>

                  <h2 className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-white">
                    Alte articole utile
                  </h2>

                  <p className="mt-3 text-sm leading-6 text-white/55">
                    Subiecte apropiate despre website-uri, SEO, structură și
                    prezență online.
                  </p>
                </div>

                <div className="space-y-3">
                  {relatedPosts.map((relatedPost) => (
                    <RelatedPostCard
                      key={relatedPost.slug}
                      post={relatedPost}
                    />
                  ))}
                </div>

                <div className="rounded-[2rem] border border-white/10 bg-white/[0.045] p-5 shadow-[0_18px_70px_rgba(0,0,0,0.35)] md:backdrop-blur-xl">
                  <p className="text-sm uppercase tracking-[0.3em] text-white/40">
                    Navigare rapidă
                  </p>

                  <div className="mt-4 grid gap-2">
                    <Link
                      to="/blog"
                      className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-3 text-center text-sm font-semibold text-white/70 transition hover:bg-white hover:text-black"
                    >
                      Toate articolele
                    </Link>

                    <Link
                      to="/"
                      className="rounded-full bg-white px-4 py-3 text-center text-sm font-semibold text-black transition hover:bg-white/90"
                    >
                      Înapoi pe site
                    </Link>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
}

export default BlogPost;