

"use client";

import { ImageFormat } from "@/types/imageConverter.types";
import Image from "next/image";
import { useCallback, useRef, useState } from "react";

export function DropZone({
  onFiles,
  validFileTypes = ".jpg,.jpeg,.png,.webp, .pdf",
  allowMultiple = true,
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
    <div className="space-y-4">
      {/* DROPZONE */}
      <div
        onClick={openPicker}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`p-12 rounded-2xl border-2 text-center cursor-pointer transition-all duration-300 ease-out ${
          isDragging
            ? "border-blue-400 bg-gradient-to-b from-indigo-900/60 to-indigo-950/60 shadow-lg shadow-blue-500/50"
            : "border-white/10 bg-gradient-to-b from-indigo-950/40 to-indigo-950/10 hover:border-blue-400 hover:shadow-lg hover:shadow-blue-500/30"
        }`}
      >
        <div className="flex items-center justify-center space-x-4">
          <Image
            src="/icons/upload-illustration.webp"
            alt="Upload illustration"
            width={80}
            height={80}
            quality={50}
            priority
            fetchPriority="high"
            sizes="80px"
            className="h-20 w-20 drop-shadow-[0_0_15px_rgba(59,130,246,0.7)]"
          />

          {/* Headline + Subtext */}
          <div className="flex flex-col items-start">
            <p className="text-white text-lg font-bold">
              Drag & Drop Files Here
            </p>
            
            <p className="text-white/70 text-sm">
              or browse files
            </p>
            <div className="w-full shadow shadow-blue-500/10 border-t border-white/15 my-2"></div>
            <p className="text-white/40 text-xs mt-1">
              Supported format(s): {validFileTypes}
            </p>
          </div>
        </div>


        {/* HIDDEN INPUT */}
        <input
          ref={fileInputRef}
          type="file"
          accept={validFileTypes}
          multiple={allowMultiple}
          className="hidden"
          onChange={(e) => {
            if (!e.target.files) return;
            handleFiles(Array.from(e.target.files));
          }}
        />
      </div>

      {/* ERROR */}
      {error && (
        <div className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 p-2 rounded-xl text-center">
          {error}
        </div>
      )}
    </div>
  );
}

export function getAcceptString(formats: ImageFormat[] | undefined) {
  return formats?.map((format) => `.${format}`).join(",") ?? ".jpg,.jpeg,.png,.webp";
}

