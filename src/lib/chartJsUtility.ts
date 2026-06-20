let initialized = false;
let chartLibPromise: Promise<typeof import("chart.js")> | null = null;

export async function initChartJS() {
  if (initialized) return;

  if (!chartLibPromise) {
    chartLibPromise = import("chart.js").then((mod) => {
      const {
        Chart: ChartJS,
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        BarElement,
        ArcElement,
        Filler,
        Tooltip,
        Legend,
      } = mod;

      ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        BarElement,
        ArcElement,
        Filler,
        Tooltip,
        Legend
      );

      return mod;
    });
  }

  await chartLibPromise;
  initialized = true;
}