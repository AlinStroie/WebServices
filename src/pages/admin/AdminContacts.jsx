import { useEffect, useState } from "react";

import {
  getAdminContacts,
  updateAdminContactStatus,
} from "../../lib/adminApi";

const statuses = ["ALL", "NEW", "READ", "REPLIED", "ARCHIVED"];

function AdminContacts() {
  const [items, setItems] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [status, setStatus] = useState("ALL");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  async function loadContacts() {
    setLoading(true);

    const response = await getAdminContacts({
      status,
      search,
      page: 1,
      limit: 30,
    });

    setItems(response.data.items);
    setPagination(response.data.pagination);
    setLoading(false);
  }

  useEffect(() => {
    loadContacts();
  }, [status]);

  async function handleStatusChange(id, nextStatus) {
    await updateAdminContactStatus(id, nextStatus);
    await loadContacts();
  }

  return (
    <div>
      <PageHeader
        title="Cereri contact"
        text="Gestionează leadurile primite prin formular."
      />

      <div className="mt-8 flex flex-col gap-3 md:flex-row">
        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") loadContacts();
          }}
          className="min-h-11 flex-1 rounded-2xl border border-white/10 bg-white/[0.035] px-4 text-white outline-none placeholder:text-white/25"
          placeholder="Caută după nume, email, telefon..."
        />

        <button
          type="button"
          onClick={loadContacts}
          className="rounded-2xl bg-white px-5 py-3 font-semibold text-black"
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
            className={`rounded-full px-4 py-2 text-sm font-medium ${
              status === item
                ? "bg-white text-black"
                : "bg-white/[0.06] text-white/50"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="mt-8 overflow-hidden rounded-[1.8rem] border border-white/10">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead className="bg-white/[0.05] text-white/50">
              <tr>
                <th className="p-4">Nume</th>
                <th className="p-4">Contact</th>
                <th className="p-4">Pachet</th>
                <th className="p-4">UTM</th>
                <th className="p-4">Email</th>
                <th className="p-4">Status</th>
                <th className="p-4">Acțiune</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-white/10">
              {loading ? (
                <tr>
                  <td className="p-4 text-white/40" colSpan={7}>
                    Se încarcă...
                  </td>
                </tr>
              ) : (
                items.map((item) => (
                  <tr key={item.id} className="text-white/70">
                    <td className="p-4">
                      <p className="font-medium text-white">{item.name}</p>
                      <p className="mt-1 text-xs text-white/35">
                        {new Date(item.createdAt).toLocaleString("ro-RO")}
                      </p>
                    </td>

                    <td className="p-4">
                      <p>{item.email}</p>
                      <p className="mt-1 text-white/35">{item.phone || "-"}</p>
                    </td>

                    <td className="p-4">{item.selectedPlan || "-"}</td>

                    <td className="p-4">
                      <p>{item.utmSource || "-"}</p>
                      <p className="mt-1 text-white/35">
                        {item.utmCampaign || ""}
                      </p>
                    </td>

                    <td className="p-4">
                      {item.emailSent ? "Trimis" : "Netrimis"}
                    </td>

                    <td className="p-4">
                      <span className="rounded-full bg-white/[0.08] px-3 py-1 text-xs">
                        {item.status}
                      </span>
                    </td>

                    <td className="p-4">
                      <select
                        value={item.status}
                        onChange={(event) =>
                          handleStatusChange(item.id, event.target.value)
                        }
                        className="rounded-xl border border-white/10 bg-black px-3 py-2 text-white"
                      >
                        <option value="NEW">NEW</option>
                        <option value="READ">READ</option>
                        <option value="REPLIED">REPLIED</option>
                        <option value="ARCHIVED">ARCHIVED</option>
                      </select>
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
          Total: {pagination.total} cereri
        </p>
      )}
    </div>
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

export default AdminContacts;