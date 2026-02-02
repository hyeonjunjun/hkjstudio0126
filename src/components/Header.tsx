"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Header() {
    // Scroll state not strictly needed for the static header style, 
    // but kept just in case we want to add blur on scroll later.
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header className="fixed top-0 left-0 w-full z-50 px-8 py-8 flex justify-between items-start pointer-events-none mix-blend-darken">
            {/* Logo - Minimal Text */}
            <div className="pointer-events-auto">
                <Link href="/" className="font-serif italic text-xl text-[#1C1917] hover:text-[#44403C] transition-colors">
                    Hyeonjun Jun
                </Link>
            </div>

            {/* Right: Current Context */}
            <div className="pointer-events-auto flex gap-6 font-sans text-xs uppercase tracking-widest text-[#78716C] bg-white/50 backdrop-blur-md px-4 py-2 rounded-full border border-[#000]/5 shadow-sm">
                <span className="text-[#1C1917]">Seoul, KR</span>
                <span>GMT+9</span>
            </div>
        </header>
    );
}
