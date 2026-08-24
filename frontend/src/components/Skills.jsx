import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal, SectionHeading } from "./Reveal";
import { SKILL_CATEGORIES } from "../data/portfolio";

const Star = ({ style }) => (
  <span
    className="absolute rounded-full pointer-events-none"
    style={{
      ...style,
      background: "var(--text)",
      animation: `twinkle ${style.d}s ease-in-out ${style.delay}s infinite`,
    }}
  />
);

const ShootingStar = ({ delay, top, duration }) => (
  <motion.span
    className="absolute h-[2px] w-28 rounded-full pointer-events-none"
    style={{
      top,
      left: "-10%",
      background: "linear-gradient(90deg, var(--glow), transparent)",
      boxShadow: "0 0 12px var(--glow)",
    }}
    initial={{ x: 0, y: 0, opacity: 0 }}
    animate={{ x: ["0vw", "115vw"], y: ["0vh", "22vh"], opacity: [0, 1, 1, 0] }}
    transition={{ duration, delay, repeat: Infinity, repeatDelay: delay * 1.6, ease: "easeIn" }}
  />
);

export const Skills = () => {
  const [active, setActive] = useState(SKILL_CATEGORIES[0].id);

  const stars = useMemo(
    () =>
      Array.from({ length: 55 }, (_, i) => ({
        left: `${(i * 37) % 100}%`,
        top: `${(i * 53) % 100}%`,
        width: i % 3 === 0 ? 3 : 2,
        height: i % 3 === 0 ? 3 : 2,
        d: 2 + (i % 5),
        delay: (i % 7) * 0.4,
      })),
    []
  );

  const shooters = useMemo(
    () => [
      { delay: 1, top: "12%", duration: 2.6 },
      { delay: 4.5, top: "30%", duration: 3.1 },
      { delay: 8, top: "8%", duration: 2.2 },
      { delay: 12, top: "44%", duration: 3.6 },
    ],
    []
  );

  const category = SKILL_CATEGORIES.find((c) => c.id === active);

  return (
    <section id="skills" data-testid="skills-section" className="relative py-24 md:py-36 overflow-hidden">
      {/* cosmic field */}
      <div className="absolute inset-0 pointer-events-none">
        {stars.map((s, i) => (
          <Star key={i} style={s} />
        ))}
        {shooters.map((s, i) => (
          <ShootingStar key={i} {...s} />
        ))}
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[40rem] h-[40rem] rounded-full blur-[140px] opacity-10"
          style={{ background: "var(--glow)" }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-10">
        <SectionHeading index="03" kicker="Constellation" title="Skills in orbit" />

        <Reveal className="flex flex-wrap gap-3 mb-12">
          {SKILL_CATEGORIES.map((c) => (
            <button
              key={c.id}
              data-testid={`skill-tab-${c.id}`}
              onClick={() => setActive(c.id)}
              className="px-5 py-2.5 rounded-full font-code text-xs tracking-[0.15em] uppercase transition-all duration-300"
              style={{
                background: active === c.id ? "var(--glow)" : "var(--glass)",
                color: active === c.id ? "#03040b" : "var(--muted)",
                border: `1px solid ${active === c.id ? "var(--glow)" : "var(--line)"}`,
                boxShadow: active === c.id ? "0 0 24px color-mix(in srgb, var(--glow) 45%, transparent)" : "none",
              }}
            >
              {c.label}
            </button>
          ))}
        </Reveal>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            data-testid="skill-badges-grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-wrap gap-4"
          >
            {category.skills.map((skill, i) => {
              const seed = (i * 97 + active.length * 13) % 100;
              return (
                <motion.span
                  key={skill}
                  data-testid={`skill-badge-${skill.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                  initial={{
                    opacity: 0,
                    x: seed % 2 ? 220 + seed : -220 - seed,
                    y: seed % 3 ? -140 : 140,
                    scale: 0.4,
                    rotate: seed % 2 ? 14 : -14,
                  }}
                  animate={{ opacity: 1, x: 0, y: 0, scale: 1, rotate: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 90,
                    damping: 15,
                    delay: i * 0.08,
                  }}
                  whileHover={{
                    scale: 1.1,
                    y: -6,
                    boxShadow: "0 0 30px color-mix(in srgb, var(--glow) 55%, transparent)",
                  }}
                  className="inline-flex items-center gap-2.5 glass-panel rounded-full px-5 py-3 text-sm md:text-base cursor-default"
                >
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{
                      background: i % 3 === 1 ? "var(--amber)" : "var(--glow)",
                      boxShadow: `0 0 10px ${i % 3 === 1 ? "var(--amber)" : "var(--glow)"}`,
                    }}
                  />
                  {skill}
                </motion.span>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
