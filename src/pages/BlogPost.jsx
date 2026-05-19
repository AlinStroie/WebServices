import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, Clock, Home, Layers } from "lucide-react";

import SEO from "../components/SEO";
import { blogPosts } from "../data/blogPosts";
import { siteConfig } from "../data/siteConfig";

function getPostDescription(post) {
  return post.description || post.excerpt || "";
}

function getPostReadingTime(post) {
  return post.readingTime || post.readTime || "5 min";
}

function BlogPostFloatingNav() {
  return (
    <div className="fixed bottom-5 left-1/2 z-[120] flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/10 bg-[#080808]/80 p-2 shadow-[0_18px_70px_rgba(0,0,0,0.55)] backdrop-blur-xl md:left-5 md:translate-x-0">
      <Link
        to="/blog"
        className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-black transition hover:bg-white/90"
      >
        <Layers size={16} />
        Blog
      </Link>

      <Link
        to="/"
        className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-sm font-semibold text-white/70 transition hover:bg-white hover:text-black"
      >
        <Home size={16} />
        Site
      </Link>
    </div>
  );
}

function renderBlock(block) {
  if (block.type === "heading") {
    return (
      <h2
        key={block.text}
        className="mt-12 text-3xl font-semibold tracking-[-0.04em] text-white md:text-4xl"
      >
        {block.text}
      </h2>
    );
  }

  if (block.type === "list") {
    return (
      <ul key={block.items.join("-")} className="mt-6 space-y-3">
        {block.items.map((item) => (
          <li key={item} className="flex gap-3 text-lg leading-8 text-white/65">
            <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-white/55" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    );
  }

  if (block.type === "quote") {
    return (
      <blockquote
        key={block.text}
        className="mt-8 rounded-[1.5rem] border border-white/10 bg-white/[0.045] p-6 text-xl leading-8 text-white/75"
      >
        “{block.text}”
      </blockquote>
    );
  }

  return (
    <p key={block.text} className="mt-6 text-lg leading-9 text-white/68">
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
          {post.category}
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
  const post = blogPosts.find((item) => item.slug === slug);

  if (!post) {
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

  const relatedPosts = blogPosts
    .filter((item) => item.slug !== post.slug)
    .slice(0, 3);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: getPostDescription(post),
    datePublished: post.date,
    mainEntityOfPage: `/blog/${post.slug}`,
    author: {
      "@type": "Organization",
      name: siteConfig.brand.name,
    },
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050505] pb-28 text-white">
      <SEO
        title={post.title}
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

      <main className="relative z-10 px-5 py-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-14">
            <article className="min-w-0">
              <section className="pb-12 pt-8">
                <Link
                  to="/blog"
                  className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-semibold text-white/65 transition hover:bg-white hover:text-black"
                >
                  <ArrowLeft size={16} />
                  Înapoi la articole
                </Link>

                <div className="mb-6 flex flex-wrap items-center gap-3 text-sm text-white/50">
                  <span className="rounded-full border border-white/10 bg-white/[0.045] px-4 py-2">
                    {post.category}
                  </span>
                  <span>{post.date}</span>
                  <span className="flex items-center gap-2">
                    <Clock size={15} />
                    {getPostReadingTime(post)}
                  </span>
                </div>

                <h1 className="max-w-4xl text-5xl font-semibold leading-[0.95] tracking-[-0.06em] text-white md:text-7xl">
                  {post.title}
                </h1>

                <p className="mt-7 max-w-3xl text-xl leading-9 text-white/62">
                  {getPostDescription(post)}
                </p>
              </section>

              <div className="relative mb-12 h-80 overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.045] text-white shadow-[0_24px_90px_rgba(0,0,0,0.42)] md:backdrop-blur-xl">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.16),transparent_28%),radial-gradient(circle_at_80%_80%,rgba(185,170,145,0.12),transparent_34%)]" />

                <div className="absolute bottom-8 left-8 right-8">
                  <p className="text-sm uppercase tracking-[0.3em] text-white/40">
                    {post.category}
                  </p>
                  <p className="mt-3 text-4xl font-semibold tracking-[-0.05em] text-white">
                    {post.imageLabel || post.shortTitle || post.category}
                  </p>
                </div>
              </div>

              <section className="rounded-[2rem] border border-white/10 bg-white/[0.045] p-6 shadow-[0_24px_90px_rgba(0,0,0,0.35)] md:p-10 md:backdrop-blur-xl">
                <div className="mx-auto max-w-3xl">
                  {post.content.map(renderBlock)}
                </div>
              </section>

              <section className="my-12 overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.05] p-7 text-white shadow-[0_24px_90px_rgba(0,0,0,0.38)] md:backdrop-blur-xl">
                <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
                  <div>
                    <h2 className="text-3xl font-semibold tracking-[-0.04em] text-white">
                      Vrei să aplici ideile astea pe site-ul tău?
                    </h2>

                    <p className="mt-4 max-w-2xl leading-7 text-white/60">
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

            <aside className="lg:pt-32">
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
