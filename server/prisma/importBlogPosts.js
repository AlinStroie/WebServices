import { PrismaClient } from "@prisma/client";
import { blogPosts } from "../../src/data/blogPosts.js";

const prisma = new PrismaClient();

function slugify(value) {
  return String(value)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function parseReadingMinutes(readingTime) {
  if (!readingTime) return null;

  const match = String(readingTime).match(/\d+/);
  return match ? Number(match[0]) : null;
}

async function main() {
  console.log(`Importing ${blogPosts.length} blog posts...`);

  for (const post of blogPosts) {
    const categoryName = post.category || "Blog";
    const categorySlug = slugify(categoryName);

    const category = await prisma.blogCategory.upsert({
      where: {
        slug: categorySlug,
      },
      update: {
        name: categoryName,
      },
      create: {
        name: categoryName,
        slug: categorySlug,
      },
    });

    await prisma.blogPost.upsert({
      where: {
        slug: post.slug,
      },
      update: {
        title: post.title,
        excerpt: post.description || "",
        content: JSON.stringify(post.content || []),
        status: "PUBLISHED",
        featured: Boolean(post.featured),
        readingMinutes: parseReadingMinutes(post.readingTime),
        metaTitle: post.title,
        metaDescription: post.description || "",
        publishedAt: post.date ? new Date(post.date) : new Date(),
        categoryId: category.id,
      },
      create: {
        title: post.title,
        slug: post.slug,
        excerpt: post.description || "",
        content: JSON.stringify(post.content || []),
        coverImage: post.coverImage || null,
        status: "PUBLISHED",
        featured: Boolean(post.featured),
        readingMinutes: parseReadingMinutes(post.readingTime),
        metaTitle: post.title,
        metaDescription: post.description || "",
        publishedAt: post.date ? new Date(post.date) : new Date(),
        categoryId: category.id,
      },
    });

    console.log(`Imported: ${post.title}`);
  }

  console.log("Blog import completed successfully.");
}

main()
  .catch((error) => {
    console.error("Blog import failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });