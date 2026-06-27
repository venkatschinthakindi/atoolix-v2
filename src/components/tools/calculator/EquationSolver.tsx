"use client";

import { useEffect, useState } from "react";
import {
  BookOpenCheck,
  HelpCircle,
  X,
  Calculator,
  Sparkles,
  FileText,
} from "lucide-react";
import { getMath } from "@/lib/mathJsUtility";

export function AdvancedEquationSolverPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!sidebarOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSidebarOpen(false);
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [sidebarOpen]);

  return (
    <div className="mx-auto w-full max-w-6xl px-3 py-3 text-white sm:px-4 sm:py-4 md:px-5 md:py-5 lg:px-6 lg:py-6">
      <div className="grid gap-6 xl:grid-cols-[1fr_auto]">
        <div className="space-y-4">
          <EquationSolver sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

          <ShellCard>
            <SectionHeader
              icon={FileText}
              title="Capabilities"
              subtitle="Use the helper drawer for examples across algebra, calculus, matrices, and units."
            />
            <div className="px-4 py-3 text-sm text-white/70 sm:px-5 sm:py-4">
              Type expressions directly or use the examples from the help panel.
            </div>
          </ShellCard>
        </div>
      </div>

      {sidebarOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-[2px]"
            onClick={() => setSidebarOpen(false)}
            aria-hidden="true"
          />

          <div
            id="calculator-help"
            role="dialog"
            aria-modal="true"
            aria-labelledby="calculator-help-title"
            className="fixed right-0 top-0 z-50 h-full w-full max-w-md overflow-y-auto border-l border-white/10 bg-black/90 p-6 shadow-2xl"
          >
            <div className="mb-4 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <BookOpenCheck size={22} className="text-emerald-400" />
                <h2
                  id="calculator-help-title"
                  className="text-xl font-semibold text-white sm:text-2xl"
                >
                  Quick Reference
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setSidebarOpen(false)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:border-white/20 hover:bg-white/10"
                aria-label="Close Help"
              >
                <X size={20} />
              </button>
            </div>

            <DocumentationPanel />
          </div>
        </>
      )}
    </div>
  );
}

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

function EquationSolver({
  sidebarOpen,
  setSidebarOpen,
}: {
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [equation, setEquation] = useState("");
  const [solution, setSolution] = useState("");
  const [isSolving, setIsSolving] = useState(false);

  const solveEquationHandler = async (equation: string) => {
    try {
      const math = await getMath();
      const { evaluate } = math;

      const expression = equation.trim().replace(/(\d+)!/g, (_, n) => `factorial(${n})`);

      const percentOf = expression.match(/^(\d+(?:\.\d+)?)%\s+of\s+(\d+(?:\.\d+)?)$/i);
      if (percentOf) {
        const percent = Number(percentOf[1]);
        const value = Number(percentOf[2]);
        return String((percent / 100) * value);
      }

      const addPercent = expression.match(/^(\d+(?:\.\d+)?)\s*\+\s*(\d+(?:\.\d+)?)%$/i);
      if (addPercent) {
        const value = Number(addPercent[1]);
        const percent = Number(addPercent[2]);
        return String(value + (value * percent) / 100);
      }

      const subtractPercent = expression.match(/^(\d+(?:\.\d+)?)\s*-\s*(\d+(?:\.\d+)?)%$/i);
      if (subtractPercent) {
        const value = Number(subtractPercent[1]);
        const percent = Number(subtractPercent[2]);
        return String(value - (value * percent) / 100);
      }

      const percentOfValue = expression.match(
        /^(\d+(?:\.\d+)?)\s+is\s+what\s+%\s+of\s+(\d+(?:\.\d+)?)$/i
      );
      if (percentOfValue) {
        const part = Number(percentOfValue[1]);
        const whole = Number(percentOfValue[2]);
        if (whole === 0) return "Cannot divide by zero";
        return `${((part / whole) * 100).toFixed(2)}%`;
      }

      const result = evaluate(expression);

      if (result === undefined || result === null) return "";
      if (typeof result === "object") {
        if ("toString" in result) return result.toString();
        return JSON.stringify(result, null, 2);
      }

      return String(result);
    } catch (error) {
      return error instanceof Error ? error.message : "Unknown error";
    }
  };

  const handleSolve = async () => {
    if (isSolving) return;
    if (!equation.trim()) {
      setSolution("");
      return;
    }

    setIsSolving(true);
    try {
      setSolution(await solveEquationHandler(equation));
    } finally {
      setIsSolving(false);
    }
  };

  return (
    <ShellCard>
      <SectionHeader
        icon={Calculator}
        title="Solver"
        subtitle="Enter an expression or equation and solve it in a clean, high-contrast panel."
      />

      <div className="space-y-4 p-3 sm:p-4 md:p-5">
        <div className="rounded-2xl border border-white/10 bg-black/10 px-4 py-3 text-right">
          <p className="text-[11px] uppercase tracking-[0.16em] text-white/45">Solution</p>
          <p className="mt-2 break-all text-2xl font-semibold text-white sm:text-3xl">
            {solution || "0"}
          </p>
        </div>

        <input
          value={equation}
          onChange={(e) => setEquation(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") void handleSolve();
          }}
          placeholder="Enter an equation or expression (examples in Help)"
          className="h-12 w-full rounded-2xl border border-white/10 bg-black/10 px-4 text-sm text-white outline-none placeholder:text-white/30 focus:border-green-400/35 focus:bg-black/15"
        />

        <div className="grid grid-cols-[9fr_1fr] gap-2">
          <button
            type="button"
            disabled={isSolving}
            onClick={() => void handleSolve()}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-500 to-blue-500 px-5 py-4 text-sm font-semibold text-white transition hover:from-emerald-400 hover:to-blue-400 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSolving ? "Solving..." : "Solve"}
          </button>

          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white transition hover:border-white/20 hover:bg-white/10"
            aria-label="Open Help"
            aria-expanded={sidebarOpen}
            aria-controls="calculator-help"
          >
            <HelpCircle size={20} />
          </button>
        </div>
      </div>
    </ShellCard>
  );
}

