"use client";

import { getMath } from "@/lib/mathJsUtility";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Calculator,
  History,
  Delete,
  Equal,
  Percent,
  RotateCcw,
  Copy,
} from "lucide-react";

type SmartCalculatorProps = {
  initialExpression: string | undefined;
  theme: "light" | "dark" | undefined;
};

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

function StatCard({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 px-3 py-3 backdrop-blur-sm">
      <div className="flex items-center gap-3">
        <span className="inline-flex h-10 w-10 items-center justify-center text-blue-200">
          <Icon className="h-4.5 w-4.5" />
        </span>
        <div className="min-w-0">
          <p className="text-[11px] uppercase tracking-[0.16em] text-white/45">{label}</p>
          <p className="truncate text-sm font-semibold text-white">{value}</p>
        </div>
      </div>
    </div>
  );
}

function KeyButton({
  children,
  className = "",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      type="button"
      className={`inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-3 py-3 text-sm font-semibold text-white transition hover:border-white/20 hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    >
      {children}
    </button>
  );
}

function DisplayLine({
  label,
  value,
  muted = false,
}: {
  label: string;
  value: string;
  muted?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/10 px-4 py-3">
      <p className="text-[11px] uppercase tracking-[0.16em] text-white/45">{label}</p>
      <p className={`mt-1 break-all text-right text-2xl font-semibold sm:text-3xl ${muted ? "text-white/55" : "text-white"}`}>
        {value || "0"}
      </p>
    </div>
  );
}

export function SmartCalculator({ initialExpression, theme }: SmartCalculatorProps) {
  const [expression, setExpression] = useState(initialExpression ?? "");
  const [result, setResult] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [memory, setMemory] = useState(0);
  const [isCalculating, setIsCalculating] = useState(false);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const themeClass =
    theme === "light"
      ? "text-slate-950"
      : "text-white";

  const displayResult = useMemo(() => result || "--", [result]);
  const displayExpression = useMemo(() => expression || "0", [expression]);

  useEffect(() => {
    const t = setTimeout(() => setCopied(false), 1200);
    return () => clearTimeout(t);
  }, [copied]);

  const calculate = async () => {
    if (isCalculating) return;
    if (!expression.trim()) {
      setResult("");
      return;
    }

    setIsCalculating(true);
    try {
      const math = await getMath();
      const { evaluate } = math;

      const expr = expression
        .replace(/(\d+)!/g, (_, n) => `factorial(${n})`)
        .replace(/\b0+(\d+)/g, "$1");

      const res = evaluate(expr);
      const out = String(res);

      setResult(out);
      setHistory((prev) => [...prev.slice(-49), `${expression} = ${out}`]);
    } catch {
      setResult("Error");
    } finally {
      setIsCalculating(false);
    }
  };

  const append = (val: string) => setExpression((prev) => prev + val);

  const handleClick = async (val: string) => {
    switch (val) {
      case "=":
        await calculate();
        break;
      case "C":
        setExpression("");
        setResult("");
        break;
      case "⌫":
        setExpression((prev) => prev.slice(0, -1));
        break;
      case "ANS":
        if (result && result !== "Error") append(result);
        break;
      case "MR":
        append(String(memory));
        break;
      case "M+":
        if (!Number.isNaN(Number(result))) setMemory((prev) => prev + Number(result));
        break;
      case "M-":
        if (!Number.isNaN(Number(result))) setMemory((prev) => prev - Number(result));
        break;
      case "MC":
        setMemory(0);
        break;
      default:
        append(val);
        break;
    }
  };

  const copyExpression = async () => {
    try {
      await navigator.clipboard.writeText(expression || "");
      setCopied(true);
    } catch {}
  };

  const sciButtons = [
    "sin(",
    "cos(",
    "tan(",
    "log(",
    "ln(",
    "sqrt(",
    "pi",
    "e",
    "!",
    "%",
    "(",
    ")",
  ];

  const numberButtons = ["7", "8", "9", "4", "5", "6", "1", "2", "3"];

  return (
    <div className={`mx-auto w-full px-3 py-3 sm:px-4 sm:py-4 md:px-5 md:py-5 lg:px-6 lg:py-6 ${themeClass}`}>
      <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <div className="space-y-4">
          <ShellCard>
            <SectionHeader
              icon={Calculator}
              title="Calculator"
              subtitle="A simple calculator with advanced features."
            />
            <div className="space-y-4 p-3 sm:p-4 md:p-5">
              <div className="grid gap-3">
                <DisplayLine label="Expression" value={displayExpression} muted={false} />
                <DisplayLine label="Result" value={displayResult} muted={result === ""} />
              </div>

              <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
                <input
                  ref={inputRef}
                  value={expression}
                  onChange={(e) => setExpression(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") void calculate();
                    if (e.key === "Escape") {
                      setExpression("");
                      setResult("");
                    }
                  }}
                  placeholder="Enter expression"
                  className="h-12 w-full rounded-2xl border border-white/10 bg-black/10 px-4 text-sm text-white outline-none placeholder:text-white/30 focus:border-blue-400/35 focus:bg-black/15"
                />
                <div className="flex gap-2">
                  <KeyButton onClick={copyExpression} className="px-4">
                    <Copy className="h-4 w-4" />
                    {copied ? "Copied" : "Copy"}
                  </KeyButton>
                  <KeyButton onClick={() => setExpression("")} className="px-4">
                    <RotateCcw className="h-4 w-4" />
                    Clear
                  </KeyButton>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-4">
                <KeyButton onClick={() => void handleClick("⌫")}>
                  <Delete className="h-4 w-4" />
                </KeyButton>
                <KeyButton onClick={() => void handleClick("ANS")}>ANS</KeyButton>
                <KeyButton onClick={() => void handleClick("%")}>
                  <Percent className="h-4 w-4" />
                </KeyButton>
                <KeyButton
                  onClick={() => void handleClick("=")}
                  className="bg-gradient-to-r from-blue-500 to-violet-500 hover:from-blue-400 hover:to-violet-400"
                >
                  <Equal className="h-4 w-4" />
                </KeyButton>
              </div>

              <div className="grid gap-2 sm:grid-cols-3">
                {numberButtons.map((btn) => (
                  <KeyButton key={btn} onClick={() => void handleClick(btn)} className="text-base">
                    {btn}
                  </KeyButton>
                ))}
              </div>

              <div className="grid gap-2 sm:grid-cols-3">
                <KeyButton onClick={() => void handleClick("0")} className="text-base">
                  0
                </KeyButton>
                <KeyButton onClick={() => void handleClick(".")} className="text-base">
                  .
                </KeyButton>
                <KeyButton
                  onClick={() => void handleClick("=")}
                  className="bg-gradient-to-r from-violet-500 to-blue-500 text-base hover:from-violet-400 hover:to-blue-400"
                >
                  =
                </KeyButton>
              </div>

              <div className="grid gap-2 sm:grid-cols-4">
                {["/", "*", "-", "+"].map((op) => (
                  <KeyButton key={op} onClick={() => void handleClick(op)} className="text-lg">
                    {op}
                  </KeyButton>
                ))}
              </div>

              <div className="grid gap-2 sm:grid-cols-4 xl:grid-cols-4">
                {sciButtons.map((btn) => (
                  <KeyButton
                    key={btn}
                    onClick={() => void handleClick(btn)}
                    className="justify-start text-sm"
                  >
                    {btn}
                  </KeyButton>
                ))}
              </div>

              <div className="grid gap-2 sm:grid-cols-4">
                <KeyButton onClick={() => void handleClick("M+")}>M+</KeyButton>
                <KeyButton onClick={() => void handleClick("M-")}>M-</KeyButton>
                <KeyButton onClick={() => void handleClick("MR")}>MR</KeyButton>
                <KeyButton onClick={() => void handleClick("MC")}>MC</KeyButton>
              </div>
            </div>
          </ShellCard>
        </div>

        <div className="space-y-4">
          <ShellCard>
            <SectionHeader
              icon={History}
              title="History"
              subtitle="Recent calculations appear here with a clean scrollable surface."
            />
            <div className="space-y-3 p-3 sm:p-4 md:p-5">
              <div className="max-h-[420px] space-y-2 overflow-y-auto pr-1">
                {history.length > 0 ? (
                  history
                    .slice()
                    .reverse()
                    .map((h, i) => (
                      <div
                        key={i}
                        className="rounded-2xl border border-white/10 bg-black/10 px-4 py-3 text-sm text-white/75"
                      >
                        {h}
                      </div>
                    ))
                ) : (
                  <div className="rounded-2xl border border-white/10 bg-black/10 px-4 py-3 text-sm text-white/45">
                    No history yet.
                  </div>
                )}
              </div>
            </div>
          </ShellCard>
        </div>
      </div>
    </div>
  );
}