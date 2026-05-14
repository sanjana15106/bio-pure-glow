import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Area, AreaChart, ResponsiveContainer, Line, LineChart } from "recharts";
import { CircularGauge } from "./Gauge";
import { useLiveMetrics } from "./useLiveMetrics";
import { SectionHeading } from "./SystemFlow";
import {
  Thermometer, Droplets, Wind, Gauge as GaugeIcon,
  Cpu, ShieldCheck, Database, Signal, Activity, Leaf, AlertTriangle, CheckCircle2,
} from "lucide-react";

type Series = { t: number; v: number }[];

function useSeries(value: number, length = 24): Series {
  const [data, setData] = useState<Series>(() =>
    Array.from({ length }).map((_, i) => ({ t: i, v: value }))
  );
  const ref = useRef(0);
  useEffect(() => {
    ref.current += 1;
    setData((prev) => [...prev.slice(1), { t: ref.current + length, v: value }]);
  }, [value, length]);
  return data;
}

export function Dashboard() {
  const m = useLiveMetrics();
  const co2Reduction = ((m.co2In - m.co2Out) / m.co2In) * 100;

  return (
    <section id="dashboard" className="py-24 relative">
      <div className="container mx-auto px-6">
        <SectionHeading
          eyebrow="Live Monitoring"
          title="Real-time environmental telemetry"
          desc="Sensor values stream every 2 seconds from the on-device ESP32."
        />

        {/* Featured meters with animated sparkline graphs */}
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <FeaturedMeter
            label="CO₂ Capture"
            unit="ppm out"
            value={m.co2Out}
            max={1000}
            color="var(--neon)"
            sub={`${co2Reduction.toFixed(1)}% reduction`}
            chart="area"
          />
          <FeaturedMeter
            label="AQI Index"
            unit="lower = cleaner"
            value={m.aqi}
            max={150}
            color="var(--cyan-glow)"
            sub="Good · WHO compliant"
            chart="line"
          />
          <FeaturedMeter
            label="O₂ Generation"
            unit="L / hour"
            value={m.o2}
            max={100}
            color="var(--neon)"
            sub="Photosynthesis active"
            chart="area"
          />
          <FeaturedMeter
            label="Purification"
            unit="efficiency %"
            value={m.efficiency}
            max={100}
            color="var(--cyan-glow)"
            sub="Optimal range"
            chart="line"
          />
        </div>

        {/* Secondary gauges + System health */}
        <div className="mt-6 grid lg:grid-cols-[1.4fr_1fr] gap-6">
          <div className="glass-strong p-8">
            <div className="flex items-baseline justify-between mb-6">
              <div>
                <div className="text-sm font-medium">Sensor Array</div>
                <div className="text-[11px] uppercase tracking-widest text-muted-foreground">8-channel telemetry</div>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-primary">
                <span className="size-2 rounded-full bg-primary dot-pulse" />
                LIVE · 2s interval
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              <CircularGauge value={m.co2In} max={1000} label="CO₂ In" unit="ppm" color="oklch(0.78 0.18 60)" size={120} />
              <CircularGauge value={m.co2Out} max={1000} label="CO₂ Out" unit="ppm" color="var(--neon)" size={120} />
              <CircularGauge value={m.pm25} max={100} label="PM2.5" unit="µg/m³" color="var(--cyan-glow)" size={120} />
              <CircularGauge value={m.aqi} max={150} label="AQI" unit="index" color="var(--neon)" size={120} />
              <CircularGauge value={m.o2} max={100} label="O₂ Out" unit="L/h" color="var(--neon)" size={120} />
              <CircularGauge value={m.efficiency} max={100} label="Efficiency" unit="%" color="var(--cyan-glow)" size={120} />
              <CircularGauge value={m.temp} max={40} label="Temp" unit="°C" color="oklch(0.78 0.18 60)" size={120} />
              <CircularGauge value={m.humidity} max={100} label="Humidity" unit="%RH" color="var(--cyan-glow)" size={120} />
            </div>
          </div>

          <div className="space-y-4">
            <LiveCard icon={GaugeIcon} label="CO₂ Reduction" value={`${co2Reduction.toFixed(1)}%`} sub="Net capture rate" />
            <LiveCard icon={Wind} label="Air Throughput" value={`${(120 + m.efficiency).toFixed(0)} m³/h`} sub="Volumetric flow" />
            <LiveCard icon={Thermometer} label="Chamber Temp" value={`${m.temp.toFixed(1)} °C`} sub="Optimal: 22–28°C" />
            <LiveCard icon={Droplets} label="Humidity" value={`${m.humidity.toFixed(0)} %`} sub="Algae thriving range" />
          </div>
        </div>

        {/* System health indicators */}
        <div className="mt-6 glass-strong p-6">
          <div className="flex items-baseline justify-between mb-5">
            <div>
              <div className="text-sm font-medium">System Health</div>
              <div className="text-[11px] uppercase tracking-widest text-muted-foreground">All subsystems</div>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-primary">
              <CheckCircle2 className="size-4" /> Nominal
            </div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <HealthBar icon={Cpu} label="ESP32 Core" value={Math.min(99, 78 + (m.efficiency - 90))} status="ok" />
            <HealthBar icon={Signal} label="Sensor Link" value={97} status="ok" />
            <HealthBar icon={Database} label="Cloud Sync" value={Math.min(99, 88 + (m.efficiency - 90) * 0.6)} status="ok" />
            <HealthBar icon={ShieldCheck} label="Filter Integrity" value={m.efficiency} status={m.efficiency > 92 ? "ok" : "warn"} />
            <HealthBar icon={Leaf} label="Algae Vitality" value={Math.min(99, 90 + (m.humidity - 55) * 0.3)} status="ok" />
            <HealthBar icon={Activity} label="Pump Pressure" value={Math.min(99, 86 + (m.temp - 24) * 1.2)} status="ok" />
            <HealthBar icon={Wind} label="Airflow Rate" value={Math.min(99, 80 + m.efficiency * 0.15)} status="ok" />
            <HealthBar icon={AlertTriangle} label="Anomalies" value={2} suffix="" status="ok" inverse />
          </div>
        </div>
      </div>
    </section>
  );
}

