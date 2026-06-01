"use client";

import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Tooltip, Legend } from "chart.js";
import { Line, Bar } from "react-chartjs-2";
import React from "react";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Tooltip, Legend);

type Props = {
  labels: string[];
  principalSeries: number[];
  interestSeries: number[];
  principalSeriesB?: number[];
  interestSeriesB?: number[];
  prepaymentMarkers?: (number | null)[];
  chartType?: "line" | "bar";
  showBasePrincipal?: boolean;
  showBaseInterest?: boolean;
  showPrepayPrincipal?: boolean;
  showPrepayInterest?: boolean;
};

export default function AmortizationChart({
  labels,
  principalSeries,
  interestSeries,
  principalSeriesB,
  interestSeriesB,
  prepaymentMarkers,
  chartType = "line",
  showBasePrincipal = true,
  showBaseInterest = true,
  showPrepayPrincipal = true,
  showPrepayInterest = true,
}: Props) {
  const datasets: any[] = [];

  if (showBasePrincipal) {
    datasets.push({
      label: "Principal Remaining (Base)",
      data: principalSeries,
      ...(chartType === "bar" ? { type: "bar", backgroundColor: "rgba(34,197,94,0.3)" } : { borderColor: "#22c55e", backgroundColor: "rgba(34,197,94,0.06)", borderWidth: 2, pointRadius: 0, tension: 0.25 }),
    });
  }

  if (showBaseInterest) {
    datasets.push({
      label: "Cumulative Interest (Base)",
      data: interestSeries,
      ...(chartType === "bar" ? { type: "bar", backgroundColor: "rgba(96,165,250,0.3)" } : { borderColor: "#60a5fa", backgroundColor: "rgba(96,165,250,0.04)", borderWidth: 2, pointRadius: 0, tension: 0.25 }),
    });
  }

  if (principalSeriesB && showPrepayPrincipal) {
    datasets.push({
      label: "Principal Remaining (With Prepay)",
      data: principalSeriesB,
      ...(chartType === "bar" ? { type: "bar", backgroundColor: "rgba(16,163,127,0.3)" } : { borderColor: "#16a34a", backgroundColor: "rgba(16,163,127,0.04)", borderDash: [6, 4], borderWidth: 2, pointRadius: 0, tension: 0.25 }),
    });
  }

  if (interestSeriesB && showPrepayInterest) {
    datasets.push({
      label: "Cumulative Interest (With Prepay)",
      data: interestSeriesB,
      ...(chartType === "bar" ? { type: "bar", backgroundColor: "rgba(37,99,235,0.25)" } : { borderColor: "#2563eb", backgroundColor: "rgba(37,99,235,0.03)", borderDash: [6, 4], borderWidth: 2, pointRadius: 0, tension: 0.25 }),
    });
  }

  if (prepaymentMarkers) {
    datasets.push({
      type: "line",
      label: "Prepayment Events",
      data: prepaymentMarkers,
      borderColor: "transparent",
      backgroundColor: "#fb923c",
      pointStyle: "triangle",
      pointRadius: 8,
      pointHoverRadius: 12,
      pointBorderColor: "#f97316",
      pointBackgroundColor: "#fed7aa",
      pointBorderWidth: 2,
      showLine: false,
      spanGaps: true,
    });
  }

  const data = { labels, datasets };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: { mode: "index" as const, intersect: false },
    plugins: {
      legend: { position: "top" as const, labels: { boxWidth: 12 } },
      tooltip: {
        callbacks: {
          title: (items: any[]) => {
            const idx = items[0]?.dataIndex ?? 0;
            return `Month ${labels[idx] ?? idx + 1}`;
          },
          label: (ctx: any) => {
            const label = ctx.dataset.label || "";
            const value = ctx.formattedValue;
            return `${label}: ${value}`;
          },
        },
      },
    },
    scales: {
      x: { ticks: { maxRotation: 0, minRotation: 0 } },
      y: { beginAtZero: true },
    },
  };

  return (
    <div className="rounded-md border border-gray-700 bg-gray-800 p-4">
      <div style={{ height: 360 }}>
        {chartType === "bar" ? <Bar data={data} options={options} /> : <Line data={data} options={options} />}
      </div>
    </div>
  );
}
