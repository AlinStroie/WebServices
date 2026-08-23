import { useEffect, useState } from "react";
import {
  BarChart3,
  Eye,
  MousePointerClick,
  Target,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import {
  getAdminAnalytics,
  getAdminAnalyticsTimeseries,
} from "../../lib/adminApi";

function AdminAnalytics() {
  const [days, setDays] = useState(30);
  const [data, setData] = useState(null);
  const [timeseries, setTimeseries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadAnalytics() {
      try {
        setLoading(true);
        setError("");

        const [overviewResponse, timeseriesResponse] = await Promise.all([
          getAdminAnalytics(days),
          getAdminAnalyticsTimeseries(days),
        ]);

        setData(overviewResponse.data);
        setTimeseries(timeseriesResponse.data || []);
      } catch (err) {
        setError(err.message || "Nu s-au putut încărca statisticile.");
      } finally {
        setLoading(false);
      }
    }

    loadAnalytics();
  }, [days]);

  if (loading) {
    return <p className="text-white/50">Se încarcă analytics...</p>;
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-red-400/20 bg-red-400/10 p-4 text-sm text-red-100">
        {error}
      </div>
    );
  }

  if (!data) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm text-white/50">
        Nu există date de analytics.
      </div>
    );
  }

  const totals = data.totals || {};

  return (
    <div>
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <PageHeader
          title="Analytics"
          text="Statistici despre trafic, CTA-uri, studii de caz și conversii."
        />

        <select
          value={days}
          onChange={(event) => setDays(Number(event.target.value))}
          className="rounded-2xl border border-white/10 bg-black px-4 py-3 text-white outline-none focus:border-white/30"
        >
          <option value={7}>Ultimele 7 zile</option>
          <option value={30}>Ultimele 30 zile</option>
          <option value={90}>Ultimele 90 zile</option>
        </select>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          icon={<Eye size={20} />}
          label="Page views"
          value={totals.pageViews || 0}
          helper={`${totals.sessions || 0} sesiuni`}
        />

        <StatCard
          icon={<BarChart3 size={20} />}
          label="Case study views"
          value={totals.caseStudyViews || 0}
          helper="Vizualizări studii de caz"
        />

        <StatCard
          icon={<MousePointerClick size={20} />}
          label="CTA clicks"
          value={totals.ctaClicks || 0}
          helper={`${totals.pricingClicks || 0} pricing clicks`}
        />

        <StatCard
          icon={<Target size={20} />}
          label="Conversie"
          value={`${totals.conversionRate || 0}%`}
          helper={`${totals.contactSuccess || 0} formulare trimise`}
        />
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-2">
        <ChartPanel title="Page views pe zile">
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={timeseries}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255,255,255,0.08)"
              />
              <XAxis
                dataKey="date"
                stroke="rgba(255,255,255,0.35)"
                tick={{ fontSize: 12 }}
              />
              <YAxis
                stroke="rgba(255,255,255,0.35)"
                tick={{ fontSize: 12 }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="pageViews"
                name="Page views"
                stroke="rgba(255,255,255,0.95)"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartPanel>

        <ChartPanel title="Leaduri și conversii pe zile">
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={timeseries}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255,255,255,0.08)"
              />
              <XAxis
                dataKey="date"
                stroke="rgba(255,255,255,0.35)"
                tick={{ fontSize: 12 }}
              />
              <YAxis
                stroke="rgba(255,255,255,0.35)"
                tick={{ fontSize: 12 }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar
                dataKey="contacts"
                name="Cereri salvate"
                fill="rgba(255,255,255,0.8)"
                radius={[8, 8, 0, 0]}
              />
              <Bar
                dataKey="contactSuccess"
                name="Formulare trimise"
                fill="rgba(255,255,255,0.35)"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartPanel>

        <ChartPanel title="Interacțiuni pe zile">
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={timeseries}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255,255,255,0.08)"
              />
              <XAxis
                dataKey="date"
                stroke="rgba(255,255,255,0.35)"
                tick={{ fontSize: 12 }}
              />
              <YAxis
                stroke="rgba(255,255,255,0.35)"
                tick={{ fontSize: 12 }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="ctaClicks"
                name="CTA clicks"
                stroke="rgba(255,255,255,0.95)"
                strokeWidth={2}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="pricingClicks"
                name="Pricing clicks"
                stroke="rgba(255,255,255,0.55)"
                strokeWidth={2}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="outboundClicks"
                name="Outbound clicks"
                stroke="rgba(255,255,255,0.25)"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartPanel>

        <ChartPanel title="Case study views pe zile">
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={timeseries}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255,255,255,0.08)"
              />
              <XAxis
                dataKey="date"
                stroke="rgba(255,255,255,0.35)"
                tick={{ fontSize: 12 }}
              />
              <YAxis
                stroke="rgba(255,255,255,0.35)"
                tick={{ fontSize: 12 }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="caseStudyViews"
                name="Case study views"
                stroke="rgba(255,255,255,0.95)"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartPanel>
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-2">
        <ListPanel
          title="Top pagini"
          items={data.topPages || []}
          labelKey="path"
        />

        <ListPanel
          title="Top studii de caz"
          items={data.topCaseStudies || []}
          labelKey="slug"
        />

        <ListPanel
          title="Top CTA-uri"
          items={data.topCtas || []}
          labelKey="label"
        />

        <ListPanel
          title="Surse UTM"
          items={data.topUtmSources || []}
          labelKey="source"
        />

        <ListPanel
          title="Pachete selectate"
          items={data.selectedPlans || []}
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

function ChartPanel({ title, children }) {
  return (
    <section className="rounded-[1.8rem] border border-white/10 bg-white/[0.025] p-5">
      <h2 className="text-lg font-semibold">{title}</h2>
      <div className="mt-5">{children}</div>
    </section>
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
            key={`${item[labelKey] || "unknown"}-${index}`}
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

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload || payload.length === 0) return null;

  return (
    <div className="rounded-2xl border border-white/10 bg-black px-4 py-3 text-sm shadow-2xl">
      <p className="mb-2 font-medium text-white">{label}</p>

      <div className="space-y-1">
        {payload.map((item) => (
          <div
            key={item.dataKey}
            className="flex items-center justify-between gap-6 text-white/60"
          >
            <span>{item.name}</span>
            <strong className="text-white">{item.value}</strong>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminAnalytics;