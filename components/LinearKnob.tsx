import { useState, useRef, useEffect, ChangeEvent } from "react";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";

type LinearKnobProps = {
  typeOfGradient: string;
};

export default function LinearKnob({ typeOfGradient }: LinearKnobProps) {
  const knobRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);
  const [angle, setAngle] = useState(0);

  const calculateAngle = (clientX: number, clientY: number) => {
    if (!knobRef.current) return null;
    const rect = knobRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    const dx = clientX - cx;
    const dy = clientY - cy;

    const radians = Math.atan2(dy, dx);
    let degrees = (radians * 180) / Math.PI + 90;

    if (degrees < 0) degrees += 360;

    setAngle(degrees);
  };

  useEffect(() => {
    function handleMouseMove(e: MouseEvent) {
      if (!dragging) return null;
      calculateAngle(e.clientX, e.clientY);
    }

    function handleMouseUp() {
      setDragging(false);
    }

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [dragging]);

  const radius = 14;
  const rad = ((angle - 90) * Math.PI) / 180;

  const handleX = radius * Math.cos(rad);
  const handleY = radius * Math.sin(rad);

  const disableLinearDail = typeOfGradient === "RADIAL";

  const handleOnchange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (typeof value !== "number") return null;
    setAngle(value <= 359 ? value : 360);
  };

  return (
    <div className="flex">
      <div
        ref={knobRef}
        className={cn(
          "border border-muted min-w-10 max-w-10 min-h-10 max-h-10 rounded-full relative",
          disableLinearDail
            ? "pointer-events-none border-muted"
            : "border-primary cursor-pointer"
        )}
        onMouseDown={(e) => {
          calculateAngle(e.clientX, e.clientY);
          setDragging(true);
        }}
      >
        <div
          className={cn(
            "min-w-2 min-h-2 max-w-2 rounded-full absolute",
            disableLinearDail ? "bg-muted" : "bg-primary"
          )}
          onMouseDown={() => setDragging(true)}
          style={{
            left: "50%",
            top: "50%",
            transform: `translate(${handleX}px, ${handleY}px) translate(-50%, -50%)`,
          }}
        ></div>
      </div>
      <Input
        type="number"
        className="p-2 max-w-26"
        value={Math.floor(angle)}
        onChange={handleOnchange}
        disabled={disableLinearDail}
      />
    </div>
  );
}
