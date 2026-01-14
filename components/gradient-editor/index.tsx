"use client";

import PickerPanel from "./picker-panel";
import ControlsPanel from "./controls-panel";
import UploadImagePanel from "./upload-image-panel";
import { useGradientStore } from "@/components/gradient-editor/store";
import { buildGradientImages } from "@/lib/color-utils";

export default function GradientEditor() {
  const stops = useGradientStore((s) => s.stops);
  const type = useGradientStore((s) => s.type);
  const angle = useGradientStore((s) => s.angle);

  return (
    <div>
      {/* Gradient Preview */}
      <div className="pb-6">
        <div
          className="h-40 rounded-lg border relative"
          style={{
            backgroundImage: buildGradientImages(stops, type, angle),
            backgroundSize: "100% 100%, 16px 16px",
          }}
        />
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row divide-y lg:divide-y-0 lg:divide-x">
        <PickerPanel />
        <ControlsPanel />
        <UploadImagePanel />
      </div>
    </div>
  );
}
