"use client";

import { useRef, useEffect, useCallback } from "react";

/**
 * HeroParticles
 * ─────────────
 * Organic dot field — slow Brownian drift with mouse-reactive scatter.
 * Simulates organisms under a microscope. Pure Canvas 2D for performance.
 */

interface Particle {
    x: number;
    y: number;
    baseX: number;
    baseY: number;
    vx: number;
    vy: number;
    radius: number;
    opacity: number;
    drift: number; // Brownian motion intensity
}

export default function HeroParticles() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mouseRef = useRef({ x: -1000, y: -1000 });
    const animRef = useRef<number>(0);
    const particlesRef = useRef<Particle[]>([]);
    const timeRef = useRef(0);

    const handleMouseMove = useCallback((e: MouseEvent) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const rect = canvas.getBoundingClientRect();
        mouseRef.current = {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        };
    }, []);

    const handleMouseLeave = useCallback(() => {
        mouseRef.current = { x: -1000, y: -1000 };
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const SCATTER_RADIUS = 140;
        const SCATTER_FORCE = 60;
        const RETURN_SPEED = 0.015;
        const PARTICLE_COUNT = 120;

        const resize = () => {
            const dpr = window.devicePixelRatio || 1;
            canvas.width = canvas.offsetWidth * dpr;
            canvas.height = canvas.offsetHeight * dpr;
            ctx.scale(dpr, dpr);
            initParticles();
        };

        const initParticles = () => {
            const w = canvas.offsetWidth;
            const h = canvas.offsetHeight;
            particlesRef.current = Array.from({ length: PARTICLE_COUNT }, () => {
                const x = Math.random() * w;
                const y = Math.random() * h;
                return {
                    x,
                    y,
                    baseX: x,
                    baseY: y,
                    vx: 0,
                    vy: 0,
                    radius: 1.2 + Math.random() * 2.5,
                    opacity: 0.08 + Math.random() * 0.18,
                    drift: 0.15 + Math.random() * 0.3,
                };
            });
        };

        const draw = () => {
            const w = canvas.offsetWidth;
            const h = canvas.offsetHeight;
            ctx.clearRect(0, 0, w, h);
            timeRef.current += 0.005;

            const { x: mx, y: my } = mouseRef.current;
            const particles = particlesRef.current;

            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];

                // Brownian drift — slow organic wandering
                p.baseX += Math.sin(timeRef.current + i * 0.7) * p.drift * 0.3;
                p.baseY += Math.cos(timeRef.current + i * 0.5) * p.drift * 0.3;

                // Wrap base positions
                if (p.baseX < -20) p.baseX = w + 20;
                if (p.baseX > w + 20) p.baseX = -20;
                if (p.baseY < -20) p.baseY = h + 20;
                if (p.baseY > h + 20) p.baseY = -20;

                // Mouse scatter
                const dx = p.x - mx;
                const dy = p.y - my;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < SCATTER_RADIUS && dist > 0) {
                    const force = (1 - dist / SCATTER_RADIUS) * SCATTER_FORCE;
                    const angle = Math.atan2(dy, dx);
                    p.vx += Math.cos(angle) * force * 0.08;
                    p.vy += Math.sin(angle) * force * 0.08;
                }

                // Spring back to base
                p.vx += (p.baseX - p.x) * RETURN_SPEED;
                p.vy += (p.baseY - p.y) * RETURN_SPEED;

                // Damping
                p.vx *= 0.92;
                p.vy *= 0.92;

                p.x += p.vx;
                p.y += p.vy;

                // Draw
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(26, 26, 26, ${p.opacity})`;
                ctx.fill();
            }

            // Draw faint connections between nearby particles
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 100) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `rgba(26, 26, 26, ${0.03 * (1 - dist / 100)})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            }

            animRef.current = requestAnimationFrame(draw);
        };

        resize();
        window.addEventListener("resize", resize);
        canvas.addEventListener("mousemove", handleMouseMove, { passive: true });
        canvas.addEventListener("mouseleave", handleMouseLeave);
        draw();

        return () => {
            cancelAnimationFrame(animRef.current);
            window.removeEventListener("resize", resize);
            canvas.removeEventListener("mousemove", handleMouseMove);
            canvas.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, [handleMouseMove, handleMouseLeave]);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full z-0"
            aria-hidden="true"
        />
    );
}
