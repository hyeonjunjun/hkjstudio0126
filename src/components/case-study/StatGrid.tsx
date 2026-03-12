"use client";

import { motion } from "framer-motion";
import type { ProjectStat } from "@/constants/projects";

interface StatGridProps {
  stats: ProjectStat[];
}

/**
 * StatGrid — Dashboard-style readout grid for project statistics.
 * Each stat is a monospaced readout cell with a hairline border.
 * Inspired by instrument dashboards and terminal output.
 */
export default function StatGrid({ stats }: StatGridProps) {
  if (!stats || stats.length === 0) return null;

  return (
    <div
      className="grid gap-0"
      style={{
        gridTemplateColumns: `repeat(${Math.min(stats.length, 4)}, 1fr)`,
        border: "1px solid var(--color-border)",
      }}
    >
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          className="flex flex-col justify-between p-6"
          style={{
            borderRight:
              i < stats.length - 1 ? "1px solid var(--color-border)" : "none",
            minHeight: "120px",
          }}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1, duration: 0.5 }}
        >
          {/* Value — large monospace readout */}
          <span
            className="font-mono leading-none"
            style={{
              fontSize: "var(--text-2xl)",
              color: "var(--color-text)",
              letterSpacing: "-0.02em",
            }}
          >
            {stat.value}
          </span>

          {/* Label */}
          <span
            className="micro mt-4"
            style={{ color: "var(--color-text-ghost)" }}
          >
            {stat.label}
          </span>
        </motion.div>
      ))}
    </div>
  );
}
