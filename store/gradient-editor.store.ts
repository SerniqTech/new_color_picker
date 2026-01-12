import { RgbaColor } from "react-colorful";
import { create } from "zustand";

export type Stop = {
  id: string;
  percent: number; // 0–100
  color: RgbaColor; // hex
};

export enum GradientType {
  LINEAR = "LINEAR",
  RADIAL = "RADIAL",
}

type GradientEditorState = {
  type: GradientType;
  activeStop: string;
  stops: Stop[];
  addStop: (percent: number) => void;
  moveStop: (id: string, percent: number) => void;
  setActiveStop: (id: string) => void;
  setStopColor: (id: string, color: RgbaColor) => void;
  setType: (type: GradientType) => void;
};

const clamp = (v: number) => Math.min(100, Math.max(0, v));

const START_ID = "start";
const END_ID = "end";

export const useGradientStore = create<GradientEditorState>((set) => ({
  type: GradientType.LINEAR,
  activeStop: START_ID,
  stops: [
    {
      id: START_ID,
      percent: 0,
      color: {
        r: 20,
        g: 230,
        b: 70,
        a: 1,
      },
    },
    {
      id: END_ID,
      percent: 100,
      color: {
        r: 210,
        g: 230,
        b: 70,
        a: 1,
      },
    },
  ],

  addStop: (percent) =>
    set((state) => ({
      stops: [
        ...state.stops,
        {
          id: crypto.randomUUID(),
          percent: clamp(percent),
          color: {
            r: 220,
            g: 20,
            b: 70,
            a: 1,
          },
        },
      ],
    })),

  moveStop: (id, percent) =>
    set((state) => ({
      stops: state.stops.map((stop) => {
        return stop.id === id ? { ...stop, percent: clamp(percent) } : stop;
      }),
    })),

  setActiveStop: (id) => set({ activeStop: id }),

  setStopColor: (id, color) =>
    set((state) => ({
      stops: state.stops.map((stop) =>
        stop.id === id ? { ...stop, color } : stop
      ),
    })),

  setType: (type) => set({ type }),
}));
