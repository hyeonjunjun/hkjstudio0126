"use client";

import { motion } from "framer-motion";

const experiments = [
    { id: "EXP_01", name: "FLUID_SIM", date: "24.01" },
    { id: "EXP_02", name: "TEXT_DISTORT", date: "24.02" },
    { id: "EXP_03", name: "GRAIN_SHADER", date: "23.11" },
    { id: "EXP_04", name: "PHYSICS_NAV", date: "23.10" },
    { id: "EXP_05", name: "AUDIO_VIZ", date: "23.09" },
    { id: "EXP_06", name: "CURSOR_MAG", date: "23.08" },
    { id: "EXP_07", name: "IMAGE_REVEAL", date: "23.07" },
    { id: "EXP_08", name: "TYPE_GLYPHS", date: "23.06" },
];

export default function PlaygroundGrid() {
    return (
        <section className="w-full border-b border-[#262626] bg-[#050505]">

            {/* SECTION HEADER */}
            <div className="max-w-[1920px] mx-auto border-x border-[#262626] grid grid-cols-12 border-b border-[#262626]">
                <div className="col-span-12 p-4 font-mono text-[10px] text-[#525252] uppercase tracking-widest">
                    (Playground / R&D)
                </div>
            </div>

            {/* 4-COLUMN GRID */}
            <div className="max-w-[1920px] mx-auto border-x border-[#262626] grid grid-cols-2 md:grid-cols-4">
                {experiments.map((exp, i) => (
                    <motion.div
                        key={exp.id}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className="aspect-square border-r border-b border-[#262626] relative group cursor-crosshair overflow-hidden"
                    >
                        {/* HOVER GLOW */}
                        <div className="absolute inset-0 bg-[#111] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                        {/* CONTENT */}
                        <div className="absolute inset-0 p-4 flex flex-col justify-between z-10">
                            <span className="font-mono text-[10px] text-[#525252] group-hover:text-white transition-colors">
                                {exp.id}
                            </span>
                            <div className="font-mono text-xs text-[#EDEDED] uppercase">
                                {exp.name}
                            </div>
                        </div>

                        {/* PLACEHOLDER VISUAL */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-20 group-hover:opacity-40 transition-opacity">
                            <div className="w-16 h-16 border border-[#525252] rounded-full animate-pulse" />
                        </div>

                    </motion.div>
                ))}
            </div>

        </section>
    );
}
