import { motion } from "framer-motion";
import { Cloud, Trees, Zap, Award } from "lucide-react";
import { SectionHeading } from "./SystemFlow";

const metrics = [
  { icon: Cloud, label: "Total CO₂ Captured", value: "12,438", unit: "kg" },
  { icon: Trees, label: "Trees Equivalent Saved", value: "568", unit: "trees" },
  { icon: Zap, label: "Energy Consumption", value: "0.42", unit: "kWh / day" },
  { icon: Award, label: "Carbon Neutrality Score", value: "A+", unit: "rating" },
];

export function Sustainability() {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-6">
        <SectionHeading eyebrow="Sustainability" title="Impact metrics, measured" />
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {metrics.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="glass-strong p-6"
            >
              <m.icon className="size-6 text-primary" />
              <div className="text-xs uppercase tracking-widest text-muted-foreground mt-4">{m.label}</div>
              <div className="flex items-baseline gap-1.5 mt-2">
                <span className="text-4xl font-mono font-semibold neon-text">{m.value}</span>
                <span className="text-xs text-muted-foreground">{m.unit}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
