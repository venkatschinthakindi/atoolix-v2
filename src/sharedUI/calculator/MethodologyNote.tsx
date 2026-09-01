"use client";

import { useState, type ReactNode } from "react";

interface MethodologyNoteProps {
  /** Main explanation, e.g. <><strong>Compound interest:</strong> Uses ...</> */
  description: ReactNode;
  /** Secondary caveat paragraph shown in dimmer text below the description. */
  caveat: ReactNode;
}

/**
 * Collapsible "How this is calculated" note.
 * Markup extracted verbatim from the duplicated per-calculator
 * MethodologyNote components in the savings calculator family.
 */
export function MethodologyNote({ description, caveat }: MethodologyNoteProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="mb-8 rounded-3xl border border-border bg-card overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="w-full flex items-center justify-between px-5 py-3 text-left hover:bg-surface-raised transition"
      >
        <span className="text-xs font-medium text-foreground-secondary">
          ⓘ How this is calculated
        </span>

        <span className="text-foreground-faint text-sm">{open ? "−" : "+"}</span>
      </button>

      {open && (
        <div className="px-5 pb-4 pt-1 text-xs text-muted-foreground leading-relaxed space-y-2 border-t border-border">
          <p>{description}</p>

          <p className="text-foreground-faint">{caveat}</p>
        </div>
      )}
    </div>
  );
}
