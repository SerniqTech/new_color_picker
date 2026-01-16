"use client";

import { useEffect, useRef, useState } from "react";
import ImageDropzone from "../image-dropzone";
import { rgbaToCss, rgbaToHexa } from "@/lib/color-utils";
import type { RgbaColor } from "react-colorful";

const MAG_SIZE = 80; // visible magnifier size
const ZOOM = 2; // zoom factor

export default function ImageColorSelection() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [pickedColor, setPickedColor] = useState<RgbaColor | null>(null);
  const [hover, setHover] = useState(false);
  const [cursor, setCursor] = useState<{ x: number; y: number } | null>(null);

  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const sourceCanvasRef = useRef<HTMLCanvasElement>(null);
  const magnifierCanvasRef = useRef<HTMLCanvasElement>(null);

  /* cleanup blob URL */
  useEffect(() => {
    return () => {
      if (imageUrl) URL.revokeObjectURL(imageUrl);
    };
  }, [imageUrl]);

  /* draw image into offscreen canvas */
  const syncSourceCanvas = () => {
    const img = imgRef.current;
    const canvas = sourceCanvasRef.current;
    if (!img || !canvas) return;

    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.drawImage(img, 0, 0);
  };

  /* map mouse → image pixel coords (object-contain safe) */
  const getImagePixel = (clientX: number, clientY: number) => {
    const img = imgRef.current;
    const container = containerRef.current;
    if (!img || !container) return null;

    const rect = container.getBoundingClientRect();

    const scale = Math.min(
      rect.width / img.naturalWidth,
      rect.height / img.naturalHeight
    );

    const renderedWidth = img.naturalWidth * scale;
    const renderedHeight = img.naturalHeight * scale;

    const offsetX = (rect.width - renderedWidth) / 2;
    const offsetY = (rect.height - renderedHeight) / 2;

    const x = clientX - rect.left - offsetX;
    const y = clientY - rect.top - offsetY;

    if (x < 0 || y < 0 || x > renderedWidth || y > renderedHeight) {
      return null;
    }

    return {
      px: Math.floor(x / scale),
      py: Math.floor(y / scale),
      cx: clientX - rect.left,
      cy: clientY - rect.top,
    };
  };

  /* draw magnifier */
  const drawMagnifier = (px: number, py: number) => {
    const src = sourceCanvasRef.current;
    const mag = magnifierCanvasRef.current;
    if (!src || !mag) return;

    const ctx = mag.getContext("2d");
    if (!ctx) return;

    const sample = MAG_SIZE / ZOOM;

    ctx.clearRect(0, 0, MAG_SIZE, MAG_SIZE);
    ctx.imageSmoothingEnabled = false;

    ctx.drawImage(
      src,
      px - sample / 2,
      py - sample / 2,
      sample,
      sample,
      0,
      0,
      MAG_SIZE,
      MAG_SIZE
    );

    ctx.lineWidth = 0.8;
    // draw black outline (thick)
    ctx.strokeStyle = "rgba(255,255,255,0.8)";
    ctx.strokeRect(
      MAG_SIZE / 2 - ZOOM / 2 - 0.5,
      MAG_SIZE / 2 - ZOOM / 2 - 0.5,
      ZOOM + 4,
      ZOOM + 4
    );

    ctx.strokeStyle = "rgba(0,0,0,0.8)";
    ctx.strokeRect(
      MAG_SIZE / 2 - ZOOM / 2,
      MAG_SIZE / 2 - ZOOM / 2,
      ZOOM + 3,
      ZOOM + 3
    );

    // circular mask
    ctx.globalCompositeOperation = "destination-in";
    ctx.beginPath();
    ctx.arc(MAG_SIZE / 2, MAG_SIZE / 2, MAG_SIZE / 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalCompositeOperation = "source-over";
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const data = getImagePixel(e.clientX, e.clientY);
    if (!data) return;

    setCursor({ x: data.cx, y: data.cy });
    drawMagnifier(data.px, data.py);
  };

  const handlePickColor = (e: React.MouseEvent) => {
    const src = sourceCanvasRef.current;
    if (!src) return;

    const data = getImagePixel(e.clientX, e.clientY);
    if (!data) return;

    const ctx = src.getContext("2d");
    if (!ctx) return;

    const pixel = ctx.getImageData(data.px, data.py, 1, 1).data;

    setPickedColor({
      r: pixel[0],
      g: pixel[1],
      b: pixel[2],
      a: pixel[3] / 255,
    });
  };

  /* ------------------ UI ------------------ */

  if (!imageUrl) {
    return (
      <ImageDropzone
        onFileSelect={(file) => setImageUrl(URL.createObjectURL(file))}
      />
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-sm text-muted-foreground">Pick Colors</h3>

      <div className="flex gap-4">
        {/* image + magnifier */}
        <div
          ref={containerRef}
          className="relative flex-1 rounded-lg overflow-hidden bg-muted"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => {
            setHover(false);
            setCursor(null);
          }}
          onMouseMove={handleMouseMove}
          onClick={handlePickColor}
        >
          <img
            ref={imgRef}
            src={imageUrl}
            onLoad={syncSourceCanvas}
            alt="preview"
            className="h-full w-full object-contain cursor-none"
          />

          {hover && cursor && (
            <canvas
              ref={magnifierCanvasRef}
              width={MAG_SIZE}
              height={MAG_SIZE}
              className="pointer-events-none absolute rounded-full border-4 border-red-400 shadow-xl"
              style={{
                // borderColor:rgbaToCss(pickedColor),
                left: cursor.x - MAG_SIZE / 2,
                top: cursor.y - MAG_SIZE / 2,
              }}
            />
          )}
        </div>

        {/* side panel */}
        <div className="w-32 space-y-2">
          <div
            className="h-24 w-full rounded-lg border"
            style={{
              backgroundColor: pickedColor
                ? `rgba(${pickedColor.r},${pickedColor.g},${pickedColor.b},${pickedColor.a})`
                : "#000",
            }}
          />
          <div className="rounded-md bg-muted px-2 py-1 text-center font-mono text-sm">
            {pickedColor ? rgbaToHexa(pickedColor) : "#000000"}
          </div>
        </div>
      </div>

      {/* offscreen canvas */}
      <canvas ref={sourceCanvasRef} className="hidden" />
    </div>
  );
}
