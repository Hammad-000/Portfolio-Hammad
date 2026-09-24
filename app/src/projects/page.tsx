"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { ExternalLink } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const GitHubIcon = ({ size = 20 }: { size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

interface Project {
  id: number;
  title: string;
  description: string;
  tech: string[];
  image: string;
  video: string;
  liveUrl: string;
  githubUrl: string;
}

const projectsData: Project[] = [
  {
    id: 1,
    title: "Cakes Villa",
    description:
      "Full-stack cake ordering app. Customers browse cakes, open details and place orders; the admin side manages orders and data.",
    tech: ["React", "Node.js", "Express", "MongoDB", "Tailwind"],
    image: "/photos/cake.png",
    video: "/videos/cakesvillas.mp4",
    liveUrl: "https://cakevillaa.vercel.app/",
    githubUrl: "https://github.com/Hammad-000/cake",
  },
  {
    id: 2,
    title: "Expense Tracker",
    description:
      "Log in, record your daily spending and see it grouped by category, so it's clear where the money goes.",
    tech: ["React", "Supabase", "Tailwind"],
    image: "/photos/expense.png",
    video: "/videos/expence.mp4",
    liveUrl: "https://expence-psi.vercel.app/login",
    githubUrl: "https://github.com/Hammad-000/expence",
  },
  {
    id: 3,
    title: "Inferno Grill",
    description:
      "Food ordering site with a browsable menu, checkout and real-time order tracking, powered by Supabase.",
    tech: ["React", "Supabase", "Tailwind"],
    image: "/photos/inferno.png",
    video: "/videos/inferno.mp4",
    liveUrl: "https://inferno-grill.vercel.app/",
    githubUrl: "https://github.com/Hammad-000/inferno-grill",
  },
];

const HEADING = "Projects";

/**
 * Shared play/stop logic for a card's preview video.
 * The file is only requested the first time it is played (lazy load),
 * and a play() that gets interrupted by stop() is ignored safely.
 */
function createVideoControls(video: HTMLVideoElement | null) {
  let active = false;
  return {
    start() {
      if (!video) return;
      active = true;
      if (!video.getAttribute("src") && video.dataset.src) {
        video.src = video.dataset.src;
      }
      video
        .play()
        .then(() => {
          if (active) gsap.to(video, { opacity: 1, duration: 0.3, overwrite: true });
        })
        .catch(() => {
          // Interrupted, or blocked (e.g. iOS Low Power Mode): the image stays visible.
        });
    },
    stop() {
      if (!video) return;
      active = false;
      video.pause();
      gsap.to(video, { opacity: 0, duration: 0.3, overwrite: true });
    },
  };
}

