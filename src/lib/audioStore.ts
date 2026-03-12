import { create } from "zustand";

interface AudioState {
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
  
  progress: number; // 0 to 1
  setProgress: (p: number) => void;
  
  duration: number;
  setDuration: (d: number) => void;
  
  currentTime: number;
  setCurrentTime: (t: number) => void;

  analyser: AnalyserNode | null;
  setAnalyser: (a: AnalyserNode | null) => void;

  audioElement: HTMLAudioElement | null;
  setAudioElement: (el: HTMLAudioElement | null) => void;

  currentTrackName: string;
  setCurrentTrackName: (name: string) => void;
}

export const useAudioStore = create<AudioState>((set) => ({
  isPlaying: false,
  setIsPlaying: (playing) => set({ isPlaying: playing }),
  
  progress: 0,
  setProgress: (p) => set({ progress: p }),
  
  duration: 0,
  setDuration: (d) => set({ duration: d }),

  currentTime: 0,
  setCurrentTime: (t) => set({ currentTime: t }),

  analyser: null,
  setAnalyser: (a) => set({ analyser: a }),

  audioElement: null,
  setAudioElement: (el) => set({ audioElement: el }),

  currentTrackName: "USER_TRACK_01.mp3",
  setCurrentTrackName: (name) => set({ currentTrackName: name }),
}));
