import { useEffect, useState } from "react";
import { BarChart3, Eye, MousePointerClick, Target } from "lucide-react";

import { getAdminAnalytics } from "../../lib/adminApi";

function AdminAnalytics() {
  const [days, setDays] = useState(30);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    getAdminAnalytics(days)
      .then((response) => setData(response.data))
      .finally(() => setLoading(false));
  }, [days]);

  if (loading) return <p className="text-white/50">Se încarcă...</p>;

  const totals = data.totals;

  return (
    <div>
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <PageHeader
          title="Analytics"
          text="Statistici despre trafic, CTA-uri, blog și conversii."
        />

        <select
          value={days}
          onChange={(event) => setDays(Number(event.target.value))}
          className="rounded-2xl border border-white/10 bg-white/[0.035] px-4 py-3 text-white"
        >
          <option value={7}>Ultimele 7 zile</option>
          <option value={30}>Ultimele 30 zile</option>
          <option value={90}>Ultimele 90 zile</option>
        </select>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          icon={<Eye />}
          label="Page views"
          value={totals.pageViews}
          helper={`${totals.sessions} sesiuni`}
        />

        <StatCard
          icon={<BarChart3 />}
          label="Blog views"
          value={totals.blogViews}
          helper="Vizualizări articole"
        />

        <StatCard
          icon={<MousePointerClick />}
          label="CTA clicks"
          value={totals.ctaClicks}
          helper={`${totals.pricingClicks} pricing clicks`}
        />

        <StatCard
          icon={<Target />}
          label="Conversie"
          value={`${totals.conversionRate}%`}
          helper={`${totals.contactSuccess} formulare trimise`}
        />
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-2">
        <ListPanel title="Top pagini" items={data.topPages} labelKey="path" />
        <ListPanel
          title="Top articole"
          items={data.topBlogPosts}
          labelKey="slug"
        />
        <ListPanel title="Top CTA-uri" items={data.topCtas} labelKey="label" />
        <ListPanel
          title="Surse UTM"
          items={data.topUtmSources}
          labelKey="source"
        />
        <ListPanel
          title="Pachete selectate"
          items={data.selectedPlans}
          labelKey="plan"
        />
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

function ListPanel({ title, items, labelKey }) {
  return (
    <section className="rounded-[1.8rem] border border-white/10 bg-white/[0.025] p-5">
      <h2 className="text-lg font-semibold">{title}</h2>

      <div className="mt-5 space-y-3">
        {items.length === 0 && (
          <p className="text-sm text-white/35">Nu există date încă.</p>
        )}

        {items.map((item, index) => (
          <div
            key={`${item[labelKey]}-${index}`}
            className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.025] p-4"
          >
            <p className="truncate text-sm text-white/70">
              {item[labelKey] || "Necunoscut"}
            </p>

            <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-black">
              {item.count}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default AdminAnalytics;