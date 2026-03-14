"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Cursor — SVG Crosshair with Context Labels
 *
 * Design DNA: cathydolle.com pixel crosshair
 *
 * States:
 *   default  → 8px SVG crosshair, mix-blend-difference
 *   link     → 6px crosshair, dimmed
 *   project  → 48px ring, 90deg spring rotation, "open" / "close" label
 *
 * Position: GSAP quickTo (frame-synced)
 * State transitions: Framer Motion (spring physics)
 * Click: Accent terracotta ripple
 */

type CursorState = "default" | "link" | "project";

export default function Cursor() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rippleRef = useRef<HTMLDivElement>(null);
  const posXRef = useRef<ReturnType<typeof gsap.quickTo> | null>(null);
  const posYRef = useRef<ReturnType<typeof gsap.quickTo> | null>(null);

  const [state, setState] = useState<CursorState>("default");
  const [labelText, setLabelText] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);
  const prefersReduced = useReducedMotion();

  // Detect touch vs pointer
  useEffect(() => {
    setIsTouchDevice(!window.matchMedia("(pointer: fine)").matches);
  }, []);

  // Init GSAP quickTo
  useEffect(() => {
    if (isTouchDevice || prefersReduced || !containerRef.current) return;

    posXRef.current = gsap.quickTo(containerRef.current, "x", {
      duration: 0.15,
      ease: "power2.out",
    });
    posYRef.current = gsap.quickTo(containerRef.current, "y", {
      duration: 0.15,
      ease: "power2.out",
    });
  }, [isTouchDevice, prefersReduced]);

  // Resolve cursor state from event target
  const resolveState = useCallback((target: HTMLElement) => {
    const cursorEl = target.closest("[data-cursor]") as HTMLElement | null;
    if (cursorEl) {
      const attr = cursorEl.getAttribute("data-cursor");
      if (attr === "project") {
        setState("project");
        setLabelText("open");
        return;
      }
      if (attr === "close") {
        setState("project");
        setLabelText("close");
        return;
      }
    }

    const interactive = target.closest(
      "a, button, [role='button'], input, textarea, select, label"
    );
    if (interactive) {
      setState("link");
      setLabelText(null);
      return;
    }

    setState("default");
    setLabelText(null);
  }, []);

  // Global listeners
  useEffect(() => {
    if (isTouchDevice || prefersReduced) return;

    const onMove = (e: MouseEvent) => {
      if (!visible) setVisible(true);
      posXRef.current?.(e.clientX);
      posYRef.current?.(e.clientY);
      resolveState(e.target as HTMLElement);
    };

    const onClick = (e: MouseEvent) => {
      const el = rippleRef.current;
      if (!el) return;
      gsap.set(el, { x: e.clientX, y: e.clientY, scale: 0, opacity: 0.5 });
      gsap.to(el, { scale: 2.5, opacity: 0, duration: 0.5, ease: "power2.out" });
    };

    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onClick);
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onClick);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
    };
  }, [isTouchDevice, prefersReduced, visible, resolveState]);

  if (isTouchDevice || prefersReduced) return null;

  const isRing = state === "project";
  const size = isRing ? 48 : state === "link" ? 6 : 8;

  return (
    <>
      {/* Cursor element */}
      <div
        ref={containerRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{ opacity: visible ? 1 : 0, transition: "opacity 0.15s" }}
      >
        <motion.div
          className="flex items-center justify-center"
          style={{
            marginLeft: -size / 2,
            marginTop: -size / 2,
            mixBlendMode: isRing ? "normal" : "difference",
          }}
          animate={{
            width: size,
            height: size,
            rotate: isRing ? 90 : 0,
          }}
          transition={{
            width: { type: "spring", stiffness: 400, damping: 28 },
            height: { type: "spring", stiffness: 400, damping: 28 },
            rotate: { type: "spring", stiffness: 300, damping: 20 },
          }}
        >
          <AnimatePresence mode="wait">
            {!isRing ? (
              /* SVG crosshair */
              <motion.svg
                key="crosshair"
                className="cursor-crosshair absolute inset-0"
                viewBox="0 0 24 24"
                width="100%"
                height="100%"
                initial={{ opacity: 0 }}
                animate={{ opacity: state === "link" ? 0.5 : 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.12 }}
                style={{ color: "#ffffff" }}
              >
                <line x1="0" y1="12" x2="24" y2="12" />
                <line x1="12" y1="0" x2="12" y2="24" />
              </motion.svg>
            ) : (
              /* Ring + label */
              <motion.div
                key="ring"
                className="absolute inset-0 rounded-full flex items-center justify-center"
                style={{
                  border: "1px solid var(--color-text)",
                  backgroundColor: "rgba(245, 241, 237, 0.92)",
                }}
                initial={{ opacity: 0, scale: 0.4 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.4 }}
                transition={{ type: "spring", stiffness: 400, damping: 28 }}
              >
                <AnimatePresence mode="wait">
                  {labelText && (
                    <motion.span
                      key={labelText}
                      className="font-sans select-none"
                      style={{
                        fontSize: "8px",
                        letterSpacing: "0.05em",
                        color: "var(--color-text)",
                        whiteSpace: "nowrap",
                      }}
                      initial={{ opacity: 0, y: 3 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -3 }}
                      transition={{ duration: 0.12 }}
                    >
                      {labelText}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Click ripple */}
      <div
        ref={rippleRef}
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{
          width: 20,
          height: 20,
          marginLeft: -10,
          marginTop: -10,
          borderRadius: "50%",
          backgroundColor: "var(--color-accent)",
          opacity: 0,
        }}
      />
    </>
  );
}
