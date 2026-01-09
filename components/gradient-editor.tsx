"use client";

import { useState } from "react";
import { PickerPanel } from "./picker-panel";
import { GradientControls } from "./gradient-controls";
import UploadImagePanel from "./upload-image-panel";
import { RgbaColor } from "react-colorful";

export enum GradientType {
  LINEAR = "LINEAR",
  RADIAL = "RADIAL",
}

export function GradientEditor() {
  const [color, setColor] = useState<RgbaColor>({
    r: 20,
    g: 230,
    b: 70,
    a: 1,
  });
  const [type, setType] = useState<GradientType>(GradientType.LINEAR);

  return (
    <div>
      {/* Gradient Preview */}
      <div className="pb-6">
        <div className="h-36 rounded-sm border bg-linear-to-r from-cyan-300 to-cyan-200 relative"></div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row divide-y lg:divide-y-0 lg:divide-x">
        <PickerPanel color={color} onChange={setColor} />
        <GradientControls type={type} onTypeChange={setType} />
        <UploadImagePanel />
      </div>
    </div>
  );
}
