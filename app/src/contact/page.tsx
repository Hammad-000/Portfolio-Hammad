"use client";

import React from 'react'
import { useState } from "react";
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
                message: error instanceof Error ? error.message : "Something went wrong. Please try again.",
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
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
        </svg>
    );

    const TwitterIcon = () => (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
        </svg>
    );

    const LinkedInIcon = () => (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
        </svg>
    );

    return (
        <section id="contact" className="relative bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800/80 dark:to-gray-900 overflow-hidden">
            {/* Animated background blobs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-32 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-10 animate-pulse"></div>
                <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-10 animate-pulse delay-1000"></div>
            </div>

            <div className="relative mx-auto max-w-6xl px-4 py-16 md:py-24 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start">
                    {/* Left Column - Intro & Socials */}
                    <div className="space-y-6 animate-on-scroll opacity-0 translate-y-6 transition-all duration-700 ease-out">
                        <div className="inline-flex items-center rounded-full bg-blue-100/80 dark:bg-blue-900/40 px-3 py-1 text-sm font-medium text-blue-800 dark:text-blue-200 backdrop-blur-sm">
                            <span className="relative flex h-2 w-2 mr-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                            </span>
                            Available for work
                        </div>

                        <h2 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
                            Let's create something <br /> extraordinary
                        </h2>

                        <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                            Got a project in mind? I'm just one message away. Whether it's a new website,
                            a creative collaboration, or just a friendly chat — let's turn ideas into reality.
                        </p>

                        {/* Contact Details & Fixed CV Download */}
                        <div className="pt-4 space-y-4">
                            <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center">
                                    <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <span className="text-base sm:text-lg break-all">syedhammadahmed121@gmail.com</span>
                            </div>
                            
                            <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center">
                                    <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
                                <span className="text-base sm:text-lg">Karachi, Pakistan</span>
                            </div>

                            <div className="pt-2">
                                <a 
                                    href="/cv/Hammad_Ahmed_Resume.pdf" 
                                    download="My_CV.pdf"
                                    className="inline-flex items-center justify-center gap-2 rounded-xl btn-theme px-5 py-3 text-sm font-semibold text-white shadow-md shadow-blue-500/20 transition-all hover:bg-blue-700 hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                                    </svg>
                                    Download CV
                                </a>
                            </div>
                        </div>

                        {/* Social Links */}
                        <div className="pt-4">
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">Find me on</p>
                            <div className="flex flex-wrap gap-3">
                                <a
                                    href="https://github.com/Hammad-000"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex items-center gap-2 rounded-full bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 shadow-sm ring-1 ring-gray-200 dark:ring-gray-700 transition-all hover:scale-105 hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:shadow-md"
                                    aria-label="GitHub"
                            >
                                    <GitHubIcon />
                                    GitHub
                                </a>
                                <a
                                    href="https://x.com/Syed__Hammad"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex items-center gap-2 rounded-full bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 shadow-sm ring-1 ring-gray-200 dark:ring-gray-700 transition-all hover:scale-105 hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:shadow-md"
                                    aria-label="Twitter"
                                >
                                    <TwitterIcon />
                                    Twitter
                                </a>
                                <a
                                    href="https://www.linkedin.com/in/syed-hammad-ahmed-412834287/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex items-center gap-2 rounded-full bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 shadow-sm ring-1 ring-gray-200 dark:ring-gray-700 transition-all hover:scale-105 hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:shadow-md"
                                    aria-label="LinkedIn"
                                >
                                    <LinkedInIcon />
                                    LinkedIn
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Contact Form */}
                    <div className="animate-on-scroll opacity-0 translate-y-6 transition-all duration-700 delay-200 ease-out">
                        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-xl p-6 md:p-8 ring-1 ring-black/5 dark:ring-white/10">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="name" className="mb-1.5 block text-sm font-semibold text-gray-700 dark:text-gray-200">
                                        Your name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-900/50 px-4 py-3 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                                        placeholder="John Doe"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email" className="mb-1.5 block text-sm font-semibold text-gray-700 dark:text-gray-200">
                                        Email address
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-900/50 px-4 py-3 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                                        placeholder="you@example.com"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="message" className="mb-1.5 block text-sm font-semibold text-gray-700 dark:text-gray-200">
                                        Message
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        required
                                        rows={5}
                                        value={formData.message}
                                        onChange={handleChange}
                                        className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-900/50 px-4 py-3 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 resize-none"
                                        placeholder="Tell me about your project..."
                                    />
                                </div>

                                {formStatus.message && (
                                    <div
                                        className={`rounded-xl p-4 text-sm font-medium backdrop-blur-sm ${formStatus.type === "success"
                                                ? "bg-green-100/80 text-green-800 dark:bg-green-900/40 dark:text-green-300 ring-1 ring-green-500/20"
                                                : "bg-red-100/80 text-red-800 dark:bg-red-900/40 dark:text-red-300 ring-1 ring-red-500/20"
                                            }`}
                                    >
                                        {formStatus.message}
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={formStatus.loading}
                                    className="btn-theme w-full disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:scale-100">
                                    <span className=" contact-pg relative flex items-center justify-center gap-2">
                                        {formStatus.loading ? (
                                            <>
                                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Sending...
                                            </>
                                        ) : (
                                            <>
                                                Send Message
                                                <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
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
        </section>
    )
}

export default Contact