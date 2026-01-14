import type { RgbaColor } from "react-colorful";
import { Stop } from "@/components/gradient-editor/store";

export function rgbaToHexa({ r, g, b, a }: RgbaColor) {
  const alpha = Math.round(a * 255)
    .toString(16)
    .padStart(2, "0");

  return (
    "#" + [r, g, b].map((x) => x.toString(16).padStart(2, "0")).join("") + alpha
  );
}

export function hexaToRgba(hex: string): RgbaColor | null {
  if (!hex) return null;

  const clean = hex.replace("#", "").trim();

  // RRGGBB
  if (/^[0-9A-Fa-f]{6}$/.test(clean)) {
    return {
      r: parseInt(clean.slice(0, 2), 16),
      g: parseInt(clean.slice(2, 4), 16),
      b: parseInt(clean.slice(4, 6), 16),
      a: 1, // 👈 default alpha
    };
  }

  // RRGGBBAA
  if (/^[0-9A-Fa-f]{8}$/.test(clean)) {
    return {
      r: parseInt(clean.slice(0, 2), 16),
      g: parseInt(clean.slice(2, 4), 16),
      b: parseInt(clean.slice(4, 6), 16),
      a: parseInt(clean.slice(6, 8), 16) / 255,
    };
  }

  return null;
}

export function rgbaToCss({ r, g, b, a }: RgbaColor) {
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}

export async function screenEyePicker(): Promise<RgbaColor | null> {
  if (!("EyeDropper" in window)) {
    alert("Eyedropper is not supported in this browser");
    return null;
  }

  try {
    // @ts-expect-error - EyeDropper is not yet in TS lib.dom
    const eyeDropper = new window.EyeDropper();
    const result = await eyeDropper.open();

    return hexaToRgba(result.sRGBHex);
  } catch (err) {
    console.log(err);
    return null;
  }
}

export const pxToPercent = (x: number, width: number) =>
  Math.round((x / width) * 100);
export const percentToPx = (percent: number, width: number) =>
  (percent / 100) * width;

export const buildLinearGradientImages = (stops: Stop[]) => {
  if (stops.length === 0) return "none";

  const gradient = `linear-gradient(
    to right,
    ${stops.map((s) => `${rgbaToCss(s.color)} ${s.percent}%`).join(", ")}
  )`;

  const checkerboard = "repeating-conic-gradient(#eee 0% 25%, #ccc 0% 50%)";

  return `${gradient}, ${checkerboard}`;
};

type ColorInput = string | RgbaColor;

export function normalizeToRgba(input: ColorInput): RgbaColor | null {
  if (!input) return null;

  // Already RGBA
  if (typeof input === "object") {
    return {
      r: input.r,
      g: input.g,
      b: input.b,
      a: input.a ?? 1,
    };
  }

  // String → hex / hexa
  return hexaToRgba(input);
}

export function rgbaToOpaqueCss({ r, g, b }: RgbaColor) {
  return `rgb(${r}, ${g}, ${b})`;
}
