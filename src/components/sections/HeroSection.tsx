"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { motion } from "framer-motion";
import { useLenis } from "lenis/react";
import NothingEqLoader from "@/components/ui/NothingEqLoader";
import LiveClock from "@/components/ui/LiveClock";
import { useAudioStore } from "@/lib/audioStore";

/* ─── Animation helpers ─── */

const ease = [0.16, 1, 0.3, 1] as const;

function fadeUp(delay: number) {
  return {
    initial: { opacity: 0, y: 14 },
    animate: { opacity: 1, y: 0 },
    transition: { delay, duration: 0.8, ease },
  } as const;
}

function fadeIn(delay: number) {
  return {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { delay, duration: 0.7, ease },
  } as const;
}

/* ─── Nav link config ─── */

interface NavLink {
  label: string;
  target: string;
}

const NAV_LINKS: NavLink[] = [
  { label: "Projects", target: "[data-section='work']" },
  { label: "Exploration", target: "[data-section='exploration']" },
  { label: "Contact", target: "[data-section='contact']" },
];

/* ═══════════════════════════════════════════
   HeroSection — Precision Grid
   Clean monochrome with horizontal nav bar
   ═══════════════════════════════════════════ */

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const lenis = useLenis();
  const { isPlaying, currentTrackName } = useAudioStore();

  /* ── Scroll-driven pin + fade-out ── */

  useGSAP(
    () => {
      if (reduced || !sectionRef.current) return;

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "+=100vh",
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
      });

      gsap.to(".hero-content", {
        yPercent: -8,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=100vh",
          scrub: 1.5,
        },
      });
    },
    { scope: sectionRef },
  );

  /* ── Lenis scroll helper ── */

  const scrollTo = (target: string) => {
    const el = document.querySelector(target) as HTMLElement | null;
    if (el && lenis) {
      lenis.scrollTo(el, { offset: 0, duration: 1.5 });
    }
  };

  /* ── Render ── */

  return (
    <section
      ref={sectionRef}
      data-section="hero"
      className="relative w-full h-screen overflow-hidden"
      style={{ backgroundColor: "var(--color-bg)" }}
    >
      <div
        className="hero-content relative z-10 flex flex-col justify-between h-full w-full"
        style={{ padding: "var(--page-px)" }}
      >
        {/* ═══ TOP BAR — Brand + Horizontal Nav + Clock ═══ */}
        <motion.div
          className="flex items-center justify-between w-full"
          {...fadeIn(0.2)}
        >
          {/* Brand */}
          <motion.div className="flex items-center gap-4" {...fadeUp(0.3)}>
            <h1
              className="font-mono uppercase leading-none"
              style={{
                fontSize: "var(--text-sm)",
                letterSpacing: "0.2em",
                color: "var(--color-text)",
              }}
            >
              HKJ Studio
            </h1>
            <span
              className="hidden sm:inline font-mono uppercase"
              style={{
                fontSize: "var(--text-micro)",
                letterSpacing: "0.15em",
                color: "var(--color-text-ghost)",
              }}
            >
              Design Engineering
            </span>
          </motion.div>

          {/* Nav links — horizontal */}
          <nav className="flex items-center gap-6">
            {NAV_LINKS.map((link, i) => (
              <motion.button
                key={link.label}
                onClick={() => scrollTo(link.target)}
                className="font-mono uppercase transition-colors duration-300 hidden sm:inline-block"
                style={{
                  fontSize: "var(--text-xs)",
                  letterSpacing: "0.12em",
                  color: "var(--color-text-dim)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "var(--color-accent)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "var(--color-text-dim)")
                }
                {...fadeIn(0.4 + i * 0.08)}
              >
                {link.label}
              </motion.button>
            ))}

            {/* Clock */}
            <motion.span
              className="font-mono uppercase"
              style={{
                fontSize: "var(--text-xs)",
                letterSpacing: "0.08em",
                color: "var(--color-text-ghost)",
              }}
              {...fadeIn(0.7)}
            >
              <LiveClock showTimezone />
            </motion.span>
          </nav>
        </motion.div>

        {/* ═══ CENTER — Display Type + EQ ═══ */}
        <div className="flex flex-col items-center justify-center flex-1 w-full">
          
          {/* Massive Display Type */}
          <motion.div 
            className="text-center mb-12 sm:mb-16 pointer-events-none mix-blend-difference"
            {...fadeUp(0.5)}
          >
            <h2 
              className="font-sans font-medium uppercase leading-[0.8] tracking-tighter"
              style={{ 
                fontSize: "clamp(4rem, 12vw, 12rem)",
                color: "var(--color-text)",
              }}
            >
              Design<br />Engineering
            </h2>
          </motion.div>

          {/* Interactive Audio Centerpiece */}
          <motion.div 
            className="flex flex-col items-center gap-6 cursor-pointer group"
            onClick={() => {
              // We dispatch a click to the transport play button to keep logic central
              const playBtn = document.querySelector('button[aria-label="Play"], button[aria-label="Pause"]') as HTMLButtonElement;
              if (playBtn) playBtn.click();
            }}
            {...fadeIn(0.7)}
          >
            {/* The EQ is now the live spectrum */}
            <NothingEqLoader
              bars={11}
              segmentsPerBar={7}
              size={10}
              gap={4}
              mouseReactive
              className="transition-transform duration-500 group-hover:scale-105"
            />
            
            {/* "Press Play" or "Now Playing" prompt */}
            <div className="flex items-center gap-3">
              <span 
                className={`w-2 h-2 rounded-full transition-colors duration-300 ${isPlaying ? 'bg-[var(--color-accent)] animate-pulse' : 'bg-[var(--color-text-dim)]'}`} 
              />
              <span 
                className="font-mono uppercase transition-colors duration-300 group-hover:text-[var(--color-text)]"
                style={{
                  fontSize: "var(--text-micro)",
                  letterSpacing: "0.2em",
                  color: "var(--color-text-ghost)",
                }}
              >
                {isPlaying ? `Now Playing: ${currentTrackName}` : "Press Play"}
              </span>
            </div>
          </motion.div>
        </div>

        {/* ═══ BOTTOM BAR — Coordinates + Scroll Cue ═══ */}
        <motion.div
          className="flex items-end justify-between w-full"
          {...fadeIn(1.0)}
        >
          <span className="micro">40.7128° N, 74.0060° W</span>

          {/* Scroll cue */}
          <motion.div
            animate={{ opacity: [0.15, 0.4, 0.15] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="flex items-center gap-2"
          >
            <span className="micro">Scroll</span>
            <svg
              width="1"
              height="32"
              viewBox="0 0 1 32"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              style={{ color: "var(--color-text-ghost)" }}
            >
              <line x1="0.5" y1="0" x2="0.5" y2="32" />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
