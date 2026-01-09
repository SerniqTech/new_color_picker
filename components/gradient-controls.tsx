import { GradientType } from "./gradient-editor";
import GradientTypeSelector from "./gradient-type-selector";
import GradientAngle from "./gradient-Angle";
import GradientStopRow from "./gradient-stop-sow";

const colorStops = [
  {
    id: 1,
    color: "#ff0000",
    position: 0,
    isActive: true,
    onColorClick: () => console.log("Red clicked"),
    onColorChange: (color: string) => console.log("Red changed to", color),
    onPositionChange: (pos: number) => console.log("Red position", pos),
    onRemove: () => console.log("Red removed"),
  },
  {
    id: 2,
    color: "#00ff00",
    position: 50,
    isActive: false,
    onColorClick: () => console.log("Green clicked"),
    onColorChange: (color: string) => console.log("Green changed to", color),
    onPositionChange: (pos: number) => console.log("Green position", pos),
    onRemove: () => console.log("Green removed"),
  },
  {
    id: 3,
    color: "#0000ff",
    position: 100,
    isActive: false,
    onColorClick: () => console.log("Blue clicked"),
    onColorChange: (color: string) => console.log("Blue changed to", color),
    onPositionChange: (pos: number) => console.log("Blue position", pos),
    onRemove: () => console.log("Blue removed"),
  },
];

export function GradientControls({
  type,
  onTypeChange,
}: {
  type: GradientType;
  onTypeChange: (t: GradientType) => void;
}) {
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
        {colorStops.map((item) => (
          <GradientStopRow key={item.id} {...item} />
        ))}
      </div>
    </section>
  );
}
