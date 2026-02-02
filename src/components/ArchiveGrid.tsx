"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";

const projects = [
    {
        id: "01",
        title: "SIFT MOBILE",
        category: "APPLICATION",
        role: "LEAD DESIGN",
        year: "2024",
    },
    {
        id: "02",
        title: "ANTIGRAVITY",
        category: "DESIGN SYSTEM",
        role: "R&D",
        year: "2024",
    },
    {
        id: "03",
        title: "LUMA INTERFACE",
        category: "WEB PLATFORM",
        role: "FRONTEND",
        year: "2023",
    },
    {
        id: "04",
        title: "MONO/POLY",
        category: "EXPERIMENT",
        role: "CREATIVE DEV",
        year: "2023",
    }
];

export default function ArchiveGrid() {
    const [hovered, setHovered] = useState<string | null>(null);

    return (
        <section className="w-full bg-[#050505] py-0 px-0">

            {/* GRID HEADER (Utility Style) */}
            <div className="w-full max-w-[1920px] mx-auto grid grid-cols-12 border-x border-[#262626] border-b border-[#262626]">
                <div className="col-span-1 p-4 border-r border-[#262626] font-mono text-[10px] text-[#525252] uppercase">ID</div>
                <div className="col-span-5 p-4 border-r border-[#262626] font-mono text-[10px] text-[#525252] uppercase">Project</div>
                <div className="col-span-3 p-4 border-r border-[#262626] font-mono text-[10px] text-[#525252] uppercase">Category</div>
                <div className="col-span-2 p-4 border-r border-[#262626] font-mono text-[10px] text-[#525252] uppercase">Role</div>
                <div className="col-span-1 p-4 font-mono text-[10px] text-[#525252] uppercase text-right">Year</div>
            </div>

            {/* THE ARCHIVE ROWS */}
            <div className="max-w-[1920px] mx-auto border-x border-[#262626]">
                {projects.map((project) => (
                    <motion.div
                        key={project.id}
                        initial={{ backgroundColor: "#050505" }}
                        whileHover={{ backgroundColor: "#111111" }}
                        className="group grid grid-cols-1 md:grid-cols-12 border-b border-[#262626] cursor-pointer relative overflow-hidden transition-colors duration-200"
                        onMouseEnter={() => setHovered(project.id)}
                        onMouseLeave={() => setHovered(null)}
                    >

                        {/* ID */}
                        <div className="col-span-1 p-8 border-r border-[#262626] font-mono text-xs text-[#525252] group-hover:text-white transition-colors flex items-center">
                            ({project.id})
                        </div>

                        {/* TITLE */}
                        <div className="col-span-5 p-8 border-r border-[#262626] flex items-center">
                            <h2 className="text-4xl md:text-5xl font-serif text-[#EDEDED] group-hover:italic transition-all duration-300">
                                {project.title}
                            </h2>
                        </div>

                        {/* CATEGORY */}
                        <div className="col-span-3 p-8 border-r border-[#262626] font-mono text-xs uppercase text-[#525252] flex items-center">
                            {project.category}
                        </div>

                        {/* ROLE */}
                        <div className="col-span-2 p-8 border-r border-[#262626] font-mono text-xs uppercase text-[#525252] flex items-center">
                            {project.role}
                        </div>

                        {/* YEAR */}
                        <div className="col-span-1 p-8 font-mono text-xs text-[#525252] text-right flex items-center justify-end">
                            {project.year}
                        </div>

                        {/* HOVER REVEAL: IMAGE OVERLAY */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: hovered === project.id ? 1 : 0, scale: hovered === project.id ? 1 : 0.9 }}
                            transition={{ duration: 0.3 }}
                            className="absolute top-1/2 right-[10%] -translate-y-1/2 w-[300px] h-[180px] bg-[#262626] hidden md:block pointer-events-none z-20 border border-[#525252]"
                        >
                            {/* Placeholder Image Gradient */}
                            <div className="w-full h-full bg-gradient-to-br from-[#111] to-[#333]" />
                        </motion.div>

                    </motion.div>
                ))}
            </div>
        </section>
    );
}