function DocumentationPanel() {
  return (
    <div className="space-y-3 text-sm text-white/80">
      <DocItem label="Basics" example="12+8/2" result="16" />
      <DocItem label="Percentage" example="20% of 150" result="30" />
      <DocItem label="Increase" example="150 + 20%" result="180" />
      <DocItem label="Decrease" example="150 - 20%" result="120" />
      <DocItem label="Find Percentage" example="25 is what % of 80" result="31.25%" />
      <DocItem label="Algebra" example='simplify(2x+3x)' result="5x" />
      <DocItem label="Trigonometry" example="sin(pi/4)" result="0.707" />
      <DocItem label="Logarithms" example="log(1000)" result="6.907755" />
      <DocItem label="Exponentials" example="exp(1)" result="2.718" />
      <DocItem label="Powers" example="pow(2,3)" result="8" />
      <DocItem label="Absolute" example="abs(-5)" result="5" />
      <DocItem label="Round" example="round(pi,2)" result="3.14" />
      <DocItem label="Sqrt" example="sqrt(16)" result="4" />
      <DocItem label="GCD/LCM" example="gcd(12,18), lcm(4,6)" result="6, 12" />
      <DocItem label="Fraction" example="fraction(0.75)" result="3/4" />
      <DocItem label="Derivative" example='derivative("x^2+3x","x")' result="2x+3" />
      <DocItem label="Matrices" example="det([[1,2],[3,4]])" result="-2" />
      <DocItem label="Complex" example="complex(2,3)" result="2+3i" />
      <DocItem label="Units" example="5 cm to inch" result="1.9685 inch" />
      <DocItem label="Statistics" example="mean([1,2,3,4])" result="2.5" />
      <DocItem label="Combinatorics" example="combinations(5,2)" result="10" />

      <p className="pt-2 text-xs leading-5 text-white/45">
        Tip: Start with basics, then explore algebra, calculus, matrices, statistics, and more.
      </p>
    </div>
  );
}

function DocItem({
  label,
  example,
  result,
}: {
  label: string;
  example: string;
  result: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
      <p className="text-xs uppercase tracking-[0.16em] text-white/45">{label}</p>
      <p className="mt-2 text-sm leading-6 text-white/80">
        <code className="rounded bg-black/20 px-1.5 py-0.5 text-white">{example}</code>{" "}
        <span className="text-white/55">→</span> <span className="text-white">{result}</span>
      </p>
    </div>
  );
}