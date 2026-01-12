import { RgbaColor } from "react-colorful";
import { create } from "zustand";

export type Stop = {
  id: string;
  percent: number; // 0–100
  color: RgbaColor; // hex
};

type GradientEditorState = {
  activeColor: Stop;
  stops: Stop[];
  addStop: (percent: number) => void;
  moveStop: (id: string, percent: number) => void;
  setActiveColor: (id: string) => void;
};

const clamp = (v: number) => Math.min(100, Math.max(0, v));

const INITIAL_START_COLOR = {
  id: "start",
  percent: 0,
  color: {
    r: 20,
    g: 230,
    b: 70,
    a: 1,
  },
};
const INITIAL_END_COLOR = {
  id: "end",
  percent: 100,
  color: {
    r: 210,
    g: 230,
    b: 70,
    a: 1,
  },
};

export const useGradientStops = create<GradientEditorState>((set) => ({
  activeColor: INITIAL_START_COLOR,
  stops: [INITIAL_START_COLOR, INITIAL_END_COLOR],

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

  setActiveColor: (id) =>
    set((state) => ({
      activeColor:
        state.stops.find((stop) => stop.id === id) || INITIAL_START_COLOR,
    })),

  setColor: () => set(() => ({})),
}));
