import { motion } from "framer-motion";
import { ArrowRight, Activity, Leaf } from "lucide-react";
import { AlgaeTank } from "./AlgaeTank";
import { AirParticles } from "./Particles";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden grid-bg">
      <AirParticles count={40} />
      <div className="absolute inset-0 -z-10" style={{ background: "var(--gradient-radial-glow)" }} />

      <div className="container mx-auto px-6 py-24 grid lg:grid-cols-[1.2fr_1fr] gap-16 items-center relative">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 glass px-3 py-1.5 mb-6"
          >
            <Leaf className="size-3.5 text-primary" />
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-primary">
              Algae × AI × IoT
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-display font-semibold leading-[1.05] tracking-tight"
          >
            BioPure
            <span className="block neon-text mt-2">
              Intelligent Algae<br />Carbon Capture
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
            className="mt-6 max-w-xl text-lg text-muted-foreground leading-relaxed"
          >
            An AI-powered algae-based air purification and carbon capture
            platform designed for sustainable environments.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <a
              href="#dashboard"
              className="group inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3 font-medium neon-border hover:scale-[1.02] transition"
            >
              <Activity className="size-4" />
              Start Monitoring
              <ArrowRight className="size-4 group-hover:translate-x-0.5 transition" />
            </a>
            <a
              href="#analytics"
              className="inline-flex items-center gap-2 rounded-full glass px-6 py-3 font-medium hover:border-primary/60 transition"
            >
              View Analytics
            </a>
          </motion.div>

          <div className="mt-12 grid grid-cols-3 gap-6 max-w-md">
            {[
              { k: "CO₂ Captured", v: "12.4t" },
              { k: "Uptime", v: "99.97%" },
              { k: "Sensors", v: "24/7" },
            ].map((s) => (
              <div key={s.k} className="border-l border-primary/40 pl-3">
                <div className="text-2xl font-mono font-semibold neon-text">{s.v}</div>
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{s.k}</div>
              </div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="flex justify-center"
        >
          <AlgaeTank size={300} />
        </motion.div>
      </div>
    </section>
  );
}
