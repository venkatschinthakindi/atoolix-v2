"use client";

import {
  useMemo,
  useRef,
  useState,
} from "react";
import dynamic from "next/dynamic";
import CustomSelect from "@/components/ui/customSelect";
import {
  Calculator,
  BarChart3,
  ShieldCheck,
} from "lucide-react";
import { CURRENCIES, CurrencyCode } from "./core/currencyCode";
import { CalculatorNavigation } from "./core/calculatorNavigation";
import { SectionHeader } from "./core/sectionHeader";
import { StatCard } from "./core/statCard";
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

type RdConvention = "end" | "beginning";

const MAX_RD_MONTHS = 600;

function computeRD({
  monthlyDeposit,
  annualRatePct,
  months,
  convention,
}: {
  monthlyDeposit: number;
  annualRatePct: number;
  months: number;
  convention: RdConvention;
}) {
  const n = Math.max(0, Math.floor(months));
  const p = Math.max(0, monthlyDeposit);
  const r = Math.max(0, annualRatePct) / 12 / 100;

  if (n === 0 || p === 0) {
    return {
      value: 0,
      interest: 0,
      totalInvested: p * n,
    };
  }

  if (r === 0) {
    const totalInvested = p * n;

    return {
      value: totalInvested,
      interest: 0,
      totalInvested,
    };
  }

  let fv =
    p *
    ((Math.pow(1 + r, n) - 1) / r);

  if (convention === "beginning") {
    fv *= 1 + r;
  }

  const totalInvested = p * n;
  const interest = fv - totalInvested;

  return {
    value: fv,
    interest,
    totalInvested,
  };
}

