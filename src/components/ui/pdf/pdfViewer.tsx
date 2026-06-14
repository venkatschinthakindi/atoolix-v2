"use client";

import { useEffect, useRef } from "react";
import * as pdfjsLib from 'pdfjs-dist';

pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url
).toString();


type Props = {
  url: string;
  scale: number;
};

export default function PdfViewer({ url, scale }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const renderPdf = async () => {
      const loadingTask = pdfjsLib.getDocument(url);
      const pdf = await loadingTask.promise;

      const container = containerRef.current;
      if (!container) return;

      container.innerHTML = "";

      // Render ALL pages (SaaS style)
      for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
        const page = await pdf.getPage(pageNum);

        const viewport = page.getViewport({ scale });

        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d")?? undefined;

        canvas.height = viewport.height;
        canvas.width = viewport.width;

        const renderContext = {
        canvas,
        canvasContext: context,
        viewport,
        };

        await page.render({
        canvas,
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
  }, [url, scale]);

  return (
    <div
      ref={containerRef}
      className="w-full h-full overflow-auto bg-gray-900 p-4"
    />
  );
}