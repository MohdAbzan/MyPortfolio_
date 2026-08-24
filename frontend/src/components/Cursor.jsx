import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export const Cursor = () => {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 220, damping: 22, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 220, damping: 22, mass: 0.5 });
  const [active, setActive] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);
    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const over = (e) => setActive(!!e.target.closest("a,button,[role='button'],input,textarea"));
    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseover", over, { passive: true });
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        data-testid="custom-cursor-ring"
        className="fixed top-0 left-0 z-[100] pointer-events-none rounded-full"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          width: 38,
          height: 38,
          border: "1.5px solid var(--glow)",
          boxShadow: "0 0 18px -4px color-mix(in srgb, var(--glow) 60%, transparent)",
        }}
        animate={{ scale: active ? 1.8 : 1, opacity: active ? 0.9 : 0.6 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      />
      <motion.div
        data-testid="custom-cursor-dot"
        className="fixed top-0 left-0 z-[100] pointer-events-none rounded-full"
        style={{
          x,
          y,
          translateX: "-50%",
          translateY: "-50%",
          width: 6,
          height: 6,
          background: "var(--amber)",
          boxShadow: "0 0 10px var(--amber)",
        }}
      />
    </>
  );
};
