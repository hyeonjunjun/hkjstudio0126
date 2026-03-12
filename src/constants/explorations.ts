export interface ExplorationItem {
  id: string;
  type: "image" | "text" | "code" | "pattern";
  content: string;
  label?: string;
  position: { x: number; y: number };
  size: { width: number; height?: number };
  rotation?: number;
  parallaxRate?: number;
}

export const EXPLORATIONS: ExplorationItem[] = [
  {
    id: "gyeol-study",
    type: "image",
    content: "/images/sift-v2.jpg",
    label: "GYEOL — Coming Soon",
    position: { x: 10, y: 5 },
    size: { width: 280, height: 180 },
    rotation: -1.5,
    parallaxRate: 0.3,
  },
  {
    id: "materiality-quote",
    type: "text",
    content: "A study in digital materiality and perceived textures.",
    label: "Material Science",
    position: { x: 55, y: 12 },
    size: { width: 320 },
    rotation: 0,
    parallaxRate: 0.5,
  },
  {
    id: "texture-studies",
    type: "image",
    content: "/images/caliper-main.png",
    label: "Texture Studies",
    position: { x: 35, y: 30 },
    size: { width: 360, height: 240 },
    rotation: 0.8,
    parallaxRate: 0.2,
  },
  {
    id: "process-note",
    type: "text",
    content: "The weight of a typeface. The easing curve on a transition. The half-second between a click and a response.",
    label: "Process",
    position: { x: 5, y: 45 },
    size: { width: 280 },
    rotation: -90,
    parallaxRate: 0.6,
  },
  {
    id: "code-snippet",
    type: "code",
    content: "gsap.to(el, {\n  opacity: 1,\n  y: 0,\n  duration: 0.6,\n  ease: 'power2.out'\n});",
    label: "Motion",
    position: { x: 65, y: 50 },
    size: { width: 260 },
    rotation: 0,
    parallaxRate: 0.4,
  },
  {
    id: "interface-sketch",
    type: "image",
    content: "/images/verbaitim-hero.png",
    label: "Interface Archaeology",
    position: { x: 20, y: 65 },
    size: { width: 300, height: 200 },
    rotation: 1.2,
    parallaxRate: 0.35,
  },
  {
    id: "atelier-thought",
    type: "text",
    content: "Unfinished thoughts, deliberate accidents.",
    position: { x: 60, y: 78 },
    size: { width: 300 },
    rotation: 0,
    parallaxRate: 0.55,
  },
  {
    id: "dot-pattern",
    type: "pattern",
    content: "dot-matrix",
    label: "Nothing OS",
    position: { x: 75, y: 35 },
    size: { width: 120, height: 120 },
    rotation: 0,
    parallaxRate: 0.7,
  },
];
