"use client";

import { getMath } from "@/lib/mathJsUtility";
import { ShellCard } from "@/components/ui/calculator/ShellCard";
import { useEffect, useRef, useState } from "react";
import {
  Calculator,
  History,
  Delete,
  Equal,
  Percent,
  RotateCcw,
  Copy,
  Check,
  Trash2,
  CornerDownLeft,
} from "lucide-react";
import { SectionHeader } from "@/sharedUI/sectionHeader";

type SmartCalculatorProps = {
  initialExpression: string | undefined;
  theme: "light" | "dark" | undefined;
};

type HistoryEntry = {
  id: string;
  expression: string;
  result: string;
};

type ToastState = { message: string; tone: "error" | "success" } | null;

/* ------------------------------------------------------------------ */
/* Presentational helpers                                              */
/* ------------------------------------------------------------------ */

function KeyButton({
  children,
  className = "",
  variant = "default",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "default" | "danger" }) {
  const variantClass =
    variant === "danger"
      ? "border-red-400/25 bg-red-500/10 text-red-300 hover:border-red-400/40 hover:bg-red-500/20 hover:text-red-200 focus-visible:ring-red-400/60"
      : "border-white/10 bg-white/5 text-white hover:border-white/20 hover:bg-white/10 focus-visible:ring-blue-400/60";

  return (
    <button
      {...props}
      type="button"
      className={`inline-flex items-center justify-center rounded-2xl border px-3 py-3 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-50 ${variantClass} ${className}`}
    >
      {children}
    </button>
  );
}

