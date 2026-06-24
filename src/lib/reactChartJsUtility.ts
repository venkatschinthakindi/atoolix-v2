let reactChartJsLibPromise: Promise<typeof import("react-chartjs-2")> | null = null;

export async function asyncGetReactChartJsLib() {
  const chartJs = await import("chart.js");
  const reactChartJs2 = await import("react-chartjs-2");

  chartJs.Chart.register(...chartJs.registerables);

  return {
    Line: reactChartJs2.Line,
    Bar: reactChartJs2.Bar,
    Pie: reactChartJs2.Pie,
    Doughnut: reactChartJs2.Doughnut,
  };
}