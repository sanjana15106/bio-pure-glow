import { Leaf } from "lucide-react";

const links = [
  { href: "#dashboard", label: "Dashboard" },
  { href: "#analytics", label: "Analytics" },
  { href: "#twin", label: "Digital Twin" },
  { href: "#ai", label: "AI" },
];

export function Nav() {
  return (
    <header className="fixed top-4 inset-x-4 z-50 flex justify-center">
      <nav className="glass-strong px-4 py-2.5 flex items-center gap-6 max-w-3xl w-full">
        <div className="flex items-center gap-2">
          <Leaf className="size-4 text-primary" />
          <span className="font-display font-semibold tracking-tight">BioPure</span>
        </div>
        <div className="hidden sm:flex items-center gap-5 ml-auto">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-xs uppercase tracking-widest text-muted-foreground hover:text-primary transition">
              {l.label}
            </a>
          ))}
        </div>
        <div className="hidden sm:flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-primary">
          <span className="size-1.5 rounded-full bg-primary dot-pulse" /> Live
        </div>
      </nav>
    </header>
  );
}
