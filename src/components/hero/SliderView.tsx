"use client";

import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { PROJECTS } from "@/constants/projects";

const ease = [0.16, 1, 0.3, 1] as const;

export default function SliderView() {
  const router = useRouter();
  const activeProjects = PROJECTS.filter((p) => !p.wip);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragX = useMotionValue(0);
  const dragXSmooth = useSpring(dragX, { stiffness: 200, damping: 30 });
  const wasDragged = useRef(false);
  const [dragLeft, setDragLeft] = useState(0);
  const [canDrag, setCanDrag] = useState(false);

  // Measure scroll width after mount for drag constraints (SSR-safe)
  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const scrollW = container.scrollWidth - container.clientWidth;
    setDragLeft(-scrollW);
    setCanDrag(true);
  }, []);

  return (
    <div ref={containerRef} className="h-full overflow-hidden padding-x-1">
      <motion.div
        className="flex h-full gutter-gap"
        drag={canDrag ? "x" : false}
        dragConstraints={{ left: dragLeft, right: 0 }}
        dragElastic={0.15}
        style={{ x: dragXSmooth }}
        onDragStart={() => {
          wasDragged.current = false;
        }}
        onDrag={() => {
          wasDragged.current = true;
        }}
      >
        {activeProjects.map((project, i) => (
          <motion.div
            key={project.id}
            className="relative shrink-0 h-full overflow-hidden cursor-grab active:cursor-grabbing span-w-4"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.7,
              delay: i * 0.1,
              ease,
            }}
            onClick={() => {
              if (!wasDragged.current) router.push(`/work/${project.id}`);
            }}
          >
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 63vw, 33vw"
              quality={90}
              draggable={false}
            />

            {/* Label overlay */}
            <motion.div
              className="absolute bottom-0 left-0 right-0"
              style={{ padding: "1.25rem" }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.5 + i * 0.1,
                duration: 0.6,
                ease,
              }}
            >
              <span
                className="font-mono uppercase"
                style={{
                  fontSize: "11px",
                  letterSpacing: "0.1em",
                  color: "#fff",
                  textShadow: "0 1px 4px rgba(0,0,0,0.4)",
                }}
              >
                {project.title}
              </span>
            </motion.div>
          </motion.div>
        ))}

        {/* WIP projects rendered with reduced opacity */}
        {PROJECTS.filter((p) => p.wip).map((project, i) => (
          <motion.div
            key={project.id}
            className="relative shrink-0 h-full overflow-hidden span-w-4"
            style={{ opacity: 0.5 }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 0.5, scale: 1 }}
            transition={{
              duration: 0.7,
              delay: (activeProjects.length + i) * 0.1,
              ease,
            }}
          >
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 63vw, 33vw"
              quality={90}
              draggable={false}
            />
            <div
              className="absolute bottom-0 left-0 right-0"
              style={{ padding: "1.25rem" }}
            >
              <span
                className="font-mono uppercase"
                style={{
                  fontSize: "11px",
                  letterSpacing: "0.1em",
                  color: "#fff",
                  textShadow: "0 1px 4px rgba(0,0,0,0.4)",
                }}
              >
                {project.title} (WIP)
              </span>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
