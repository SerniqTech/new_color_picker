"use client";

import { IoMdClose } from "react-icons/io";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useGradientStops } from "@/store/gradient-editor.store";

type GradientStopRowProps = {
  id: string;
  color: string;
  percent: number;
  isActive?: boolean;
  onColorClick?: () => void;
  onColorChange?: (value: string) => void;
  onRemove?: () => void;
};

export default function GradientStopRow({
  id,
  color,
  percent,
  isActive = false,
  onColorClick,
  onColorChange,
  onRemove,
}: GradientStopRowProps) {
  const moveStop = useGradientStops((state) => state.moveStop);
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
        className="relative h-8 w-8 rounded-md border-2 border-white shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
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
        value={percent}
        onChange={(e) => {
          const val = e.target.value;
          if (val === "") return;
          const num = Number(val);
          if (!Number.isNaN(num)) {
            moveStop(id, Math.min(100, Math.max(0, num)));
          }
        }}
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
