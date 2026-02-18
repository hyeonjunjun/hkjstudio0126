"use client";

import { motion } from "framer-motion";

interface ViewToggleProps {
    viewMode: "editorial" | "schematic";
    onChange: (mode: "editorial" | "schematic") => void;
}

export default function ViewToggle({ viewMode, onChange }: ViewToggleProps) {
    return (
        <div className="fixed bottom-12 left-1/2 -translate-x-1/2 z-50 flex items-center gap-0 bg-background/80 backdrop-blur-md rounded-full border border-border p-1">
            <ToggleOption
                label="EMOTION"
                isActive={viewMode === "editorial"}
                onClick={() => onChange("editorial")}
            />
            <div className="w-[1px] h-4 bg-border mx-1" />
            <ToggleOption
                label="LOGIC"
                isActive={viewMode === "schematic"}
                onClick={() => onChange("schematic")}
            />
        </div>
    );
}

function ToggleOption({
    label,
    isActive,
    onClick,
}: {
    label: string;
    isActive: boolean;
    onClick: () => void;
}) {
    return (
        <button
            onClick={onClick}
            className={`relative px-6 py-2 text-xs font-mono tracking-widest transition-colors duration-300 ${isActive ? "text-background" : "text-muted-foreground hover:text-foreground"
                }`}
        >
            {isActive && (
                <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-foreground rounded-full"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
            )}
            <span className="relative z-10">{label}</span>
        </button>
    );
}
