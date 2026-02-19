"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * CursorDot — Butterfly Edition
 * ──────────────────────────────
 * A custom cursor with a trailing butterfly (나비) SVG that follows
 * the mouse with spring physics. The butterfly rotates toward the
 * movement direction, wings "flap" via a CSS animation, and it
 * grows when hovering interactive elements.
 * Hidden on touch devices.
 */

function ButterflyIcon({ size = 24 }: { size?: number }) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="butterfly-svg"
        >
            {/* Left wing */}
            <path
                className="butterfly-wing-left"
                d="M16 16C14 12 10 6 6 8C2 10 4 16 8 18C10 19 14 18 16 16Z"
                fill="currentColor"
                opacity="0.7"
            />
            {/* Right wing */}
            <path
                className="butterfly-wing-right"
                d="M16 16C18 12 22 6 26 8C30 10 28 16 24 18C22 19 18 18 16 16Z"
                fill="currentColor"
                opacity="0.7"
            />
            {/* Lower left wing */}
            <path
                className="butterfly-wing-left"
                d="M16 16C14 18 9 22 7 20C5 18 8 14 12 14C14 14 15 15 16 16Z"
                fill="currentColor"
                opacity="0.5"
            />
            {/* Lower right wing */}
            <path
                className="butterfly-wing-right"
                d="M16 16C18 18 23 22 25 20C27 18 24 14 20 14C18 14 17 15 16 16Z"
                fill="currentColor"
                opacity="0.5"
            />
            {/* Body */}
            <ellipse cx="16" cy="16" rx="1" ry="4" fill="currentColor" opacity="0.9" />
            {/* Antennae */}
            <line x1="15" y1="12" x2="12" y2="8" stroke="currentColor" strokeWidth="0.5" opacity="0.6" />
            <line x1="17" y1="12" x2="20" y2="8" stroke="currentColor" strokeWidth="0.5" opacity="0.6" />
        </svg>
    );
}

export default function CursorDot() {
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);
    const [isHovering, setIsHovering] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [rotation, setRotation] = useState(0);
    const prevPos = useRef({ x: 0, y: 0 });

    const springConfig = { damping: 20, stiffness: 200, mass: 0.8 };
    const x = useSpring(cursorX, springConfig);
    const y = useSpring(cursorY, springConfig);

    useEffect(() => {
        const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
        if (isTouchDevice) return;

        setIsVisible(true);

        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);

            // Calculate movement direction for butterfly rotation
            const dx = e.clientX - prevPos.current.x;
            const dy = e.clientY - prevPos.current.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist > 3) {
                const angle = Math.atan2(dy, dx) * (180 / Math.PI);
                setRotation(angle + 90); // +90 because butterfly faces "up" by default
            }

            prevPos.current = { x: e.clientX, y: e.clientY };
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const interactive = target.closest(
                "a, button, [role='button'], input, textarea, select, [data-cursor-grow]"
            );
            setIsHovering(!!interactive);
        };

        window.addEventListener("mousemove", moveCursor, { passive: true });
        document.addEventListener("mouseover", handleMouseOver, { passive: true });

        return () => {
            window.removeEventListener("mousemove", moveCursor);
            document.removeEventListener("mouseover", handleMouseOver);
        };
    }, [cursorX, cursorY]);

    if (!isVisible) return null;

    return (
        <>
            {/* Butterfly follower */}
            <motion.div
                className="fixed top-0 left-0 pointer-events-none z-[9999] text-ink/40"
                style={{
                    x,
                    y,
                    translateX: "-50%",
                    translateY: "-50%",
                    rotate: rotation,
                }}
            >
                <motion.div
                    animate={{
                        scale: isHovering ? 1.6 : 1,
                        opacity: isHovering ? 0.8 : 0.5,
                    }}
                    transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 25,
                    }}
                >
                    <ButterflyIcon size={isHovering ? 32 : 22} />
                </motion.div>
            </motion.div>

            {/* Small dot at exact cursor position */}
            <motion.div
                className="fixed top-0 left-0 pointer-events-none z-[9999]"
                style={{
                    x: cursorX,
                    y: cursorY,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
            >
                <motion.div
                    className="rounded-full bg-ink/30"
                    animate={{
                        width: isHovering ? 0 : 3,
                        height: isHovering ? 0 : 3,
                    }}
                    transition={{ type: "spring", stiffness: 500, damping: 28 }}
                />
            </motion.div>

            {/* Butterfly flapping + global cursor hide */}
            <style jsx global>{`
                * {
                    cursor: none !important;
                }
                @keyframes flapLeft {
                    0%, 100% { transform: scaleX(1); }
                    50% { transform: scaleX(0.6); }
                }
                @keyframes flapRight {
                    0%, 100% { transform: scaleX(1); }
                    50% { transform: scaleX(0.6); }
                }
                .butterfly-wing-left {
                    transform-origin: 16px 16px;
                    animation: flapLeft 0.8s ease-in-out infinite;
                }
                .butterfly-wing-right {
                    transform-origin: 16px 16px;
                    animation: flapRight 0.8s ease-in-out infinite;
                    animation-delay: 0.05s;
                }
            `}</style>
        </>
    );
}
