import { cn } from "@/lib/utils";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { GradientType, useGradientStore } from "@/components/gradient-editor/store";

export default function TypeSelector() {
  const type = useGradientStore((s) => s.type);
  const setType = useGradientStore((s) => s.setType);

  return (
    <ToggleGroup
      type="single"
      variant="outline"
      size="sm"
      value={type}
      onValueChange={(val) => {
        if (!val) return;
        setType(val as GradientType);
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
