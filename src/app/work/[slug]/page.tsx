"use client";

import { useParams, useRouter } from "next/navigation";
import { PROJECTS } from "@/constants/projects";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";
import ChapterSidebar from "@/components/case-study/ChapterSidebar";
import HighlightAccordion from "@/components/case-study/HighlightAccordion";
import StatGrid from "@/components/case-study/StatGrid";
import NothingEqLoader from "@/components/ui/NothingEqLoader";
import WaveformLine from "@/components/ui/WaveformLine";

/* ─── Constants ─── */

const CHAPTERS = [
  { id: "ch-cover", num: "01", label: "Cover" },
  { id: "ch-brief", num: "02", label: "The Brief" },
  { id: "ch-process", num: "03", label: "The Process" },
  { id: "ch-craft", num: "04", label: "The Craft" },
  { id: "ch-engine", num: "05", label: "The Engine" },
  { id: "ch-numbers", num: "06", label: "The Numbers" },
  { id: "ch-credits", num: "07", label: "Credits" },
];

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

/* ─── Helpers ─── */

function ChapterLabel({ num, title }: { num: string; title: string }) {
  return (
    <div
      className="flex items-center gap-4 mb-8"
      style={{ borderBottom: "1px solid var(--color-border)", paddingBottom: "0.75rem" }}
    >
      <span className="micro" style={{ color: "var(--color-text-ghost)" }}>
        CH.{num}
      </span>
      <span
        className="font-mono uppercase"
        style={{
          fontSize: "var(--text-xs)",
          letterSpacing: "0.15em",
          color: "var(--color-text-dim)",
        }}
      >
        {title}
      </span>
    </div>
  );
}

function PlaceholderFrame({ label }: { label: string }) {
  return (
    <div
      className="w-full aspect-[16/10] flex items-center justify-center"
      style={{
        backgroundColor: "var(--color-surface)",
        border: "1px dashed var(--color-border)",
      }}
    >
      <span className="micro">{label}</span>
    </div>
  );
}

function ImageBlock({ src, placeholder }: { src: string; placeholder?: string }) {
  if (src.startsWith("/placeholder")) {
    return <PlaceholderFrame label={placeholder || "Media Pending"} />;
  }
  return (
    <div className="relative w-full aspect-[16/10] overflow-hidden group">
      <Image
        src={src}
        alt=""
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
        style={{ filter: "grayscale(1) brightness(0.6)" }}
        sizes="(max-width: 768px) 100vw, 60vw"
        quality={90}
      />
    </div>
  );
}

/* ═══════════════════════════════════════════
   ProjectDetail — Album Liner Notes Layout
   7-chapter structure with pinned sidebar
   ═══════════════════════════════════════════ */

