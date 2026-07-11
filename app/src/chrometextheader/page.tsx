"use client";
import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const WaterTextHeader: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const subTextRef = useRef<HTMLDivElement>(null);
  const waveRef = useRef<SVGPathElement>(null);
  const leavesRef = useRef<SVGGElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=1000",
          scrub: 0.5,
          pin: true,
        },
      });

      tl.to(textRef.current, {
        opacity: 0,
        scale: 0.95,
        y: -40,
        duration: 3,
      })
      .fromTo(
        subTextRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.5 },
        "-=1.5"
      );

      gsap.to([waveRef.current, leavesRef.current], {
        x: "-=80",
        repeat: -1,
        duration: 10,
        ease: "sine.inOut",
        yoyo: true,
      });

      if (leavesRef.current) {
        gsap.to(leavesRef.current.children, {
          rotation: "random(-15, 15)",
          y: "random(-8, 8)",
          x: "random(-5, 5)",
          duration: "random(3, 5)",
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          stagger: 0.3,
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-background transition-colors duration-500"
    >
      <div className="absolute inset-0 z-0 pointer-events-none flex items-end justify-center pb-32">
        <svg
          viewBox="0 0 1200 300"
          className="w-[140%] h-auto opacity-25 dark:opacity-45 transition-all duration-700"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            ref={waveRef}
            className="stroke-[#a93838] dark:stroke-[#26bfe5]"
            strokeWidth="1"
            strokeLinecap="round"
            d="M0 200 Q 300 160 600 200 T 1200 200"
          />
          <g ref={leavesRef} className="fill-[#a93838] dark:fill-[#26bfe5]">
            <path 
              d="M200 200 C 170 170, 230 150, 260 180 C 240 210, 210 210, 200 200 Z" 
              className="opacity-90"
              transform="scale(0.9) translate(-40, -40)"
            />
            <path 
              d="M450 190 C 430 150, 480 140, 500 170 C 490 200, 460 210, 450 190 Z" 
              className="opacity-70"
              transform="rotate(15 450 190) scale(0.9)"
            />
            <path 
              d="M750 200 C 780 160, 830 180, 810 210 C 780 230, 740 220, 750 200 Z" 
              className="opacity-80"
              transform="rotate(-10 750 200) scale(0.9)"
            />
            <path 
              d="M1000 185 C 950 150, 1020 120, 1070 150 C 1050 210, 1010 225, 1000 185 Z" 
              className="opacity-90"
              transform="rotate(25 1000 185) scale(0.9)"
            />
          </g>
        </svg>
      </div>

      {/* Hero Content */}
      <h1
        ref={textRef}
        className="text-3d-transparent relative z-10 w-full text-center text-5xl font-black uppercase tracking-tighter sm:text-7xl md:text-8xl lg:text-[10rem] leading-none will-change-transform"
      >
        Hi, I'm Hammad
      </h1>

      <div
        ref={subTextRef}
        className="absolute z-20 max-w-3xl text-center opacity-0 px-4 will-change-transform"
      >
        <p className="text-lg text-foreground/60 md:text-2xl font-medium mb-8">
          Frontend developer & creative problem solver.
        </p>
        <div className="flex justify-center">
          <a href="#projects" className="btn-view-projects">
            View Projects
          </a>
        </div>
      </div>
    </div>
  );
};

export default WaterTextHeader;