"use client";

import { useMemo, useRef, useState, type ReactNode, type ComponentType } from "react";
import dynamic from "next/dynamic";
import {
  PiggyBank,
  BarChart3,
} from "lucide-react";
import { CURRENCIES, CurrencyCode } from "./core/currencyCode";
import { StatCard } from "@/sharedUI/statCard";
import { CalculatorNavigation } from "./core/calculatorNavigation";
import { SectionHeader } from "@/sharedUI/sectionHeader";
import { Field } from "./core/field";
import { CurrencyInput } from "@/sharedUI/calculator/CurrencyInput";
import { NumberInput } from "@/sharedUI/calculator/NumberInput";
import { DurationInput } from "@/sharedUI/calculator/DurationInput";
import { CurrencySelector } from "./core/currencySelector";
import { createCurrencyFormatter } from "./core/currencyFormatter";

const FinanceChart = dynamic(
  () =>
    import("@/components/tools/financeSuite/financeChart").then(
      (m) => m.FinanceChart
    ),
  { ssr: false }
);

const FinancePdfExport = dynamic(
  () =>
    import("@/components/tools/financeSuite/financePdfExport").then(
      (m) => m.FinancePdfExport
    ),
  {
    ssr: false,
    loading: () => null,
  }
);

const MAX_YEARS = 100;

function clamp(value: number, min: number, max: number) {
  if (!Number.isFinite(value)) return min;
  return Math.min(max, Math.max(min, value));
}

function computeSimpleInterest(
  principal: number,
  ratePct: number,
  years: number
) {
  const p = Math.max(0, principal);
  const r = Math.max(0, ratePct);
  const y = Math.max(0, years);

  const interest = p * (r / 100) * y;

  return {
    interest,
    value: p + interest,
  };
}

