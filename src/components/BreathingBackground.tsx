"use client";

import { motion } from "framer-motion";

export default function BreathingBackground() {
    return (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#F4F1EA]">
            {/* Ambient Gradient Blobs */}
            <motion.div
                animate={{
                    opacity: [0.3, 0.5, 0.3],
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="absolute -top-[20%] -left-[10%] w-[70vw] h-[70vw] bg-[#C16524] rounded-full mix-blend-multiply filter blur-[100px] opacity-30"
            />

            <motion.div
                animate={{
                    opacity: [0.2, 0.4, 0.2],
                    scale: [1, 1.2, 1],
                    x: [0, 50, 0],
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2
                }}
                className="absolute top-[20%] -right-[10%] w-[60vw] h-[60vw] bg-[#A5B990] rounded-full mix-blend-multiply filter blur-[120px] opacity-20"
            />

            <motion.div
                animate={{
                    opacity: [0.1, 0.3, 0.1],
                    scale: [1, 1.1, 1],
                    y: [0, -50, 0],
                }}
                transition={{
                    duration: 30,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 5
                }}
                className="absolute -bottom-[20%] left-[20%] w-[80vw] h-[80vw] bg-[#E3D5CA] rounded-full mix-blend-multiply filter blur-[150px] opacity-40"
            />

            {/* Noise Overlay */}
            <div className="absolute inset-0 opacity-[0.04] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] contrast-150" />
        </div>
    );
}
