"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { gsap } from "@/lib/gsap";
import NothingEqLoader from "@/components/ui/NothingEqLoader";
import type { Project } from "@/constants/projects";

interface TrackRowProps {
  project: Project;
  index: number;
}

import { useAudioStore } from "@/lib/audioStore";

export default function TrackRow({ project, index }: TrackRowProps) {
  const router = useRouter();
  const { isPlaying } = useAudioStore();
  const expandRef = useRef<HTMLDivElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const num = String(index + 1).padStart(2, "0");

  const handleEnter = () => {
    setIsExpanded(true);
    if (expandRef.current) {
      gsap.to(expandRef.current, {
        height: "auto",
        opacity: 1,
        duration: 0.35,
        ease: "power2.inOut",
      });
    }
  };

  const handleLeave = () => {
    setIsExpanded(false);
    if (expandRef.current) {
      gsap.to(expandRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.25,
        ease: "power2.inOut",
      });
    }
  };

  const navigate = () => {
    router.push(`/work/${project.id}`);
  };

  return (
    <div
      className="track-row cursor-pointer"
      data-cursor="explore"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onClick={navigate}
      onKeyDown={(e) => {
        if (e.key === "Enter") navigate();
      }}
      role="link"
      tabIndex={0}
    >
      {/* Index */}
      <span
        className="font-mono"
        style={{
          fontSize: "var(--text-micro)",
          color: "var(--color-text-ghost)",
          letterSpacing: "0.05em",
        }}
      >
        [{num}]
      </span>

      {/* Title */}
      <span
        className="font-mono uppercase tracking-[0.08em] truncate"
        style={{
          fontSize: "var(--text-sm)",
          color: "var(--color-text)",
        }}
      >
        {project.title}
      </span>

      {/* Client */}
      <span
        className="font-mono truncate hidden md:block"
        style={{
          fontSize: "var(--text-xs)",
          color: "var(--color-text-dim)",
        }}
      >
        {project.client}
      </span>

      {/* Sector */}
      <span
        className="micro truncate hidden lg:block"
      >
        {project.sector}
      </span>

      {/* Year */}
      <span
        className="micro hidden lg:block"
      >
        {project.year}
      </span>

      {/* EQ indicator — only shows if audio is actually playing and row is expanded */}
      <div
        className="flex justify-end"
        style={{
          opacity: isExpanded && isPlaying ? 1 : 0,
          transition: "opacity 0.2s ease",
        }}
      >
        <NothingEqLoader
          bars={3}
          segmentsPerBar={3}
          size={3}
          gap={2}
          intervalMs={150}
        />
      </div>

      {/* Expanded content */}
      <div
        ref={expandRef}
        className="col-span-full overflow-hidden"
        style={{ height: 0, opacity: 0 }}
      >
        <div
          className="grid gap-6 pt-4 pb-2"
          style={{
            gridTemplateColumns: "1fr 1fr",
          }}
        >
          {/* Grayscale image */}
          <div
            className="relative overflow-hidden"
            style={{
              aspectRatio: "16 / 10",
              border: "1px solid var(--color-border)",
            }}
          >
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              style={{
                filter: "grayscale(1) brightness(0.6)",
              }}
            />
          </div>

          {/* Pitch + CTA */}
          <div className="flex flex-col justify-between py-1">
            <p
              className="font-sans leading-relaxed"
              style={{
                fontSize: "var(--text-sm)",
                color: "var(--color-text-dim)",
              }}
            >
              {project.pitch}
            </p>

            <div className="flex items-center gap-2 mt-4">
              <span
                className="font-mono uppercase tracking-[0.15em]"
                style={{
                  fontSize: "var(--text-xs)",
                  color: "var(--color-text)",
                }}
              >
                Explore
              </span>
              <svg
                width="16"
                height="8"
                viewBox="0 0 16 8"
                fill="none"
                style={{ color: "var(--color-text-dim)" }}
              >
                <path
                  d="M0 4H14M14 4L10 0.5M14 4L10 7.5"
                  stroke="currentColor"
                  strokeWidth="0.75"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
