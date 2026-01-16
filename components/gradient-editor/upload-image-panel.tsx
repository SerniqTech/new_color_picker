"use client";

import { Tabs, TabsList, TabsContent, TabsTrigger } from "@/components/ui/tabs";
import Presets from "./presets";
import ImageColorSelection from "./image-color-selection";

enum UploadImageTab {
  GradientPreset = "gradient-preset",
  UploadImage = "upload-image",
}

export default function UploadImagePanel() {
  return (
    <section className="flex-1 px-4 max-w-lg h-full">
      <Tabs defaultValue={UploadImageTab.UploadImage} className="gap-6">
        <TabsList>
          <TabsTrigger
            className="data-[state=active]:text-primary data-[state=active]:border-primary data-[state=active]:font-semibold"
            value={UploadImageTab.GradientPreset}
          >
            Gradient Preset
          </TabsTrigger>
          <TabsTrigger
            className="data-[state=active]:text-primary data-[state=active]:border-primary data-[state=active]:font-semibold"
            value={UploadImageTab.UploadImage}
          >
            Upload Image
          </TabsTrigger>
        </TabsList>
        <TabsContent value={UploadImageTab.GradientPreset}>
          <Presets />
        </TabsContent>
        <TabsContent value={UploadImageTab.UploadImage}>
          <ImageColorSelection />
        </TabsContent>
      </Tabs>
    </section>
  );
}
