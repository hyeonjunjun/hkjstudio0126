"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const projects = [
    {
        id: "01",
        title: "Sift Mobile",
        category: "Mobile App",
        year: "2024",
        src: "/sift_mobile.png", // Ensure these exist or use placeholders
        description: "Curating digital noise into signals.",
        href: "#"
    },
    {
        id: "02",
        title: "Antigravity",
        category: "Design System",
        year: "2024",
        src: "/antigravity.png",
        description: "A physics-based interaction language.",
        href: "#"
    },
    {
        id: "03",
        title: "Luma Interface",
        category: "Web Platform",
        year: "2023",
        src: "/luma.png",
        description: "Reimagining light on the web.",
        href: "#"
    },
    {
        id: "04",
        title: "Mono/Poly",
        category: "Experiment",
        year: "2023",
        src: "/mono.png",
        description: "Audiovisual synthesis engine.",
        href: "#"
    }
];

export default function Projects() {
    const [hoveredProject, setHoveredProject] = useState<string | null>(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const listRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent) => {
        // Calculate position relative to the list container for bounds, 
        // but for fixed positioning we might want viewport? 
        // Let's use fixed viewport positioning for the image to follow cursor freely.
        setMousePos({ x: e.clientX, y: e.clientY });
    };

    return (
        <div
            ref={listRef}
            className="w-full relative"
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setHoveredProject(null)}
        >
            <ul className="flex flex-col">
                {projects.map((project) => (
                    <li key={project.id} className="group relative">
                        <Link
                            href={project.href}
                            className="flex items-baseline justify-between py-6 border-b border-[#E7E5E4] transition-all duration-300 hover:pl-4 hover:pr-4 hover:bg-[#F5F5F4]/50 rounded-lg"
                            onMouseEnter={() => setHoveredProject(project.id)}
                        >
                            {/* Left: Title & Category */}
                            <div className="flex items-baseline gap-4 md:gap-8">
                                <span className="font-mono text-xs text-[#A8A29E] w-6">{project.id}</span>
                                <h3 className="text-xl md:text-2xl font-serif text-[#44403C] group-hover:text-[#1C1917] transition-colors">
                                    {project.title}
                                </h3>
                                <span className="hidden md:inline-block font-sans text-xs uppercase tracking-widest text-[#A8A29E]">
                                    {project.category}
                                </span>
                            </div>

                            {/* Right: Year & Arrow */}
                            <div className="flex items-center gap-4">
                                <span className="font-mono text-xs text-[#A8A29E]">{project.year}</span>
                                <ArrowUpRight className="w-4 h-4 text-[#D6D3D1] opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-2 group-hover:translate-x-0" />
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>

            {/* FLOATING IMAGE REVEAL (Threads Style: Rounded, Soft Shadow) */}
            <AnimatePresence>
                {hoveredProject && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                            y: 0,
                            x: mousePos.x + 20, // Offset from cursor
                            top: mousePos.y - 150 // Centered vertically on cursor roughly (fixed vs absolute issue?)
                        }}
                        exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.1 } }}
                        transition={{ type: "spring", stiffness: 150, damping: 15 }}
                        className="fixed z-50 pointer-events-none top-0 left-0"
                        style={{
                            left: 0,
                            top: 0
                        }}
                    >
                        {/* We use a fixed positioned div that transforms to mousePos.
                             But 'animate' overrides style. 
                             Better approach: Use a fixed div that updates via CSS variable or state?
                             State update on mouse move is expensive for React render.
                             Ideally we use a ref, but for this prototype, state is okay if items are few.
                          */}
                        <div className="w-[300px] h-[200px] rounded-2xl overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.1)] bg-white border border-white/20 ring-1 ring-[#000000]/5">
                            {/* Placeholder for real image based on ID */}
                            <div className="w-full h-full bg-[#E7E5E4] flex items-center justify-center text-[#A8A29E] font-mono text-xs">
                                [Image: {hoveredProject}]
                            </div>

                            {/* Overlay Gradient for Warmth */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-[#FFAA00]/10 to-transparent mix-blend-overlay" />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
