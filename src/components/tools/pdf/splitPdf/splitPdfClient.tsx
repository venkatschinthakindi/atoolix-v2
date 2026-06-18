"use client";

import { useEffect, useState } from "react";
import { asyncGetPdfLib } from "@/lib/pdfLibUtility";
import { saveAs } from "file-saver";
import JSZip from "jszip";

import { DropZone } from "@/components/ui/dropZone";
import { ProgressBar } from "@/components/ui/progressBar";

import { Props } from "@/types/props";
import { PDFItem } from "@/types/pdfItem";
import { ToolState } from "@/types/toolState";

export default function PdfSpliterClient({
  config,
}: Props) {
  const [dropzoneKey, setDropzoneKey] = useState(0);
  const [pdfs, setPDFs] = useState<PDFItem[]>([]);
  const [progress, setProgress] = useState(0);

  const [state, setState] =
    useState<ToolState>("idle");

  const [splitOption, setSplitOption] =
    useState<"single" | "multiple">("multiple");

  const [downloadableContent, setDownloadableContent] =
    useState<Blob | null>(null);

  useEffect(() => {
    resetTool();
  }, [splitOption]);

  const resetTool = () => {
    setPDFs([]);
    setProgress(0);
    setDownloadableContent(null);
    setState("idle");
    setDropzoneKey((prev) => prev + 1);
  };

  const parsePages = (input: string, total: number) => {
    const selected = Array(total).fill(false);

    const clean = input.toLowerCase().replace(/\s/g, "");
    if (!clean) return selected;

    const [includePart, exceptPart] = clean.split("except");

    // -------------------------
    // 1. INCLUDE ENGINE
    // -------------------------
    const applyPattern = (pattern: string, target: boolean[]) => {
      if (!pattern) return;

      if (pattern === "all") {
        for (let i = 0; i < total; i++) target[i] = true;
        return;
      }

      const parts = pattern.split(",");

      parts.forEach((part) => {
        if (!part) return;

        if (part.startsWith("first-")) {
          const n = Number(part.replace("first-", ""));
          for (let i = 0; i < n && i < total; i++) target[i] = true;
          return;
        }

        if (part.startsWith("last-")) {
          const n = Number(part.replace("last-", ""));
          for (let i = total - n; i < total; i++) {
            if (i >= 0) target[i] = true;
          }
          return;
        }

        if (part === "odd") {
          for (let i = 0; i < total; i++) {
            if ((i + 1) % 2 !== 0) target[i] = true;
          }
          return;
        }

        if (part === "even") {
          for (let i = 0; i < total; i++) {
            if ((i + 1) % 2 === 0) target[i] = true;
          }
          return;
        }

        if (part.includes("-")) {
          const [a, b] = part.split("-").map(Number);
          for (let i = a - 1; i < b && i < total; i++) {
            if (i >= 0) target[i] = true;
          }
          return;
        }

        const idx = Number(part) - 1;
        if (!isNaN(idx) && idx >= 0 && idx < total) {
          target[idx] = true;
        }
      });
    };

    // -------------------------
    // APPLY INCLUDE
    // -------------------------
    applyPattern(includePart, selected);

    // If no include, default = none selected
    if (!includePart || includePart === "") {
      return selected;
    }

    // 2. EXCEPT ENGINE (ENHANCED)
    // -------------------------
    if (exceptPart) {
      const excluded = Array(total).fill(false);

      const exceptItems = exceptPart.split(",");

      exceptItems.forEach((item) => {
        if (!item) return;

        const part = item.trim();

        if (part === "odd") {
          for (let i = 0; i < total; i++) {
            if ((i + 1) % 2 !== 0) excluded[i] = true;
          }
          return;
        }

        if (part === "even") {
          for (let i = 0; i < total; i++) {
            if ((i + 1) % 2 === 0) excluded[i] = true;
          }
          return;
        }

        if (part.startsWith("first-")) {
          const n = Number(part.replace("first-", ""));
          for (let i = 0; i < n && i < total; i++) {
            excluded[i] = true;
          }
          return;
        }

        if (part.startsWith("last-")) {
          const n = Number(part.replace("last-", ""));
          for (let i = total - n; i < total; i++) {
            if (i >= 0) excluded[i] = true;
          }
          return;
        }

        if (part.includes("-")) {
          const [a, b] = part.split("-").map(Number);
          for (let i = a - 1; i < b && i < total; i++) {
            if (i >= 0) excluded[i] = true;
          }
          return;
        }

        const idx = Number(part) - 1;
        if (!isNaN(idx) && idx >= 0 && idx < total) {
          excluded[idx] = true;
        }
      });

      // remove excluded from selected
      for (let i = 0; i < total; i++) {
        if (excluded[i]) {
          selected[i] = false;
        }
      }
    }

    return selected;
  };
  const handleFiles = async (
    files: File[]
  ) => {
    const pdfItems: PDFItem[] = [];
    const PDFDocument  = await asyncGetPdfLib();
    for (const file of files) {
      const buffer =
        await file.arrayBuffer();

      const doc =
        await PDFDocument.load(buffer);

      pdfItems.push({
        file,
        name: file.name,
        pages: Array(
          doc.getPageCount()
        ).fill(false),
        input: "",
        totalPages:
          doc.getPageCount(),
      });
    }

    setPDFs(pdfItems);
    setDownloadableContent(null);

    setState(
      pdfItems.length
        ? "ready"
        : "idle"
    );
  };

  const updateInput = (
    index: number,
    value: string
  ) => {
    const updated = [...pdfs];

    updated[index].input = value;

    updated[index].pages =
      parsePages(
        value,
        updated[index].totalPages
      );

    setPDFs(updated);
  };

  const splitPDFs = async () => {
    try {
      setState("processing");
      const PDFDocument  = await asyncGetPdfLib();
      setProgress(10);

      if (
        splitOption === "single"
      ) {
        const merged =
          await PDFDocument.create();

        for (
          let i = 0;
          i < pdfs.length;
          i++
        ) {
          const buffer =
            await pdfs[
              i
            ].file.arrayBuffer();

          const doc =
            await PDFDocument.load(
              buffer
            );

          const selectedIndices =
            pdfs[i].pages
              .map((v, idx) =>
                v ? idx : -1
              )
              .filter(
                (idx) =>
                  idx !== -1
              );

          const copied =
            await merged.copyPages(
              doc,
              selectedIndices
            );

          copied.forEach((page) =>
            merged.addPage(page)
          );

          setProgress(
            10 +
              ((i + 1) /
                pdfs.length) *
                80
          );
        }

        const bytes =
          await merged.save();

        const blob =
          new Blob(
            [
              new Uint8Array(
                bytes
              ),
            ],
            {
              type: "application/pdf",
            }
          );

        setDownloadableContent(
          blob
        );
      } else {
        const zip =
          new JSZip();

        for (
          let i = 0;
          i < pdfs.length;
          i++
        ) {
          const buffer =
            await pdfs[
              i
            ].file.arrayBuffer();

          const doc =
            await PDFDocument.load(
              buffer
            );
                      const selectedIndices =
            pdfs[i].pages
              .map((v, idx) =>
                v ? idx : -1
              )
              .filter(
                (idx) =>
                  idx !== -1
              );

          if (
            !selectedIndices.length
          ) {
            continue;
          }

          const newDoc =
            await PDFDocument.create();

          const copied =
            await newDoc.copyPages(
              doc,
              selectedIndices
            );

          copied.forEach((page) =>
            newDoc.addPage(page)
          );

          const bytes =
            await newDoc.save();

          zip.file(
            pdfs[i].name.replace(
              ".pdf",
              "-selected.pdf"
            ),
            bytes
          );

          setProgress(
            10 +
              ((i + 1) /
                pdfs.length) *
                80
          );
        }

        const zipBlob =
          await zip.generateAsync({
            type: "blob",
          });

        setDownloadableContent(
          zipBlob
        );
      }

      setProgress(100);
      setState("done");
    } catch (error) {
      console.error(
        "Split failed:",
        error
      );

      resetTool();
    }
  };

  const downloadProcessedFile =
    () => {
      if (
        !downloadableContent
      )
        return;

      const fileName =
        splitOption ===
        "single"
          ? "selected_pages.pdf"
          : "split_pages.zip";

      saveAs(
        downloadableContent,
        fileName
      );

      setTimeout(() => {
        resetTool();
      }, 500);
    };

  const getSelectedSummary = (
    pages: boolean[]
  ) => {
    const selectedIndices =
      pages
        .map((v, idx) =>
          v ? idx + 1 : -1
        )
        .filter(
          (v) => v !== -1
        );

    if (
      !selectedIndices.length
    ) {
      return "No pages selected";
    }

    return selectedIndices.join(
      ", "
    );
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6 text-white">
      <DropZone
        key={dropzoneKey}
        allowMultiple={true}
        validFileTypes=".pdf"
        onFiles={handleFiles}
      />

      <div className="space-y-5">
        {pdfs.map(
          (pdf, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-white/10 bg-gradient-to-b from-gray-950/60 to-gray-900/30 p-5 shadow-xl backdrop-blur"
            >
              <div className="flex justify-between items-center mb-3">
                <div className="text-white/80 font-medium truncate">
                  📄 {pdf.name}
                </div>

                <div className="text-xs text-white/40">
                  {
                    pdf.totalPages
                  }{" "}
                  pages
                </div>
              </div>

              <input
                value={
                  pdf.input
                }
                onChange={(
                  e
                ) =>
                  updateInput(
                    idx,
                    e.target.value
                  )
                }
                placeholder="e.g. first-3, 9-13, 19, last-2, all, odd, even, except 21-23"
                className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder:text-white/40 outline-none focus:border-blue-500 transition"
              />

              <div className="text-xs text-white/40 mt-2">
                Selected
                pages:{" "}
                <span className="text-blue-400">
                  {getSelectedSummary(
                    pdf.pages
                  )}
                </span>
              </div>
            </div>
          )
        )}
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="flex gap-2 items-center mt-2 md:mt-0 text-white/80 text-sm">
          <span>
            Output:
          </span>

          <select
            value={
              splitOption
            }
            onChange={(
              e
            ) =>
              setSplitOption(
                e.target
                  .value as
                  | "single"
                  | "multiple"
              )
            }
            className="bg-indigo-600/40 border w-full border-white/10 rounded px-3 py-1 cursor-pointer outline-none text-white"
          >
            <option value="single">
              Combine into
              1 PDF
            </option>

            <option value="multiple">
              Separate PDFs
              per file
              (ZIP)
            </option>
          </select>
        </div>
      </div>

      {pdfs.length >
        0 &&
        state !==
          "done" && (
          <button
            onClick={
              splitPDFs
            }
            disabled={
              state !==
              "ready"
            }
            className={`w-full p-3 rounded-xl transition ${
              state ===
              "ready"
                ? "bg-blue-600 hover:bg-blue-500 text-white"
                : "bg-gray-800 text-gray-500 cursor-not-allowed"
            }`}
          >
            {state ===
            "processing"
              ? "Processing..."
              : "Split PDF"}
          </button>
        )}

      {state ===
        "done" && (
        <button
          onClick={
            downloadProcessedFile
          }
          className="w-full p-3 rounded-xl bg-green-600 hover:bg-green-500 text-white transition"
        >
          Download
        </button>
      )}

      {state ===
        "processing" && (
        <ProgressBar
          value={
            progress
          }
        />
      )}

      {state ===
        "done" && (
        <div className="text-center text-green-400 text-sm">
          PDF processed
          successfully.
          Click Download
          to save the
          file.
        </div>
      )}
    </div>
  );
}