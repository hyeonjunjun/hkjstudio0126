"use client";

import Image from "next/image";

const works = [
    { title: "Sift Mobile", category: "App Design", height: "h-[400px]", color: "bg-[#F5F5F4]" },
    { title: "Luma Interface", category: "Web Design", height: "h-[300px]", color: "bg-[#E7E5E4]" },
    { title: "Antigravity", category: "Design System", height: "h-[500px]", color: "bg-[#D6D3D1]" },
    { title: "Mono/Poly", category: "Experiment", height: "h-[350px]", color: "bg-[#A8A29E]" },
];

export default function ProjectMasonry() {
    return (
        <section className="w-full px-6 md:px-12 py-20">
            <div className="flex items-center justify-between mb-12 border-b border-[#E7E5E4] pb-4">
                <h2 className="text-3xl font-serif text-[#44403C]">Selected Works</h2>
                <span className="font-mono text-xs text-[#A8A29E]">(04)</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Column 1 */}
                <div className="flex flex-col gap-12 pt-0">
                    {works.filter((_, i) => i % 2 === 0).map((work, i) => (
                        <WorkCard key={i} work={work} />
                    ))}
                </div>

                {/* Column 2 (Offset) */}
                <div className="flex flex-col gap-12 md:pt-32">
                    {works.filter((_, i) => i % 2 !== 0).map((work, i) => (
                        <WorkCard key={i} work={work} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function WorkCard({ work }: { work: any }) {
    return (
        <div className="flex flex-col gap-4 group cursor-pointer">
            {/* Image Placeholder */}
            <div className={`w-full ${work.height} ${work.color} rounded-xl overflow-hidden relative shadow-sm transition-all duration-700 hover:shadow-editorial hover:-translate-y-2 transform will-change-transform`}>
                <div className="absolute inset-0 flex items-center justify-center text-[#78716C] font-mono text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity z-10 bg-white/50 backdrop-blur-sm">
                    View Case Study
                </div>
                {/* PLACEHOLDER GRAIN (Inheriting Mason Wong) */}
                <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay pointer-events-none" />

                {/* Soft Overlay (Inheriting Threads) */}
                <div className="absolute inset-0 bg-[#1C1917]/0 group-hover:bg-[#1C1917]/5 transition-colors duration-500" />
            </div>

            {/* Metadata */}
            <div className="flex justify-between items-baseline px-1">
                <h3 className="font-serif text-2xl text-[#1C1917] italic group-hover:text-black transition-colors">{work.title}</h3>
                <span className="font-mono text-[10px] text-[#A8A29E] uppercase tracking-widest border border-[#A8A29E]/20 px-2 py-1 rounded-full">{work.category}</span>
            </div>
        </div>
    );
}
