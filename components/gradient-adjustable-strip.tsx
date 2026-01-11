"use client";

import { useRef, useState, MouseEvent, useLayoutEffect } from "react";
import Draggable from "react-draggable";
import { Input } from "./ui/input";

type Stop = {
  id: string;
  x: number;
  percentPosition: number;
  inputValue: string;
  color: string;
};

const pxToPercent = (x: number, stripWidth: number) =>
  Math.round((x / stripWidth) * 100);
const percentToPx = (percent: number, stripWidth: number) =>
  (percent / 100) * stripWidth;

export default function GradientAdjustableStrip() {
  const [stops, setStops] = useState<Stop[]>([]);
  const [stripWidth, setStripWidth] = useState(0);

  useLayoutEffect(() => {
    if (!stripRef.current) return;

    const width = stripRef.current.clientWidth;
    setStripWidth(stripRef.current.clientWidth);
    setStops([
      {
        id: crypto.randomUUID(),
        x: 0,
        percentPosition: 0,
        inputValue: "0",
        color: "#00FF00",
      },
      {
        id: crypto.randomUUID(),
        x: width,
        percentPosition: 100,
        inputValue: "100",
        color: "#FF0000",
      },
    ]);
  }, []);

  const stripRef = useRef<HTMLDivElement>(null);

  const handleStripClick = (e: MouseEvent<HTMLDivElement>) => {
    if (!stripRef.current) return;
    if (e.target !== e.currentTarget) return;

    const rect = stripRef.current.getBoundingClientRect();

    const rawX = e.clientX - rect.left;

    const clampedX = Math.max(0, Math.min(rawX, rect.width));

    setStops((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        x: clampedX,
        percentPosition: pxToPercent(clampedX, stripWidth),
        inputValue: pxToPercent(clampedX, stripWidth).toString(),
        color: "#00FF00",
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
        <GradientStop
          key={stop.id}
          stop={stop}
          onStopInput={(id, val) => {
            const valConvertedNumber = Number(val);
            if (
              val === "" ||
              Number.isNaN(valConvertedNumber) ||
              valConvertedNumber > 100
            ) {
              setStops((s) =>
                s.map((s) => (s.id === id ? { ...s, inputValue: val } : s))
              );
              return;
            }

            setStops((s) =>
              s.map((s) =>
                s.id === id
                  ? {
                      ...s,
                      x: percentToPx(valConvertedNumber, stripWidth),
                      percentPosition: valConvertedNumber,
                      inputValue: val,
                      color: "#00FF00",
                    }
                  : s
              )
            );
          }}
          onDrag={(id, x) => {
            const percentPosition = pxToPercent(x, stripWidth);
            setStops((s) =>
              s.map((s) => (s.id === id ? { ...s, x, percentPosition } : s))
            );
          }}
        />
      ))}
    </div>
  );
}

type GradientStopProps = {
  stop: Stop;
  onDrag: (id: string, x: number) => void;
  onStopInput: (id: string, val: string) => void;
};

const GradientStop = ({ stop, onDrag, onStopInput }: GradientStopProps) => {
  const nodeRef = useRef<HTMLDivElement>(null);

  return (
    <Draggable
      key={stop.id}
      axis="x"
      bounds="parent"
      nodeRef={nodeRef}
      position={{ x: stop.x, y: 0 }}
      onDrag={(_, data) => onDrag(stop.id, data.x)}
    >
      <div
        ref={nodeRef}
        className="absolute h-11 w-4 rounded-xl border-2 border-black shadow-[inset_0_0_0_2px_#fff] cursor-move -mx-2"
        style={{ backgroundColor: stop.color }}
      >
        <Input
          value={stop.inputValue}
          onChange={(e) => onStopInput(stop.id, e.target.value)}
          className="absolute top-12 -left-3.5 px-0 w-10 text-center"
        />
      </div>
    </Draggable>
  );
};
