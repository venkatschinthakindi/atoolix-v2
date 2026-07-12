"use client";

import { useEffect, useRef, useState } from "react";
import { asyncGetJsPDFLib } from "@/lib/jsPdfLibUtility";
import { asyncGetJsPDFAutotableLib } from "@/lib/jsPdfAutotableUtility";
import { asyncGetHtmlToPdfLib } from "@/lib/htmlToPdfUtility";
import { initChartJS } from "@/lib/chartJsUtility";

type SummaryCard = {
  label: string;
  value: string;
  tone?: "neutral" | "positive" | "negative" | "accent";
};

type Props = {
  filename?: string;
  title?: string;
  subtitle?: string;
  generatedLabel?: string;
  summaryCards?: SummaryCard[];
  inputRows?: string[][];
  resultRows?: string[][];
  notes?: string[];
  disclaimer?: string;
  chartRef?: React.RefObject<HTMLElement | null>;
  hideChart?: boolean;
  buttonLabel?: string;
  onError?: (error: unknown) => void;
};

type JsPdfWithAutoTable = import("jspdf").jsPDF & {
  lastAutoTable?: {
    finalY: number;
  };
};

function isVisible(el: HTMLElement) {
  const style = window.getComputedStyle(el);
  return style.display !== "none" && style.visibility !== "hidden" && el.getClientRects().length > 0;
}

