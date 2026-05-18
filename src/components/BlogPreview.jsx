import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import AnimatedSection from "./AnimatedSection";
import SectionHeader from "./SectionHeader";
import BlogCard from "./BlogCard";
import { blogPosts } from "../data/blogPosts";

function BlogPreview() {
  const posts = blogPosts.filter((post) => post.featured).slice(0, 3);

  return (
    <AnimatedSection id="blog" className="px-5 py-16 md:py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeader
            eyebrow="Blog"
            title="Resurse utile despre site-uri, design și SEO."
            text="Articole scurte, clare și orientate spre afaceri care vor o prezență online mai bună."
          />

          <Link
            to="/blog"
            className="mb-10 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-white transition hover:bg-white hover:text-black md:mb-12"
          >
            Vezi toate articolele
            <ArrowRight size={17} />
          </Link>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, index) => (
            <BlogCard key={post.slug} post={post} large={index === 0} />
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}

export default BlogPreview;