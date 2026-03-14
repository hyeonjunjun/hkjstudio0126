"use client";

import { useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useStudioStore } from "@/lib/store";

/**
 * AboutOverlay — Editorial Magazine Layout
 *
 * Design DNA: Felix Nieto editorial warmth + Prototype Studio inline contrast
 *
 * Structure:
 *   Full-screen overlay, clipPath entrance from top
 *   Top bar: "about" micro label + "close"
 *   Left: Large serif italic editorial paragraph + sans body copy
 *   Right: "capabilities" micro label + vertical list with hairline dividers
 *
 * Animation: Framer Motion variants with custom stagger index
 */

const CAPABILITIES = [
  "Design Systems",
  "React / Next.js",
  "React Native",
  "Motion Design",
  "Prototyping",
  "AI Integration",
  "Brand Identity",
  "Systems Thinking",
];

const panelEase = [0.76, 0, 0.24, 1] as [number, number, number, number];
const contentEase = [0.16, 1, 0.3, 1] as [number, number, number, number];

const overlayVariants = {
  hidden: { clipPath: "inset(0 0 100% 0)" },
  visible: {
    clipPath: "inset(0 0 0% 0)",
    transition: { duration: 0.6, ease: panelEase },
  },
  exit: {
    clipPath: "inset(0 0 100% 0)",
    transition: { duration: 0.45, ease: panelEase },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.2 + i * 0.05,
      duration: 0.7,
      ease: contentEase,
    },
  }),
  exit: {
    opacity: 0,
    y: -8,
    transition: { duration: 0.12 },
  },
};

export default function AboutOverlay() {
  const activeOverlay = useStudioStore((s) => s.activeOverlay);
  const setActiveOverlay = useStudioStore((s) => s.setActiveOverlay);
  const isOpen = activeOverlay === "about";

  const handleClose = useCallback(() => {
    setActiveOverlay(null);
  }, [setActiveOverlay]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="about-overlay"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 z-[60] overflow-y-auto"
          style={{ backgroundColor: "var(--color-bg)" }}
        >
          {/* Top bar */}
          <div
            className="sticky top-0 z-10 flex items-center justify-between"
            style={{
              padding: "clamp(1rem, 2.5vh, 1.75rem) var(--page-px)",
              backgroundColor: "var(--color-bg)",
            }}
          >
            <span
              className="font-mono"
              style={{
                fontSize: "var(--text-micro)",
                letterSpacing: "0.15em",
                color: "var(--color-text-ghost)",
              }}
            >
              about
            </span>
            <button
              onClick={handleClose}
              data-cursor="close"
              className="font-sans"
              style={{
                fontSize: "var(--text-xs)",
                color: "var(--color-text-secondary)",
                letterSpacing: "0.02em",
              }}
              aria-label="Close about panel"
            >
              close
            </button>
          </div>

          {/* Content */}
          <div
            style={{
              padding: "clamp(4rem, 10vh, 8rem) var(--page-px) var(--section-py)",
            }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 max-w-[1200px] mx-auto">
              {/* Left — Editorial */}
              <div>
                <motion.p
                  custom={0}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="font-serif italic"
                  style={{
                    fontSize: "clamp(1.5rem, 1.2rem + 1.2vw, 2.5rem)",
                    lineHeight: 1.35,
                    letterSpacing: "-0.01em",
                    color: "var(--color-text)",
                  }}
                >
                  HKJ Studio is one designer-engineer building software
                  that feels like a precision instrument. Every interface
                  is an opportunity to create calm in complexity.
                </motion.p>

                <motion.p
                  custom={1}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="font-sans mt-10"
                  style={{
                    fontSize: "var(--text-sm)",
                    lineHeight: 1.7,
                    color: "var(--color-text-secondary)",
                    maxWidth: 480,
                  }}
                >
                  Founded in NYC and Seoul, the studio specializes in the
                  space between design and engineering — where Figma files
                  become React components and every 4px matters.
                </motion.p>
              </div>

              {/* Right — Capabilities */}
              <div>
                <motion.span
                  custom={2}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="font-mono block mb-8"
                  style={{
                    fontSize: "var(--text-micro)",
                    letterSpacing: "0.15em",
                    color: "var(--color-text-ghost)",
                  }}
                >
                  capabilities
                </motion.span>

                <ul style={{ borderTop: "1px solid var(--color-border)" }}>
                  {CAPABILITIES.map((cap, i) => (
                    <motion.li
                      key={cap}
                      custom={3 + i}
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="py-4"
                      style={{ borderBottom: "1px solid var(--color-border)" }}
                    >
                      <span
                        className="font-sans font-medium"
                        style={{
                          fontSize: "var(--text-sm)",
                          color: "var(--color-text)",
                        }}
                      >
                        {cap}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
