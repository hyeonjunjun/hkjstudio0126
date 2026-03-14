"use client";

import { motion } from "framer-motion";
import { useStudioStore } from "@/lib/store";
import type { ViewMode } from "@/lib/store";

/**
 * ViewModeToggle — Hold-Snap-Hold Pill Toggle
 *
 * Design DNA: Cathy Dolle's 1.75s animated toggle
 *
 * Fixed bottom-right, pill-shaped container.
 * Framer Motion layoutId pill slides between "list" and "grid".
 * Easing: cubic-bezier(.86, 0, .07, 1) — slow start, fast snap, slow end.
 * All colors via CSS variables.
 */

const MODES: { key: ViewMode; label: string }[] = [
  { key: "list", label: "list" },
  { key: "grid", label: "grid" },
];

const pillTransition = {
  layout: {
    duration: 0.6,
    ease: [0.86, 0, 0.07, 1] as [number, number, number, number],
  },
};

export default function ViewModeToggle() {
  const viewMode = useStudioStore((s) => s.viewMode);
  const setViewMode = useStudioStore((s) => s.setViewMode);

  return (
    <div
      className="fixed z-40 flex items-center gap-0 rounded-full overflow-hidden"
      style={{
        bottom: 24,
        right: "var(--page-px)",
        backgroundColor: "var(--color-surface)",
        backdropFilter: "blur(12px)",
        border: "1px solid var(--color-border)",
        padding: "3px",
      }}
    >
      {MODES.map((mode) => {
        const isActive = viewMode === mode.key;

        return (
          <button
            key={mode.key}
            onClick={() => setViewMode(mode.key)}
            className="relative font-mono select-none cursor-pointer"
            style={{
              fontSize: "var(--text-micro)",
              letterSpacing: "0.1em",
              padding: "6px 14px",
              color: isActive ? "var(--color-bg)" : "var(--color-text-ghost)",
              transition: "color 0.3s ease",
              zIndex: 1,
            }}
          >
            {/* Sliding pill background */}
            {isActive && (
              <motion.span
                layoutId="view-toggle-pill"
                className="absolute inset-0 rounded-full"
                style={{ backgroundColor: "var(--color-text)" }}
                transition={pillTransition}
              />
            )}

            {/* Label */}
            <span className="relative z-10">{mode.label}</span>
          </button>
        );
      })}
    </div>
  );
}
