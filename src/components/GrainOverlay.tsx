"use client";

// Simple CSS-based Noise Grain
export default function GrainOverlay() {
    return (
        <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.35] mix-blend-multiply">
            {/* SVG Noise Filter */}
            <svg className="w-full h-full opacity-100">
                <filter id="noise">
                    <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
                </filter>
                <rect width="100%" height="100%" filter="url(#noise)" />
            </svg>
        </div>
    );
}
