import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Menu, X } from "lucide-react";

const LINKS = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

export const Navbar = ({ theme, onToggleTheme }) => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const go = (href) => {
    setOpen(false);
    window.__lenis?.scrollTo(href, { offset: -20, duration: 1.4 });
  };

  return (
    <>
      <motion.header
        data-testid="main-navbar"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 2.2, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 inset-x-0 z-50 transition-[background-color,border-color] duration-500 ${
          scrolled ? "glass-panel border-x-0 border-t-0" : "bg-transparent"
        }`}
      >
        <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-10 h-16 md:h-20">
          <button
            data-testid="nav-logo"
            onClick={() => go("#top")}
            className="font-display font-extrabold text-lg tracking-tight"
          >
            ABZAN<span style={{ color: "var(--glow)" }}>.</span>
          </button>

          <div className="hidden md:flex items-center gap-8">
            {LINKS.map((l) => (
              <button
                key={l.href}
                data-testid={`nav-link-${l.label.toLowerCase()}`}
                onClick={() => go(l.href)}
                className="font-code text-[11px] tracking-[0.25em] uppercase transition-colors duration-300 hover:text-[var(--glow)]"
                style={{ color: "var(--muted)" }}
              >
                {l.label}
              </button>
            ))}
            <button
              data-testid="theme-toggle-btn"
              onClick={onToggleTheme}
              aria-label="Toggle theme"
              className="w-10 h-10 rounded-full glass-panel flex items-center justify-center transition-transform duration-300 hover:scale-110"
            >
              {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          </div>

          <div className="flex md:hidden items-center gap-3">
            <button
              data-testid="theme-toggle-btn-mobile"
              onClick={onToggleTheme}
              aria-label="Toggle theme"
              className="w-10 h-10 rounded-full glass-panel flex items-center justify-center"
            >
              {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <button
              data-testid="mobile-menu-btn"
              onClick={() => setOpen(!open)}
              aria-label="Menu"
              className="w-10 h-10 rounded-full glass-panel flex items-center justify-center"
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            data-testid="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 glass-panel border-0 flex flex-col items-center justify-center gap-8"
            style={{ background: "var(--glass-strong)" }}
          >
            {LINKS.map((l, i) => (
              <motion.button
                key={l.href}
                data-testid={`mobile-nav-link-${l.label.toLowerCase()}`}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 * i }}
                onClick={() => go(l.href)}
                className="font-display text-3xl font-bold tracking-tight hover:text-[var(--glow)] transition-colors duration-300"
              >
                {l.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
