import { motion } from "framer-motion";
import { BubbleField } from "./Particles";

export function AlgaeTank({ size = 280, label = "Photosynthesis Active" }: { size?: number; label?: string }) {
  return (
    <div className="relative" style={{ width: size, height: size * 1.3 }}>
      <div
        className="absolute inset-0 rounded-[2rem] overflow-hidden border border-primary/40"
        style={{
          background: "var(--gradient-algae)",
          boxShadow: "var(--shadow-glow), inset 0 0 60px oklch(0.82 0.24 145 / 0.4)",
        }}
      >
        {/* liquid surface wave */}
        <motion.div
          className="absolute inset-x-0 top-0 h-12"
          style={{
            background:
              "linear-gradient(180deg, oklch(0.85 0.18 150 / 0.6), transparent)",
          }}
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* light reflections */}
        <div
          className="absolute inset-0 opacity-60 mix-blend-screen"
          style={{
            background:
              "radial-gradient(circle at 30% 20%, oklch(0.95 0.1 150 / 0.4), transparent 40%), radial-gradient(circle at 70% 70%, oklch(0.82 0.16 200 / 0.25), transparent 50%)",
          }}
        />
        <BubbleField count={28} />
        {/* floating particles */}
        {Array.from({ length: 14 }).map((_, i) => (
          <motion.span
            key={i}
            className="absolute rounded-full bg-primary/70"
            style={{
              left: `${Math.random() * 90 + 5}%`,
              top: `${Math.random() * 90 + 5}%`,
              width: 3,
              height: 3,
              boxShadow: "0 0 6px var(--neon)",
            }}
            animate={{
              x: [0, Math.random() * 20 - 10, 0],
              y: [0, Math.random() * 20 - 10, 0],
            }}
            transition={{ duration: 4 + Math.random() * 3, repeat: Infinity }}
          />
        ))}
      </div>
      <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 glass px-4 py-2 flex items-center gap-2">
        <span className="size-2 rounded-full bg-primary dot-pulse" />
        <span className="text-xs font-mono uppercase tracking-widest text-primary">{label}</span>
      </div>
    </div>
  );
}
