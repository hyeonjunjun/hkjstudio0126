"use client";

import { ReactNode } from "react";
import { ReactLenis } from "lenis/react";

export default function InertialScroll({ children }: { children: ReactNode }) {
    return (
        <ReactLenis root options={{
            lerp: 0.1,
            duration: 1.5,
            smoothWheel: true,
            wheelMultiplier: 1.2,
        }}>
            {children}
        </ReactLenis>
    );
}
