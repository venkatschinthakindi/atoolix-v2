"use client";

import { useEffect, useMemo, useState } from "react";
import { saveAs } from "file-saver";

import { DropZone, getAcceptString } from "@/components/ui/dropZone";
import { ProgressBar } from "@/components/ui/progressBar";

import { CompressorConfig } from "@/types/imageCompressor.types";

import { validateImage } from "@/features/imageConverter/validateImage";
import { normalizeFile } from "@/features/imageConverter/normalizeFile";
import { getImageMetadata } from "@/features/imageConverter/imageMetadata/getImageMetadata";
import { generateFileName } from "@/features/imageConverter/generateFileName";

import { compressImage } from "@/features/imageCompressor/compressImage";

import { ImageMetadata } from "@/types/imageTypes";
import { CompressionResult } from "@/types/compression.types";
import { PreviewCard } from "../imageToolUI/previewCard";
import { MetadataCard } from "../imageToolUI/metadataCard";
import { DownloadCard } from "../imageToolUI/downloadCard";
import { CompressionStatsCard } from "../imageToolUI/compressionStatsCard";

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
    const [targetKB, setTargetKB] =
  useState(
    config.targetKB ?? 100
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
        (!config?.allowedFormats?.includes(
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
            mode: config.mode ?? "quality",
            quality: quality / 100,
            targetKB: config.targetKB,
            lockTarget: config.lockTarget
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
  const validFileTypes = getAcceptString(config.allowedFormats);

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6 text-white">
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

          <PreviewCard
            src={previewUrl}
            alt="preview"
          />

          {metadata && (
            <MetadataCard
            metadata={metadata}
            file={file}
            />
          )}

          {/* Compression Control */}

          {/* <div className="space-y-2">
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
             */}
             {config.mode ===
            "quality" && (
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
          )}

          {config.mode ===
            "target-size" && (

            <div className="space-y-2">

              <label className="text-sm text-white/70">
                Target Size (KB)
              </label>
              <span>
                  {targetKB} KB
                </span>
              <input
                type="range"
                min={1}
                value={targetKB}
                disabled={
                  config.lockTarget
                }
                onChange={(e) =>
                  setTargetKB(
                    Number(
                      e.target.value
                    )
                  )
                }
                className="w-full"
              />

            </div>
          )}
          
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
          <DownloadCard
            imageUrl={outputUrl}
            alt="converted"
            onDownload={handleDownload}>
                <CompressionStatsCard
                    originalSize={result.originalSize}
                    compressedSize={result.compressedSize}
                    savingsPercent={result.savingsPercent}
                />
            </DownloadCard>
        )}

    </div>
  );
}