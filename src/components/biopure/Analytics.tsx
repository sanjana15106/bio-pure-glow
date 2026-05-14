import { useMemo } from "react";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, Area, AreaChart } from "recharts";
import { SectionHeading } from "./SystemFlow";

const COLORS = ["var(--neon)", "var(--cyan-glow)", "oklch(0.65 0.18 165)", "oklch(0.78 0.18 120)"];

function gen(n: number, base: number, amp: number) {
  return Array.from({ length: n }).map((_, i) => ({
    t: `${i + 1}`,
    a: Math.round(base + Math.sin(i / 2) * amp + Math.random() * amp * 0.5),
    b: Math.round(base * 0.7 + Math.cos(i / 3) * amp + Math.random() * amp * 0.4),
  }));
}

export function Analytics() {
  const co2 = useMemo(() => gen(14, 420, 80), []);
  const aqi = useMemo(() => gen(14, 55, 25), []);
  const daily = useMemo(() => gen(7, 180, 60), []);
  const filters = [
    { name: "Pre Filter", value: 92 },
    { name: "HEPA", value: 99 },
    { name: "Carbon", value: 87 },
    { name: "Algae", value: 95 },
  ];

  return (
    <section id="analytics" className="py-24 relative">
      <div className="container mx-auto px-6">
        <SectionHeading
          eyebrow="Analytics"
          title="Performance trends & insights"
          desc="Aggregated telemetry from the past 14 days of operation."
        />

        <div className="mt-12 grid lg:grid-cols-3 gap-6">
          <ChartCard title="CO₂ Reduction Over Time" subtitle="ppm in vs out">
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={co2}>
                <defs>
                  <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--neon)" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="var(--neon)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="oklch(1 0 0 / 0.06)" vertical={false} />
                <XAxis dataKey="t" stroke="oklch(0.7 0 0)" fontSize={11} />
                <YAxis stroke="oklch(0.7 0 0)" fontSize={11} />
                <Tooltip contentStyle={tooltipStyle} />
                <Area type="monotone" dataKey="a" stroke="var(--neon)" fill="url(#g1)" strokeWidth={2} />
                <Area type="monotone" dataKey="b" stroke="var(--cyan-glow)" fill="transparent" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="AQI Improvement" subtitle="lower is better">
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={aqi}>
                <CartesianGrid stroke="oklch(1 0 0 / 0.06)" vertical={false} />
                <XAxis dataKey="t" stroke="oklch(0.7 0 0)" fontSize={11} />
                <YAxis stroke="oklch(0.7 0 0)" fontSize={11} />
                <Tooltip contentStyle={tooltipStyle} />
                <Line type="monotone" dataKey="a" stroke="var(--neon)" strokeWidth={2.5} dot={false} />
                <Line type="monotone" dataKey="b" stroke="var(--cyan-glow)" strokeWidth={2} dot={false} strokeDasharray="4 4" />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Daily Purified Air" subtitle="m³ / day">
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={daily}>
                <CartesianGrid stroke="oklch(1 0 0 / 0.06)" vertical={false} />
                <XAxis dataKey="t" stroke="oklch(0.7 0 0)" fontSize={11} />
                <YAxis stroke="oklch(0.7 0 0)" fontSize={11} />
                <Tooltip contentStyle={tooltipStyle} />
                <Bar dataKey="a" fill="var(--neon)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Filter Efficiency" subtitle="per stage %">
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={filters} dataKey="value" innerRadius={50} outerRadius={85} paddingAngle={4}>
                  {filters.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
                </Pie>
                <Tooltip contentStyle={tooltipStyle} />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-2 text-xs mt-2">
              {filters.map((f, i) => (
                <div key={f.name} className="flex items-center gap-2">
                  <span className="size-2 rounded-full" style={{ background: COLORS[i] }} />
                  <span className="text-muted-foreground">{f.name}</span>
                  <span className="ml-auto font-mono">{f.value}%</span>
                </div>
              ))}
            </div>
          </ChartCard>

          <ChartCard title="Oxygen Generation Trend" subtitle="L / h" className="lg:col-span-2">
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={gen(20, 70, 15)}>
                <defs>
                  <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--cyan-glow)" stopOpacity={0.6} />
                    <stop offset="100%" stopColor="var(--cyan-glow)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="oklch(1 0 0 / 0.06)" vertical={false} />
                <XAxis dataKey="t" stroke="oklch(0.7 0 0)" fontSize={11} />
                <YAxis stroke="oklch(0.7 0 0)" fontSize={11} />
                <Tooltip contentStyle={tooltipStyle} />
                <Area type="monotone" dataKey="a" stroke="var(--cyan-glow)" fill="url(#g2)" strokeWidth={2.5} />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>
      </div>
    </section>
  );
}

const tooltipStyle = {
  background: "oklch(0.18 0.025 170 / 0.95)",
  border: "1px solid var(--color-border)",
  borderRadius: 10,
  fontFamily: "JetBrains Mono",
  fontSize: 12,
};

function ChartCard({ title, subtitle, children, className = "" }: any) {
  return (
    <div className={`glass-strong p-5 ${className}`}>
      <div className="flex items-baseline justify-between mb-4">
        <div>
          <div className="text-sm font-medium">{title}</div>
          <div className="text-[11px] uppercase tracking-widest text-muted-foreground">{subtitle}</div>
        </div>
        <span className="size-2 rounded-full bg-primary dot-pulse" />
      </div>
      {children}
    </div>
  );
}
