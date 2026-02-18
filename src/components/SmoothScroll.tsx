"use client";

import { ReactLenis } from "@studio-freight/react-lenis";

interface SmoothScrollProps {
    children: React.ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
    return (
        <ReactLenis
            root
            options={{
                lerp: 0.05, // Heavy, slow inertia (Luxury feel)
                duration: 1.5,
                smoothWheel: true,
            }}
        >
            <>{children}</>
        </ReactLenis>
    );
}
