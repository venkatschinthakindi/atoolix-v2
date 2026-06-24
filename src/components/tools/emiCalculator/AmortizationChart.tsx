"use client";

import { asyncGetReactChartJsLib } from "@/lib/reactChartJsUtility";
import { useCallback, useEffect, useRef, useState } from "react";

type PieChartData = {
  labels: string[];
  values: number[];
  colors: string[];
};

type Props = {
  labels: string[];
  principalSeries: number[];
  interestSeries: number[];
  principalSeriesB?: number[];
  interestSeriesB?: number[];
  prepaymentMarkers?: (number | null)[];
  chartType?: "line" | "area" | "smooth" | "stepped" | "bar" | "pie" | "doughnut";
  pieData?: PieChartData;
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
  pieData,
  showBasePrincipal = true,
  showBaseInterest = true,
  showPrepayPrincipal = true,
  showPrepayInterest = true,
}: Props) {
  const chartJsLibRef = useRef<any>(null);

  const [charts, setCharts] = useState<{
    Line: any;
    Bar: any;
    Pie: any;
    Doughnut: any;
  } | null>(null);

  const getChartLib = useCallback(async () => {
    if (!chartJsLibRef.current) {
      chartJsLibRef.current = await asyncGetReactChartJsLib();
    }

    return chartJsLibRef.current;
  }, []);

  useEffect(() => {
    let mounted = true;

    getChartLib().then((lib) => {
      if (mounted) {
        setCharts(lib);
      }
    });

    return () => {
      mounted = false;
    };
  }, [getChartLib]);

  const getStyle = (
    color: string,
    fillColor: string,
    dashed = false
  ) => {
    if (chartType === "bar") {
      return {
        type: "bar",
        backgroundColor: fillColor,
        borderRadius: 8,
        borderWidth: 0,
        maxBarThickness: 26,
      };
    }

    if (chartType === "area") {
      return {
        borderColor: color,
        backgroundColor: fillColor,
        fill: true,
        tension: 0.45,
        borderWidth: 3,
        pointRadius: 0,
        pointHoverRadius: 7,
        borderDash: dashed ? [8, 5] : undefined,
      };
    }

    if (chartType === "smooth") {
      return {
        borderColor: color,
        backgroundColor: "transparent",
        tension: 0.75,
        borderWidth: 3,
        pointRadius: 2,
        pointHoverRadius: 8,
        borderDash: dashed ? [8, 5] : undefined,
      };
    }

    if (chartType === "stepped") {
      return {
        borderColor: color,
        backgroundColor: "transparent",
        stepped: "middle",
        borderWidth: 3,
        pointRadius: 0,
        pointHoverRadius: 8,
        borderDash: dashed ? [8, 5] : undefined,
      };
    }

    return {
      borderColor: color,
      backgroundColor: fillColor,
      borderWidth: 2,
      pointRadius: 0,
      tension: 0.25,
      borderDash: dashed ? [6, 4] : undefined,
    };
  };

  const datasets: any[] = [];

  if (showBasePrincipal) {
    datasets.push({
      label: "Principal Remaining (Base)",
      data: principalSeries,
      ...getStyle("#22c55e", "rgba(34,197,94,0.18)"),
    });
  }

  if (showBaseInterest) {
    datasets.push({
      label: "Cumulative Interest (Base)",
      data: interestSeries,
      ...getStyle("#60a5fa", "rgba(96,165,250,0.15)"),
    });
  }

  if (principalSeriesB && showPrepayPrincipal) {
    datasets.push({
      label: "Principal Remaining (With Prepay)",
      data: principalSeriesB,
      ...getStyle("#16a34a", "rgba(16,163,127,0.2)", true),
    });
  }

  if (interestSeriesB && showPrepayInterest) {
    datasets.push({
      label: "Cumulative Interest (With Prepay)",
      data: interestSeriesB,
      ...getStyle("#2563eb", "rgba(37,99,235,0.14)", true),
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

  const data = {
    labels,
    datasets,
  };

  const pieChart = {
    labels: pieData?.labels ?? ["Principal", "Interest"],
    datasets: [
      {
        data: pieData?.values ?? [0, 0],
        backgroundColor: pieData?.colors ?? ["#22c55e", "#60a5fa"],
        borderColor: "#111827",
        borderWidth: 2,
        hoverOffset: 12,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: "index" as const,
      intersect: false,
    },
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          boxWidth: 12,
        },
      },
      tooltip: {
        callbacks: {
          title: (items: any[]) => {
            if (chartType === "pie" || chartType === "doughnut") {
              return "";
            }

            const idx = items[0]?.dataIndex ?? 0;
            return `Month ${labels[idx] ?? idx + 1}`;
          },
          label: (ctx: any) => {
            const value = ctx.formattedValue;

            if (chartType === "pie" || chartType === "doughnut") {
              const section = ctx.label ?? ctx.dataset.label ?? "";
              return `${section}: ${value}`;
            }

            return `${ctx.dataset.label}: ${value}`;
          },
        },
      },
    },
    scales:
      chartType === "pie" || chartType === "doughnut"
        ? undefined
        : {
            x: {
              ticks: {
                maxRotation: 0,
                minRotation: 0,
              },
            },
            y: {
              beginAtZero: true,
            },
          },
  };

  if (!charts) {
    return (
      <div className="rounded-md border border-gray-700 bg-gray-800 p-4">
        <div
          style={{ height: 360 }}
          className="flex items-center justify-center"
        >
          Loading chart...
        </div>
      </div>
    );
  }

  const { Line, Bar, Pie, Doughnut } = charts;

  return (
    <div className="rounded-md border border-gray-700 bg-gray-800 p-4">
      <div style={{ height: 360 }}>
        {chartType === "pie" ? (
          <Pie data={pieChart} options={options} />
        ) : chartType === "doughnut" ? (
          <Doughnut data={pieChart} options={options} />
        ) : chartType === "bar" ? (
          <Bar data={data} options={options} />
        ) : (
          <Line data={data} options={options} />
        )}
      </div>
    </div>
  );
}
