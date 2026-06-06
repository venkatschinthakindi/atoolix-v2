
"use client";

import { ImageFormat } from "@/types/image-converter.types";
import { useCallback, useRef, useState } from "react";

export function DropZone({
  onFiles,
  validFileTypes = ".pdf",
  allowMultiple = true
}: {
  onFiles: (files: File[]) => void;
  validFileTypes?: string;
  allowMultiple: boolean;
}) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

 const validatePDF = (file: File) => {
    const allowedMimeTypes = ["application/pdf"];
    const allowedExtensions = validFileTypes.split(",").map((ext) => ext.trim().toLowerCase()); // e.g. [".pdf", ".docx"]

    const fileName = file.name.toLowerCase();

    const isValidMime = allowedMimeTypes.includes(file.type);
    const isValidExtension = allowedExtensions.some((ext) =>
      fileName.endsWith(ext)
    );

    return isValidMime || isValidExtension;
  };
  const handleFiles = (files: File[]) => {
    const pdfFiles = files.filter(validatePDF);

    if (pdfFiles.length === 0) {
      setError("Only PDF files are allowed");
      return;
    }

    setError(null);
    onFiles(pdfFiles);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  }, []);

  const openPicker = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-3">
      {/* DROPZONE */}
      <div
        onClick={openPicker}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`p-10 rounded-xl border text-center transition cursor-pointer ${
          isDragging
            ? "border-blue-400 bg-blue-500/10"
            : "border-white/10 bg-gray-950/40"
        }`}
      >
        <p className="text-white/70 text-sm">
          Drag & drop PDF files here
        </p>

        <p className="text-white/40 text-xs mt-2">
          or click to browse files
        </p>

        {/* HIDDEN INPUT */}
        <input
          ref={fileInputRef}
          type="file"
          accept={validFileTypes}
          multiple = {allowMultiple}
          className="hidden"
          onChange={(e) => {
            if (!e.target.files) return;
            handleFiles(Array.from(e.target.files));
          }}
        />
      </div>

      {/* ERROR */}
      {error && (
        <div className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 p-2 rounded">
          {error}
        </div>
      )}
    </div>
  );
}

export function getAcceptString(
  formats: ImageFormat[]
) {
  return formats
    .map((format) => `.${format}`)
    .join(",");
}