"use client";

import { useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { PROJECTS } from "@/constants/projects";
import TransitionLink from "@/components/TransitionLink";

const activeProjects = PROJECTS.filter((p) => !p.wip);

export default function HomepageList() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = useCallback((i: number) => setHoveredIndex(i), []);
  const handleMouseLeave = useCallback(() => setHoveredIndex(null), []);

  return (
    <motion.div
      ref={listRef}
      className="flex flex-col justify-center items-center"
      style={{
        height: "100dvh",
        padding: "var(--page-px)",
        paddingTop: "80px",
        paddingBottom: "80px",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="w-full max-w-[900px] flex flex-col" style={{ gap: "28px" }}>
        {activeProjects.map((project, i) => {
          const isHovered = hoveredIndex === i;
          const isFaded = hoveredIndex !== null && !isHovered;

          return (
            <TransitionLink
              key={project.id}
              href={`/work/${project.id}`}
              aria-label={`Project ${i + 1}: ${project.title}, ${project.year}`}
              className="flex justify-between items-baseline font-mono uppercase tracking-[0.05em] transition-opacity"
              style={{
                fontSize: "var(--text-micro)",
                color: "var(--color-text)",
                opacity: isFaded ? 0.3 : 1,
                transitionDuration: "200ms",
                transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
              }}
              onMouseEnter={() => handleMouseEnter(i)}
              onMouseLeave={handleMouseLeave}
            >
              {/* Left: number + title */}
              <span className="flex gap-4">
                <span
                  className="inline-block"
                  style={{
                    width: "2ch",
                    color: "var(--color-text-ghost)",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>{project.title}</span>
              </span>

              {/* Right: sector + year */}
              <span className="flex gap-6">
                <span
                  className="hidden md:inline"
                  style={{ color: "var(--color-text-ghost)" }}
                >
                  {project.tags.slice(0, 2).join(" · ")}
                </span>
                <span style={{ color: "var(--color-text-ghost)" }}>
                  {project.year}
                </span>
              </span>
            </TransitionLink>
          );
        })}
      </div>
    </motion.div>
  );
}
