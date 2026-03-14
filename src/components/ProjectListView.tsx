"use client";

import { useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useTransitionStore } from "@/store/useTransitionStore";
import { PROJECTS } from "@/constants/projects";
import { useStudioStore } from "@/lib/store";

/**
 * ProjectListView — Full-Bleed Image Cards
 *
 * Design DNA: Felix Nieto's featured vertical cards
 *
 * Each project is a large, near-viewport-height image card
 * stacked vertically. Minimal text overlay (name + sector/year).
 * Images are the hero — grayscale at rest, color on hover.
 * Subtractive dimming: hovering one card dims all others.
 * ScrollTrigger parallax on images for depth.
 */

const ITEMS = PROJECTS.map((p) => ({
  id: p.id,
  title: p.title.split(":")[0].trim(),
  sector: p.sector,
  year: p.year,
  image: p.image,
  href: `/work/${p.id}`,
}));

export default function ProjectListView() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isLoaded = useStudioStore((s) => s.isLoaded);
  const router = useRouter();
  const startTransition = useTransitionStore((s) => s.start);

  // ScrollTrigger: parallax on images + staggered entrance
  useEffect(() => {
    if (!isLoaded || !containerRef.current) return;

    const cards = containerRef.current.querySelectorAll("[data-card]");
    const images = containerRef.current.querySelectorAll("[data-card-img]");

    // Entrance animation
    cards.forEach((card, i) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          delay: i * 0.15,
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            once: true,
          },
        }
      );
    });

    // Parallax on images (subtle vertical shift as you scroll)
    images.forEach((img) => {
      gsap.fromTo(
        img,
        { yPercent: -8 },
        {
          yPercent: 8,
          ease: "none",
          scrollTrigger: {
            trigger: img.parentElement,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
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
      ref={containerRef}
      className="subtractive-group"
      style={{
        paddingTop: "clamp(7rem, 16vh, 11rem)",
        paddingBottom: "clamp(2rem, 4vh, 3rem)",
      }}
    >
      {ITEMS.map((item, i) => (
        <a
          key={item.id}
          href={item.href}
          onClick={(e) => handleClick(e, item.href)}
          data-card
          data-cursor="project"
          className="project-card group block section-padding cursor-pointer"
          style={{
            opacity: 0,
            marginBottom: "clamp(2rem, 4vw, 4rem)",
          }}
        >
          {/* Image container — full-bleed, tall */}
          <div
            className="relative overflow-hidden w-full"
            style={{
              height: "clamp(50vh, 70vh, 85vh)",
            }}
          >
            <img
              src={item.image}
              alt={item.title}
              data-card-img
              className="project-card-img-list absolute inset-0 w-full h-full object-cover"
              loading={i < 2 ? "eager" : "lazy"}
            />
          </div>

          {/* Meta — minimal, below image */}
          <div
            className="flex items-baseline justify-between mt-4"
            style={{ padding: "0" }}
          >
            <span
              className="font-sans font-medium"
              style={{
                fontSize: "var(--text-base)",
                color: "var(--color-text)",
                letterSpacing: "-0.01em",
              }}
            >
              {item.title}
            </span>
            <span
              className="font-mono"
              style={{
                fontSize: "var(--text-micro)",
                color: "var(--color-text-ghost)",
                letterSpacing: "0.1em",
              }}
            >
              {item.sector} / {item.year}
            </span>
          </div>
        </a>
      ))}
    </div>
  );
}
