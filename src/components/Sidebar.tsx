"use client";

import Link from "next/link";
import { Github, Linkedin, Twitter } from "lucide-react";

const navItems = [
    { name: "Essence", href: "#about" },
    { name: "Selected Works", href: "#projects" },
    { name: "Contact", href: "#contact" },
];

export default function Sidebar() {
    return (
        <aside className="fixed top-0 left-0 w-full md:w-[300px] h-screen bg-[#F4F1EA] text-[#1a1917] border-r border-[#1a1917]/10 z-50 flex flex-col justify-between">

            {/* CELL 1: IDENTITY */}
            <div className="p-8 md:p-12">
                <h1 className="text-3xl font-bold tracking-tight leading-none font-heading mb-2">
                    Hyeonjun<br />Jun
                </h1>
                <span className="text-sm font-serif italic text-[#C16524]">
                    Creative Developer
                </span>
            </div>

            {/* CELL 2: NAVIGATION */}
            <nav className="flex-1 px-8 md:px-12 flex flex-col justify-center gap-6">
                {navItems.map((item, i) => (
                    <Link
                        key={item.name}
                        href={item.href}
                        className="group flex items-center gap-4 text-sm font-bold uppercase tracking-widest hover:text-[#C16524] transition-colors"
                    >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#1a1917] opacity-0 group-hover:opacity-100 transition-opacity" />
                        {item.name}
                    </Link>
                ))}
            </nav>

            {/* CELL 3: METADATA */}
            <div className="p-8 md:p-12">
                <div className="flex gap-6 pb-6 border-b border-[#1a1917]/10 mb-6 opacity-60">
                    <a href="#" className="hover:text-[#C16524] transition-colors"><Github size={18} /></a>
                    <a href="#" className="hover:text-[#C16524] transition-colors"><Linkedin size={18} /></a>
                    <a href="#" className="hover:text-[#C16524] transition-colors"><Twitter size={18} /></a>
                </div>

                <p className="text-[10px] font-mono uppercase tracking-widest opacity-40">
                    Seoul, KR — {new Date().getFullYear()}
                </p>
            </div>
        </aside>
    );
}
