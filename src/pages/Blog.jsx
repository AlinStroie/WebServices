import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import BlogCard from "../components/BlogCard";
import SEO from "../components/SEO";
import { blogPosts } from "../data/blogPosts";
import { siteConfig } from "../data/siteConfig";

function Blog() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-white">
      <SEO
        title="Blog"
        description="Articole despre site-uri de prezentare, landing page-uri, SEO de bază și design web modern."
      />

      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[#030303]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.07),transparent_34%),radial-gradient(circle_at_20%_75%,rgba(255,255,255,0.025),transparent_30%)]" />
      </div>

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
              to="/"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-white/70 transition hover:bg-white hover:text-black"
            >
              <ArrowLeft size={17} />
              Înapoi la site
            </Link>
          </header>

          <section className="pb-14 pt-24">
            <p className="mb-5 text-sm font-medium uppercase tracking-[0.35em] text-white/35">
              Blog
            </p>

            <h1 className="max-w-4xl text-5xl font-semibold leading-[0.95] tracking-[-0.06em] text-white md:text-7xl">
              Articole despre website-uri, SEO și prezență online.
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-white/50">
              Ghiduri simple pentru antreprenori, freelanceri și afaceri locale
              care vor un site modern și eficient.
            </p>
          </section>

          <section className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post, index) => (
              <BlogCard key={post.slug} post={post} large={index === 0} />
            ))}
          </section>
        </div>
      </main>
    </div>
  );
}

export default Blog;