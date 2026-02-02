"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export default function CustomScrollbar() {
    const { scrollYProgress } = useScroll();

    // Smooth out the scroll progress
    const scaleY = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <div className="fixed top-0 right-0 w-[4px] h-full z-[100] mix-blend-difference pointer-events-none hidden md:block">
            {/* The Track (Optional, keeping it invisible for minimal look) */}

            {/* The Thumb */}
            <motion.div
                className="w-full bg-[#1C1917] origin-top rounded-full"
                style={{ scaleY, height: "100%" }}
            />
        </div>
    );
}
