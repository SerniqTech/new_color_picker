// data/gradient-presets.ts
import {
  GradientType,
  GradientPreset,
} from "@/components/gradient-editor/store";

export const GRADIENT_PRESETS: GradientPreset[] = [
  {
    id: "sunset",
    name: "Sunset",
    type: GradientType.LINEAR,
    angle: 90,
    stops: [
      { percent: 0, color: { r: 255, g: 94, b: 98, a: 1 } },
      { percent: 50, color: { r: 255, g: 195, b: 113, a: 1 } },
      { percent: 100, color: { r: 255, g: 240, b: 200, a: 1 } },
    ],
  },
  {
    id: "purple-pink",
    name: "Purple Pink",
    type: GradientType.LINEAR,
    angle: 135,
    stops: [
      { percent: 0, color: { r: 168, g: 50, b: 121, a: 1 } },
      { percent: 100, color: { r: 89, g: 29, b: 165, a: 1 } },
    ],
  },
  {
    id: "radial-glow",
    name: "Radial Glow",
    type: GradientType.RADIAL,
    angle: 0,
    stops: [
      { percent: 0, color: { r: 255, g: 255, b: 255, a: 1 } },
      { percent: 100, color: { r: 30, g: 30, b: 30, a: 1 } },
    ],
  },
  {
    id: "ocean-blue",
    name: "Ocean Blue",
    type: GradientType.LINEAR,
    angle: 120,
    stops: [
      { percent: 0, color: { r: 0, g: 198, b: 251, a: 1 } },
      { percent: 100, color: { r: 0, g: 91, b: 234, a: 1 } },
    ],
  },
  {
    id: "mint-lime",
    name: "Mint Lime",
    type: GradientType.LINEAR,
    angle: 90,
    stops: [
      { percent: 0, color: { r: 168, g: 255, b: 120, a: 1 } },
      { percent: 100, color: { r: 61, g: 217, b: 245, a: 1 } },
    ],
  },
  {
    id: "dark-matter",
    name: "Dark Matter",
    type: GradientType.LINEAR,
    angle: 135,
    stops: [
      { percent: 0, color: { r: 25, g: 25, b: 25, a: 1 } },
      { percent: 100, color: { r: 72, g: 61, b: 139, a: 1 } },
    ],
  },
  {
    id: "fire-ember",
    name: "Fire Ember",
    type: GradientType.LINEAR,
    angle: 45,
    stops: [
      { percent: 0, color: { r: 255, g: 65, b: 65, a: 1 } },
      { percent: 50, color: { r: 255, g: 165, b: 0, a: 1 } },
      { percent: 100, color: { r: 255, g: 230, b: 128, a: 1 } },
    ],
  },
  {
    id: "aurora",
    name: "Aurora",
    type: GradientType.LINEAR,
    angle: 160,
    stops: [
      { percent: 0, color: { r: 72, g: 85, b: 255, a: 1 } },
      { percent: 50, color: { r: 120, g: 255, b: 214, a: 1 } },
      { percent: 100, color: { r: 183, g: 255, b: 189, a: 1 } },
    ],
  },
  {
    id: "rose-gold",
    name: "Rose Gold",
    type: GradientType.LINEAR,
    angle: 135,
    stops: [
      { percent: 0, color: { r: 248, g: 181, b: 188, a: 1 } },
      { percent: 100, color: { r: 180, g: 122, b: 148, a: 1 } },
    ],
  },
  {
    id: "deep-space",
    name: "Deep Space",
    type: GradientType.RADIAL,
    angle: 0,
    stops: [
      { percent: 0, color: { r: 44, g: 62, b: 80, a: 1 } },
      { percent: 100, color: { r: 0, g: 0, b: 0, a: 1 } },
    ],
  },
  {
    id: "sky-dawn",
    name: "Sky Dawn",
    type: GradientType.LINEAR,
    angle: 180,
    stops: [
      { percent: 0, color: { r: 135, g: 206, b: 235, a: 1 } },
      { percent: 100, color: { r: 255, g: 183, b: 197, a: 1 } },
    ],
  },
  {
    id: "neon-citrus",
    name: "Neon Citrus",
    type: GradientType.LINEAR,
    angle: 60,
    stops: [
      { percent: 0, color: { r: 57, g: 255, b: 20, a: 1 } },
      { percent: 100, color: { r: 255, g: 247, b: 0, a: 1 } },
    ],
  },
];
