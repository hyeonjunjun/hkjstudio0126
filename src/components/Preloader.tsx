"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const LOGS = [
    "INITIALIZING_CORE...",
    "LOADING_ASSETS [IMG_01, IMG_02]...",
    "VERIFYING_INTEGRITY...",
    "ESTABLISHING_SECURE_CONNECTION...",
    "HKJSTUDIO_SYSTEMS_ONLINE.",
    "RENDERING_CONTEXT...",
    "MOUNTING_DOM...",
    "READY."
];

export default function Preloader({ onComplete }: { onComplete: () => void }) {
    const [count, setCount] = useState(0);
    const [logIndex, setLogIndex] = useState(0);

    useEffect(() => {
        let current = 0;

        // COUNTER LOGIC
        const updateCounter = () => {
            const remaining = 100 - current;
            const step = Math.max(1, Math.ceil(remaining / 8));
            const next = current + step;

            if (next >= 100) {
                current = 100;
                setCount(100);
                setTimeout(onComplete, 800);
                return;
            }
            current = next;
            setCount(current);
            const delay = Math.random() * 50 + (next > 80 ? 100 : 30);
            setTimeout(updateCounter, delay);
        };

        const initialDelay = setTimeout(updateCounter, 500);

        // LOG LOGIC
        const logInterval = setInterval(() => {
            setLogIndex(prev => (prev < LOGS.length - 1 ? prev + 1 : prev));
        }, 300);

        return () => {
            clearTimeout(initialDelay);
            clearInterval(logInterval);
        };
    }, [onComplete]);

    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
            className="fixed inset-0 w-full h-full z-[9999] bg-[#050505] text-[#EDEDED] font-mono cursor-wait overflow-hidden touch-none"
        >
            {/* BACKGROUND GRID (Denser) */}
            <div className="absolute inset-0 grid grid-cols-12 pointer-events-none opacity-20">
                {Array.from({ length: 12 }).map((_, i) => (
                    <div key={i} className="border-r border-[#262626] h-full" />
                ))}
                {/* Horizontal Lines */}
                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                    <div className="border-b border-[#262626] w-full h-[33%]" />
                    <div className="border-b border-[#262626] w-full h-[33%]" />
                </div>
            </div>

            {/* CROSSHAIR CENTER */}
            <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
                <div className="w-[1px] h-32 bg-[#EDEDED]" />
                <div className="h-[1px] w-32 bg-[#EDEDED] absolute" />
                <div className="w-64 h-64 border border-[#262626] rounded-full absolute" />
            </div>

            {/* MARQUEE TOP */}
            <div className="absolute top-0 w-full overflow-hidden py-2 border-b border-[#262626] bg-[#050505] z-20">
                <div className="whitespace-nowrap animate-marquee text-[9px] uppercase tracking-widest text-[#525252]">
                    {Array(10).fill("HKJSTUDIO — DIGITAL PRODUCT AGENCY — SEOUL — ").map((item, i) => (
                        <span key={i} className="mx-4">{item}</span>
                    ))}
                </div>
            </div>

            {/* 4-CORNER CONTENT LAYER */}
            <div className="relative z-10 w-full h-full flex flex-col justify-between p-8 md:p-12 pt-20">

                {/* TOP STATUS ROW */}
                <div className="flex justify-between items-start">
                    <div className="uppercase tracking-widest text-[10px] text-[#EDEDED]">
                        HKJSTUDIO [V.26]<br />
                        <span className="text-[#525252]">EST. 2026</span>
                    </div>
                    <div className="uppercase tracking-widest text-[10px] text-[#525252] text-right">
                        [SYS: ONLINE]<br />
                        LAT: 37.56
                    </div>
                </div>

                {/* CENTER CONSOLE LOG */}
                <div className="absolute left-12 bottom-32 md:bottom-12 md:left-1/2 md:-translate-x-1/2 w-64 h-24 overflow-hidden text-[9px] text-[#525252] leading-relaxed hidden md:block">
                    {LOGS.slice(0, logIndex + 1).map((log, i) => (
                        <div key={i} className="opacity-70">
                            <span className="text-[#333]">&gt;</span> {log}
                        </div>
                    ))}
                    <div className="animate-pulse">_</div>
                </div>

                {/* BOTTOM ROW */}
                <div className="flex justify-between items-end">
                    {/* CAPABILITIES */}
                    <div className="font-mono text-[9px] text-[#525252] leading-relaxed uppercase">
                        <span className="text-[#333]">// CAPABILITIES</span><br />
                        [ "STRATEGY", "SYSTEMS", "ENGINEERING" ]
                    </div>

                    {/* COUNTER */}
                    <div>
                        <h1 className="text-[15vw] leading-[0.8] tracking-tighter font-sans font-medium text-[#EDEDED]">
                            {Math.floor(count)}<span className="text-[#262626] text-[4vw] align-top relative top-4">%</span>
                        </h1>
                    </div>
                </div>

            </div>
        </motion.div>
    );
}
