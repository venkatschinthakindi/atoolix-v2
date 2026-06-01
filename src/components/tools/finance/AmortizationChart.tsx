"use client";

import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from "chart.js";
import { Line } from "react-chartjs-2";
import React from "react";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

type Props = {
  labels: string[];
  principalSeries: number[];
  interestSeries: number[];
  principalSeriesB?: number[];
  interestSeriesB?: number[];
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
      borderColor: "#22c55e",
      backgroundColor: "rgba(34,197,94,0.06)",
      borderWidth: 2,
      pointRadius: 0,
      tension: 0.25,
    });
  }

  if (showBaseInterest) {
    datasets.push({
      label: "Cumulative Interest (Base)",
      data: interestSeries,
      borderColor: "#60a5fa",
      backgroundColor: "rgba(96,165,250,0.04)",
      borderWidth: 2,
      pointRadius: 0,
      tension: 0.25,
    });
  }

  if (principalSeriesB && showPrepayPrincipal) {
    datasets.push({
      label: "Principal Remaining (With Prepay)",
      data: principalSeriesB,
      borderColor: "#16a34a",
      backgroundColor: "rgba(16,163,127,0.04)",
      borderDash: [6, 4],
      borderWidth: 2,
      pointRadius: 0,
      tension: 0.25,
    });
  }

  if (interestSeriesB && showPrepayInterest) {
    datasets.push({
      label: "Cumulative Interest (With Prepay)",
      data: interestSeriesB,
      borderColor: "#2563eb",
      backgroundColor: "rgba(37,99,235,0.03)",
      borderDash: [6, 4],
      borderWidth: 2,
      pointRadius: 0,
      tension: 0.25,
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
        <Line data={data} options={options} />
      </div>
    </div>
  );
}
