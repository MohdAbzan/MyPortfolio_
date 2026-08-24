import { useEffect, useState } from "react";
import Lenis from "lenis";
import { Toaster } from "sonner";
import { Navbar } from "./components/Navbar";
import { Cursor } from "./components/Cursor";
import { ScrollProgress } from "./components/ScrollProgress";
import { Hero } from "./components/Hero";
import { EditorialMarquee } from "./components/Marquee";
import { About } from "./components/About";
import { Experience } from "./components/Experience";
import { Skills } from "./components/Skills";
import { Services } from "./components/Services";
import { Manifesto } from "./components/Manifesto";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";

function App() {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("abzan-theme") || "dark"
  );

  useEffect(() => {
    document.title = "Mohammed Abzan — Administration & Customer Service Professional";
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("light", theme === "light");
    localStorage.setItem("abzan-theme", theme);
  }, [theme]);

  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
    window.__lenis = lenis;
    let raf;
    const loop = (t) => {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      window.__lenis = null;
    };
  }, []);

  return (
    <div className="min-h-screen" data-testid="app-root">
      <div className="noise-overlay" />
      <Cursor />
      <ScrollProgress />
      <Navbar theme={theme} onToggleTheme={() => setTheme(theme === "dark" ? "light" : "dark")} />
      <main>
        <Hero />
        <EditorialMarquee />
        <About />
        <Experience />
        <Skills />
        <Services />
        <Manifesto />
        <Contact />
      </main>
      <Footer />
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: "var(--surface)",
            border: "1px solid var(--line)",
            color: "var(--text)",
          },
        }}
      />
    </div>
  );
}

export default App;
