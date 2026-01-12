import { ChangeEvent, useState, useEffect } from "react";
import { Button } from "./ui/button";
import { RgbaColorPicker, RgbaColor } from "react-colorful";
import { Input } from "./ui/input";
import { PiEyedropperLight } from "react-icons/pi";
import { hexToRgba, rgbaToHex, screenEyePicker } from "@/lib/color-utils";
import GradientAdjustableStrip from "./gradient-adjustable-strip";
import { useGradientStore } from "@/store/gradient-editor.store";

const CHANNELS = ["r", "g", "b", "a"] as const;
type Channel = (typeof CHANNELS)[number];
type Draft = {
  stopId: string;
  color: RgbaColor;
} | null;

export function PickerPanel() {
  const [draft, setDraft] = useState<Draft>(null);
  const activeStopId = useGradientStore((s) => s.activeStop);
  const stops = useGradientStore((s) => s.stops);
  const setStopColor = useGradientStore((s) => s.setStopColor);

  const activeStop = stops.find((stop) => stop.id === activeStopId);

  const [hexInput, setHexInput] = useState(() =>
    activeStop?.color ? rgbaToHex(activeStop.color) : ""
  );

  const effectiveColor =
    draft?.stopId === activeStopId ? draft.color : activeStop?.color;

  useEffect(() => {
    if (!draft) return;
    if (draft.stopId !== activeStopId) return;

    if (
      draft.color.r === activeStop?.color.r &&
      draft.color.g === activeStop?.color.g &&
      draft.color.b === activeStop?.color.b &&
      draft.color.a === activeStop?.color.a
    ) {
      return;
    }

    setStopColor(activeStopId, draft.color);
  }, [draft, activeStopId, activeStop, setStopColor]);

  const handleHexChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setHexInput(value);

    const parsed = hexToRgba(value, effectiveColor?.a ?? 1);
    if (!parsed) return;

    setDraft({
      stopId: activeStopId,
      color: parsed,
    });
  };

  const handleRgbaChange =
    (channel: Channel) => (e: ChangeEvent<HTMLInputElement>) => {
      const value = Number(e.target.value);
      if (Number.isNaN(value)) return;

      setStopColor(activeStopId, {
        ...(activeStop?.color ?? { r: 0, g: 0, b: 0, a: 1 }),
        [channel]:
          channel === "a"
            ? Math.min(1, Math.max(0, value)) / 100
            : Math.min(255, Math.max(0, value)),
      });
    };

  const handleEyeDropperClick = async () => {
    const pickedColor = await screenEyePicker();
    if (pickedColor) setStopColor(activeStopId, pickedColor);
  };

  return (
    <section className="max-w-xl px-4">
      <GradientAdjustableStrip />
      <h3 className="text-sm text-muted-foreground mb-2">Picker</h3>

      <div className="flex flex-col sm:flex-row gap-6">
        {/* Color Picker */}
        <div className="gradient-picker-one">
          <RgbaColorPicker
            color={effectiveColor}
            onChange={(color) => setDraft({ stopId: activeStopId, color })}
          />
        </div>

        {/* Inputs */}
        <div className="flex-1 space-y-4">
          <div>
            <label className="text-xs text-muted-foreground">HEX</label>
            <div className="flex justify-between gap-2">
              <Input
                className="w-24"
                value={hexInput}
                onChange={handleHexChange}
              />
              <Button
                size="icon"
                variant="outline"
                className="border-primary text-primary"
                onClick={handleEyeDropperClick}
              >
                <PiEyedropperLight />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-2">
            {CHANNELS.map((c) => (
              <div key={c}>
                <label className="text-xs text-muted-foreground">
                  {c.toUpperCase()}
                </label>
                <Input
                  className="p-2"
                  type="number"
                  disabled={c === "a"}
                  value={
                    c === "a"
                      ? Math.floor((activeStop?.color?.[c] ?? 0) * 100)
                      : activeStop?.color?.[c] ?? 0
                  }
                  onChange={handleRgbaChange(c)}
                />
              </div>
            ))}
          </div>

          <div className="gradient-picker-two">
            <RgbaColorPicker
              color={effectiveColor}
              onChange={(color) => setDraft({ stopId: activeStopId, color })}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
