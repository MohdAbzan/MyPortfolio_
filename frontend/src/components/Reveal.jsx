import { motion } from "framer-motion";

export const Reveal = ({ children, delay = 0, y = 40, className = "" }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
);

export const SectionHeading = ({ index, kicker, title, className = "" }) => (
  <Reveal className={`mb-14 md:mb-20 ${className}`}>
    <p
      className="font-code text-xs tracking-[0.35em] uppercase mb-4"
      style={{ color: "var(--glow)" }}
      data-testid={`section-kicker-${index}`}
    >
      {index} — {kicker}
    </p>
    <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight leading-[1.05]">
      {title}
    </h2>
  </Reveal>
);
