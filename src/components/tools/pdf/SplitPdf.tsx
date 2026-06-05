// "use client";

// import { useState } from "react";
// import { PDFDocument } from "pdf-lib";
// import { saveAs } from "file-saver";
// import { DropZone } from "@/components/ui/DropZone";
// import { ProgressBar } from "@/components/ui/ProgressBar";

// type PDFItem = {
//   file: File;
//   name: string;
//   pages: boolean[];
//   input: string;
//   totalPages: number;
// };

// export default function SmartPDFTool() {
//   const [pdfs, setPDFs] = useState<PDFItem[]>([]);
//   const [progress, setProgress] = useState(0);
//   const [processing, setProcessing] = useState(false);

//   // Parse user input into boolean page array
//   const parsePages = (input: string, total: number) => {
//     const selected = Array(total).fill(false);
//     const clean = input.toLowerCase().replace(/\s/g, "");
//     const parts = clean.split(",");

//     parts.forEach((part) => {
//       if (!part) return;

//       if (part.startsWith("last-")) {
//         const n = Number(part.replace("last-", ""));
//         for (let i = total - n; i < total; i++) if (i >= 0) selected[i] = true;
//         return;
//       }

//       if (part.startsWith("first-")) {
//         const n = Number(part.replace("first-", ""));
//         for (let i = 0; i < n; i++) if (i >= 0) selected[i] = true;
//         return;
//       }

//       if (part.includes("-")) {
//         const [a, b] = part.split("-").map(Number);
//         for (let i = a - 1; i < b; i++) if (i >= 0 && i < total) selected[i] = true;
//         return;
//       }

//       const idx = Number(part) - 1;
//       if (!isNaN(idx) && idx >= 0 && idx < total) selected[idx] = true;
//     });

//     return selected;
//   };

//   const handleFiles = async (files: File[]) => {
//     const pdfItems: PDFItem[] = [];
//     for (const file of files) {
//       const buffer = await file.arrayBuffer();
//       const doc = await PDFDocument.load(buffer);
//       pdfItems.push({
//         file,
//         name: file.name,
//         pages: Array(doc.getPageCount()).fill(false),
//         input: "",
//         totalPages: doc.getPageCount(),
//       });
//     }
//     setPDFs(pdfItems);
//   };

//   const updateInput = (index: number, value: string) => {
//     const updated = [...pdfs];
//     updated[index].input = value;
//     updated[index].pages = parsePages(value, updated[index].totalPages);
//     setPDFs(updated);
//   };

//   // Merge PDFs based on selected pages
//   const mergePDFs = async () => {
//     const merged = await PDFDocument.create();
//     setProcessing(true);
//     setProgress(0);

//     for (let i = 0; i < pdfs.length; i++) {
//       const buffer = await pdfs[i].file.arrayBuffer();
//       const doc = await PDFDocument.load(buffer);
//       const selectedIndices = pdfs[i].pages
//         .map((v, idx) => (v ? idx : -1))
//         .filter((idx) => idx !== -1);
//       const copied = await merged.copyPages(doc, selectedIndices);
//       copied.forEach((p) => merged.addPage(p));

//       setProgress(Math.round(((i + 1) / pdfs.length) * 90));
//     }

//     const bytes = await merged.save();
//     const blob = new Blob([new Uint8Array(bytes)], { type: "application/pdf" });
//     saveAs(blob, "merged.pdf");

//     setProgress(100);
//     setTimeout(() => {
//       setProcessing(false);
//       setPDFs([]);
//       setProgress(0);
//     }, 1500);
//   };

//   return (
//     <div className="max-w-5xl mx-auto p-6 space-y-6 text-white">
//       <h1 className="text-3xl font-bold tracking-tight text-white">
//         Split a PDF into separate files easily and quickly
//       </h1>

//       {/* DropZone */}
//       <DropZone onFiles={handleFiles} />

//       {/* PDF Cards */}
//       <div className="space-y-5">
//         {pdfs.map((pdf, idx) => (
//           <div
//             key={idx}
//             className="rounded-2xl border border-white/10 bg-gradient-to-b from-gray-950/60 to-gray-900/30 p-5 shadow-xl backdrop-blur"
//           >
//             <div className="flex justify-between items-center mb-4">
//               <div className="text-white/80 font-medium truncate">
//                 📄 {pdf.name}
//               </div>
//               <div className="text-xs text-white/40">{pdf.totalPages} pages</div>
//             </div>

//             {/* Page Input */}
//             <input
//               value={pdf.input}
//               onChange={(e) => updateInput(idx, e.target.value)}
//               placeholder="e.g. first-3, 9-13, 19, last-2"
//               className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder:text-white/40 outline-none focus:border-blue-500 transition"
//             />
//             <div className="text-xs text-white/40 mt-2">
//               Try: <span className="text-blue-400">first-3, 9-13, 19, last-2</span>
//             </div>

