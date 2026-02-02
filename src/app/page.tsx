"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ArchiveGrid from "@/components/ArchiveGrid";
import StickyFooter from "@/components/StickyFooter";
import Preloader from "@/components/Preloader";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="min-h-screen bg-[#050505] text-[#EDEDED] font-mono selection:bg-[#EDEDED] selection:text-[#050505]">
      <CustomCursor />

      {/* PRELOADER */}
      <AnimatePresence mode="wait">
        {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      {!isLoading && (
        <SmoothScroll>
          {/* GRID LINES BACKGROUND */}
          <div className="fixed inset-0 w-full h-full pointer-events-none z-0 max-w-[1920px] mx-auto border-x border-[#262626] opacity-30">
            <div className="grid grid-cols-12 h-full">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className={`border-r border-[#262626] h-full ${i === 11 ? "border-r-0" : ""}`} />
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <Header />

            {/* CANVAS WRAPPER (z-10) */}
            <main className="relative z-10 w-full flex flex-col bg-[#050505] mb-[100vh]">
              <HeroSection />

              <div id="archive" className="">
                <ArchiveGrid />
              </div>
            </main>

            {/* REVEAL FOOTER (z-0) */}
            <StickyFooter />

          </motion.div>
        </SmoothScroll>
      )}
    </div>
  );
}
