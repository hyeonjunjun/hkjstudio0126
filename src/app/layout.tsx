import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import AtmosphericGrain from "@/components/AtmosphericGrain";

const sans = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ryan Jun | Design Engineer",
  description: "Portfolio of Ryan Jun. Building AI-focused products and design systems.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${sans.variable} ${mono.variable} antialiased bg-background text-foreground`}>
        <AtmosphericGrain />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
