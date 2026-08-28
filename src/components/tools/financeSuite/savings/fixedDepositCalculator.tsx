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
  ShieldCheck,
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

function QuickStartStrip() {
  const steps = [
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
            <strong>Fixed Deposit (FD):</strong> Uses the same
            compound-interest formula. Quarterly compounding is
            common but actual products may vary.
          </p>

          <p className="text-white/40">
            Actual financial products may include fees, taxes,
            timing rules, penalties, or different compounding
            methods. Confirm exact figures with your financial
            institution.
          </p>
        </div>
      )}
    </div>
  );
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

      <section className="mb-5 px-5 py-6 sm:px-6 lg:px-8 rounded-3xl border border-white/10 bg-slate-950/60">
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-10 items-center">

          <div className="space-y-6">
            <div className="inline-flex items-center gap-2">
              <div className="relative">
                <div className="absolute inset-0 bg-cyan-400/30 blur-md rounded-full animate-pulse" />

                <div className="relative inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/15 px-3 py-1.5 text-xs font-medium text-cyan-200">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  <span>Private finance workspace</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-[1.15]">
                Fixed deposit calculator
              </h1>

              <p className="text-base sm:text-lg text-white/70 leading-relaxed max-w-xl">
                Estimate your FD maturity value and interest
                earned using your deposit amount, interest rate,
                duration, and compounding frequency.
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
                  Download an estimate summary
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
                  Results update as you type
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 via-cyan-500/10 to-violet-500/10 rounded-3xl blur-2xl" />

            <div className="relative rounded-3xl border border-white/10 bg-slate-950/80 backdrop-blur-xl p-6 sm:p-8 space-y-6">

              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs text-white/50 uppercase tracking-wide">
                    Live preview
                  </div>

                  <div className="text-sm font-semibold text-white/90">
                    FD maturity estimate
                  </div>
                </div>

                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <div className="text-xs text-white/50">
                  Maturity value
                </div>

                <div className="text-2xl sm:text-3xl font-bold text-white mt-2">
                  {fmt(fdCalc.value)}
                </div>

                <div className="text-xs text-emerald-400 mt-2">
                  +{fmt(fdCalc.interest)} earned
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <StatCard
                  label="Deposit"
                  value={fmt(fdAmount)}
                  icon="💰"
                />

                <StatCard
                  label="Rate"
                  value={`${fdRate}%`}
                  icon="📈"
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
              <CurrencyInput
                label={`Deposit amount (${currencyMeta.symbol})`}
                value={fdAmount}
                onChange={(value) =>
                  setFdAmount(Math.max(0, value ?? 0))
                }
                currency={currencyMeta.symbol}
                min={0}
                step={1}
                hint="The one-time amount you deposit today."
              />
            </div>

            <div>
              <NumberInput
                label="Interest rate (%)"
                value={fdRate}
                onChange={(value) =>
                  setFdRate(Math.max(0, value ?? 0))
                }
                min={0}
                step={0.01}
                hint="Annual FD rate."
              />
            </div>

            <div>
              <DurationInput
                label="Duration (years)"
                value={fdYears}
                onChange={(value) =>
                  setFdYears(
                    clamp(
                      value ?? 0,
                      0,
                      MAX_YEARS
                    )
                  )
                }
                unit="years"
                min={0}
                max={MAX_YEARS}
                step={1}
                hint={`Max ${MAX_YEARS}. How long the deposit stays invested.`}
              />
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