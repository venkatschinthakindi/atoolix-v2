"use client";

import {
  useMemo,
  useRef,
  useState,
  type ReactNode,
  type ComponentType,
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
import { SectionHeader } from "@/sharedUI/sectionHeader";
import { StatCard } from "@/sharedUI/statCard";
import { Field } from "./core/field";
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

type RdConvention = "end" | "beginning";

const MAX_RD_MONTHS = 600;

function clamp(value: number, min: number, max: number) {
  if (!Number.isFinite(value)) return min;
  return Math.min(max, Math.max(min, value));
}

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

const inputCls =
  "w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder-white/30 focus:outline-none focus:border-blue-400/50 focus:bg-white/10 transition text-sm";

function QuickStartStrip() {
  const steps = [
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
            <strong>Recurring deposit / monthly savings:</strong>
            Uses an annuity-style monthly compounding model.
            Actual financial products may use different calculation
            conventions.
          </p>

          <p className="text-white/40">
            These are standard mathematical estimates. Actual bank
            RD calculations may differ because of product terms,
            taxes, fees, timing rules, or other conventions.
          </p>
        </div>
      )}
    </div>
  );
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

      <section className="mb-5 px-5 py-6 sm:px-6 lg:px-8 rounded-3xl border border-white/10 bg-slate-950/60">
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-10 items-center">

          <div className="space-y-6">
            <div className="inline-flex items-center gap-2">
              <div className="relative">
                <div className="absolute inset-0 bg-emerald-400/30 blur-md rounded-full animate-pulse" />

                <div className="relative inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/15 px-3 py-1.5 text-xs font-medium text-emerald-200">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  <span>Private finance workspace</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-[1.15]">
                Recurring deposit calculator
              </h1>

              <p className="text-base sm:text-lg text-white/70 leading-relaxed max-w-xl">
                Estimate your recurring deposit maturity value,
                total investment, and interest earned from monthly
                contributions.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="text-sm font-semibold text-white/90">
                  🔒 100% Private
                </div>

                <div className="text-xs text-white/50 mt-1">
                  Calculations run locally in your browser
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="text-sm font-semibold text-white/90">
                  📄 PDF Reports
                </div>

                <div className="text-xs text-white/50 mt-1">
                  Export your estimate instantly
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="text-sm font-semibold text-white/90">
                  🌍 9 Currencies
                </div>

                <div className="text-xs text-white/50 mt-1">
                  Display values in your preferred currency
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="text-sm font-semibold text-white/90">
                  ⚡ Instant Results
                </div>

                <div className="text-xs text-white/50 mt-1">
                  Updates as you type
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/10 via-blue-500/10 to-violet-500/10 rounded-3xl blur-2xl" />

            <div className="relative rounded-3xl border border-white/10 bg-slate-950/80 backdrop-blur-xl p-6 sm:p-8 space-y-6">

              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs text-white/50 uppercase tracking-wide">
                    Live preview
                  </div>

                  <div className="text-sm font-semibold text-white/90">
                    RD maturity estimate
                  </div>
                </div>

                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <div className="text-xs text-white/50">
                  Maturity value
                </div>

                <div className="text-2xl sm:text-3xl font-bold text-white mt-2">
                  {fmt(rdCalc.value)}
                </div>

                <div className="text-xs text-emerald-400 mt-2">
                  +{fmt(rdCalc.interest)} earned
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <StatCard
                  label="Monthly deposit"
                  value={fmt(rdAmount)}
                  icon="💰"
                />

                <StatCard
                  label="Total invested"
                  value={fmt(
                    rdCalc.totalInvested
                  )}
                  icon="🏦"
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