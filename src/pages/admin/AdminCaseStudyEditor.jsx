import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Plus, Save, Trash2 } from "lucide-react";

import {
  createAdminCaseStudy,
  getAdminCaseStudy,
  updateAdminCaseStudy,
} from "../../lib/adminApi";

const initialForm = {
  slug: "",
  kicker: "",
  title: "",
  description: "",
  role: "",
  timeline: "",
  overview: "",
  challengeIntro: "",
  challengePoints: [""],
  approach: [{ title: "", text: "" }],
  solution: "",
  results: "",
  gallery: [],
  stats: [],
  status: "DRAFT",
  featured: false,
  metaTitle: "",
  metaDescription: "",
  publishedAt: "",
};

function AdminCaseStudyEditor() {
  const navigate = useNavigate();
  const { id } = useParams();

  const isEdit = Boolean(id);

  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const title = isEdit ? "Editare studiu de caz" : "Studiu de caz nou";

  useEffect(() => {
    if (!isEdit) return;

    async function loadCaseStudy() {
      try {
        setLoading(true);

        const response = await getAdminCaseStudy(id);
        const item = response.data;

        setForm({
          slug: item.slug || "",
          kicker: item.kicker || "",
          title: item.title || "",
          description: item.description || "",
          role: item.role || "",
          timeline: item.timeline || "",
          overview: item.overview || "",
          challengeIntro: item.challengeIntro || "",
          challengePoints:
            item.challengePoints?.length > 0 ? item.challengePoints : [""],
          approach:
            item.approach?.length > 0
              ? item.approach
              : [{ title: "", text: "" }],
          solution: item.solution || "",
          results: item.results || "",
          gallery: item.gallery || [],
          stats: item.stats || [],
          status: item.status || "DRAFT",
          featured: Boolean(item.featured),
          metaTitle: item.metaTitle || "",
          metaDescription: item.metaDescription || "",
          publishedAt: item.publishedAt
            ? new Date(item.publishedAt).toISOString().slice(0, 16)
            : "",
        });
      } catch (err) {
        setError(err.message || "Nu s-a putut încărca studiul de caz.");
      } finally {
        setLoading(false);
      }
    }

    loadCaseStudy();
  }, [id, isEdit]);

  const previewSlug = useMemo(() => {
    return form.slug || slugify(form.title);
  }, [form.slug, form.title]);

  function updateField(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function updateListItem(field, index, value) {
    setForm((prev) => {
      const next = [...prev[field]];
      next[index] = value;
      return { ...prev, [field]: next };
    });
  }

  function addListItem(field, empty) {
    setForm((prev) => ({ ...prev, [field]: [...prev[field], empty] }));
  }

  function removeListItem(field, index) {
    setForm((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  }

  function updateObjectListItem(field, index, key, value) {
    setForm((prev) => {
      const next = [...prev[field]];
      next[index] = { ...next[index], [key]: value };
      return { ...prev, [field]: next };
    });
  }

  function buildPayload() {
    return {
      slug: form.slug,
      kicker: form.kicker,
      title: form.title,
      description: form.description,
      role: form.role,
      timeline: form.timeline,
      overview: form.overview,
      challengeIntro: form.challengeIntro,
      challengePoints: form.challengePoints.filter((p) => p.trim()),
      approach: form.approach.filter((a) => a.title.trim() && a.text.trim()),
      solution: form.solution,
      results: form.results,
      gallery: form.gallery.filter((g) => g.src.trim()),
      stats: form.stats.filter((s) => s.value.trim() && s.label.trim()),
      status: form.status,
      featured: form.featured,
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
        await updateAdminCaseStudy(id, payload);
      } else {
        await createAdminCaseStudy(payload);
      }

      navigate("/admin/case-studies", { replace: true });
    } catch (err) {
      setError(err.message || "Nu s-a putut salva studiul de caz.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <p className="text-white/50">Se încarcă studiul de caz...</p>;
  }

  return (
    <div>
      <Link
        to="/admin/case-studies"
        className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white/60 transition hover:bg-white hover:text-black"
      >
        <ArrowLeft size={16} />
        Înapoi la studii de caz
      </Link>

      <div className="mt-8">
        <p className="text-sm uppercase tracking-[0.28em] text-white/35">
          Admin Studii de caz
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight">
          {title}
        </h1>
        <p className="mt-3 text-white/45">
          Completează conținutul, procesul și rezultatele studiului de caz.
        </p>
      </div>

      {error && (
        <div className="mt-6 rounded-2xl border border-red-400/20 bg-red-400/10 p-4 text-sm text-red-100">
          {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="mt-8 grid gap-6 xl:grid-cols-[1fr_360px]"
      >
        <div className="space-y-5">
          <Panel title="Identitate">
            <Field label="Slug (trebuie să existe în portofoliu)">
              <input
                value={form.slug}
                onChange={(event) => updateField("slug", event.target.value)}
                className="admin-input"
                placeholder="ex: prolinen"
                required
              />
              <p className="mt-2 text-xs text-white/35">
                Preview: /studii-de-caz/{previewSlug || "slug-proiect"}
              </p>
            </Field>

            <Field label="Kicker (eyebrow)">
              <input
                value={form.kicker}
                onChange={(event) =>
                  updateField("kicker", event.target.value)
                }
                className="admin-input"
                placeholder="STUDIU DE CAZ · ..."
                required
              />
            </Field>

            <Field label="Titlu">
              <input
                value={form.title}
                onChange={(event) => updateField("title", event.target.value)}
                className="admin-input"
                required
              />
            </Field>

            <Field label="Descriere (card index)">
              <textarea
                value={form.description}
                onChange={(event) =>
                  updateField("description", event.target.value)
                }
                className="admin-textarea min-h-28"
                required
              />
            </Field>
          </Panel>

          <Panel title="Context proiect">
            <Field label="Rol">
              <input
                value={form.role}
                onChange={(event) => updateField("role", event.target.value)}
                className="admin-input"
                required
              />
            </Field>

            <Field label="Livrare (timeline)">
              <input
                value={form.timeline}
                onChange={(event) =>
                  updateField("timeline", event.target.value)
                }
                className="admin-input"
                required
              />
            </Field>

            <Field label="Overview">
              <textarea
                value={form.overview}
                onChange={(event) =>
                  updateField("overview", event.target.value)
                }
                className="admin-textarea min-h-32"
                required
              />
            </Field>
          </Panel>

          <Panel title="Provocarea">
            <Field label="Intro">
              <textarea
                value={form.challengeIntro}
                onChange={(event) =>
                  updateField("challengeIntro", event.target.value)
                }
                className="admin-textarea min-h-24"
                required
              />
            </Field>

            {form.challengePoints.map((point, index) => (
              <div key={index} className="flex gap-2">
                <input
                  value={point}
                  onChange={(event) =>
                    updateListItem("challengePoints", index, event.target.value)
                  }
                  className="admin-input flex-1"
                  placeholder={`Punct ${index + 1}`}
                />
                <button
                  type="button"
                  onClick={() => removeListItem("challengePoints", index)}
                  className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-500/10 text-red-200 transition hover:bg-red-500 hover:text-white"
                  aria-label="Șterge punct"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}

            <button
              type="button"
              onClick={() => addListItem("challengePoints", "")}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white/60 transition hover:bg-white hover:text-black"
            >
              <Plus size={15} />
              Adaugă punct
            </button>
          </Panel>

          <Panel title="Abordarea">
            {form.approach.map((item, index) => (
              <div
                key={index}
                className="space-y-3 rounded-2xl border border-white/10 bg-black/20 p-4"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs text-white/35">
                    Punct {index + 1}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeListItem("approach", index)}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-red-500/10 text-red-200 transition hover:bg-red-500 hover:text-white"
                    aria-label="Șterge punct abordare"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>

                <input
                  value={item.title}
                  onChange={(event) =>
                    updateObjectListItem(
                      "approach",
                      index,
                      "title",
                      event.target.value
                    )
                  }
                  className="admin-input"
                  placeholder="Titlu"
                />

                <textarea
                  value={item.text}
                  onChange={(event) =>
                    updateObjectListItem(
                      "approach",
                      index,
                      "text",
                      event.target.value
                    )
                  }
                  className="admin-textarea min-h-20"
                  placeholder="Text"
                />
              </div>
            ))}

            <button
              type="button"
              onClick={() =>
                addListItem("approach", { title: "", text: "" })
              }
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white/60 transition hover:bg-white hover:text-black"
            >
              <Plus size={15} />
              Adaugă punct abordare
            </button>
          </Panel>

          <Panel title="Soluția și rezultatul">
            <Field label="Soluție">
              <textarea
                value={form.solution}
                onChange={(event) =>
                  updateField("solution", event.target.value)
                }
                className="admin-textarea min-h-32"
                required
              />
            </Field>

            <Field label="Rezultat">
              <textarea
                value={form.results}
                onChange={(event) =>
                  updateField("results", event.target.value)
                }
                className="admin-textarea min-h-32"
                required
              />
            </Field>
          </Panel>

          <Panel title="Statistici (afișate la Rezultat)">
            {form.stats.map((stat, index) => (
              <div key={index} className="flex gap-2">
                <input
                  value={stat.value}
                  onChange={(event) =>
                    updateObjectListItem(
                      "stats",
                      index,
                      "value",
                      event.target.value
                    )
                  }
                  className="admin-input w-24"
                  placeholder="5"
                />
                <input
                  value={stat.label}
                  onChange={(event) =>
                    updateObjectListItem(
                      "stats",
                      index,
                      "label",
                      event.target.value
                    )
                  }
                  className="admin-input flex-1"
                  placeholder="descriere statistică"
                />
                <button
                  type="button"
                  onClick={() => removeListItem("stats", index)}
                  className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-500/10 text-red-200 transition hover:bg-red-500 hover:text-white"
                  aria-label="Șterge statistică"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}

            <button
              type="button"
              onClick={() => addListItem("stats", { value: "", label: "" })}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white/60 transition hover:bg-white hover:text-black"
            >
              <Plus size={15} />
              Adaugă statistică
            </button>
          </Panel>

          <Panel title="Galerie">
            {form.gallery.map((item, index) => (
              <div key={index} className="flex gap-2">
                <input
                  value={item.src}
                  onChange={(event) =>
                    updateObjectListItem(
                      "gallery",
                      index,
                      "src",
                      event.target.value
                    )
                  }
                  className="admin-input flex-1"
                  placeholder="/case-studies/slug/imagine.jpg"
                />
                <input
                  value={item.caption}
                  onChange={(event) =>
                    updateObjectListItem(
                      "gallery",
                      index,
                      "caption",
                      event.target.value
                    )
                  }
                  className="admin-input flex-1"
                  placeholder="Descriere imagine"
                />
                <button
                  type="button"
                  onClick={() => removeListItem("gallery", index)}
                  className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-500/10 text-red-200 transition hover:bg-red-500 hover:text-white"
                  aria-label="Șterge imagine"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}

            <button
              type="button"
              onClick={() => addListItem("gallery", { src: "", caption: "" })}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white/60 transition hover:bg-white hover:text-black"
            >
              <Plus size={15} />
              Adaugă imagine
            </button>
          </Panel>

          <Panel title="SEO">
            <Field label="Meta title">
              <input
                value={form.metaTitle}
                onChange={(event) =>
                  updateField("metaTitle", event.target.value)
                }
                className="admin-input"
              />
            </Field>

            <Field label="Meta description">
              <textarea
                value={form.metaDescription}
                onChange={(event) =>
                  updateField("metaDescription", event.target.value)
                }
                className="admin-textarea min-h-24"
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
                  Apare primul în index.
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
          </Panel>

          <button
            type="submit"
            disabled={saving}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-white px-5 py-3 font-semibold text-black transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Save size={17} />
            {saving ? "Se salvează..." : "Salvează studiul de caz"}
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

export default AdminCaseStudyEditor;
