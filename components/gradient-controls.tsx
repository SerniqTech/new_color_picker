import { GradientType } from "./gradient-editor";
import GradientTypeSelector from "./gradient-type-selector";
import GradientAngle from "./gradient-angle";
import GradientStopRow from "./gradient-stop-row";
import { useGradientStops } from "@/store/gradient-editor.store";

export function GradientControls({
  type,
  onTypeChange,
}: {
  type: GradientType;
  onTypeChange: (t: GradientType) => void;
}) {
  const stops = useGradientStops((state) => state.stops);
  return (
    <section className="px-4 max-w-xs">
      <div className="flex gap-6 justify-between items-start">
        {/* Type */}
        <GradientTypeSelector type={type} onTypeChange={onTypeChange} />
        {/* Angle */}
        <GradientAngle type={type} />
      </div>

      {/* Stops */}
      <div className="pt-4 flex flex-col gap-2">
        <h4 className="text-sm text-muted-foreground">Stops</h4>
        {stops.map((item) => (
          <GradientStopRow key={item.id} {...item} />
        ))}
      </div>
    </section>
  );
}
