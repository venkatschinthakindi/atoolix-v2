"use client";

import { useMemo, useRef } from "react";
import { FileUp } from "lucide-react";
import CustomSelect from "@/components/ui/customSelect";
import dynamic from "next/dynamic";
const TiptapEditor = dynamic(
  () => import("@/components/ui/mergePdf/ui/tiptapEditor").then((m) => m.default),
  {
    ssr: false
  }
);

type MergeMode =
  | "none"
  | "text-overlay"
  | "text-separate-page"
  | "file-overlay"
  | "file-separate-page";

type MergeOptionCardProps = {
  title: string;
  icon: any;
  mode: MergeMode;
  onModeChange: (mode: MergeMode) => void;
  html: string;
  onHtmlChange: (html: string) => void;
  file: File | null;
  onFileChange: (file: File | null) => void;
  helper?: string;
  fileHint?: string;
};

export function MergeOptionCard({
  title,
  icon: Icon,
  mode,
  onModeChange,
  html,
  onHtmlChange,
  file,
  onFileChange,
  helper,
  fileHint,
}: MergeOptionCardProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const isHeader = title.toLowerCase().includes("header");

  const options = useMemo<any>(
    () => [
      { label: "None", value: "none" },
      { label: "Text overlay", value: "text-overlay" },
      { label: "Text separate page", value: "text-separate-page" },
      { label: "File overlay", value: "file-overlay" },
      { label: "File separate page", value: "file-separate-page" },
    ],
    []
  );

  const isTextMode = mode === "text-overlay" || mode === "text-separate-page";
  const isFileMode = mode === "file-overlay" || mode === "file-separate-page";

  const handleFilePick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = e.target.files?.[0] ?? null;
    onFileChange(next);
  };

  return (
    <div className="space-y-3 rounded-2xl bg-white/[0.03] p-3 sm:p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-white/10">
            <Icon className="h-4 w-4 text-blue-300" />
          </span>
          <div>
            <h3 className="text-sm font-semibold text-white">{title}</h3>
            <p className="text-[11px] leading-4 text-white/55">
              {helper || "Configure output behavior."}
            </p>
          </div>
        </div>
      </div>

      <CustomSelect
        label="Mode"
        value={mode}
        callBackTrigger={onModeChange}
        options={options}
        placeholder="Select mode"
      />

      {isTextMode && (
        <div className="space-y-2">
          <TiptapEditor
            html={html}
            onHtmlChange={onHtmlChange}
          />
        </div>
      )}

      {isFileMode && (
        <div className="space-y-2">
          <input
            ref={inputRef}
            type="file"
            accept=".pdf"
            onChange={handleFilePick}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-white/15 bg-white/5 px-4 py-3 text-sm text-white/80 transition hover:border-blue-400/30 hover:bg-white/10"
          >
            <FileUp className="h-4 w-4 text-blue-300" />
            {file ? file.name : `Choose ${isHeader ? "header" : "footer"} PDF`}
          </button>
          <p className="text-[11px] leading-4 text-white/50">
            {fileHint || "Uploaded file stays local and is added to the merged PDF."}
          </p>
        </div>
      )}
    </div>
  );
}