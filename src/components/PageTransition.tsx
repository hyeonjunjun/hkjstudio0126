"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useStudioStore } from "@/lib/store";

export default function PageTransition() {
  const router = useRouter();
  const pathname = usePathname();
  const { isTransitioning, pendingRoute, endTransition } = useStudioStore();
  const [phase, setPhase] = useState<"idle" | "entering" | "exiting">("idle");
  const prevPathname = useRef(pathname);

  // Check reduced motion preference (SSR-safe)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  useEffect(() => {
    setPrefersReducedMotion(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }, []);

  // Phase 1: Overlay enters
  useEffect(() => {
    if (isTransitioning && pendingRoute) {
      if (prefersReducedMotion) {
        router.push(pendingRoute);
        return;
      }
      setPhase("entering");
      const timer = setTimeout(() => {
        router.push(pendingRoute);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [isTransitioning, pendingRoute, router, prefersReducedMotion]);

  // Phase 2: Route changed, overlay exits
  useEffect(() => {
    if (pathname !== prevPathname.current) {
      prevPathname.current = pathname;
      if (isTransitioning) {
        if (prefersReducedMotion) {
          endTransition();
          return;
        }
        setPhase("exiting");
        const timer = setTimeout(() => {
          setPhase("idle");
          endTransition();
        }, 600);
        return () => clearTimeout(timer);
      }
    }
  }, [pathname, isTransitioning, endTransition, prefersReducedMotion]);

  if (phase === "idle" && !isTransitioning) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9000,
        backgroundColor: "var(--color-bg)",
        opacity: phase === "entering" ? 1 : phase === "exiting" ? 0 : 0,
        transition: `opacity 600ms cubic-bezier(0.86, 0, 0.07, 1)`,
        pointerEvents: isTransitioning ? "all" : "none",
      }}
    />
  );
}