export default function RecurringDepositCalculator() {
  const [currency, setCurrency] =
    useState<CurrencyCode>("INR");

  const currencyMeta = CURRENCIES[currency];

  const fmt = useMemo(
    () => createCurrencyFormatter(currency),
    [currency]
    );

  const [rdAmount, setRdAmount] =
    useState<number>(5000);

  const [rdRate, setRdRate] =
    useState<number>(7);

  const [rdMonths, setRdMonths] =
    useState<number>(60);

  const [rdConvention, setRdConvention] =
    useState<RdConvention>("end");

  const rdCalc = useMemo(
    () =>
      computeRD({
        monthlyDeposit: rdAmount,
        annualRatePct: rdRate,
        months: clamp(
          rdMonths,
          1,
          MAX_RD_MONTHS
        ),
        convention: rdConvention,
      }),
    [
      rdAmount,
      rdRate,
      rdMonths,
      rdConvention,
    ]
  );

  const chartRef =
    useRef<HTMLDivElement | null>(null);

  const series = useMemo(() => {
    const labels: string[] = [];
    const data: number[] = [];

    const months = clamp(
      Math.floor(rdMonths),
      1,
      MAX_RD_MONTHS
    );

    for (
      let m = 0;
      m <= months;
      m++
    ) {
      const { value } = computeRD({
        monthlyDeposit: rdAmount,
        annualRatePct: rdRate,
        months: m,
        convention: rdConvention,
      });

      labels.push(`Month ${m}`);
      data.push(value);
    }

    return {
      labels,
      data,
    };
  }, [
    rdAmount,
    rdRate,
    rdMonths,
    rdConvention,
  ]);

  const exportData = useMemo(
    () => ({
      title:
        "Recurring Deposit / Monthly Savings (Estimate)",
      subtitle:
        "Uses a standard monthly-compounding annuity model for estimation.",
      summaryCards: [
        {
          label: "Total Invested",
          value: fmt(rdCalc.totalInvested),
        },
        {
          label: "Interest",
          value: fmt(rdCalc.interest),
        },
        {
          label: "Maturity",
          value: fmt(rdCalc.value),
        },
      ],
      inputRows: [
        [
          "Monthly Deposit",
          fmt(rdAmount),
        ],
        ["Rate", `${rdRate}%`],
        [
          "Term",
          `${clamp(
            rdMonths,
            1,
            MAX_RD_MONTHS
          )} months`,
        ],
        ["Timing", rdConvention],
      ],
      resultRows: [
        [
          "Maturity Value",
          fmt(rdCalc.value),
        ],
        [
          "Interest Earned",
          fmt(rdCalc.interest),
        ],
      ],
      notes: [
        "Actual bank RD calculations may use different compounding conventions.",
      ],
    }),
    [
      rdAmount,
      rdRate,
      rdMonths,
      rdConvention,
      rdCalc,
      fmt,
    ]
  );

  return (
    <div className="w-full max-w-6xl mx-auto px-3 py-3 sm:px-4 sm:py-4 md:px-5 md:py-5 lg:px-6 lg:py-6 text-white space-y-6">

      <CalculatorHero
        badgeIcon={ShieldCheck}
        accentGlow="bg-emerald-400/30"
        accentBorder="border-emerald-400/30"
        accentBg="bg-emerald-400/15"
        accentText="text-emerald-200"
        title="Recurring deposit calculator"
        description="Estimate your recurring deposit maturity value, total investment, and interest earned from monthly contributions."
        variant="compact"
        compactFeatures={[
          { label: "🔒 100% Private", body: "Calculations run locally in your browser" },
          { label: "📄 PDF Reports", body: "Export your estimate instantly" },
          { label: "🌍 9 Currencies", body: "Display values in your preferred currency" },
          { label: "⚡ Instant Results", body: "Updates as you type" },
        ]}
        gradientClass="from-emerald-500/10 via-blue-500/10 to-violet-500/10"
        previewTitle="RD maturity estimate"
        previewValue={fmt(rdCalc.value)}
        previewNote={`+${fmt(rdCalc.interest)} earned`}
        previewStats={[
          { label: "Monthly deposit", value: fmt(rdAmount), icon: "💰" },
          { label: "Total invested", value: fmt(rdCalc.totalInvested), icon: "🏦" },
        ]}
      >
        <CurrencySelector value={currency} onChange={setCurrency} />
      </CalculatorHero>

      <QuickStartStrip
        steps={[
          {
            icon: "💰",
            title: "Set monthly deposit",
            body: "Enter the amount you plan to deposit every month.",
          },
          {
            icon: "📅",
            title: "Choose your term",
            body: "Enter the number of months and annual interest rate.",
          },
          {
            icon: "📊",
            title: "Review maturity",
            body: "See total invested, interest, and estimated maturity.",
          },
        ]}
      />

      <MethodologyNote
        description={
          <>
            <strong>Recurring deposit / monthly savings:</strong>
            Uses an annuity-style monthly compounding model.
            Actual financial products may use different calculation
            conventions.
          </>
        }
        caveat="These are standard mathematical estimates. Actual bank RD calculations may differ because of product terms, taxes, fees, timing rules, or other conventions."
      />

      <CalculatorNavigation toolRoute="/tools/calculator/recurring-deposit-calculator" />

      <div className="grid w-full min-w-0 max-w-full gap-5 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">

        <section className="rounded-3xl border border-white/10 bg-slate-950/60 p-5 sm:p-6">

          <div className="border-b border-white/10 pb-4 mb-4">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">

              <SectionHeader
                title="Recurring deposit planner"
                subtitle="Choose the deposit timing assumption before reviewing the result."
                icon={Calculator}
              />

              <FinancePdfExport
                filename="recurring-deposit-report"
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
                label={`Monthly deposit (${currencyMeta.symbol})`}
              >
                <input
                  type="number"
                  min={0}
                  step="1"
                  inputMode="decimal"
                  value={rdAmount}
                  onChange={(e) =>
                    setRdAmount(
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
                The amount you deposit every month.
              </div>
            </div>

            <div>
              <Field label="Interest rate (%)">
                <input
                  type="number"
                  min={0}
                  step="0.01"
                  inputMode="decimal"
                  value={rdRate}
                  onChange={(e) =>
                    setRdRate(
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
                Annual RD rate.
              </div>
            </div>

            <div>
              <Field
                label="Term (months)"
                hint={`Max ${MAX_RD_MONTHS}`}
              >
                <input
                  type="number"
                  min={1}
                  max={MAX_RD_MONTHS}
                  step={1}
                  inputMode="numeric"
                  value={rdMonths}
                  onChange={(e) =>
                    setRdMonths(
                      clamp(
                        Number(e.target.value),
                        1,
                        MAX_RD_MONTHS
                      )
                    )
                  }
                  className={inputCls}
                />
              </Field>

              <div className="text-[11px] text-white/35 mt-1">
                How many months you keep depositing.
              </div>
            </div>

            <div>
              <Field label="Deposit timing">
                <CustomSelect
                  value={rdConvention}
                  callBackTrigger={(e) =>
                    setRdConvention(
                      e as RdConvention
                    )
                  }
                  options={[
                    {
                      value: "end",
                      label: "End of month",
                    },
                    {
                      value: "beginning",
                      label: "Beginning of month",
                    },
                  ]}
                />
              </Field>

              <div className="text-[11px] text-white/35 mt-1">
                Use the default if you just want a quick estimate.
              </div>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 mt-5">
            <StatCard
              label="Total invested"
              value={fmt(
                rdCalc.totalInvested
              )}
              icon="🏦"
            />

            <StatCard
              label="Maturity value"
              value={fmt(rdCalc.value)}
              icon="💎"
            />

            <StatCard
              label="Interest earned"
              value={fmt(rdCalc.interest)}
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
              title="RD projection"
              subtitle="Shows the maturity value month by month."
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
                  color: "rgba(16,185,129,0.85)",
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