"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "@/lib/gsap";
import TransitionLink from "@/components/TransitionLink";
import { PROJECTS } from "@/constants/projects";
import { CONTACT_EMAIL } from "@/constants/contact";

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeId, setActiveId] = useState<string | null>(null);

  const yearMin = Math.min(...PROJECTS.map((p) => parseInt(p.year)));
  const yearMax = Math.max(...PROJECTS.map((p) => parseInt(p.year)));

  /* ── Entrance ── */
  useEffect(() => {
    if (!sectionRef.current) return;

    const rows = sectionRef.current.querySelectorAll("[data-row]");
    const footer = sectionRef.current.querySelector("[data-footer]");

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.fromTo(
      rows,
      { opacity: 0, y: 6 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.04 },
      0.3,
    );
    if (footer) {
      tl.fromTo(footer, { opacity: 0 }, { opacity: 1, duration: 0.4 }, "-=0.2");
    }
  }, []);

  return (
    <div
      ref={sectionRef}
      style={{
        height: "100svh",
        overflow: "hidden",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "0 var(--page-px)",
      }}
    >
      {/* ── Project Index ── */}
      <nav style={{ width: "100%" }}>
        {PROJECTS.map((project, i) => {
          const isWip = !!project.wip;
          const isActive = activeId === project.id;

          return (
            <div
              key={project.id}
              data-row
              onMouseEnter={() => setActiveId(project.id)}
              onMouseLeave={() => setActiveId(null)}
              style={{
                display: "flex",
                alignItems: "baseline",
                justifyContent: "space-between",
                padding: "clamp(0.6rem, 1.1vh, 0.85rem) 0",
                borderBottom: "1px solid var(--color-border)",
                cursor: isWip ? "default" : "pointer",
                transition: "opacity 0.35s cubic-bezier(0.23, 1, 0.32, 1)",
                opacity: activeId && !isActive ? 0.12 : 1,
              }}
            >
              {/* Left: number + title */}
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: "clamp(0.5rem, 0.8vw, 0.8rem)",
                }}
              >
                <span
                  className="font-mono"
                  style={{
                    fontSize: "9px",
                    letterSpacing: "0.06em",
                    color: isActive
                      ? "var(--color-accent)"
                      : "var(--color-text-ghost)",
                    transition: "color 0.25s ease",
                    minWidth: "1.8ch",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                {isWip ? (
                  <span
                    className="font-sans"
                    style={{
                      fontSize: "var(--text-body)",
                      fontWeight: 300,
                      letterSpacing: "-0.01em",
                      color: "var(--color-text-ghost)",
                    }}
                  >
                    {project.title}
                  </span>
                ) : (
                  <TransitionLink
                    href={`/work/${project.id}`}
                    className="font-sans"
                    style={{
                      fontSize: "var(--text-body)",
                      fontWeight: isActive ? 400 : 300,
                      letterSpacing: "-0.01em",
                      color: isActive
                        ? "var(--color-text)"
                        : "var(--color-text-secondary)",
                      transition:
                        "color 0.25s ease, font-weight 0.25s ease",
                      textDecoration: "none",
                    }}
                  >
                    {project.title}
                  </TransitionLink>
                )}
              </div>

              {/* Right: sector + year */}
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: "clamp(1.5rem, 3vw, 3rem)",
                }}
              >
                <span
                  className="font-mono uppercase"
                  style={{
                    fontSize: "8px",
                    letterSpacing: "0.1em",
                    color: "var(--color-text-ghost)",
                    whiteSpace: "nowrap",
                    display: "none",
                  }}
                  // Hidden on mobile via inline style; shown via media query below
                  data-sector
                >
                  {project.sector}
                </span>
                <span
                  className="font-mono uppercase"
                  style={{
                    fontSize: "8px",
                    letterSpacing: "0.1em",
                    color: isWip
                      ? "var(--color-text-ghost)"
                      : "var(--color-text-ghost)",
                    whiteSpace: "nowrap",
                  }}
                >
                  {isWip ? "WIP" : project.year}
                </span>
              </div>
            </div>
          );
        })}
      </nav>

      {/* ── Footer ── */}
      <footer
        data-footer
        style={{
          position: "absolute",
          bottom: "clamp(1.5rem, 3vh, 2.5rem)",
          left: "var(--page-px)",
          right: "var(--page-px)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span
          className="font-mono uppercase"
          style={{
            fontSize: "8px",
            letterSpacing: "0.12em",
            color: "var(--color-text-ghost)",
          }}
        >
          {yearMin}–{yearMax}
        </span>

        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="font-mono uppercase"
          style={{
            fontSize: "8px",
            letterSpacing: "0.1em",
            color: "var(--color-text-ghost)",
            textDecoration: "none",
            transition: "color 0.3s ease",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.color = "var(--color-text-dim)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.color = "var(--color-text-ghost)")
          }
        >
          {CONTACT_EMAIL}
        </a>
      </footer>

      {/* Show sector on desktop */}
      <style>{`
        @media (min-width: 768px) {
          [data-sector] { display: inline !important; }
        }
      `}</style>
    </div>
  );
}
