"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * SelectedWork — 1-1 Radiance Recreation
 * 
 * Specs:
 * - Layout: Staggered masonry-like 2-column grid
 * - Gaps: Exact 24px column/row gap
 * - Padding: 0px 24px 56px (via style)
 * - Typography: 12px Mono numbering, 14px Descriptors
 * - Labels: Absolute positioned bottom-left overlay
 * - Interactions: Blur/Brightness adjust on sibling hover (pro-level polish)
 */

const PROJECTS = [
  {
    id: "sift",
    number: "(01)",
    title: "Sift",
    description: "Digital Sanctuary for restless minds.",
    image: "/images/sift-v2.jpg",
    aspect: "aspect-[4/5]",
  },
  {
    id: "verbaaitim",
    number: "(02)",
    title: "VerbAItim",
    description: "LLM Orchestration platform.",
    image: "/images/verbaaitim.jpg",
    aspect: "aspect-square",
  },
  {
    id: "gyeol",
    number: "(03)",
    title: "Gyeol",
    description: "3D Fragrance Visualization.",
    image: "/images/gyeol-placeholder.jpg",
    aspect: "aspect-square",
  },
  {
    id: "nabi",
    number: "(04)",
    title: "Nabi",
    description: "Editorial Systems.",
    image: "/images/nabi.jpg",
    aspect: "aspect-[4/5]",
  },
];

export default function SelectedWork() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section 
      id="work"
      className="bg-white"
      style={{ 
        paddingLeft: "24px", 
        paddingRight: "24px", 
        paddingBottom: "56px",
        paddingTop: "120px" 
      }}
    >
      {/* Header Label */}
      <div className="mb-12">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] opacity-40">
           Index / Selected Work
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: "24px" }}>
        {PROJECTS.map((project, idx) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className={`relative group cursor-pointer ${project.aspect} overflow-hidden`}
            onMouseEnter={() => setHoveredId(project.id)}
            onMouseLeave={() => setHoveredId(null)}
            style={{
              transition: "filter 0.5s ease, opacity 0.5s ease",
              filter: hoveredId && hoveredId !== project.id ? "blur(4px) brightness(0.7)" : "none",
              opacity: hoveredId && hoveredId !== project.id ? 0.6 : 1
            }}
          >
             {/* Main Image */}
             <motion.img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-[1.2s] ease-[0.16, 1, 0.3, 1] group-hover:scale-110"
             />

             {/* 1-1 Labels */}
             <div className="absolute inset-0 p-6 flex flex-col justify-end pointer-events-none">
                <div className="flex flex-col gap-0.5 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-[0.16, 1, 0.3, 1]">
                    <span 
                      className="font-mono text-white" 
                      style={{ fontSize: "12px" }}
                    >
                      {project.number}
                    </span>
                    <span 
                      className="font-sans font-medium text-white" 
                      style={{ fontSize: "14px" }}
                    >
                      {project.title} — {project.description}
                    </span>
                </div>
             </div>

             {/* Gradient Scrim */}
             <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
