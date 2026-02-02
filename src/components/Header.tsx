"use client";

import Link from "next/link";

const navItems = [
    { name: "Index", href: "#archive" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
];

export default function Header() {
    return (
        <header className="fixed top-0 left-0 w-full z-50 bg-[#050505]/90 backdrop-blur-sm border-b border-[#262626] text-[#EDEDED]">

            <div className="w-full max-w-[1920px] mx-auto grid grid-cols-12 h-16 border-x border-[#262626]">

                {/* LOGO */}
                <div className="col-span-12 md:col-span-3 border-r border-[#262626] flex items-center px-6">
                    <Link href="/" className="font-serif text-xl italic tracking-tight hover:opacity-50 transition-opacity">
                        HKJSTUDIO [MANUAL]
                    </Link>
                </div>

                {/* TAGLINE */}
                <div className="hidden md:flex col-span-6 border-r border-[#262626] items-center px-6">
                    <span className="font-mono text-[10px] text-[#525252] uppercase tracking-widest">
                        Digital Product Agency / Est. 2026
                    </span>
                </div>

                {/* NAV */}
                <div className="col-span-12 md:col-span-3 flex items-center justify-end px-6 gap-6">
                    {navItems.map((item) => (
                        <Link key={item.name} href={item.href} className="font-mono text-xs uppercase hover:underline underline-offset-4 decoration-[#262626] text-[#EDEDED]">
                            {item.name}
                        </Link>
                    ))}
                    <a href="#" className="font-mono text-xs uppercase bg-[#EDEDED] text-[#050505] px-3 py-2 rounded-full hover:bg-white transition-colors">
                        Start Project
                    </a>
                </div>

            </div>
        </header>
    );
}
