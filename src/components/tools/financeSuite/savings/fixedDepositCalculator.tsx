"use client";

import {
  useMemo,
  useRef,
  useState,
} from "react";
import dynamic from "next/dynamic";
import CustomSelect from "@/components/ui/customSelect";
import {
  ShieldCheck,
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

function computeFD({
  amount,
  annualRatePct,
  years,
  frequency,
}: {
  amount: number;
  annualRatePct: number;
  years: number;
  frequency: number;
}) {
  return computeCompoundInterest({
    principal: amount,
    annualRatePct,
    years,
    frequency,
  });
}

export default function FixedDepositCalculator() {
  const [currency, setCurrency] =
    useState<CurrencyCode>("INR");

  const currencyMeta = CURRENCIES[currency];

  const fmt = useMemo(
    () => createCurrencyFormatter(currency),
    [currency]
    );

  const [fdAmount, setFdAmount] =
    useState<number>(100000);

  const [fdRate, setFdRate] =
    useState<number>(7.5);

  const [fdYears, setFdYears] =
    useState<number>(5);

  const [fdFrequency, setFdFrequency] =
    useState<string>("4");

  const fdCalc = useMemo(
    () =>
      computeFD({
        amount: fdAmount,
        annualRatePct: fdRate,
        years: fdYears,
        frequency: Number(fdFrequency),
      }),
    [
      fdAmount,
      fdRate,
      fdYears,
      fdFrequency,
    ]
  );

  const chartRef =
    useRef<HTMLDivElement | null>(null);

  const series = useMemo(() => {
    const labels: string[] = [];
    const data: number[] = [];

    const years = clamp(
      fdYears,
      0,
      MAX_YEARS
    );

    for (
      let y = 0;
      y <= Math.floor(years);
      y++
    ) {
      const { value } = computeFD({
        amount: fdAmount,
        annualRatePct: fdRate,
        years: y,
        frequency: Number(fdFrequency),
      });

      labels.push(`Year ${y}`);
      data.push(value);
    }

    if (!Number.isInteger(years)) {
      const { value } = computeFD({
        amount: fdAmount,
        annualRatePct: fdRate,
        years,
        frequency: Number(fdFrequency),
      });

      labels.push(`Year ${years}`);
      data.push(value);
    }

    return {
      labels,
      data,
    };
  }, [
    fdAmount,
    fdRate,
    fdYears,
    fdFrequency,
  ]);

  const exportData = useMemo(
    () => ({
      title: "Fixed Deposit (Estimate)",
      subtitle:
        "Quarterly is a common compounding assumption for this estimate.",
      summaryCards: [
        {
          label: "Deposit",
          value: fmt(fdAmount),
        },
        {
          label: "Interest",
          value: fmt(fdCalc.interest),
        },
        {
          label: "Maturity",
          value: fmt(fdCalc.value),
        },
      ],
      inputRows: [
        ["Deposit Amount", fmt(fdAmount)],
        ["Rate", `${fdRate}%`],
        ["Duration", `${fdYears} years`],
        [
          "Frequency",
          `${fdFrequency}x/year`,
        ],
      ],
      resultRows: [
        [
          "Maturity Value",
          fmt(fdCalc.value),
        ],
        [
          "Interest Earned",
          fmt(fdCalc.interest),
        ],
      ],
      notes: [
        "Uses standard compound-interest formula. Actual products may use different rules.",
      ],
    }),
    [
      fdAmount,
      fdRate,
      fdYears,
      fdFrequency,
      fdCalc,
      fmt,
    ]
  );

  return (
    <div className="w-full max-w-6xl mx-auto px-3 py-3 sm:px-4 sm:py-4 md:px-5 md:py-5 lg:px-6 lg:py-6 text-white space-y-6">

      <CalculatorHero
        badgeIcon={ShieldCheck}
        accentGlow="bg-cyan-400/30"
        accentBorder="border-cyan-400/30"
        accentBg="bg-cyan-400/15"
        accentText="text-cyan-200"
        title="Fixed deposit calculator"
        description="Estimate your FD maturity value and interest earned using your deposit amount, interest rate, duration, and compounding frequency."
        variant="compact"
        compactFeatures={[
          { label: "🔒 100% Private", body: "Calculations run locally in your browser" },
          { label: "📄 PDF Reports", body: "Download an estimate summary" },
          { label: "🌍 9 Currencies", body: "Display values in your preferred currency" },
          { label: "⚡ Instant Results", body: "Results update as you type" },
        ]}
        gradientClass="from-blue-500/10 via-cyan-500/10 to-violet-500/10"
        previewTitle="FD maturity estimate"
        previewValue={fmt(fdCalc.value)}
        previewNote={`+${fmt(fdCalc.interest)} earned`}
        previewStats={[
          { label: "Deposit", value: fmt(fdAmount), icon: "💰" },
          { label: "Rate", value: `${fdRate}%`, icon: "📈" },
        ]}
      >
        <CurrencySelector value={currency} onChange={setCurrency} />
      </CalculatorHero>

      <QuickStartStrip
        steps={[
          {
            icon: "🏦",
            title: "Enter your deposit",
            body: "Add the amount, annual rate, and duration.",
          },
          {
            icon: "📈",
            title: "Choose compounding",
            body: "Select annual, semi-annual, quarterly, or monthly.",
          },
          {
            icon: "💰",
            title: "See maturity",
            body: "View estimated interest and maturity value.",
          },
        ]}
      />

      <MethodologyNote
        description={
          <>
            <strong>Fixed Deposit (FD):</strong> Uses the same
            compound-interest formula. Quarterly compounding is
            common but actual products may vary.
          </>
        }
        caveat="Actual financial products may include fees, taxes, timing rules, penalties, or different compounding methods. Confirm exact figures with your financial institution."
      />

      <CalculatorNavigation toolRoute="/tools/calculator/fd-calculator" />

      <div className="grid w-full min-w-0 max-w-full gap-5 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">

        <section className="rounded-3xl border border-white/10 bg-slate-950/60 p-5 sm:p-6">

          <div className="border-b border-white/10 pb-4 mb-4">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">

              <SectionHeader
                title="Fixed deposit planner"
                subtitle="Choose the compounding frequency used for this estimate."
                icon={ShieldCheck}
              />

              <FinancePdfExport
                filename="fixed-deposit-report"
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

            <div>
              <Field
                label={`Deposit amount (${currencyMeta.symbol})`}
              >
                <input
                  type="number"
                  min={0}
                  step="1"
                  inputMode="decimal"
                  value={fdAmount}
                  onChange={(e) =>
                    setFdAmount(
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
                The one-time amount you deposit today.
              </div>
            </div>

            <div>
              <Field label="Interest rate (%)">
                <input
                  type="number"
                  min={0}
                  step="0.01"
                  inputMode="decimal"
                  value={fdRate}
                  onChange={(e) =>
                    setFdRate(
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
                Annual FD rate.
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
                  value={fdYears}
                  onChange={(e) =>
                    setFdYears(
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
                How long the deposit stays invested.
              </div>
            </div>

            <div>
              <Field label="Compounding frequency">
                <CustomSelect
                  value={fdFrequency}
                  callBackTrigger={(e) =>
                    setFdFrequency(e)
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

              <div className="text-[11px] text-white/35 mt-1">
                Choose the frequency that best matches the deposit
                product you are estimating. Actual products may use
                different rules.
              </div>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 mt-5">
            <StatCard
              label="Deposit"
              value={fmt(fdAmount)}
              icon="💰"
            />

            <StatCard
              label="Maturity value"
              value={fmt(fdCalc.value)}
              icon="💎"
            />

            <StatCard
              label="Interest earned"
              value={fmt(fdCalc.interest)}
              icon="💹"
            />
          </div>
        </section>

        <section
          ref={chartRef}
          className="rounded-3xl border border-white/10 bg-slate-950/60 p-5 sm:p-6"
        >
          <div className="border-b border-white/10 pb-4 mb-4">
            <SectionHeader
              title="FD projection"
              subtitle="Shows the projected value over the selected duration."
              icon={BarChart3}
            />
          </div>

          <div className="w-full min-w-0 min-h-[260px] overflow-hidden">
            <FinanceChart
              labels={series.labels}
              datasets={[
                {
                  label: "Maturity value",
                  data: series.data,
                  color: "rgba(14,165,233,0.85)",
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