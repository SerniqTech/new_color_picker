"use client";

import { useRef, useState } from "react";
import { FiUpload, FiImage } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type UploadImagePanelProps = {
  onFileSelect?: (file: File) => void;
};

export default function UploadImagePanel({
  onFileSelect,
}: UploadImagePanelProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFiles = (files: FileList | null) => {
    if (!files?.[0]) return;
    onFileSelect?.(files[0]);
  };

  return (
    <section className="space-y-6">
      {/* Top buttons */}
      <div className="flex gap-2">
        <Button size='sm' variant="secondary" disabled>
          Gradient Preset
        </Button>

        <Button size='sm' variant="outline" className="border-blue-500 text-blue-600">
          Upload image
        </Button>

        <Button size='sm' variant="secondary" disabled>
          Add Extension
        </Button>
      </div>

      {/* Upload area */}
      <div className="space-y-2">
        <p className="text-sm text-muted-foreground">Upload image</p>

        <div
          role="button"
          tabIndex={0}
          aria-label="Upload image by drag and drop or file selection"
          onClick={() => inputRef.current?.click()}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              inputRef.current?.click();
            }
          }}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setIsDragging(false);
            handleFiles(e.dataTransfer.files);
          }}
          className={cn(
            "flex h-[360px] cursor-pointer flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed transition",
            isDragging ? "border-blue-500 bg-blue-50" : "border-muted"
          )}
        >
          <p className="text-lg font-medium">Drag and drop an image here</p>

          <p className="text-muted-foreground">or</p>

          <Button
            type="button"
            variant="secondary"
            className="gap-2 text-blue-600"
          >
            <FiUpload className="h-5 w-5" />
            Select image file
          </Button>

          <FiImage className="absolute bottom-6 right-6 h-6 w-6 text-muted-foreground/40" />
        </div>

        {/* Hidden input */}
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>
    </section>
  );
}
