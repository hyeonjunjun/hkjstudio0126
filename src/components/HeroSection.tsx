"use client";

import { motion } from "framer-motion";

export default function HeroSection() {
    return (
        <section className="relative w-full min-h-screen pt-16 flex flex-col justify-center border-b border-[#262626]">

            <div className="w-full max-w-[1920px] mx-auto grid grid-cols-1 md:grid-cols-12 flex-1 border-x border-[#262626]">

                {/* LEFT COL: INTRO */}
                <div className="col-span-12 md:col-span-6 p-8 md:p-12 border-b md:border-b-0 md:border-r border-[#262626] flex flex-col justify-between">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.5, duration: 0.8 }}
                    >
                        <h1 className="text-[12vw] md:text-[8vw] leading-[0.85] font-serif tracking-[-0.04em] text-[#EDEDED]">
                            HKJ<br /><span className="italic text-[#525252]">STUDIO</span>
                        </h1>
                    </motion.div>

                    {/* GRID GUIDE OVERLAY IN HERO (Subtle) */}
                    <div className="font-mono text-[9px] text-[#262626] absolute top-24 right-12 hidden md:block">
                        GRID.SYS_ACTIVE
                    </div>

                    <div className="max-w-md mt-12 md:mt-0">
                        <p className="font-mono text-xs uppercase tracking-widest text-[#525252] mb-4">
                            [ Agency Manifesto ]
                        </p>
                        <p className="font-serif text-xl md:text-2xl leading-relaxed text-[#EDEDED]">
                            We build digital systems that matter. Bridging the gap between rigid engineering and organic human interaction.
                        </p>
                    </div>
                </div>

                {/* RIGHT COL: INDEX */}
                <div className="col-span-12 md:col-span-6 flex flex-col">
                    <div className="h-16 border-b border-[#262626] flex items-center px-8 font-mono text-xs uppercase text-[#525252]">
                        Selected Cases (2024–2026)
                    </div>

                    <div className="flex-1">
                        {[
                            { id: "01", name: "SIFT MOBILE", cat: "PRODUCT" },
                            { id: "02", name: "ANTIGRAVITY", cat: "SYSTEM" },
                            { id: "03", name: "LUMA INTERFACE", cat: "PLATFORM" },
                            { id: "04", name: "MONO/POLY", cat: "R&D" },
                            { id: "05", name: "ETHER", cat: "BRAND" },
                            { id: "06", name: "VOID", cat: "EXPERIMENT" }
                        ].map((item, i) => (
                            <div key={item.id} className="h-24 border-b border-[#262626] flex items-center px-8 group cursor-pointer hover:bg-[#111] transition-colors relative overflow-hidden">
                                <div className="w-12 font-mono text-xs text-[#525252] group-hover:text-[#EDEDED]">
                                    ({item.id})
                                </div>
                                <div className="flex-1">
                                    <div className="text-3xl font-serif text-[#EDEDED] group-hover:translate-x-4 transition-transform duration-300">
                                        {item.name}
                                    </div>
                                    <div className="font-mono text-[10px] text-[#525252] uppercase mt-1 opacity-50 group-hover:opacity-100 transition-opacity">
                                        {item.cat}
                                    </div>
                                </div>
                                <div className="ml-auto font-mono text-xs text-[#525252] opacity-0 group-hover:opacity-100 transition-opacity">
                                    [VIEW CASE]
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}
