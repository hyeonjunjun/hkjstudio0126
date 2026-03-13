"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";

/**
 * ContactSection — 1-1 Salt and Pepper Recreation
 * 
 * Specs:
 * - Background: Pure Black (#000000)
 * - Typography: Fluid wordmark background (>20vw)
 * - Texture: Image-based grain overlay (SNP signature)
 * - Form: Minimalist "Hi my name is" inline interaction
 * - Spacing: Massive architectural whitespace
 */

export default function ContactSection() {
  const [name, setName] = useState("");

  return (
    <section
      id="contact"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ backgroundColor: "#000000", color: "#FFFFFF" }}
    >
      {/* 1-1 Grain Overlay */}
      <div className="paper-noise" style={{ opacity: 0.08 }} />

      {/* Background Wordmark */}
      <h2 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-serif select-none pointer-events-none opacity-[0.04] whitespace-nowrap"
        style={{ fontSize: "clamp(200px, 40vw, 800px)", letterSpacing: "-0.05em" }}
      >
        HKJ STUDIO
      </h2>

      {/* Main Form Interaction */}
      <div className="relative z-10 w-full max-w-[800px] px-8 py-24 flex flex-col gap-16">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
           className="flex flex-col gap-6"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] opacity-40">Get in touch / New projects</span>
          
          <div className="flex flex-wrap items-baseline gap-4 text-[clamp(24px, 4vw, 48px)] font-serif italic">
            <span>Hi, I’m</span>
            <input 
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your Name"
              className="bg-transparent border-b border-white/20 outline-none placeholder:opacity-20 transition-all focus:border-white transition-colors min-w-[200px]"
            />
            <span>let's talk.</span>
          </div>
        </motion.div>

        {/* Footer Links (SNP Style) */}
        <div className="pt-24 border-t border-white/10 flex flex-col md:flex-row justify-between items-start gap-12 font-mono text-[11px] uppercase tracking-[0.2em] text-white/40">
           <div className="flex flex-col gap-4">
              <a href="mailto:hello@hkjstudio.com" className="hover:text-white transition-colors hover:translate-x-1 duration-300 transform inline-block">hello@hkjstudio.com</a>
              <span className="opacity-20">Currently based in NYC / Seoul</span>
           </div>

           <div className="flex flex-wrap gap-x-12 gap-y-4">
              <a href="#work" className="hover:text-white transition-colors">Work</a>
              <a href="https://linkedin.com" target="_blank" className="hover:text-white transition-colors">LinkedIn</a>
              <a href="https://github.com" target="_blank" className="hover:text-white transition-colors">GitHub</a>
              <span className="opacity-20">© 2024</span>
           </div>
        </div>
      </div>

    </section>
  );
}
