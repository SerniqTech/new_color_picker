import { useRef, useState } from "react";
import { FiUpload } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ImageDropzoneProps = {
  onFileSelect?: (file: File) => void;
};

export default function ImageDropzone({ onFileSelect }: ImageDropzoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFiles = (files: FileList | null) => {
    if (!files?.[0]) return;
    onFileSelect?.(files[0]);
  };
  return (
    <div className="flex flex-col gap-2 h-full">
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
          "flex h-50 cursor-pointer flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed transition",
          isDragging ? "border-blue-500 bg-blue-50" : "border-muted"
        )}
      >
        <p className="text-sm text-muted-foreground">
          Drag and drop an image here
        </p>

        <p className="text-sm text-muted-foreground">or</p>

        <Button
          type="button"
          variant="secondary"
          className="gap-2 text-blue-600"
        >
          <FiUpload className="h-5 w-5" />
          Select image file
        </Button>
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
  );
}