function FeaturedMeter({
  label, unit, value, max, color, sub, chart,
}: { label: string; unit: string; value: number; max: number; color: string; sub: string; chart: "area" | "line" }) {
  const series = useSeries(value);
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="glass-strong p-5 relative overflow-hidden"
    >
      <div className="flex items-start justify-between">
        <div>
          <div className="text-[11px] uppercase tracking-widest text-muted-foreground">{label}</div>
          <div className="text-[10px] text-muted-foreground/70 font-mono mt-0.5">{unit}</div>
        </div>
        <span className="size-2 rounded-full bg-primary dot-pulse" />
      </div>
      <div className="flex items-end gap-4 mt-3">
        <CircularGauge value={value} max={max} label="" unit="" color={color} size={96} />
        <div className="flex-1 min-w-0">
          <div className="text-[11px] text-primary font-mono mb-1">{sub}</div>
          <div className="h-12 -mx-1">
            <ResponsiveContainer width="100%" height="100%">
              {chart === "area" ? (
                <AreaChart data={series}>
                  <defs>
                    <linearGradient id={`fm-${label}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={color} stopOpacity={0.6} />
                      <stop offset="100%" stopColor={color} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Area type="monotone" dataKey="v" stroke={color} fill={`url(#fm-${label})`} strokeWidth={2} isAnimationActive={false} />
                </AreaChart>
              ) : (
                <LineChart data={series}>
                  <Line type="monotone" dataKey="v" stroke={color} strokeWidth={2} dot={false} isAnimationActive={false} />
                </LineChart>
              )}
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function LiveCard({ icon: Icon, label, value, sub }: { icon: any; label: string; value: string; sub: string }) {
  return (
    <motion.div
      key={value}
      initial={{ opacity: 0.6, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="glass p-5 flex items-center gap-4"
    >
      <div className="size-11 rounded-xl bg-primary/10 border border-primary/40 flex items-center justify-center">
        <Icon className="size-5 text-primary" />
      </div>
      <div className="flex-1">
        <div className="text-xs uppercase tracking-widest text-muted-foreground">{label}</div>
        <div className="text-2xl font-mono font-semibold neon-text">{value}</div>
        <div className="text-[11px] text-muted-foreground">{sub}</div>
      </div>
    </motion.div>
  );
}

function HealthBar({
  icon: Icon, label, value, status, suffix = "%", inverse = false,
}: { icon: any; label: string; value: number; status: "ok" | "warn"; suffix?: string; inverse?: boolean }) {
  const color = status === "ok" ? "var(--neon)" : "oklch(0.78 0.18 60)";
  const pct = Math.max(4, Math.min(100, value));
  return (
    <div className="glass p-4">
      <div className="flex items-center gap-2">
        <Icon className="size-4 text-primary" />
        <span className="text-xs uppercase tracking-widest text-muted-foreground">{label}</span>
        <span className="ml-auto font-mono text-sm" style={{ color }}>
          {inverse ? value : value.toFixed(0)}{suffix}
        </span>
      </div>
      <div className="mt-3 h-1.5 rounded-full bg-primary/10 overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: color, boxShadow: `0 0 10px ${color}` }}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}