function QuickStartStrip() {
  const steps = [
    {
      icon: "🧮",
      title: "Enter your numbers",
      body: "Add your principal, interest rate, and investment duration.",
    },
    {
      icon: "📊",
      title: "See the result",
      body: "Get total interest and maturity value instantly.",
    },
    {
      icon: "📄",
      title: "Export your report",
      body: "Download a PDF summary of your calculation.",
    },
  ];

  return (
    <div className="grid gap-3 sm:grid-cols-3 mb-8">
      {steps.map((s, i) => (
        <div
          key={s.title}
          className="rounded-3xl border border-white/10 bg-slate-950/60 p-3 sm:p-4 flex gap-3 items-start"
        >
          <div className="shrink-0 w-8 h-8 rounded-full bg-blue-400/15 border border-blue-400/30 flex items-center justify-center text-sm">
            {s.icon}
          </div>

          <div>
            <div className="text-xs font-semibold text-white/80">
              {i + 1}. {s.title}
            </div>

            <div className="text-[11px] text-white/45 mt-0.5 leading-snug">
              {s.body}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function MethodologyNote() {
  const [open, setOpen] = useState(false);

  return (
    <div className="mb-8 rounded-3xl border border-white/10 bg-slate-950/60 overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="w-full flex items-center justify-between px-5 py-3 text-left hover:bg-white/5 transition"
      >
        <span className="text-xs font-medium text-white/60">
          ⓘ How this is calculated
        </span>

        <span className="text-white/40 text-sm">
          {open ? "−" : "+"}
        </span>
      </button>

      {open && (
        <div className="px-5 pb-4 pt-1 text-xs text-white/50 leading-relaxed space-y-2 border-t border-white/10">
          <p>
            <strong>Simple interest:</strong> Calculated as
            Principal × Rate × Time. Interest is only earned on the
            original principal amount.
          </p>

          <p className="text-white/40">
            This is a standard mathematical estimate. Actual financial
            products may include fees, taxes, timing rules, or different
            calculation methods. Confirm exact figures with your financial
            institution.
          </p>
        </div>
      )}
    </div>
  );
}

export default function SimpleInterestCalculator() {
  const [currency, setCurrency] =
    useState<CurrencyCode>("INR");

  const currencyMeta = CURRENCIES[currency];

  const fmt = useMemo(
  () => createCurrencyFormatter(currency),
  [currency]
);

  const [principal, setPrincipal] =
    useState<number>(100000);

  const [simpleRate, setSimpleRate] =
    useState<number>(7);

  const [simpleYears, setSimpleYears] =
    useState<number>(5);

  const simpleCalc = useMemo(
    () =>
      computeSimpleInterest(
        principal,
        simpleRate,
        simpleYears
      ),
    [principal, simpleRate, simpleYears]
  );

  const simpleChartRef =
    useRef<HTMLDivElement | null>(null);

  const simpleSeries = useMemo(() => {
    const labels: string[] = [];
    const data: number[] = [];

    const years = clamp(
      simpleYears,
      0,
      MAX_YEARS
    );

    for (
      let y = 0;
      y <= Math.floor(years);
      y++
    ) {
      const { value } =
        computeSimpleInterest(
          principal,
          simpleRate,
          y
        );

      labels.push(`Year ${y}`);
      data.push(value);
    }

    if (!Number.isInteger(years)) {
      const { value } =
        computeSimpleInterest(
          principal,
          simpleRate,
          years
        );

      labels.push(`Year ${years}`);
      data.push(value);
    }

    return {
      labels,
      data,
    };
  }, [principal, simpleRate, simpleYears]);

  const exportData = useMemo(
    () => ({
      title: "Simple Interest Report",
      subtitle: `Principal ${fmt(principal)} • ${simpleRate}% • ${simpleYears} years`,
      summaryCards: [
        {
          label: "Principal",
          value: fmt(principal),
        },
        {
          label: "Interest",
          value: fmt(simpleCalc.interest),
        },
        {
          label: "Maturity",
          value: fmt(simpleCalc.value),
        },
      ],
      inputRows: [
        ["Principal", fmt(principal)],
        ["Rate", `${simpleRate}%`],
        ["Duration", `${simpleYears} years`],
      ],
      resultRows: [
        ["Total Interest", fmt(simpleCalc.interest)],
        ["Maturity Value", fmt(simpleCalc.value)],
      ],
      notes: [
        "Simple interest calculated on original principal only.",
      ],
    }),
    [
      principal,
      simpleRate,
      simpleYears,
      simpleCalc,
      fmt,
    ]
  );

  return (
    <div className="w-full max-w-6xl mx-auto px-3 py-3 sm:px-4 sm:py-4 md:px-5 md:py-5 lg:px-6 lg:py-6 text-white space-y-6">

      <section className="mb-5 px-5 py-6 sm:px-6 lg:px-8 rounded-3xl border border-white/10 bg-slate-950/60">
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-10 items-center">

          <div className="space-y-6">
            <div className="inline-flex items-center gap-2">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-400/30 blur-md rounded-full animate-pulse" />

                <div className="relative inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-400/15 px-3 py-1.5 text-xs font-medium text-blue-200">
                  <BarChart3 className="h-3.5 w-3.5" />
                  <span>Private finance workspace</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-[1.15]">
                Simple interest calculator
              </h1>

              <p className="text-base sm:text-lg text-white/70 leading-relaxed max-w-xl">
                Calculate simple interest, total interest earned,
                and maturity value instantly. No accounts, no tracking,
                just calculations.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              <div className="group rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-start gap-3">
                  <div className="shrink-0 w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-lg">
                    🔒
                  </div>

                  <div>
                    <div className="text-sm font-semibold text-white/90">
                      100% Private
                    </div>

                    <div className="text-xs text-white/50 mt-0.5">
                      Calculations run locally in your browser
                    </div>
                  </div>
                </div>
              </div>

              <div className="group rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-start gap-3">
                  <div className="shrink-0 w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-lg">
                    📄
                  </div>

                  <div>
                    <div className="text-sm font-semibold text-white/90">
                      Export Reports
                    </div>

                    <div className="text-xs text-white/50 mt-0.5">
                      Download PDF summaries instantly
                    </div>
                  </div>
                </div>
              </div>

              <div className="group rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-start gap-3">
                  <div className="shrink-0 w-10 h-10 rounded-xl bg-violet-500/20 border border-violet-400/30 flex items-center justify-center text-lg">
                    🌍
                  </div>

                  <div>
                    <div className="text-sm font-semibold text-white/90">
                      Global Currencies
                    </div>

                    <div className="text-xs text-white/50 mt-0.5">
                      Display results in 9 major currencies
                    </div>
                  </div>
                </div>
              </div>

              <div className="group rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-start gap-3">
                  <div className="shrink-0 w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-lg">
                    ⚡
                  </div>

                  <div>
                    <div className="text-sm font-semibold text-white/90">
                      Instant Results
                    </div>

                    <div className="text-xs text-white/50 mt-0.5">
                      Real-time calculations as you type
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative min-w-0">
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 via-violet-500/10 to-fuchsia-500/10 rounded-3xl blur-2xl" />

            <div className="relative rounded-3xl border border-white/10 bg-slate-950/80 backdrop-blur-xl p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs text-white/50 uppercase tracking-wide">
                    Live preview
                  </div>

                  <div className="text-sm font-semibold text-white/90">
                    Simple interest projection
                  </div>
                </div>

                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <div className="text-xs text-white/50 mb-2">
                  Maturity value
                </div>

                <div className="text-2xl sm:text-3xl font-bold text-white">
                  {fmt(simpleCalc.value)}
                </div>

                <div className="text-xs text-emerald-400 mt-2">
                  +{fmt(simpleCalc.interest)} interest
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <StatCard
                  label="Principal"
                  value={fmt(principal)}
                  icon="💵"
                />

                <StatCard
                  label="Interest"
                  value={fmt(simpleCalc.interest)}
                  icon="💹"
                  // tone="positive"
                />
              </div>

              <CurrencySelector
                value={currency}
                onChange={setCurrency}
              />
            </div>
          </div>
        </div>
      </section>

      <QuickStartStrip />

      <MethodologyNote />

      <CalculatorNavigation toolRoute="/tools/calculator/simple-interest-calculator" />

      <div className="grid w-full min-w-0 max-w-full gap-5 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">

        <section className="min-w-0 w-full max-w-full overflow-hidden rounded-3xl border border-white/10 bg-slate-950/60 p-4 sm:p-6">

          <div className="border-b border-white/10 pb-4 mb-4">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">

              <SectionHeader
                title="Simple interest calculator"
                subtitle="Enter principal, rate, and time to see total interest and maturity value."
                icon={PiggyBank}
              />

              <FinancePdfExport
                filename="simple-interest-report"
                title={exportData.title}
                subtitle={exportData.subtitle}
                summaryCards={exportData.summaryCards}
                inputRows={exportData.inputRows}
                resultRows={exportData.resultRows}
                notes={exportData.notes}
                chartRef={simpleChartRef}
              />
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">

            <CurrencyInput
              label={`Principal (${currencyMeta.symbol})`}
              value={principal}
              onChange={(value) =>
                setPrincipal(Math.max(0, value ?? 0))
              }
              currency={currencyMeta.symbol}
              min={0}
              step={1}
              hint="The starting amount you invest or deposit."
            />

            <NumberInput
              label="Interest rate (%)"
              value={simpleRate}
              onChange={(value) =>
                setSimpleRate(Math.max(0, value ?? 0))
              }
              min={0}
              step={0.01}
              hint="Annual simple interest rate."
            />

            <DurationInput
              label="Duration (years)"
              value={simpleYears}
              onChange={(value) =>
                setSimpleYears(
                  clamp(value ?? 0, 0, MAX_YEARS)
                )
              }
              unit="years"
              min={0}
              max={MAX_YEARS}
              step={1}
              hint={`Max ${MAX_YEARS}. How long the money stays invested.`}
            />

          </div>

          <div className="grid gap-3 sm:grid-cols-3 mt-5">
            <StatCard
              label="Total interest"
              value={fmt(simpleCalc.interest)}
              icon="💹"
            />

            <StatCard
              label="Principal"
              value={fmt(principal)}
              icon="💵"
            />

            <StatCard
              label="Maturity value"
              value={fmt(simpleCalc.value)}
              icon="🏆"
            />
          </div>
        </section>

        <section
          ref={simpleChartRef}
          className="min-w-0 w-full max-w-full overflow-hidden rounded-3xl border border-white/10 bg-slate-950/60 p-4 sm:p-6"
        >
          <div className="border-b border-white/10 pb-4 mb-4">
            <SectionHeader
              title="Projection"
              subtitle="Shows the projected value over the selected duration."
              icon={BarChart3}
            />
          </div>

          <div className="w-full min-w-0 min-h-[260px] overflow-hidden">
            <FinanceChart
              labels={simpleSeries.labels}
              datasets={[
                {
                  label: "Projected value",
                  data: simpleSeries.data,
                  color: "rgba(59,130,246,0.9)",
                },
              ]}
            />
          </div>
        </section>
      </div>

      <p className="text-center text-sm text-emerald-300 px-2">
        <b>Note: </b>
        Estimates only, based on standard interest formulas. Actual
        financial products may differ due to product terms, taxes,
        fees, or calculation methods. Confirm exact figures with your
        financial institution.
      </p>
    </div>
  );
}