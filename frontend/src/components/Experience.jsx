import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Briefcase, GraduationCap, BadgeCheck, MapPin } from "lucide-react";
import { Reveal, SectionHeading } from "./Reveal";
import { EXPERIENCE, EDUCATION, CERTIFICATIONS } from "../data/portfolio";

const BubbleCard = ({ item, index }) => {
  const ref = useRef(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const spring = { stiffness: 200, damping: 16 };
  const dx = useSpring(useTransform(mx, [0, 1], [10, -10]), spring);
  const dy = useSpring(useTransform(my, [0, 1], [8, -8]), spring);
  const ripX = useTransform(mx, [0, 1], ["0%", "100%"]);
  const ripY = useTransform(my, [0, 1], ["0%", "100%"]);

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  };

  return (
    <Reveal delay={index * 0.15}>
      <div className="relative pl-10 md:pl-16">
        {/* timeline node */}
        <span
          className="absolute left-0 md:left-4 top-8 w-4 h-4 rounded-full"
          style={{
            background: item.current ? "var(--glow)" : "var(--surface-2)",
            border: `2px solid ${item.current ? "var(--glow)" : "var(--amber)"}`,
            boxShadow: item.current ? "0 0 18px var(--glow)" : "0 0 12px color-mix(in srgb, var(--amber) 50%, transparent)",
          }}
        />
        <motion.div
          animate={{ y: [0, -7, 0] }}
          transition={{ duration: 4.5 + index * 1.4, repeat: Infinity, ease: "easeInOut" }}
        >
        <motion.div
          ref={ref}
          data-testid={`experience-card-${item.id}`}
          onMouseMove={onMove}
          onMouseLeave={() => {
            mx.set(0.5);
            my.set(0.5);
          }}
          whileHover={{ scale: 1.025 }}
          style={{ x: dx, y: dy }}
          className="relative glass-panel rounded-3xl p-7 md:p-10 overflow-hidden group"
        >
          {/* ripple spotlight following cursor */}
          <motion.div
            className="absolute w-72 h-72 rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"
            style={{
              background: "radial-gradient(circle, var(--glow), transparent 70%)",
              left: ripX,
              top: ripY,
              translateX: "-50%",
              translateY: "-50%",
            }}
          />
          {/* ping ring on hover for current role */}
          {item.current && (
            <span
              className="absolute right-8 top-8 w-3 h-3 rounded-full opacity-0 group-hover:opacity-100"
              style={{ background: "var(--glow)", animation: "ping-ring 1.4s ease-out infinite" }}
            />
          )}

          <div className="flex flex-wrap items-start justify-between gap-4 mb-5">
            <div>
              <h3 className="font-display text-lg md:text-2xl font-bold flex items-center gap-3">
                <Briefcase size={20} style={{ color: "var(--glow)" }} />
                {item.role}
              </h3>
              <p className="mt-1 text-sm md:text-base" style={{ color: "var(--amber)" }}>
                {item.company}
              </p>
            </div>
            <div className="text-right">
              <span
                className="font-code text-[11px] tracking-[0.15em] px-3 py-1.5 rounded-full"
                style={{ border: "1px solid var(--line)", color: item.current ? "var(--glow)" : "var(--muted)" }}
              >
                {item.period}
              </span>
              <p className="font-code text-[10px] mt-2 flex items-center justify-end gap-1" style={{ color: "var(--muted)" }}>
                <MapPin size={11} /> {item.location}
              </p>
            </div>
          </div>
          <ul className="space-y-2.5">
            {item.points.map((p, i) => (
              <li key={i} className="flex gap-3 text-sm md:text-[15px] leading-relaxed" style={{ color: "var(--muted)" }}>
                <span className="mt-2 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: "var(--glow)" }} />
                {p}
              </li>
            ))}
          </ul>
        </motion.div>
        </motion.div>
      </div>
    </Reveal>
  );
};

export const Experience = () => (
  <section id="experience" data-testid="experience-section" className="relative py-24 md:py-36">
    <div className="max-w-5xl mx-auto px-6 md:px-10">
      <SectionHeading index="02" kicker="Flight Log" title="Experience & qualifications" />

      <div className="relative space-y-8 md:space-y-12">
        <div
          className="absolute left-[7px] md:left-[23px] top-4 bottom-4 w-px"
          style={{ background: "linear-gradient(180deg, var(--glow), var(--amber), transparent)" }}
        />
        {EXPERIENCE.map((e, i) => (
          <BubbleCard key={e.id} item={e} index={i} />
        ))}

        {/* education */}
        {EDUCATION.map((ed, i) => (
          <Reveal key={ed.degree} delay={0.1 + i * 0.1}>
            <div className="relative pl-10 md:pl-16">
              <span
                className="absolute left-0 md:left-4 top-8 w-4 h-4 rounded-full"
                style={{
                  background: "var(--surface-2)",
                  border: `2px solid ${ed.pursuing ? "var(--amber)" : "var(--glow)"}`,
                  boxShadow: ed.pursuing ? "0 0 14px color-mix(in srgb, var(--amber) 55%, transparent)" : "none",
                }}
              />
              <motion.div
                data-testid={`education-card-${i}`}
                whileHover={{ scale: 1.025 }}
                className="glass-panel rounded-3xl p-7 md:p-10"
              >
                <h3 className="font-display text-lg md:text-2xl font-bold flex flex-wrap items-center gap-3">
                  <GraduationCap size={20} style={{ color: ed.pursuing ? "var(--amber)" : "var(--glow)" }} />
                  {ed.degree}
                  {ed.pursuing && (
                    <span
                      data-testid="mba-pursuing-badge"
                      className="font-code text-[10px] tracking-[0.2em] uppercase px-3 py-1.5 rounded-full"
                      style={{
                        border: "1px solid var(--amber)",
                        color: "var(--amber)",
                        boxShadow: "0 0 16px color-mix(in srgb, var(--amber) 35%, transparent)",
                      }}
                    >
                      Pursuing
                    </span>
                  )}
                </h3>
                <p className="mt-1 text-sm md:text-base" style={{ color: "var(--glow)" }}>
                  {ed.major}{ed.school ? ` · ${ed.school}` : ""}
                </p>
                <p className="font-code text-[11px] mt-2" style={{ color: "var(--muted)" }}>
                  {ed.period}
                </p>
              </motion.div>
            </div>
          </Reveal>
        ))}
      </div>

      {/* certifications as floating bubbles */}
      <Reveal delay={0.15} className="mt-16">
        <p className="font-code text-xs tracking-[0.3em] uppercase mb-6" style={{ color: "var(--muted)" }}>
          Certifications
        </p>
        <div className="flex flex-wrap gap-3" data-testid="certifications-list">
          {CERTIFICATIONS.map((c, i) => (
            <motion.span
              key={i}
              data-testid={`cert-badge-${i}`}
              whileHover={{ scale: 1.08, y: -6 }}
              transition={{ type: "spring", stiffness: 300, damping: 14 }}
              className="inline-flex items-center gap-2 glass-panel rounded-full px-4 py-2.5 text-xs md:text-sm cursor-default"
            >
              <BadgeCheck size={14} style={{ color: "var(--glow)" }} />
              {c}
            </motion.span>
          ))}
        </div>
      </Reveal>
    </div>
  </section>
);
