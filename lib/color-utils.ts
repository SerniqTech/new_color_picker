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

export const buildGradientImages = (
  stops: Stop[],
  type = "linear-gradient",
  angle = 90
) => {
  if (stops.length === 0) return "none";

  const sorted = [...stops].sort((a, b) => a.percent - b.percent);

  const gradient = `${type}(
    ${type === "linear-gradient" ? `${angle}deg` : "circle"},
    ${sorted.map((s) => `${rgbaToCss(s.color)} ${s.percent}%`).join(", ")}
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

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export function interpolateColor(
  c1: RgbaColor,
  c2: RgbaColor,
  t: number
): RgbaColor {
  return {
    r: Math.round(lerp(c1.r, c2.r, t)),
    g: Math.round(lerp(c1.g, c2.g, t)),
    b: Math.round(lerp(c1.b, c2.b, t)),
    a: lerp(c1.a, c2.a, t),
  };
}

export function getColorAtPercent(stops: Stop[], percent: number): RgbaColor {
  const sorted = [...stops].sort((a, b) => a.percent - b.percent);

  // Before first stop
  if (percent <= sorted[0].percent) {
    return sorted[0].color;
  }

  // After last stop
  if (percent >= sorted[sorted.length - 1].percent) {
    return sorted[sorted.length - 1].color;
  }

  // Between two stops
  for (let i = 0; i < sorted.length - 1; i++) {
    const left = sorted[i];
    const right = sorted[i + 1];

    if (percent >= left.percent && percent <= right.percent) {
      const range = right.percent - left.percent;
      const t = (percent - left.percent) / range;
      return interpolateColor(left.color, right.color, t);
    }
  }

  // Fallback (should never happen)
  return sorted[0].color;
}
