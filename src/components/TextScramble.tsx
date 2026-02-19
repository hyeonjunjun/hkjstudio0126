"use client";

import { useState, useRef } from "react";

const CHARS = "-_~`!@#$%^&*()+=[]{}|;:,.<>?/";

interface TextScrambleProps {
    children: string;
    className?: string;
}

export default function TextScramble({ children, className }: TextScrambleProps) {
    const [displayText, setDisplayText] = useState(children);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const scramble = () => {
        let iteration = 0;

        if (intervalRef.current) clearInterval(intervalRef.current);

        intervalRef.current = setInterval(() => {
            setDisplayText((prev) =>
                children
                    .split("")
                    .map((char, index) => {
                        if (index < iteration) {
                            return children[index];
                        }
                        // Keep spaces as spaces for layout stability
                        if (char === " ") return " ";
                        return CHARS[Math.floor(Math.random() * CHARS.length)];
                    })
                    .join("")
            );

            if (iteration >= children.length) {
                if (intervalRef.current) clearInterval(intervalRef.current);
            }

            iteration += 1 / 3; // Adjust speed here (lower divisor = faster)
        }, 30);
    };

    return (
        <span
            className={className}
            onMouseEnter={scramble}
            style={{ cursor: "default", display: "inline-block" }}
        >
            {displayText}
        </span>
    );
}
