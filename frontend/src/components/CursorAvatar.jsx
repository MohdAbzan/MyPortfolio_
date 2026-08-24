import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const REACTIONS = ["wink", "spin", "jetpack"];

export const CursorAvatar = () => {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const [waving, setWaving] = useState(false);
  const [reaction, setReaction] = useState(null);
  const reactionIdx = useRef(0);
  const reactionTimer = useRef(null);

  useEffect(() => {
    const fn = (e) => {
      mx.set(e.clientX / window.innerWidth - 0.5);
      my.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("mousemove", fn);
    return () => window.removeEventListener("mousemove", fn);
  }, [mx, my]);

  // wave once shortly after arrival
  useEffect(() => {
    const t = setTimeout(() => setWaving(true), 2200);
    const t2 = setTimeout(() => setWaving(false), 4600);
    return () => {
      clearTimeout(t);
      clearTimeout(t2);
    };
  }, []);

  const triggerReaction = () => {
    const r = REACTIONS[reactionIdx.current % REACTIONS.length];
    reactionIdx.current += 1;
    setReaction(r);
    clearTimeout(reactionTimer.current);
    reactionTimer.current = setTimeout(() => setReaction(null), r === "jetpack" ? 1500 : 1000);
  };

  // snappier tracking springs
  const spring = { stiffness: 220, damping: 18, mass: 0.4 };
  const rotY = useSpring(useTransform(mx, [-0.5, 0.5], [-20, 20]), spring);
  const rotX = useSpring(useTransform(my, [-0.5, 0.5], [14, -14]), spring);
  const faceX = useSpring(useTransform(mx, [-0.5, 0.5], [-14, 14]), spring);
  const faceY = useSpring(useTransform(my, [-0.5, 0.5], [-10, 10]), spring);
  const pupilX = useSpring(useTransform(mx, [-0.5, 0.5], [-7, 7]), { stiffness: 420, damping: 24 });
  const pupilY = useSpring(useTransform(my, [-0.5, 0.5], [-5, 5]), { stiffness: 420, damping: 24 });
  const browTilt = useSpring(useTransform(mx, [-0.5, 0.5], [5, -5]), spring);

  const blinkLoop = { scaleY: [1, 1, 0.08, 1, 1] };
  const blinkTransition = { duration: 4.4, repeat: Infinity, times: [0, 0.44, 0.5, 0.56, 1] };

  return (
    <div
      className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-[26rem] md:h-[26rem] cursor-pointer"
      style={{ perspective: 900 }}
      data-testid="cursor-avatar"
      onClick={triggerReaction}
      role="button"
      aria-label="Interact with the character"
    >
      {/* orbit ring */}
      <div
        className="absolute inset-[-8%] rounded-full border border-dashed opacity-40"
        style={{ borderColor: "var(--glow)", animation: "spin-slow 40s linear infinite" }}
      />
      {/* ambient glow */}
      <div
        className="absolute inset-[12%] rounded-full blur-3xl opacity-30"
        style={{ background: "radial-gradient(circle at 40% 35%, var(--glow), transparent 65%)" }}
      />

      {/* jetpack flight wrapper */}
      <motion.div
        className="absolute inset-0"
        animate={reaction === "jetpack" ? { y: [0, -240, -220, 0] } : { y: 0 }}
        transition={reaction === "jetpack" ? { duration: 1.4, times: [0, 0.45, 0.6, 1], ease: "easeInOut" } : { duration: 0.4 }}
      >
        {/* spin wrapper */}
        <motion.div
          className="absolute inset-0"
          animate={reaction === "spin" ? { rotate: 360 } : { rotate: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            className="absolute inset-0"
            style={{ rotateX: rotX, rotateY: rotY, transformStyle: "preserve-3d" }}
            animate={reaction === "jetpack" ? {} : { y: [0, -12, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            {/* antenna */}
            <div
              className="absolute left-1/2 -translate-x-1/2 top-[3%] w-[3px] h-[7%] rounded-full"
              style={{ background: "var(--glow)", opacity: 0.8 }}
            />
            <motion.div
              className="absolute left-1/2 -translate-x-1/2 top-[0.5%] w-3.5 h-3.5 rounded-full"
              style={{ background: "var(--amber)", boxShadow: "0 0 14px var(--amber)" }}
              animate={{ opacity: [1, 0.25, 1] }}
              transition={{ duration: 1.6, repeat: Infinity }}
            />

            {/* helmet shell */}
            <div
              className="absolute inset-[6%] rounded-full"
              style={{
                border: "2px solid color-mix(in srgb, var(--glow) 45%, transparent)",
                boxShadow:
                  "0 0 40px -6px color-mix(in srgb, var(--glow) 40%, transparent), inset 0 0 40px -12px color-mix(in srgb, var(--glow) 30%, transparent)",
                background: "linear-gradient(145deg, #1a2233 0%, #0a0d17 100%)",
              }}
            />
            <div
              className="absolute inset-[6%] rounded-full pointer-events-none"
              style={{ border: "1px dashed color-mix(in srgb, var(--amber) 30%, transparent)" }}
            />

            {/* visor */}
            <div
              className="absolute inset-[15%] rounded-full overflow-hidden"
              style={{
                border: "3px solid color-mix(in srgb, var(--glow) 65%, transparent)",
                boxShadow: "0 0 30px -4px color-mix(in srgb, var(--glow) 50%, transparent)",
                background: "radial-gradient(circle at 50% 35%, #0e2a22 0%, #04100c 75%)",
              }}
            >
              {/* the character's face — follows the cursor */}
              <motion.div
                className="absolute inset-0 flex flex-col items-center justify-center"
                style={{ x: faceX, y: faceY }}
                data-testid="avatar-face"
              >
                {/* brows */}
                <motion.div className="flex gap-12 md:gap-16 mb-1" style={{ rotate: browTilt }}>
                  {[0, 1].map((i) => (
                    <div
                      key={i}
                      className="w-8 md:w-10 h-[3px] rounded-full"
                      style={{ background: "var(--glow)", opacity: 0.65 }}
                    />
                  ))}
                </motion.div>

                {/* eyes */}
                <div className="flex gap-8 md:gap-12 mt-2">
                  {[0, 1].map((i) => {
                    const isWinkEye = i === 1;
                    return (
                      <div key={i} className="relative w-10 h-12 md:w-14 md:h-16">
                        <div
                          className="absolute inset-0 rounded-[50%]"
                          style={{
                            background: "rgba(16,185,129,0.10)",
                            border: "2px solid var(--glow)",
                            boxShadow: "0 0 18px color-mix(in srgb, var(--glow) 60%, transparent)",
                          }}
                        />
                        <motion.div
                          className="absolute inset-0 flex items-center justify-center"
                          style={{ x: pupilX, y: pupilY }}
                        >
                          <motion.div
                            className="w-4 h-4 md:w-5 md:h-5 rounded-full"
                            style={{ background: "var(--glow)", boxShadow: "0 0 12px var(--glow)" }}
                            animate={
                              reaction === "wink" && isWinkEye
                                ? { scaleY: [1, 0.06, 0.06, 1] }
                                : blinkLoop
                            }
                            transition={
                              reaction === "wink" && isWinkEye
                                ? { duration: 0.9, times: [0, 0.3, 0.7, 1] }
                                : blinkTransition
                            }
                          />
                        </motion.div>
                      </div>
                    );
                  })}
                </div>

                {/* nose */}
                <div
                  className="w-[3px] h-4 md:h-5 rounded-full mt-1"
                  style={{ background: "color-mix(in srgb, var(--glow) 55%, transparent)" }}
                />

                {/* smile — widens during reactions */}
                <motion.svg
                  width="72"
                  height="30"
                  viewBox="0 0 72 30"
                  className="mt-1"
                  animate={reaction ? { scaleX: 1.25, scaleY: 1.3 } : { scaleX: 1, scaleY: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <path
                    d="M 10 6 Q 36 28 62 6"
                    fill="none"
                    stroke="var(--amber)"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                </motion.svg>
              </motion.div>

              {/* glass highlight */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: "radial-gradient(circle at 30% 20%, rgba(255,255,255,0.10), transparent 40%)" }}
              />
            </div>

            {/* waving arm */}
            <motion.div
              data-testid="avatar-arm"
              className="absolute right-[1%] top-[52%] origin-top"
              initial={{ rotate: 58, opacity: 0.9 }}
              animate={waving ? { rotate: [58, -35, 15, -35, 15, 58] } : { rotate: 58 }}
              transition={waving ? { duration: 2.2, times: [0, 0.25, 0.45, 0.65, 0.85, 1], ease: "easeInOut" } : { duration: 0.6 }}
            >
              <div
                className="w-3 md:w-4 h-14 md:h-20 rounded-full mx-auto"
                style={{ background: "linear-gradient(180deg, #1a2233, #0a0d17)", border: "1.5px solid color-mix(in srgb, var(--glow) 50%, transparent)" }}
              />
              <div
                className="w-6 h-6 md:w-8 md:h-8 rounded-full -mt-1 mx-auto"
                style={{
                  background: "#10141f",
                  border: "2px solid var(--amber)",
                  boxShadow: "0 0 14px color-mix(in srgb, var(--amber) 55%, transparent)",
                }}
              />
            </motion.div>

            {/* jetpack flame */}
            {reaction === "jetpack" && (
              <motion.div
                data-testid="avatar-jetpack-flame"
                className="absolute left-1/2 -translate-x-1/2 top-[92%] w-10 md:w-14 h-24 md:h-32 pointer-events-none"
                initial={{ opacity: 0, scaleY: 0.3 }}
                animate={{ opacity: [0, 1, 1, 0], scaleY: [0.3, 1.15, 1, 0.4] }}
                transition={{ duration: 1.4, times: [0, 0.2, 0.7, 1] }}
                style={{
                  transformOrigin: "top",
                  background: "linear-gradient(180deg, var(--amber), #ef4444 55%, transparent)",
                  clipPath: "polygon(20% 0, 80% 0, 100% 45%, 50% 100%, 0 45%)",
                  filter: "blur(2px) drop-shadow(0 0 18px var(--amber))",
                }}
              />
            )}

            {/* visor scanline */}
            <motion.div
              className="absolute left-[24%] right-[24%] h-[2px] rounded-full opacity-60 pointer-events-none"
              style={{ background: "linear-gradient(90deg, transparent, var(--glow), transparent)" }}
              animate={{ top: ["26%", "72%", "26%"] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* floating satellites */}
      {[
        { top: "6%", left: "4%", d: 7 },
        { top: "78%", left: "88%", d: 9 },
        { top: "14%", left: "86%", d: 8 },
      ].map((s, i) => (
        <div
          key={i}
          className="absolute w-2.5 h-2.5 rounded-full pointer-events-none"
          style={{
            ...s,
            background: i === 1 ? "var(--amber)" : "var(--glow)",
            boxShadow: `0 0 14px ${i === 1 ? "var(--amber)" : "var(--glow)"}`,
            animation: `float-slow ${s.d}s ease-in-out infinite`,
          }}
        />
      ))}

      {/* tap hint */}
      <motion.p
        data-testid="avatar-tap-hint"
        className="absolute -bottom-8 left-1/2 -translate-x-1/2 font-code text-[10px] tracking-[0.25em] uppercase whitespace-nowrap"
        style={{ color: "var(--muted)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.7, 0.7, 0] }}
        transition={{ duration: 6, delay: 5, times: [0, 0.15, 0.85, 1] }}
      >
        Tap the astronaut
      </motion.p>
    </div>
  );
};
