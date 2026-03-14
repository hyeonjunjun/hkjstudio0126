"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "@/lib/gsap";
import { useStudioStore } from "@/lib/store";
import { PROJECTS } from "@/constants/projects";

/**
 * StudioPreloader — Image Cycling Box
 *
 * Design DNA: ghuynguyen.vercel.app loading box
 *
 * Sequence:
 *   1. Centered box (280×380px) on warm off-white background
 *   2. Project images cycle rapidly inside (~130ms interval)
 *   3. Thin accent progress line + mono counter below box
 *   4. On fonts loaded: cycling stops on first project image
 *   5. Box GSAP-scales to fill viewport (800ms, power3.inOut)
 *   6. Preloader fades out, revealing hero section beneath
 *   7. Sets isLoaded = true
 */

const PROJECT_IMAGES = PROJECTS.map((p) => p.image);

export default function StudioPreloader() {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"loading" | "scaling" | "exit">(
    "loading"
  );
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const setLoaded = useStudioStore((s) => s.setLoaded);

  const boxRef = useRef<HTMLDivElement>(null);
  const cycleRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  // Stop cycling and freeze on first image
  const stopCycling = useCallback(() => {
    if (cycleRef.current) {
      clearInterval(cycleRef.current);
      cycleRef.current = null;
    }
    setCurrentImageIndex(0); // Freeze on first project (hero image)
  }, []);

  // Image cycling interval
  useEffect(() => {
    if (phase !== "loading") return;

    cycleRef.current = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % PROJECT_IMAGES.length);
    }, 130);

    return () => {
      if (cycleRef.current) clearInterval(cycleRef.current);
    };
  }, [phase]);

  // Progress + load sequence
  useEffect(() => {
    const tl = gsap.timeline();
    tlRef.current = tl;
    const proxy = { value: 0 };

    // Phase 1: Quick fill to ~65%
    tl.to(proxy, {
      value: 0.65,
      duration: 1.2,
      ease: "power2.out",
      onUpdate: () => setProgress(proxy.value),
    });

    // Font loading timeout fallback
    const fontTimeout = setTimeout(() => {
      if (proxy.value < 1) {
        tl.to(proxy, {
          value: 1,
          duration: 0.6,
          ease: "power1.inOut",
          onUpdate: () => setProgress(proxy.value),
          onComplete: handleLoadComplete,
        });
      }
    }, 4000);

    // Wait for real font loading
    document.fonts.ready.then(() => {
      clearTimeout(fontTimeout);
      // Phase 2: Fill to 100%
      tl.to(proxy, {
        value: 1,
        duration: 0.8,
        ease: "power1.inOut",
        onUpdate: () => setProgress(proxy.value),
        onComplete: handleLoadComplete,
      });
    });

    function handleLoadComplete() {
      stopCycling();

      // Brief hold, then scale up
      setTimeout(() => {
        setPhase("scaling");

        if (boxRef.current) {
          gsap.to(boxRef.current, {
            width: "100vw",
            height: "100vh",
            borderRadius: 0,
            duration: 0.8,
            ease: "power3.inOut",
            onComplete: () => {
              setPhase("exit");
              // Short delay for fade-out to complete
              setTimeout(() => setLoaded(true), 350);
            },
          });
        }
      }, 300);
    }

    return () => {
      clearTimeout(fontTimeout);
      tl.kill();
    };
  }, [setLoaded, stopCycling]);

  return (
    <AnimatePresence>
      {phase !== "exit" && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[1000] flex flex-col items-center justify-center"
          style={{ backgroundColor: "var(--color-bg)" }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {/* Image cycling box */}
          <div
            ref={boxRef}
            className="relative overflow-hidden"
            style={{
              width: 280,
              height: 380,
              borderRadius: 4,
              backgroundColor: "#ffffff",
            }}
          >
            {PROJECT_IMAGES.map((src, i) => (
              <img
                key={src + i}
                src={src}
                alt=""
                className="absolute inset-0 w-full h-full object-cover"
                style={{
                  opacity: i === currentImageIndex ? 1 : 0,
                  transition:
                    phase === "loading" ? "opacity 0.06s ease" : "none",
                }}
                // Preload all images immediately
                loading="eager"
              />
            ))}
          </div>

          {/* Progress indicator — hidden during scaling */}
          {phase === "loading" && (
            <motion.div
              className="flex flex-col items-center mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Thin accent progress line */}
              <div
                style={{
                  width: 120,
                  height: 1,
                  backgroundColor: "var(--color-border)",
                }}
              >
                <div
                  className="h-full origin-left"
                  style={{
                    backgroundColor: "var(--color-accent)",
                    transform: `scaleX(${progress})`,
                    transition: "transform 0.05s linear",
                  }}
                />
              </div>

              {/* Mono counter */}
              <span
                className="mt-3 font-mono tabular-nums select-none"
                style={{
                  fontSize: "var(--text-micro)",
                  letterSpacing: "0.15em",
                  color: "var(--color-text-ghost)",
                }}
              >
                {String(Math.round(progress * 100)).padStart(3, "0")}
              </span>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
