"use client";

import Link from "next/link";
import { useEffect, useRef, useState, useLayoutEffect, useMemo } from "react";
import Lenis from "@studio-freight/lenis";
import dynamic from 'next/dynamic'; 

import ChromeTextHeader from "./src/chrometextheader/page";
import Skills from "./src/skills/page";
import Footer from "./src/footer/page";
import Projects from "./src/projects/page";
import Contact from "./src/contact/page";
import About from "./src/about/page";
import Logo from "./src/logo/page";

import ".././app/globals.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

import ParrotLight from "./src/animations/Parrot.json";
import ParrotDark from "./src/animations/Parrot 2.json";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const parrotRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);

  // 1. Theme Logic (Hydration safe structure)
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    const initialTheme = storedTheme || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    setTheme(initialTheme);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
    
    // Theme change par ScrollTrigger ko refresh karna zaroori hai takay layout offsets crash na hon
    ScrollTrigger.refresh();
  }, [theme]);

  // 2. Lenis + GSAP Sync
  useLayoutEffect(() => {
    const lenis = new Lenis({
      duration: 1.1, // Smooth feel ke liye thoda sa adjustment
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenisRef.current = lenis;

    const scrollHandler = () => {
      ScrollTrigger.update();
    };

    lenis.on('scroll', scrollHandler);
    
    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    // Context wrap taaki memory easily free ho sake cleanup par
    const ctx = gsap.context(() => {
      gsap.set(parrotRef.current, {
        xPercent: 100,
        left: "100%",
        top: "32%",
        yPercent: -50,
      });

      gsap.timeline({
        scrollTrigger: {
          trigger: "body",
          start: "top top",
          end: "bottom bottom",
          scrub: 0.5, 
        },
      })
      .to(parrotRef.current, { left: "50%", xPercent: -50, ease: "none" })
      .to(parrotRef.current, { rotation: -360, ease: "none" })
      .to(parrotRef.current, { left: "17%", xPercent: 0, ease: "none" });

      // Efficient Scroll Animations
      const elements = document.querySelectorAll(".animate-on-scroll");
      elements.forEach((el) => {
        gsap.fromTo(el, 
          { opacity: 0, y: 30 },
          { 
            opacity: 1, y: 0, 
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none reverse"
            } 
          }
        );
      });
    });

    return () => {
      ctx.revert();
      lenis.off('scroll', scrollHandler);
      lenis.destroy();
      gsap.ticker.remove(tickerCallback);
    };
  }, []); // Scroll logic component load par sirf ek baar chalegi

  const toggleTheme = () => setTheme((prev) => (prev === "dark" ? "light" : "dark"));

  const parrotData = useMemo(() => (theme === "dark" ? ParrotLight : ParrotDark), [theme]);

  return (
    <div className="min-h-screen bg-background font-sans text-foreground transition-colors duration-300">
      <header className="sticky top-0 z-10 border-b border-gray-200/50 bg-background/80 backdrop-blur-md dark:border-gray-800/50">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-1">
            <Logo className="h-10 w-auto" />
          </Link>
          <button 
            onClick={toggleTheme} 
            className="p-2 cursor-pointer hover:bg-foreground/5 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            aria-label="Toggle Theme"
          >
            {theme === "dark" ? <SunIcon /> : <MoonIcon />}
          </button>
        </div>
      </header>

      {/* Parrot Container with transform-gpu for hardware acceleration */}
      <div 
        ref={parrotRef} 
        className="fixed z-50 w-48 h-32 pointer-events-none transform-gpu will-change-transform"
      >
        <Lottie 
          animationData={parrotData} 
          loop={true} 
          autoplay={true} 
          rendererSettings={{ preserveAspectRatio: 'xMidYMid slice' }}
        />
      </div>

      <main>
        <section id="hero"><ChromeTextHeader /></section>
        <Skills />
        <Projects />
        <Contact />
        <About />
      </main>

      <Footer />
    </div>
  );
}

const SunIcon = () => (
  <svg className="h-5 w-5 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

const MoonIcon = () => (
  <svg className="h-5 w-5 text-slate-700 dark:text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
  </svg>
);