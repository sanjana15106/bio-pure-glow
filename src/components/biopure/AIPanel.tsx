import { motion } from "framer-motion";
import { Brain, TrendingDown, Sparkles, Wrench } from "lucide-react";
import { SectionHeading } from "./SystemFlow";

const insights = [
  { icon: Brain, label: "Predicted AQI Tomorrow", value: "32", trend: "Excellent — improving 18%", tone: "good" },
  { icon: Sparkles, label: "Optimal Algae Performance", value: "96.4%", trend: "Photosynthesis peaking 14:00", tone: "good" },
  { icon: Wrench, label: "Filter Replacement Prediction", value: "12 days", trend: "HEPA stage degrading", tone: "warn" },
  { icon: TrendingDown, label: "Expected CO₂ Reduction", value: "−214 ppm", trend: "Next 24h forecast", tone: "good" },
];

export function AIPanel() {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-6">
        <SectionHeading
          eyebrow="AI Predictions"
          title="Forecasts from the BioPure neural model"
          desc="A transformer-based model trained on 6 months of multi-sensor telemetry."
        />
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {insights.map((it, i) => (
            <motion.div
              key={it.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="glass-strong p-6 relative overflow-hidden group"
            >
              <div
                className="absolute -top-16 -right-16 size-40 rounded-full opacity-30 blur-2xl group-hover:opacity-60 transition"
                style={{ background: it.tone === "good" ? "var(--neon)" : "oklch(0.78 0.18 60)" }}
              />
              <it.icon className="size-5 text-primary mb-4" />
              <div className="text-xs uppercase tracking-widest text-muted-foreground">{it.label}</div>
              <div className="text-3xl font-mono font-semibold neon-text mt-2">{it.value}</div>
              <div className="text-[11px] text-muted-foreground mt-2">{it.trend}</div>
              <div className="mt-4 h-1 rounded-full bg-primary/10 overflow-hidden">
                <motion.div
                  className="h-full bg-primary"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${60 + i * 10}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2 }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
