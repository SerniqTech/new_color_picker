import { GRADIENT_PRESETS } from "@/lib/gradient-presets-data";
import { useGradientStore } from "@/components/gradient-editor/store";

export default function Presets() {
  const applyPreset = useGradientStore((s) => s.applyPreset);

  return (
    <div className="flex flex-wrap gap-2">
      {GRADIENT_PRESETS.map((preset) => (
        <div
          key={preset.id}
          onClick={() => applyPreset(preset)}
          className="rounded-md border p-1 text-left hover:bg-muted transition"
        >
          <div
            className="h-18 w-18 rounded mb-2"
            style={{
              background:
                preset.type === "linear-gradient"
                  ? `linear-gradient(${preset.angle}deg, ${preset.stops
                      .map(
                        (s) =>
                          `rgba(${s.color.r},${s.color.g},${s.color.b},${s.color.a}) ${s.percent}%`
                      )
                      .join(", ")})`
                  : `radial-gradient(${preset.stops
                      .map(
                        (s) =>
                          `rgba(${s.color.r},${s.color.g},${s.color.b},${s.color.a}) ${s.percent}%`
                      )
                      .join(", ")})`,
            }}
          />
          <div className="text-xs text-center font-medium">{preset.name}</div>
        </div>
      ))}
    </div>
  );
}
