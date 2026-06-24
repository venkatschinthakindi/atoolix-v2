"use client";

import { useEffect, useState } from "react";
import { asyncGetJsPDFLib } from "@/lib/jsPdfLibUtility";
import { asyncGetJsPDFAutotableLib } from "@/lib/jsPdfAutotableUtility";
import { initChartJS } from "@/lib/chartJsUtility";
import { asyncGetHtmlToPdfLib } from "@/lib/htmlToPdfUtility";

type Props = {
  filename?: string;
};

function isVisible(el: HTMLElement) {
  const style = window.getComputedStyle(el);

  return (
    style.display !== "none" &&
    style.visibility !== "hidden" &&
    el.offsetParent !== null
  );
}

export function FinancePdfExport({
  filename = "finance-report.pdf",
}: Props) {
  const [initialized, setInitialized] = useState(false);
  // Initialize chart.js on mount
  useEffect(() => {
    const initialize = async () => {
      await initChartJS();
      setInitialized(true);
    };
    initialize();
  }, []);
  const [loading, setLoading] = useState(false);

  const handleExport = async () => {
    setLoading(true);

    try {
      const { jsPDF } = await asyncGetJsPDFLib();
      const { autoTable } = await asyncGetJsPDFAutotableLib();
      
      // =====================================
      // Extract title
      // =====================================

      const title =
        document
          .querySelector("[data-export-title]")
          ?.textContent?.trim() || "Financial Report";

      // =====================================
      // Extract inputs
      // =====================================

      const inputRows: string[][] = [];

      document
        .querySelectorAll("[data-export-field]")
        .forEach((field) => {
          const element = field as HTMLElement;

          if (!isVisible(element)) return;

          const label =
            element
              .querySelector("label")
              ?.textContent?.trim() || "";

          let value = "";

          const input = element.querySelector(
            "input"
          ) as HTMLInputElement | null;

          const select = element.querySelector(
            "select"
          ) as HTMLSelectElement | null;

          const textarea = element.querySelector(
            "textarea"
          ) as HTMLTextAreaElement | null;

          if (input) {
            value = input.value;
          } else if (select) {
            value = select.value;
          } else if (textarea) {
            value = textarea.value;
          }

          if (!label || !value) return;

          inputRows.push([label, value]);
        });

      // =====================================
      // Extract result cards
      // =====================================

      const resultRows: string[][] = [];

      document
        .querySelectorAll("[data-export-result]")
        .forEach((result) => {
          const element = result as HTMLElement;

          if (!isVisible(element)) return;

          const children = Array.from(element.children);

          if (children.length < 2) return;

          const label =
            children[0].textContent?.trim() || "";

          const value =
            children[1].textContent?.trim() || "";

          if (!label || !value) return;

          resultRows.push([label, value.replace('₹', 'INR')]);
        });

      // =====================================
      // Chart
      // =====================================

      const chart = document.querySelector(
        "[data-export-chart]"
      ) as HTMLElement | null;

      // =====================================
      // PDF
      // =====================================

      const pdf = new jsPDF("p", "mm", "a4");

      let y = 18;

      // =====================================
      // Cover Page
      // =====================================

      pdf.setFillColor(15, 23, 42);
      pdf.rect(0, 0, 210, 60, "F");

      pdf.setTextColor(255, 255, 255);

      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(20);

      const maxWidth = 180; // A4 width (210) - margins

      const wrappedTitle = pdf.splitTextToSize(
        title,
        maxWidth
      );

      pdf.text(wrappedTitle, 14, 25);

      // Calculate next Y position dynamically
      const titleHeight = wrappedTitle.length * 8;

      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(10);

      pdf.text(
        "Generated automatically from calculator data",
        14,
        25 + titleHeight + 4
      );

      pdf.setTextColor(180);

      pdf.text(
        new Date().toLocaleString(),
        14,
        25 + titleHeight + 12
      );

      // =====================================
      // Page 2
      // =====================================

      pdf.addPage();

      pdf.setTextColor(20, 20, 20);

      // =====================================
      // Inputs Table
      // =====================================

      if (inputRows.length) {
        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(14);

        pdf.text("Input Parameters", 14, y);

        y += 6;

        autoTable(pdf, {
          startY: y,
          theme: "grid",

          headStyles: {
            fillColor: [17, 24, 39],
            textColor: 255,
            fontSize: 10,
          },

          bodyStyles: {
            textColor: 30,
            fontSize: 10,
          },

          columnStyles: {
            0: {
              cellWidth: 90,
            },

            1: {
              halign: "right",
            },
          },

          head: [["Parameter", "Value"]],
          body: inputRows,
        });

        y = (pdf as any).lastAutoTable.finalY + 10;
      }

      // =====================================
      // Results Table
      // =====================================

      if (resultRows.length) {
        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(14);

        pdf.text("Key Results", 14, y);

        y += 6;

        autoTable(pdf, {
          startY: y,
          theme: "grid",

          headStyles: {
            fillColor: [17, 24, 39],
            textColor: 255,
            fontSize: 10,
          },

          bodyStyles: {
            textColor: 30,
            fontSize: 10,
          },

          columnStyles: {
            0: {
              cellWidth: 90,
            },

            1: {
              halign: "right",
            },
          },

          head: [["Metric", "Value"]],
          body: resultRows,
        });

        y = (pdf as any).lastAutoTable.finalY + 10;
      }

      // =====================================
      // Chart
      // =====================================

      if (chart && isVisible(chart)) {
        if (y > 180) {
          pdf.addPage();
          y = 20;
        }

        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(14);

        pdf.text("Projection Chart", 14, y);

        y += 6;
        const { toPng } = await asyncGetHtmlToPdfLib();
        const chartImage = await toPng(chart, {
          pixelRatio: 3,
          cacheBust: true,
          backgroundColor: "#ffffff",
        });

        pdf.addImage(
          chartImage,
          "PNG",
          14,
          y,
          182,
          85
        );
      }

      // =====================================
      // Footer
      // =====================================

      const pages = pdf.getNumberOfPages();

      for (let i = 1; i <= pages; i++) {
        pdf.setPage(i);

        pdf.setFontSize(8);
        pdf.setTextColor(120);

        pdf.text(
          "This report is for informational purposes only and does not constitute financial advice.",
          14,
          290
        );

        pdf.text(
          `Page ${i} of ${pages}`,
          180,
          290
        );
      }

      pdf.save(filename);
    } catch (error) {
      console.error("PDF export failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleExport}
      disabled={loading}
      className="button-primary-transparent"
    >
      <span className="px-2">💾</span>
      {loading
        ? "Generating Report..."
        : "Download Report"}
        
    </button>
  );
}