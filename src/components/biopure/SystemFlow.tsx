import { motion } from "framer-motion";
import { Wind, Filter, Shield, Atom, FlaskConical, Cpu, Sparkles } from "lucide-react";

const stages = [
  { icon: Wind, name: "Air Intake", desc: "Ambient air drawn in" },
  { icon: Filter, name: "Pre Filter", desc: "Removes large dust" },
  { icon: Shield, name: "HEPA Filter", desc: "99.97% PM trapped" },
  { icon: Atom, name: "Carbon Filter", desc: "Adsorbs VOCs & odor" },
  { icon: FlaskConical, name: "Algae Chamber", desc: "Photosynthesis CO₂→O₂" },
  { icon: Cpu, name: "Sensors", desc: "Live telemetry" },
  { icon: Sparkles, name: "Clean Air Output", desc: "Purified air released" },
];

export function SystemFlow() {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-6">
        <SectionHeading
          eyebrow="System Flow"
          title="A 7-stage purification pipeline"
          desc="Each stage is monitored independently for efficiency and safety."
        />

        <div className="mt-14 relative">
          <div className="absolute left-0 right-0 top-1/2 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent hidden md:block" />
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6">
            {stages.map((s, i) => (
              <motion.div
                key={s.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="glass p-4 flex flex-col items-center text-center relative"
              >
                <div className="size-12 rounded-full bg-primary/10 border border-primary/40 flex items-center justify-center mb-3 dot-pulse">
                  <s.icon className="size-5 text-primary" />
                </div>
                <div className="text-sm font-medium">{s.name}</div>
                <div className="text-[11px] text-muted-foreground mt-1">{s.desc}</div>
                <div className="text-[10px] font-mono text-primary/60 mt-2">0{i + 1}</div>
              </motion.div>
            ))}
          </div>

          {/* moving particles across flow */}
          <div className="pointer-events-none absolute left-0 right-0 top-1/2 h-1 hidden md:block">
            {Array.from({ length: 6 }).map((_, i) => (
              <motion.span
                key={i}
                className="absolute size-1.5 rounded-full bg-primary"
                style={{ top: -2, boxShadow: "0 0 10px var(--neon)" }}
                animate={{ left: ["0%", "100%"] }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  delay: i * 1.0,
                  ease: "linear",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function SectionHeading({
  eyebrow, title, desc,
}: { eyebrow: string; title: string; desc?: string }) {
  return (
    <div className="max-w-2xl">
      <div className="text-xs font-mono uppercase tracking-[0.25em] text-primary mb-3">{eyebrow}</div>
      <h2 className="text-3xl md:text-5xl font-display font-semibold tracking-tight">{title}</h2>
      {desc && <p className="mt-4 text-muted-foreground">{desc}</p>}
    </div>
  );
}
