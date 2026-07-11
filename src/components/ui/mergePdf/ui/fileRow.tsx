"use client";
import { FieldLabel } from "@/components/ui/fieldLabel";
import { ArrowDown, ArrowUp, FileText, X } from "lucide-react";

export function FileRow({
  item,
  index,
  total,
  onMove,
  onChange,
  onRemove,
}: {
  item: FileItem;
  index: number;
  total: number;
  onMove: (id: string, direction: -1 | 1) => void;
  onChange: (id: string, input: string) => void;
  onRemove: (id: string) => void;
}) {
  const fullpreview = getSelectedPagesPreview(item.input, item.totalPages ?? 0);
  const displayPreview = fullpreview.length > 60
    ? `${fullpreview.slice(0, 60)}...more`
    : fullpreview;
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur-md transition hover:border-blue-400/25 hover:bg-white/[0.07]">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-blue-400/15 bg-white/90 ">
              <FileText className="h-4 w-4 text-blue-500" />
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-white">
                {item.file.name}
              </p>
              <p className="text-xs text-white/50">
                {item.totalPages ? `${item.totalPages} pages` : "Reading pages..."}
              </p>
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => onMove(item.id, -1)}
            disabled={index === 0}
            className="flex items-center gap-1 rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ArrowUp className="h-3.5 w-3.5" />
            Up
          </button>
          <button
            type="button"
            onClick={() => onMove(item.id, 1)}
            disabled={index === total - 1}
            className="flex items-center gap-1 rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ArrowDown className="h-3.5 w-3.5" />
            Down
          </button>
          <button
            type="button"
            onClick={() => onRemove(item.id)}
            className="flex items-center gap-1 rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white transition hover:bg-red-500/10 hover:text-red-200"
          >
            <X className="h-3.5 w-3.5" />
            Remove
          </button>
        </div>
      </div>

      <div className="mt-4 space-y-2">
        <FieldLabel>Pages</FieldLabel>
        <input
          className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-3 py-2.5 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-blue-400/40 focus:ring-2 focus:ring-blue-400/15"
          value={item.input}
          placeholder="first-3, 9-13, 19, last-2, all, odd, even"
          onChange={(e) => onChange(item.id, e.target.value)}
          aria-label={`Page selection for ${item.file.name}`}
        />
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-[11px] leading-5 text-white/45">
            Use ranges, single pages, odd/even, first- and last- syntax.
          </p>
          <span
            title={fullpreview}
            className="cursor-help rounded-full border border-blue-400/15 bg-blue-400/10 px-2.5 py-1 text-[11px] text-blue-100"
          >
            {displayPreview}
          </span>
        </div>
      </div>
    </div>
  );
}
function getSelectedPagesPreview(
  input: string,
  total: number
) {
  if (!total) return "Reading pages...";

  const selected = parsePages(input, total);

  const pages = selected
    .map((isSelected, index) =>
      isSelected ? index + 1 : null
    )
    .filter((v): v is number => v !== null);

  if (!pages.length) {
    return "No pages selected";
  }

  if (pages.length === total) {
    return `All pages (${total})`;
  }

  return `Selected: ${pages.join(", ")}`;
  // if (pages.length <= 30) {
    
  // }

  // return `Selected: ${pages.slice(0, 30).join(", ")} ... (+${
  //   pages.length - 30
  // } more)`;
}


export const parsePages = (
  input: string,
  totalPages: number
): boolean[] => {
  const pages = Array(totalPages).fill(false);

  const tokens = (input || "all")
    .toLowerCase()
    .replace(/\s+/g, "")
    .split(",")
    .filter(Boolean);

  const setRange = (
    start: number,
    end: number,
    value: boolean
  ) => {
    const from = Math.max(1, Math.min(start, end));
    const to = Math.min(totalPages, Math.max(start, end));

    for (let page = from; page <= to; page++) {
      pages[page - 1] = value;
    }
  };

  const apply = (token: string, value: boolean) => {
    // all
    if (token === "all") {
      pages.fill(value);
      return;
    }

    // odd
    if (token === "odd") {
      for (let page = 1; page <= totalPages; page += 2) {
        pages[page - 1] = value;
      }
      return;
    }

    // even
    if (token === "even") {
      for (let page = 2; page <= totalPages; page += 2) {
        pages[page - 1] = value;
      }
      return;
    }

    // first-N
    const firstMatch = token.match(/^first-(\d+)$/);
    if (firstMatch) {
      setRange(1, Number(firstMatch[1]), value);
      return;
    }

    // last-N
    const lastMatch = token.match(/^last-(\d+)$/);
    if (lastMatch) {
      const count = Number(lastMatch[1]);
      setRange(totalPages - count + 1, totalPages, value);
      return;
    }

    // range
    const rangeMatch = token.match(/^(\d+)-(\d+)$/);
    if (rangeMatch) {
      setRange(
        Number(rangeMatch[1]),
        Number(rangeMatch[2]),
        value
      );
      return;
    }

    // single page
    const page = Number(token);

    if (
      Number.isInteger(page) &&
      page >= 1 &&
      page <= totalPages
    ) {
      pages[page - 1] = value;
    }
  };

  for (const raw of tokens) {
    const exclude =
      raw.startsWith("except-") ||
      raw.startsWith("!");

    const token = exclude
      ? raw.replace(/^except-/, "").replace(/^!/, "")
      : raw;

    apply(token, !exclude);
  }

  return pages;
};