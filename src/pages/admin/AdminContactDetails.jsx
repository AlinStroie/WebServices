import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Check,
  Copy,
  Mail,
  Phone,
  Trash2,
  User,
} from "lucide-react";

import {
  deleteAdminContact,
  getAdminContact,
  updateAdminContactContractSigned,
  updateAdminContactStatus,
} from "../../lib/adminApi";

const statuses = ["NEW", "READ", "REPLIED", "ARCHIVED"];

function AdminContactDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [submission, setSubmission] = useState(null);
  const [loading, setLoading] = useState(true);
  const [savingStatus, setSavingStatus] = useState(false);
  const [savingContract, setSavingContract] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState("");

  async function loadSubmission() {
    try {
      setLoading(true);
      setError("");

      const response = await getAdminContact(id);
      setSubmission(response.data);
    } catch (err) {
      setError(err.message || "Cererea nu a putut fi încărcată.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadSubmission();
  }, [id]);

  async function handleStatusChange(nextStatus) {
    try {
      setSavingStatus(true);
      setError("");

      const response = await updateAdminContactStatus(id, nextStatus);
      setSubmission(response.data);
    } catch (err) {
      setError(err.message || "Statusul nu a putut fi modificat.");
    } finally {
      setSavingStatus(false);
    }
  }

  async function handleContractSignedChange(nextValue) {
    try {
      setSavingContract(true);
      setError("");

      const response = await updateAdminContactContractSigned(id, nextValue);
      setSubmission(response.data);
    } catch (err) {
      setError(err.message || "Nu am putut actualiza statusul contractului.");
    } finally {
      setSavingContract(false);
    }
  }

  async function handleDelete() {
    const confirmed = window.confirm(
      "Sigur vrei să ștergi definitiv această cerere? Acțiunea nu poate fi anulată."
    );

    if (!confirmed) return;

    try {
      setDeleting(true);
      setError("");

      await deleteAdminContact(id);
      navigate("/admin/contacts");
    } catch (err) {
      setError(err.message || "Cererea nu a putut fi ștearsă.");
      setDeleting(false);
    }
  }

  async function copyValue(label, value) {
    if (!value) return;

    try {
      await navigator.clipboard.writeText(value);
      setCopied(label);

      window.setTimeout(() => {
        setCopied("");
      }, 1600);
    } catch {
      setCopied("");
    }
  }

  if (loading) {
    return <p className="text-white/50">Se încarcă cererea...</p>;
  }

  if (error && !submission) {
    return (
      <div>
        <BackLink />

        <div className="mt-6 rounded-2xl border border-red-400/20 bg-red-400/10 p-4 text-sm text-red-100">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div>
      <BackLink />

      <div className="mt-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <div>
          <p className="text-sm uppercase tracking-[0.28em] text-white/35">
            Cerere contact
          </p>

          <h1 className="mt-3 text-4xl font-semibold tracking-tight">
            {submission.name}
          </h1>

          <p className="mt-3 text-white/45">
            Primita la{" "}
            {new Date(submission.createdAt).toLocaleString("ro-RO")}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <StatusBadge status={submission.status} />

          <select
            value={submission.status}
            disabled={savingStatus}
            onChange={(event) => handleStatusChange(event.target.value)}
            className="rounded-2xl border border-white/10 bg-black px-4 py-3 text-sm text-white outline-none focus:border-white/30"
          >
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>

          <label className="flex items-center gap-2 rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-sm text-white/70">
            <input
              type="checkbox"
              checked={Boolean(submission.contractSigned)}
              disabled={savingContract}
              onChange={(event) =>
                handleContractSignedChange(event.target.checked)
              }
              className="h-4 w-4 accent-emerald-400"
            />
            Contract semnat
          </label>

          <button
            type="button"
            onClick={handleDelete}
            disabled={deleting}
            className="inline-flex items-center gap-2 rounded-2xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm font-medium text-red-100 transition hover:bg-red-400/20 disabled:opacity-50"
          >
            <Trash2 size={16} />
            Șterge
          </button>
        </div>
      </div>

      {submission.contractSigned ? (
        <p className="mt-4 text-sm text-emerald-300/80">
          Contract semnat — exclusă din ștergerea automată pe bază de
          retenție (3 luni).
        </p>
      ) : (
        <p className="mt-4 text-sm text-white/35">
          Fără contract semnat — se șterge automat la 3 luni de la ultima
          actualizare, dacă nu se marchează contractul ca semnat.
        </p>
      )}

      {error && (
        <div className="mt-6 rounded-2xl border border-red-400/20 bg-red-400/10 p-4 text-sm text-red-100">
          {error}
        </div>
      )}

      <div className="mt-8 grid gap-6 xl:grid-cols-[1fr_380px]">
        <div className="space-y-6">
          <Panel title="Mesaj">
            <div className="rounded-2xl border border-white/10 bg-black/25 p-5">
              <p className="whitespace-pre-line leading-8 text-white/70">
                {submission.message}
              </p>
            </div>
          </Panel>

          <Panel title="Date lead">
            <div className="grid gap-4 md:grid-cols-2">
              <InfoItem
                icon={<User size={17} />}
                label="Nume"
                value={submission.name}
              />

              <InfoItem
                icon={<Mail size={17} />}
                label="Email"
                value={submission.email}
                action={
                  <CopyButton
                    active={copied === "email"}
                    onClick={() => copyValue("email", submission.email)}
                  />
                }
              />

              <InfoItem
                icon={<Phone size={17} />}
                label="Telefon"
                value={submission.phone || "-"}
                action={
                  submission.phone ? (
                    <CopyButton
                      active={copied === "phone"}
                      onClick={() => copyValue("phone", submission.phone)}
                    />
                  ) : null
                }
              />

              <InfoItem
                label="Pachet selectat"
                value={submission.selectedPlan || "-"}
              />
            </div>
          </Panel>

          <Panel title="Tracking și atribuire">
            <div className="grid gap-4 md:grid-cols-2">
              <InfoItem label="Source page" value={submission.sourcePage || "-"} />
              <InfoItem label="Session ID" value={submission.sessionId || "-"} />
              <InfoItem label="UTM Source" value={submission.utmSource || "-"} />
              <InfoItem label="UTM Medium" value={submission.utmMedium || "-"} />
              <InfoItem
                label="UTM Campaign"
                value={submission.utmCampaign || "-"}
              />
              <InfoItem
                label="UTM Content"
                value={submission.utmContent || "-"}
              />
              <InfoItem label="UTM Term" value={submission.utmTerm || "-"} />
              <InfoItem
                label="Analytics consent"
                value={submission.consentAnalytics ? "Da" : "Nu"}
              />
            </div>
          </Panel>
        </div>

        <aside className="space-y-6">
          <Panel title="Email">
            <div className="space-y-4">
              <InfoItem
                label="Email trimis"
                value={submission.emailSent ? "Da" : "Nu"}
              />

              <InfoItem
                label="Eroare email"
                value={submission.emailError || "-"}
              />

              <a
                href={`mailto:${submission.email}`}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-white/90"
              >
                <Mail size={16} />
                Răspunde pe email
              </a>

              {submission.phone && (
                <a
                  href={`tel:${submission.phone}`}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-white/70 transition hover:bg-white hover:text-black"
                >
                  <Phone size={16} />
                  Sună clientul
                </a>
              )}
            </div>
          </Panel>

          <Panel title="Sistem">
            <div className="space-y-4">
              <InfoItem
                label="GDPR"
                value={submission.gdprAccepted ? "Acceptat" : "Neacceptat"}
              />

              <InfoItem
                label="Creat"
                value={new Date(submission.createdAt).toLocaleString("ro-RO")}
              />

              <InfoItem
                label="Actualizat"
                value={new Date(submission.updatedAt).toLocaleString("ro-RO")}
              />

              <InfoItem label="IP" value={submission.ipAddress || "-"} />

              <InfoItem
                label="User Agent"
                value={submission.userAgent || "-"}
                large
              />
            </div>
          </Panel>
        </aside>
      </div>
    </div>
  );
}

function BackLink() {
  return (
    <Link
      to="/admin/contacts"
      className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white/60 transition hover:bg-white hover:text-black"
    >
      <ArrowLeft size={16} />
      Înapoi la cereri
    </Link>
  );
}

function Panel({ title, children }) {
  return (
    <section className="rounded-[1.8rem] border border-white/10 bg-white/[0.025] p-5">
      <h2 className="text-lg font-semibold">{title}</h2>
      <div className="mt-5">{children}</div>
    </section>
  );
}

function InfoItem({ icon, label, value, action, large }) {
  return (
    <div
      className={`rounded-2xl border border-white/10 bg-black/25 p-4 ${
        large ? "md:col-span-2" : ""
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-white/30">
            {icon}
            {label}
          </p>

          <p className="mt-2 break-words text-sm leading-6 text-white/75">
            {value}
          </p>
        </div>

        {action}
      </div>
    </div>
  );
}

function CopyButton({ active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/[0.08] text-white/60 transition hover:bg-white hover:text-black"
      title="Copiază"
    >
      {active ? <Check size={16} /> : <Copy size={16} />}
    </button>
  );
}

function StatusBadge({ status }) {
  const classes = {
    NEW: "bg-blue-500/15 text-blue-200",
    READ: "bg-yellow-500/15 text-yellow-100",
    REPLIED: "bg-emerald-500/15 text-emerald-200",
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

export default AdminContactDetails;