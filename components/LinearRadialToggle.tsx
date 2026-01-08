import { cn } from "@/lib/utils";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { GradientType } from "./CreateGradient";

type LinearRadialToggleProps = {
  typeOfGradient: GradientType;
  setTypeOfGradient: React.Dispatch<React.SetStateAction<GradientType>>;
};

export default function LinearRadialToggle({
  typeOfGradient,
  setTypeOfGradient,
}: LinearRadialToggleProps) {
  return (
    <ToggleGroup
      size="sm"
      type="single"
      variant="outline"
      defaultValue={typeOfGradient}
      onValueChange={(val) => {
        if (!val) return;
        setTypeOfGradient(val as GradientType);
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
