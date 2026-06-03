"use client";

import { useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

type Props = {
  targetRef: React.RefObject<HTMLElement | null>;
  filename?: string;
};

export function FinancePdfExport({ targetRef, filename = "finance-report.pdf" }: Props) {
  const [exporting, setExporting] = useState(false);

  const handleExport = async () => {
    if (!targetRef.current) return;
    setExporting(true);
    try {
      const canvas = await html2canvas(targetRef.current, {
        scale: 2,
        backgroundColor: "#0f172a",
        useCORS: true,
      });

      const imageData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({ orientation: "portrait", unit: "px", format: "a4" });
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const ratio = Math.min(pageWidth / canvas.width, pageHeight / canvas.height);
      const imageWidth = canvas.width * ratio;
      const imageHeight = canvas.height * ratio;
      pdf.addImage(imageData, "PNG", 0, 0, imageWidth, imageHeight);
      pdf.save(filename);
    } catch (error) {
      console.error("PDF export failed", error);
    } finally {
      setExporting(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleExport}
      className="button-primary-transparent"
      disabled={exporting}
    >
      {exporting ? "Exporting PDF…" : "Download PDF"}
    </button>
  );
}
