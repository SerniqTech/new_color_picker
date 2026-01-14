"use client";

import { IoMdClose } from "react-icons/io";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useGradientStore } from "@/components/gradient-editor/store";
import { rgbaToHexa, hexaToRgba } from "@/lib/color-utils";
import { RgbaColor } from "react-colorful";
import { useState, ChangeEvent } from "react";

type GradientStopRowProps = {
  id: string;
  color: RgbaColor;
  percent: number;
};

export default function StopRow({ id, color, percent }: GradientStopRowProps) {
  const initialHexColor = rgbaToHexa(color);
  const [hexDraft, setHexDraft] = useState<string | null>(null);
  const shouldRowsDisabled = useGradientStore((s) => s.stops.length <= 2);
  const activeStopId = useGradientStore((s) => s.activeStop);
  const setActiveStop = useGradientStore((s) => s.setActiveStop);
  const moveStop = useGradientStore((s) => s.moveStop);
  const removeStop = useGradientStore((s) => s.removeStop);
  const setStopColor = useGradientStore((s) => s.setStopColor);

  const hexValue = rgbaToHexa(color);

  const handleHexChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setHexDraft(value);

    if (!value) return;

    const parsed = hexaToRgba(value);
    if (!parsed) return;

    setStopColor(id, parsed);
  };

  return (
    <div
      className={cn(
        "flex items-center gap-1 rounded-lg  p-1 transition",
        activeStopId === id && "border-2 border-blue-500"
      )}
      onClick={() => setActiveStop(id)}
    >
      {/* Color Swatch */}
      <button
        type="button"
        aria-label="Change color"
        className="relative min-h-9 min-w-9 rounded-md border-2 border-white shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
        style={{ backgroundColor: initialHexColor }}
      >
        <span className="pointer-events-none absolute inset-0 rounded-md ring-1 ring-black/10" />
      </button>

      {/* Hex Input */}
      <Input
        value={hexDraft ?? hexValue}
        onChange={handleHexChange}
        className="w-28 px-1 font-mono text-center"
        spellCheck={false}
        onBlur={() => setHexDraft(null)}
      />

      {/* Position Input */}
      <Input
        type="number"
        min={0}
        max={100}
        value={percent}
        onChange={(e) => {
          const val = e.target.value;
          if (val === "") return;
          const num = Number(val);
          if (!Number.isNaN(num)) {
            moveStop(id, Math.min(100, Math.max(0, num)));
          }
        }}
        className="w-14 text-center"
      />

      {/* Remove */}
      <Button
        variant="ghost"
        size="icon"
        onClick={(e) => {
          e.preventDefault();
          removeStop(id);
        }}
        disabled={shouldRowsDisabled}
        aria-label="Remove stop"
        className="text-muted-foreground hover:text-destructive"
      >
        <IoMdClose className="h-5 w-5" />
      </Button>
    </div>
  );
}
