"use client";

import { ImageFormat } from "@/types/imageConverter.types";
import { useCallback, useRef, useState } from "react";
import Image from 'next/image';
import { UploadCloud } from "lucide-react";

export function DropZone({
  onFiles,
  validFileTypes = ".jpg,.jpeg,.png,.webp, .pdf",
  allowMultiple = true,
  addMoreFiles = false
}: {
  onFiles: (files: File[]) => any;
  validFileTypes?: string;
  allowMultiple: boolean;
  addMoreFiles?: boolean
}) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const validatePDF = (file: File) => {
    const allowedMimeTypes = ["application/pdf"];
    const allowedExtensions = validFileTypes.split(",").map((ext) => ext.trim().toLowerCase());
    const fileName = file.name.toLowerCase();
    const isValidMime = allowedMimeTypes.includes(file.type);
    const isValidExtension = allowedExtensions.some((ext) => fileName.endsWith(ext));
    return isValidMime || isValidExtension;
  };

  const handleFiles = (files: File[]) => {
    const pdfFiles = files.filter(validatePDF);
    if (pdfFiles.length === 0) {
      setError("Only PDF files are allowed");
      return;
    }
    setError(null);
    setIsUploading(true);
    setUploadProgress(0);
    
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
    
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
    <div className="space-y-4 sm:space-y-6">
      {/* PREMIUM DROPZONE - Smooth hover (no odd blowing) */}
      <div
        onClick={openPicker}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`group relative 
          flex flex-col items-center gap-4 sm:flex-row sm:gap-6 lg:gap-8 
          p-4 sm:p-8 lg:p-12 
          rounded-2xl sm:rounded-3xl 
          border border-white/15 
          overflow-hidden 
          transition-all duration-300 ease-out cursor-pointer w-full
          backdrop-blur-sm
          hover:shadow-2xl hover:shadow-blue-500/40 hover:scale-[1.01] hover:border-blue-400/60
          ${
            isDragging
              ? "border-blue-400/80 bg-gradient-to-br from-indigo-950/98 via-indigo-950/92 to-indigo-950/85 shadow-2xl shadow-blue-500/70 scale-[1.02]"
              : "bg-gradient-to-br from-indigo-950/90 via-indigo-950/65 to-indigo-950/40"
          }`}
      >
        {/* ✅ ONLY 1: Glass morph (smooth, no pulse) */}
        <span className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-white/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" aria-hidden="true" />

        {/* ✅ ONLY 2: Inner glow (smooth, no pulse) */}
        <span className="absolute inset-2 sm:inset-4 rounded-xl sm:rounded-2xl bg-gradient-to-br from-blue-400/15 via-blue-400/8 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" aria-hidden="true" />

        {/* UPLOAD PROGRESS */}
        {isUploading && (
          <div className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-indigo-950/95 backdrop-blur-md flex items-center justify-center z-50">
            <div className="flex flex-col items-center gap-4 sm:gap-6 p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-white/5 backdrop-blur-sm border border-blue-400/20">
              <div className="relative">
                <div className="h-14 w-14 sm:h-16 sm:w-16 rounded-full border-4 border-blue-400/20 animate-spin" />
                <div className="absolute inset-0 h-14 w-14 sm:h-16 sm:w-16 rounded-full border-4 border-blue-400 border-t-transparent animate-spin" />
              </div>
              
              <div className="w-full max-w-48 sm:max-w-64">
                <div className="h-1.5 sm:h-2 rounded-full bg-white/10 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-400 to-indigo-400 transition-all duration-300 ease-out"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
                <p className="text-center text-blue-400/70 text-xs sm:text-sm mt-2 font-medium">
                  {uploadProgress}% uploaded
                </p>
              </div>
              
              <p className="text-white text-sm sm:text-base font-bold tracking-tight">
                Processing your file...
              </p>
            </div>
          </div>
        )}

        {/* Card content wrapper */}
        <div className="relative z-10 flex items-center justify-center gap-4 sm:gap-6 lg:gap-8 p-3 sm:p-4 lg:p-6 rounded-xl sm:rounded-2xl bg-white/3 backdrop-blur-sm border border-blue-400/15 w-full">
          {/* Icon with Electric Blue glow */}
          <div className="relative flex-shrink-0">
          <div
            className="absolute inset-0 rounded-xl sm:rounded-2xl bg-blue-400/30 blur-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            aria-hidden="true"
          />
          <div className="relative flex h-14 w-14 sm:h-16 sm:w-16 lg:h-20 lg:w-20 items-center justify-center rounded-xl sm:rounded-2xl bg-white/90 backdrop-blur-sm border border-blue-400/20 shadow-lg shadow-blue-500/10 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
            <UploadCloud className="h-7 w-7 sm:h-8 sm:w-8 lg:h-10 lg:w-10 text-blue-500 drop-shadow-[0_0_20px_rgba(59,130,246,0.6)]" />
          </div>
        </div>

          {/* Text content */}
          <div className="flex flex-col items-start gap-2 sm:gap-3 flex-1">
            <div className="flex items-center gap-2">
              <span className="h-1 w-4 sm:w-6 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full" aria-hidden="true" />
              <p className="text-white text-lg sm:text-xl lg:text-2xl font-bold tracking-tight drop-shadow-sm leading-tight">
                Drag & Drop Files Here {addMoreFiles === true ? "To Add More" : ""}
              </p>
            </div>
            
            <p className="text-white/70 text-sm sm:text-base font-medium tracking-normal">
              Secure upload for <span className="text-blue-400 font-semibold">high-value documents</span>
            </p>
            <p className="text-white/60 text-sm sm:text-base font-normal tracking-normal">
              or <span className="text-blue-400 font-semibold cursor-pointer hover:text-blue-300 transition-colors">
                browse files
              </span>
            </p>
            
            <div className="w-full h-0.5 sm:h-0.75 bg-gradient-to-r from-transparent via-blue-400/15 to-transparent group-hover:via-blue-400/50 transition-all duration-300" />
            
            <div className="flex items-center gap-2 sm:gap-3">
              <span className="h-0.5 w-3 sm:w-4 bg-blue-400/25 rounded-full" aria-hidden="true" />
              <p className="text-white/40 text-xs sm:text-sm font-medium tracking-normal">
                Supported formats: <span className="text-blue-400/70 font-semibold">{validFileTypes}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Corner accent (smooth, no pulse) */}
        <span className="absolute top-0 right-0 w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-tr-2xl sm:rounded-tr-3xl bg-gradient-to-bl from-blue-400/10 via-blue-400/3 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" aria-hidden="true" />
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

      {/* Error message */}
      {error && (
        <div className="relative overflow-hidden rounded-xl sm:rounded-2xl border border-red-500/40 bg-red-500/15 p-3 sm:p-4 backdrop-blur-sm">
          <span className="absolute inset-0 rounded-xl sm:rounded-2xl bg-red-500/10" aria-hidden="true" />
          <div className="relative flex items-center gap-2 sm:gap-3">
            <div className="h-5 w-5 sm:h-6 sm:w-6 rounded-full bg-red-500/20 flex items-center justify-center">
              <span className="text-red-400 text-sm sm:text-base font-bold">!</span>
            </div>
            <p className="text-red-400 text-sm sm:text-base font-semibold tracking-tight drop-shadow-sm">
              {error}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export function getAcceptString(formats: ImageFormat[] | undefined) {
  return formats?.map((format) => `.${format}`).join(",") ?? ".jpg,.jpeg,.png,.webp";
}