"use client";
import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { ExternalLink } from 'lucide-react';

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
    title: "Cakes Villas",
    description: "Cakes Villa is a full-stack cake ordering website built using the MERN stack (MongoDB, Express.js, React, and Node.js). It allows users to explore a variety of delicious cakes, view details, and place orders with ease. The platform is designed to be fast, responsive, and user-friendly, ensuring a smooth shopping experience. It also efficiently manages orders and data for both customers and the admin side.",
    tech: ["React", "Nodejs", "Tailwind", "Express JS", "Mongo DB"],
    image: "/photos/cake.png",
    video: "/videos/cakesvillas.mp4",
    liveUrl: "https://cakevillaa.vercel.app/",
    githubUrl: "https://github.com/Hammad-000/cake",
  },
  {
    id: 2,
    title: "Expense Tracker",
    description: "An expense tracker is a tool that helps you record and monitor your daily spending. It organizes expenses into categories so you can clearly see where your money goes. This makes budgeting easier and helps you manage your finances better.",
    tech: ["React", "Tailwind", "Supabase",],
    image: "/photos/expense.png",
    video: "/videos/expence.mp4",
    liveUrl: "https://expence-psi.vercel.app/login",
    githubUrl: "https://github.com/Hammad-000/expence",
  },
  {
    id: 3,
    title: "Inferno Grill",
    description: "Inferno Grill is a fast and modern food ordering website built with React and Supabase, designed to provide a smooth and seamless user experience. It allows customers to easily browse the menu, place orders, and track their food in real time. The platform is optimized for speed, simplicity, and efficient order management.",
    tech: ["React", "Supabase", "Tailwind",],
    image: "/photos/inferno.png",
    video: "/videos/inferno.mp4",
    liveUrl: "https://inferno-grill.vercel.app/",
    githubUrl: "https://github.com/Hammad-000/inferno-grill",
  },
];

