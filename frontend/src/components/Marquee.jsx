import Marquee from "react-fast-marquee";
import { MARQUEE_ITEMS } from "../data/portfolio";

export const EditorialMarquee = () => (
  <div
    data-testid="editorial-marquee"
    className="relative py-10 md:py-14 border-y overflow-hidden"
    style={{ borderColor: "var(--line)" }}
  >
    <Marquee speed={28} gradient={false} pauseOnHover>
      {MARQUEE_ITEMS.map((item, i) => (
        <span key={i} className="flex items-center">
          <span
            className="font-display font-extrabold tracking-tight text-4xl md:text-6xl mx-6 md:mx-10 text-stroke select-none"
          >
            {item}
          </span>
          <span
            className="w-3 h-3 md:w-4 md:h-4 rounded-full shrink-0"
            style={{
              background: i % 2 ? "var(--amber)" : "var(--glow)",
              boxShadow: `0 0 16px ${i % 2 ? "var(--amber)" : "var(--glow)"}`,
            }}
          />
        </span>
      ))}
    </Marquee>
  </div>
);
