"use client";

import { motion } from "framer-motion";

export default function ContactSection() {
    return (
        <section className="w-full bg-[#050505] border-b border-[#262626]">
            <div className="max-w-[1920px] mx-auto border-x border-[#262626] grid grid-cols-1 md:grid-cols-12 min-h-[50vh]">

                {/* LEFT: CTA */}
                <div className="col-span-12 md:col-span-6 p-8 md:p-12 border-b md:border-b-0 border-r border-[#262626] flex flex-col justify-between">
                    <div>
                        <span className="font-mono text-[10px] text-[#525252] uppercase tracking-widest block mb-4">
                            (Communication)
                        </span>
                        <h2 className="text-4xl md:text-6xl font-serif text-[#EDEDED] leading-tight">
                            Start a <br />Dialogue.
                        </h2>
                    </div>
                    <div className="mt-12">
                        <div className="w-4 h-4 rounded-full bg-[#00FF00] animate-pulse inline-block mr-3" />
                        <span className="font-mono text-xs text-[#525252] uppercase">
                            Available for 2026
                        </span>
                    </div>
                </div>

                {/* RIGHT: LINKS */}
                <div className="col-span-12 md:col-span-6 grid grid-rows-3 text-[#EDEDED]">
                    {/* EMAIL */}
                    <a href="mailto:hello@hyeonjun.com" className="row-span-1 border-b border-[#262626] p-8 flex items-center justify-between hover:bg-[#111] transition-colors group">
                        <span className="font-mono text-xs uppercase text-[#525252] group-hover:text-white">Email</span>
                        <span className="font-mono text-xl">hello@hyeonjun.com</span>
                    </a>

                    {/* SOCIALS */}
                    <div className="row-span-2 p-8 grid grid-cols-2 gap-4">
                        <a href="#" className="font-mono text-xs uppercase hover:text-white text-[#525252] transition-colors">
                            (Instagram) ↗
                        </a>
                        <a href="#" className="font-mono text-xs uppercase hover:text-white text-[#525252] transition-colors">
                            (LinkedIn) ↗
                        </a>
                        <a href="#" className="font-mono text-xs uppercase hover:text-white text-[#525252] transition-colors">
                            (Twitter) ↗
                        </a>
                        <a href="#" className="font-mono text-xs uppercase hover:text-white text-[#525252] transition-colors">
                            (Github) ↗
                        </a>
                    </div>
                </div>

            </div>
        </section>
    );
}
