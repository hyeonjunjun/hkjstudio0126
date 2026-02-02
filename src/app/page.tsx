import Header from "@/components/Header";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import GrainOverlay from "@/components/GrainOverlay";
import CustomCursor from "@/components/CustomCursor";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FAFAF9] text-[#292524] font-serif selection:bg-[#E7E5E4]">
      <CustomCursor />
      <GrainOverlay />

      {/* Minimal Header (Clean, Sticky) */}
      <Header />

      <main className="relative z-10 w-full max-w-2xl mx-auto px-6 pt-32 pb-40 flex flex-col gap-24">

        {/* FEED ITEM 1: HERO / INTRO */}
        <section className="flex flex-col gap-6 animate-fade-in">
          <div className="flex items-center gap-2 text-xs font-mono text-[#A8A29E] uppercase tracking-widest">
            <span className="w-2 h-2 rounded-full bg-[#EA580C]"></span>
            <span>My Mind · Now</span>
          </div>

          <h1 className="text-3xl md:text-4xl leading-tight font-serif italic text-[#44403C]">
            "I believe digital spaces should feel like <span className="text-[#292524] not-italic font-medium border-b border-[#E7E5E4] pb-1">warm homes</span>, not cold machines."
          </h1>

          <p className="text-sm font-sans text-[#78716C] leading-relaxed max-w-md">
            Hyeonjun Jun. Creative Developer based in Seoul. <br />
            Curating pixels with sentiment and intention.
          </p>
        </section>

        {/* FEED ITEM 2: SELECTED WORKS (Formatted as Instagram Posts) */}
        <section className="flex flex-col gap-12">
          <div className="flex items-center justify-between border-b border-[#E7E5E4] pb-4">
            <span className="text-xs font-mono text-[#A8A29E] uppercase tracking-widest">Collection</span>
            <span className="text-xs font-mono text-[#A8A29E]">2024 — 2026</span>
          </div>

          {/* Project List (Feed Style) */}
          <Projects />
        </section>

        {/* FEED ITEM 3: THOUGHTS / ABOUT */}
        <section className="bg-white p-8 rounded-sm shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-[#E7E5E4]/50">
          <About />
        </section>

        {/* FEED ITEM 4: CONTACT */}
        <section className="flex flex-col items-center justify-center text-center py-20 gap-4">
          <span className="text-2xl font-serif italic text-[#A8A29E]">Shall we talk?</span>
          <Contact />
        </section>

      </main>
    </div>
  );
}
