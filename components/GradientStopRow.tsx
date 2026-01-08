"use client";

import { IoMdClose } from "react-icons/io";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type GradientStopRowProps = {
  color: string;
  position: number;
  isActive?: boolean;
  onColorClick?: () => void;
  onColorChange?: (value: string) => void;
  onPositionChange?: (value: number) => void;
  onRemove?: () => void;
};

export default function GradientStopRow({
  color,
  position,
  isActive = false,
  onColorClick,
  onColorChange,
  onPositionChange,
  onRemove,
}: GradientStopRowProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-lg  p-1 transition",
        isActive && "border-2 border-blue-500"
      )}
    >
      {/* Color Swatch */}
      <button
        type="button"
        aria-label="Change color"
        onClick={onColorClick}
        className="relative h-10 w-10 rounded-md border-2 border-white shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
        style={{ backgroundColor: color }}
      >
        <span className="pointer-events-none absolute inset-0 rounded-md ring-1 ring-black/10" />
      </button>

      {/* Hex Input */}
      <Input
        value={color.toUpperCase()}
        onChange={(e) => onColorChange?.(e.target.value)}
        className="w-28 font-mono"
        spellCheck={false}
      />

      {/* Position Input */}
      <Input
        type="number"
        min={0}
        max={100}
        value={position}
        onChange={(e) => onPositionChange?.(+e.target.value)}
        className="w-20"
      />

      {/* Remove */}
      <Button
        variant="ghost"
        size="icon"
        onClick={onRemove}
        aria-label="Remove stop"
        className="text-muted-foreground hover:text-destructive"
      >
        <IoMdClose className="h-5 w-5" />
      </Button>
    </div>
  );
}
