"use client";

export default function AtmosphericGrain() {
    return (
        <div className="pointer-events-none fixed inset-0 z-50 h-full w-full opacity-[0.03] mix-blend-overlay">
            <svg className="h-full w-full">
                <filter id="noise">
                    <feTurbulence
                        type="fractalNoise"
                        baseFrequency="0.8"
                        numOctaves="4"
                        stitchTiles="stitch"
                    />
                </filter>
                <rect width="100%" height="100%" filter="url(#noise)" />
            </svg>
        </div>
    );
}
