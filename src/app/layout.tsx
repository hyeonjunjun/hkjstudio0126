import type { Metadata } from "next";
import { Instrument_Serif, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import AtmosphericGrain from "@/components/AtmosphericGrain";
import CurtainPreloader from "@/components/CurtainPreloader";
import DynamicIsland from "@/components/DynamicIsland";
import IridescentBackground from "@/components/IridescentBackground";
import CursorDot from "@/components/CursorDot";

/* ─── Typography ─── */

const instrumentSerif = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
});

const geistSans = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist-mono",
});

/* ─── Metadata ─── */

export const metadata: Metadata = {
  title: "Studio Nabi",
  description:
    "Digital Naturalism — Portfolio of Ryan Jun. Design engineering at the intersection of craft and code.",
};

/* ─── Root Layout ─── */

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${instrumentSerif.variable} ${geistSans.variable} ${geistMono.variable} antialiased bg-canvas text-ink`}
      >
        <CurtainPreloader />
        <IridescentBackground />
        <AtmosphericGrain />
        <DynamicIsland />
        <CursorDot />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
