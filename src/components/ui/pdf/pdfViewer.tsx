"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  url: string;
  scale: number;
};

export default function PdfViewer({ url, scale }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [pdfjsLib, setPdfjsLib] = useState<any>(null);

  useEffect(() => {
    let cancelled = false;

    const loadPdfjs = async () => {
      const pdfModule = await import("pdfjs-dist");
      pdfModule.GlobalWorkerOptions.workerSrc = new URL(
        "pdfjs-dist/build/pdf.worker.min.mjs",
        import.meta.url
      ).toString();

      if (!cancelled) setPdfjsLib(pdfModule);
    };

    loadPdfjs();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!pdfjsLib || !url) return;

    let cancelled = false;

    const renderPdf = async () => {
      const loadingTask = pdfjsLib.getDocument(url);
      const pdf = await loadingTask.promise;

      const container = containerRef.current;
      if (!container || cancelled) return;

      container.innerHTML = "";

      for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
        if (cancelled) break;

        const page = await pdf.getPage(pageNum);
        const viewport = page.getViewport({ scale });

        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        if (!context) continue;

        canvas.height = viewport.height;
        canvas.width = viewport.width;

        await page.render({
          canvasContext: context,
          viewport,
        }).promise;

        const pageWrapper = document.createElement("div");
        pageWrapper.className = "mb-4 flex justify-center";
        pageWrapper.appendChild(canvas);
        container.appendChild(pageWrapper);
      }
    };

    renderPdf();

    return () => {
      cancelled = true;
    };
  }, [pdfjsLib, url, scale]);

  return (
    <div
      ref={containerRef}
      className="w-full h-full overflow-auto bg-gray-900 p-4"
    />
  );
}