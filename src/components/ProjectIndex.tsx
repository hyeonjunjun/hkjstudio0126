"use client";

import { motion } from "framer-motion";
import { Project, PROJECTS } from "@/constants/projects";
import Link from "next/link";

interface ProjectIndexProps {
    onHover: (color: string | null) => void;
}

export default function ProjectIndex({ onHover }: ProjectIndexProps) {
    return (
        <section className="w-full max-w-2xl mt-32 mb-32">
            <div className="flex flex-col gap-0">
                {PROJECTS.map((project) => (
                    <ProjectItem
                        key={project.id}
                        project={project}
                        onHover={onHover}
                    />
                ))}
            </div>
        </section>
    );
}

function ProjectItem({ project, onHover }: { project: Project, onHover: (c: string | null) => void }) {
    return (
        <Link href={`/work/${project.id}`} className="block w-full">
            <motion.div
                className="group relative flex items-baseline justify-between py-4 border-b border-border/40 cursor-pointer overflow-hidden"
                onMouseEnter={() => onHover(project.mood)}
                onMouseLeave={() => onHover(null)}
                initial="initial"
                whileHover="hover"
            >
                <div className="flex items-baseline gap-6 z-10">
                    <span className="font-mono text-xs text-muted-foreground/60 w-8">
                        {project.id}
                    </span>
                    <span className="font-sans text-xl font-medium tracking-tight text-foreground/80 group-hover:text-foreground transition-colors duration-300">
                        {project.title}
                    </span>
                </div>

                <div className="flex items-baseline gap-8 z-10">
                    <span className="font-mono text-xs text-muted-foreground/0 group-hover:text-muted-foreground/60 transition-all duration-500 hidden sm:block">
                        {project.client}
                    </span>
                    <span className="font-mono text-xs text-muted-foreground">
                        {project.year}
                    </span>
                </div>

                {/* Hover Reveal Effect - Optional Gradient Swipe */}
                <motion.div
                    className="absolute inset-0 bg-foreground/5 z-0"
                    variants={{
                        initial: { x: "-100%" },
                        hover: { x: "0%" }
                    }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                />
            </motion.div>
        </Link>
    )
}