function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLHeadingElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const letters = section.querySelectorAll<HTMLElement>(".letter");
    const cards = cardRefs.current.filter((c): c is HTMLElement => c !== null);
    const mm = gsap.matchMedia();

    // 1) Entrance animations (skipped for reduced-motion users).
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(
        letters,
        { y: 50, opacity: 0, filter: "blur(10px)" },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.8,
          stagger: 0.03,
          ease: "power4.out",
          clearProps: "filter",
          scrollTrigger: { trigger: headerRef.current, start: "top 90%", once: true },
        }
      );

      gsap.set(cards, { opacity: 0, y: 60 });
      ScrollTrigger.batch(cards, {
        start: "top 88%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power4.out",
            stagger: 0.12,
          }),
      });
    });

    // 2) Mouse devices: video on hover/focus + 3D tilt.
    mm.add("(hover: hover) and (pointer: fine)", () => {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const cleanups: (() => void)[] = [];

      cards.forEach((card, index) => {
        const controls = createVideoControls(videoRefs.current[index]);

        let rotX: ((value: number) => unknown) | undefined;
        let rotY: ((value: number) => unknown) | undefined;
        if (!reduceMotion) {
          gsap.set(card, { transformPerspective: 900 });
          rotX = gsap.quickTo(card, "rotationX", { duration: 0.4, ease: "power3.out" });
          rotY = gsap.quickTo(card, "rotationY", { duration: 0.4, ease: "power3.out" });
        }

        const onMouseEnter = () => controls.start();
        const onMouseMove = (e: MouseEvent) => {
          if (!rotX || !rotY) return;
          const r = card.getBoundingClientRect();
          const px = (e.clientX - r.left) / r.width - 0.5; // -0.5 .. 0.5
          const py = (e.clientY - r.top) / r.height - 0.5;
          rotX(py * -8);
          rotY(px * 8);
        };
        const onMouseLeave = () => {
          rotX?.(0);
          rotY?.(0);
          controls.stop();
        };
        const onFocusIn = () => controls.start();
        const onFocusOut = (e: FocusEvent) => {
          if (!card.contains(e.relatedTarget as Node | null)) controls.stop();
        };

        card.addEventListener("mouseenter", onMouseEnter);
        card.addEventListener("mousemove", onMouseMove);
        card.addEventListener("mouseleave", onMouseLeave);
        card.addEventListener("focusin", onFocusIn);
        card.addEventListener("focusout", onFocusOut);

        cleanups.push(() => {
          card.removeEventListener("mouseenter", onMouseEnter);
          card.removeEventListener("mousemove", onMouseMove);
          card.removeEventListener("mouseleave", onMouseLeave);
          card.removeEventListener("focusin", onFocusIn);
          card.removeEventListener("focusout", onFocusOut);
        });
      });

      return () => cleanups.forEach((fn) => fn());
    });

    // 3) Touch devices (phones/tablets): there is no hover, so the video plays
    //    while a card is in the middle band of the screen, and pauses otherwise.
    //    Skipped when the user has Data Saver on or prefers reduced motion.
    mm.add("(hover: none) and (prefers-reduced-motion: no-preference)", () => {
      const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
      if (conn?.saveData) return;

      const triggers = cards.map((card, index) => {
        const controls = createVideoControls(videoRefs.current[index]);
        return ScrollTrigger.create({
          trigger: card,
          start: "center 70%", // card centre passes 70% of viewport height...
          end: "center 30%", // ...until it passes 30%: only one card is active at a time
          onToggle: (self) => (self.isActive ? controls.start() : controls.stop()),
        });
      });

      return () => triggers.forEach((t) => t.kill());
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      aria-labelledby="projects-heading"
      className="relative overflow-hidden bg-gray-50 text-gray-900 dark:bg-[#08080a] dark:text-white"
    >
      {/* Background glow (smaller + cheaper blur on mobile) */}
      <div className="pointer-events-none absolute inset-0 opacity-40" aria-hidden="true">
        <div className="absolute left-1/4 top-0 h-64 w-64 rounded-full bg-blue-500/10 blur-[80px] md:h-96 md:w-96 md:blur-[128px]" />
        <div className="absolute bottom-0 right-1/4 h-64 w-64 rounded-full bg-purple-500/10 blur-[80px] md:h-96 md:w-96 md:blur-[128px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 md:py-32">
        <div className="mb-12 text-center sm:mb-16 md:mb-24">
          <h2
            id="projects-heading"
            ref={headerRef}
            aria-label={HEADING}
            className="text-4xl font-extrabold uppercase tracking-tighter min-[380px]:text-5xl sm:text-6xl md:text-7xl lg:text-8xl"
          >
            {HEADING.split("").map((char, i) => (
              <span
                key={i}
                aria-hidden="true"
                className="letter inline-block bg-gradient-to-b from-gray-900 to-gray-500 bg-clip-text text-transparent dark:from-white dark:to-gray-400"
              >
                {char}
              </span>
            ))}
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-base text-gray-600 dark:text-gray-400 sm:mt-6 sm:text-lg">
            A curated selection of my recent work, focusing on interactive web experiences.
          </p>
        </div>

        {/* 1 column on phones (capped width so cards don't get huge), 2 on tablets, 3 on desktop */}
        <div className="mx-auto grid max-w-xl grid-cols-1 gap-6 sm:gap-8 md:max-w-none md:grid-cols-2 md:gap-10 lg:grid-cols-3">
          {projectsData.map((project, idx) => (
            <article
              key={project.id}
              ref={(el) => {
                cardRefs.current[idx] = el;
              }}
              className="group relative flex flex-col overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm transition-[box-shadow,border-color] duration-300 hover:border-gray-200 hover:shadow-2xl dark:border-gray-800/50 dark:bg-gray-950 dark:hover:border-gray-700"
            >
              {/* Whole-card click target (mouse/touch only). Keyboard and screen-reader
                  users use the real buttons below, so this is hidden from them. */}
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-hidden="true"
                tabIndex={-1}
                className="absolute inset-0 z-10 cursor-pointer"
              />

              {/* aspect ratio scales with the card, instead of a fixed height */}
              <div className="relative aspect-[16/10] overflow-hidden border-b border-gray-100 dark:border-gray-800/50">
                <Image
                  src={project.image}
                  alt={`${project.title} preview`}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
                <video
                  ref={(el) => {
                    videoRefs.current[idx] = el;
                  }}
                  data-src={project.video}
                  loop
                  muted
                  playsInline
                  preload="none"
                  aria-hidden="true"
                  tabIndex={-1}
                  className="absolute inset-0 h-full w-full object-cover opacity-0"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-focus-within:opacity-100 group-hover:opacity-100" />
              </div>

              <div className="flex flex-grow flex-col p-5 sm:p-6 md:p-7">
                <ul className="mb-3 flex flex-wrap gap-2 sm:mb-4" aria-label="Tech used">
                  {project.tech.map((t) => (
                    <li
                      key={t}
                      className="rounded-2xl bg-blue-100 px-2.5 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-950/50 dark:text-blue-300"
                    >
                      {t}
                    </li>
                  ))}
                </ul>

                <h3 className="mb-2 text-xl font-bold transition-colors group-hover:text-blue-600 dark:group-hover:text-blue-400 sm:text-2xl">
                  {project.title}
                </h3>
                <p className="mb-5 flex-grow text-sm leading-relaxed text-gray-600 dark:text-gray-400 sm:mb-6">
                  {project.description}
                </p>

                {/* z-20 keeps the buttons above the whole-card link. min-h-11 = 44px touch targets. */}
                <div className="relative z-20 mt-auto grid grid-cols-[3fr_2fr] items-center gap-3 border-t border-gray-100 pt-4 dark:border-gray-800/50 sm:flex sm:flex-wrap">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${project.title} live demo (opens in a new tab)`}
                    className="group/btn btn-theme inline-flex min-h-11 w-full items-center justify-center gap-1.5 whitespace-nowrap rounded-xl px-3 py-2.5 text-xs font-bold uppercase tracking-wide shadow-lg sm:flex-1 sm:gap-2 sm:px-4 sm:tracking-wider transition-transform active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 motion-reduce:transform-none [@media(hover:hover)]:hover:-translate-y-0.5 [@media(hover:hover)]:hover:scale-105"
                  >
                    <span className="relative flex h-2 w-2" aria-hidden="true">
                      <span className="absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75 motion-safe:animate-ping" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
                    </span>
                    Live Demo
                    <ExternalLink
                      size={14}
                      aria-hidden="true"
                      className="hidden transition-transform min-[400px]:block group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5"
                    />
                  </a>

                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${project.title} source code on GitHub (opens in a new tab)`}
                    className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-gray-200 px-3 py-2.5 text-xs font-bold uppercase tracking-wide text-gray-700 sm:w-auto sm:px-4 sm:tracking-wider transition-colors active:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 dark:border-gray-800 dark:text-gray-300 dark:active:bg-gray-900 [@media(hover:hover)]:hover:border-gray-400 [@media(hover:hover)]:hover:text-black dark:[@media(hover:hover)]:hover:border-gray-600 dark:[@media(hover:hover)]:hover:text-white"
                  >
                    <GitHubIcon size={18} />
                    Code
                  </a>
                </div>
              </div>

              <div className="pointer-events-none absolute inset-0 z-20 rounded-3xl border-2 border-white/0 transition-colors duration-500 group-hover:border-white/10" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;