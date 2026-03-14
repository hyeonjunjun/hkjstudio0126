"use client";

import { useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useStudioStore } from "@/lib/store";
import { SOCIALS, CONTACT_EMAIL } from "@/constants/contact";
import MagneticButton from "@/components/ui/MagneticButton";

/**
 * ContactOverlay — Hero CTA with Mixed-Font Typography
 *
 * Design DNA: Prototype Studio "Let's work together" + Ledger 80/20 color rule
 *
 * Structure:
 *   Dark background (inverted -- near-black)
 *   Top bar: "contact" micro + "close"
 *   Hero CTA: "let's" (sans uppercase, cream) + "work together." (serif italic, accent)
 *   Email mailto with MagneticButton hover
 *   Info grid: location / email / social / status
 *   Footer: copyright + location
 *
 * All white-on-dark colors use rgba(255,255,255,X) consistently.
 * Status dot uses --color-accent (not hardcoded green).
 * Shared constants for socials/email.
 */

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
      delay: 0.2 + i * 0.06,
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

export default function ContactOverlay() {
  const activeOverlay = useStudioStore((s) => s.activeOverlay);
  const setActiveOverlay = useStudioStore((s) => s.setActiveOverlay);
  const isOpen = activeOverlay === "contact";

  const handleClose = useCallback(() => {
    setActiveOverlay(null);
  }, [setActiveOverlay]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="contact-overlay"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 z-[60] overflow-y-auto"
          style={{ backgroundColor: "var(--color-text)" }}
        >
          {/* Top bar */}
          <div
            className="sticky top-0 z-10 flex items-center justify-between"
            style={{
              padding: "clamp(1rem, 2.5vh, 1.75rem) var(--page-px)",
              backgroundColor: "var(--color-text)",
            }}
          >
            <span
              className="font-mono"
              style={{
                fontSize: "var(--text-micro)",
                letterSpacing: "0.15em",
                color: "rgba(255, 255, 255, 0.3)",
              }}
            >
              contact
            </span>
            <button
              onClick={handleClose}
              data-cursor="close"
              className="font-sans"
              style={{
                fontSize: "var(--text-xs)",
                color: "rgba(255, 255, 255, 0.5)",
                letterSpacing: "0.02em",
              }}
              aria-label="Close contact panel"
            >
              close
            </button>
          </div>

          {/* Content */}
          <div
            className="flex flex-col justify-between"
            style={{
              minHeight: "calc(100vh - 60px)",
              padding: "clamp(4rem, 10vh, 8rem) var(--page-px) var(--section-py)",
            }}
          >
            {/* Hero CTA */}
            <div>
              <motion.div
                custom={0}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="flex items-center justify-between mb-16"
              >
                <span
                  className="font-mono"
                  style={{
                    fontSize: "var(--text-micro)",
                    letterSpacing: "0.12em",
                    color: "rgba(255, 255, 255, 0.3)",
                  }}
                >
                  get in touch
                </span>
                <span
                  className="font-mono"
                  style={{
                    fontSize: "var(--text-micro)",
                    letterSpacing: "0.12em",
                    color: "rgba(255, 255, 255, 0.3)",
                  }}
                >
                  open to new projects
                </span>
              </motion.div>

              <a href={`mailto:${CONTACT_EMAIL}`} className="group block headline-mixed">
                <motion.span
                  custom={1}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="font-sans font-medium uppercase block"
                  style={{
                    fontSize: "clamp(2.5rem, 8vw, 8rem)",
                    lineHeight: 1,
                    letterSpacing: "-0.02em",
                    color: "var(--color-bg)",
                  }}
                >
                  let&apos;s
                </motion.span>
                <motion.span
                  custom={2}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="font-serif italic block"
                  style={{
                    fontSize: "clamp(2.5rem, 8vw, 8rem)",
                    lineHeight: 1,
                    letterSpacing: "-0.02em",
                    color: "var(--color-accent)",
                  }}
                >
                  work together.
                </motion.span>

                <motion.span
                  custom={3}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="font-mono block mt-6 group-hover:translate-x-2"
                  style={{
                    fontSize: "var(--text-xs)",
                    color: "rgba(255, 255, 255, 0.4)",
                    letterSpacing: "0.02em",
                    transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                >
                  {CONTACT_EMAIL} &rarr;
                </motion.span>
              </a>
            </div>

            {/* Info grid + footer */}
            <div>
              {/* Divider */}
              <motion.div
                custom={4}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="mb-12"
                style={{
                  height: 1,
                  backgroundColor: "rgba(255, 255, 255, 0.08)",
                }}
              />

              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6">
                {/* Location */}
                <motion.div
                  custom={5}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <span
                    className="font-mono block mb-3"
                    style={{
                      fontSize: "var(--text-micro)",
                      letterSpacing: "0.12em",
                      color: "rgba(255, 255, 255, 0.25)",
                    }}
                  >
                    location
                  </span>
                  <span
                    className="font-sans font-medium block"
                    style={{
                      fontSize: "var(--text-sm)",
                      color: "rgba(255, 255, 255, 0.7)",
                    }}
                  >
                    NYC / Seoul
                  </span>
                </motion.div>

                {/* Email */}
                <motion.div
                  custom={6}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <span
                    className="font-mono block mb-3"
                    style={{
                      fontSize: "var(--text-micro)",
                      letterSpacing: "0.12em",
                      color: "rgba(255, 255, 255, 0.25)",
                    }}
                  >
                    email
                  </span>
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="font-sans font-medium block hover:text-white transition-colors duration-300"
                    style={{
                      fontSize: "var(--text-sm)",
                      color: "rgba(255, 255, 255, 0.7)",
                    }}
                  >
                    {CONTACT_EMAIL}
                  </a>
                </motion.div>

                {/* Socials */}
                <motion.div
                  custom={7}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <span
                    className="font-mono block mb-3"
                    style={{
                      fontSize: "var(--text-micro)",
                      letterSpacing: "0.12em",
                      color: "rgba(255, 255, 255, 0.25)",
                    }}
                  >
                    social
                  </span>
                  <div className="flex flex-col gap-1.5">
                    {SOCIALS.map((s) => (
                      <a
                        key={s.label}
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-sans font-medium hover:text-white transition-colors duration-300"
                        style={{
                          fontSize: "var(--text-sm)",
                          color: "rgba(255, 255, 255, 0.7)",
                        }}
                      >
                        {s.label}
                      </a>
                    ))}
                  </div>
                </motion.div>

                {/* Status */}
                <motion.div
                  custom={8}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <span
                    className="font-mono block mb-3"
                    style={{
                      fontSize: "var(--text-micro)",
                      letterSpacing: "0.12em",
                      color: "rgba(255, 255, 255, 0.25)",
                    }}
                  >
                    status
                  </span>
                  <div className="flex items-center gap-2">
                    <span
                      className="rounded-full flex-shrink-0"
                      style={{
                        width: 6,
                        height: 6,
                        backgroundColor: "var(--color-accent)",
                      }}
                    />
                    <span
                      className="font-sans font-medium"
                      style={{
                        fontSize: "var(--text-sm)",
                        color: "rgba(255, 255, 255, 0.7)",
                      }}
                    >
                      Open to work
                    </span>
                  </div>
                </motion.div>
              </div>

              {/* Footer */}
              <motion.div
                custom={9}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="mt-16 flex items-center justify-between"
              >
                <span
                  className="font-mono"
                  style={{
                    fontSize: "var(--text-micro)",
                    letterSpacing: "0.1em",
                    color: "rgba(255, 255, 255, 0.2)",
                  }}
                >
                  &copy; {new Date().getFullYear()} hkj studio
                </span>
                <span
                  className="font-mono"
                  style={{
                    fontSize: "var(--text-micro)",
                    letterSpacing: "0.1em",
                    color: "rgba(255, 255, 255, 0.2)",
                  }}
                >
                  nyc &amp; seoul
                </span>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
