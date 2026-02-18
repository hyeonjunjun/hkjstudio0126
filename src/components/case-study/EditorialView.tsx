"use client";

import { motion } from "framer-motion";
import { Project } from "@/constants/projects";

export default function EditorialView({ project }: { project: Project }) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full max-w-5xl mx-auto pt-32 px-6"
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center min-h-[60vh]">
                <div className="space-y-8">
                    <span className="inline-block px-3 py-1 border border-foreground/10 rounded-full text-xs font-mono uppercase tracking-widest">
                        {project.year} — {project.client}
                    </span>
                    <h1 className="text-7xl md:text-8xl font-serif tracking-tight leading-[0.9]">
                        {project.editorial.headline}
                    </h1>
                    <p className="text-xl md:text-2xl font-light text-muted-foreground max-w-md leading-relaxed">
                        {project.editorial.copy}
                    </p>
                </div>

                <div className="relative aspect-[3/4] bg-muted overflow-hidden">
                    {/* Placeholder for Media */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-foreground/5 to-transparent" />
                    <div className="absolute bottom-4 left-4 font-mono text-xs text-muted-foreground/50">
                        [IMG: {project.image}]
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
