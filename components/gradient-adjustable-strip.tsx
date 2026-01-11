"use client";

import { useRef, useState, MouseEvent, useLayoutEffect } from "react";
import Draggable from "react-draggable";
import { Input } from "./ui/input";
import { useGradientStops } from "@/store/gradient-editor.store";
import {
  percentToPx,
  pxToPercent,
  buildLinearGradient,
} from "@/lib/color-utils";

export default function GradientAdjustableStrip() {
  const { stops, addStop, moveStop } = useGradientStops();
  const stripRef = useRef<HTMLDivElement>(null);
  const [stripWidth, setStripWidth] = useState(0);

  useLayoutEffect(() => {
    if (!stripRef.current) return;
    setStripWidth(stripRef.current.clientWidth);
  }, []);

  const handleStripClick = (e: MouseEvent<HTMLDivElement>) => {
    if (!stripRef.current) return;
    if (e.target !== e.currentTarget) return;

    const rect = stripRef.current.getBoundingClientRect();

    const rawX = e.clientX - rect.left;

    const clampedX = Math.max(0, Math.min(rawX, rect.width));

    addStop(pxToPercent(clampedX, stripWidth));
  };

  return (
    <div
      ref={stripRef}
      onClick={handleStripClick}
      className="flex items-center relative mb-12 h-8 w-full rounded-lg shadow-[0_0_0_2px_#000] before-overlay"
      style={{ backgroundImage: buildLinearGradient(stops) }}
    >
      {stops.map((stop) => (
        <GradientStop
          key={stop.id}
          color={stop.color}
          percent={stop.percent}
          stripWidth={stripWidth}
          onChangePercent={(p) => moveStop(stop.id, p)}
        />
      ))}
    </div>
  );
}

type GradientStopProps = {
  color: string;
  percent: number;
  stripWidth: number;
  onChangePercent: (percent: number) => void;
};

const GradientStop = ({
  color,
  percent,
  stripWidth,
  onChangePercent,
}: GradientStopProps) => {
  const nodeRef = useRef<HTMLDivElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const x = percentToPx(percent, stripWidth);

  return (
    <Draggable
      axis="x"
      bounds="parent"
      nodeRef={nodeRef}
      position={{ x, y: 0 }}
      onDrag={(_, data) => onChangePercent(pxToPercent(data.x, stripWidth))}
    >
      <div
        ref={nodeRef}
        className="absolute h-11 w-4 rounded-xl border-2 border-black shadow-[inset_0_0_0_2px_#fff] cursor-move -mx-2"
        style={{ backgroundColor: color }}
      >
        <Input
          value={isEditing ? inputValue : percent.toString()}
          onFocus={() => {
            setIsEditing(true);
            setInputValue(percent.toString());
          }}
          onChange={(e) => {
            const val = e.target.value;
            setInputValue(val);
            if (val === "") return;
            const num = Number(val);
            if (!Number.isNaN(num)) {
              onChangePercent(Math.min(100, Math.max(0, num)));
            }
          }}
          onBlur={() => setIsEditing(false)}
          className="absolute top-12 -left-3.5 px-0 w-10 text-center"
        />
      </div>
    </Draggable>
  );
};
