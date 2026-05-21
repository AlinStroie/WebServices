import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Edit3, Plus, Trash2 } from "lucide-react";

import {
  archiveAdminBlogPost,
  getAdminBlogPosts,
  updateAdminBlogPostStatus,
} from "../../lib/adminApi";

const statuses = ["ALL", "PUBLISHED", "DRAFT", "ARCHIVED"];

function AdminBlog() {
  const [items, setItems] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [status, setStatus] = useState("ALL");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadPosts() {
    setLoading(true);
    setError("");

    try {
      const response = await getAdminBlogPosts({
        status,
        search,
        page: 1,
        limit: 30,
      });

      setItems(response.data.items);
      setPagination(response.data.pagination);
    } catch (err) {
      setError(err.message || "Nu s-au putut încărca articolele.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  async function handleStatusChange(id, nextStatus) {
    try {
      setError("");
      await updateAdminBlogPostStatus(id, nextStatus);
      await loadPosts();
    } catch (err) {
      setError(err.message || "Statusul nu a putut fi modificat.");
    }
  }

  async function handleArchive(id) {
    const confirmed = window.confirm("Sigur vrei să arhivezi acest articol?");

    if (!confirmed) return;

    try {
      setError("");
      await archiveAdminBlogPost(id);
      await loadPosts();
    } catch (err) {
      setError(err.message || "Articolul nu a putut fi arhivat.");
    }
  }

  return (
    <div>
      <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <PageHeader
          title="Blog"
          text="Administrează articolele publicate pe website."
        />

        <Link
          to="/admin/blog/new"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-white/90"
        >
          <Plus size={17} />
          Articol nou
        </Link>
      </div>

      <div className="mt-8 flex flex-col gap-3 md:flex-row">
        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") loadPosts();
          }}
          className="min-h-11 flex-1 rounded-2xl border border-white/10 bg-white/[0.035] px-4 text-white outline-none placeholder:text-white/25 focus:border-white/30"
          placeholder="Caută după titlu, slug sau descriere..."
        />

        <button
          type="button"
          onClick={loadPosts}
          className="rounded-2xl bg-white px-5 py-3 font-semibold text-black transition hover:bg-white/90"
        >
          Caută
        </button>
      </div>

      <div className="mt-4 flex gap-2 overflow-x-auto">
        {statuses.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setStatus(item)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              status === item
                ? "bg-white text-black"
                : "bg-white/[0.06] text-white/50 hover:bg-white/[0.1] hover:text-white"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      {error && (
        <div className="mt-6 rounded-2xl border border-red-400/20 bg-red-400/10 p-4 text-sm text-red-100">
          {error}
        </div>
      )}

      <div className="mt-8 overflow-hidden rounded-[1.8rem] border border-white/10">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px] text-left text-sm">
            <thead className="bg-white/[0.05] text-white/50">
              <tr>
                <th className="p-4">Articol</th>
                <th className="p-4">Categorie</th>
                <th className="p-4">Status</th>
                <th className="p-4">Featured</th>
                <th className="p-4">Publicat</th>
                <th className="p-4">Status rapid</th>
                <th className="p-4">Acțiuni</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-white/10">
              {loading ? (
                <tr>
                  <td className="p-4 text-white/40" colSpan={7}>
                    Se încarcă articolele...
                  </td>
                </tr>
              ) : items.length === 0 ? (
                <tr>
                  <td className="p-4 text-white/40" colSpan={7}>
                    Nu există articole pentru filtrul selectat.
                  </td>
                </tr>
              ) : (
                items.map((item) => (
                  <tr key={item.id} className="text-white/70">
                    <td className="p-4">
                      <p className="max-w-sm font-medium text-white">
                        {item.title}
                      </p>

                      <p className="mt-1 text-xs text-white/35">
                        /blog/{item.slug}
                      </p>

                      <p className="mt-2 line-clamp-2 max-w-md text-xs leading-5 text-white/35">
                        {item.excerpt}
                      </p>
                    </td>

                    <td className="p-4">{item.category?.name || "-"}</td>

                    <td className="p-4">
                      <StatusBadge status={item.status} />
                    </td>

                    <td className="p-4">{item.featured ? "Da" : "Nu"}</td>

                    <td className="p-4">
                      {item.publishedAt
                        ? new Date(item.publishedAt).toLocaleDateString(
                            "ro-RO"
                          )
                        : "-"}
                    </td>

                    <td className="p-4">
                      <select
                        value={item.status}
                        onChange={(event) =>
                          handleStatusChange(item.id, event.target.value)
                        }
                        className="rounded-xl border border-white/10 bg-black px-3 py-2 text-white outline-none focus:border-white/30"
                      >
                        <option value="PUBLISHED">PUBLISHED</option>
                        <option value="DRAFT">DRAFT</option>
                        <option value="ARCHIVED">ARCHIVED</option>
                      </select>
                    </td>

                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Link
                          to={`/admin/blog/${item.id}/edit`}
                          className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white/[0.08] text-white/70 transition hover:bg-white hover:text-black"
                          aria-label="Editează articol"
                        >
                          <Edit3 size={16} />
                        </Link>

                        <button
                          type="button"
                          onClick={() => handleArchive(item.id)}
                          className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-red-500/10 text-red-200 transition hover:bg-red-500 hover:text-white"
                          aria-label="Arhivează articol"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {pagination && (
        <p className="mt-4 text-sm text-white/35">
          Total: {pagination.total} articole
        </p>
      )}
    </div>
  );
}

function StatusBadge({ status }) {
  const classes = {
    PUBLISHED: "bg-emerald-500/15 text-emerald-200",
    DRAFT: "bg-yellow-500/15 text-yellow-100",
    ARCHIVED: "bg-white/[0.08] text-white/40",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-medium ${
        classes[status] || "bg-white/[0.08] text-white/50"
      }`}
    >
      {status}
    </span>
  );
}

function PageHeader({ title, text }) {
  return (
    <div>
      <p className="text-sm uppercase tracking-[0.28em] text-white/35">
        Admin
      </p>

      <h1 className="mt-3 text-4xl font-semibold tracking-tight">{title}</h1>

      <p className="mt-3 max-w-2xl text-white/45">{text}</p>
    </div>
  );
}

export default AdminBlog;