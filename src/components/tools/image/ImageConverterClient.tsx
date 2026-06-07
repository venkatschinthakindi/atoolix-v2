"use client";

import { useEffect, useMemo, useState } from "react";
import { saveAs } from "file-saver";

import { DropZone, getAcceptString } from "@/components/ui/DropZone";
import { ProgressBar } from "@/components/ui/ProgressBar";

import { ToolConfig } from "@/types/image-converter.types";
import { convertImage } from "@/features/image-converter/convertImage";
import { validateImage } from "@/features/image-converter/validateImage";
import { getImageMetadata } from "@/features/image-converter/getImageMetadata";
import { ImageMetadata } from "@/types/imageTypes";
import { generateFileName } from "@/features/image-converter/generateFileName";
import { normalizeFile } from "@/features/image-converter/normalizeFile";

interface Props {
  config: ToolConfig;
}

export default function ImageConverterClient({ config }: Props) {
  const [metadata, setMetadata] = useState<ImageMetadata | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const [progress, setProgress] = useState(0);
  const [processing, setProcessing] = useState(false);

  const [error, setError] = useState("");
  const [outputUrl, setOutputUrl] = useState<string | null>(null);

  // ----------------------------
  // SAFE PREVIEW URL (FIXED LEAK)
  // ----------------------------
  const previewUrl = useMemo(() => {
    if (!file) return null;
    return URL.createObjectURL(file);
  }, [file]);

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  // ----------------------------
  // FILE HANDLER
  // ----------------------------
  const handleFiles = async (files: File[]) => {
    try {
      const selected = files[0];
      if (!selected) return;

      // validate first (IMPORTANT FIX)
      validateImage(selected);

      const normalized = normalizeFile(selected);

      if (normalized.format === "unknown") {
        setError("Unsupported file format");
        return;
      }

      const imageMetadata = await getImageMetadata(selected);

      setFile(selected);
      setMetadata(imageMetadata);

      setOutputUrl(null);
      setError("");
      setProgress(0);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Invalid file");
      }
    }
  };

  // ----------------------------
  // CONVERT
  // ----------------------------
  const handleConvert = async () => {
    if (!file) return;

    try {
      setProcessing(true);
      setError("");
      setProgress(10);

      // safety re-validation (important for SaaS)
      validateImage(file);

      const blob = await convertImage(file, {
        targetFormat: config.outputFormats[0],
        quality: 0.92,
      });

      setProgress(85);

      const url = URL.createObjectURL(blob);
      setOutputUrl(url);

      setProgress(100);
    } catch (err) {
      console.error(err);
      setError("Failed to convert image.");
    } finally {
      setProcessing(false);
    }
  };

  // ----------------------------
  // DOWNLOAD
  // ----------------------------
  const handleDownload = () => {
    if (!outputUrl || !file) return;

    const fileName = generateFileName(
      file.name || "image",
      "converted",
      config.outputFormats[0]
    );

    saveAs(outputUrl, fileName);
    setProgress(100);
    setTimeout(() => {
      setProcessing(false);
      setProgress(0);
    }, 1500);
  };

  // ----------------------------
  // UI STATE
  // ----------------------------
  const isReady = file && !outputUrl;
  const isDone = !!outputUrl;

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6 text-white">

      {/* TITLE */}
      <h1 className="text-3xl font-bold tracking-tight">
        {config.title}
      </h1>

      {/* DROPZONE */}
      <DropZone
        allowMultiple={false}
        onFiles={handleFiles}
        validFileTypes={getAcceptString(config.inputFormats)}
      />

      {/* ERROR */}
      {error && (
        <div className="text-red-500 text-sm">
          {error}
        </div>
      )}

      {/* FILE PREVIEW + META */}
      {isReady && file && (
        <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-gray-950/60 to-gray-900/30 p-5 space-y-4">

          {/* FILE INFO */}
          <div className="flex justify-between">
            <span className="text-white/80 truncate">
              📄 {file.name}
            </span>

            <span className="text-white/40 text-sm">
              {(file.size / 1024 / 1024).toFixed(2)} MB
            </span>
          </div>

          {/* PREVIEW */}
          {previewUrl && (
            <img
              src={previewUrl}
              alt="preview"
              className="rounded-lg max-h-96 mx-auto"
            />
          )}

          {/* METADATA */}
          {metadata && (
            <div className="text-sm text-white/60 space-y-1">
              <div>
                Dimensions: {metadata.width} × {metadata.height}
              </div>

              <div>
                Size: {(metadata.size / 1024 / 1024).toFixed(2)} MB
              </div>

              <div>
                Type: {file.type || "unknown"}
              </div>
            </div>
          )}

          {/* CONVERT BUTTON */}
          <button
            onClick={handleConvert}
            disabled={processing}
            className={`w-full p-3 rounded-xl transition ${
              processing
                ? "bg-gray-800 text-gray-500 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-500"
            }`}
          >
            {processing ? "Converting..." : "Convert Image"}
          </button>
        </div>
      )}

      {/* PROGRESS */}
      {processing && (
        <ProgressBar value={progress} />
      )}

      {/* OUTPUT */}
      {isDone && outputUrl && (
        <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-gray-950/60 to-gray-900/30 p-5 space-y-4">

          <img
            src={outputUrl}
            alt="converted"
            className="rounded-lg max-h-96 mx-auto"
          />

          <button
            onClick={handleDownload}
            className="w-full bg-green-600 hover:bg-green-500 p-3 rounded-xl"
          >
            Download Image
          </button>
        </div>
      )}
    </div>
  );
}