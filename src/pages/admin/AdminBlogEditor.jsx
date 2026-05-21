import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Save } from "lucide-react";

import {
  createAdminBlogPost,
  getAdminBlogPost,
  updateAdminBlogPost,
} from "../../lib/adminApi";

const defaultContent = JSON.stringify(
  [
    {
      type: "paragraph",
      text: "Scrie aici primul paragraf al articolului.",
    },
  ],
  null,
  2
);

const initialForm = {
  title: "",
  slug: "",
  excerpt: "",
  content: defaultContent,
  coverImage: "",
  status: "DRAFT",
  featured: false,
  readingMinutes: 4,
  metaTitle: "",
  metaDescription: "",
  publishedAt: "",
};

function AdminBlogEditor() {
  const navigate = useNavigate();
  const { id } = useParams();

  const isEdit = Boolean(id);

  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const title = isEdit ? "Editare articol" : "Articol nou";

  useEffect(() => {
    if (!isEdit) return;

    async function loadPost() {
      try {
        setLoading(true);

        const response = await getAdminBlogPost(id);
        const post = response.data;

        setForm({
          title: post.title || "",
          slug: post.slug || "",
          excerpt: post.excerpt || "",
          content: formatContent(post.content),
          coverImage: post.coverImage || "",
          status: post.status || "DRAFT",
          featured: Boolean(post.featured),
          readingMinutes: post.readingMinutes || 4,
          metaTitle: post.metaTitle || "",
          metaDescription: post.metaDescription || "",
          publishedAt: post.publishedAt
            ? new Date(post.publishedAt).toISOString().slice(0, 16)
            : "",
        });
      } catch (err) {
        setError(err.message || "Nu s-a putut încărca articolul.");
      } finally {
        setLoading(false);
      }
    }

    loadPost();
  }, [id, isEdit]);

  const previewSlug = useMemo(() => {
    return form.slug || slugify(form.title);
  }, [form.slug, form.title]);

  function updateField(field, value) {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  function buildPayload() {
    return {
      title: form.title,
      slug: form.slug || undefined,
      excerpt: form.excerpt,
      content: form.content,
      coverImage: form.coverImage || null,
      status: form.status,
      featured: form.featured,
      readingMinutes: Number(form.readingMinutes) || 4,
      metaTitle: form.metaTitle || null,
      metaDescription: form.metaDescription || null,
      publishedAt: form.publishedAt
        ? new Date(form.publishedAt).toISOString()
        : null,
    };
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      setSaving(true);
      setError("");

      const payload = buildPayload();

      if (isEdit) {
        await updateAdminBlogPost(id, payload);
      } else {
        await createAdminBlogPost(payload);
      }

      navigate("/admin/blog", { replace: true });
    } catch (err) {
      setError(err.message || "Nu s-a putut salva articolul.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <p className="text-white/50">Se încarcă articolul...</p>;
  }

  return (
    <div>
      <Link
        to="/admin/blog"
        className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white/60 transition hover:bg-white hover:text-black"
      >
        <ArrowLeft size={16} />
        Înapoi la blog
      </Link>

      <div className="mt-8">
        <p className="text-sm uppercase tracking-[0.28em] text-white/35">
          Admin Blog
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight">
          {title}
        </h1>
        <p className="mt-3 text-white/45">
          Completează conținutul, SEO-ul și statusul articolului.
        </p>
      </div>

      {error && (
        <div className="mt-6 rounded-2xl border border-red-400/20 bg-red-400/10 p-4 text-sm text-red-100">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-8 grid gap-6 xl:grid-cols-[1fr_360px]">
        <div className="space-y-5">
          <Panel title="Conținut principal">
            <Field label="Titlu">
              <input
                value={form.title}
                onChange={(event) => updateField("title", event.target.value)}
                className="admin-input"
                placeholder="Titlul articolului"
                required
              />
            </Field>

            <Field label="Slug">
              <input
                value={form.slug}
                onChange={(event) => updateField("slug", event.target.value)}
                className="admin-input"
                placeholder={slugify(form.title) || "slug-articol"}
              />
              <p className="mt-2 text-xs text-white/35">
                Preview: /blog/{previewSlug || "slug-articol"}
              </p>
            </Field>

            <Field label="Excerpt">
              <textarea
                value={form.excerpt}
                onChange={(event) => updateField("excerpt", event.target.value)}
                className="admin-textarea min-h-28"
                placeholder="Descriere scurtă pentru card și SEO."
                required
              />
            </Field>

            <Field label="Content JSON">
              <textarea
                value={form.content}
                onChange={(event) => updateField("content", event.target.value)}
                className="admin-textarea min-h-[420px] font-mono text-sm"
                placeholder='[{"type":"paragraph","text":"Text articol"}]'
                required
              />
              <p className="mt-2 text-xs leading-5 text-white/35">
                Momentan conținutul este salvat în format JSON text, compatibil
                cu BlogPost-ul existent.
              </p>
            </Field>
          </Panel>

          <Panel title="SEO">
            <Field label="Meta title">
              <input
                value={form.metaTitle}
                onChange={(event) =>
                  updateField("metaTitle", event.target.value)
                }
                className="admin-input"
                placeholder="Titlu SEO"
              />
            </Field>

            <Field label="Meta description">
              <textarea
                value={form.metaDescription}
                onChange={(event) =>
                  updateField("metaDescription", event.target.value)
                }
                className="admin-textarea min-h-24"
                placeholder="Descriere SEO"
              />
            </Field>
          </Panel>
        </div>

        <aside className="space-y-5">
          <Panel title="Publicare">
            <Field label="Status">
              <select
                value={form.status}
                onChange={(event) => updateField("status", event.target.value)}
                className="admin-input"
              >
                <option value="DRAFT">DRAFT</option>
                <option value="PUBLISHED">PUBLISHED</option>
                <option value="ARCHIVED">ARCHIVED</option>
              </select>
            </Field>

            <Field label="Published at">
              <input
                type="datetime-local"
                value={form.publishedAt}
                onChange={(event) =>
                  updateField("publishedAt", event.target.value)
                }
                className="admin-input"
              />
            </Field>

            <label className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-black/25 p-4">
              <span>
                <span className="block text-sm font-medium text-white">
                  Featured
                </span>
                <span className="mt-1 block text-xs text-white/35">
                  Apare prioritar în blog/carousel.
                </span>
              </span>

              <input
                type="checkbox"
                checked={form.featured}
                onChange={(event) =>
                  updateField("featured", event.target.checked)
                }
                className="h-5 w-5 accent-white"
              />
            </label>

            <Field label="Reading minutes">
              <input
                type="number"
                min="1"
                max="60"
                value={form.readingMinutes}
                onChange={(event) =>
                  updateField("readingMinutes", event.target.value)
                }
                className="admin-input"
              />
            </Field>
          </Panel>

          <Panel title="Imagine">
            <Field label="Cover image">
              <input
                value={form.coverImage}
                onChange={(event) =>
                  updateField("coverImage", event.target.value)
                }
                className="admin-input"
                placeholder="/blog/imagine.jpg"
              />
            </Field>

            {form.coverImage && (
              <div className="overflow-hidden rounded-2xl border border-white/10">
                <img
                  src={form.coverImage}
                  alt=""
                  className="h-44 w-full object-cover"
                />
              </div>
            )}
          </Panel>

          <button
            type="submit"
            disabled={saving}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-white px-5 py-3 font-semibold text-black transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Save size={17} />
            {saving ? "Se salvează..." : "Salvează articolul"}
          </button>
        </aside>
      </form>
    </div>
  );
}

function Panel({ title, children }) {
  return (
    <section className="rounded-[1.8rem] border border-white/10 bg-white/[0.025] p-5">
      <h2 className="text-lg font-semibold">{title}</h2>
      <div className="mt-5 space-y-4">{children}</div>
    </section>
  );
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm text-white/45">{label}</span>
      {children}
    </label>
  );
}

function slugify(value) {
  return String(value || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ă/g, "a")
    .replace(/â/g, "a")
    .replace(/î/g, "i")
    .replace(/ș/g, "s")
    .replace(/ş/g, "s")
    .replace(/ț/g, "t")
    .replace(/ţ/g, "t")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 200);
}

function formatContent(content) {
  if (!content) return defaultContent;

  try {
    const parsed = JSON.parse(content);
    return JSON.stringify(parsed, null, 2);
  } catch {
    return String(content);
  }
}

export default AdminBlogEditor;