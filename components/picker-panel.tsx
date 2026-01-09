import { Button } from "./ui/button";
import { RgbaColorPicker, RgbaColor } from "react-colorful";
import { Input } from "./ui/input";
import { PiEyedropperLight } from "react-icons/pi";
import { hexToRgba, rgbaToHex, screenEyePicker } from "@/lib/color-utils";
import { ChangeEvent, useEffect, useState } from "react";

type PickerPanelProps = {
  color: RgbaColor;
  onChange: (c: RgbaColor) => void;
};

const CHANNELS = ["r", "g", "b", "a"] as const;
type Channel = (typeof CHANNELS)[number];

export function PickerPanel({ color, onChange }: PickerPanelProps) {
  const [hexValue, setHexValue] = useState(() => rgbaToHex(color));

  useEffect(() => {
    setHexValue(rgbaToHex(color));
  }, [color]);

  const handleHexChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setHexValue(value);
    const next = hexToRgba(value, color.a);
    if (next) onChange(next);
  };

  const handleRgbaChange =
    (channel: Channel) => (e: ChangeEvent<HTMLInputElement>) => {
      const value = Number(e.target.value);
      if (Number.isNaN(value)) return;

      onChange({
        ...color,
        [channel]:
          channel === "a"
            ? Math.min(1, Math.max(0, value)) / 100
            : Math.min(255, Math.max(0, value)),
      });
    };

  const handleEyeDropperClick = async () => {
    const pickedColor = await screenEyePicker();
    if (pickedColor) onChange(pickedColor);
  };

  return (
    <section className="max-w-xl px-4">
      <h3 className="text-sm text-muted-foreground mb-2">Picker</h3>

      <div className="flex flex-col sm:flex-row gap-6">
        {/* Color Picker */}
        <div className="gradient-picker-one">
          <RgbaColorPicker color={color} onChange={onChange} />
        </div>

        {/* Inputs */}
        <div className="flex-1 space-y-4">
          <div>
            <label className="text-xs text-muted-foreground">HEX</label>
            <div className="flex justify-between gap-2">
              <Input className="w-24" value={hexValue} onChange={handleHexChange} />
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
                <label className="text-xs text-muted-foreground">{c.toUpperCase()}</label>
                <Input
                  className="p-2"
                  type="number"
                  disabled={c === "a"}
                  value={c === "a" ? Math.floor(color[c] * 100) : color[c]}
                  onChange={handleRgbaChange(c)}
                />
              </div>
            ))}
          </div>

          <div className="gradient-picker-two">
            <RgbaColorPicker color={color} onChange={onChange} />
          </div>
        </div>
      </div>
    </section>
  );
}
