export function AirParticles({ count = 30 }: { count?: number }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: count }).map((_, i) => {
        const top = Math.random() * 100;
        const dur = 6 + Math.random() * 10;
        const delay = Math.random() * 8;
        const size = 2 + Math.random() * 3;
        return (
          <span
            key={i}
            className="particle absolute rounded-full bg-primary/70"
            style={{
              top: `${top}%`,
              width: size,
              height: size,
              animationDuration: `${dur}s`,
              animationDelay: `${delay}s`,
              boxShadow: "0 0 8px var(--neon)",
            }}
          />
        );
      })}
    </div>
  );
}

export function BubbleField({ count = 20 }: { count?: number }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: count }).map((_, i) => {
        const left = Math.random() * 100;
        const dur = 4 + Math.random() * 6;
        const delay = Math.random() * 6;
        const size = 4 + Math.random() * 10;
        return (
          <span
            key={i}
            className="bubble absolute rounded-full"
            style={{
              left: `${left}%`,
              bottom: 0,
              width: size,
              height: size,
              animationDuration: `${dur}s`,
              animationDelay: `${delay}s`,
              background:
                "radial-gradient(circle at 30% 30%, oklch(0.95 0.05 145 / 0.9), oklch(0.82 0.24 145 / 0.2))",
              boxShadow: "0 0 8px oklch(0.82 0.24 145 / 0.6)",
            }}
          />
        );
      })}
    </div>
  );
}
