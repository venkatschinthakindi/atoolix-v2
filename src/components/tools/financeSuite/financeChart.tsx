"use client";

import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Filler, Tooltip, Legend } from "chart.js";
import { Line, Bar } from "react-chartjs-2";
import React from "react";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Filler, Tooltip, Legend);

type Dataset = {
  label: string;
  data: number[];
  color: string;
  fill?: boolean;
  type?: "line" | "bar";
  dashed?: boolean;
};

type Props = {
  title?: string;
  labels: string[];
  datasets: Dataset[];
  chartType?: "line" | "bar";
};

export function FinanceChart({ title, labels, datasets, chartType = "line" }: Props) {
  const data = {
    labels,
    datasets: datasets.map((dataset) => ({
      label: dataset.label,
      data: dataset.data,
      borderColor: dataset.color,
      backgroundColor: dataset.type === "bar" ? dataset.color : `${dataset.color}33`,
      fill: dataset.fill ?? false,
      borderDash: dataset.dashed ? [6, 4] : undefined,
      tension: dataset.type === "line" ? 0.35 : undefined,
      borderWidth: 3,
      maxBarThickness: dataset.type === "bar" ? 28 : undefined,
    })) as any,
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" as const, labels: { boxWidth: 12 } },
      tooltip: { mode: "index" as const, intersect: false as const },
    },
    interaction: { mode: "index" as const, intersect: false as const },
    scales: {
      x: { ticks: { maxRotation: 0, minRotation: 0 } },
      y: { beginAtZero: true },
    },
  };

  return (
    <div className="rounded-xl border border-white/10 bg-surface p-4">
      {title ? <div className="text-sm text-white/70 mb-4">{title}</div> : null}
      <div className="h-[320px]">
        {chartType === "bar" ? <Bar data={data} options={options} /> : <Line data={data} options={options} />}
      </div>
    </div>
  );
}
