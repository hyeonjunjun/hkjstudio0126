"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

/**
 * PageTransition
 * ──────────────
 * Wraps page content with entry/exit animations.
 * Used in case study pages to enable morph-like transitions
 * via Framer Motion layoutId on matching elements.
 */

const variants = {
    initial: { opacity: 0, y: 20 },
    animate: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1] as const,
        },
    },
    exit: {
        opacity: 0,
        y: -10,
        transition: {
            duration: 0.3,
            ease: [0.22, 1, 0.36, 1] as const,
        },
    },
};

export default function PageTransition({ children }: { children: ReactNode }) {
    return (
        <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={variants}
        >
            {children}
        </motion.div>
    );
}
