import { motion, useScroll, useSpring } from "framer-motion";

export const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.4 });

  return (
    <motion.div
      data-testid="scroll-progress-bar"
      className="fixed top-0 inset-x-0 h-[3px] z-[95] origin-left"
      style={{
        scaleX,
        background: "linear-gradient(90deg, var(--glow), var(--amber))",
        boxShadow: "0 0 12px color-mix(in srgb, var(--glow) 60%, transparent)",
      }}
    />
  );
};
