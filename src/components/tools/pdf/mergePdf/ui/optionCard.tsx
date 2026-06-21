import { FieldLabel } from "@/components/ui/fieldLabel";

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
    <div className="rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur-md ">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-blue-400/15 bg-white/90">
          <Icon className="h-5 w-5 text-blue-500" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-white">{title}</h3>
          <p className="text-xs text-white/50">{helper}</p>
        </div>
      </div>

      <div className="mt-4 space-y-3">
        <FieldLabel>Mode</FieldLabel>
        <select
          value={mode}
          onChange={(e) => onModeChange(e.target.value as MergeMode)}
          className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-3 py-2.5 text-sm text-white outline-none transition focus:border-blue-400/40 focus:ring-2 focus:ring-blue-400/15"
          aria-label={`${title} mode`}
        >
          <option value="none">None</option>
          <option value="text">Text</option>
          <option value="file">File</option>
        </select>

        {mode === "text" && (
          <>
            <FieldLabel>Text</FieldLabel>
            <input
              value={text}
              onChange={(e) => onTextChange(e.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-3 py-2.5 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-blue-400/40 focus:ring-2 focus:ring-blue-400/15"
              aria-label={`${title} text`}
            />
          </>
        )}

        {mode === "file" && (
          <div className="space-y-2">
            <FieldLabel>PDF file</FieldLabel>
            <div className="rounded-2xl border border-dashed border-white/10 bg-white/[0.03] p-3">
              <input
                type="file"
                accept="application/pdf"
                onChange={(e) => onFileChange(e.target.files?.[0] ?? null)}
                className="block w-full text-xs text-white/70 file:mr-4 file:rounded-xl file:border-0 file:bg-white/10 file:px-3 file:py-2 file:text-white file:transition hover:file:bg-white/15"
                aria-label={`${title} file`}
              />
              <p className="mt-2 text-xs text-white/50">
                {file ? file.name : fileHint}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}