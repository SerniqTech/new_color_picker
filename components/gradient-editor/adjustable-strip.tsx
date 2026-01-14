"use client";

import { useRef, useState, MouseEvent, useLayoutEffect } from "react";
import Draggable from "react-draggable";
import { Input } from "../ui/input";
import { useGradientStore } from "@/components/gradient-editor/store";
import {
  percentToPx,
  pxToPercent,
  buildLinearGradientImages,
  rgbaToHexa,
  normalizeToRgba,
  rgbaToOpaqueCss,
} from "@/lib/color-utils";

export default function AdjustableStrip() {
  const stops = useGradientStore((s) => s.stops);
  const addStop = useGradientStore((s) => s.addStop);
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
      style={{
        backgroundImage: buildLinearGradientImages(stops),
        backgroundSize: "100% 100%, 16px 16px",
      }}
    >
      {stops.map((stop) => (
        <GradientStop
          key={stop.id}
          stopId={stop.id}
          color={rgbaToHexa(stop.color)}
          percent={stop.percent}
          stripWidth={stripWidth}
          stripRef={stripRef}
        />
      ))}
    </div>
  );
}

type GradientStopProps = {
  stopId: string;
  color: string;
  percent: number;
  stripWidth: number;
  stripRef: React.RefObject<HTMLDivElement | null>;
};

const GradientStop = ({
  stopId,
  color,
  percent,
  stripWidth,
  stripRef,
}: GradientStopProps) => {
  const nodeRef = useRef<HTMLDivElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const isActive = useGradientStore((s) => s.activeStop === stopId);
  const setActiveStop = useGradientStore((s) => s.setActiveStop);
  const moveStop = useGradientStore((s) => s.moveStop);

  const x = percentToPx(percent, stripWidth);

  const rgba = normalizeToRgba(color);
  const backgroundColor = rgba ? rgbaToOpaqueCss(rgba) : "#fff";

  return (
    <Draggable
      axis="x"
      bounds="parent"
      nodeRef={nodeRef}
      position={{ x, y: 0 }}
      onDrag={(e) => {
        if (!stripRef.current) return;

        const rect = stripRef.current.getBoundingClientRect();
        const rawX = (e as MouseEvent).clientX - rect.left;
        const clampedX = Math.max(0, Math.min(rawX, rect.width));

        moveStop(stopId, pxToPercent(clampedX, rect.width));
      }}
    >
      <div
        ref={nodeRef}
        className="absolute h-11 w-4 rounded-xl border-2 border-black shadow-[inset_0_0_0_2px_#fff] cursor-move -mx-2"
        style={{
          backgroundColor,
          outline: isActive ? "6px solid rgba(0,0,0,0.2)" : "",
        }}
        onClick={() => setActiveStop(stopId)}
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
              moveStop(stopId, Math.min(100, Math.max(0, num)));
            }
          }}
          onBlur={() => setIsEditing(false)}
          className="absolute top-14 -left-3.5 px-0 w-10 text-center"
        />
      </div>
    </Draggable>
  );
};
