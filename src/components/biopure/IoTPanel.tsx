import { Cpu, Wifi, Cloud, Activity } from "lucide-react";
import { SectionHeading } from "./SystemFlow";

const items = [
  { icon: Cpu, label: "ESP32", status: "Connected", uptime: "14d 06h" },
  { icon: Wifi, label: "Sensors", status: "8/8 Online", uptime: "All channels" },
  { icon: Cloud, label: "Cloud Sync", status: "Active", uptime: "MQTT @ 1Hz" },
  { icon: Activity, label: "System Health", status: "Good", uptime: "0 anomalies" },
];

export function IoTPanel() {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-6">
        <SectionHeading eyebrow="IoT Monitoring" title="Edge devices & cloud link" />
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {items.map((it) => (
            <div key={it.label} className="glass p-5 flex items-center gap-4">
              <div className="size-12 rounded-xl bg-primary/10 border border-primary/40 flex items-center justify-center">
                <it.icon className="size-5 text-primary" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-primary dot-pulse" />
                  <div className="text-sm font-medium">{it.label}</div>
                </div>
                <div className="text-primary font-mono text-sm mt-1">{it.status}</div>
                <div className="text-[11px] text-muted-foreground">{it.uptime}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
