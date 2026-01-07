"use client";

import { RgbaColorPicker } from "react-colorful";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { HiEyeDropper } from "react-icons/hi2";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { MdLinearScale } from "react-icons/md";
import { GiRadialBalance } from "react-icons/gi";
import LinearKnob from "./LinearKnob";
import { cn } from "@/lib/utils";
import { useState } from "react";

export default function CreateGradient() {
  const [typeOfGradient, setTypeOfGradient] = useState("LINEAR");

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
      <div className="p-2 flex justify-between items-start">
        <ToggleGroup
          size="sm"
          type="single"
          variant="outline"
          defaultValue={typeOfGradient}
          onValueChange={(val) => setTypeOfGradient(val)}
        >
          <ToggleGroupItem value="LINEAR" aria-label="Toggle linear">
            <MdLinearScale /> Linear
          </ToggleGroupItem>
          <ToggleGroupItem
            value="RADIAL"
            aria-label="Toggle radial"
            className={cn("data-[spacing=0]:data-[variant=outline]:border-l")}
          >
            <GiRadialBalance /> Radial
          </ToggleGroupItem>
        </ToggleGroup>
        <LinearKnob typeOfGradient={typeOfGradient} />
      </div>
    </div>
  );
}
