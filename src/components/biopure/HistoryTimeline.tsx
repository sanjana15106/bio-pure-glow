import { useEffect, useState } from "react";
import { AreaChart, Area, LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { Database, Wifi, Clock } from "lucide-react";

type Row = {
  recorded_at: string;
  co2_in: number;
  co2_out: number;
  aqi: number;
  o2: number;
  temperature: number;
  efficiency: number;
};

const tooltipStyle = {
  background: "oklch(0.18 0.025 170 / 0.95)",
  border: "1px solid var(--color-border)",
  borderRadius: 10,
  fontFamily: "JetBrains Mono",
  fontSize: 12,
};

function fmt(ts: string) {
  const d = new Date(ts);
  return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}:${String(d.getSeconds()).padStart(2, "0")}`;
}

export function HistoryTimeline() {
  const [rows, setRows] = useState<Row[]>([]);
  const [total, setTotal] = useState<number>(0);

  async function load() {
    const { data, error, count } = await supabase
      .from("sensor_data")
      .select("recorded_at,co2_in,co2_out,aqi,o2,temperature,efficiency", { count: "exact" })
      .order("recorded_at", { ascending: false })
      .limit(60);
    if (!error && data) {
      setRows([...data].reverse() as Row[]);
      if (typeof count === "number") setTotal(count);
    }
  }

  useEffect(() => {
    load();
    const channel = supabase
      .channel("sensor_data_stream")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "sensor_data" },
        (payload) => {
          const r = payload.new as Row;
          setRows((prev) => [...prev, r].slice(-60));
          setTotal((t) => t + 1);
        }
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const chartData = rows.map((r) => ({
    t: fmt(r.recorded_at),
    co2: Number(r.co2_in),
    out: Number(r.co2_out),
    aqi: Number(r.aqi),
    o2: Number(r.o2),
    temp: Number(r.temperature),
    eff: Number(r.efficiency),
  }));

  const latest = rows[rows.length - 1];

  return (
    <div className="mt-10 glass-strong p-6">
      <div className="flex flex-wrap items-center gap-4 justify-between mb-6">
        <div>
          <div className="text-[11px] uppercase tracking-[0.25em] text-primary/80 font-mono">
            Cloud Telemetry History
          </div>
          <div className="text-xl font-medium mt-1">Persisted sensor stream</div>
          <div className="text-xs text-muted-foreground mt-1">
            Live writes to the cloud every 2 seconds · last 60 samples
          </div>
        </div>
        <div className="flex items-center gap-3 text-xs font-mono">
          <Stat icon={Database} label="Total records" value={total.toLocaleString()} />
          <Stat icon={Wifi} label="Live" value="streaming" pulse />
          <Stat icon={Clock} label="Last sample" value={latest ? fmt(latest.recorded_at) : "—"} />
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <TimelineCard title="CO₂ In / Out (ppm)">
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="hg1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--neon)" stopOpacity={0.5} />
                  <stop offset="100%" stopColor="var(--neon)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="oklch(1 0 0 / 0.06)" vertical={false} />
              <XAxis dataKey="t" stroke="oklch(0.7 0 0)" fontSize={10} minTickGap={32} />
              <YAxis stroke="oklch(0.7 0 0)" fontSize={10} />
              <Tooltip contentStyle={tooltipStyle} />
              <Area type="monotone" dataKey="co2" stroke="var(--neon)" fill="url(#hg1)" strokeWidth={2} />
              <Area type="monotone" dataKey="out" stroke="var(--cyan-glow)" fill="transparent" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </TimelineCard>

        <TimelineCard title="AQI & Oxygen">
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={chartData}>
              <CartesianGrid stroke="oklch(1 0 0 / 0.06)" vertical={false} />
              <XAxis dataKey="t" stroke="oklch(0.7 0 0)" fontSize={10} minTickGap={32} />
              <YAxis stroke="oklch(0.7 0 0)" fontSize={10} />
              <Tooltip contentStyle={tooltipStyle} />
              <Line type="monotone" dataKey="aqi" stroke="var(--neon)" strokeWidth={2.2} dot={false} />
              <Line type="monotone" dataKey="o2" stroke="var(--cyan-glow)" strokeWidth={2.2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </TimelineCard>

        <TimelineCard title="Chamber Temperature (°C)">
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="hg2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--cyan-glow)" stopOpacity={0.5} />
                  <stop offset="100%" stopColor="var(--cyan-glow)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="oklch(1 0 0 / 0.06)" vertical={false} />
              <XAxis dataKey="t" stroke="oklch(0.7 0 0)" fontSize={10} minTickGap={32} />
              <YAxis stroke="oklch(0.7 0 0)" fontSize={10} domain={["auto", "auto"]} />
              <Tooltip contentStyle={tooltipStyle} />
              <Area type="monotone" dataKey="temp" stroke="var(--cyan-glow)" fill="url(#hg2)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </TimelineCard>

        <TimelineCard title="Purification Efficiency (%)">
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={chartData}>
              <CartesianGrid stroke="oklch(1 0 0 / 0.06)" vertical={false} />
              <XAxis dataKey="t" stroke="oklch(0.7 0 0)" fontSize={10} minTickGap={32} />
              <YAxis stroke="oklch(0.7 0 0)" fontSize={10} domain={[80, 100]} />
              <Tooltip contentStyle={tooltipStyle} />
              <Line type="monotone" dataKey="eff" stroke="var(--neon)" strokeWidth={2.4} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </TimelineCard>
      </div>

      <div className="mt-6">
        <div className="text-[11px] uppercase tracking-widest text-muted-foreground mb-3">
          Recent events
        </div>
        <div className="space-y-2 max-h-56 overflow-y-auto pr-2">
          {[...rows].reverse().slice(0, 12).map((r, i) => (
            <motion.div
              key={r.recorded_at + i}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-4 text-xs font-mono py-2 px-3 rounded-lg border border-primary/10 bg-primary/5"
            >
              <span className="size-2 rounded-full bg-primary dot-pulse shrink-0" />
              <span className="text-muted-foreground w-20">{fmt(r.recorded_at)}</span>
              <span>CO₂ <span className="text-primary">{Number(r.co2_in).toFixed(0)}</span> ppm</span>
              <span>AQI <span className="text-primary">{Number(r.aqi).toFixed(0)}</span></span>
              <span>O₂ <span className="text-primary">{Number(r.o2).toFixed(1)}</span></span>
              <span>T <span className="text-primary">{Number(r.temperature).toFixed(1)}°</span></span>
              <span className="ml-auto text-primary">{Number(r.efficiency).toFixed(1)}%</span>
            </motion.div>
          ))}
          {rows.length === 0 && (
            <div className="text-xs text-muted-foreground py-6 text-center">
              Awaiting first sensor sample…
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function TimelineCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="glass p-4">
      <div className="text-xs uppercase tracking-widest text-muted-foreground mb-3">{title}</div>
      {children}
    </div>
  );
}

function Stat({
  icon: Icon,
  label,
  value,
  pulse,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  pulse?: boolean;
}) {
  return (
    <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-primary/20 bg-primary/5">
      <Icon className="size-4 text-primary" />
      <div className="leading-tight">
        <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{label}</div>
        <div className="text-primary flex items-center gap-1.5">
          {pulse && <span className="size-1.5 rounded-full bg-primary dot-pulse" />}
          {value}
        </div>
      </div>
    </div>
  );
}