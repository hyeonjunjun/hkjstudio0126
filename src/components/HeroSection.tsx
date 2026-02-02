"use client";

import { motion } from "framer-motion";

export default function HeroSection() {
    return (
        <section className="relative w-full min-h-screen flex flex-col justify-center px-6 md:px-12 pt-20">
            {/* BIG TYPE - Paolo Style */}
            <div className="flex flex-col gap-2 z-10 mix-blend-multiply">
                <h1 className="text-[12vw] leading-[0.8] font-serif font-light tracking-tight text-[#44403C]">
                    Digital
                </h1>
                <div className="flex items-center gap-8">
                    {/* Floating Image Placeholder (as Divider) */}
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "20vw" }}
                        transition={{ duration: 1.5, ease: "circOut" }}
                        className="hidden md:block h-[8vw] bg-[#E7E5E4] rounded-full overflow-hidden"
                    >
                        <div className="w-full h-full bg-gradient-to-r from-[#D6D3D1] to-[#E7E5E4]" />
                    </motion.div>

                    <h1 className="text-[12vw] leading-[0.8] font-serif font-light tracking-tight text-[#44403C] italic">
                        Warmth
                    </h1>
                </div>
            </div>

            {/* Subtext */}
            <div className="max-w-md mt-12 md:ml-[30vw]">
                <p className="font-sans text-sm md:text-base text-[#78716C] leading-relaxed">
                    Hyeonjun Jun. Curating sentimental pixels in a cold digital world.
                    Blending the structure of code with the organic flow of nature.
                </p>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-12 left-6 md:left-12 flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-[#44403C] rounded-full animate-bounce" />
                <span className="text-xs font-mono uppercase tracking-widest text-[#A8A29E]">Scroll to Explore</span>
            </div>
        </section>
    );
}
