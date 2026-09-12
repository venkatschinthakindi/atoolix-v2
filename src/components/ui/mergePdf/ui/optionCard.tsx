"use client";
import CustomSelect from "@/components/ui/customSelect";
import { FieldLabel } from "@/components/ui/fieldLabel";
import type { MergeMode } from "@/types/mergeMode.types";

export function OptionCard({
  title,
  icon: Icon,
  mode,
  onModeChange,
  text,
  onTextChange,
  file,
  onFileChange,
  helper,
  fileHint,
}: {
  title: string;
  icon: any;
  mode: MergeMode;
  onModeChange: (v: MergeMode) => void;
  text: string;
  onTextChange: (v: string) => void;
  file: File | null;
  onFileChange: (v: File | null) => void;
  helper: string;
  fileHint: string;
}) {
  return (
    <div className="rounded-3xl border border-border bg-card p-4 backdrop-blur-md ">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-blue-400/15 bg-white/90">
          <Icon className="h-5 w-5 text-blue-500" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-foreground">{title}</h3>
          <p className="text-xs text-foreground-faint">{helper}</p>
        </div>
      </div>

      <div className="mt-4 space-y-3">
        <FieldLabel>Mode</FieldLabel>
        <CustomSelect value={mode}
          callBackTrigger={(e) => onModeChange(e as MergeMode)}
          options={[
              { value: "none", label: "None" },
              { value: "text", label: "Text" },
              { value: "file", label: "File" },
          ]} />

        {mode === "text" && (
          <>
            <FieldLabel>Text</FieldLabel>
            <input
              value={text}
              onChange={(e) => onTextChange(e.target.value)}
              className="w-full rounded-2xl border border-border bg-popover px-3 py-2.5 text-sm text-foreground outline-none transition placeholder:text-foreground-faint focus:border-blue-400/40 focus:ring-2 focus:ring-blue-400/15"
              aria-label={`${title} text`}
            />
          </>
        )}

        {mode === "file" && (
          <div className="space-y-2">
            <FieldLabel>PDF file</FieldLabel>
            <div className="rounded-2xl border border-dashed border-border bg-card p-3">
              <input
                type="file"
                accept="application/pdf"
                onChange={(e) => onFileChange(e.target.files?.[0] ?? null)}
                className="block w-full text-xs text-foreground-secondary file:mr-4 file:rounded-xl file:border-0 file:bg-surface-raised file:px-3 file:py-2 file:text-foreground file:transition hover:file:bg-surface-raised"
                aria-label={`${title} file`}
              />
              <p className="mt-2 text-xs text-foreground-faint">
                {file ? file.name : fileHint}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}