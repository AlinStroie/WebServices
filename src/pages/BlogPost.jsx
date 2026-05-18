import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  Home,
  Layers,
} from "lucide-react";

import SEO from "../components/SEO";
import { blogPosts } from "../data/blogPosts";
import { siteConfig } from "../data/siteConfig";

function renderBlock(block) {
  if (block.type === "heading") {
    return (
      <h2
        key={block.text}
        className="mt-12 text-3xl font-semibold tracking-[-0.04em] text-white"
      >
        {block.text}
      </h2>
    );
  }

  if (block.type === "list") {
    return (
      <ul key={block.items.join("-")} className="mt-6 space-y-3">
        {block.items.map((item) => (
          <li key={item} className="flex gap-3 text-white/60">
            <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-white/60" />
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
        className="mt-8 rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-6 text-xl leading-8 text-white/75"
      >
        “{block.text}”
      </blockquote>
    );
  }

  return (
    <p key={block.text} className="mt-6 text-lg leading-9 text-white/60">
      {block.text}
    </p>
  );
}

function RelatedPostCard({ post }) {
  return (
    <Link
      to={`/blog/${post.slug}`}
      className="group block rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-4 transition hover:-translate-y-1 hover:bg-white/[0.06]"
    >
      <div className="mb-4 flex items-center justify-between gap-4">
        <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-white/40">
          {post.category}
        </span>

        <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-white/35 transition group-hover:bg-white group-hover:text-black">
          <ArrowRight size={15} />
        </span>
      </div>

      <h3 className="text-lg font-semibold leading-6 tracking-[-0.03em] text-white">
        {post.title}
      </h3>

      <p className="mt-3 line-clamp-2 text-sm leading-6 text-white/45">
        {post.description}
      </p>

      <div className="mt-4 flex items-center gap-2 text-xs text-white/30">
        <Clock size={13} />
        <span>{post.readingTime}</span>
      </div>
    </Link>
  );
}

function BlogPostFloatingNav() {
  return (
    <div className="fixed bottom-5 left-1/2 z-[120] flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/10 bg-black/75 p-2 shadow-[0_18px_60px_rgba(0,0,0,0.55)] backdrop-blur-2xl md:left-5 md:translate-x-0">
      <Link
        to="/blog"
        className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-black transition hover:bg-white/90"
      >
        <Layers size={16} />
        Blog
      </Link>

      <Link
        to="/"
        className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-semibold text-white/70 transition hover:bg-white hover:text-black"
      >
        <Home size={16} />
        Site
      </Link>
    </div>
  );
}

function BlogPost() {
  const { slug } = useParams();
  const post = blogPosts.find((item) => item.slug === slug);

  if (!post) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black px-5 text-white">
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
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: {
      "@type": "Organization",
      name: siteConfig.brand.name,
    },
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-black pb-24 text-white">
      <SEO
        title={post.title}
        description={post.description}
        type="article"
        structuredData={structuredData}
      />

      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[#030303]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.07),transparent_34%),radial-gradient(circle_at_80%_40%,rgba(255,255,255,0.03),transparent_28%)]" />
      </div>

      <BlogPostFloatingNav />

      <main className="relative z-10 px-5 py-10 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <header className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-sm font-black text-black">
                {siteConfig.brand.logoLetter}
              </span>

              <span className="text-sm font-semibold tracking-wide text-white">
                {siteConfig.brand.name}
              </span>
            </Link>

            <Link
              to="/blog"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-white/70 transition hover:bg-white hover:text-black"
            >
              <ArrowLeft size={17} />
              Blog
            </Link>
          </header>

          <div className="grid gap-10 pt-24 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-14">
            <article className="min-w-0">
              <section className="pb-12">
                <div className="mb-6 flex flex-wrap items-center gap-3 text-sm text-white/40">
                  <span className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2">
                    {post.category}
                  </span>

                  <span>{post.date}</span>

                  <span className="flex items-center gap-2">
                    <Clock size={15} />
                    {post.readingTime}
                  </span>
                </div>

                <h1 className="max-w-4xl text-5xl font-semibold leading-[0.95] tracking-[-0.06em] text-white md:text-7xl">
                  {post.title}
                </h1>

                <p className="mt-7 max-w-3xl text-xl leading-9 text-white/55">
                  {post.description}
                </p>
              </section>

              <div className="relative mb-12 h-80 overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.035]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.18),transparent_28%),radial-gradient(circle_at_80%_80%,rgba(255,255,255,0.08),transparent_32%)]" />

                <div className="absolute bottom-8 left-8">
                  <p className="text-sm uppercase tracking-[0.3em] text-white/35">
                    {post.category}
                  </p>

                  <p className="mt-3 text-4xl font-semibold tracking-[-0.05em] text-white">
                    {post.imageLabel}
                  </p>
                </div>
              </div>

              <section className="rounded-[2rem] border border-white/10 bg-white/[0.025] p-6 md:p-10">
                {post.content.map(renderBlock)}
              </section>

              <section className="my-12 rounded-[2rem] border border-white/10 bg-white/[0.04] p-7 text-center">
                <h2 className="text-3xl font-semibold tracking-[-0.04em] text-white">
                  Ai nevoie de un site modern?
                </h2>

                <p className="mx-auto mt-4 max-w-2xl leading-7 text-white/50">
                  Putem construi un website rapid, responsive și ușor de adaptat
                  pentru afacerea ta.
                </p>

                <Link
                  to="/#preturi"
                  className="mt-6 inline-flex rounded-full bg-white px-6 py-3 font-semibold text-black transition hover:scale-[1.02] hover:bg-white/90"
                >
                  Vezi pachetele
                </Link>
              </section>
            </article>

            <aside className="lg:pt-2">
              <div className="sticky top-28 space-y-5">
                <div className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-5">
                  <p className="text-sm uppercase tracking-[0.3em] text-white/30">
                    Mai poți citi
                  </p>

                  <h2 className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-white">
                    Alte articole utile
                  </h2>

                  <p className="mt-3 text-sm leading-6 text-white/45">
                    Continuă cu articole similare despre website-uri, SEO și
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

                <div className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-5">
                  <p className="text-sm uppercase tracking-[0.3em] text-white/30">
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