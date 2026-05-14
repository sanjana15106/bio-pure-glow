import { AlertTriangle, CheckCircle2, Wrench, Leaf } from "lucide-react";
import { SectionHeading } from "./SystemFlow";

const alerts = [
  { icon: AlertTriangle, title: "High CO₂ detected", desc: "Zone-A intake spiked to 712 ppm at 13:42", tone: "warn", time: "2m ago" },
  { icon: CheckCircle2, title: "Air quality improved", desc: "AQI dropped from 78 → 32 in last hour", tone: "good", time: "8m ago" },
  { icon: Wrench, title: "Maintenance required", desc: "Pre-filter replacement scheduled in 4 days", tone: "info", time: "1h ago" },
  { icon: Leaf, title: "Algae growth optimal", desc: "Chlorophyll density at 96% target", tone: "good", time: "3h ago" },
];

export function Alerts() {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-6">
        <SectionHeading eyebrow="Smart Alerts" title="Notifications & system events" />
        <div className="mt-10 grid md:grid-cols-2 gap-4">
          {alerts.map((a) => {
            const color =
              a.tone === "warn" ? "oklch(0.78 0.18 60)" :
              a.tone === "good" ? "var(--neon)" : "var(--cyan-glow)";
            return (
              <div key={a.title} className="glass p-5 flex gap-4 border-l-2" style={{ borderLeftColor: color }}>
                <div
                  className="size-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: `color-mix(in oklab, ${color} 15%, transparent)` }}
                >
                  <a.icon className="size-5" style={{ color }} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div className="font-medium">{a.title}</div>
                    <div className="text-[11px] font-mono text-muted-foreground">{a.time}</div>
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">{a.desc}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
