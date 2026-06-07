"use client";

import { useEffect, useMemo, useState } from "react";
import { saveAs } from "file-saver";

import { DropZone, getAcceptString } from "@/components/ui/DropZone";
import { ProgressBar } from "@/components/ui/ProgressBar";

import { CompressorConfig } from "@/types/image-compressor.types";

import { validateImage } from "@/features/image-converter/validateImage";
import { normalizeFile } from "@/features/image-converter/normalizeFile";
import { getImageMetadata } from "@/features/image-converter/image-metadata/getImageMetadata";
import { generateFileName } from "@/features/image-converter/generateFileName";

import { compressImage } from "@/features/image-compressor/compressImage";

import { ImageMetadata } from "@/types/imageTypes";
import { CompressionResult } from "@/types/compression.types";

interface Props {
  config: CompressorConfig;
}

export default function ImageCompressorClient({
  config,
}: Props) {
  const [file, setFile] =
    useState<File | null>(null);

  const [metadata, setMetadata] =
    useState<ImageMetadata | null>(null);

  const [quality, setQuality] =
    useState(
      config.defaultQuality ?? 80
    );

  const [processing, setProcessing] =
    useState(false);

  const [progress, setProgress] =
    useState(0);

  const [error, setError] =
    useState("");

  const [outputUrl, setOutputUrl] =
    useState<string | null>(null);

  const [result, setResult] =
    useState<CompressionResult | null>(
      null
    );

  // -----------------------------
  // Preview URL
  // -----------------------------
  const previewUrl = useMemo(() => {
    if (!file) return null;

    return URL.createObjectURL(file);
  }, [file]);

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(
          previewUrl
        );
      }
    };
  }, [previewUrl]);

  // -----------------------------
  // Output URL Cleanup
  // -----------------------------
  useEffect(() => {
    return () => {
      if (outputUrl) {
        URL.revokeObjectURL(
          outputUrl
        );
      }
    };
  }, [outputUrl]);

  // -----------------------------
  // File Handler
  // -----------------------------
  const handleFiles = async (
    files: File[]
  ) => {
    try {
      const selected = files[0];

      if (!selected) return;

      validateImage(selected);

      const normalized =
        normalizeFile(selected);

      if ((!!normalized.format) && 
        (!config.allowedFormats.includes(
          normalized.format
        ))
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

      if (outputUrl) {
        URL.revokeObjectURL(
          outputUrl
        );
      }

      setFile(selected);
      setMetadata(imageMetadata);

      setOutputUrl(null);
      setResult(null);

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

  // -----------------------------
  // Compress
  // -----------------------------
  const handleCompress =
    async () => {
      if (!file) return;

      try {
        setProcessing(true);
        setError("");

        setProgress(10);

        const compressionResult =
          await compressImage(file, {
            mode: "quality",
            quality:
              quality / 100,
          });

        setProgress(80);

        if (outputUrl) {
          URL.revokeObjectURL(
            outputUrl
          );
        }

        const url =
          URL.createObjectURL(
            compressionResult.blob
          );

        setOutputUrl(url);

        setResult(
          compressionResult
        );

        setProgress(100);
      } catch (err) {
        console.error(err);

        setError(
          "Failed to compress image."
        );
      } finally {
        setProcessing(false);
      }
    };

  // -----------------------------
  // Download
  // -----------------------------
  const handleDownload = () => {
    if (
      !outputUrl ||
      !file
    ) {
      return;
    }

    const extension =
      file.name
        .split(".")
        .pop() ?? "jpg";

    const fileName =
      generateFileName(
        file.name,
        "compressed",
        extension
      );

    saveAs(
      outputUrl,
      fileName
    );
  };

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
          config.allowedFormats
        )}
      />

      {error && (
        <div className="text-red-500 text-sm">
          {error}
        </div>
      )}

      {isReady && file && (
        <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-gray-950/60 to-gray-900/30 p-5 space-y-5">

          <div className="flex justify-between">
            <span className="truncate text-white/80">
              📄 {file.name}
            </span>

            <span className="text-sm text-white/50">
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

          {/* Compression Control */}

          <div className="space-y-2">
            <div className="flex justify-between text-sm">

              <span>
                Compression Quality
              </span>

              <span>
                {quality}%
              </span>

            </div>

            <input
              type="range"
              min={10}
              max={100}
              value={quality}
              onChange={(e) =>
                setQuality(
                  Number(
                    e.target.value
                  )
                )
              }
              className="w-full"
            />
          </div>

          <button
            onClick={
              handleCompress
            }
            disabled={
              processing
            }
            className={`w-full p-3 rounded-xl transition ${
              processing
                ? "bg-gray-800 text-gray-500 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-500"
            }`}
          >
            {processing
              ? "Compressing..."
              : "Compress Image"}
          </button>

        </div>
      )}

      {processing && (
        <ProgressBar
          value={progress}
        />
      )}

      {isDone &&
        outputUrl &&
        result && (
          <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-gray-950/60 to-gray-900/30 p-5 space-y-5">

            <img
              src={outputUrl}
              alt="compressed"
              className="rounded-lg max-h-96 mx-auto"
            />

            <div className="grid grid-cols-3 gap-4">

              <div className="rounded-xl border border-white/10 p-4">
                <div className="text-white/50 text-xs">
                  Original
                </div>

                <div className="font-semibold">
                  {(
                    result.originalSize /
                    1024 /
                    1024
                  ).toFixed(2)}{" "}
                  MB
                </div>
              </div>

              <div className="rounded-xl border border-white/10 p-4">
                <div className="text-white/50 text-xs">
                  Compressed
                </div>

                <div className="font-semibold">
                  {(
                    result.compressedSize /
                    1024 /
                    1024
                  ).toFixed(2)}{" "}
                  MB
                </div>
              </div>

              <div className="rounded-xl border border-white/10 p-4">
                <div className="text-white/50 text-xs">
                  Savings
                </div>

                <div className="font-semibold text-green-400">
                  {result.savingsPercent}%
                </div>
              </div>

            </div>

            <button
              onClick={
                handleDownload
              }
              className="w-full bg-green-600 hover:bg-green-500 p-3 rounded-xl"
            >
              Download Image
            </button>

          </div>
        )}

    </div>
  );
}