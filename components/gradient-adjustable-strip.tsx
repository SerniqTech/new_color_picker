"use client";

import { useRef, useState, createRef, MouseEvent, useEffect } from "react";
import Draggable from "react-draggable";
import { Input } from "./ui/input";

type Stop = {
  id: string;
  ref: React.RefObject<HTMLDivElement | null>;
  x: number;
};

const HANDLE_WIDTH = 16;

export default function GradientAdjustableStrip() {
  const [stops, setStops] = useState<Stop[]>([
    {
      id: crypto.randomUUID(),
      ref: createRef<HTMLDivElement>(),
      x: 0,
    },
  ]);

  useEffect(() => {
    if (!stripRef.current) return;

    const width = stripRef.current.clientWidth;

    setStops((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        ref: createRef<HTMLDivElement>(),
        x: width,
      },
    ]);
  }, []);

  const stripRef = useRef<HTMLDivElement>(null);

  const handleStripClick = (e: MouseEvent<HTMLDivElement>) => {
    if (!stripRef.current) return;
    if (e.target !== e.currentTarget) return;

    const rect = stripRef.current.getBoundingClientRect();

    const rawX = e.clientX - rect.left - HANDLE_WIDTH / 2;

    const clampedX = Math.max(0, Math.min(rawX, rect.width - HANDLE_WIDTH));

    setStops((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        ref: createRef<HTMLDivElement>(),
        x: clampedX,
      },
    ]);
  };

  return (
    <div
      ref={stripRef}
      onClick={handleStripClick}
      className="flex items-center relative mb-12 h-8 w-full bg-amber-800 rounded-lg shadow-[0_0_0_2px_#000] before-overlay"
    >
      {stops.map((stop) => (
        <Draggable
          key={stop.id}
          axis="x"
          bounds="parent"
          nodeRef={stop.ref}
          defaultPosition={{ x: stop.x, y: 0 }}
        >
          <div
            ref={stop.ref}
            className="absolute h-11 w-4 rounded-xl bg-pink-200 border-2 border-black shadow-[inset_0_0_0_2px_#fff] cursor-ew-resize -mx-2"
          >
            <Input className="absolute top-12 -left-3.5 px-2 w-10" />
          </div>
        </Draggable>
      ))}
    </div>
  );
}
