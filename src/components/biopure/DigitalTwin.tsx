import { motion } from "framer-motion";
import { Wind, Filter, FlaskConical, Sparkles } from "lucide-react";
import { SectionHeading } from "./SystemFlow";

const stages = [
  { icon: Wind, label: "Polluted Air In", color: "oklch(0.65 0.18 40)", desc: "CO₂ · PM2.5 · VOCs" },
  { icon: Filter, label: "Multi-Stage Filters", color: "oklch(0.82 0.16 200)", desc: "HEPA + Carbon" },
  { icon: FlaskConical, label: "Algae Bioreactor", color: "oklch(0.82 0.24 145)", desc: "Photosynthesis" },
  { icon: Sparkles, label: "Clean Air Out", color: "oklch(0.92 0.18 150)", desc: "O₂ enriched" },
];

export function DigitalTwin() {
  return (
    <section id="twin" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <SectionHeading
          eyebrow="Digital Twin"
          title="Live simulation of the BioPure pipeline"
          desc="A real-time virtual replica of the physical system — watch polluted air transform into breathable oxygen."
        />

        <div className="mt-14 glass-strong p-6 md:p-10 relative overflow-hidden">
          {/* grid backdrop */}
          <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />

          {/* main pipeline */}
          <div className="relative h-[420px] md:h-[460px]">
            {/* connecting tube */}
            <div className="absolute left-[8%] right-[8%] top-1/2 -translate-y-1/2 h-20 md:h-24 rounded-full border border-primary/30"
              style={{
                background: "linear-gradient(90deg, oklch(0.65 0.18 40 / 0.15), oklch(0.82 0.16 200 / 0.12), oklch(0.82 0.24 145 / 0.18), oklch(0.92 0.18 150 / 0.15))",
                boxShadow: "inset 0 0 40px oklch(0.82 0.24 145 / 0.2)",
              }}
            />

            {/* polluted particles entering (left) */}
            {Array.from({ length: 14 }).map((_, i) => (
              <motion.span
                key={`p-${i}`}
                className="absolute rounded-full"
                style={{
                  width: 4 + Math.random() * 4,
                  height: 4 + Math.random() * 4,
                  background: "oklch(0.65 0.18 40)",
                  boxShadow: "0 0 10px oklch(0.65 0.18 40 / 0.8)",
                  top: `calc(50% + ${(Math.random() - 0.5) * 60}px)`,
                }}
                animate={{ left: ["6%", "28%"], opacity: [0, 1, 0] }}
                transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, delay: i * 0.3, ease: "linear" }}
              />
            ))}

            {/* filter zone particles (cyan) */}
            {Array.from({ length: 18 }).map((_, i) => (
              <motion.span
                key={`f-${i}`}
                className="absolute rounded-full"
                style={{
                  width: 3 + Math.random() * 3,
                  height: 3 + Math.random() * 3,
                  background: "var(--cyan-glow)",
                  boxShadow: "0 0 8px var(--cyan-glow)",
                  top: `calc(50% + ${(Math.random() - 0.5) * 50}px)`,
                }}
                animate={{ left: ["28%", "52%"], opacity: [0, 1, 0.6, 0] }}
                transition={{ duration: 2.5 + Math.random() * 1.5, repeat: Infinity, delay: i * 0.2, ease: "linear" }}
              />
            ))}

            {/* algae chamber bubbles (center-right) */}
            <div className="absolute left-[52%] right-[28%] top-1/2 -translate-y-1/2 h-32 md:h-36 rounded-2xl overflow-hidden border border-primary/50"
              style={{ background: "var(--gradient-algae)", boxShadow: "var(--shadow-glow), inset 0 0 40px oklch(0.82 0.24 145 / 0.4)" }}
            >
              {Array.from({ length: 22 }).map((_, i) => (
                <motion.span
                  key={`b-${i}`}
                  className="absolute rounded-full"
                  style={{
                    width: 5 + Math.random() * 8,
                    height: 5 + Math.random() * 8,
                    left: `${Math.random() * 95}%`,
                    background: "radial-gradient(circle at 30% 30%, oklch(0.95 0.05 145 / 0.95), oklch(0.82 0.24 145 / 0.3))",
                    boxShadow: "0 0 8px oklch(0.82 0.24 145 / 0.7)",
                  }}
                  animate={{ bottom: ["-10%", "110%"], opacity: [0, 1, 0] }}
                  transition={{ duration: 3 + Math.random() * 3, repeat: Infinity, delay: Math.random() * 4, ease: "easeOut" }}
                />
              ))}
              <motion.div
                className="absolute inset-0 mix-blend-screen opacity-50"
                style={{ background: "radial-gradient(circle at 50% 30%, oklch(0.95 0.1 150 / 0.5), transparent 60%)" }}
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            </div>

            {/* clean air exiting (right) — neon green */}
            {Array.from({ length: 16 }).map((_, i) => (
              <motion.span
                key={`c-${i}`}
                className="absolute rounded-full"
                style={{
                  width: 3 + Math.random() * 4,
                  height: 3 + Math.random() * 4,
                  background: "oklch(0.92 0.18 150)",
                  boxShadow: "0 0 12px var(--neon)",
                  top: `calc(50% + ${(Math.random() - 0.5) * 70}px)`,
                }}
                animate={{ left: ["72%", "96%"], opacity: [0, 1, 0] }}
                transition={{ duration: 2.5 + Math.random() * 2, repeat: Infinity, delay: i * 0.25, ease: "linear" }}
              />
            ))}

            {/* airflow streaks across full pipe */}
            {Array.from({ length: 5 }).map((_, i) => (
              <motion.span
                key={`s-${i}`}
                className="absolute h-px"
                style={{
                  top: `calc(50% + ${(i - 2) * 14}px)`,
                  width: 80,
                  background: "linear-gradient(90deg, transparent, var(--neon), transparent)",
                  filter: "blur(1px)",
                }}
                animate={{ left: ["6%", "96%"], opacity: [0, 0.8, 0] }}
                transition={{ duration: 4, repeat: Infinity, delay: i * 0.7, ease: "linear" }}
              />
            ))}

            {/* stage markers */}
            <div className="absolute inset-x-0 bottom-0 grid grid-cols-4 gap-2">
              {stages.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="glass p-3 flex flex-col items-center text-center"
                >
                  <div
                    className="size-9 rounded-full flex items-center justify-center mb-2 dot-pulse"
                    style={{ background: `${s.color.replace(")", " / 0.15)")}`, border: `1px solid ${s.color}` }}
                  >
                    <s.icon className="size-4" style={{ color: s.color }} />
                  </div>
                  <div className="text-[11px] md:text-xs font-medium">{s.label}</div>
                  <div className="text-[10px] text-muted-foreground mt-0.5 hidden sm:block">{s.desc}</div>
                </motion.div>
              ))}
            </div>

            {/* stage markers top labels */}
            <div className="absolute inset-x-0 top-2 grid grid-cols-4 gap-2 text-center">
              {["INPUT", "FILTRATION", "BIOREACTION", "OUTPUT"].map((t, i) => (
                <div key={t} className="text-[10px] font-mono tracking-[0.25em] text-primary/70">
                  {`0${i + 1} · ${t}`}
                </div>
              ))}
            </div>
          </div>

          {/* live readouts */}
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { k: "Inlet CO₂", v: "612 ppm", c: "oklch(0.65 0.18 40)" },
              { k: "Filter Load", v: "23%", c: "var(--cyan-glow)" },
              { k: "Algae Density", v: "4.2 g/L", c: "var(--neon)" },
              { k: "Outlet O₂", v: "+18%", c: "oklch(0.92 0.18 150)" },
            ].map((m) => (
              <div key={m.k} className="glass p-3 flex items-center justify-between">
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{m.k}</div>
                  <div className="text-lg font-display font-semibold" style={{ color: m.c }}>{m.v}</div>
                </div>
                <span className="size-2 rounded-full dot-pulse" style={{ background: m.c }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}