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
    <section id="about" className="relative overflow-hidden bg-white py-12 dark:bg-gray-800/50 md:py-20">
      {/* Responsive Lottie Container */}
      <div
        className="pointer-events-none absolute left-1/2 top-12 z-10 w-full max-w-[280px] -translate-x-1/2 sm:max-w-[350px] md:left-40 md:top-1/2 md:max-w-[400px] md:-translate-y-20 md:translate-x-0"
        style={{ height: "160px", transform: "scaleX(-1)" }}
      >
        <Lottie animationData={currentButterfly} loop autoplay className="h-full w-full" />
      </div>

      {/* Main Content */}
      <div className="relative z-20 mx-auto max-w-6xl px-4 pt-40 text-center md:pt-0 lg:px-8">
        {/* Updated Heading with beautiful gradient */}
        <h2 className="animate-on-scroll text-3xl font-bold tracking-tight opacity-0 translate-y-6 transition-all duration-700 ease-out md:text-4xl bg-gradient-to-r from-gray-950 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
          Who I Am & What I Do
        </h2>
        
        <p className="animate-on-scroll mx-auto mt-4 max-w-2xl text-base text-gray-600 opacity-0 translate-y-6 transition-all duration-700 delay-100 ease-out dark:text-gray-400 md:text-lg">
          I'm a passionate frontend developer who loves turning ideas into real, functional products.
          I focus on performance, accessibility, and delightful user experiences. When I'm not coding,
          I'm probably exploring new tech or contributing to open source.
        </p>
      </div>
    </section>
  );
}

export default About;