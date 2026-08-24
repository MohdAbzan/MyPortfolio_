import { FolderCog, Headset, Plane, Leaf, BarChart3, Sparkles } from "lucide-react";
import { Reveal, SectionHeading } from "./Reveal";
import { SERVICES } from "../data/portfolio";

const ICONS = { FolderCog, Headset, Plane, Leaf, BarChart3, Sparkles };

export const Services = () => (
  <section id="services" data-testid="services-section" className="relative py-24 md:py-36">
    <div className="max-w-7xl mx-auto px-6 md:px-10">
      <SectionHeading index="04" kicker="Ground Crew" title="What I do" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
        {SERVICES.map((s, i) => {
          const Icon = ICONS[s.icon];
          return (
            <Reveal key={s.title} delay={(i % 3) * 0.12}>
              <div
                data-testid={`service-card-${s.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                className="group relative h-full glass-panel rounded-3xl p-8 overflow-hidden transition-[border-color,transform] duration-500 hover:-translate-y-2 hover:border-[var(--glow)]"
              >
                <div
                  className="absolute -top-16 -right-16 w-44 h-44 rounded-full blur-3xl opacity-0 group-hover:opacity-25 transition-opacity duration-500"
                  style={{ background: i % 2 ? "var(--amber)" : "var(--glow)" }}
                />
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6"
                  style={{
                    background: "color-mix(in srgb, var(--glow) 12%, transparent)",
                    border: "1px solid var(--line)",
                  }}
                >
                  <Icon size={22} style={{ color: "var(--glow)" }} />
                </div>
                <h3 className="font-display text-base md:text-lg font-bold mb-3">{s.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
                  {s.body}
                </p>
              </div>
            </Reveal>
          );
        })}
      </div>
    </div>
  </section>
);
