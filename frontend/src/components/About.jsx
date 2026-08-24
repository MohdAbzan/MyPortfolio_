import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Reveal, SectionHeading } from "./Reveal";
import { ABOUT_CARDS, PROFILE } from "../data/portfolio";

const TiltCard = ({ card, index }) => {
  const ref = useRef(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const spring = { stiffness: 180, damping: 20 };
  const rotX = useSpring(useTransform(my, [0, 1], [7, -7]), spring);
  const rotY = useSpring(useTransform(mx, [0, 1], [-7, 7]), spring);
  const glowX = useTransform(mx, [0, 1], ["0%", "100%"]);
  const glowY = useTransform(my, [0, 1], ["0%", "100%"]);

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  };
  const onLeave = () => {
    mx.set(0.5);
    my.set(0.5);
  };

  return (
    <Reveal delay={index * 0.12} className={card.span}>
      <motion.div
        ref={ref}
        data-testid={`about-card-${card.id}`}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{ rotateX: rotX, rotateY: rotY, transformStyle: "preserve-3d" }}
        whileHover={{ scale: 1.02 }}
        className="relative h-full min-h-[220px] glass-panel rounded-3xl p-8 md:p-10 overflow-hidden group"
      >
        <motion.div
          className="absolute w-56 h-56 rounded-full blur-3xl opacity-0 group-hover:opacity-25 transition-opacity duration-500 pointer-events-none"
          style={{
            background: "var(--glow)",
            left: glowX,
            top: glowY,
            translateX: "-50%",
            translateY: "-50%",
          }}
        />
        <div
          className="absolute top-0 left-8 right-8 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background:
              "linear-gradient(90deg, transparent, var(--glow), var(--amber), transparent)",
          }}
        />
        <span
          className="font-code text-[10px] tracking-[0.3em]"
          style={{ color: "var(--amber)" }}
        >
          CH.{card.chapter}
        </span>
        <h3 className="font-display text-xl md:text-2xl font-bold mt-3 mb-4">
          {card.title}
        </h3>
        <p
          className="text-sm md:text-base leading-relaxed"
          style={{ color: "var(--muted)" }}
        >
          {card.body}
        </p>
        <span
          className="inline-block mt-6 font-code text-[10px] tracking-[0.2em] uppercase px-3 py-1.5 rounded-full"
          style={{
            border: "1px solid var(--line)",
            color: "var(--glow)",
          }}
        >
          {card.tag}
        </span>
      </motion.div>
    </Reveal>
  );
};

export const About = () => (
  <section id="about" data-testid="about-section" className="relative py-24 md:py-36">
    <div className="max-w-7xl mx-auto px-6 md:px-10">
      <SectionHeading index="01" kicker="The Person" title="Beyond the boarding pass" />
      <Reveal delay={0.1} className="mb-12 max-w-3xl">
        <p className="text-base md:text-lg leading-relaxed" style={{ color: "var(--muted)" }} data-testid="about-summary">
          {PROFILE.summary}
        </p>
      </Reveal>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6" style={{ perspective: 1200 }}>
        {ABOUT_CARDS.map((c, i) => (
          <TiltCard key={c.id} card={c} index={i} />
        ))}
      </div>
    </div>
  </section>
);
