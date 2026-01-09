import { RgbaColor } from "react-colorful";

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
