"use client";

import {
  useMemo,
  useRef,
  useState,
} from "react";
import dynamic from "next/dynamic";
import CustomSelect from "@/components/ui/customSelect";
import {
  TrendingUp,
  BarChart3,
} from "lucide-react";
import { CalculatorNavigation } from "./core/calculatorNavigation";
import { CURRENCIES, CurrencyCode } from "./core/currencyCode";
import { StatCard } from "@/sharedUI/statCard";
import { SectionHeader } from "@/sharedUI/sectionHeader";
import { Field } from "./core/field";
import { CurrencyInput } from "@/sharedUI/calculator/CurrencyInput";
import { NumberInput } from "@/sharedUI/calculator/NumberInput";
import { DurationInput } from "@/sharedUI/calculator/DurationInput";
import { CurrencySelector } from "./core/currencySelector";
import { createCurrencyFormatter } from "./core/currencyFormatter";
import { clamp } from "@/sharedUI/calculator/calculatorHelpers";
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

function computeCompoundInterest({
  principal,
  annualRatePct,
  years,
  frequency,
}: {
  principal: number;
  annualRatePct: number;
  years: number;
  frequency: number;
}) {
  const p = Math.max(0, principal);
  const r = Math.max(0, annualRatePct) / 100;
  const n = Math.max(1, frequency);
  const t = Math.max(0, years);

  const amount =
    p * Math.pow(1 + r / n, n * t);

  const interest = amount - p;

  return {
    value: amount,
    interest,
  };
}