function safeFileName(name: string) {
  return name.replace(/[<>:"/\\|?*\x00-\x1F]/g, "_").replace(/\s+/g, " ").trim();
}

function ensurePdfExtension(name: string) {
  const trimmed = name.trim();
  return trimmed.toLowerCase().endsWith(".pdf") ? trimmed : `${trimmed}.pdf`;
}

function formatDateTime(value: Date) {
  return value.toLocaleString();
}

function toneBg(tone?: SummaryCard["tone"]): [number, number, number] {
  switch (tone) {
    case "positive":
      return [16, 185, 129];
    case "negative":
      return [239, 68, 68];
    case "accent":
      return [59, 130, 246];
    default:
      return [17, 24, 39];
  }
}

function withTimeout<T>(promise: Promise<T>, ms: number, message = "Timed out"): Promise<T> {
  return new Promise((resolve, reject) => {
    const timer = window.setTimeout(() => reject(new Error(message)), ms);

    promise.then(
      (value) => {
        clearTimeout(timer);
        resolve(value);
      },
      (error) => {
        clearTimeout(timer);
        reject(error);
      }
    );
  });
}

let cachedModulesPromise:
  | Promise<{
      jsPDF: typeof import("jspdf").jsPDF;
      autoTable: Awaited<ReturnType<typeof asyncGetJsPDFAutotableLib>>["autoTable"];
      toPng: Awaited<ReturnType<typeof asyncGetHtmlToPdfLib>>["toPng"];
    }>
  | null = null;

function getPdfModules() {
  if (!cachedModulesPromise) {
    cachedModulesPromise = Promise.all([
      asyncGetJsPDFLib(),
      asyncGetJsPDFAutotableLib(),
      asyncGetHtmlToPdfLib(),
    ]).then(([jspdfMod, autoTableMod, imageMod]) => ({
      jsPDF: jspdfMod.jsPDF,
      autoTable: autoTableMod.autoTable,
      toPng: imageMod.toPng,
    }));
  }

  return cachedModulesPromise;
}

export function FinancePdfExport({
  filename = "finance-report.pdf",
  title = "Investment Returns Report",
  subtitle = "Finance report generated from calculator values",
  generatedLabel = "Generated automatically from calculator data",
  summaryCards = [],
  inputRows = [],
  resultRows = [],
  notes = [],
  disclaimer = "This report is for informational purposes only and does not constitute financial advice.",
  chartRef,
  hideChart = false,
  buttonLabel = "Download Report",
  onError,
}: Props) {
  const [loading, setLoading] = useState(false);
  const exportingRef = useRef(false);
  const mountedRef = useRef(true);

  useEffect(() => {
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const handleExport = async () => {
    if (exportingRef.current) return;

    exportingRef.current = true;
    setLoading(true);

    try {
      await initChartJS();
      
      const { jsPDF, autoTable, toPng } = await getPdfModules();

      const pdf = new jsPDF("p", "mm", "a4") as JsPdfWithAutoTable;
      const pageW = 210;
      const marginX = 14;
      const contentW = pageW - marginX * 2;
      const footerY = 285;
      const topStart = 16;

      const addFooter = () => {
        const pages = pdf.getNumberOfPages();

        for (let i = 1; i <= pages; i += 1) {
          pdf.setPage(i);
          pdf.setDrawColor(229, 231, 235);
          pdf.setLineWidth(0.3);
          pdf.line(marginX, 278, pageW - marginX, 278);

          pdf.setFont("helvetica", "normal");
          pdf.setFontSize(8);
          pdf.setTextColor(107, 114, 128);

          const disclaimerLines = pdf.splitTextToSize(disclaimer, 140);
          pdf.text(disclaimerLines, marginX, footerY);
          pdf.text(`Page ${i} of ${pages}`, pageW - marginX, footerY, { align: "right" });
        }
      };

      const addSectionTitle = (text: string, y: number, color: [number, number, number] = [17, 24, 39]) => {
        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(14);
        pdf.setTextColor(color[0], color[1], color[2]);
        pdf.text(text, marginX, y);
        return y + 7;
      };

      const ensureSpace = (y: number, needed: number) => {
        if (y + needed > 270) {
          pdf.addPage();
          return topStart;
        }
        return y;
      };

      const titleLines = pdf.splitTextToSize(title, contentW - 8);

      pdf.setFillColor(15, 23, 42);
      pdf.rect(0, 0, pageW, 66, "F");

      pdf.setTextColor(255, 255, 255);
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(20);
      pdf.text(titleLines, marginX, 24);

      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(10);
      pdf.text(subtitle, marginX, 43, { maxWidth: contentW });
      pdf.setTextColor(191, 219, 254);
      pdf.text(generatedLabel, marginX, 54);
      pdf.text(formatDateTime(new Date()), marginX, 60);

      pdf.addPage();
      let y = topStart;
      pdf.setTextColor(17, 24, 39);

      if (summaryCards.length) {
        y = addSectionTitle("Executive Summary", y, [30, 41, 59]);

        const gap = 4;
        const cards = summaryCards.slice(0, 6);
        const cardW = (contentW - gap * 2) / 3;
        const cardH = 22;

        cards.forEach((card, idx) => {
          const col = idx % 3;
          const row = Math.floor(idx / 3);
          const x = marginX + col * (cardW + gap);
          const cy = y + row * (cardH + gap);
          const bg = toneBg(card.tone);

          pdf.setFillColor(bg[0], bg[1], bg[2]);
          pdf.roundedRect(x, cy, cardW, cardH, 3, 3, "F");
          pdf.setTextColor(255, 255, 255);
          pdf.setFont("helvetica", "normal");
          pdf.setFontSize(8);
          pdf.text(card.label, x + 4, cy + 7, { maxWidth: cardW - 8 });
          pdf.setFont("helvetica", "bold");
          pdf.setFontSize(11);
          pdf.text(card.value, x + 4, cy + 15, { maxWidth: cardW - 8 });
        });

        y += Math.ceil(cards.length / 3) * (cardH + gap) + 4;
      }

      if (inputRows.length) {
        y = ensureSpace(y, 40);
        y = addSectionTitle("Input Parameters", y);

        autoTable(pdf, {
          startY: y,
          theme: "grid",
          head: [["Parameter", "Value"]],
          body: inputRows,
          margin: { left: marginX, right: marginX },
          styles: { fontSize: 9, cellPadding: 3, textColor: 31 },
          headStyles: { fillColor: [17, 24, 39], textColor: 255, fontStyle: "bold" },
          alternateRowStyles: { fillColor: [248, 250, 252] },
          columnStyles: { 1: { halign: "right" } },
        });

        y = (pdf.lastAutoTable?.finalY ?? y) + 10;
      }

      if (resultRows.length) {
        y = ensureSpace(y, 40);
        y = addSectionTitle("Key Results", y, [15, 23, 42]);

        autoTable(pdf, {
          startY: y,
          theme: "grid",
          head: [["Metric", "Value"]],
          body: resultRows,
          margin: { left: marginX, right: marginX },
          styles: { fontSize: 9, cellPadding: 3, textColor: 31 },
          headStyles: { fillColor: [15, 23, 42], textColor: 255, fontStyle: "bold" },
          alternateRowStyles: { fillColor: [249, 250, 251] },
          columnStyles: { 1: { halign: "right" } },
        });

        y = (pdf.lastAutoTable?.finalY ?? y) + 10;
      }

      if (!hideChart && chartRef?.current && isVisible(chartRef.current as HTMLElement)) {
        y = ensureSpace(y, 110);
        y = addSectionTitle("Projection Chart", y, [30, 64, 175]);

        try {
          const chartImage = await withTimeout(
            toPng(chartRef.current as HTMLElement, {
              pixelRatio: 3,
              cacheBust: true,
              backgroundColor: "#ffffff",
            }),
            8000,
            "Chart export timed out"
          );

          pdf.addImage(chartImage, "PNG", marginX, y, contentW, 86);
          y += 96;
        } catch (chartError) {
          //console.warn("Chart export skipped:", chartError);
        }
      }

      if (notes.length) {
        y = ensureSpace(y, 30);
        y = addSectionTitle("Notes & Assumptions", y, [75, 85, 99]);
        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(9);
        pdf.setTextColor(55, 65, 81);

        for (const note of notes) {
          const lines = pdf.splitTextToSize(`• ${note}`, contentW);
          y = ensureSpace(y, lines.length * 5 + 4);
          pdf.text(lines, marginX, y);
          y += lines.length * 4 + 2;
        }
      }

      addFooter();

      const finalFileName = safeFileName(ensurePdfExtension(filename));
      pdf.save(finalFileName);
    } catch (error) {
      //console.error("PDF export failed:", error);
      onError?.(error);
    } finally {
      exportingRef.current = false;
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleExport}
      disabled={loading}
      aria-busy={loading}
      aria-disabled={loading}
      className="inline-flex background-transparent items-center gap-2 rounded-full border border-blue-400/20 bg-linear-to-r/longer from-indigo-500 to-stone-400 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:from-blue-400 hover:to-indigo-900/40 disabled:cursor-not-allowed disabled:opacity-60"
    >
      <span aria-hidden="true">🡇</span>
      {loading ? "Generating Report..." : buttonLabel}
    </button>
  );
}