"use client";

import { ImageFormat } from "@/types/imageConverter.types";
import {
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { CloudUpload } from "lucide-react";

export function DropZone({
  onFiles,
  validFileTypes = ".jpg,.jpeg,.png,.webp,.pdf",
  allowMultiple = true,
  addMoreFiles = false,
  ref = null,
}: {
  onFiles: (files: File[]) => any;
  validFileTypes?: string;
  allowMultiple: boolean;
  addMoreFiles?: boolean;
  ref?: any;
}) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Track the fake-progress interval and the completion timeout so they
  // can be cancelled if the component unmounts mid-"upload" (e.g. the
  // user resets the tool or navigates away within the 2s window) -
  // otherwise these would fire setState calls on an unmounted component.
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const openPicker = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  useImperativeHandle(ref, () => ({
    openFilePicker: () => openPicker(),
  }));

  const validatePDF = useCallback(
    (file: File) => {
      const allowedMimeTypes = ["application/pdf"];

      const allowedExtensions = validFileTypes
        .split(",")
        .map((ext) => ext.trim().toLowerCase());

      const fileName = file.name.toLowerCase();

      const isValidMime = allowedMimeTypes.includes(file.type);

      const isValidExtension = allowedExtensions.some((ext) =>
        fileName.endsWith(ext)
      );

      return isValidMime || isValidExtension;
    },
    [validFileTypes]
  );

  const handleFiles = useCallback(
    (files: File[]) => {
      const pdfFiles = files.filter(validatePDF);

      if (pdfFiles.length === 0) {
        setError(`Invalid file type. Only ${validFileTypes} files are allowed.`);
        return;
      }

      setError(null);
      setIsUploading(true);
      setUploadProgress(0);

      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      intervalRef.current = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 90) {
            if (intervalRef.current) clearInterval(intervalRef.current);
            return 100;
          }

          return prev + 10;
        });
      }, 200);

      timeoutRef.current = setTimeout(() => {
        setIsUploading(false);
        onFiles(pdfFiles);
      }, 2000); // 10 steps × 200ms
    },
    [onFiles, validFileTypes, validatePDF]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);

      const files = Array.from(e.dataTransfer.files);

      handleFiles(files);
    },
    [handleFiles]
  );

  return (
    <div className="space-y-4 pt-4">
        <div
        onClick={openPicker}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`group relative overflow-hidden rounded-2xl border-2 border-dashed cursor-pointer transition-all duration-200
          ${
            isDragging
              ? "border-blue-500 bg-blue-500/5"
              : "border-border bg-surface-panel hover:border-accent-image hover:bg-accent-image-soft"
          }`}
      >
        {isUploading && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-surface-overlay backdrop-blur-sm">
            <div className="w-full max-w-sm rounded-xl border border-border bg-card p-8 shadow-2xl">
              <div className="flex flex-col items-center gap-5">
                <div className="w-full">
                  <div className="h-2 overflow-hidden rounded-full bg-surface-sunken">
                    <div
                      className="h-full rounded-full bg-accent-image transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>

                  <p className="mt-3 text-center text-sm text-foreground-secondary">
                    {uploadProgress}% Complete
                  </p>
                </div>

                <p className="text-sm font-medium text-foreground">
                  Processing your file...
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-col items-center px-8 py-2 text-center sm:px-12 sm:py-2">
          <h3 className="mt-2 text-md font-semibold tracking-tight text-foreground">
            {isDragging
              ? "Drop files here"
              : `Drag & drop your files ${
                  addMoreFiles ? "to Add More" : ""
                }`}
          </h3>

          <div className="flex gap-2">
            <CloudUpload className="h-10 w-10 text-status-success"></CloudUpload>
            <p className="mt-1 max-w-xl text-sm leading-6 text-foreground-secondary">
              or{" "}
              <span className="font-medium text-accent-image underline underline-offset-2">
                browse your device
              </span>
              <span>
                &nbsp;—— {validFileTypes} files
              </span>
            </p>
          </div>

          <p className="pt-2 text-[11px] text-foreground-faint">Processed entirely on your device. Nothing is uploaded.</p>

        </div>
      </div>
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
      {error && (
        <div className="flex items-start gap-3 rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3">
          <div className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-destructive/20">
            <span className="text-xs font-bold text-destructive">!</span>
          </div>

          <div>
            <p className="text-sm font-medium text-destructive">
              {error}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export function getAcceptString(formats: ImageFormat[] | undefined) {
  return (
    formats?.map((format) => `.${format}`).join(",") ??
    ".jpg,.jpeg,.png,.webp"
  );
}