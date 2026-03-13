"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

/**
 * HeroSection — 1-1 Jonite.com Recreation (Refined from Screenshot)
 * 
 * Specs:
 * - Background: #e6e7e8
 * - Headline: 26.67px Sans-serif (Inter/Satoshi)
 * - Metadata: Monospace labels and dual clocks
 * - Media: Gray placeholders as requested, specific staggered layout
 */

function LiveClock({ timezone, city, phone }: { timezone: string; city: string; phone: string }) {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      setTime(
        new Intl.DateTimeFormat("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
          timeZone: timezone,
        }).format(new Date()).replace(/:/g, " : ")
      );
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [timezone]);

  return (
    <div className="flex flex-col gap-1 items-start min-w-[120px]">
      <span className="font-mono text-[9px] uppercase tracking-[0.2em] opacity-80">{city}</span>
      <span className="font-mono text-[13px] tabular-nums font-medium">{time}</span>
      <span className="font-mono text-[10px] opacity-60">{phone}</span>
    </div>
  );
}

export default function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col"
      style={{ backgroundColor: "#e6e7e8", color: "#1a1a1a" }}
    >
      {/* Structural Offset for fixed Nav */}
      <div className="h-[120px]" />

      <div 
        className="flex-1 grid grid-cols-1 lg:grid-cols-2"
        style={{ 
          paddingLeft: "var(--page-px)", 
          paddingRight: "var(--page-px)",
          paddingBottom: "80px"
        }}
      >
        {/* Left Side Content Area */}
        <div className="flex flex-col">
          {/* Headline Area (Aligned to specific grid row) */}
          <div className="flex-1 flex flex-col justify-center">
            <div className="max-w-[80%] ml-auto mr-[15%]">
               <h1 
                className="font-sans font-normal"
                style={{ 
                    fontSize: "26.67px", 
                    lineHeight: "1.3",
                    letterSpacing: "-0.01em",
                    fontFamily: "var(--font-satoshi), sans-serif"
                }}
               >
                 Decorative stone grating<br />
                 for modern urban living.
               </h1>
            </div>
          </div>

          {/* Metadata Area */}
          <div className="flex flex-col gap-16 pb-12">
            <div className="flex items-start gap-24">
               <LiveClock city="UNITED STATES" timezone="America/New_York" phone="+1 484 224 2972" />
               <LiveClock city="SINGAPORE" timezone="Asia/Singapore" phone="+65 6383 3788" />
               
               <div className="flex flex-col gap-1 items-start mt-auto">
                 <span className="font-mono text-[10px] uppercase tracking-[0.1em] font-medium">EST. 1994</span>
               </div>
            </div>

            {/* Large Horizontal Placeholder */}
            <div className="w-[90%] aspect-[16/9] bg-neutral-300 overflow-hidden relative group">
                {/* Simulated Content */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-10 transition-opacity">
                    <span className="font-mono text-[10px] uppercase">Media Placeholder</span>
                </div>
            </div>
          </div>
        </div>

        {/* Right Side Content Area */}
        <div className="pl-12">
          {/* Large Vertical Placeholder */}
          <div className="w-full h-full min-h-[600px] bg-neutral-300 overflow-hidden relative group">
              {/* Simulated Content */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-10 transition-opacity">
                  <span className="font-mono text-[10px] uppercase">Media Placeholder</span>
              </div>
          </div>
        </div>
      </div>
    </section>
  );
}