export default function CompoundInterestCalculator() {
  const [currency, setCurrency] =
    useState<CurrencyCode>("INR");

  const currencyMeta = CURRENCIES[currency];

  const fmt = useMemo(
    () => createCurrencyFormatter(currency),
    [currency]
    );

  const [compoundPrincipal, setCompoundPrincipal] =
    useState<number>(100000);

  const [compoundRate, setCompoundRate] =
    useState<number>(8);

  const [compoundYears, setCompoundYears] =
    useState<number>(5);

  const [compoundFrequency, setCompoundFrequency] =
    useState<string>("4");

  const compoundCalc = useMemo(
    () =>
      computeCompoundInterest({
        principal: compoundPrincipal,
        annualRatePct: compoundRate,
        years: compoundYears,
        frequency: Number(compoundFrequency),
      }),
    [
      compoundPrincipal,
      compoundRate,
      compoundYears,
      compoundFrequency,
    ]
  );

  const chartRef =
    useRef<HTMLDivElement | null>(null);

  const series = useMemo(() => {
    const labels: string[] = [];
    const data: number[] = [];

    const years = clamp(
      compoundYears,
      0,
      MAX_YEARS
    );

    for (
      let y = 0;
      y <= Math.floor(years);
      y++
    ) {
      const { value } =
        computeCompoundInterest({
          principal: compoundPrincipal,
          annualRatePct: compoundRate,
          years: y,
          frequency: Number(compoundFrequency),
        });

      labels.push(`Year ${y}`);
      data.push(value);
    }

    if (!Number.isInteger(years)) {
      const { value } =
        computeCompoundInterest({
          principal: compoundPrincipal,
          annualRatePct: compoundRate,
          years,
          frequency: Number(compoundFrequency),
        });

      labels.push(`Year ${years}`);
      data.push(value);
    }

    return {
      labels,
      data,
    };
  }, [
    compoundPrincipal,
    compoundRate,
    compoundYears,
    compoundFrequency,
  ]);

  const exportData = useMemo(
    () => ({
      title: "Compound Interest Report",
      subtitle: `${compoundFrequency}x yearly compounding`,
      summaryCards: [
        {
          label: "Principal",
          value: fmt(compoundPrincipal),
        },
        {
          label: "Compound Interest",
          value: fmt(compoundCalc.interest),
        },
        {
          label: "Maturity",
          value: fmt(compoundCalc.value),
        },
      ],
      inputRows: [
        ["Principal", fmt(compoundPrincipal)],
        ["Rate", `${compoundRate}%`],
        ["Duration", `${compoundYears} years`],
        [
          "Frequency",
          `${compoundFrequency}x/year`,
        ],
      ],
      resultRows: [
        [
          "Maturity Value",
          fmt(compoundCalc.value),
        ],
        [
          "Compound Gain",
          fmt(compoundCalc.interest),
        ],
      ],
      notes: [
        "Interest compounds and is added to principal each period.",
      ],
    }),
    [
      compoundPrincipal,
      compoundRate,
      compoundYears,
      compoundFrequency,
      compoundCalc,
      fmt,
    ]
  );

  return (
    <div className="w-full max-w-6xl mx-auto px-3 py-3 sm:px-4 sm:py-4 md:px-5 md:py-5 lg:px-6 lg:py-6 text-foreground space-y-6">

      <CalculatorHero
        badgeIcon={TrendingUp}
        accentGlow="bg-violet-400/30"
        accentBorder="border-violet-400/30"
        accentBg="bg-violet-400/15"
        accentText="text-violet-200"
        title="Compound interest calculator"
        description="Calculate how your investment grows when interest is added back to the principal over time."
        variant="compact"
        compactFeatures={[
          { label: "🔒 100% Private", body: "Calculations run locally in your browser" },
          { label: "📄 PDF Reports", body: "Export your calculation instantly" },
          { label: "🌍 9 Currencies", body: "Choose your preferred display currency" },
          { label: "⚡ Instant Results", body: "Updates as you type" },
        ]}
        gradientClass="from-blue-500/10 via-violet-500/10 to-fuchsia-500/10"
        previewTitle="Compound growth projection"
        previewValue={fmt(compoundCalc.value)}
        previewNote={`+${fmt(compoundCalc.interest)} interest`}
        previewStats={[
          { label: "Principal", value: fmt(compoundPrincipal), icon: "💵" },
          { label: "Rate", value: `${compoundRate}%`, icon: "📈" },
        ]}
      >
        <CurrencySelector value={currency} onChange={setCurrency} />
      </CalculatorHero>

      <QuickStartStrip
        steps={[
          {
            icon: "💰",
            title: "Enter your principal",
            body: "Add your starting investment, rate, and duration.",
          },
          {
            icon: "📈",
            title: "Choose compounding",
            body: "Select annual, semi-annual, quarterly, or monthly.",
          },
          {
            icon: "📊",
            title: "See compound growth",
            body: "View your projected maturity value and interest.",
          },
        ]}
      />

      <MethodologyNote
        description={
          <>
            <strong>Compound interest:</strong> Uses the formula
            A = P(1 + r/n)^(nt). Interest compounds and is added
            to principal each period.
          </>
        }
        caveat="These are standard mathematical estimates. Actual financial products may include fees, taxes, timing rules, or different compounding methods."
      />

      <CalculatorNavigation toolRoute="/tools/calculator/compound-interest-calculator" />

      <div className="grid w-full min-w-0 max-w-full gap-5 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">

        <section className="rounded-3xl border border-border bg-surface-sunken p-5 sm:p-6">

          <div className="border-b border-border pb-4 mb-4">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">

              <SectionHeader
                title="Compound interest calculator"
                subtitle="Default compounding is quarterly, but you can change it."
                icon={TrendingUp}
              />

              <FinancePdfExport
                filename="compound-interest-report"
                title={exportData.title}
                subtitle={exportData.subtitle}
                summaryCards={exportData.summaryCards}
                inputRows={exportData.inputRows}
                resultRows={exportData.resultRows}
                notes={exportData.notes}
                chartRef={chartRef}
              />
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">

            <CurrencyInput
              label={`Principal (${currencyMeta.symbol})`}
              value={compoundPrincipal}
              onChange={(value) =>
                setCompoundPrincipal(Math.max(0, value ?? 0))
              }
              currency={currencyMeta.symbol}
              min={0}
              step={1}
              hint="The amount on which compound interest will be calculated."
            />

            <NumberInput
              label="Interest rate (%)"
              value={compoundRate}
              onChange={(value) =>
                setCompoundRate(Math.max(0, value ?? 0))
              }
              min={0}
              step={0.01}
              hint="Annual nominal interest rate."
            />

            <DurationInput
              label="Duration (years)"
              value={compoundYears}
              onChange={(value) =>
                setCompoundYears(
                  clamp(value ?? 0, 0, MAX_YEARS)
                )
              }
              unit="years"
              min={0}
              max={MAX_YEARS}
              step={1}
              hint={`Max ${MAX_YEARS}. How long the investment stays active.`}
            />

            <div>
              <Field label="Compounding frequency">
                <CustomSelect
                  value={compoundFrequency}
                  callBackTrigger={(e) =>
                    setCompoundFrequency(e)
                  }
                  options={[
                    {
                      value: "1",
                      label: "Annually (once a year)",
                    },
                    {
                      value: "2",
                      label: "Semi-annually (every 6 months)",
                    },
                    {
                      value: "4",
                      label: "Quarterly (every 3 months)",
                    },
                    {
                      value: "12",
                      label: "Monthly (every month)",
                    },
                  ]}
                />
              </Field>

              <div className="text-[11px] text-muted-foreground mt-1">
                How often interest is added to the principal.
              </div>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 mt-5">
            <StatCard
              label="Principal"
              value={fmt(compoundPrincipal)}
              icon="💵"
            />

            <StatCard
              label="Maturity value"
              value={fmt(compoundCalc.value)}
              icon="🏆"
            />

            <StatCard
              label="Compound interest"
              value={fmt(compoundCalc.interest)}
              icon="✨"
            />
          </div>
        </section>

        <section
          ref={chartRef}
          className="rounded-3xl border border-border bg-surface-sunken p-5 sm:p-6"
        >
          <div className="border-b border-border pb-4 mb-4">
            <SectionHeader
              title="Projection"
              subtitle="Shows how the investment grows over the selected duration."
              icon={BarChart3}
            />
          </div>

          <div className="w-full min-w-0 min-h-[260px] overflow-hidden">
            <FinanceChart
              labels={series.labels}
              datasets={[
                {
                  label: "Projected value",
                  data: series.data,
                  color: "rgba(34,197,94,0.85)",
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