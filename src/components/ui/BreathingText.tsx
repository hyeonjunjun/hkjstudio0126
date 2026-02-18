"use client";

import { motion } from "framer-motion";

interface BreathingTextProps {
    label: string;
    className?: string;
    fromOpacity?: number;
    toOpacity?: number;
    duration?: number;
}

export default function BreathingText({
    label,
    className = "",
    fromOpacity = 0.4,
    toOpacity = 1,
    duration = 6,
}: BreathingTextProps) {
    return (
        <motion.span
            className={`inline-block ${className}`}
            animate={{
                opacity: [fromOpacity, toOpacity, fromOpacity],
                filter: ["blur(0.5px)", "blur(0px)", "blur(0.5px)"],
            }}
            transition={{
                duration: duration,
                repeat: Infinity,
                ease: "easeInOut",
            }}
        >
            {label}
        </motion.span>
    );
}
