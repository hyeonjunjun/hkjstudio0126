"use client";

import { ArrowUpRight } from "lucide-react";

export default function Contact() {
    return (
        <section id="contact" className="min-h-[80vh] flex flex-col justify-between">
            {/* Top Border */}
            <div className="border-t border-[#0D0D0D]/10" />

            <div className="grid md:grid-cols-12 flex-1">
                {/* ACTIVATE PROTOCOL CELL */}
                <div className="col-span-12 md:col-span-8 p-8 md:p-16 border-b md:border-b-0 md:border-r border-[#0D0D0D]/10 flex flex-col justify-between relative overflow-hidden group">
                    <div>
                        <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#D4AF37] mb-8 block font-heading border border-[#D4AF37] w-fit px-2 py-1">
                            Index_03: Protocol
                        </span>
                        <h3 className="text-6xl md:text-[8rem] font-bold uppercase font-heading leading-[0.8] tracking-tighter mix-blend-multiply text-[#0D0D0D]">
                            Init<br />Uplink.
                        </h3>
                    </div>

                    <a
                        href="mailto:hello@hyeonjun.space"
                        className="mt-24 inline-flex items-center gap-6 text-2xl md:text-3xl font-bold uppercase tracking-widest hover:text-[#D4AF37] transition-colors group z-10"
                    >
                        <span className="border-b-2 border-current pb-2">hello@hyeonjun.space</span>
                        <ArrowUpRight className="w-8 h-8 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform duration-300" />
                    </a>
                </div>

                {/* STATUS ARRAY CELL */}
                <div className="col-span-12 md:col-span-4 bg-[#0D0D0D] text-[#F2F0E9] p-8 md:p-16 flex flex-col justify-between">
                    <div className="space-y-12">
                        <div>
                            <p className="text-[10px] font-mono uppercase tracking-widest opacity-50 mb-2">Current_Status</p>
                            <div className="flex items-center gap-3">
                                <span className="w-2 h-2 bg-green-500 animate-pulse rounded-full" />
                                <p className="text-xl font-bold uppercase">Open for<br />Commissions</p>
                            </div>
                        </div>

                        <div>
                            <p className="text-[10px] font-mono uppercase tracking-widest opacity-50 mb-2">Time_Zone</p>
                            <p className="text-xl font-bold uppercase">KST (UTC+9)</p>
                        </div>
                    </div>

                    <div className="pt-12 border-t border-[#F2F0E9]/20 flex justify-between text-[10px] font-mono uppercase tracking-widest opacity-40">
                        <span>End_Transmission</span>
                        <span>[EOF]</span>
                    </div>
                </div>
            </div>

            {/* FOOTER TICKER */}
            <div className="border-t border-[#0D0D0D]/10 py-4 overflow-hidden bg-[#F2F0E9]">
                <div className="whitespace-nowrap animate-marquee">
                    <span className="text-[100px] font-bold uppercase text-[#0D0D0D]/5 font-heading">
                        HYEONJUN JUN — CREATIVE DEVELOPER — SEOUL BASED — SYSTEM ARCHITECTURE —
                        HYEONJUN JUN — CREATIVE DEVELOPER — SEOUL BASED — SYSTEM ARCHITECTURE —
                    </span>
                </div>
            </div>
        </section>
    );
}
