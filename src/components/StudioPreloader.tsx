"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useStudioStore } from "@/lib/store";

/**
 * StudioPreloader — 1-1 Voku.studio Recreation
 * 
 * Specs:
 * - Font: Archivo, 21.33px
 * - Content: Vertical text cycle
 * - Motion: clip-path polygon masks for vertical revealing
 * - Progress: Horizontal scaleX bar
 * - Layout: Large center word, Bottom technical metadata
 */

const PHRASES = ["Design Engineering", "Systems Thinking", "NYC / Seoul", "HKJ Studio"];

export default function StudioPreloader() {
  const [index, setIndex] = useState(0);
  const [complete, setComplete] = useState(false);
  const setLoaded = useStudioStore((s) => s.setLoaded);

  useEffect(() => {
    if (index < PHRASES.length - 1) {
      const timer = setTimeout(() => setIndex(index + 1), 700);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setComplete(true);
        setTimeout(() => setLoaded(true), 800);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [index, setLoaded]);

  return (
    <AnimatePresence>
      {!complete && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
          }}
          className="fixed inset-0 z-[1000] flex flex-col items-center justify-center bg-[#F7F3ED] font-archivo"
          style={{ cursor: "wait" }}
        >
          {/* Progress Bar Top */}
          <div className="absolute top-0 left-0 w-full h-[2px] bg-black/5">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: (index + 1) / PHRASES.length }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
              className="h-full bg-black origin-left"
            />
          </div>

          {/* Cycling Text */}
          <div className="relative h-[1.5em] overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.span
                key={PHRASES[index]}
                initial={{ y: "100%", clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" }}
                animate={{ y: "0%", clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
                exit={{ y: "-100%", clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)" }}
                transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
                className="block text-black font-medium leading-none"
                style={{ fontSize: "21.33px" }}
              >
                {PHRASES[index]}
              </motion.span>
            </AnimatePresence>
          </div>

          {/* Bottom Metadata */}
          <div className="absolute bottom-10 left-10 right-10 flex justify-between items-end font-mono text-[9px] uppercase tracking-[0.2em] text-black/40">
            <div className="flex flex-col gap-1">
              <span>Initializing Studio Module</span>
              <span className="text-black/20">Phase: Loading.{index + 1}</span>
            </div>
            <div>
              <span>HKJ/S24</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
