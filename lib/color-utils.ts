import { RgbaColor } from "react-colorful";
import { Stop } from "@/store/gradient-editor.store";

export function rgbaToHex({ r, g, b }: RgbaColor) {
  return "#" + [r, g, b].map((x) => x.toString(16).padStart(2, "0")).join("");
}

export function hexToRgba(hex: string, alpha: number): RgbaColor | null {
  if (!/^#?[0-9A-Fa-f]{6}$/.test(hex)) return null;

  const clean = hex.replace("#", "");
  return {
    r: parseInt(clean.slice(0, 2), 16),
    g: parseInt(clean.slice(2, 4), 16),
    b: parseInt(clean.slice(4, 6), 16),
    a: alpha,
  };
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

    return hexToRgba(result.sRGBHex, 1);
  } catch (err) {
    console.log(err);
    return null;
  }
}

export const pxToPercent = (x: number, width: number) =>
  Math.round((x / width) * 100);
export const percentToPx = (percent: number, width: number) =>
  (percent / 100) * width;

export const buildLinearGradient = (stops: Stop[]) => {
  if (stops.length === 0) return "none";

  const sorted = [...stops].sort((a, b) => a.percent - b.percent);

  const colorStops = sorted.map((s) => `${s.color} ${s.percent}%`).join(", ");

  return `linear-gradient(to right, ${colorStops})`;
};
