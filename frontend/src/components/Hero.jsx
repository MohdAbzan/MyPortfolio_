import { useEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowDown, FileDown, ChevronDown } from "lucide-react";
import { CursorAvatar } from "./CursorAvatar";
import { Magnetic } from "./Magnetic";
import { PROFILE } from "../data/portfolio";

const EASE = [0.22, 1, 0.36, 1];

const HERO_STARS = Array.from({ length: 34 }, (_, i) => ({
  left: `${(i * 29 + 7) % 100}%`,
  top: `${(i * 47 + 13) % 100}%`,
  size: i % 4 === 0 ? 3 : 2,
  d: 2.5 + (i % 5),
  delay: (i % 8) * 0.5,
}));

const MaskedLine = ({ children, delay, className = "" }) => (
  <div className="overflow-hidden py-1">
    <motion.div
      className={className}
      initial={{ y: "115%" }}
      animate={{ y: 0 }}
      transition={{ duration: 1.1, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  </div>
);

export const Hero = () => {
  const [roleIdx, setRoleIdx] = useState(0);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  useEffect(() => {
    const t = setInterval(
      () => setRoleIdx((i) => (i + 1) % PROFILE.roles.length),
      2600
    );
    return () => clearInterval(t);
  }, []);

  const go = (href) => window.__lenis?.scrollTo(href, { duration: 1.6 });

  return (
    <section
      id="top"
      ref={ref}
      data-testid="hero-section"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-24 pb-16"
    >
      {/* parallax glow field + starfield */}
      <motion.div className="absolute inset-0 pointer-events-none" style={{ y: bgY }}>
        <div
          className="absolute -top-32 -left-32 w-[34rem] h-[34rem] rounded-full blur-[120px] opacity-25"
          style={{ background: "var(--glow)" }}
        />
        <div
          className="absolute bottom-0 right-0 w-[28rem] h-[28rem] rounded-full blur-[120px] opacity-15"
          style={{ background: "var(--amber)" }}
        />
        {HERO_STARS.map((s, i) => (
          <span
            key={i}
            className="absolute rounded-full"
            style={{
              left: s.left,
              top: s.top,
              width: s.size,
              height: s.size,
              background: "var(--text)",
              animation: `twinkle ${s.d}s ease-in-out ${s.delay}s infinite`,
            }}
          />
        ))}
      </motion.div>

      <motion.div
        style={{ opacity: fade }}
        className="relative z-10 max-w-7xl mx-auto w-full px-6 md:px-10 grid lg:grid-cols-[1.25fr_1fr] gap-14 items-center"
      >
        <div>
          <MaskedLine delay={0.25}>
            <p
              className="font-code text-[11px] md:text-xs tracking-[0.4em] uppercase mb-6"
              style={{ color: "var(--glow)" }}
              data-testid="hero-location"
            >
              Dubai International Airport · UAE
            </p>
          </MaskedLine>

          <h1 className="font-display font-extrabold tracking-tighter leading-[0.95] text-[clamp(2.6rem,8vw,6rem)]">
            <MaskedLine delay={0.45}>{PROFILE.firstName}</MaskedLine>
            <MaskedLine delay={0.6}>
              <span className="glow-text-emerald" style={{ color: "var(--glow)" }}>
                {PROFILE.lastName}
              </span>
            </MaskedLine>
          </h1>

          <MaskedLine delay={0.85}>
            <div
              className="mt-6 h-8 md:h-10 font-code text-sm md:text-lg"
              data-testid="hero-rotating-role"
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={roleIdx}
                  initial={{ y: 24, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -24, opacity: 0 }}
                  transition={{ duration: 0.5, ease: EASE }}
                  className="inline-block"
                  style={{ color: "var(--amber)" }}
                >
                  {PROFILE.roles[roleIdx]}
                </motion.span>
              </AnimatePresence>
            </div>
          </MaskedLine>

          <MaskedLine delay={1.0}>
            <p
              className="mt-5 max-w-xl text-sm md:text-base leading-relaxed"
              style={{ color: "var(--muted)" }}
              data-testid="hero-hook"
            >
              {PROFILE.hook}
            </p>
          </MaskedLine>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.3, ease: EASE }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Magnetic>
              <button
                data-testid="hero-explore-btn"
                onClick={() => go("#about")}
                className="group inline-flex items-center gap-3 px-7 py-3.5 rounded-full font-display text-sm font-semibold glow-emerald transition-transform duration-300 hover:scale-[1.04] active:scale-95"
                style={{ background: "var(--glow)", color: "#03040b" }}
              >
                Explore My Journey
                <ArrowDown size={16} className="transition-transform duration-300 group-hover:translate-y-1" />
              </button>
            </Magnetic>
            <Magnetic>
              <a
                data-testid="hero-download-cv-btn"
                href={PROFILE.cvUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full font-display text-sm font-semibold glass-panel transition-all duration-300 hover:border-[var(--amber)] hover:scale-[1.04] active:scale-95"
              >
                <FileDown size={16} style={{ color: "var(--amber)" }} />
                Download CV
              </a>
            </Magnetic>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.9, ease: EASE }}
          className="hidden sm:flex justify-center lg:justify-end"
        >
          <CursorAvatar />
        </motion.div>
      </motion.div>

      <motion.button
        data-testid="hero-scroll-indicator"
        onClick={() => go("#about")}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
        aria-label="Scroll down"
      >
        <span className="font-code text-[10px] tracking-[0.3em] uppercase" style={{ color: "var(--muted)" }}>
          Scroll
        </span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.8, repeat: Infinity }}>
          <ChevronDown size={18} style={{ color: "var(--glow)" }} />
        </motion.div>
      </motion.button>
    </section>
  );
};
