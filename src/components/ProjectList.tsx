"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

const projects = [
    {
        id: "01",
        title: "SIFT MOBILE",
        category: "Mobile App",
        year: "2024",
        description: "Curating digital noise.",
    },
    {
        id: "02",
        title: "ANTIGRAVITY",
        category: "Design System",
        year: "2024",
        description: "Physics interaction language.",
    },
    {
        id: "03",
        title: "LUMA INTERFACE",
        category: "Web Platform",
        year: "2023",
        description: "Reimagining light.",
    },
    {
        id: "04",
        title: "MONO/POLY",
        category: "Experiment",
        year: "2023",
        description: "Audiovisual synthesis.",
    }
];

export default function ProjectList() {
    const [hoveredProject, setHoveredProject] = useState<string | null>(null);
    const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent) => {
        setCursorPos({ x: e.clientX, y: e.clientY });
    };

    return (
        <section className="w-full min-h-screen py-20 relative bg-[#FDFCF8]" onMouseMove={handleMouseMove}>

            {/* Mason Wong Style: Vertical Text Columns (Decor) */}
            <div className="absolute left-8 md:left-12 top-0 h-full hidden md:flex flex-col justify-between items-center pointer-events-none mix-blend-darken z-10 border-r border-[#E7E5E4] pr-4">
                <span className="font-mono text-xs uppercase tracking-widest text-[#A8A29E] [writing-mode:vertical-rl] rotate-180">Selected Works</span>
            </div>

            <div className="absolute right-8 md:right-12 top-0 h-full hidden md:flex flex-col justify-between items-center pointer-events-none mix-blend-darken z-10 border-l border-[#E7E5E4] pl-4">
                <span className="font-mono text-xs uppercase tracking-widest text-[#A8A29E] [writing-mode:vertical-rl] rotate-180">2023 — 2024</span>
            </div>

            {/* THE LIST */}
            <div className="w-full max-w-[80vw] mx-auto flex flex-col pt-20">
                {projects.map((project, i) => (
                    <div
                        key={project.id}
                        className="group relative border-b border-[#E7E5E4] py-12 md:py-20 cursor-pointer transition-colors hover:bg-[#F5F5F4]"
                        onMouseEnter={() => setHoveredProject(project.id)}
                        onMouseLeave={() => setHoveredProject(null)}
                    >
                        {/* Row Content */}
                        <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4 px-4 md:px-0">

                            {/* ID + Title */}
                            <div className="flex flex-col md:flex-row md:items-baseline gap-4 md:gap-12 pl-4 md:pl-0">
                                <span className="font-mono text-xs md:text-sm text-[#A8A29E] w-8">
                                    {(i + 1).toString().padStart(2, '0')}
                                </span>
                                <h2 className="text-5xl md:text-[8vw] font-serif leading-[0.9] text-[#1C1917] group-hover:italic transition-all duration-300">
                                    {project.title}
                                </h2>
                            </div>

                            {/* Meta (Right) */}
                            <div className="flex items-center gap-12 pr-4 md:pr-0">
                                <span className="font-sans text-xs uppercase tracking-widest text-[#78716C] w-32 text-right hidden md:block">
                                    {project.category}
                                </span>
                                <ArrowUpRight className="w-6 h-6 text-[#D6D3D1] opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* FLOATING IMAGE REVEAL (Mason/Threads Mix) */}
            <AnimatePresence>
                {hoveredProject && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ type: "spring", stiffness: 150, damping: 20 }}
                        className="fixed pointer-events-none z-50 hidden md:block" // Hidden on mobile
                        style={{
                            left: cursorPos.x,
                            top: cursorPos.y,
                            x: "-50%",
                            y: "-50%"
                        }}
                    >
                        {/* Card Style */}
                        <div className="w-[400px] h-[300px] bg-[#E7E5E4] rounded-lg shadow-editorial overflow-hidden relative border border-white/20">
                            {/* Mock Image */}
                            <div className="absolute inset-0 bg-gradient-to-br from-[#D6D3D1] to-[#E7E5E4]" />
                            <div className="absolute inset-0 flex items-center justify-center font-mono text-xs uppercase tracking-widest text-[#78716C]">
                                Project Preview
                            </div>

                            {/* Grain Overlay */}
                            <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
