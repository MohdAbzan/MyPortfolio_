# PRD — Mohammed Abzan Portfolio

## Original Problem Statement
Build a hyper-engaging, fully responsive personal portfolio website from the attached CV, with advanced modern web animations (Framer Motion/GSAP), dark-mode-first cosmic aesthetic with glowing accents and glassmorphism, scroll-driven reveals, cursor-tracking hero avatar, bento-grid About, bubble-hover Experience timeline, shooting-stars Skills canvas, Services, and a functional Contact section.

## User Choices
- Skip Projects section entirely (CV has none)
- Contact form: save enquiries to DB + email notification to owner
- Cosmic dark theme + dark/light mode toggle
- Hero avatar: stylized geometric astronaut character matching shooting-stars theme
- Awwwards-level craft: kinetic hero with masked line reveal, editorial marquee, numbered manifesto chapters, Lenis smooth scrolling

## Architecture
- Frontend: React 19 + Tailwind CSS, framer-motion (reveals, physics, avatar eye tracking), lenis (momentum scroll), react-fast-marquee, react-hook-form + sonner, lucide-react
- Backend: FastAPI, Motor (MongoDB), managed Resend email proxy (httpx) with G2/G3 guardrail gate
- Sections: Hero (masked reveal + cursor-tracking astronaut avatar + rotating roles) → Editorial Marquee → About (bento tilt cards) → Experience (bubble-hover timeline + education + certifications) → Skills (cosmic shooting-stars canvas, categorized tabs) → Services → Manifesto (numbered chapters) → Contact (validated form + copy-to-clipboard email) → Footer

## User Personas
- Recruiters/hiring managers reviewing Abzan's profile
- Visitors contacting him via the form

## Implemented (2026-08-22)
- Full single-page portfolio with all sections above, data sourced from CV (`src/data/portfolio.js`)
- POST /api/contact (validated, per-IP 30s throttle, saves to MongoDB, emails owner notification)
- GET /api/contact (list enquiries)
- Dark/light theme toggle persisted in localStorage
- Verified: API root, contact POST + email send (202 Accepted), form e2e via UI, theme toggle, copy-email
- Hero avatar replaced with user's illustrated portrait (public/avatar.jpeg) inside astronaut helmet visor — whole head tilts with cursor, photo drifts opposite for parallax depth; scanline, orbit ring, satellites retained
- Education now includes Master of Business Administration (MBA), "Currently pursuing", starting September 2026, with glowing PURSUING badge above B.Com entry
- Avatar swapped back to hand-drawn SVG character (per user request): helmet turns ±20° toward cursor, face slides inside visor, pupils track harder with blink cycle, expressive tilting brows
- Added global interactions: custom glowing cursor ring+dot (desktop only, grows over interactive elements), scroll progress bar (emerald→amber), magnetic pull on hero CTAs, twinkling starfield in hero, continuous bubble float on experience cards
- Character greeting + play: arm raises and waves once ~2s after page load; tapping the astronaut cycles wink → 360° spin → jetpack burst (lifts off with flame); "tap the astronaut" hint fades in/out; cursor tracking springs sped up (stiffer) per user request

## Backlog
- P0: none
- P1: Testimonials slider if real recommendations become available; downloadable CV hosted on own storage instead of artifact URL
- P2: Projects section if user adds projects later; blog/notes section; analytics

## Next Tasks
- Await user feedback on motion intensity / copy tweaks
- Optionally add real testimonials when provided
