"use client";

import React from "react";
import { Home, User, Briefcase, Mail, ChevronUp } from "lucide-react";

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative mt-20 border-t border-gray-200/50 dark:border-gray-800/50">
      {/* Decorative wave separator - Color matched to background variables */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] rotate-180 -translate-y-[99%]">
        <svg
          className="relative block w-full h-12 text-background"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            fill="currentColor"
          />
        </svg>
      </div>

      {/* Main Footer Container */}
      <div className="bg-background pt-16 pb-8 transition-colors duration-300">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
            
            {/* Brand - Using your custom text-3d-transparent class */}
            <div className="text-center md:text-left">
              <h3 className="text-3xl md:text-4xl font-bold text-3d-transparent tracking-tight">
                Hammad Ahmed
              </h3>
              <p className="text-sm font-medium text-foreground/60 mt-2">
                Building digital experiences with passion.
              </p>
            </div>

            {/* Quick links with Theme-Aware Hovers */}
            <nav className="flex flex-wrap justify-center gap-8 text-sm font-semibold">
              <a href="#hero" className="flex items-center gap-2 text-foreground/70 hover:text-[#a93838] dark:hover:text-[#26bfe5] transition-colors group">
                <Home size={18} className="opacity-50 group-hover:opacity-100 transition-opacity" />
                <span>Home</span>
              </a>
              <a href="#about" className="flex items-center gap-2 text-foreground/70 hover:text-[#a93838] dark:hover:text-[#26bfe5] transition-colors group">
                <User size={18} className="opacity-50 group-hover:opacity-100 transition-opacity" />
                <span>About</span>
              </a>
              <a href="#projects" className="flex items-center gap-2 text-foreground/70 hover:text-[#a93838] dark:hover:text-[#26bfe5] transition-colors group">
                <Briefcase size={18} className="opacity-50 group-hover:opacity-100 transition-opacity" />
                <span>Projects</span>
              </a>
              <a href="#contact" className="flex items-center gap-2 text-foreground/70 hover:text-[#a93838] dark:hover:text-[#26bfe5] transition-colors group">
                <Mail size={18} className="opacity-50 group-hover:opacity-100 transition-opacity" />
                <span>Contact</span>
              </a>
            </nav>

            {/* Social Icons */}
            <div className="flex gap-5">
              <a
                href="https://github.com/Hammad-000"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-foreground/5 hover:bg-foreground/10 text-foreground/70 hover:text-foreground transition-all"
                aria-label="GitHub"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.387.6.113.82-.26.82-.58 0-.287-.01-1.05-.015-2.06-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.082-.73.082-.73 1.205.085 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.468-2.38 1.236-3.22-.124-.3-.536-1.52.117-3.16 0 0 1.008-.322 3.3 1.23.96-.267 1.98-.4 3-.405 1.02.005 2.04.138 3 .405 2.29-1.552 3.297-1.23 3.297-1.23.653 1.64.24 2.86.118 3.16.768.84 1.235 1.91 1.235 3.22 0 4.61-2.804 5.62-5.476 5.92.43.37.824 1.102.824 2.22 0 1.602-.015 2.894-.015 3.287 0 .322.216.698.83.578C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Divider using Theme Gradients */}
          <div className="h-px bg-gradient-to-r from-transparent via-foreground/20 to-transparent my-8"></div>

          {/* Bottom row */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-6 text-sm font-medium text-foreground/50">
            <p>© {new Date().getFullYear()} Hammad Ahmed. Built with Next.js & Tailwind CSS.</p>
            
            <button
              onClick={scrollToTop}
              className="group flex items-center gap-2 px-5 py-2.5 rounded-full bg-foreground/5 border border-foreground/10 hover:border-foreground/20 transition-all hover:text-foreground"
            >
              <ChevronUp size={18} className="transition-transform group-hover:-translate-y-1" />
              <span>Back to top</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;