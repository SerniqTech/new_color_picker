import { cn } from "@/lib/utils";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { GradientType } from "./gradient-editor";

type GradientTypeSelectorProps = {
  type: GradientType;
  onTypeChange: (t: GradientType) => void;
};

export default function GradientTypeSelector({
  type,
  onTypeChange,
}: GradientTypeSelectorProps) {
  return (
    <ToggleGroup
      type="single"
      variant="outline"
      defaultValue={type}
      onValueChange={(val) => {
        if (!val) return;
        onTypeChange(val as GradientType);
      }}
    >
      <ToggleGroupItem value={GradientType.LINEAR} aria-label="Toggle linear">
        Linear
      </ToggleGroupItem>
      <ToggleGroupItem
        value={GradientType.RADIAL}
        aria-label="Toggle radial"
        className={cn("data-[spacing=0]:data-[variant=outline]:border-l")}
      >
        Radial
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
