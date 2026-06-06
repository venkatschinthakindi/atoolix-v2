"use client";

import { useState } from "react";
import { saveAs } from "file-saver";
import { compressPDF, CompressionLevel } from "@/utils/compressPDF";
import { DropZone } from "@/components/ui/DropZone";
import { ProgressBar } from "@/components/ui/ProgressBar";

export default function CompressClient() {
  const [file, setFile] = useState<File | null>(null);
  const [level, setLevel] = useState<CompressionLevel>("medium");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleFiles = (files: File[]) => {
    if (files?.[0]) setFile(files[0]);
  };

  const handleCompress = async () => {
    if (!file) return;

    setLoading(true);
    setProgress(10);

    try {
      setProgress(30);

      const compressed = await compressPDF(file, level);

      setProgress(80);

      const blob = new Blob([Uint8Array.from(compressed)], {
        type: "application/pdf",
      });

      saveAs(blob, "compressed.pdf");

      setProgress(100);

      setTimeout(() => {
        setFile(null);
        setProgress(0);
        setLoading(false);
      }, 800);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6 text-white">
      <h1 className="text-3xl font-bold">
        Make files smaller in seconds. No installation needed.
      </h1>

      {/* Upload */}
      <DropZone allowMultiple={false} validFileTypes=".pdf" onFiles={handleFiles} />

      {/* File Info */}
      {file && (
        <div className="p-4 rounded-xl border border-white/10 bg-gray-950/40">
          <p className="text-sm">{file.name}</p>
        </div>
      )}

      {/* Compression Levels */}
      <div className="grid grid-cols-3 gap-3">
        {(["low", "medium", "high"] as CompressionLevel[]).map((l) => (
          <button
            key={l}
            onClick={() => setLevel(l)}
            className={`p-3 rounded-xl border border-white/10 ${
              level === l ? "bg-blue-600" : "bg-gray-950/40"
            }`}
          >
            {l.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Action */}
      <button
        disabled={!file || loading}
        onClick={handleCompress}
        className="w-full bg-blue-600 hover:bg-blue-500 rounded-xl p-3 disabled:opacity-50"
      >
        {loading ? "Compressing..." : "Compress PDF"}
      </button>

      {/* Progress */}
      {loading && <ProgressBar value={progress} />}

      {/* SEO Content */}
      <div className="space-y-4 pt-6">
        <h2 className="text-xl font-semibold">How it works</h2>
        <p className="text-sm text-gray-300">
          Upload your PDF, choose compression level, and download optimized file instantly.
        </p>

        <h2 className="text-xl font-semibold">Features</h2>
        <ul className="text-sm text-gray-300 list-disc pl-5">
          <li>Fast client-side compression</li>
          <li>No file upload required</li>
          <li>Secure processing in browser</li>
        </ul>

        <h2 className="text-xl font-semibold">FAQ</h2>
        <p className="text-sm text-gray-300">
          Compression quality depends on PDF structure and images.
        </p>
      </div>
    </div>
  );
}