import TypeSelector from "./type-selector";
import Angle from "./angle";
import StopRow from "./stop-row";
import { useGradientStore } from "@/components/gradient-editor/store";

export default function ControlsPanel() {
  const stops = useGradientStore((s) => s.stops);
  return (
    <section className="px-4 max-w-68">
      <div className="flex gap-2 justify-between items-center">
        <TypeSelector />
        <Angle />
      </div>

      <div className="pt-4 flex flex-col gap-2">
        <h4 className="text-sm text-muted-foreground">Stops</h4>
        {stops.map((item) => (
          <StopRow key={item.id} {...item} />
        ))}
      </div>
    </section>
  );
}
