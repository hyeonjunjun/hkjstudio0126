"use client";

import Link from "next/link";

export default function StickyFooter() {
    return (
        <div
            className="fixed bottom-0 left-0 w-full h-screen z-0 bg-[#1C1917] text-[#FDFCF8] flex flex-col justify-between p-8 md:p-12"
            style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
        >
            {/* Top Row: Meta */}
            <div className="flex justify-between items-start font-mono text-xs uppercase tracking-widest text-[#78716C]">
                <div>
                    <span>Based in Seoul</span><br />
                    <span>Local time: {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
                <div className="text-right">
                    <span>Socials</span>
                </div>
            </div>

            {/* Center: Massive Call to Action */}
            <div className="flex-1 flex flex-col justify-center items-center">
                <h2 className="text-[12vw] font-serif leading-none tracking-tighter text-center">
                    Let's Talk
                </h2>
                <a
                    href="mailto:hello@hyeonjun.com"
                    className="text-xl md:text-3xl font-mono mt-8 hover:text-[#D6D3D1] transition-colors border-b border-[#78716C] pb-1"
                >
                    hello@hyeonjun.com
                </a>
            </div>

            {/* Bottom Row: Footer Nav */}
            <div className="flex justify-between items-end font-mono text-xs uppercase tracking-widest text-[#78716C]">
                <span>© 2026 Hyeonjun Jun</span>
                <div className="flex gap-8">
                    <Link href="#" className="hover:text-white transition-colors">Instagram</Link>
                    <Link href="#" className="hover:text-white transition-colors">LinkedIn</Link>
                    <Link href="#" className="hover:text-white transition-colors">Twitter</Link>
                </div>
            </div>
        </div>
    );
}
