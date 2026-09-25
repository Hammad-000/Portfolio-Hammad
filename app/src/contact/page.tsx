"use client";

import React, { useEffect, useRef, useState } from "react";
import "../../globals.css";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [formStatus, setFormStatus] = useState({
    loading: false,
    message: "",
    type: "",
  });

  const introRef = useRef<HTMLDivElement>(null);
  const formColRef = useRef<HTMLDivElement>(null);

  // Self-contained reveal-on-scroll: the previous version relied on
  // ".animate-on-scroll" being toggled by some external/global script.
  // If that script isn't present, the section stays invisible forever
  // (opacity-0 with nothing to remove it). This observer makes each
  // column reveal itself, and does nothing when the user prefers
  // reduced motion (content is visible immediately instead).
  useEffect(() => {
    const targets = [introRef.current, formColRef.current].filter(
      (el): el is HTMLDivElement => el !== null
    );
    if (targets.length === 0) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      targets.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus({ loading: true, message: "", type: "" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setFormStatus({
          loading: false,
          message: "Message sent successfully! I'll get back to you soon.",
          type: "success",
        });
        setFormData({ name: "", email: "", message: "" });
      } else {
        throw new Error(data.error || "Failed to send message");
      }
    } catch (error) {
      setFormStatus({
        loading: false,
        message:
          error instanceof Error ? error.message : "Something went wrong. Please try again.",
        type: "error",
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const GitHubIcon = () => (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fillRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
        clipRule="evenodd"
      />
    </svg>
  );

  const XIcon = () => (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );

  const LinkedInIcon = () => (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fillRule="evenodd"
        d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
        clipRule="evenodd"
      />
    </svg>
  );

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800/80 dark:to-gray-900"
    >
      {/* Animated background blobs (decorative, kept out of the accessibility tree) */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -right-24 -top-24 h-56 w-56 rounded-full bg-blue-300 opacity-20 mix-blend-multiply blur-2xl motion-safe:animate-pulse dark:opacity-10 sm:-right-32 sm:-top-40 sm:h-80 sm:w-80 sm:blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-56 w-56 rounded-full bg-indigo-300 opacity-20 mix-blend-multiply blur-2xl motion-safe:animate-pulse motion-safe:delay-1000 dark:opacity-10 sm:-bottom-40 sm:-left-32 sm:h-80 sm:w-80 sm:blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20 md:py-24 lg:px-8">
        <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-2 md:gap-16">
          {/* Left column: intro & socials */}
          <div
            ref={introRef}
            className="reveal-on-scroll space-y-6 opacity-0 transition-all duration-700 ease-out translate-y-6"
          >
            <div className="inline-flex items-center rounded-full bg-blue-100/80 px-3 py-1 text-xs font-medium text-blue-800 backdrop-blur-sm dark:bg-blue-900/40 dark:text-blue-200 sm:text-sm">
              <span className="relative mr-2 flex h-2 w-2 shrink-0">
                <span className="absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75 motion-safe:animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-500" />
              </span>
              Available for work
            </div>

            <h2 className="text-[2rem] font-bold leading-[1.15] tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent dark:from-white dark:to-gray-400 min-[350px]:text-3xl sm:text-3xl sm:leading-tight md:text-4xl">
              Let&apos;s create something extraordinary
            </h2>

            <p className="text-base leading-relaxed text-gray-600 dark:text-gray-300 sm:text-lg">
              Got a project in mind? I&apos;m just one message away. Whether it&apos;s a new
              website, a creative collaboration, or just a friendly chat — let&apos;s turn ideas
              into reality.
            </p>

            {/* Contact details & CV download */}
            <div className="space-y-4 pt-2 sm:pt-4">
              <a
                href="mailto:syedhammadahmed121@gmail.com"
                className="flex items-center gap-3 text-gray-700 transition-colors hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/50">
                  <svg
                    className="h-5 w-5 text-blue-600 dark:text-blue-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </span>
                <span className="min-w-0 break-words text-sm sm:text-lg">
                  syedhammadahmed121@gmail.com
                </span>
              </a>

              <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/50">
                  <svg
                    className="h-5 w-5 text-blue-600 dark:text-blue-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </span>
                <span className="text-sm sm:text-lg">Karachi, Pakistan</span>
              </div>

              <div className="pt-1 sm:pt-2">
                <a
                  href="/cv/Hammad_Ahmed_Resume.pdf"
                  download="My_CV.pdf"
                  className="btn-theme inline-flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white shadow-md shadow-blue-500/20 transition-all hover:scale-[1.02] hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 active:scale-[0.98] dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800 sm:w-auto"
                >
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                    />
                  </svg>
                  Download CV
                </a>
              </div>
            </div>

            {/* Social links */}
            <div className="pt-2 sm:pt-4">
              <p className="mb-3 text-sm font-medium text-gray-500 dark:text-gray-400">
                Find me on
              </p>
              <div className="flex flex-wrap gap-2.5 sm:gap-3">
                <a
                  href="https://github.com/Hammad-000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex min-h-11 items-center gap-2 rounded-full bg-white/70 px-3.5 py-2 text-sm font-medium text-gray-700 shadow-sm ring-1 ring-gray-200 backdrop-blur-sm transition-all hover:bg-blue-50 hover:shadow-md active:scale-95 dark:bg-gray-800/70 dark:text-gray-300 dark:ring-gray-700 dark:hover:bg-blue-900/30 sm:px-4 [@media(hover:hover)]:hover:scale-105"
                  aria-label="GitHub"
                >
                  <GitHubIcon />
                  GitHub
                </a>
                <a
                  href="https://x.com/Syed__Hammad"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex min-h-11 items-center gap-2 rounded-full bg-white/70 px-3.5 py-2 text-sm font-medium text-gray-700 shadow-sm ring-1 ring-gray-200 backdrop-blur-sm transition-all hover:bg-blue-50 hover:shadow-md active:scale-95 dark:bg-gray-800/70 dark:text-gray-300 dark:ring-gray-700 dark:hover:bg-blue-900/30 sm:px-4 [@media(hover:hover)]:hover:scale-105"
                  aria-label="X (formerly Twitter)"
                >
                  <XIcon />
                  X
                </a>
                <a
                  href="https://www.linkedin.com/in/syed-hammad-ahmed-412834287/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex min-h-11 items-center gap-2 rounded-full bg-white/70 px-3.5 py-2 text-sm font-medium text-gray-700 shadow-sm ring-1 ring-gray-200 backdrop-blur-sm transition-all hover:bg-blue-50 hover:shadow-md active:scale-95 dark:bg-gray-800/70 dark:text-gray-300 dark:ring-gray-700 dark:hover:bg-blue-900/30 sm:px-4 [@media(hover:hover)]:hover:scale-105"
                  aria-label="LinkedIn"
                >
                  <LinkedInIcon />
                  LinkedIn
                </a>
              </div>
            </div>
          </div>

          {/* Right column: contact form */}
          <div
            ref={formColRef}
            className="reveal-on-scroll opacity-0 transition-all duration-700 ease-out translate-y-6 delay-200"
          >
            <div className="rounded-2xl bg-white/80 p-5 shadow-xl ring-1 ring-black/5 backdrop-blur-md dark:bg-gray-800/80 dark:ring-white/10 sm:p-6 md:p-8">
              <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6" noValidate>
                <div>
                  <label
                    htmlFor="name"
                    className="mb-1.5 block text-sm font-semibold text-gray-700 dark:text-gray-200"
                  >
                    Your name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    autoComplete="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-gray-200 bg-white/50 px-4 py-3 text-base text-gray-900 placeholder-gray-400 transition-all duration-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-900/50 dark:text-white dark:placeholder-gray-500"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-1.5 block text-sm font-semibold text-gray-700 dark:text-gray-200"
                  >
                    Email address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    autoComplete="email"
                    inputMode="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-gray-200 bg-white/50 px-4 py-3 text-base text-gray-900 placeholder-gray-400 transition-all duration-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-900/50 dark:text-white dark:placeholder-gray-500"
                    placeholder="you@example.com"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="mb-1.5 block text-sm font-semibold text-gray-700 dark:text-gray-200"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full resize-none rounded-xl border border-gray-200 bg-white/50 px-4 py-3 text-base text-gray-900 placeholder-gray-400 transition-all duration-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-900/50 dark:text-white dark:placeholder-gray-500"
                    placeholder="Tell me about your project..."
                  />
                </div>

                {formStatus.message && (
                  <div
                    role="status"
                    aria-live="polite"
                    className={`rounded-xl p-4 text-sm font-medium backdrop-blur-sm ${
                      formStatus.type === "success"
                        ? "bg-green-100/80 text-green-800 ring-1 ring-green-500/20 dark:bg-green-900/40 dark:text-green-300"
                        : "bg-red-100/80 text-red-800 ring-1 ring-red-500/20 dark:bg-red-900/40 dark:text-red-300"
                    }`}
                  >
                    {formStatus.message}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={formStatus.loading}
                  aria-busy={formStatus.loading}
                  className="btn-theme w-full disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:scale-100"
                >
                  <span className="contact-pg relative flex items-center justify-center gap-2">
                    {formStatus.loading ? (
                      <>
                        <svg
                          className="h-5 w-5 animate-spin text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <svg
                          className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                          />
                        </svg>
                      </>
                    )}
                  </span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .reveal-on-scroll.is-visible {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </section>
  );
}

export default Contact;