"use client";

import { useRef, useEffect } from "react";
import { motion, useTransform, useMotionValue, type MotionValue } from "framer-motion";
import type { Project } from "@/constants/projects";

interface VideoCardProps {
  project: Project;
  index: number;
  isActive: boolean;
  /** Parent carousel x MotionValue for parallax */
  parentX?: MotionValue<number>;
  /** Cumulative left edge of this card in track-space */
  cardLeftEdge?: number;
  /** Width of this card */
  cardWidth?: number;
  /** Viewport width for parallax normalization */
  viewportWidth?: number;
  /** Mobile breakpoint flag */
  isMobile?: boolean;
  /** Reduced motion preference */
  reducedMotion?: boolean;
}

export default function VideoCard({
  project,
  index,
  isActive,
  parentX,
  cardLeftEdge = 0,
  cardWidth = 0,
  viewportWidth = 1200,
  isMobile = false,
  reducedMotion = false,
}: VideoCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!videoRef.current) return;
    if (isActive) {
      videoRef.current.play().catch(() => {});
    } else {
      videoRef.current.pause();
    }
  }, [isActive]);

  // Parallax: shift image inside card based on scroll position
  const fallbackX = useMotionValue(0);
  const motionX = parentX ?? fallbackX;

  const parallaxX = useTransform(motionX, (latestX: number) => {
    if (isMobile || reducedMotion || !cardWidth) return 0;

    // Card center position in viewport-space
    const cardCenter = cardLeftEdge + cardWidth / 2 + latestX;
    const viewportCenter = viewportWidth / 2;

    // Normalized distance: -1 (far left) to +1 (far right)
    const normalized = (cardCenter - viewportCenter) / viewportWidth;
    const clamped = Math.max(-1, Math.min(1, normalized));

    // Max shift: 10% of card width in each direction
    return -clamped * cardWidth * 0.1;
  });

  const hasVideo = !!project.cardVideo;
  const hasImage = !!project.image;

  return (
    <div
      className="relative overflow-hidden"
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "var(--color-surface)",
        borderRadius: "2px",
      }}
      aria-label={`Project ${index + 1}: ${project.title}, ${project.tags.slice(0, 2).join(" and ")}, ${project.year}`}
    >
      {/* Media area — full bleed with parallax */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          style={{
            x: parallaxX,
            width: "125%",
            height: "100%",
            marginLeft: "-12.5%",
          }}
        >
          {hasVideo ? (
            <video
              ref={videoRef}
              src={project.cardVideo}
              muted
              loop
              playsInline
              preload={isActive ? "auto" : "none"}
              poster={project.image || undefined}
              className="w-full h-full object-cover"
              aria-hidden="true"
            />
          ) : hasImage ? (
            <img
              src={project.image}
              alt=""
              className="w-full h-full object-cover"
              aria-hidden="true"
            />
          ) : (
            /* Gradient fallback */
            <div
              className="w-full h-full flex items-center justify-center"
              style={{ backgroundColor: project.cover.bg }}
            >
              <span
                className="font-display italic"
                style={{
                  fontSize: "var(--text-display)",
                  color: project.cover.text,
                  opacity: 0.6,
                }}
              >
                {project.title}
              </span>
            </div>
          )}
        </motion.div>
      </div>

      {/* Scrim gradient for text legibility */}
      <div
        className="absolute inset-x-0 bottom-0 z-[1]"
        style={{
          height: "50%",
          background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 100%)",
          pointerEvents: "none",
        }}
      />

      {/* Metadata overlay — bottom-left, inside card */}
      <div
        className="absolute bottom-0 left-0 right-0 z-10"
        style={{ padding: "20px 24px" }}
      >
        <span
          className="font-mono uppercase tracking-[0.1em] block"
          style={{
            fontSize: "var(--text-micro)",
            color: "rgba(255,255,255,0.4)",
            marginBottom: "6px",
          }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <h2
          className="font-display italic"
          style={{
            fontSize: "var(--text-h3)",
            color: "rgba(255,255,255,0.9)",
            lineHeight: 1.1,
            marginBottom: "6px",
          }}
        >
          {project.title}
        </h2>
        <div className="flex gap-4">
          <span
            className="font-mono uppercase tracking-[0.1em]"
            style={{
              fontSize: "var(--text-micro)",
              color: "rgba(255,255,255,0.3)",
            }}
          >
            {project.tags.slice(0, 2).join(" · ")}
          </span>
          <span
            className="font-mono uppercase tracking-[0.1em]"
            style={{
              fontSize: "var(--text-micro)",
              color: "rgba(255,255,255,0.3)",
            }}
          >
            {project.year}
          </span>
        </div>
      </div>
    </div>
  );
}
