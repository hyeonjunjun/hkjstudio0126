"use client";

import { useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useTransitionStore } from "@/store/useTransitionStore";
import { useStudioStore } from "@/lib/store";
import { PROJECTS } from "@/constants/projects";

/**
 * HeroToGridSection — Scroll-Driven Hero-to-Grid Zoom
 *
 * Architecture: "The Grid IS the Hero"
 *
 * The CSS Grid is rendered at normal scale, then scaled up so the first
 * card fills the viewport. ScrollTrigger drives `scale` from large → 1.0,
 * naturally revealing all cards as the grid "zooms out."
 *
 * - Subtle mono tagline overlay fades out during zoom
 * - Card meta text fades in near scroll end
 * - After animation: interactive grid with hover states
 * - Transform-origin at first card center
 */

const ITEMS = PROJECTS.map((p, i) => ({
  id: p.id,
  index: String(i + 1).padStart(2, "0"),
  title: p.title.split(":")[0].trim(),
  year: p.year,
  image: p.image,
  href: `/work/${p.id}`,
}));

export default function HeroToGridSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const clipRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const isLoaded = useStudioStore((s) => s.isLoaded);
  const setGridRevealed = useStudioStore((s) => s.setGridRevealed);
  const router = useRouter();
  const startTransition = useTransitionStore((s) => s.start);

  useEffect(() => {
    if (!isLoaded || !sectionRef.current || !gridRef.current || !clipRef.current)
      return;

    const section = sectionRef.current;
    const grid = gridRef.current;
    const clip = clipRef.current;
    const overlay = overlayRef.current;

    // Wait a frame for layout to settle
    const rafId = requestAnimationFrame(() => {
      const firstCard = grid.querySelector("[data-card]") as HTMLElement;
      if (!firstCard) return;

      const sectionRect = section.getBoundingClientRect();
      const gridRect = grid.getBoundingClientRect();
      const cardRect = firstCard.getBoundingClientRect();

      // --- Scale calculation ---
      // How much to scale the grid so the first card fills the viewport
      const scaleX = sectionRect.width / cardRect.width;
      const scaleY = sectionRect.height / cardRect.height;
      const scaleFactor = Math.max(scaleX, scaleY) * 1.02; // tiny overshoot

      // Transform-origin at first card center (relative to grid element)
      const originX = cardRect.left - gridRect.left + cardRect.width / 2;
      const originY = cardRect.top - gridRect.top + cardRect.height / 2;

      // --- Translation to center first card in viewport ---
      // At the hero state, the card center should be at the viewport center
      const cardCenterX = cardRect.left - sectionRect.left + cardRect.width / 2;
      const cardCenterY = cardRect.top - sectionRect.top + cardRect.height / 2;
      const viewCenterX = sectionRect.width / 2;
      const viewCenterY = sectionRect.height / 2;

      // The translation needed to move card center to viewport center
      // (accounts for transform-origin being at the card center already)
      const heroX = viewCenterX - cardCenterX;
      const heroY = viewCenterY - cardCenterY;

      // Set hero state (zoomed in)
      gsap.set(grid, {
        scale: scaleFactor,
        x: heroX,
        y: heroY,
        transformOrigin: `${originX}px ${originY}px`,
        willChange: "transform",
      });

      // Hide meta text initially
      const metaElements = grid.querySelectorAll("[data-card-meta]");
      gsap.set(metaElements, { opacity: 0, y: 10 });

      // Initially show hero card image in color, others grayscale
      const firstImg = firstCard.querySelector("img");
      if (firstImg) {
        gsap.set(firstImg, { filter: "grayscale(0%)" });
      }

      // --- ScrollTrigger animation ---
      const isMobile = window.innerWidth < 768;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: isMobile ? "+=100%" : "+=150%",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            // Fade overlay text with scroll progress
            if (overlay) {
              gsap.set(overlay, { opacity: 1 - self.progress * 2.5 });
            }
          },
          onLeave: () => {
            setGridRevealed(true);
            // Remove clip so full grid is scrollable
            clip.style.overflow = "visible";
            clip.style.height = "auto";
            // Clear hero-state filter so CSS class takes over
            if (firstImg) {
              gsap.set(firstImg, { clearProps: "filter" });
            }
          },
          onEnterBack: () => {
            setGridRevealed(false);
            // Re-clip for animation
            clip.style.overflow = "hidden";
            clip.style.height = "100vh";
          },
        },
      });

      // Zoom out from hero → grid
      tl.to(
        grid,
        {
          scale: 1,
          x: 0,
          y: 0,
          duration: 1,
          ease: "none",
        },
        0
      );

      // Hero card image: color → grayscale near the end
      if (firstImg) {
        tl.to(
          firstImg,
          {
            filter: "grayscale(100%)",
            duration: 0.25,
          },
          0.75
        );
      }

      // Card meta text fades in at the end
      tl.to(
        metaElements,
        {
          opacity: 1,
          y: 0,
          duration: 0.25,
          stagger: 0.04,
        },
        0.7
      );
    });

    return () => {
      cancelAnimationFrame(rafId);
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, [isLoaded, setGridRevealed]);

  const handleClick = useCallback(
    (e: React.MouseEvent, href: string) => {
      e.preventDefault();
      startTransition(href, { x: e.clientX, y: e.clientY });
      setTimeout(() => router.push(href), 500);
    },
    [router, startTransition]
  );

  return (
    <section ref={sectionRef} className="relative">
      <div
        ref={clipRef}
        className="relative"
        style={{ height: "100vh", overflow: "hidden" }}
      >
        {/* Subtle tagline overlay — fades out on scroll */}
        <div
          ref={overlayRef}
          className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none"
        >
          <span
            className="font-mono select-none"
            style={{
              fontSize: "var(--text-micro)",
              letterSpacing: "0.15em",
              color: "rgba(255, 255, 255, 0.6)",
              textShadow: "0 1px 8px rgba(0,0,0,0.3)",
            }}
          >
            hkj studio / nyc &amp; seoul
          </span>
        </div>

        {/* Grid — initially scaled up, zooms out via ScrollTrigger */}
        <div
          ref={gridRef}
          className="subtractive-group grid grid-cols-1 md:grid-cols-2 max-w-[1200px] mx-auto section-padding"
          style={{
            gap: "clamp(0.75rem, 1.5vw, 1.5rem)",
            paddingTop: "clamp(6rem, 14vh, 10rem)",
            paddingBottom: "clamp(3rem, 6vh, 5rem)",
          }}
        >
          {ITEMS.map((item, i) => (
            <a
              key={item.id}
              href={item.href}
              onClick={(e) => handleClick(e, item.href)}
              data-card
              data-cursor="project"
              className="project-card group block cursor-pointer"
            >
              {/* Image container */}
              <div
                className="overflow-hidden"
                style={{ aspectRatio: i % 2 === 0 ? "4/3" : "3/2" }}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="project-card-img w-full h-full object-cover"
                  loading="eager"
                />
              </div>

              {/* Meta — hidden initially, fades in during zoom-out */}
              <div
                data-card-meta
                className="flex items-baseline justify-between mt-3"
              >
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
    </section>
  );
}
