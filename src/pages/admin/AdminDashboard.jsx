import { useEffect, useState } from "react";
import { BarChart3, FileText, Inbox, MousePointerClick } from "lucide-react";

import { getAdminDashboard } from "../../lib/adminApi";

function AdminDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getAdminDashboard()
      .then((response) => setData(response.data))
      .catch(() => setError("Nu am putut încărca datele dashboard-ului."))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-white/50">Se încarcă...</p>;
  if (error || !data) return <p className="text-white/50">{error || "Nu am putut încărca datele."}</p>;

  const stats = data.stats;

  return (
    <div>
      <PageHeader
        title="Dashboard"
        text="Privire rapidă asupra cererilor, studiilor de caz și conversiilor."
      />

      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          icon={<Inbox />}
          label="Cereri contact"
          value={stats.totalContacts}
          helper={`${stats.newContacts} noi`}
        />

        <StatCard
          icon={<FileText />}
          label="Studii de caz"
          value={stats.totalCaseStudies}
          helper={`${stats.publishedCaseStudies} publicate`}
        />

        <StatCard
          icon={<BarChart3 />}
          label="Sesiuni"
          value={stats.totalSessions}
          helper={`${stats.totalEvents} evenimente`}
        />

        <StatCard
          icon={<MousePointerClick />}
          label="Conversie"
          value={`${stats.conversionRate}%`}
          helper={`${stats.convertedSessions} conversii`}
        />
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-2">
        <Panel title="Ultimele cereri">
          <div className="space-y-3">
            {data.latestContacts.map((item) => (
              <div
                key={item.id}
                className="rounded-2xl border border-white/10 bg-white/[0.025] p-4"
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="mt-1 text-sm text-white/40">{item.email}</p>
                  </div>

                  <span className="rounded-full bg-white/[0.08] px-3 py-1 text-xs text-white/55">
                    {item.status}
                  </span>
                </div>

                <p className="mt-3 text-sm text-white/35">
                  Pachet: {item.selectedPlan || "-"}
                </p>
              </div>
            ))}
          </div>
        </Panel>

        <Panel title="Ultimele studii de caz">
          <div className="space-y-3">
            {data.latestCaseStudies.map((item) => (
              <div
                key={item.id}
                className="rounded-2xl border border-white/10 bg-white/[0.025] p-4"
              >
                <p className="font-medium">{item.title}</p>
                <p className="mt-1 text-sm text-white/40">
                  /studii-de-caz/{item.slug}
                </p>

                <span className="mt-3 inline-flex rounded-full bg-white/[0.08] px-3 py-1 text-xs text-white/55">
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </Panel>
      </div>
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

function StatCard({ icon, label, value, helper }) {
  return (
    <div className="rounded-[1.7rem] border border-white/10 bg-white/[0.035] p-5">
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/[0.07] text-white/70">
        {icon}
      </div>

      <p className="mt-5 text-sm text-white/40">{label}</p>
      <p className="mt-2 text-3xl font-semibold">{value}</p>
      <p className="mt-2 text-sm text-white/35">{helper}</p>
    </div>
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

export default AdminDashboard;