"use client";

import { useEffect, useState } from "react";

export default function HUD() {
    const [time, setTime] = useState("");

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="fixed inset-0 z-50 pointer-events-none select-none overflow-hidden">

            {/* CORNER BRACKETS (Acid Yellow) */}
            <div className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-[#E8FF00]" />
            <div className="absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2 border-[#E8FF00]" />
            <div className="absolute bottom-8 left-8 w-16 h-16 border-l-2 border-b-2 border-[#E8FF00]" />
            <div className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-[#E8FF00]" />

            {/* SCANLINE OVERLAY */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-[100] bg-[length:100%_4px,3px_100%] pointer-events-none opacity-20" />

            {/* SYSTEM DATA */}
            <div className="absolute bottom-12 left-12 font-mono text-[10px] text-[#E8FF00] flex flex-col gap-1 tracking-widest opacity-80">
                <span>SYS_STATUS: ONLINE</span>
                <span>ETHER_LEVEL: STABLE</span>
                <span>LOC: NEW_ERIDU_PROXY</span>
                <span>TIME: {time}</span>
            </div>

            {/* RIGHT SIDE DIAGNOSTICS */}
            <div className="absolute top-1/2 right-8 -translate-y-1/2 flex flex-col gap-2 items-end">
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="flex items-center gap-2">
                        <span className="text-[8px] font-mono text-white/50">{`0${i}_DAT`}</span>
                        <div className={`h-1 bg-[#E8FF00] transition-all duration-500`} style={{ width: `${Math.random() * 40 + 10}px`, opacity: Math.random() > 0.5 ? 1 : 0.5 }} />
                    </div>
                ))}
            </div>

            {/* DECORATIVE CROSSHAIR */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-white/5 rounded-full flex items-center justify-center opacity-20">
                <div className="w-[380px] h-[380px] border border-white/5 rounded-full border-dashed animate-spin-slow" />
                <div className="absolute top-0 bottom-0 w-px bg-white/10" />
                <div className="absolute left-0 right-0 h-px bg-white/10" />
            </div>
        </div>
    );
}
