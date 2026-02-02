"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function About() {
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

    return (
        <section ref={container} id="about" className="min-h-screen border-b border-[#1a1917]/10 p-8 md:p-20 relative overflow-hidden">

            {/* Grid Line Decoration */}
            <div className="absolute left-[33%] top-0 bottom-0 w-px bg-[#1a1917]/5 hidden md:block" />
            <div className="absolute left-[66%] top-0 bottom-0 w-px bg-[#1a1917]/5 hidden md:block" />

            <div className="grid md:grid-cols-2 gap-16 relative z-10">
                <div className="md:pt-32">
                    <span className="text-sm font-mono uppercase tracking-widest text-[#C16524] mb-8 block">
                        01 / Essence
                    </span>
                    <h2 className="text-4xl md:text-6xl font-serif leading-tight">
                        Crafting software with the precision of an architect and the <span className="italic text-[#C16524]">soul</span> of a poet.
                    </h2>
                </div>

                <div className="md:pt-64">
                    <p className="text-lg md:text-xl text-[#555] leading-relaxed mb-8 max-w-md">
                        I believe the web should feel like paper—tactile, intentional, and calm. My work bridges the gap between raw data and human experience, using motion and typography to create meaning.
                    </p>
                    <p className="text-lg md:text-xl text-[#555] leading-relaxed max-w-md">
                        Drawing inspiration from Swiss design and natural phenomena, I build interfaces that are technically robust yet visually effortless.
                    </p>

                    {/* Tech Stack List (Minimal) */}
                    <div className="mt-12 flex flex-wrap gap-4 font-mono text-xs uppercase tracking-wider text-[#888]">
                        <span>React</span>
                        <span>Next.js</span>
                        <span>WebGL</span>
                        <span>GSAP</span>
                        <span>Tailwind</span>
                    </div>
                </div>
            </div>

            {/* Parallax Element */}
            <motion.div style={{ y }} className="absolute bottom-20 right-20 text-[20rem] font-heading opacity-[0.03] pointer-events-none select-none">
                SOUL
            </motion.div>
        </section>
    );
}
