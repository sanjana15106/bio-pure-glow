import { motion } from "framer-motion";
import { CircularGauge } from "./Gauge";
import { useLiveMetrics } from "./useLiveMetrics";
import { SectionHeading } from "./SystemFlow";
import { Thermometer, Droplets, Wind, Gauge as GaugeIcon } from "lucide-react";

export function Dashboard() {
  const m = useLiveMetrics();
  return (
    <section id="dashboard" className="py-24 relative">
      <div className="container mx-auto px-6">
        <SectionHeading
          eyebrow="Live Monitoring"
          title="Real-time environmental telemetry"
          desc="Sensor values stream every 2 seconds from the on-device ESP32."
        />

        <div className="mt-12 grid lg:grid-cols-[1.4fr_1fr] gap-6">
          <div className="glass-strong p-8">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              <CircularGauge value={m.co2In} max={1000} label="CO₂ In" unit="ppm" color="oklch(0.78 0.18 60)" />
              <CircularGauge value={m.co2Out} max={1000} label="CO₂ Out" unit="ppm" color="var(--neon)" />
              <CircularGauge value={m.pm25} max={100} label="PM2.5" unit="µg/m³" color="var(--cyan-glow)" />
              <CircularGauge value={m.aqi} max={150} label="AQI" unit="index" color="var(--neon)" />
              <CircularGauge value={m.o2} max={100} label="O₂ Generated" unit="L/h" color="var(--neon)" />
              <CircularGauge value={m.efficiency} max={100} label="Efficiency" unit="%" color="var(--cyan-glow)" />
              <CircularGauge value={m.temp} max={40} label="Temp" unit="°C" color="oklch(0.78 0.18 60)" />
              <CircularGauge value={m.humidity} max={100} label="Humidity" unit="%RH" color="var(--cyan-glow)" />
            </div>
          </div>

          <div className="space-y-4">
            <LiveCard icon={GaugeIcon} label="CO₂ Reduction" value={`${(((m.co2In - m.co2Out) / m.co2In) * 100).toFixed(1)}%`} sub="Net capture rate" />
            <LiveCard icon={Wind} label="Air Throughput" value={`${(120 + m.efficiency).toFixed(0)} m³/h`} sub="Volumetric flow" />
            <LiveCard icon={Thermometer} label="Chamber Temp" value={`${m.temp.toFixed(1)} °C`} sub="Optimal: 22–28°C" />
            <LiveCard icon={Droplets} label="Humidity" value={`${m.humidity.toFixed(0)} %`} sub="Algae thriving range" />
          </div>
        </div>
      </div>
    </section>
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
