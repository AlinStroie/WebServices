import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

function BlogCard({ post, large = false }) {
  return (
    <Link
      to={`/blog/${post.slug}`}
      className={`group block overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.035] p-4 transition duration-300 hover:-translate-y-2 hover:bg-white/[0.06] ${
        large ? "lg:col-span-2" : ""
      }`}
    >
      <div className="relative h-56 overflow-hidden rounded-[1.5rem] border border-white/10 bg-black">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.18),transparent_28%),radial-gradient(circle_at_80%_80%,rgba(255,255,255,0.08),transparent_32%)]" />

        <div className="absolute inset-x-6 bottom-6">
          <p className="text-sm uppercase tracking-[0.25em] text-white/35">
            {post.category}
          </p>

          <h3 className="mt-3 max-w-xl text-3xl font-semibold tracking-[-0.05em] text-white">
            {post.imageLabel}
          </h3>
        </div>

        <div className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-white/50 transition group-hover:bg-white group-hover:text-black">
          <ArrowUpRight size={18} />
        </div>
      </div>

      <div className="p-4">
        <div className="mb-4 flex flex-wrap gap-3 text-sm text-white/35">
          <span>{post.date}</span>
          <span>•</span>
          <span>{post.readingTime}</span>
        </div>

        <h2 className="text-2xl font-semibold tracking-[-0.04em] text-white">
          {post.title}
        </h2>

        <p className="mt-4 leading-7 text-white/50">{post.description}</p>
      </div>
    </Link>
  );
}

export default BlogCard;