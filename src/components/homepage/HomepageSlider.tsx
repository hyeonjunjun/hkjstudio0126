"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, useMotionValue, animate, type MotionValue } from "framer-motion";
import { useStudioStore } from "@/lib/store";
import { PROJECTS, type Project } from "@/constants/projects";
import TransitionLink from "@/components/TransitionLink";
import VideoCard from "@/components/homepage/VideoCard";

const activeProjects = PROJECTS.filter((p) => !p.wip);

/* ── Card dimensions by breakpoint ── */

function getCardDimensions(vw: number, vh: number) {
  if (vw < 768) {
    // Mobile: uniform full-width
    return {
      portrait: { width: vw, height: vh * 0.7 },
      landscape: { width: vw, height: vh * 0.7 },
    };
  }
  if (vw < 1024) {
    // Tablet
    const pw = vw * 0.38;
    const lw = vw * 0.55;
    return {
      portrait: { width: pw, height: pw * 1.5 },
      landscape: { width: lw, height: lw / 1.75 },
    };
  }
  // Desktop
  const pw = vw * 0.32;
  const lw = vw * 0.49;
  return {
    portrait: { width: pw, height: pw * 1.5 },
    landscape: { width: lw, height: lw / 1.75 },
  };
}

function getFormat(project: Project, index: number): "portrait" | "landscape" {
  return project.cardFormat ?? (index % 2 === 0 ? "portrait" : "landscape");
}

/* ── Position helpers ── */

function buildCardWidths(
  projects: Project[],
  dims: ReturnType<typeof getCardDimensions>
): number[] {
  return projects.map((p, i) => dims[getFormat(p, i)].width);
}

function buildCardHeights(
  projects: Project[],
  dims: ReturnType<typeof getCardDimensions>
): number[] {
  return projects.map((p, i) => dims[getFormat(p, i)].height);
}

/** Returns the x value that centers card i in the viewport */
function buildCardPositions(widths: number[], viewportWidth: number): number[] {
  const positions: number[] = [];
  let cursor = 0;
  for (const w of widths) {
    positions.push(-(cursor + w / 2 - viewportWidth / 2));
    cursor += w;
  }
  return positions;
}

function buildCardLeftEdges(widths: number[]): number[] {
  const edges: number[] = [];
  let cursor = 0;
  for (const w of widths) {
    edges.push(cursor);
    cursor += w;
  }
  return edges;
}

function snapToNearest(target: number, positions: number[]): number {
  let closest = positions[0];
  let minDist = Math.abs(target - positions[0]);
  for (let i = 1; i < positions.length; i++) {
    const dist = Math.abs(target - positions[i]);
    if (dist < minDist) {
      minDist = dist;
      closest = positions[i];
    }
  }
  return closest;
}

function findNearestIndex(currentX: number, positions: number[]): number {
  let idx = 0;
  let minDist = Infinity;
  for (let i = 0; i < positions.length; i++) {
    const dist = Math.abs(currentX - positions[i]);
    if (dist < minDist) {
      minDist = dist;
      idx = i;
    }
  }
  return idx;
}

/* ── Component ── */

export default function HomepageSlider() {
  const activeIndex = useStudioStore((s) => s.activeProjectIndex);
  const setActiveIndex = useStudioStore((s) => s.setActiveProjectIndex);

  // SSR-safe window dimensions
  const [windowWidth, setWindowWidth] = useState(1200);
  const [windowHeight, setWindowHeight] = useState(800);
  const [hydrated, setHydrated] = useState(false);

  // Reduced motion
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    setWindowHeight(window.innerHeight);
    setHydrated(true);

    setPrefersReducedMotion(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Derived layout data
  const dims = useMemo(
    () => getCardDimensions(windowWidth, windowHeight),
    [windowWidth, windowHeight]
  );
  const cardWidths = useMemo(() => buildCardWidths(activeProjects, dims), [dims]);
  const cardHeights = useMemo(() => buildCardHeights(activeProjects, dims), [dims]);
  const cardPositions = useMemo(
    () => buildCardPositions(cardWidths, windowWidth),
    [cardWidths, windowWidth]
  );
  const cardLeftEdges = useMemo(() => buildCardLeftEdges(cardWidths), [cardWidths]);

  // Drag constraints: first and last card centered
  const rightConstraint = cardPositions[0];
  const leftConstraint = cardPositions[cardPositions.length - 1];

  const x = useMotionValue(0);
  const activeIndexRef = useRef(activeIndex);
  activeIndexRef.current = activeIndex;

  // Sync activeProjectIndex from x position changes
  useEffect(() => {
    const unsubscribe = x.on("change", (currentX) => {
      const nearest = findNearestIndex(currentX, cardPositions);
      if (nearest !== activeIndexRef.current) {
        setActiveIndex(nearest);
      }
    });
    return unsubscribe;
  }, [x, cardPositions, setActiveIndex]);

  // Arrow key navigation
  const goTo = useCallback(
    (index: number) => {
      const clamped = Math.max(0, Math.min(index, activeProjects.length - 1));
      setActiveIndex(clamped);
      animate(x, cardPositions[clamped], {
        type: "tween",
        duration: prefersReducedMotion ? 0 : 0.8,
        ease: [0.16, 1, 0.3, 1],
      });
    },
    [setActiveIndex, x, cardPositions, prefersReducedMotion]
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goTo(activeIndex + 1);
      if (e.key === "ArrowLeft") goTo(activeIndex - 1);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex, goTo]);

  // Snap to current index on resize
  useEffect(() => {
    if (hydrated) {
      animate(x, cardPositions[activeIndex], { duration: 0 });
    }
  }, [cardPositions, activeIndex, x, hydrated]);

  // Stable reference for modifyTarget (avoids dragTransition object identity change)
  const cardPositionsRef = useRef(cardPositions);
  cardPositionsRef.current = cardPositions;

  const dragTransition = useMemo(
    () =>
      prefersReducedMotion
        ? {
            timeConstant: 0,
            power: 0,
            modifyTarget: (t: number) =>
              snapToNearest(t, cardPositionsRef.current),
          }
        : {
            power: 0.8,
            timeConstant: 350,
            modifyTarget: (t: number) =>
              snapToNearest(t, cardPositionsRef.current),
          },
    [prefersReducedMotion]
  );

  return (
    <motion.div
      className="relative overflow-hidden"
      style={{ height: "100dvh", cursor: "grab" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div
        className="flex items-center h-full"
        style={{ x }}
        drag="x"
        dragConstraints={{
          left: leftConstraint,
          right: rightConstraint,
        }}
        dragElastic={0.08}
        dragTransition={dragTransition}
      >
        {activeProjects.map((project, i) => (
          <TransitionLink
            key={project.id}
            href={`/work/${project.id}`}
            className="block flex-shrink-0"
            style={{
              width: cardWidths[i],
              height: cardHeights[i],
            }}
            draggable={false}
          >
            <VideoCard
              project={project}
              index={i}
              isActive={i === activeIndex}
              parentX={x}
              cardLeftEdge={cardLeftEdges[i]}
              cardWidth={cardWidths[i]}
              viewportWidth={windowWidth}
              isMobile={windowWidth < 768}
              reducedMotion={prefersReducedMotion}
            />
          </TransitionLink>
        ))}
      </motion.div>
    </motion.div>
  );
}
