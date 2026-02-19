"use client";

import { useRef, useEffect, useCallback } from "react";

/**
 * HeroMeshGradient
 * ─────────────────
 * Cinematic mesh gradient background inspired by AVATR Vision's moody,
 * shifting ambiance. Multiple layered gradient orbs drift slowly and
 * react subtly to mouse position. Warm grey base with muted accent
 * colors that breathe like light through translucent materials.
 */
export default function HeroMeshGradient() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mouseRef = useRef({ x: 0.5, y: 0.5 });
    const targetRef = useRef({ x: 0.5, y: 0.5 });
    const animRef = useRef<number>(0);
    const timeRef = useRef(0);

    const handleMouseMove = useCallback((e: MouseEvent) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const rect = canvas.getBoundingClientRect();
        targetRef.current = {
            x: (e.clientX - rect.left) / rect.width,
            y: (e.clientY - rect.top) / rect.height,
        };
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const resize = () => {
            const dpr = window.devicePixelRatio || 1;
            canvas.width = canvas.offsetWidth * dpr;
            canvas.height = canvas.offsetHeight * dpr;
            ctx.scale(dpr, dpr);
        };

        resize();
        window.addEventListener("resize", resize);
        window.addEventListener("mousemove", handleMouseMove, { passive: true });

        // Gradient orbs — warm, muted, cinematic
        const orbs = [
            { x: 0.15, y: 0.2, r: 0.5, color: [215, 195, 170], baseOpacity: 0.25, speed: 0.3 },  // Warm sand
            { x: 0.8, y: 0.3, r: 0.45, color: [170, 185, 210], baseOpacity: 0.20, speed: 0.4 },  // Cool blue
            { x: 0.5, y: 0.7, r: 0.55, color: [200, 180, 195], baseOpacity: 0.16, speed: 0.25 }, // Muted rose
            { x: 0.3, y: 0.85, r: 0.35, color: [175, 200, 175], baseOpacity: 0.12, speed: 0.35 }, // Sage
            { x: 0.7, y: 0.1, r: 0.3, color: [230, 220, 200], baseOpacity: 0.28, speed: 0.2 },  // Cream highlight
        ];

        const draw = () => {
            timeRef.current += 0.003;

            // Smooth mouse lerp
            mouseRef.current.x += (targetRef.current.x - mouseRef.current.x) * 0.02;
            mouseRef.current.y += (targetRef.current.y - mouseRef.current.y) * 0.02;

            const w = canvas.offsetWidth;
            const h = canvas.offsetHeight;
            ctx.clearRect(0, 0, w, h);

            const mx = mouseRef.current.x;
            const my = mouseRef.current.y;

            for (const orb of orbs) {
                // Slow organic drift
                const driftX = Math.sin(timeRef.current * orb.speed + orb.x * 10) * 0.04;
                const driftY = Math.cos(timeRef.current * orb.speed * 0.7 + orb.y * 8) * 0.04;

                // Mouse influence — subtle push
                const mouseInfluence = 0.08;
                const ox = (orb.x + driftX + (mx - 0.5) * mouseInfluence) * w;
                const oy = (orb.y + driftY + (my - 0.5) * mouseInfluence) * h;
                const or = orb.r * Math.max(w, h);

                // Breathing opacity
                const breathe = 1 + Math.sin(timeRef.current * 0.5 + orb.x * 5) * 0.3;

                const gradient = ctx.createRadialGradient(ox, oy, 0, ox, oy, or);
                const [r, g, b] = orb.color;
                const alpha = orb.baseOpacity * breathe;
                gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${alpha})`);
                gradient.addColorStop(0.4, `rgba(${r}, ${g}, ${b}, ${alpha * 0.5})`);
                gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);

                ctx.fillStyle = gradient;
                ctx.fillRect(0, 0, w, h);
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
            className="absolute inset-0 w-full h-full z-0"
            aria-hidden="true"
        />
    );
}
