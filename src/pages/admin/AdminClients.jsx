import { useEffect, useState } from "react";
import { FolderPlus, UserPlus } from "lucide-react";

import {
  createAdminClientProject,
  getAdminClients,
  inviteAdminClient,
} from "../../lib/adminApi";

function AdminClients() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteName, setInviteName] = useState("");
  const [inviting, setInviting] = useState(false);
  const [inviteMessage, setInviteMessage] = useState("");

  const [projectTarget, setProjectTarget] = useState(null);
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [creatingProject, setCreatingProject] = useState(false);

  async function loadClients() {
    setLoading(true);
    setError("");

    try {
      const response = await getAdminClients();
      setClients(response.data);
    } catch (err) {
      setError(err.message || "Nu am putut încărca clienții.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadClients();
  }, []);

  async function handleInvite(event) {
    event.preventDefault();
    setInviting(true);
    setInviteMessage("");
    setError("");

    try {
      await inviteAdminClient({
        email: inviteEmail,
        name: inviteName || undefined,
      });
      setInviteMessage(`Invitație trimisă către ${inviteEmail}.`);
      setInviteEmail("");
      setInviteName("");
      await loadClients();
    } catch (err) {
      setError(err.message || "Invitația nu a putut fi trimisă.");
    } finally {
      setInviting(false);
    }
  }

  async function handleCreateProject(event) {
    event.preventDefault();
    setCreatingProject(true);
    setError("");

    try {
      await createAdminClientProject(projectTarget.id, {
        name: projectName,
        description: projectDescription || undefined,
      });
      setProjectTarget(null);
      setProjectName("");
      setProjectDescription("");
      await loadClients();
    } catch (err) {
      setError(err.message || "Proiectul nu a putut fi creat.");
    } finally {
      setCreatingProject(false);
    }
  }

  return (
    <div>
      <PageHeader
        title="Clienți"
        text="Invită clienți în portal și atribuie-le proiecte. Fără cont creat de client — doar invitație din admin."
      />

      <form
        onSubmit={handleInvite}
        className="mt-8 flex flex-col gap-3 rounded-[1.8rem] border border-white/10 bg-white/[0.025] p-5 md:flex-row md:items-end"
      >
        <div className="flex-1">
          <label className="text-sm text-white/40">Email client</label>
          <input
            type="email"
            required
            value={inviteEmail}
            onChange={(event) => setInviteEmail(event.target.value)}
            placeholder="client@exemplu.ro"
            className="mt-2 min-h-11 w-full rounded-2xl border border-white/10 bg-black px-4 text-white outline-none placeholder:text-white/25 focus:border-white/30"
          />
        </div>

        <div className="flex-1">
          <label className="text-sm text-white/40">Nume (opțional)</label>
          <input
            value={inviteName}
            onChange={(event) => setInviteName(event.target.value)}
            placeholder="Nume client"
            className="mt-2 min-h-11 w-full rounded-2xl border border-white/10 bg-black px-4 text-white outline-none placeholder:text-white/25 focus:border-white/30"
          />
        </div>

        <button
          type="submit"
          disabled={inviting}
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-white/90 disabled:opacity-50"
        >
          <UserPlus size={17} />
          {inviting ? "Se trimite..." : "Invită client"}
        </button>
      </form>

      {inviteMessage && (
        <div className="mt-4 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-4 text-sm text-emerald-100">
          {inviteMessage}
        </div>
      )}

      {error && (
        <div className="mt-4 rounded-2xl border border-red-400/20 bg-red-400/10 p-4 text-sm text-red-100">
          {error}
        </div>
      )}

      <div className="mt-8 overflow-hidden rounded-[1.8rem] border border-white/10">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px] text-left text-sm">
            <thead className="bg-white/[0.05] text-white/50">
              <tr>
                <th className="p-4">Client</th>
                <th className="p-4">Status</th>
                <th className="p-4">Proiecte</th>
                <th className="p-4">Acțiuni</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-white/10">
              {loading ? (
                <tr>
                  <td className="p-4 text-white/40" colSpan={4}>
                    Se încarcă clienții...
                  </td>
                </tr>
              ) : clients.length === 0 ? (
                <tr>
                  <td className="p-4 text-white/40" colSpan={4}>
                    Niciun client încă. Invită unul mai sus.
                  </td>
                </tr>
              ) : (
                clients.map((client) => (
                  <tr key={client.id} className="text-white/70">
                    <td className="p-4">
                      <p className="font-medium text-white">
                        {client.email}
                      </p>
                      {client.name && (
                        <p className="mt-1 text-xs text-white/35">
                          {client.name}
                        </p>
                      )}
                    </td>

                    <td className="p-4">
                      <StatusBadge status={client.status} />
                    </td>

                    <td className="p-4">{client.projectCount}</td>

                    <td className="p-4">
                      {client.status === "ACTIVE" ? (
                        <button
                          type="button"
                          onClick={() => setProjectTarget(client)}
                          className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white/[0.08] text-white/70 transition hover:bg-white hover:text-black"
                          aria-label="Adaugă proiect"
                        >
                          <FolderPlus size={16} />
                        </button>
                      ) : (
                        <span className="text-xs text-white/30">
                          Așteaptă acceptare
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {projectTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-5">
          <div className="w-full max-w-md rounded-[1.8rem] border border-white/10 bg-[#0a0a0a] p-6">
            <h2 className="text-lg font-semibold">
              Proiect nou pentru {projectTarget.email}
            </h2>

            <form onSubmit={handleCreateProject} className="mt-5 space-y-4">
              <div>
                <label className="text-sm text-white/40">Nume proiect</label>
                <input
                  required
                  value={projectName}
                  onChange={(event) => setProjectName(event.target.value)}
                  className="mt-2 min-h-11 w-full rounded-2xl border border-white/10 bg-black px-4 text-white outline-none placeholder:text-white/25 focus:border-white/30"
                />
              </div>

              <div>
                <label className="text-sm text-white/40">
                  Descriere (opțional)
                </label>
                <textarea
                  value={projectDescription}
                  onChange={(event) =>
                    setProjectDescription(event.target.value)
                  }
                  rows={3}
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-black px-4 py-3 text-white outline-none placeholder:text-white/25 focus:border-white/30"
                />
              </div>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setProjectTarget(null)}
                  className="rounded-full border border-white/10 px-5 py-3 text-sm font-semibold text-white/60"
                >
                  Anulează
                </button>

                <button
                  type="submit"
                  disabled={creatingProject}
                  className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-white/90 disabled:opacity-50"
                >
                  {creatingProject ? "Se creează..." : "Creează proiect"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function StatusBadge({ status }) {
  const classes = {
    ACTIVE: "bg-emerald-500/15 text-emerald-200",
    PENDING: "bg-yellow-500/15 text-yellow-100",
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

export default AdminClients;
