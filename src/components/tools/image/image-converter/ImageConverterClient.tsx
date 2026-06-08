"use client";

import { useEffect, useMemo, useState } from "react";
import { saveAs } from "file-saver";

import { DropZone, getAcceptString } from "@/components/ui/DropZone";
import { ProgressBar } from "@/components/ui/ProgressBar";

import { ToolConfig } from "@/types/image-converter.types";
import { convertImage } from "@/features/image-converter/converters/convertImage";
import { validateImage } from "@/features/image-converter/validateImage";
import { getImageMetadata } from "@/features/image-converter/image-metadata/getImageMetadata";
import { ImageMetadata } from "@/types/imageTypes";
import { generateFileName } from "@/features/image-converter/generateFileName";
import { normalizeFile } from "@/features/image-converter/normalizeFile";
import { CompressorConfig } from "@/types/image-compressor.types";

interface Props {
  config: ToolConfig;
}

export default function ImageConverterClient({
  config,
}: Props) {
  const [metadata, setMetadata] =
    useState<ImageMetadata | null>(null);

  const [file, setFile] =
    useState<File | null>(null);

  const [progress, setProgress] =
    useState(0);

  const [processing, setProcessing] =
    useState(false);

  const [error, setError] =
    useState("");

  const [outputUrl, setOutputUrl] =
    useState<string | null>(null);

  // ----------------------------
  // PREVIEW URL
  // ----------------------------
  const [previewUrl, setPreviewUrl] =
  useState<string | null>(null);

useEffect(() => {
  if (!file) {
    setPreviewUrl(null);
    return;
  }

  const url =
    URL.createObjectURL(file);

  setPreviewUrl(url);

  return () => {
    URL.revokeObjectURL(url);
  };
}, [file]);

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  // ----------------------------
  // OUTPUT URL CLEANUP
  // ----------------------------
  useEffect(() => {
    return () => {
      if (outputUrl) {
        URL.revokeObjectURL(outputUrl);
      }
    };
  }, [outputUrl]);

  // ----------------------------
  // FILE HANDLER
  // ----------------------------
  const handleFiles = async (
    files: File[]
  ) => {
    try {
      const selected = files[0];

      if (!selected) return;

      validateImage(selected);

      const normalized =
        normalizeFile(selected);

      if (
        !normalized.format
      ) {
        setError(
          "Unsupported file format"
        );
        return;
      }

      const imageMetadata =
        await getImageMetadata(
          selected
        );

      // cleanup previous output
      if (outputUrl) {
        URL.revokeObjectURL(outputUrl);
      }

      setOutputUrl(null);
      setFile(selected);
      setMetadata(imageMetadata);

      setError("");
      setProgress(0);
      setProcessing(false);
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
  const handleConvert =
    async () => {
      if (!file) return;

      try {
        setProcessing(true);
        setError("");
        setProgress(10);

        validateImage(file);

        const blob =
          await convertImage(file, {
            targetFormat:
              config.outputFormats[0],
            quality: 0.92,
          });

        setProgress(85);

        // cleanup previous output
        if (outputUrl) {
          URL.revokeObjectURL(
            outputUrl
          );
        }

        const url =
          URL.createObjectURL(blob);

        setOutputUrl(url);

        setProgress(100);
      } catch (err) {
        console.error(err);

        setError(
          "Failed to convert image."
        );
      } finally {
        setProcessing(false);
      }
    };

  // ----------------------------
  // DOWNLOAD
  // ----------------------------
  const handleDownload = () => {
    if (!outputUrl || !file) {
      return;
    }

    const fileName =
      generateFileName(
        file.name || "image",
        "converted",
        config.outputFormats[0]
      );

    saveAs(outputUrl, fileName);
  };

  // ----------------------------
  // UI STATE
  // ----------------------------
  const isReady =
    !!file && !outputUrl;

  const isDone =
    !!outputUrl;

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6 text-white">

      <h1 className="text-3xl font-bold tracking-tight">
        {config.title}
      </h1>

      <DropZone
        allowMultiple={false}
        onFiles={handleFiles}
        validFileTypes={getAcceptString(
          config.inputFormats
        )}
      />

      {error && (
        <div className="text-red-500 text-sm">
          {error}
        </div>
      )}

      {isReady && file && (
        <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-gray-950/60 to-gray-900/30 p-5 space-y-4">

          <div className="flex justify-between">
            <span className="text-white/80 truncate">
              📄 {file.name}
            </span>

            <span className="text-white/40 text-sm">
              {(
                file.size /
                1024 /
                1024
              ).toFixed(2)}{" "}
              MB
            </span>
          </div>

          {previewUrl && (
            <img
              src={previewUrl}
              alt="preview"
              className="rounded-lg max-h-96 mx-auto"
            />
          )}

          {metadata && (
            <div className="text-sm text-white/60 space-y-1">
              <div>
                Dimensions:{" "}
                {metadata.width} ×{" "}
                {metadata.height}
              </div>

              <div>
                Size:{" "}
                {(
                  metadata.size /
                  1024 /
                  1024
                ).toFixed(2)}{" "}
                MB
              </div>

              <div>
                Type:{" "}
                {file.type ||
                  "unknown"}
              </div>
            </div>
          )}

          <button
            onClick={handleConvert}
            disabled={processing}
            className={`w-full p-3 rounded-xl transition ${
              processing
                ? "bg-gray-800 text-gray-500 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-500"
            }`}
          >
            {processing
              ? "Converting..."
              : "Convert Image"}
          </button>
        </div>
      )}

      {processing && (
        <ProgressBar value={progress} />
      )}

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