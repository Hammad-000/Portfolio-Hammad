"use client";
import React, { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

const WaterTextHeader: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const roleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const waveRef = useRef<SVGPathElement>(null);
  const leavesRef = useRef<SVGGElement>(null);

  useIsoLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const revealTargets = [
      bgRef.current,
      nameRef.current,
      roleRef.current,
      ctaRef.current,
    ];

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set(revealTargets, { opacity: 1 });
    });

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const intro = gsap.timeline({ defaults: { ease: "power4.out" } });
      intro
        .to(bgRef.current, { opacity: 1, duration: 1.6, ease: "power2.out" }, 0)
        .fromTo(
          nameRef.current,
          { y: 60, opacity: 0, filter: "blur(12px)" },
          { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.1, clearProps: "filter" },
          0.1
        )
        .fromTo(
          roleRef.current,
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          0.65
        )
        .fromTo(
          ctaRef.current,
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          0.85
        );


      gsap.to(contentRef.current, {
        y: -60,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "70% top",
          scrub: 0.5,
        },
      });

      const ambient: gsap.core.Tween[] = [];

      if (waveRef.current) {
        ambient.push(
          gsap.to(waveRef.current, {
            x: -1200,
            duration: 40,
            ease: "none",
            repeat: -1,
          })
        );
      }

      if (leavesRef.current) {
        const leaves = gsap.utils.toArray<SVGPathElement>(leavesRef.current.children);
        gsap.set(leaves, { transformOrigin: "50% 50%" });
        ambient.push(
          gsap.to(leaves, {
            rotation: "random(-15, 15)",
            y: "random(-8, 8)",
            x: "random(-5, 5)",
            duration: "random(3, 5)",
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            stagger: 0.3,
          })
        );
      }

      ScrollTrigger.create({
        trigger: container,
        start: "top bottom",
        end: "bottom top",
        onToggle: (self) =>
          ambient.forEach((t) => (self.isActive ? t.resume() : t.pause())),
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="home"
      aria-label="Introduction"
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-background px-4 transition-colors duration-500"
      style={{ minHeight: "100svh" }}
    >
      {/* Water background (decorative) */}
      <div
        ref={bgRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 flex items-end justify-center pb-32 opacity-0"
      >
        <svg
          viewBox="0 0 1200 300"
          className="h-auto w-[140%] opacity-25 transition-opacity duration-700 dark:opacity-45"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            ref={waveRef}
            className="stroke-[#a93838] dark:stroke-[#26bfe5]"
            strokeWidth="1.5"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            d="M0 200 Q 300 160 600 200 T 1200 200 T 1800 200 T 2400 200"
          />
          <g ref={leavesRef} className="fill-[#a93838] dark:fill-[#26bfe5]">
            <path
              d="M200 200 C 170 170, 230 150, 260 180 C 240 210, 210 210, 200 200 Z"
              className="opacity-90"
            />
            <path
              d="M450 190 C 430 150, 480 140, 500 170 C 490 200, 460 210, 450 190 Z"
              className="opacity-70"
            />
            <path
              d="M750 200 C 780 160, 830 180, 810 210 C 780 230, 740 220, 750 200 Z"
              className="opacity-80"
            />
            <path
              d="M1000 185 C 950 150, 1020 120, 1070 150 C 1050 210, 1010 225, 1000 185 Z"
              className="opacity-90"
            />
          </g>
        </svg>
      </div>

      <div
        ref={contentRef}
        className="relative z-10 flex w-full flex-col items-center gap-8 text-center"
      >
        <h1
          ref={nameRef}
          className="text-3d-transparent w-full text-5xl font-black uppercase leading-none tracking-tighter opacity-0 will-change-transform sm:text-7xl md:text-8xl lg:text-[10rem]"
        >
          Hi, I&apos;m Hammad
        </h1>

        <p
          ref={roleRef}
          className="max-w-2xl text-lg font-medium text-foreground/70 opacity-0 md:text-2xl"
        >
          MERN Stack Developer crafting responsive,
          scalable, and user-friendly web applications
          with React, Node.js, Express, and MongoDB.
        </p>

        <div ref={ctaRef} className="flex flex-wrap justify-center gap-4 opacity-0">
          <a href="#projects" className="btn-view-projects">
            View Projects
          </a>
          <a
            href="#contact"
            className="inline-flex items-center rounded-xl border border-foreground/20 px-6 py-3 font-semibold text-foreground transition-colors hover:bg-foreground/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
          >
            Contact Me
          </a>
        </div>
      </div>
    </section>
  );
};

export default WaterTextHeader;