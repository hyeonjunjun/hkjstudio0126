"use client";

import { useEffect, useRef, useState } from "react";
import { useAudioStore } from "@/lib/audioStore";
import { motion, AnimatePresence } from "framer-motion";

export default function AudioTransport() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);

  const {
    isPlaying,
    setIsPlaying,
    progress,
    setProgress,
    setAnalyser,
    setAudioElement,
    currentTrackName,
  } = useAudioStore();

  const [hasInteracted, setHasInteracted] = useState(false);

  // Initialize Web Audio API on first interaction
  const initAudio = () => {
    if (!audioRef.current) return;
    
    if (!audioCtxRef.current) {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      audioCtxRef.current = new AudioContext();
      
      analyserRef.current = audioCtxRef.current.createAnalyser();
      analyserRef.current.fftSize = 256; // Good resolution for visualizer
      analyserRef.current.smoothingTimeConstant = 0.8;
      
      sourceRef.current = audioCtxRef.current.createMediaElementSource(audioRef.current);
      sourceRef.current.connect(analyserRef.current);
      analyserRef.current.connect(audioCtxRef.current.destination);
      
      setAnalyser(analyserRef.current);
    }
    
    if (audioCtxRef.current.state === "suspended") {
      audioCtxRef.current.resume();
    }
  };

  const togglePlay = () => {
    if (!audioRef.current) return;
    
    if (!hasInteracted) {
      initAudio();
      setHasInteracted(true);
    }

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(e => console.error("Audio playback failed:", e));
    }
  };

  useEffect(() => {
    setAudioElement(audioRef.current);
  }, [setAudioElement]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onTimeUpdate = () => {
      setProgress(audio.currentTime / (audio.duration || 1));
    };
    const onEnded = () => {
      setIsPlaying(false);
      setProgress(0);
    };

    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("ended", onEnded);
    };
  }, [setIsPlaying, setProgress]);

  // Handle manual progress seek
  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current || !hasInteracted) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const clickProgress = Math.max(0, Math.min(1, x / rect.width));
    
    audioRef.current.currentTime = clickProgress * (audioRef.current.duration || 0);
  };

  // We only mount the visual transport bar if they've scrolled or interacted
  // Actually, keeping it always visible at the bottom is very TE style
  return (
    <>
      <audio
        ref={audioRef}
        // Placeholder audio track. The user can switch this out.
        src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
        preload="metadata"
        loop
        className="hidden"
      />

      <div className="fixed bottom-0 left-0 w-full z-50 bg-[var(--color-bg)] border-t border-[var(--color-border)] select-none">
        
        {/* Progress Line */}
        <div 
          className="absolute top-0 left-0 w-full h-[1px] bg-[var(--color-border)] cursor-pointer hover:h-[3px] transition-all"
          onClick={handleSeek}
        >
          <div 
            className="h-full bg-[var(--color-text)] origin-left"
            style={{ 
              transform: `scaleX(${progress})`,
              transition: isPlaying ? 'transform 100ms linear' : 'none'
            }}
          />
        </div>

        <div className="h-[36px] flex items-center justify-between px-4 sm:px-[var(--page-px)]">
          {/* Left: Play/Pause */}
          <button 
            onClick={togglePlay}
            className="flex items-center justify-center w-8 h-8 text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors focus:outline-none"
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? (
              // Pause Icon (Square/Bars)
              <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                <rect x="2" y="2" width="3" height="8" />
                <rect x="7" y="2" width="3" height="8" />
              </svg>
            ) : (
              // Play Icon (Triangle)
              <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                <path d="M3 2v8l7-4-7-4z" />
              </svg>
            )}
          </button>

          {/* Center: Track Info (TE style metadata) */}
          <div className="flex-1 flex justify-center items-center gap-4 text-[var(--text-micro)] font-mono text-[var(--color-text-dim)] uppercase tracking-widest hidden sm:flex">
            <span>{currentTrackName}</span>
            <span className="opacity-50">.WAV</span>
            <span className="w-1 h-1 rounded-full bg-[var(--color-accent)] animate-pulse" style={{ opacity: isPlaying ? 1 : 0 }} />
            <span>44.1kHz</span>
          </div>

          {/* Right: Master Label / Status */}
          <div className="text-[var(--text-micro)] font-mono text-[var(--color-text-ghost)] uppercase tracking-widest flex items-center gap-2">
            <span>MASTER</span>
            <div className="flex gap-[1px]">
              {/* Fake VU meter that just pulses when playing */}
              {[1, 2, 3, 4].map(i => (
                <div 
                  key={i} 
                  className="w-1 h-2 bg-current opacity-30 transition-all duration-75"
                  style={{ 
                    opacity: isPlaying && Math.random() > 0.5 ? 1 : 0.3,
                    animation: isPlaying ? `ping ${0.2 + i * 0.1}s infinite alternate` : 'none'
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
