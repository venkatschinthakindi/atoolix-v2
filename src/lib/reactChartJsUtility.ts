let reactChartJsLibPromise: Promise<typeof import("react-chartjs-2")> | null = null;

export async function asyncGetReactChartJsLib() {
  const { Line, Bar, Pie, Doughnut } =
    await (reactChartJsLibPromise ??= import("react-chartjs-2"));

  return reactChartJsLibPromise;
}