//             {/* Live Preview Chips */}
//             <div className="flex flex-wrap gap-2 mt-4">
//               {pdf.pages.map((sel, i) => (
//                 <div
//                   key={i}
//                   className={`px-3 py-1 rounded-full text-xs transition-all
//                     ${sel ? "bg-blue-500 text-white shadow-md scale-105" : "bg-white/5 text-white/30"}`}
//                 >
//                   {i + 1}
//                 </div>
//               ))}
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Merge Button */}
//       {pdfs.length > 0 && (
//         <button
//           onClick={mergePDFs}
//           disabled={processing}
//           className={`w-full p-3 rounded-xl mt-4 transition ${
//             processing
//               ? "bg-gray-800 text-gray-500 cursor-not-allowed"
//               : "bg-blue-600 hover:bg-blue-500 text-white"
//           }`}
//         >
//           {processing ? "Processing..." : "Merge Selected Pages"}
//         </button>
//       )}

//       {/* Progress Bar */}
//       {processing && <ProgressBar value={progress} />}
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import { PDFDocument } from "pdf-lib";
import { saveAs } from "file-saver";
import JSZip from "jszip";
import { DropZone } from "@/components/ui/DropZone";
import { ProgressBar } from "@/components/ui/ProgressBar";

type PDFItem = {
  file: File;
  name: string;
  pages: boolean[];
  input: string;
  totalPages: number;
};

type Mode = "merge" | "split";

