"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { EXPLORATIONS, type ExplorationItem } from "@/constants/explorations";

function ExplorationItem({ item }: { item: ExplorationItem }) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={ref}
      className="exploration-item absolute"
      data-parallax={item.parallaxRate ?? 0.3}
      style={{
        left: `${item.position.x}%`,
        top: `${item.position.y}%`,
        width: `${item.size.width}px`,
        transform: item.rotation ? `rotate(${item.rotation}deg)` : undefined,
        willChange: "transform",
      }}
    >
      {item.type === "image" && (
        <div
          className="relative overflow-hidden transition-all duration-300 hover:scale-[1.02]"
          style={{
            height: item.size.height ? `${item.size.height}px` : "auto",
            aspectRatio: item.size.height ? undefined : "16 / 10",
            border: "1px solid transparent",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "var(--color-border-strong)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "transparent";
          }}
        >
          <Image
            src={item.content}
            alt={item.label || ""}
            fill
            sizes="360px"
            className="object-cover"
            style={{ filter: "grayscale(1) brightness(0.5)" }}
          />
        </div>
      )}

      {item.type === "text" && (
        <p
          className="font-sans leading-relaxed transition-colors duration-300"
          style={{
            fontSize: item.rotation === -90 ? "var(--text-xs)" : "var(--text-sm)",
            color: "var(--color-text-dim)",
            writingMode: item.rotation === -90 ? "vertical-rl" : undefined,
            transform: item.rotation === -90 ? "rotate(0deg)" : undefined,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "var(--color-text)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "var(--color-text-dim)";
          }}
        >
          {item.content}
        </p>
      )}

      {item.type === "code" && (
        <pre
          className="font-mono transition-colors duration-300"
          style={{
            fontSize: "var(--text-xs)",
            color: "var(--color-text-ghost)",
            lineHeight: 1.6,
            border: "1px solid transparent",
            padding: "0.75rem",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "var(--color-border-strong)";
            e.currentTarget.style.color = "var(--color-text-dim)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "transparent";
            e.currentTarget.style.color = "var(--color-text-ghost)";
          }}
        >
          {item.content}
        </pre>
      )}

      {item.type === "pattern" && (
        <div
          className="dot-matrix"
          style={{
            width: `${item.size.width}px`,
            height: `${item.size.height || item.size.width}px`,
            opacity: 0.5,
          }}
        />
      )}

      {item.label && (
        <span
          className="micro block mt-2"
          style={{ opacity: 0.6 }}
        >
          {item.label}
        </span>
      )}
    </div>
  );
}

export default function ExplorationSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced || !sectionRef.current) return;

      const items = gsap.utils.toArray<HTMLElement>(".exploration-item");

      items.forEach((item) => {
        const rate = parseFloat(item.dataset.parallax || "0.3");

        gsap.fromTo(
          item,
          { y: 80 * rate, opacity: 0 },
          {
            y: -80 * rate,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: item,
              start: "top 95%",
              end: "bottom 5%",
              scrub: true,
            },
          }
        );
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      data-section="exploration"
      className="relative"
      style={{
        padding: "6rem var(--page-px) 4rem",
      }}
    >
      {/* Section header */}
      <div
        className="flex items-center justify-between mb-0"
        style={{
          borderBottom: "1px solid var(--color-border)",
          paddingBottom: "0.75rem",
        }}
      >
        <span className="label">Exploration</span>
        <span className="micro">Field Notes</span>
      </div>

      {/* Scattered field container */}
      <div
        className="relative w-full"
        style={{ height: "150vh" }}
      >
        {EXPLORATIONS.map((item) => (
          <ExplorationItem key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}
