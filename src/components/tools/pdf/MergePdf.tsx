
"use client";

import { useState } from "react";
import { PDFDocument } from "pdf-lib";
import { saveAs } from "file-saver";
import { DropZone } from "@/components/ui/dropZone";
import { ProgressBar } from "@/components/ui/progressBar";
import { PdfConverterToolProps } from "@/lib/toolRegistry";
import { ToolTitleDescription } from "@/components/ui/toolTitleDesc";

type ToolState =
  | "idle"
  | "ready"
  | "processing"
  | "done";
export default function PdfMergerTool({ initialExpression, theme, title,description, allowedFormats}: PdfConverterToolProps) {
  return <PdfMerger initialExpression={initialExpression} theme={theme} title={title} description={description} allowedFormats={allowedFormats} />;
}

function PdfMerger({ initialExpression, theme, title,description, allowedFormats}: PdfConverterToolProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [progress, setProgress] = useState(0);
  const [state, setState] = useState<ToolState>("idle");

  const handleFiles = (newFiles: File[]) => {
    setFiles(newFiles);
    setState(newFiles.length > 0 ? "ready" : "idle");
  };

  const resetTool = () => {
    setFiles([]);
    setProgress(0);
    setState("idle");
  };

  const merge = async () => {
    if (files.length < 2) return;

    setState("processing");
    setProgress(10);

    const merged = await PDFDocument.create();

    for (let i = 0; i < files.length; i++) {
      const buffer = await files[i].arrayBuffer();
      const pdf = await PDFDocument.load(buffer);

      const pages = await merged.copyPages(pdf, pdf.getPageIndices());
      pages.forEach((p) => merged.addPage(p));

      setProgress(10 + (i / files.length) * 80);
    }

    const bytes = await merged.save();

    const blob = new Blob([new Uint8Array(bytes)], {
      type: "application/pdf",
    });

    saveAs(blob, "merged.pdf");

    setProgress(100);
    setState("done");

    // AUTO RESET after short delay (UX pattern used in real tools)
    setTimeout(() => {
      resetTool();
    }, 1500);
  };

  const getDropText = () => {
    if (state === "processing") return "Merging your PDFs...";
    if (state === "done") return "Download complete ✔";
    if (files.length === 0) return "Drop your PDF files here or browse";
    if (files.length === 1) return "Add 1 more PDF to continue";
    return `${files.length} PDFs ready to merge`;
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 p-6">
      {/* <ToolTitleDescription title={title} description={description} /> */}

      {/* DROPZONE WRAPPER */}
      <div className="space-y-3">
        <DropZone allowMultiple={true} validFileTypes=".pdf" onFiles={handleFiles} />

        {/* FILE LIST */}
        {files.length > 0 && (
          <div className="bg-gray-950/40 border border-white/10 rounded-xl p-3 space-y-1">
            {files.map((f, i) => (
              <div key={i} className="text-white/60 text-sm">
                {i + 1}. {f.name}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ACTION BUTTON */}
      <button
        onClick={merge}
        disabled={state !== "ready"}
        className={`w-full p-3 rounded-xl transition ${
          state === "ready"
            ? "bg-blue-600 hover:bg-blue-500 text-white"
            : "bg-gray-800 text-gray-500 cursor-not-allowed"
        }`}
      >
        {state === "processing"
          ? "Processing..."
          : "Merge PDFs"}
      </button>

      {/* PROGRESS */}
      {state === "processing" && <ProgressBar value={progress} />}
    </div>
  );
}