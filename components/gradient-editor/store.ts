import { RgbaColor } from "react-colorful";
import { create } from "zustand";
import { getColorAtPercent } from "@/lib/color-utils";

export type Stop = {
  id: string;
  percent: number;
  color: RgbaColor;
};

export enum GradientType {
  LINEAR = "linear-gradient",
  RADIAL = "radial-gradient",
}

type GradientEditorState = {
  angle: number;
  type: GradientType;
  activeStop: string;
  stops: Stop[];
  addStop: (percent: number) => void;
  moveStop: (id: string, percent: number) => void;
  setActiveStop: (id: string) => void;
  setStopColor: (id: string, color: RgbaColor) => void;
  setType: (type: GradientType) => void;
  removeStop: (id: string) => void;
  setAngle: (angle: number) => void;
};

const clamp = (v: number) => Math.min(100, Math.max(0, v));

const START_ID = "start";
const END_ID = "end";

export const useGradientStore = create<GradientEditorState>((set) => ({
  angle: 90,
  type: GradientType.LINEAR,
  activeStop: START_ID,
  stops: [
    {
      id: START_ID,
      percent: 0,
      color: {
        r: 230,
        g: 21,
        b: 125,
        a: 1,
      },
    },
    {
      id: END_ID,
      percent: 100,
      color: {
        r: 112,
        g: 2,
        b: 225,
        a: 1,
      },
    },
  ],

  addStop: (percent) =>
    set((state) => {
      const clampedPercent = clamp(percent);
      const color = getColorAtPercent(state.stops, clampedPercent);
      const id = crypto.randomUUID();

      return {
        stops: [
          ...state.stops,
          {
            id,
            color,
            percent: clampedPercent,
          },
        ],
        activeStop: id,
      };
    }),

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

  removeStop: (id) =>
    set((state) => {
      if (!(state.stops.length > 2)) return state;

      const stops = state.stops.filter((s) => s.id !== id);

      return {
        stops,
        activeStop: state.activeStop === id ? stops[0].id : state.activeStop,
      };
    }),

  setType: (type) => set({ type }),
  setAngle: (angle) => set({ angle }),
}));
