"use client";

import { motion } from "framer-motion";

interface AmbientBackgroundProps {
    activeColor: string | null;
}

export default function AmbientBackground({ activeColor }: AmbientBackgroundProps) {
    return (
        <motion.div
            className="fixed inset-0 z-[-1] pointer-events-none transition-colors duration-1000 ease-in-out"
            animate={{
                backgroundColor: activeColor || "transparent",
            }}
            initial={{ backgroundColor: "transparent" }}
            style={{
                opacity: activeColor ? 0.05 : 0, // Very subtle tint
            }}
        />
    );
}
