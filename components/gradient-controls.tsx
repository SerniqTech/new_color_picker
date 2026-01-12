import GradientTypeSelector from "./gradient-type-selector";
import GradientAngle from "./gradient-angle";
import GradientStopRow from "./gradient-stop-row";
import { useGradientStore } from "@/store/gradient-editor.store";

export function GradientControls() {
  const stops = useGradientStore((s) => s.stops);
  return (
    <section className="px-4 max-w-xs">
      <div className="flex gap-6 justify-between items-start">
        {/* Type */}
        <GradientTypeSelector />
        {/* Angle */}
        <GradientAngle/>
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
