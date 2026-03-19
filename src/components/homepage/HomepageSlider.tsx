"use client";

import { useCallback, useEffect, useState } from "react";
import { motion, useMotionValue, animate } from "framer-motion";
import { useStudioStore } from "@/lib/store";
import { PROJECTS } from "@/constants/projects";
import TransitionLink from "@/components/TransitionLink";
import VideoCard from "@/components/homepage/VideoCard";

const activeProjects = PROJECTS.filter((p) => !p.wip);

/** Responsive peek: 60px desktop, 40px tablet, 0px mobile */
function getPeek(width: number): number {
  if (width < 768) return 0;
  if (width < 1024) return 40;
  return 60;
}

export default function HomepageSlider() {
  const activeIndex = useStudioStore((s) => s.activeProjectIndex);
  const setActiveIndex = useStudioStore((s) => s.setActiveProjectIndex);

  // SSR-safe window dimensions
  const [windowWidth, setWindowWidth] = useState(1200); // safe default
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    setHydrated(true);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const peek = getPeek(windowWidth);
  const cardWidth = windowWidth - peek;

  const x = useMotionValue(0);

  const goTo = useCallback(
    (index: number) => {
      const clamped = Math.max(0, Math.min(index, activeProjects.length - 1));
      setActiveIndex(clamped);
      animate(x, -clamped * cardWidth, {
        type: "tween",
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
      });
    },
    [setActiveIndex, x, cardWidth]
  );

  // Snap to current index when window resizes
  useEffect(() => {
    if (hydrated) {
      animate(x, -activeIndex * cardWidth, { duration: 0 });
    }
  }, [cardWidth, activeIndex, x, hydrated]);

  const handleDragEnd = useCallback(
    (_: any, info: { offset: { x: number }; velocity: { x: number } }) => {
      const swipe = info.offset.x;
      const velocity = info.velocity.x;
      if (swipe < -50 || velocity < -500) {
        goTo(activeIndex + 1);
      } else if (swipe > 50 || velocity > 500) {
        goTo(activeIndex - 1);
      } else {
        goTo(activeIndex);
      }
    },
    [activeIndex, goTo]
  );

  // Arrow key navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goTo(activeIndex + 1);
      if (e.key === "ArrowLeft") goTo(activeIndex - 1);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex, goTo]);

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
        className="flex h-full"
        style={{ x }}
        drag="x"
        dragConstraints={{
          left: -(activeProjects.length - 1) * cardWidth,
          right: 0,
        }}
        dragElastic={0.1}
        onDragEnd={handleDragEnd}
      >
        {activeProjects.map((project, i) => (
          <TransitionLink
            key={project.id}
            href={`/work/${project.id}`}
            className="block flex-shrink-0 h-full"
            style={{ width: `${cardWidth}px` }}
            draggable={false}
          >
            <VideoCard
              project={project}
              index={i}
              isActive={i === activeIndex}
            />
          </TransitionLink>
        ))}
        {/* Spacer for last card peek */}
        {peek > 0 && (
          <div className="flex-shrink-0" style={{ width: `${peek}px` }} />
        )}
      </motion.div>
    </motion.div>
  );
}
