"use client";

import { RgbaColorPicker } from "react-colorful";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { HiEyeDropper } from "react-icons/hi2";

import LinearKnob from "./LinearKnob";
import LinearRadialToggle from "./LinearRadialToggle";
import { useState } from "react";
import GradientStopRow from "./GradientStopRow";
import UploadImagePanel from "./UploadImagePanel";

export enum GradientType {
  LINEAR = "LINEAR",
  RADIAL = "RADIAL",
}

export default function CreateGradient() {
  const [typeOfGradient, setTypeOfGradient] = useState<GradientType>(
    GradientType.LINEAR
  );

  return (
    <div className="flex flex-col md:flex-row">
      <div className="flex gap-4">
        <div className="gradient-picker-one">
          <div className="text-muted-foreground mb-2">Color Picker</div>
          <RgbaColorPicker />
        </div>
        <div className="flex flex-col gap-6">
          <div>
            <div className="text-muted-foreground mb-2">HEX</div>
            <div className="flex gap-4">
              <Input />
              <Button variant="outline" size="icon" aria-label="Submit">
                <HiEyeDropper />
              </Button>
            </div>
          </div>
          <div className="flex gap-2">
            <div>
              <p className="text-muted-foreground text-sm">R</p>
              <Input />
            </div>
            <div>
              <p className="text-muted-foreground text-sm">G</p>
              <Input />
            </div>
            <div>
              <p className="text-muted-foreground text-sm">B</p>
              <Input />
            </div>
            <div>
              <p className="text-muted-foreground text-sm">A</p>
              <Input />
            </div>
          </div>
          <div className="gradient-picker-two">
            <RgbaColorPicker />
          </div>
        </div>
      </div>
      <div className="w-full border-b sm:w-px sm:border-r bg-gray-50 my-6 sm:mx-6 sm:my-0"></div>
      <div className="flex flex-col gap-6">
        <div className="p-2 flex justify-between items-start">
          <LinearRadialToggle
            typeOfGradient={typeOfGradient}
            setTypeOfGradient={setTypeOfGradient}
          />
          <LinearKnob typeOfGradient={typeOfGradient} />
        </div>
        <div>
          <div className="text-muted-foreground mb-2">Stops</div>
          <GradientStopRow
            color="#937373"
            position={0}
            isActive
            onColorClick={() => {}}
            onColorChange={() => {}}
            onPositionChange={() => {}}
            onRemove={() => {}}
          />
          <GradientStopRow
            color="#937373"
            position={0}
            onColorClick={() => {}}
            onColorChange={() => {}}
            onPositionChange={() => {}}
            onRemove={() => {}}
          />
        </div>
      </div>
      <div className="w-full border-b sm:w-px sm:border-r bg-gray-50 my-6 sm:mx-6 sm:my-0"></div>
      <UploadImagePanel
        onFileSelect={(file) => {
          console.log(file);
        }}
      />
    </div>
  );
}
