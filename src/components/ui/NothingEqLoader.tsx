"use client";

import { useEffect, useState, useCallback } from "react";
import { useAudioStore } from "@/lib/audioStore";

/**
 * A strict, segmented equalizer loader inspired by Nothing OS's dot-matrix displays.
 * Instead of smooth CSS height transitions, it snaps discrete blocks to simulate hardware polling.
 */

interface Props {
  className?: string;
  bars?: number;
  segmentsPerBar?: number;
  intervalMs?: number;
  /** Pixel size of each segment square */
  size?: number;
  /** Gap between segments in pixels */
  gap?: number;
  /** When true, mouse position biases bar levels toward cursor side */
  mouseReactive?: boolean;
}

export default function NothingEqLoader({
  className = "",
  bars = 4,
  segmentsPerBar = 4,
  intervalMs = 120,
  size = 6,
  gap = 3,
  mouseReactive = false,
}: Props) {
  const [levels, setLevels] = useState<number[]>(Array(bars).fill(0));
  const [mouseX, setMouseX] = useState<number | null>(null);
  const [containerLeft, setContainerLeft] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);

  const { analyser, isPlaying } = useAudioStore();

  const containerRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (!node) return;
      const rect = node.getBoundingClientRect();
      setContainerLeft(rect.left);
      setContainerWidth(rect.width);
    },
    []
  );

  useEffect(() => {
    if (!mouseReactive) return;
    const onMove = (e: MouseEvent) => setMouseX(e.clientX);
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [mouseReactive]);

  useEffect(() => {
    let animationFrame: number;
    let lastUpdate = 0;
    
    // We only need the data array if we have an analyser
    const dataArray = analyser ? new Uint8Array(analyser.frequencyBinCount) : null;

    const tick = (timestamp: number) => {
      // If audio is playing, update every frame for smoothness
      // If ambient/paused, use the intervalMs for the "chunky" hardware feel
      const shouldUpdate = (isPlaying && analyser) || (timestamp - lastUpdate > intervalMs);

      if (shouldUpdate) {
        if (isPlaying && analyser && dataArray) {
          analyser.getByteFrequencyData(dataArray);
          
          setLevels((prev) => {
            return prev.map((_, barIndex) => {
              // Group frequencies into bins for each bar
              // We skip the very lowest and highest frequencies to focus on the energetic midrange
              const startBin = Math.floor((barIndex / bars) * (dataArray.length * 0.5));
              const endBin = Math.floor(((barIndex + 1) / bars) * (dataArray.length * 0.5));
              
              let sum = 0;
              for (let i = startBin; i < endBin; i++) {
                sum += dataArray[i];
              }
              const average = sum / (endBin - startBin || 1);
              
              // Normalize to segments
              // 255 is the max value from getByteFrequencyData
              const rawLevel = (average / 255) * segmentsPerBar;
              
              // Add a little extra boost to make it look active
              return Math.min(Math.floor(rawLevel * 1.5), segmentsPerBar);
            });
          });
        } else {
          // Ambient / Paused state
          setLevels((prev) =>
            prev.map((_, barIndex) => {
              const maxLevel = segmentsPerBar;

              if (mouseReactive && mouseX !== null && containerWidth > 0) {
                const barCenterX =
                  containerLeft + (barIndex / Math.max(bars - 1, 1)) * containerWidth;
                const distance = Math.abs(mouseX - barCenterX);
                const proximity = Math.max(0, 1 - distance / 300);
                const boost = Math.floor(proximity * segmentsPerBar * 0.6);
                const base = Math.floor(Math.random() * (segmentsPerBar * 0.5 + 1));
                return Math.min(base + boost, maxLevel);
              }

              return Math.floor(Math.random() * (maxLevel * 0.6 + 1)); // Lower ambient height
            })
          );
        }
        lastUpdate = timestamp;
      }
      animationFrame = requestAnimationFrame(tick);
    };

    animationFrame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animationFrame);
  }, [bars, segmentsPerBar, intervalMs, mouseReactive, mouseX, containerLeft, containerWidth, analyser, isPlaying]);

  return (
    <div
      ref={containerRef}
      className={`flex items-end ${className}`}
      style={{ gap: `${gap}px` }}
    >
      {levels.map((level, barIndex) => (
        <div
          key={barIndex}
          className="flex flex-col-reverse"
          style={{ gap: `${gap}px` }}
        >
          {Array.from({ length: segmentsPerBar }).map((_, segmentIndex) => {
            const isActive = segmentIndex < level;
            return (
              <div
                key={segmentIndex}
                className="rounded-[1px] transition-colors duration-75"
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                  backgroundColor: isActive
                    ? "rgba(255, 255, 255, 0.9)"
                    : "rgba(255, 255, 255, 0.08)",
                }}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}
