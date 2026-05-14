import { Github, Twitter, Mail, Leaf } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-primary/20 py-14 mt-12 relative">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-8 items-start md:items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Leaf className="size-5 text-primary" />
              <span className="font-display text-lg font-semibold">BioPure</span>
            </div>
            <p className="text-sm text-muted-foreground mt-2 max-w-md">
              Smart Algae-Based Carbon Capture & Air Purification System
            </p>
          </div>
          <div className="flex gap-3">
            {[Github, Twitter, Mail].map((Icon, i) => (
              <a key={i} href="#" className="size-10 glass flex items-center justify-center hover:border-primary/60 transition">
                <Icon className="size-4 text-primary" />
              </a>
            ))}
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-primary/10 flex flex-col sm:flex-row justify-between gap-2 text-xs text-muted-foreground font-mono">
          <span>© 2026 BioPure Systems. All systems nominal.</span>
          <span>v1.0.0 · ESP32 firmware build 240514</span>
        </div>
      </div>
    </footer>
  );
}
