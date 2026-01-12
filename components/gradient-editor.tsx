"use client";

import { PickerPanel } from "./picker-panel";
import { GradientControls } from "./gradient-controls";
import UploadImagePanel from "./upload-image-panel";
import { useGradientStore } from "@/store/gradient-editor.store";
import { buildLinearGradient } from "@/lib/color-utils";

export function GradientEditor() {
  const { stops } = useGradientStore();

  return (
    <div>
      {/* Gradient Preview */}
      <div className="pb-6">
        <div
          className="h-36 rounded-lg border relative"
          style={{ backgroundImage: buildLinearGradient(stops) }}
        />
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row divide-y lg:divide-y-0 lg:divide-x">
        <PickerPanel />
        <GradientControls />
        <UploadImagePanel />
      </div>
    </div>
  );
}
