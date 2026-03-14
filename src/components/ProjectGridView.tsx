"use client";

import { useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useTransitionStore } from "@/store/useTransitionStore";
import { PROJECTS } from "@/constants/projects";
import { useStudioStore } from "@/lib/store";

/**
 * ProjectGridView — Asymmetric Masonry Grid
 *
 * Design DNA: Cathy Dolle dual-mode + Felix Nieto fullscreen image treatment
 *
 * Structure:
 *   CSS Grid with intentional asymmetry via grid-row spans
 *   Each card: overflow-hidden image with pull-in scale effect
 *   Grayscale → color on hover (CSS transitions, no inline mutations)
 *   subtractive-group on grid container
 *
 * Entrance: GSAP ScrollTrigger staggered reveal
 */

// Grid layout configuration — intentional asymmetry
const GRID_CONFIG: Array<{
  colSpan: string;
  rowSpan: string;
  aspect: string;
  offset: boolean;
}> = [
  { colSpan: "1 / 2", rowSpan: "span 2", aspect: "3/4", offset: false },   // Large left
  { colSpan: "2 / 3", rowSpan: "span 1", aspect: "4/3", offset: true },    // Small right (offset)
  { colSpan: "2 / 3", rowSpan: "span 1", aspect: "1/1", offset: false },   // Square right
  { colSpan: "1 / 3", rowSpan: "span 1", aspect: "21/9", offset: false },  // Wide bottom
];

const ITEMS = PROJECTS.map((p, i) => ({
  id: p.id,
  index: String(i + 1).padStart(2, "0"),
  title: p.title.split(":")[0].trim(),
  sector: p.sector,
  year: p.year,
  image: p.image,
  href: `/work/${p.id}`,
  layout: GRID_CONFIG[i % GRID_CONFIG.length],
}));

export default function ProjectGridView() {
  const gridRef = useRef<HTMLDivElement>(null);
  const isLoaded = useStudioStore((s) => s.isLoaded);
  const router = useRouter();
  const startTransition = useTransitionStore((s) => s.start);

  // ScrollTrigger staggered entrance
  useEffect(() => {
    if (!isLoaded || !gridRef.current) return;

    const cards = gridRef.current.querySelectorAll("[data-card]");

    cards.forEach((card, i) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          delay: i * 0.1,
          scrollTrigger: {
            trigger: card,
            start: "top 88%",
            once: true,
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, [isLoaded]);

  const handleClick = useCallback(
    (e: React.MouseEvent, href: string) => {
      e.preventDefault();
      startTransition(href, { x: e.clientX, y: e.clientY });
      setTimeout(() => router.push(href), 500);
    },
    [router, startTransition]
  );

  return (
    <div
      className="section-padding"
      style={{
        paddingTop: "clamp(8rem, 18vh, 12rem)",
        paddingBottom: "clamp(6rem, 12vh, 10rem)",
      }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between max-w-[1200px] mx-auto"
        style={{ paddingBottom: "clamp(2rem, 4vh, 3rem)" }}
      >
        <span
          className="font-mono"
          style={{
            fontSize: "var(--text-micro)",
            letterSpacing: "0.15em",
            color: "var(--color-text-ghost)",
          }}
        >
          selected works
        </span>
        <span
          className="font-mono tabular-nums"
          style={{
            fontSize: "var(--text-micro)",
            letterSpacing: "0.1em",
            color: "var(--color-text-ghost)",
          }}
        >
          {String(ITEMS.length).padStart(2, "0")} projects
        </span>
      </div>

      {/* Grid */}
      <div
        ref={gridRef}
        className="subtractive-group grid grid-cols-1 md:grid-cols-2 max-w-[1200px] mx-auto"
        style={{ gap: "clamp(1rem, 2vw, 2rem)" }}
      >
        {ITEMS.map((item, i) => (
          <a
            key={item.id}
            href={item.href}
            onClick={(e) => handleClick(e, item.href)}
            data-card
            data-cursor="project"
            className="project-card group block cursor-pointer"
            style={{
              opacity: 0,
              gridColumn: item.layout.colSpan,
              gridRow: item.layout.rowSpan,
              marginTop: item.layout.offset ? "clamp(2rem, 5vw, 4rem)" : 0,
            }}
          >
            {/* Image container */}
            <div
              className="overflow-hidden"
              style={{ aspectRatio: item.layout.aspect }}
            >
              <img
                src={item.image}
                alt={item.title}
                className="project-card-img w-full h-full object-cover"
                loading={i < 2 ? "eager" : "lazy"}
              />
            </div>

            {/* Meta */}
            <div className="flex items-baseline justify-between mt-4">
              <div className="flex items-baseline gap-3">
                <span
                  className="font-mono tabular-nums"
                  style={{
                    fontSize: "var(--text-micro)",
                    color: "var(--color-text-ghost)",
                    letterSpacing: "0.1em",
                  }}
                >
                  {item.index}
                </span>
                <span
                  className="font-sans font-medium"
                  style={{
                    fontSize: "var(--text-base)",
                    color: "var(--color-text)",
                  }}
                >
                  {item.title}
                </span>
              </div>
              <span
                className="font-mono tabular-nums"
                style={{
                  fontSize: "var(--text-xs)",
                  color: "var(--color-text-ghost)",
                }}
              >
                {item.year}
              </span>
            </div>
          </a>
        ))}
      </div>

    </div>
  );
}