function DisplayLine({
  label,
  value,
  muted = false,
  onCopy,
  copied,
  live,
  preview = false,
}: {
  label: string;
  value: string;
  muted?: boolean;
  onCopy?: () => void;
  copied?: boolean;
  live?: boolean;
  preview?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/10 px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <p className="text-[11px] uppercase tracking-[0.16em] text-white/45">{label}</p>
          {preview && (
            <span className="rounded-full border border-blue-400/30 bg-blue-400/10 px-1.5 py-0.5 text-[9px] font-medium uppercase tracking-wide text-blue-200">
              live
            </span>
          )}
        </div>
        {onCopy && (
          <button
            type="button"
            onClick={onCopy}
            aria-label={`Copy ${label.toLowerCase()}`}
            className="inline-flex h-6 w-6 items-center justify-center rounded-lg text-white/40 transition hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/60"
          >
            {copied ? <Check className="h-3.5 w-3.5 text-emerald-300" /> : <Copy className="h-3.5 w-3.5" />}
          </button>
        )}
      </div>
      <p
        aria-live={live ? "polite" : undefined}
        className={`mt-1 break-all text-right text-2xl font-semibold sm:text-3xl ${
          muted ? "text-white/55" : preview ? "text-white/75" : "text-white"
        }`}
      >
        {preview && value ? `≈ ${value}` : value || "0"}
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Button configuration                                                */
/* ------------------------------------------------------------------ */

const FUNCTION_TOKENS = ["sin", "cos", "tan", "log", "ln", "sqrt", "abs", "floor", "ceil"];

export function SmartCalculator({ initialExpression, theme }: SmartCalculatorProps) {
  const [expression, setExpressionRaw] = useState(initialExpression ?? "");
  const [result, setResult] = useState("");
  const [previewResult, setPreviewResult] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [memory, setMemory] = useState(0);
  const [isCalculating, setIsCalculating] = useState(false);
  const [copiedField, setCopiedField] = useState<"expression" | "result" | null>(null);
  const [toast, setToast] = useState<ToastState>(null);
  const [justEvaluated, setJustEvaluated] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const themeClass = theme === "light" ? "text-slate-950" : "text-white";

  useEffect(() => {
    if (!copiedField) return;
    const t = setTimeout(() => setCopiedField(null), 1200);
    return () => clearTimeout(t);
  }, [copiedField]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2400);
    return () => clearTimeout(t);
  }, [toast]);

  /* ---------------------------------------------------------------- */
  /* Core expression mutation helpers                                  */
  /* ---------------------------------------------------------------- */

  // Any manual edit invalidates a previous error/result and the
  // "just evaluated" state, so stale output never lingers on screen.
  const updateExpression = (updater: (prev: string) => string) => {
    setExpressionRaw(updater);
    setErrorMessage(null);
    setResult("");
    setPreviewResult("");
    setJustEvaluated(false);
  };

  const insertAtCursor = (text: string, caretOffsetFromEnd = 0) => {
    const input = inputRef.current;
    const start = input?.selectionStart ?? expression.length;
    const end = input?.selectionEnd ?? expression.length;
    updateExpression((prev) => prev.slice(0, start) + text + prev.slice(end));
    requestAnimationFrame(() => {
      if (!input) return;
      const pos = start + text.length + caretOffsetFromEnd;
      input.focus();
      input.setSelectionRange(pos, pos);
    });
  };

  // Digits / decimal point: if the user just hit "=", typing a digit
  // starts a brand-new expression instead of gluing onto the old one.
  const insertDigitOrDecimal = (val: string) => {
    if (justEvaluated) {
      setExpressionRaw(val);
      setErrorMessage(null);
      setResult("");
      setPreviewResult("");
      setJustEvaluated(false);
      requestAnimationFrame(() => {
        inputRef.current?.focus();
        inputRef.current?.setSelectionRange(val.length, val.length);
      });
      return;
    }
    insertAtCursor(val);
  };

  // Binary operators: if the user just hit "=", the operator continues
  // from the result ("4" -> "+" => "4+") instead of "2+2+".
  const insertOperator = (op: string) => {
    if (justEvaluated && result && !errorMessage) {
      const next = result + op;
      setExpressionRaw(next);
      setErrorMessage(null);
      setResult("");
      setPreviewResult("");
      setJustEvaluated(false);
      requestAnimationFrame(() => {
        inputRef.current?.focus();
        inputRef.current?.setSelectionRange(next.length, next.length);
      });
      return;
    }
    insertAtCursor(op);
  };

  // Postfix tokens (x², x³, 1/x, !): same "continue from result" logic.
  const insertPostfix = (token: string) => {
    if (justEvaluated && result && !errorMessage) {
      const next = result + token;
      setExpressionRaw(next);
      setErrorMessage(null);
      setResult("");
      setPreviewResult("");
      setJustEvaluated(false);
      requestAnimationFrame(() => {
        inputRef.current?.focus();
        inputRef.current?.setSelectionRange(next.length, next.length);
      });
      return;
    }
    insertAtCursor(token);
  };

  const backspace = () => {
    const input = inputRef.current;
    const start = input?.selectionStart ?? expression.length;
    const end = input?.selectionEnd ?? expression.length;
    if (start !== end) {
      updateExpression((prev) => prev.slice(0, start) + prev.slice(end));
      requestAnimationFrame(() => input?.setSelectionRange(start, start));
    } else if (start > 0) {
      updateExpression((prev) => prev.slice(0, start - 1) + prev.slice(start));
      requestAnimationFrame(() => input?.setSelectionRange(start - 1, start - 1));
    }
  };

  const clearAll = () => updateExpression(() => "");

  // Smart percent: "A + B%" -> A + (A*B/100); "A * B%" -> A * (B/100);
  // a bare trailing number becomes a fraction. Matches Windows/Google
  // calculator conventions rather than mathjs's raw "%" operator.
  const applyPercent = () => {
    updateExpression((prev) => {
      const opMatch = prev.match(/^(.*?)([+\-*/])\s*(\d+(?:\.\d+)?)\s*$/);
      if (opMatch) {
        const [, before, op, num] = opMatch;
        if (op === "+" || op === "-") {
          const base = before.trim() === "" ? num : `(${before})`;
          return `${before}${op}(${base}*${num}/100)`;
        }
        return `${before}${op}(${num}/100)`;
      }
      const trailing = prev.match(/(\d+(?:\.\d+)?)\s*$/);
      if (trailing) {
        return prev.slice(0, prev.length - trailing[0].length) + `(${trailing[1]}/100)`;
      }
      return prev ? `(${prev}/100)` : prev;
    });
  };

  /* ---------------------------------------------------------------- */
  /* Calculation                                                       */
  /* ---------------------------------------------------------------- */

  const balanceParens = (expr: string) => {
    const open = (expr.match(/\(/g) || []).length;
    const close = (expr.match(/\)/g) || []).length;
    return open > close ? expr + ")".repeat(open - close) : expr;
  };

  // Shared by both the live preview and the confirmed "=" calculation,
  // so they can never disagree on how an expression is evaluated.
  const evaluateExpr = async (expr: string): Promise<string> => {
    const math = await getMath();
    const { evaluate } = math;

    const normalized = balanceParens(expr)
      .replace(/(\d+)!/g, (_, n) => `factorial(${n})`)
      .replace(/\b0+(\d+)/g, "$1")
      .replace(/\bpi\b/g, `(${math.pi})`)
      .replace(/\be\b/g, `(${math.e})`);

    const res = evaluate(normalized);

    if (typeof res === "number") {
      if (Number.isNaN(res)) throw new Error("Result is undefined");
      if (!Number.isFinite(res)) throw new Error("Cannot divide by zero");
    }
    if (res === undefined || typeof res === "function") {
      throw new Error("Incomplete expression");
    }
    return String(res);
  };

  const calculate = async () => {
    if (isCalculating) return;
    if (!expression.trim()) {
      setResult("");
      setPreviewResult("");
      setErrorMessage(null);
      return;
    }

    setIsCalculating(true);
    try {
      const out = await evaluateExpr(expression);
      setResult(out);
      setPreviewResult("");
      setErrorMessage(null);
      setJustEvaluated(true);
      setHistory((prev) => [
        ...prev.slice(-49),
        { id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`, expression, result: out },
      ]);
    } catch (err) {
      const message = err instanceof Error && err.message ? err.message : "Invalid expression";
      setResult("Error");
      setPreviewResult("");
      setErrorMessage(message);
      setJustEvaluated(false);
    } finally {
      setIsCalculating(false);
    }
  };

  // Live calculation while typing: evaluates on a short debounce and
  // silently does nothing on invalid/incomplete expressions (e.g. "5+",
  // "sin(") — no error is shown until the user actually presses Enter/"=".
  useEffect(() => {
    if (!expression.trim() || justEvaluated) {
      setPreviewResult("");
      return;
    }
    let cancelled = false;
    const timer = setTimeout(async () => {
      try {
        const out = await evaluateExpr(expression);
        if (!cancelled) setPreviewResult(out);
      } catch {
        if (!cancelled) setPreviewResult("");
      }
    }, 180);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expression, justEvaluated]);

  /* ---------------------------------------------------------------- */
  /* Memory                                                             */
  /* ---------------------------------------------------------------- */

  const memoryAdd = () => {
    if (liveValue && !Number.isNaN(Number(liveValue))) setMemory((m) => m + Number(liveValue));
  };
  const memorySubtract = () => {
    if (liveValue && !Number.isNaN(Number(liveValue))) setMemory((m) => m - Number(liveValue));
  };
  const memoryRecall = () => insertDigitOrDecimal(String(memory));
  const memoryClear = () => setMemory(0);

  /* ---------------------------------------------------------------- */
  /* Clipboard                                                          */
  /* ---------------------------------------------------------------- */

  const copyValue = async (value: string, field: "expression" | "result") => {
    if (!value) return;
    try {
      if (!navigator.clipboard) throw new Error("Clipboard unavailable");
      await navigator.clipboard.writeText(value);
      setCopiedField(field);
      setToast({ message: `${field === "result" ? "Result" : "Expression"} copied`, tone: "success" });
    } catch {
      setToast({ message: "Copy failed — select and copy manually", tone: "error" });
    }
  };

  const smartCopy = () => {
    const value = result && !errorMessage ? result : previewResult;
    if (value) void copyValue(value, "result");
    else void copyValue(expression, "expression");
  };

  /* ---------------------------------------------------------------- */
  /* History                                                            */
  /* ---------------------------------------------------------------- */

  const reuseHistoryEntry = (entry: HistoryEntry) => {
    setExpressionRaw(entry.expression);
    setResult(entry.result);
    setErrorMessage(null);
    setJustEvaluated(true);
    requestAnimationFrame(() => inputRef.current?.focus());
  };
  const deleteHistoryEntry = (id: string) => setHistory((prev) => prev.filter((h) => h.id !== id));
  const clearHistory = () => setHistory([]);

  /* ---------------------------------------------------------------- */
  /* Global keyboard support (works even when the input isn't focused) */
  /* ---------------------------------------------------------------- */

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const inputFocused = document.activeElement === inputRef.current;

      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "l") {
        e.preventDefault();
        clearAll();
        return;
      }
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "c" && !inputFocused) {
        e.preventDefault();
        smartCopy();
        return;
      }

      // When the text input has focus, let native typing handle itself
      // (onChange already keeps state in sync) — only global shortcuts
      // above need to be intercepted.
      if (inputFocused) return;

      if (e.key >= "0" && e.key <= "9") {
        insertDigitOrDecimal(e.key);
        return;
      }
      if (e.key === ".") {
        insertDigitOrDecimal(".");
        return;
      }
      if (["+", "-", "*", "/"].includes(e.key)) {
        insertOperator(e.key);
        return;
      }
      if (e.key === "^") {
        insertOperator("^");
        return;
      }
      if (e.key === "%") {
        applyPercent();
        return;
      }
      if (e.key === "(" || e.key === ")") {
        insertAtCursor(e.key);
        return;
      }
      if (e.key === "Enter" || e.key === "=") {
        e.preventDefault();
        void calculate();
        return;
      }
      if (e.key === "Backspace" || e.key === "Delete") {
        backspace();
        return;
      }
      if (e.key === "Escape") {
        clearAll();
        return;
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expression, result, errorMessage, justEvaluated, memory, isCalculating]);

  /* ---------------------------------------------------------------- */
  /* Render                                                             */
  /* ---------------------------------------------------------------- */

  const confirmedValue = result && !errorMessage ? result : "";
  const liveValue = confirmedValue || previewResult;
  const isPreview = !confirmedValue && !!previewResult;
  const displayResult = result === "Error" ? "Error" : liveValue || "--";
  const displayExpression = expression || "0";

  return (
    <div className={`mx-auto w-full px-3 py-3 sm:px-4 sm:py-4 md:px-5 md:py-5 lg:px-6 lg:py-6 ${themeClass}`}>
      <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <div className="space-y-4">
          <ShellCard>
            <SectionHeader
              icon={Calculator}
              title="Calculator"
              subtitle="Type on your keyboard or tap the keys — both stay in sync."
            />
            <div className="space-y-4 p-3 sm:p-4 md:p-5">
              {toast && (
                <div
                  role="status"
                  className={`rounded-xl border px-3 py-2 text-xs font-medium ${
                    toast.tone === "error"
                      ? "border-red-400/30 bg-red-500/10 text-red-200"
                      : "border-emerald-400/30 bg-emerald-500/10 text-emerald-200"
                  }`}
                >
                  {toast.message}
                </div>
              )}

              <div className="grid gap-3">
                <DisplayLine
                  label="Expression"
                  value={displayExpression}
                  onCopy={() => copyValue(expression, "expression")}
                  copied={copiedField === "expression"}
                />
                <DisplayLine
                  label="Result"
                  value={displayResult}
                  muted={displayResult === "--"}
                  preview={isPreview && result !== "Error"}
                  onCopy={() => copyValue(liveValue, "result")}
                  copied={copiedField === "result"}
                  live
                />
                {errorMessage && (
                  <p role="alert" className="px-1 text-xs text-red-300">
                    {errorMessage}
                  </p>
                )}
              </div>

              <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
                <input
                  ref={inputRef}
                  value={expression}
                  onChange={(e) => {
                    const val = e.target.value;
                    setExpressionRaw(val);
                    setErrorMessage(null);
                    setResult("");
                    setPreviewResult("");
                    setJustEvaluated(false);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      void calculate();
                    }
                    if (e.key === "Escape") clearAll();
                  }}
                  inputMode="text"
                  aria-label="Calculator expression"
                  placeholder="Enter expression"
                  className="h-12 w-full rounded-2xl border border-white/10 bg-black/10 px-4 text-sm text-white outline-none placeholder:text-white/30 focus:border-blue-400/35 focus:bg-black/15"
                />
                <div className="flex gap-2">
                  <KeyButton onClick={smartCopy} className="px-4" aria-label="Copy result or expression">
                    <Copy className="h-4 w-4" />
                    {copiedField ? "Copied" : "Copy"}
                  </KeyButton>
                  <KeyButton onClick={clearAll} className="px-4" aria-label="Clear expression and result">
                    <RotateCcw className="h-4 w-4" />
                    Clear
                  </KeyButton>
                </div>
              </div>

              {/* Control row */}
              <div className="grid gap-3 sm:grid-cols-4">
                <KeyButton onClick={backspace} aria-label="Backspace" variant="danger">
                  <Delete className="h-4 w-4" />
                </KeyButton>
                <KeyButton onClick={() => (liveValue ? insertAtCursor(liveValue) : undefined)} aria-label="Insert previous answer">
                  ANS
                </KeyButton>
                <KeyButton onClick={applyPercent} aria-label="Percent">
                  <Percent className="h-4 w-4" />
                </KeyButton>
                <KeyButton
                  onClick={() => void calculate()}
                  className="bg-gradient-to-r from-blue-500 to-violet-500 hover:from-blue-400 hover:to-violet-400"
                  aria-label="Equals"
                >
                  <Equal className="h-4 w-4" />
                </KeyButton>
              </div>

              {/* Number pad */}
              <div className="grid gap-2 sm:grid-cols-3">
                {["7", "8", "9", "4", "5", "6", "1", "2", "3"].map((btn) => (
                  <KeyButton key={btn} onClick={() => insertDigitOrDecimal(btn)} className="text-base">
                    {btn}
                  </KeyButton>
                ))}
              </div>

              <div className="grid gap-2 sm:grid-cols-3">
                <KeyButton onClick={() => insertDigitOrDecimal("0")} className="text-base">
                  0
                </KeyButton>
                <KeyButton onClick={() => insertDigitOrDecimal(".")} className="text-base">
                  .
                </KeyButton>
                <KeyButton
                  onClick={() => void calculate()}
                  className="bg-gradient-to-r from-violet-500 to-blue-500 text-base hover:from-violet-400 hover:to-blue-400"
                >
                  =
                </KeyButton>
              </div>

              {/* Basic operators */}
              <div className="grid gap-2 sm:grid-cols-4">
                {["/", "*", "-", "+"].map((op) => (
                  <KeyButton key={op} onClick={() => insertOperator(op)} className="text-lg">
                    {op}
                  </KeyButton>
                ))}
              </div>

              {/* Algebraic operators */}
              <div className="grid gap-2 sm:grid-cols-4">
                <KeyButton onClick={() => insertPostfix("^2")} className="text-sm">x²</KeyButton>
                <KeyButton onClick={() => insertPostfix("^3")} className="text-sm">x³</KeyButton>
                <KeyButton onClick={() => insertOperator("^")} className="text-sm">^</KeyButton>
                <KeyButton onClick={() => insertPostfix("^-1")} className="text-sm">1/x</KeyButton>
                <KeyButton onClick={() => insertPostfix("!")} className="text-sm">x!</KeyButton>
                <KeyButton onClick={() => insertAtCursor(" mod ")} className="text-sm">mod</KeyButton>
                <KeyButton onClick={() => insertAtCursor("(")} className="text-sm">(</KeyButton>
                <KeyButton onClick={() => insertAtCursor(")")} className="text-sm">)</KeyButton>
              </div>

              {/* Functions — auto-close parens, cursor placed inside */}
              <div className="grid gap-2 sm:grid-cols-4 xl:grid-cols-4">
                {FUNCTION_TOKENS.map((fn) => (
                  <KeyButton
                    key={fn}
                    onClick={() => insertAtCursor(`${fn}()`, -1)}
                    className="justify-start text-sm"
                  >
                    {fn}(
                  </KeyButton>
                ))}
                <KeyButton onClick={() => insertDigitOrDecimal("pi")} className="justify-start text-sm">
                  π
                </KeyButton>
                <KeyButton onClick={() => insertDigitOrDecimal("e")} className="justify-start text-sm">
                  e
                </KeyButton>
              </div>

              {/* Memory */}
              <div className="grid gap-2 sm:grid-cols-4">
                <KeyButton onClick={memoryAdd}>M+</KeyButton>
                <KeyButton onClick={memorySubtract}>M-</KeyButton>
                <KeyButton onClick={memoryRecall}>MR</KeyButton>
                <KeyButton onClick={memoryClear}>MC</KeyButton>
              </div>

              <p className="px-1 text-[11px] text-white/35">
                Live preview updates as you type — press Enter or "=" to confirm and save to history.
                Keyboard: digits/operators type directly · Backspace = delete · Esc / Ctrl+L = clear ·
                Ctrl+C = copy result
              </p>
            </div>
          </ShellCard>
        </div>

        <div className="space-y-4">
          <ShellCard>
            <SectionHeader
              icon={History}
              title="History"
              subtitle="Reuse, copy, or delete any past calculation."
              variant="card"
              actions={
                history.length > 0 ? (
                  <KeyButton onClick={clearHistory} className="px-3 py-2 text-xs" aria-label="Clear history">
                    <Trash2 className="mr-1.5 h-3.5 w-3.5" />
                    Clear
                  </KeyButton>
                ) : undefined
              }
            />
            <div className="space-y-3 p-3 sm:p-4 md:p-5">
              <div className="max-h-[420px] space-y-2 overflow-y-auto pr-1">
                {history.length > 0 ? (
                  history
                    .slice()
                    .reverse()
                    .map((h) => (
                      <div
                        key={h.id}
                        className="flex items-center justify-between gap-2 rounded-2xl border border-white/10 bg-black/10 px-4 py-3 text-sm text-white/75"
                      >
                        <span className="truncate">
                          {h.expression} = <span className="font-semibold text-white">{h.result}</span>
                        </span>
                        <span className="flex shrink-0 items-center gap-1">
                          <button
                            type="button"
                            onClick={() => reuseHistoryEntry(h)}
                            aria-label="Reuse this calculation"
                            className="inline-flex h-7 w-7 items-center justify-center rounded-lg text-white/40 transition hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/60"
                          >
                            <CornerDownLeft className="h-3.5 w-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => copyValue(h.result, "result")}
                            aria-label="Copy result"
                            className="inline-flex h-7 w-7 items-center justify-center rounded-lg text-white/40 transition hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/60"
                          >
                            <Copy className="h-3.5 w-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => deleteHistoryEntry(h.id)}
                            aria-label="Delete this entry"
                            className="inline-flex h-7 w-7 items-center justify-center rounded-lg text-white/40 transition hover:bg-red-500/10 hover:text-red-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/60"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </span>
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