"use client";

import React, { useEffect, useState } from "react";  
import Lottie from "lottie-react";
import ButterfliesLight from "../animations/butterflies.json";
import ButterfliesDark from "../animations/butterflies 2.json";

function About() {
  const [currentButterfly, setCurrentButterfly] = useState(ButterfliesLight);

  useEffect(() => {
    const checkTheme = () => {
      const isDark = document.documentElement.classList.contains("dark");
      setCurrentButterfly(isDark ? ButterfliesLight : ButterfliesDark);
    };
    checkTheme();

    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="relative flex min-h-[60vh] items-center justify-center overflow-hidden bg-white py-12 dark:bg-gray-800/50 md:py-24 lg:py-32">
      {/* Responsive Lottie Container */}
      <div
        className="pointer-events-none absolute left-1/2 top-6 z-10 w-full max-w-[220px] -translate-x-1/2 sm:max-w-[280px] md:left-12 md:top-1/2 md:max-w-[340px] md:-translate-y-1/2 md:translate-x-0 lg:left-24 lg:max-w-[400px]"
        style={{ height: "auto", transform: "scaleX(-1)" }}
      >
        <Lottie animationData={currentButterfly} loop autoplay className="h-full w-full object-contain" />
      </div>

      {/* Main Content */}
      <div className="relative z-20 mx-auto max-w-5xl px-4 pt-28 text-center sm:px-6 md:pt-0 lg:px-8">
        {/* Updated Heading with beautiful gradient */}
        <h2 className="animate-on-scroll translate-y-6 text-3xl font-bold tracking-tight opacity-0 transition-all duration-700 ease-out sm:text-4xl md:text-5xl bg-gradient-to-r from-gray-950 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
          Who I Am & What I Do
        </h2>
        
        <p className="animate-on-scroll mx-auto mt-6 max-w-2xl translate-y-6 text-base leading-relaxed text-gray-600 opacity-0 transition-all duration-700 delay-100 ease-out dark:text-gray-400 md:text-lg lg:max-w-3xl lg:text-xl">
          I'm a passionate MERN stack developer who loves turning ideas into real, functional products.
          I focus on performance, accessibility, and delightful user experiences. When I'm not coding,
          I'm probably exploring new tech or contributing to open source.
        </p>
      </div>
    </section>
  );
}

export default About;