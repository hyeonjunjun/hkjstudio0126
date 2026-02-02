"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

// The Mason Wong Style List (Text Only, High Precision)
const archive = [
    { year: "2024", name: "Sift Mobile", role: "Product Designer" },
    { year: "2024", name: "Antigravity", role: "Design Tech" },
    { year: "2023", name: "Luma Interface", role: "Web Dev" },
    { year: "2023", name: "Mono/Poly", role: "Creative Dev" },
    { year: "2022", name: "Nike Concept", role: "3D Artist" },
    { year: "2021", name: "Apple Clone", role: "Frontend" },
];

export default function ArchiveList() {
    return (
        <section className="w-full px-6 md:px-12 py-20 bg-[#F5F5F4]/50">
            <div className="flex items-center justify-between mb-12 border-b border-[#E7E5E4] pb-4">
                <h2 className="text-3xl font-serif text-[#44403C]">Archive</h2>
                <span className="font-mono text-xs text-[#A8A29E]">All Projects</span>
            </div>

            <ul className="flex flex-col border-t border-[#E7E5E4]">
                {archive.map((item, i) => (
                    <li key={i} className="group flex items-baseline justify-between py-4 border-b border-[#E7E5E4] hover:bg-white hover:pl-4 transition-all duration-300 cursor-pointer">
                        <div className="flex items-baseline gap-12 w-full">
                            <span className="font-mono text-xs text-[#A8A29E] w-12">{item.year}</span>
                            <span className="font-serif text-lg text-[#44403C] group-hover:text-black w-1/3 transition-colors">{item.name}</span>
                            <span className="font-sans text-xs text-[#78716C] uppercase tracking-widest hidden md:block">{item.role}</span>
                        </div>
                        <ArrowUpRight className="w-4 h-4 text-[#A8A29E] opacity-0 group-hover:opacity-100 transition-opacity" />
                    </li>
                ))}
            </ul>
        </section>
    );
}
