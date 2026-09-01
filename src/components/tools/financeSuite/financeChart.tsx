"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { initChartJS } from "@/lib/chartJsUtility";
import { asyncGetReactChartJsLib } from "@/lib/reactChartJsUtility";

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
  const [ChartLib, setChartLib] = useState<null | Awaited<ReturnType<typeof asyncGetReactChartJsLib>>>(null);
  const { resolvedTheme } = useTheme();
  const [chartColors, setChartColors] = useState({ text: "", grid: "" });

  useEffect(() => {
    // Chart.js paints legend/tick text directly to <canvas>, which CSS
    // variables cannot reach - read the resolved token values here and
    // re-run whenever the theme changes, rather than relying on
    // Chart.js's own hardcoded default text color (which is what this
    // chart silently did before, invisible to the theme toggle).
    const styles = getComputedStyle(document.documentElement);
    // This IS the justified "subscribe to an external system" case the
    // set-state-in-effect rule allows for: resolvedTheme changing is the
    // external signal, and getComputedStyle reads from the CSS engine
    // (an external system relative to React), not from React state -
    // there's no way to get Chart.js's canvas-rendered colors to react
    // to a CSS variable change other than reading the resolved value
    // here and re-rendering the chart with it.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setChartColors({
      text: styles.getPropertyValue("--muted-foreground").trim() || "#9ca3af",
      grid: styles.getPropertyValue("--border").trim() || "rgba(255,255,255,0.1)",
    });
  }, [resolvedTheme]);

  useEffect(() => {
    let idleHandle: number | null = null;
    let cancelled = false;

    const loadLibs = async () => {
      await initChartJS();
      const lib = await asyncGetReactChartJsLib();
      if (!cancelled) {
        setChartLib(lib);
      }
    };

    const scheduleLoad = () => {
      if (typeof window.requestIdleCallback === "function") {
        idleHandle = window.requestIdleCallback(() => {
          loadLibs().catch(() => undefined);
        });
      } else {
        idleHandle = window.setTimeout(() => {
          loadLibs().catch(() => undefined);
        }, 200);
      }
    };

    scheduleLoad();

    return () => {
      cancelled = true;
      if (idleHandle !== null) {
        if (typeof window.cancelIdleCallback === "function") {
          window.cancelIdleCallback(idleHandle);
        } else {
          window.clearTimeout(idleHandle);
        }
      }
    };
  }, []);

  if (!ChartLib) {
    return (
      <div className="rounded-xl border border-border bg-card p-4 text-center text-foreground-secondary">
        Loading charts...
      </div>
    );
  }

  const { Line, Bar } = ChartLib;

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
      legend: {
        position: "top" as const,
        labels: { boxWidth: 12, color: chartColors.text },
      },
      tooltip: { mode: "index" as const, intersect: false as const },
    },
    interaction: { mode: "index" as const, intersect: false as const },
    scales: {
      x: {
        ticks: { maxRotation: 0, minRotation: 0, color: chartColors.text },
        grid: { color: chartColors.grid },
      },
      y: {
        beginAtZero: true,
        ticks: { color: chartColors.text },
        grid: { color: chartColors.grid },
      },
    },
  };

  return (
    <div className="rounded-xl border border-border bg-card p-4">
      {title ? <div className="text-sm text-foreground-secondary mb-4">{title}</div> : null}
      <div className="h-[320px]">
        {chartType === "bar" ? <Bar data={data} options={options} /> : <Line data={data} options={options} />}
      </div>
    </div>
  );
}