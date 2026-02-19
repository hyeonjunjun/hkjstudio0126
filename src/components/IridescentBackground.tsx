"use client";

import { useRef, useEffect, useCallback } from "react";

/**
 * IridescentBackground
 * ─────────────────────
 * A mouse-reactive mesh gradient that sits behind the warm grey canvas
 * and bleeds through via mix-blend-mode. Simulates light hitting
 * a butterfly wing — colors shift with cursor movement.
 *
 * Colors: Ether Blue, Pale Lilac, Toxic Green
 */
export default function IridescentBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mouseRef = useRef({ x: 0.5, y: 0.5 });
    const targetRef = useRef({ x: 0.5, y: 0.5 });
    const animRef = useRef<number>(0);

    const handleMouseMove = useCallback((e: MouseEvent) => {
        targetRef.current = {
            x: e.clientX / window.innerWidth,
            y: e.clientY / window.innerHeight,
        };
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener("resize", resize);
        window.addEventListener("mousemove", handleMouseMove, { passive: true });

        // Mesh gradient blobs
        const blobs = [
            { x: 0.25, y: 0.3, r: 0.35, color: [120, 160, 220] },   // Ether Blue
            { x: 0.7, y: 0.6, r: 0.3, color: [180, 150, 210] },      // Pale Lilac
            { x: 0.5, y: 0.8, r: 0.25, color: [140, 210, 160] },     // Toxic Green (muted)
        ];

        const draw = () => {
            // Lerp mouse for smooth following
            mouseRef.current.x += (targetRef.current.x - mouseRef.current.x) * 0.03;
            mouseRef.current.y += (targetRef.current.y - mouseRef.current.y) * 0.03;

            const { width, height } = canvas;
            ctx.clearRect(0, 0, width, height);

            const mx = mouseRef.current.x;
            const my = mouseRef.current.y;

            for (const blob of blobs) {
                // Blobs drift slightly toward cursor
                const bx = (blob.x + (mx - 0.5) * 0.12) * width;
                const by = (blob.y + (my - 0.5) * 0.12) * height;
                const br = blob.r * Math.max(width, height);

                const gradient = ctx.createRadialGradient(bx, by, 0, bx, by, br);
                const [r, g, b] = blob.color;
                gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0.25)`);
                gradient.addColorStop(0.5, `rgba(${r}, ${g}, ${b}, 0.08)`);
                gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);

                ctx.fillStyle = gradient;
                ctx.fillRect(0, 0, width, height);
            }

            animRef.current = requestAnimationFrame(draw);
        };

        draw();

        return () => {
            cancelAnimationFrame(animRef.current);
            window.removeEventListener("resize", resize);
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, [handleMouseMove]);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 z-0 pointer-events-none mix-blend-overlay opacity-60"
            aria-hidden="true"
        />
    );
}
