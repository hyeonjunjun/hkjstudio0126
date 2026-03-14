"use client";

import { useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";

/**
 * VideoShowcase — B-Roll Video Grid
 *
 * Cinematic inline video playback for case study pages.
 * - Muted autoplay, loop, scroll-triggered play/pause
 * - IntersectionObserver drives playback (play when visible, pause when not)
 * - Staggered grid layout with optional captions
 * - Matches warm typographic gallery aesthetic
 */

export interface VideoClip {
  src: string;
  poster?: string;
  caption?: string;
  aspect?: string; // e.g., "16/9", "9/16", "1/1", "4/3"
}

interface VideoShowcaseProps {
  videos: VideoClip[];
}

function VideoCard({ clip, index }: { clip: VideoClip; index: number }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Scroll-triggered play/pause via IntersectionObserver
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  const aspect = clip.aspect || "16/9";

  return (
    <motion.div
      className="relative overflow-hidden group"
      style={{ aspectRatio: aspect }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
    >
      <video
        ref={videoRef}
        src={clip.src}
        poster={clip.poster}
        muted
        loop
        playsInline
        preload="metadata"
        className="w-full h-full object-cover"
      />

      {/* Caption overlay */}
      {clip.caption && (
        <div
          className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 100%)",
          }}
        >
          <span
            className="font-mono uppercase"
            style={{
              fontSize: "var(--text-micro)",
              letterSpacing: "0.15em",
              color: "rgba(255,255,255,0.8)",
            }}
          >
            {clip.caption}
          </span>
        </div>
      )}
    </motion.div>
  );
}

export default function VideoShowcase({ videos }: VideoShowcaseProps) {
  if (!videos || videos.length === 0) return null;

  // Single video: full width
  if (videos.length === 1) {
    return (
      <div className="space-y-3">
        <VideoCard clip={videos[0]} index={0} />
      </div>
    );
  }

  // Two videos: side by side
  if (videos.length === 2) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {videos.map((clip, i) => (
          <VideoCard key={clip.src} clip={clip} index={i} />
        ))}
      </div>
    );
  }

  // 3+ videos: first full-width, rest in 2-col grid
  return (
    <div className="space-y-4">
      <VideoCard clip={videos[0]} index={0} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {videos.slice(1).map((clip, i) => (
          <VideoCard key={clip.src} clip={clip} index={i + 1} />
        ))}
      </div>
    </div>
  );
}
