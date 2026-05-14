import { SectionHeading } from "./SystemFlow";

const members = ["G Divya", "S D Sanjana", "Sai Vaishnavi SK"];

export function Team() {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-6">
        <SectionHeading eyebrow="Team Bright Minds" title="The minds behind BioPure" />
        <div className="mt-10 grid sm:grid-cols-3 gap-5">
          {members.map((name) => (
            <div key={name} className="glass-strong p-8 text-center">
              <div
                className="mx-auto size-20 rounded-full flex items-center justify-center text-2xl font-display font-semibold neon-border"
                style={{ background: "var(--gradient-algae)" }}
              >
                {name.split(" ").map((p) => p[0]).slice(0, 2).join("")}
              </div>
              <div className="mt-4 text-lg font-medium">{name}</div>
              <div className="text-xs uppercase tracking-widest text-muted-foreground mt-1">Bright Minds</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
