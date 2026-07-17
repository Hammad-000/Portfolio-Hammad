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

// Type: Metadata enforce kiya hai and OG Image URL absolute set ki hai
export const metadata: Metadata = {
  title: "Syed Hammad Ahmed | Frontend Developer",
  description: "Portfolio of a passionate frontend developer specializing in React, Next.js, and delightful user experiences.",
  openGraph: {
    title: "Syed Hammad Ahmed Portfolio",
    description: "Turning ideas into real, functional web products.",
    url: "https://hammad-nine.vercel.app/",
    siteName: "Hammad Portfolio",
    images: [
      {
        // Social networks absolute URL hi demand karte hain (Relative paths like ./ broken ho jate hain)
        url: "https://hammad-nine.vercel.app/photos/main.png", 
        width: 1200,
        height: 630,
        alt: "Syed Hammad Ahmed Portfolio Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Syed Hammad Ahmed | Frontend Developer",
    description: "Turning ideas into real, functional web products.",
    images: ["https://hammad-nine.vercel.app/photos/main.png"],
  }
};

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