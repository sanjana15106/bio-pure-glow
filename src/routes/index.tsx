import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/biopure/Nav";
import { Hero } from "@/components/biopure/Hero";
import { SystemFlow } from "@/components/biopure/SystemFlow";
import { Dashboard } from "@/components/biopure/Dashboard";
import { AlgaeTank } from "@/components/biopure/AlgaeTank";
import { SectionHeading } from "@/components/biopure/SystemFlow";
import { Analytics } from "@/components/biopure/Analytics";
import { AIPanel } from "@/components/biopure/AIPanel";
import { IoTPanel } from "@/components/biopure/IoTPanel";
import { Alerts } from "@/components/biopure/Alerts";
import { Sustainability } from "@/components/biopure/Sustainability";
import { DigitalTwin } from "@/components/biopure/DigitalTwin";
import { Footer } from "@/components/biopure/Footer";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "BioPure — Intelligent Algae Carbon Capture" },
      { name: "description", content: "AI-powered algae-based air purification and carbon capture platform with live IoT monitoring." },
    ],
  }),
});

function Index() {
  return (
    <div className="min-h-screen text-foreground">
      <Nav />
      <Hero />
      <SystemFlow />
      <Dashboard />

      {/* Algae chamber spotlight */}
      <section className="py-24 relative">
        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <SectionHeading
              eyebrow="Algae Chamber"
              title="Where photosynthesis meets engineering"
              desc="A bioreactor of cultivated Chlorella consumes captured CO₂ and releases pure oxygen, monitored continuously by optical and chemical sensors."
            />
            <ul className="mt-8 space-y-3 text-sm text-muted-foreground">
              {[
                "Spectral light tuning for max chlorophyll yield",
                "Closed-loop pH & nutrient regulation",
                "Self-cleaning optical clarity sensor",
                "Algae density: 4.2 g/L · Optimal range",
              ].map((t) => (
                <li key={t} className="flex items-center gap-3">
                  <span className="size-1.5 rounded-full bg-primary" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex justify-center">
            <AlgaeTank size={320} />
          </div>
        </div>
      </section>

      <DigitalTwin />
      <Analytics />
      <div id="ai"><AIPanel /></div>
      <IoTPanel />
      <Alerts />
      <Sustainability />
      <Footer />
    </div>
  );
}
