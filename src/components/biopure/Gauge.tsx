import { motion } from "framer-motion";

export function CircularGauge({
  value,
  max = 100,
  label,
  unit = "",
  color = "var(--neon)",
  size = 140,
}: {
  value: number;
  max?: number;
  label: string;
  unit?: string;
  color?: string;
  size?: number;
}) {
  const pct = Math.min(1, value / max);
  const r = size / 2 - 10;
  const c = 2 * Math.PI * r;
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            stroke="oklch(1 0 0 / 0.08)"
            strokeWidth={8}
            fill="none"
          />
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            stroke={color}
            strokeWidth={8}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={c}
            initial={{ strokeDashoffset: c }}
            animate={{ strokeDashoffset: c * (1 - pct) }}
            transition={{ duration: 1, ease: "easeOut" }}
            style={{ filter: `drop-shadow(0 0 6px ${color})` }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-mono text-2xl font-semibold text-foreground">
            {value.toFixed(value < 10 ? 1 : 0)}
          </span>
          <span className="text-[10px] uppercase tracking-widest text-muted-foreground">{unit}</span>
        </div>
      </div>
      <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">{label}</span>
    </div>
  );
}
