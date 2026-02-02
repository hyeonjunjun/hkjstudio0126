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
                <div className="flex flex-col gap-8 pt-0">
                    {works.filter((_, i) => i % 2 === 0).map((work, i) => (
                        <WorkCard key={i} work={work} />
                    ))}
                </div>

                {/* Column 2 (Offset) */}
                <div className="flex flex-col gap-8 md:pt-20">
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
        <div className="flex flex-col gap-3 group cursor-pointer">
            {/* Image Placeholder */}
            <div className={`w-full ${work.height} ${work.color} rounded-lg overflow-hidden relative shadow-sm transition-all duration-500 hover:shadow-md hover:scale-[1.01]`}>
                <div className="absolute inset-0 flex items-center justify-center text-[#78716C] font-mono text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                    View Case Study
                </div>
                {/* PLACEHOLDER GRAIN */}
                <div className="absolute inset-0 opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />
            </div>

            {/* Metadata */}
            <div className="flex justify-between items-baseline">
                <h3 className="font-serif text-lg text-[#44403C] group-hover:text-[#1C1917] transition-colors">{work.title}</h3>
                <span className="font-mono text-xs text-[#A8A29E] uppercase">{work.category}</span>
            </div>
        </div>
    );
}