function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const headerRef = useRef<HTMLHeadingElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]); ``

  useEffect(() => {
    if (!headerRef.current) return;
    const ctx = gsap.context(() => {
      const originalText = headerRef.current!.innerText;
      const letters = originalText.split('').map((char) => {
        if (char === ' ') return `<span style="display:inline-block; width:0.25em;">&nbsp;</span>`;
        return `<span class="letter" style="display:inline-block; will-change:transform, filter;">${char}</span>`;
      }).join('');
      headerRef.current!.innerHTML = letters;

      gsap.fromTo(".letter",
        { y: 50, opacity: 0, filter: "blur(10px)" },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.8,
          stagger: 0.02,
          ease: "power4.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 90%",
          }
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(card,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power4.out",
            delay: i * 0.1,
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const cards = cardRefs.current.filter((card): card is HTMLDivElement => card !== null);
    if (cards.length === 0 || 'ontouchstart' in window) return;

    const cleanups: (() => void)[] = [];

    cards.forEach((card, index) => {
      const video = videoRefs.current[index];
      const fallbackImg = card.querySelector('.fallback-img') as HTMLElement | null;
      const actionButtons = card.querySelectorAll('.action-btn');

      const handleMouseEnter = () => {
        if (video) {
          video.currentTime = 0;
          video.play().catch(error => console.error("Video play failed:", error));
          gsap.to(video, { opacity: 1, duration: 0.3 });
          if (fallbackImg) gsap.to(fallbackImg, { opacity: 0, duration: 0.3 });
        }
      };

      const handleMouseMove = (e: MouseEvent) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -4;
        const rotateY = ((x - centerX) / centerX) * 4;

        gsap.to(card, {
          rotateX: rotateX,
          rotateY: rotateY,
          duration: 0.3,
          ease: "power2.out",
          overwrite: true,
        });
      };

      const handleMouseLeave = () => {
        gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.6, ease: "elastic.out(1, 0.5)" });

        if (video) {
          video.pause();
          gsap.to(video, { opacity: 0, duration: 0.3 });
          if (fallbackImg) gsap.to(fallbackImg, { opacity: 1, duration: 0.9 });
        }
      };

      actionButtons.forEach(btn => {
        const btnMouseEnter = () => gsap.to(btn, { scale: 1.05, y: -2, duration: 0.2 });
        const btnMouseLeave = () => gsap.to(btn, { scale: 1, y: 0, duration: 0.2 });
        btn.addEventListener('mouseenter', btnMouseEnter);
        btn.addEventListener('mouseleave', btnMouseLeave);
        cleanups.push(() => {
          btn.removeEventListener('mouseenter', btnMouseEnter);
          btn.removeEventListener('mouseleave', btnMouseLeave);
        });
      });

      card.addEventListener('mouseenter', handleMouseEnter);
      card.addEventListener('mousemove', handleMouseMove);
      card.addEventListener('mouseleave', handleMouseLeave);

      cleanups.push(() => {
        card.removeEventListener('mouseenter', handleMouseEnter);
        card.removeEventListener('mousemove', handleMouseMove);
        card.removeEventListener('mouseleave', handleMouseLeave);
      });
    });

    return () => cleanups.forEach(clean => clean());
  }, []);

  return (
    <section ref={sectionRef} id="projects" className="bg-gray-50 dark:bg-[#08080a] text-gray-900 dark:text-white mx-auto max-w-7xl px-6 py-24 md:py-32 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[128px]"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[128px]"></div>
      </div>

      <div className="project-header mb-16 md:mb-24 text-center relative z-10">
        <h2 ref={headerRef} className="text-5xl font-extrabold uppercase tracking-tighter md:text-7xl lg:text-8xl bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent">
          Projects
        </h2>
        <p className="mx-auto mt-6 max-w-lg text-lg text-gray-600 dark:text-gray-400">
          A curated selection of my recent work, focusing on interactive web experiences.
        </p>
      </div>

      <div className="grid gap-8 md:gap-10 sm:grid-cols-2 lg:grid-cols-3 relative z-10">
        {projectsData.map((project, idx) => (
          <div
            key={project.id}
            ref={(el) => { cardRefs.current[idx] = el; }}
            className="group relative cursor-pointer flex flex-col rounded-3xl bg-white dark:bg-gray-950 border border-gray-100 dark:border-gray-800/50 shadow-sm transition-all duration-300 hover:shadow-2xl hover:border-gray-200 dark:hover:border-gray-700 overflow-hidden"
            style={{ transformStyle: "preserve-3d", willChange: "transform" }}
          >
            {/* Media Container (Image/Video) */}
            <div className="relative h-60 md:h-64 overflow-hidden rounded-t-3xl border-b border-gray-100 dark:border-gray-800/50">
              {/* Fallback Image */}
              <img
                src={project.image}
                alt={project.title}
                className="fallback-img absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              {/* Hover Video */}
              <video
                ref={(el) => { videoRefs.current[idx] = el; }}
                src={project.video}
                loop
                muted
                playsInline
                autoPlay  
                preload="auto" 
                className="absolute inset-0 h-full w-full object-cover opacity-0 will-change-opacity"
              />
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Content Container */}
            <div className="p-6 md:p-7 flex flex-col flex-grow">
              {/* Tech Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.map((t) => (
                  <span key={t} className="light text-[10px] font-semibold uppercase tracking-wider text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-950/50 px-2 py-1 rounded-2xl">
                    {t}
                  </span>
                ))}
              </div>

              {/* Title & Description */}
              <h3 className="text-2xl font-bold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {project.title}
              </h3>
              <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400 mb-6 flex-grow">
                {project.description}
              </p>

              {/* Action Buttons */}
              <div className="flex items-center gap-4 mt-auto pt-4 border-t border-gray-100 dark:border-gray-800/50">
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="action-btn group/btn btn-theme inline-flex items-center gap-2.5 text-sm font-bold uppercase tracking-wider px-5 py-3 rounded-xl shadow-lg"
                >
                  {/* Live Pulse Icon */}
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                  </span>
                  Live Demo
                  <ExternalLink size={16} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                </a>

                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="action-btn inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-gray-700 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors"
                >
                  <GitHubIcon size={20} />
                  {/* Or use <GitHubIcon size={20} /> if the import fails */}
                  Code
                </a>
              </div>
            </div>

            {/* Subtle inner glare on hover */}
            <div className="absolute inset-0 rounded-3xl pointer-events-none border-2 border-white/0 group-hover:border-white/10 transition-colors duration-500 z-20"></div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Projects;