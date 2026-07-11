"use client";

import { useMemo, useState } from "react";
import { Copy, RotateCcw, Calculator } from "lucide-react";
import { percentageOf, round } from "@/lib/percentage/percentage";

function ShellCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md transition-all duration-300 hover:border-blue-400/20 hover:bg-white/[0.06] ${className}`}
    >
      {children}
    </section>
  );
}

function SectionHeader({
  icon: Icon,
  title,
  subtitle,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="border-b border-white/10 px-4 py-3 sm:px-5 sm:py-4">
      <div className="flex items-center gap-2">
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/85">
          <Icon className="h-4 w-4" />
        </span>
        <div>
          <h2 className="text-base font-semibold tracking-tight text-white sm:text-md">{title}</h2>
          <p className="mt-1 text-xs text-white/60 sm:text-sm">{subtitle}</p>
        </div>
      </div>
    </div>
  );
}

function ResultBox({ value }: { value: string }) {
  return (
    <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-4">
      <p className="text-xs uppercase tracking-[0.16em] text-emerald-200/70">Result</p>
      <p className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-4xl">{value}</p>
    </div>
  );
}

function InputField({
  id,
  label,
  value,
  onChange,
  placeholder,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
}) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-xs uppercase tracking-[0.16em] text-white/45">
        {label}
      </label>
      <input
        id={id}
        type="number"
        inputMode="decimal"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="h-12 w-full rounded-2xl border border-white/10 bg-black/10 px-4 text-sm text-white outline-none placeholder:text-white/30 focus:border-blue-400/35 focus:bg-black/15"
      />
    </div>
  );
}

export default function BasicPercentage() {
  const [value, setValue] = useState("");
  const [percent, setPercent] = useState("");

  const result = useMemo(() => {
    const valueNumber = Number(value);
    const percentNumber = Number(percent);

    if (
      value.trim() === "" ||
      percent.trim() === "" ||
      Number.isNaN(valueNumber) ||
      Number.isNaN(percentNumber)
    ) {
      return null;
    }

    return round(percentageOf(valueNumber, percentNumber), 6);
  }, [value, percent]);

  const clear = () => {
    setValue("");
    setPercent("");
  };

  const copyResult = async () => {
    if (result === null) return;
    try {
      await navigator.clipboard.writeText(String(result));
    } catch {}
  };

  const displayResult =
    result === null || !Number.isFinite(result) ? "--" : result.toLocaleString();

  return (
    <div className="space-y-4">
      <ShellCard>
        <SectionHeader
          icon={Calculator}
          title="Basic percentage"
          subtitle="Find the percentage value with the same spacing, font sizes, and colors as the compressor UI."
        />

        <div className="space-y-4 p-3 sm:p-4 md:p-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <InputField
              id="basic-value"
              label="Value"
              value={value}
              onChange={setValue}
              placeholder="500"
            />
            <InputField
              id="basic-percent"
              label="Percentage"
              value={percent}
              onChange={setPercent}
              placeholder="20"
            />
          </div>

          <ResultBox value={displayResult} />

          {result !== null && (
            <div className="grid gap-3">
              <div className="rounded-2xl border border-white/10 bg-black/10 p-4">
                <p className="text-xs uppercase tracking-[0.16em] text-white/45">Formula</p>
                <code className="mt-2 block text-sm text-white/80">
                  (Value × Percentage) ÷ 100
                </code>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/10 p-4">
                <p className="text-xs uppercase tracking-[0.16em] text-white/45">Steps</p>
                <p className="mt-2 text-sm leading-6 text-white/70">
                  ({value} × {percent}) ÷ 100 = {displayResult}
                </p>
              </div>
            </div>
          )}

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={copyResult}
              disabled={result === null}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-500 to-violet-500 px-5 py-3.5 text-sm font-semibold text-white transition hover:from-blue-400 hover:to-violet-400 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Copy className="h-4.5 w-4.5" />
              Copy Result
            </button>

            <button
              type="button"
              onClick={clear}
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              <RotateCcw className="h-4.5 w-4.5" />
              Reset
            </button>
          </div>
        </div>
      </ShellCard>
    </div>
  );
}