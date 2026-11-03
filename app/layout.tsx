
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "./src/components/SmoothScroll";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://hammad-nine.vercel.app"),

  title: "Hammad Ahmed | MERN Stack Developer",

  description:
    "Portfolio of Hammad Ahmed, a MERN Stack Developer building modern web applications with React, Next.js, Node.js, Express.js, and MongoDB.",

  icons: {
    icon: "/icon.svg",
  },

  openGraph: {
    title: "Hammad Ahmed | MERN Stack Developer",
    description:
      "Building modern web applications with React, Next.js, Node.js, Express.js, and MongoDB.",
    url: "https://hammad-nine.vercel.app/",
    siteName: "Hammad Portfolio",
    images: [
      {
        url: "/photos/main.png",
        width: 1200,
        height: 630,
        alt: "Hammad Ahmed - MERN Stack Developer Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Hammad Ahmed | MERN Stack Developer",
    description:
      "Building modern web applications with the MERN stack.",
    images: ["/photos/main.png"],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100 transition-colors duration-300">
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
