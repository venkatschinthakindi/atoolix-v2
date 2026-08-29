"use client";

import { useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import {
  PiggyBank,
  BarChart3,
} from "lucide-react";
import { CURRENCIES, CurrencyCode } from "./core/currencyCode";
import { StatCard } from "./core/statCard";
import { CalculatorNavigation } from "./core/calculatorNavigation";
import { SectionHeader } from "./core/sectionHeader";
import { Field } from "./core/field";
import { CurrencySelector } from "./core/currencySelector";
import { createCurrencyFormatter } from "./core/currencyFormatter";
import { clamp, inputCls } from "@/sharedUI/calculator/calculatorHelpers";
import { QuickStartStrip } from "@/sharedUI/calculator/QuickStartStrip";
import { MethodologyNote } from "@/sharedUI/calculator/MethodologyNote";
import { EstimateDisclaimer } from "@/sharedUI/calculator/EstimateDisclaimer";
import { CalculatorHero } from "@/sharedUI/calculator/CalculatorHero";

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

      <CalculatorHero
        badgeIcon={BarChart3}
        accentGlow="bg-blue-400/30"
        accentBorder="border-blue-400/30"
        accentBg="bg-blue-400/15"
        accentText="text-blue-200"
        title="Simple interest calculator"
        description="Calculate simple interest, total interest earned, and maturity value instantly. No accounts, no tracking, just calculations."
        variant="detailed"
        detailedFeatures={[
          {
            icon: "🔒",
            iconBg: "bg-blue-500/20 border border-blue-400/30",
            title: "100% Private",
            body: "Calculations run locally in your browser",
          },
          {
            icon: "📄",
            iconBg: "bg-emerald-500/20 border border-emerald-400/30",
            title: "Export Reports",
            body: "Download PDF summaries instantly",
          },
          {
            icon: "🌍",
            iconBg: "bg-violet-500/20 border border-violet-400/30",
            title: "Global Currencies",
            body: "Display results in 9 major currencies",
          },
          {
            icon: "⚡",
            iconBg: "bg-amber-500/20 border border-amber-400/30",
            title: "Instant Results",
            body: "Real-time calculations as you type",
          },
        ]}
        gradientClass="from-blue-500/10 via-violet-500/10 to-fuchsia-500/10"
        previewTitle="Simple interest projection"
        previewValue={fmt(simpleCalc.value)}
        previewNote={`+${fmt(simpleCalc.interest)} interest`}
        previewStats={[
          { label: "Principal", value: fmt(principal), icon: "💵" },
          { label: "Interest", value: fmt(simpleCalc.interest), icon: "💹" },
        ]}
      >
        <CurrencySelector value={currency} onChange={setCurrency} />
      </CalculatorHero>

      <QuickStartStrip
        steps={[
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
        ]}
      />

      <MethodologyNote
        description={
          <>
            <strong>Simple interest:</strong> Calculated as
            Principal × Rate × Time. Interest is only earned on the
            original principal amount.
          </>
        }
        caveat="This is a standard mathematical estimate. Actual financial products may include fees, taxes, timing rules, or different calculation methods. Confirm exact figures with your financial institution."
      />

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

            <div>
              <Field
                label={`Principal (${currencyMeta.symbol})`}
              >
                <input
                  type="number"
                  min={0}
                  step="1"
                  inputMode="decimal"
                  value={principal}
                  onChange={(e) =>
                    setPrincipal(
                      Math.max(
                        0,
                        Number(e.target.value)
                      )
                    )
                  }
                  className={inputCls}
                />
              </Field>

              <div className="text-[11px] text-white/35 mt-1">
                The starting amount you invest or deposit.
              </div>
            </div>

            <div>
              <Field label="Interest rate (%)">
                <input
                  type="number"
                  min={0}
                  step="0.01"
                  inputMode="decimal"
                  value={simpleRate}
                  onChange={(e) =>
                    setSimpleRate(
                      Math.max(
                        0,
                        Number(e.target.value)
                      )
                    )
                  }
                  className={inputCls}
                />
              </Field>

              <div className="text-[11px] text-white/35 mt-1">
                Annual simple interest rate.
              </div>
            </div>

            <div>
              <Field
                label="Duration (years)"
                hint={`Max ${MAX_YEARS}`}
              >
                <input
                  type="number"
                  min={0}
                  max={MAX_YEARS}
                  step="1"
                  inputMode="decimal"
                  value={simpleYears}
                  onChange={(e) =>
                    setSimpleYears(
                      clamp(
                        Number(e.target.value),
                        0,
                        MAX_YEARS
                      )
                    )
                  }
                  className={inputCls}
                />
              </Field>

              <div className="text-[11px] text-white/35 mt-1">
                How long the money stays invested.
              </div>
            </div>

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

      <EstimateDisclaimer />
    </div>
  );
}