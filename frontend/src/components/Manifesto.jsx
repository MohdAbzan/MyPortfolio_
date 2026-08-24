import { Reveal, SectionHeading } from "./Reveal";
import { MANIFESTO } from "../data/portfolio";

export const Manifesto = () => (
  <section id="manifesto" data-testid="manifesto-section" className="relative py-24 md:py-36">
    <div className="max-w-7xl mx-auto px-6 md:px-10">
      <SectionHeading index="05" kicker="Operating Principles" title="The manifesto" />
      <div className="border-t" style={{ borderColor: "var(--line)" }}>
        {MANIFESTO.map((m, i) => (
          <Reveal key={m.chapter} delay={0.05}>
            <div
              data-testid={`manifesto-chapter-${m.chapter}`}
              className="group grid md:grid-cols-[120px_1fr_1.2fr] gap-4 md:gap-10 items-baseline py-10 md:py-14 border-b transition-colors duration-500 hover:bg-[var(--glass)] px-2 md:px-6 -mx-2 md:-mx-6"
              style={{ borderColor: "var(--line)" }}
            >
              <span
                className="font-display font-extrabold text-4xl md:text-6xl text-stroke transition-all duration-500 group-hover:[-webkit-text-stroke-color:var(--glow)]"
              >
                {m.chapter}
              </span>
              <h3 className="font-display text-xl md:text-3xl font-bold tracking-tight transition-colors duration-500 group-hover:text-[var(--glow)]">
                {m.title}
              </h3>
              <p className="text-sm md:text-base leading-relaxed" style={{ color: "var(--muted)" }}>
                {m.body}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);
