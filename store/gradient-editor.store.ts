import { create } from "zustand";

export type Stop = {
  id: string;
  percent: number; // 0–100
  color: string; // hex
};

type GradientEditorState = {
  stops: Stop[];
  addStop: (percent: number) => void;
  moveStop: (id: string, percent: number) => void;
};

const clamp = (v: number) => Math.min(100, Math.max(0, v));

export const useGradientStops = create<GradientEditorState>((set) => ({
  stops: [
    { id: "start", percent: 0, color: "#00FF00" },
    { id: "end", percent: 100, color: "#FF0000" },
  ],

  addStop: (percent) =>
    set((state) => ({
      stops: [
        ...state.stops,
        {
          id: crypto.randomUUID(),
          percent: clamp(percent),
          color: "#0000FF",
        },
      ],
    })),

  moveStop: (id, percent) =>
    set((state) => ({
      stops: state.stops.map((stop) => {
        return stop.id === id ? { ...stop, percent: clamp(percent) } : stop;
      }),
    })),
}));
