"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { PROJECTS } from "@/constants/projects";
import TrackRow from "./TrackRow";

export default function SelectedWork() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const displayProjects = PROJECTS.filter((p) => p.id !== "gyeol");

  useGSAP(
    () => {
      if (reduced || !sectionRef.current) return;

      // Header clip-reveal from left
      gsap.from(".track-header", {
        clipPath: "inset(0 100% 0 0)",
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        },
      });

      // Track rows stagger clip-reveal from left
      gsap.from(".track-row", {
        clipPath: "inset(0 100% 0 0)",
        duration: 0.6,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          once: true,
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      data-section="work"
      className="relative"
      style={{
        backgroundColor: "var(--color-bg)",
        padding: "6rem var(--page-px) 4rem",
      }}
    >
      {/* Section header */}
      <div
        className="track-header flex items-center justify-between mb-0"
        style={{
          borderBottom: "1px solid var(--color-border)",
          paddingBottom: "0.75rem",
        }}
      >
        <span className="label">Selected Work</span>
        <span className="micro">
          {String(displayProjects.length).padStart(2, "0")} Tracks
        </span>
      </div>

      {/* Column headers */}
      <div
        className="track-row"
        style={{
          borderBottom: "1px solid var(--color-border-strong)",
          padding: "0.5rem 0",
          cursor: "default",
        }}
      >
        <span className="micro">#</span>
        <span className="micro">Title</span>
        <span className="micro hidden md:block">Client</span>
        <span className="micro hidden lg:block">Sector</span>
        <span className="micro hidden lg:block">Year</span>
        <span className="micro" />
      </div>

      {/* Track rows */}
      {displayProjects.map((project, i) => (
        <TrackRow key={project.id} project={project} index={i} />
      ))}
    </section>
  );
}
