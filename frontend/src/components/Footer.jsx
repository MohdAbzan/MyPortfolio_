import { ArrowUp, Linkedin, Mail } from "lucide-react";
import { PROFILE } from "../data/portfolio";

export const Footer = () => (
  <footer
    data-testid="site-footer"
    className="relative border-t py-12"
    style={{ borderColor: "var(--line)" }}
  >
    <div className="max-w-7xl mx-auto px-6 md:px-10 flex flex-col md:flex-row items-center justify-between gap-6">
      <p className="font-display font-extrabold text-lg tracking-tight">
        ABZAN<span style={{ color: "var(--glow)" }}>.</span>
      </p>
      <p className="font-code text-[11px] tracking-[0.2em] uppercase" style={{ color: "var(--muted)" }}>
        © {new Date().getFullYear()} Mohammed Abzan · Dubai, UAE
      </p>
      <div className="flex items-center gap-3">
        <a
          data-testid="footer-linkedin"
          href={PROFILE.linkedin}
          target="_blank"
          rel="noreferrer"
          aria-label="LinkedIn"
          className="w-10 h-10 rounded-full glass-panel flex items-center justify-center transition-transform duration-300 hover:scale-110 hover:text-[var(--glow)]"
        >
          <Linkedin size={16} />
        </a>
        <a
          data-testid="footer-email"
          href={`mailto:${PROFILE.email}`}
          aria-label="Email"
          className="w-10 h-10 rounded-full glass-panel flex items-center justify-center transition-transform duration-300 hover:scale-110 hover:text-[var(--glow)]"
        >
          <Mail size={16} />
        </a>
        <button
          data-testid="back-to-top-btn"
          onClick={() => window.__lenis?.scrollTo(0, { duration: 1.6 })}
          aria-label="Back to top"
          className="w-10 h-10 rounded-full flex items-center justify-center transition-transform duration-300 hover:scale-110"
          style={{ background: "var(--glow)", color: "#03040b" }}
        >
          <ArrowUp size={16} />
        </button>
      </div>
    </div>
  </footer>
);
