"use client";

import { useRef, useEffect } from "react";
import { useLenis } from "lenis/react";

/**
 * WaveformLine — thin canvas-based sine wave that responds to scroll velocity.
 * Decorative audio-reactive element used between section headers and content.
 */

interface WaveformLineProps {
  className?: string;
  height?: number;
  color?: string;
  lineWidth?: number;
}

export default function WaveformLine({
  className = "",
  height = 24,
  color = "var(--color-border-strong)",
  lineWidth = 1,
}: WaveformLineProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const velocityRef = useRef(0);
  const timeRef = useRef(0);
  const rafRef = useRef<number>(0);
  const isVisibleRef = useRef(false);

  useLenis((lenis) => {
    velocityRef.current = lenis.velocity * 0.01;
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
      },
      { threshold: 0 }
    );
    observer.observe(canvas);

    const resolvedColor = getComputedStyle(document.documentElement)
      .getPropertyValue("--color-border-strong")
      .trim() || "#2a2a2a";

    const draw = () => {
      rafRef.current = requestAnimationFrame(draw);

      if (!isVisibleRef.current) return;

      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();

      if (canvas.width !== rect.width * dpr || canvas.height !== rect.height * dpr) {
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        ctx.scale(dpr, dpr);
      }

      const w = rect.width;
      const h = rect.height;
      const midY = h / 2;

      ctx.clearRect(0, 0, w, h);

      timeRef.current += 0.02;
      const vel = Math.abs(velocityRef.current);
      const amplitude = Math.min(2 + vel * 8, h * 0.4);
      const frequency = 0.008 + vel * 0.002;

      ctx.beginPath();
      ctx.strokeStyle = color.startsWith("var(") ? resolvedColor : color;
      ctx.lineWidth = lineWidth;

      for (let x = 0; x <= w; x += 2) {
        const y =
          midY +
          Math.sin(x * frequency + timeRef.current) * amplitude * 0.6 +
          Math.sin(x * frequency * 2.3 + timeRef.current * 1.7) * amplitude * 0.3 +
          Math.sin(x * frequency * 0.5 + timeRef.current * 0.4) * amplitude * 0.1;

        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }

      ctx.stroke();

      // Decay velocity
      velocityRef.current *= 0.95;
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      observer.disconnect();
    };
  }, [color, lineWidth]);

  return (
    <canvas
      ref={canvasRef}
      className={`w-full pointer-events-none ${className}`}
      style={{ height: `${height}px` }}
    />
  );
}