export default function ProjectDetail() {
  const { slug } = useParams();
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);

  const project = PROJECTS.find((p) => p.id === slug);

  // Scroll progress bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Next/Prev navigation
  const currentIndex = project ? PROJECTS.findIndex((p) => p.id === project.id) : -1;
  const nextProject = PROJECTS[(currentIndex + 1) % PROJECTS.length];
  const prevProject = PROJECTS[(currentIndex - 1 + PROJECTS.length) % PROJECTS.length];

  if (!project) {
    return (
      <div
        className="w-full h-screen flex items-center justify-center font-mono uppercase"
        style={{ fontSize: "var(--text-xs)", letterSpacing: "0.2em", color: "var(--color-text-dim)" }}
      >
        Project Not Found [404]
      </div>
    );
  }

  return (
    <div ref={containerRef} className="min-h-screen relative" style={{ backgroundColor: "var(--color-bg)" }}>
      {/* ── Scroll Progress Bar ── */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[1px] z-[100] origin-left"
        style={{ scaleX, backgroundColor: "var(--color-accent)" }}
      />

      {/* ── Chapter Sidebar ── */}
      <ChapterSidebar chapters={CHAPTERS} />

      {/* ── Back Button ── */}
      <motion.button
        onClick={() => router.back()}
        className="fixed top-6 right-6 z-50 flex items-center gap-2 group mix-blend-difference"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <span
          className="font-mono uppercase transition-colors duration-300"
          style={{
            fontSize: "var(--text-xs)",
            letterSpacing: "0.15em",
            color: "var(--color-text-dim)",
          }}
        >
          ← Return
        </span>
      </motion.button>

      {/* ════════════════════════════════════════
         CH.01 COVER — Full-bleed hero
         ════════════════════════════════════════ */}
      <section id="ch-cover" className="relative w-full h-screen overflow-hidden">
        {/* Hero image — grayscale */}
        <motion.div
          layoutId={`project-image-${project.id}`}
          className="absolute inset-0"
        >
          <Image
            src={project.image}
            alt={project.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
            style={{ filter: "grayscale(1) brightness(0.4)" }}
          />
        </motion.div>

        {/* Title overlay — bottom left */}
        <div className="absolute inset-0 flex flex-col justify-end" style={{ padding: "var(--page-px)" }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease }}
          >
            <span className="micro block mb-3" style={{ color: "var(--color-accent-dim)" }}>
              [{project.sector}] // {project.year}
            </span>
            <h1
              className="font-mono uppercase leading-[0.95] tracking-tight"
              style={{
                fontSize: "var(--text-display)",
                color: "var(--color-accent)",
              }}
            >
              {project.title}
            </h1>
            <p
              className="font-mono uppercase mt-3"
              style={{
                fontSize: "var(--text-xs)",
                letterSpacing: "0.15em",
                color: "var(--color-text-dim)",
              }}
            >
              Client: {project.client}
            </p>
          </motion.div>
        </div>

        {/* Bottom edge — tags */}
        <div
          className="absolute bottom-0 left-0 right-0 flex items-center gap-3 overflow-x-auto"
          style={{
            padding: "0.5rem var(--page-px)",
            borderTop: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="font-mono uppercase whitespace-nowrap"
              style={{
                fontSize: "var(--text-micro)",
                letterSpacing: "0.15em",
                color: "var(--color-text-ghost)",
                padding: "2px 8px",
                border: "1px solid var(--color-border)",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </section>

      {/* ── Main content container ── */}
      <div className="max-w-[900px] mx-auto" style={{ padding: "0 var(--page-px)" }}>

        {/* ════════════════════════════════════════
           CH.02 THE BRIEF — Editorial
           ════════════════════════════════════════ */}
        <section id="ch-brief" className="pt-32 pb-24">
          <ChapterLabel num="02" title="The Brief" />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease }}
          >
            <h2
              className="font-sans leading-[1.1] mb-6"
              style={{
                fontSize: "var(--text-2xl)",
                color: "var(--color-text)",
              }}
            >
              {project.editorial.headline}
            </h2>

            <p
              className="font-mono uppercase mb-8"
              style={{
                fontSize: "var(--text-xs)",
                letterSpacing: "0.15em",
                color: "var(--color-accent-dim)",
              }}
            >
              {project.editorial.subhead}
            </p>

            <p
              className="font-sans leading-[1.8]"
              style={{
                fontSize: "var(--text-base)",
                color: "var(--color-text-dim)",
                maxWidth: "650px",
              }}
            >
              {project.editorial.copy}
            </p>
          </motion.div>

          {/* Metadata row */}
          <div
            className="grid grid-cols-2 sm:grid-cols-5 gap-6 mt-16 pt-6"
            style={{ borderTop: "1px solid var(--color-border)" }}
          >
            {[
              { label: "Client", value: project.client },
              { label: "Year", value: project.year },
              { label: "Stack", value: project.schematic.stack.slice(0, 3).join(", ") },
              { label: "System", value: project.schematic.grid },
              { label: "Team", value: project.contributors?.map((c) => c.name).join(", ") || "Solo" },
            ].map((meta) => (
              <div key={meta.label} className="flex flex-col gap-1">
                <span className="micro">{meta.label}</span>
                <span
                  className="font-mono"
                  style={{ fontSize: "var(--text-xs)", color: "var(--color-text)", letterSpacing: "0.05em" }}
                >
                  {meta.value}
                </span>
              </div>
            ))}
          </div>

          {/* Editorial images */}
          {project.editorial.images?.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-16">
              {project.editorial.images.map((img, i) => (
                <ImageBlock key={i} src={img} placeholder="Editorial Media" />
              ))}
            </div>
          )}
        </section>

        <WaveformLine />

        {/* ════════════════════════════════════════
           CH.03 THE PROCESS — Rough sketches
           ════════════════════════════════════════ */}
        <section id="ch-process" className="py-24">
          <ChapterLabel num="03" title="The Process" />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease }}
          >
            <h3
              className="font-sans leading-[1.15] mb-6"
              style={{ fontSize: "var(--text-xl)", color: "var(--color-text)" }}
            >
              {project.process.title}
            </h3>
            <p
              className="font-sans leading-[1.8] mb-12"
              style={{
                fontSize: "var(--text-base)",
                color: "var(--color-text-dim)",
                maxWidth: "650px",
              }}
            >
              {project.process.copy}
            </p>
          </motion.div>

          {project.process.images?.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.process.images.map((img, i) => (
                <ImageBlock key={i} src={img} placeholder="Sketch / Wireframe" />
              ))}
            </div>
          )}
        </section>

        <div className="hairline" />

        {/* ════════════════════════════════════════
           CH.04 THE CRAFT — Highlights Accordion
           ════════════════════════════════════════ */}
        <section id="ch-craft" className="py-24">
          <ChapterLabel num="04" title="The Craft" />

          {project.highlights?.length > 0 ? (
            <HighlightAccordion highlights={project.highlights} />
          ) : (
            <p className="micro">No highlights documented yet.</p>
          )}
        </section>

        <div className="hairline" />

        {/* ════════════════════════════════════════
           CH.05 THE ENGINE — Engineering + Signals
           ════════════════════════════════════════ */}
        <section id="ch-engine" className="py-24">
          <ChapterLabel num="05" title="The Engine" />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease }}
            className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-12"
          >
            <div className="space-y-6">
              <p
                className="font-sans leading-[1.8]"
                style={{ fontSize: "var(--text-base)", color: "var(--color-text-dim)" }}
              >
                {project.engineering.copy}
              </p>

              {/* Signal tags */}
              <div className="flex flex-wrap gap-2 mt-6">
                {project.engineering.signals?.map((signal) => (
                  <span
                    key={signal}
                    className="font-mono uppercase"
                    style={{
                      fontSize: "var(--text-micro)",
                      letterSpacing: "0.15em",
                      color: "var(--color-text-dim)",
                      padding: "4px 10px",
                      border: "1px solid var(--color-border)",
                    }}
                  >
                    {signal}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              {project.engineering.images?.map((img, i) => (
                <ImageBlock key={i} src={img} placeholder="Technical Architecture" />
              ))}
            </div>
          </motion.div>
        </section>

        <div className="hairline" />

        {/* ════════════════════════════════════════
           CH.06 THE NUMBERS — Stats Dashboard
           ════════════════════════════════════════ */}
        <section id="ch-numbers" className="py-24">
          <ChapterLabel num="06" title="The Numbers" />
          <StatGrid stats={project.statistics} />
        </section>

        <WaveformLine />

        {/* ════════════════════════════════════════
           CH.07 CREDITS — Contributors + Next
           ════════════════════════════════════════ */}
        <section id="ch-credits" className="py-24">
          <ChapterLabel num="07" title="Credits" />

          {/* Contributors */}
          <div className="mb-16">
            {project.contributors?.map((c) => (
              <div
                key={c.name}
                className="flex items-center justify-between py-3"
                style={{ borderBottom: "1px solid var(--color-border)" }}
              >
                <span
                  className="font-mono"
                  style={{ fontSize: "var(--text-sm)", color: "var(--color-text)", letterSpacing: "0.05em" }}
                >
                  {c.name}
                </span>
                <span className="label">{c.role}</span>
              </div>
            ))}
          </div>

          {/* Schematic summary */}
          <div
            className="grid grid-cols-2 sm:grid-cols-4 gap-6 p-6"
            style={{
              backgroundColor: "var(--color-surface)",
              border: "1px solid var(--color-border)",
            }}
          >
            <div className="flex flex-col gap-1">
              <span className="micro">Typography</span>
              <span className="font-mono" style={{ fontSize: "var(--text-xs)", color: "var(--color-text)" }}>
                {project.schematic.typography}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="micro">Grid</span>
              <span className="font-mono" style={{ fontSize: "var(--text-xs)", color: "var(--color-text)" }}>
                {project.schematic.grid}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="micro">Palette</span>
              <div className="flex gap-1 mt-1">
                {project.schematic.colors?.map((c) => (
                  <div
                    key={c}
                    style={{
                      width: 16,
                      height: 16,
                      backgroundColor: c,
                      border: "1px solid var(--color-border)",
                    }}
                  />
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <span className="micro">Stack</span>
              <span className="font-mono" style={{ fontSize: "var(--text-xs)", color: "var(--color-text)" }}>
                {project.schematic.stack.join(", ")}
              </span>
            </div>
          </div>
        </section>
      </div>

      {/* ── Prev / Next Navigation ── */}
      <div
        className="grid grid-cols-2"
        style={{ borderTop: "1px solid var(--color-border)" }}
      >
        <Link
          href={`/work/${prevProject.id}`}
          className="group block px-6 sm:px-12 py-20 transition-colors duration-500 hover:bg-[var(--color-surface)]"
          style={{ borderRight: "1px solid var(--color-border)" }}
        >
          <span className="label block mb-3">← Previous</span>
          <h3
            className="font-mono uppercase leading-[1.15]"
            style={{
              fontSize: "var(--text-lg)",
              color: "var(--color-text)",
              letterSpacing: "0.05em",
            }}
          >
            {prevProject.title}
          </h3>
        </Link>

        <Link
          href={`/work/${nextProject.id}`}
          className="group block px-6 sm:px-12 py-20 text-right transition-colors duration-500 hover:bg-[var(--color-surface)]"
        >
          <span className="label block mb-3">Next →</span>
          <h3
            className="font-mono uppercase leading-[1.15]"
            style={{
              fontSize: "var(--text-lg)",
              color: "var(--color-text)",
              letterSpacing: "0.05em",
            }}
          >
            {nextProject.title}
          </h3>
        </Link>
      </div>

      {/* ── Footer ── */}
      <footer
        className="flex items-center justify-between px-6 sm:px-12 py-8"
        style={{ borderTop: "1px solid var(--color-border)" }}
      >
        <span className="micro" style={{ opacity: 0.4 }}>
          HKJ Studio © {new Date().getFullYear()}
        </span>
        <div className="flex items-center gap-4">
          <NothingEqLoader bars={3} segmentsPerBar={3} size={3} gap={1} />
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="font-mono uppercase transition-colors duration-300"
            style={{
              fontSize: "var(--text-xs)",
              letterSpacing: "0.15em",
              color: "var(--color-text-dim)",
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            ↑ Top
          </button>
        </div>
      </footer>
    </div>
  );
}