export default function SmartPDFTool() {
  const [pdfs, setPDFs] = useState<PDFItem[]>([]);
  const [progress, setProgress] = useState(0);
  const [processing, setProcessing] = useState(false);
  const [mode, setMode] = useState<Mode>("split");
  const [splitOption, setSplitOption] = useState<"single" | "multiple">("multiple");

  // Parse page selection input
  const parsePages = (input: string, total: number) => {
    const selected = Array(total).fill(false);
    const clean = input.toLowerCase().replace(/\s/g, "");

    if (!clean) return selected;
    if (clean === "all") return selected.map(() => true);
    if (clean === "odd") return selected.map((_, idx) => idx % 2 === 0);
    if (clean === "even") return selected.map((_, idx) => idx % 2 === 1);

    const parts = clean.split(",");
    parts.forEach((part) => {
      if (!part) return;

      if (part.startsWith("last-")) {
        const n = Number(part.replace("last-", ""));
        for (let i = total - n; i < total; i++) if (i >= 0) selected[i] = true;
        return;
      }
      if (part.startsWith("first-")) {
        const n = Number(part.replace("first-", ""));
        for (let i = 0; i < n; i++) selected[i] = true;
        return;
      }
      if (part.includes("-")) {
        const [a, b] = part.split("-").map(Number);
        for (let i = a - 1; i < b; i++) if (i >= 0 && i < total) selected[i] = true;
        return;
      }
      const idx = Number(part) - 1;
      if (!isNaN(idx) && idx >= 0 && idx < total) selected[idx] = true;
    });

    return selected;
  };

  const handleFiles = async (files: File[]) => {
    const pdfItems: PDFItem[] = [];
    for (const file of files) {
      const buffer = await file.arrayBuffer();
      const doc = await PDFDocument.load(buffer);
      pdfItems.push({
        file,
        name: file.name,
        pages: Array(doc.getPageCount()).fill(false),
        input: "",
        totalPages: doc.getPageCount(),
      });
    }
    setPDFs(pdfItems);
  };

  const updateInput = (index: number, value: string) => {
    const updated = [...pdfs];
    updated[index].input = value;
    updated[index].pages = parsePages(value, updated[index].totalPages);
    setPDFs(updated);
  };

  const mergePDFs = async () => {
    const merged = await PDFDocument.create();
    setProcessing(true);
    setProgress(0);

    for (let i = 0; i < pdfs.length; i++) {
      const buffer = await pdfs[i].file.arrayBuffer();
      const doc = await PDFDocument.load(buffer);
      const selectedIndices = pdfs[i].pages
        .map((v, idx) => (v ? idx : -1))
        .filter((idx) => idx !== -1);
      const copied = await merged.copyPages(doc, selectedIndices);
      copied.forEach((p) => merged.addPage(p));
      setProgress(Math.round(((i + 1) / pdfs.length) * 90));
    }

    const bytes = await merged.save();
    const blob = new Blob([new Uint8Array(bytes)], {
      type: "application/pdf",
    });
    saveAs(blob, "merged.pdf");

    setProgress(100);
    setTimeout(() => {
      setProcessing(false);
      setPDFs([]);
      setProgress(0);
    }, 1500);
  };

  const splitPDFs = async () => {
    setProcessing(true);
    setProgress(0);

    if (splitOption === "single") {
      const merged = await PDFDocument.create();
      for (let i = 0; i < pdfs.length; i++) {
        const buffer = await pdfs[i].file.arrayBuffer();
        const doc = await PDFDocument.load(buffer);
        const selectedIndices = pdfs[i].pages
          .map((v, idx) => (v ? idx : -1))
          .filter((idx) => idx !== -1);
        const copied = await merged.copyPages(doc, selectedIndices);
        copied.forEach((p) => merged.addPage(p));
        setProgress(Math.round(((i + 1) / pdfs.length) * 90));
      }
      const bytes = await merged.save();
      const blob = new Blob([new Uint8Array(bytes)], {
      type: "application/pdf",
    });
      saveAs(blob, "selected_pages.pdf");
    } else {
      const zip = new JSZip();
      for (let i = 0; i < pdfs.length; i++) {
        const buffer = await pdfs[i].file.arrayBuffer();
        const doc = await PDFDocument.load(buffer);
        const selectedIndices = pdfs[i].pages
          .map((v, idx) => (v ? idx : -1))
          .filter((idx) => idx !== -1);
        if (!selectedIndices.length) continue;

        const newDoc = await PDFDocument.create();
        const copied = await newDoc.copyPages(doc, selectedIndices);
        copied.forEach((p) => newDoc.addPage(p));
        const bytes = await newDoc.save();
        zip.file(pdfs[i].name.replace(".pdf", "-selected.pdf"), bytes);
        setProgress(Math.round(((i + 1) / pdfs.length) * 90));
      }

      const content = await zip.generateAsync({ type: "blob" });
      saveAs(content, "split_pages.zip");
    }

    setProgress(100);
    setTimeout(() => {
      setProcessing(false);
      setPDFs([]);
      setProgress(0);
    }, 1500);
  };

  const handleProcess = () => {
    if (mode === "merge") mergePDFs();
    else
    {
        splitPDFs();
    }
  };

  const getSelectedSummary = (pages: boolean[]) => {
    const selectedIndices = pages.map((v, idx) => (v ? idx + 1 : -1)).filter((v) => v !== -1);
    if (!selectedIndices.length) return "No pages selected";
    return selectedIndices.join(", ");
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6 text-white">
      <h1 className="text-3xl font-bold tracking-tight">Split a PDF into separate files easily and quickly</h1>
      {/* DropZone */}
      <DropZone onFiles={handleFiles} />

      {/* PDF Cards */}
      <div className="space-y-5">
        {pdfs.map((pdf, idx) => (
          <div
            key={idx}
            className="rounded-2xl border border-white/10 bg-gradient-to-b from-gray-950/60 to-gray-900/30 p-5 shadow-xl backdrop-blur"
          >
            <div className="flex justify-between items-center mb-3">
              <div className="text-white/80 font-medium truncate">📄 {pdf.name}</div>
              <div className="text-xs text-white/40">{pdf.totalPages} pages</div>
            </div>

            <input
              value={pdf.input}
              onChange={(e) => updateInput(idx, e.target.value)}
              placeholder="e.g. first-3, 9-13, 19, last-2, all, odd, even"
              className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder:text-white/40 outline-none focus:border-blue-500 transition"
            />
            <div className="text-xs text-white/40 mt-2">
              Selected pages:{" "}
              <span className="text-blue-400">{getSelectedSummary(pdf.pages)}</span>
            </div>
          </div>
        ))}
      </div>
      
      {/* Mode selection */}
      <div className="flex flex-col md:flex-row gap-4 items-center">
        
          <div className="flex gap-2 items-center mt-2 md:mt-0 text-white/80 text-sm">
            <span>Output:</span>
            <select
              value={splitOption}
              onChange={(e) => setSplitOption(e.target.value as any)}
              className="bg-indigo-600/40 border w-full border-white/10 rounded px-3 py-1 cursor-pointer outline-none text-white"
            >
              <option value="single">Combine into 1 PDF</option>
              <option value="multiple">Separate PDFs per file (ZIP)</option>
            </select>
          </div>
      </div>

      {/* Process Button */}
      {pdfs.length > 0 && (
        
        <button
          onClick={handleProcess}
          disabled={processing}
          className={`w-full p-3 rounded-xl mt-4 transition ${
            processing
              ? "bg-gray-800 text-gray-500 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-500 text-white"
          }`}
        >
          {processing
            ? "Processing..."
            : mode === "merge"
            ? "Merge Selected Pages"
            : "Split Selected Pages"}
        </button>
      )}

      {/* Progress Bar */}
      {processing && <ProgressBar value={progress} />}
    </div>
  );
}