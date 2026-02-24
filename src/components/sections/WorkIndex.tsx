"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring, useScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { PROJECTS } from "@/constants/projects";
import Link from "next/link";
import Image from "next/image";

/**
 * WorkIndex
 * ─────────
 * Editorial project list with cursor-following image reveals on hover.
 * Inspired by hugoferradas.com — title rows with a floating preview image
 * that tracks the cursor, creating spatial depth.
 */

function WorkRow({ project, index, onHover, onLeave }: {
    project: (typeof PROJECTS)[0];
    index: number;
    onHover: (img: string) => void;
    onLeave: () => void;
}) {
    const rowRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: rowRef,
        offset: ["start end", "end start"],
    });

    // Subtle vertical parallax — each row drifts slightly as it scrolls through viewport
    const parallaxY = useTransform(scrollYProgress, [0, 1], [12, -12]);

    return (
        <motion.div
            ref={rowRef}
            className="transition-all duration-500 group-hover/list:opacity-40 hover:!opacity-100 hover:translate-x-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
                duration: 0.6,
                delay: index * 0.08,
                ease: [0.16, 1, 0.3, 1],
            }}
            style={{ y: parallaxY }}
        >
            <Link
                href={`/work/${project.id}`}
                className="group block"
                data-cursor="view"
                onMouseEnter={() => onHover(project.image)}
                onMouseLeave={onLeave}
            >
                <div className="flex items-center justify-between py-6 sm:py-10 px-1">
                    <div className="flex items-center gap-4 sm:gap-6 w-full">
                        {/* Mobile Thumbnail (Hidden on Desktop) */}
                        <div className="relative w-14 h-14 sm:w-20 sm:h-20 rounded-sm overflow-hidden shrink-0 lg:hidden bg-ink/5">
                            <Image
                                src={project.image}
                                alt=""
                                fill
                                className="object-cover"
                                sizes="80px"
                            />
                        </div>

                        {/* Title + Pitch */}
                        <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-6 min-w-0">
                            <h3 className="font-display italic text-[clamp(1.2rem,5vw,2.5rem)] tracking-[-0.02em] text-ink group-hover:text-accent transition-colors duration-500 truncate pr-4 py-1 leading-normal">
                                {project.title}
                            </h3>
                            <span className="font-sans text-sm text-ink-muted opacity-0 group-hover:opacity-100 transition-opacity duration-500 max-w-md hidden sm:inline truncate">
                                {project.pitch}
                            </span>
                        </div>
                    </div>

                    {/* Right: Meta */}
                    <div className="flex items-center gap-3 sm:gap-6 shrink-0 ml-4">
                        <span className="font-pixel text-[9px] tracking-[0.2em] uppercase text-ink-faint hidden sm:inline">
                            {project.sector}
                        </span>
                        <span className="font-pixel text-[10px] tracking-[0.15em] text-ink-faint tabular-nums">
                            {project.year}
                        </span>
                        <motion.span
                            className="font-display italic text-lg text-ink-faint group-hover:text-ink transition-colors duration-300"
                            whileHover={{ x: 4 }}
                        >
                            →
                        </motion.span>
                    </div>
                </div>
            </Link>
            {/* Animated scrolling divider line */}
            <div className="animate-line-scroll opacity-[0.12]" />
        </motion.div>
    );
}

export default function WorkIndex() {
    const [headerRef, headerInView] = useInView({
        triggerOnce: true,
        threshold: 0.3,
    });

    const [hoveredImage, setHoveredImage] = useState<string | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Cursor-following image position
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const imgX = useSpring(mouseX, { damping: 25, stiffness: 200, mass: 0.5 });
    const imgY = useSpring(mouseY, { damping: 25, stiffness: 200, mass: 0.5 });



    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        const container = containerRef.current;
        if (container) {
            container.addEventListener("mousemove", handleMouseMove, { passive: true });
        }
        return () => {
            if (container) {
                container.removeEventListener("mousemove", handleMouseMove);
            }
        };
    }, [mouseX, mouseY]);

    return (
        <section id="work" className="relative py-24 sm:py-32 lg:py-40">
            {/* ─── Background Layer: Continuity Line ─── */}
            <div className="absolute left-6 sm:left-12 lg:left-20 top-0 bottom-0 w-px bg-ink/[0.06] z-0" />

            <div className="px-6 sm:px-12 lg:px-20 relative z-10">
                {/* Section Header */}
                <motion.div
                    ref={headerRef}
                    className="mb-12 sm:mb-16"
                    initial={{ opacity: 0, y: 16 }}
                    animate={headerInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                    <div className="flex items-baseline justify-between border-b border-ink/[0.08] pb-4">
                        <h2 className="font-display italic text-[clamp(1.8rem,4vw,3rem)] tracking-[-0.02em] text-ink pr-2 py-1">
                            Selected Work
                        </h2>
                        <span className="font-pixel text-[10px] tracking-[0.2em] uppercase text-ink-faint">
                            {PROJECTS.length} Projects
                        </span>
                    </div>
                </motion.div>

                {/* Project List with floating image - Focus Mode Enabled */}
                <div ref={containerRef} className="relative group/list">
                    {PROJECTS.map((project, index) => (
                        <WorkRow
                            key={project.id}
                            project={project}
                            index={index}
                            onHover={(img) => setHoveredImage(img)}
                            onLeave={() => setHoveredImage(null)}
                        />
                    ))}

                    {/* Floating cursor-following image (Fixed for better precision) */}
                    <motion.div
                        className="fixed top-0 left-0 pointer-events-none z-[100] hidden lg:block"
                        style={{
                            x: imgX,
                            y: imgY,
                            translateX: "40px",
                            translateY: "-50%",
                        }}
                        animate={{
                            opacity: hoveredImage ? 1 : 0,
                            scale: hoveredImage ? 1 : 0.85,
                        }}
                        transition={{
                            opacity: { duration: 0.2 },
                            scale: { type: "spring", stiffness: 350, damping: 25 },
                        }}
                    >
                        <div className="relative w-[320px] h-[200px] rounded-lg overflow-hidden shadow-2xl shadow-ink/20 ring-1 ring-ink/[0.04] bg-canvas">
                            {hoveredImage && (
                                <Image
                                    src={hoveredImage}
                                    alt=""
                                    fill
                                    className="object-cover"
                                    sizes="320px"
                                />
                            )}
                            {/* Static-like overlay for technical feel */}
                            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.02)_50%),linear-gradient(90deg,rgba(139,158,107,0.02),rgba(0,255,0,0.01),rgba(0,0,255,0.02))] z-10 bg-[length:100%_2px,3px_100%]" />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section >
    );
}
