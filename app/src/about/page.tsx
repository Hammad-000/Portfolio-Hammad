"use client";

import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import type { LottieRefCurrentProps } from "lottie-react";
import ButterfliesLight from "../animations/butterflies.json";
import ButterfliesDark from "../animations/butterflies 2.json";

// Lottie is heavy and needs the browser, so it is loaded only on the client
// and does not add to the initial bundle.
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

function About() {
  // null until we know the theme, so the wrong butterflies never flash.
  const [animationData, setAnimationData] = useState<object | null>(null);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [revealed, setRevealed] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const lottieRef = useRef<LottieRefCurrentProps>(null);

  // Theme: same mapping as before (light-file on dark theme, dark-file on light theme).
  useEffect(() => {
    const checkTheme = () => {
      const isDark = document.documentElement.classList.contains("dark");
      setAnimationData(isDark ? ButterfliesLight : ButterfliesDark);
    };
    checkTheme();

    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  // Reduced motion: no autoplay, no reveal animation.
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    if (mq.matches) setRevealed(true);
    const onChange = (e: MediaQueryListEvent) => setReduceMotion(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // Reveal text when it scrolls into view. Self-contained: the old
  // "animate-on-scroll opacity-0" classes needed an external script, and
  // without it the text would stay invisible forever.
  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Pause the butterflies while the section is off-screen (saves CPU/battery).
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || reduceMotion) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) lottieRef.current?.play();
      else lottieRef.current?.pause();
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [reduceMotion, animationData]);

  const reveal = revealed ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0";

  return (
    <section
      ref={sectionRef}
      id="about"
      aria-labelledby="about-heading"
      className="relative flex min-h-[60vh] items-center justify-center overflow-hidden bg-white py-12 dark:bg-gray-800/50 md:py-24 lg:py-32"
    >
      {/* Butterflies (decorative).
          Bug fix: before, the flip was an inline style="transform: scaleX(-1)" on this
          same element. An inline transform replaces Tailwind's -translate-x-1/2 and
          md:-translate-y-1/2, so the butterflies were NOT centered. The flip now lives
          on an inner wrapper, so positioning and flipping no longer clash. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-6 z-10 w-full max-w-[200px] -translate-x-1/2 min-[400px]:max-w-[240px] sm:max-w-[280px] md:left-12 md:top-1/2 md:max-w-[300px] md:-translate-y-1/2 md:translate-x-0 lg:left-24 lg:max-w-[400px]"
      >
        <div className="-scale-x-100">
          {animationData && (
            <Lottie
              lottieRef={lottieRef}
              animationData={animationData}
              loop={!reduceMotion}
              autoplay={!reduceMotion}
              className="h-auto w-full"
            />
          )}
        </div>
      </div>

      {/* Main content */}
      <div
        ref={contentRef}
        className="relative z-20 mx-auto max-w-5xl px-4 pt-40 text-center min-[400px]:pt-44 sm:px-6 sm:pt-48 md:pt-0 md:pl-[22rem] lg:px-8 lg:pl-[26rem]"
      >
        <h2
          id="about-heading"
          className={`bg-gradient-to-r from-gray-950 to-gray-600 bg-clip-text pb-1 text-[1.75rem] font-bold leading-tight tracking-tight text-transparent transition-all duration-700 ease-out dark:from-white dark:to-gray-400 min-[400px]:text-3xl sm:text-4xl md:text-5xl ${reveal}`}
        >
          Who I Am &amp; What I Do
        </h2>

        <p
          className={`mx-auto mt-5 max-w-2xl text-base leading-relaxed text-gray-600 transition-all delay-100 duration-700 ease-out dark:text-gray-400 sm:mt-6 md:text-lg lg:max-w-3xl lg:text-xl ${reveal}`}
        >
          I&apos;m a passionate MERN stack developer who loves turning ideas into real,
          functional products. I focus on performance, accessibility, and delightful user
          experiences. When I&apos;m not coding, I&apos;m probably exploring new tech or
          contributing to open source.
        </p>
      </div>
    </section>
  );
}

export default About;