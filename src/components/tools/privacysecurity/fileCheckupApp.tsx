'use client';

import { useCallback, useMemo, useRef, useState } from 'react';
import { FileUp, Trash2, Loader2 } from 'lucide-react';
import { FileReportView } from '@/components/report/FileReport';
import { runFileCheckup } from '@/lib/engine/runner';
import { detectFile } from '@/lib/engine/detector';
import { sha256Hex } from '@/lib/utils/format';
import { hasFix, runFix, runAllFixes, type FixAllStep } from '@/lib/fixes/registry';
import type { Finding, FileContext, FullReport } from '@/lib/engine/types';
import { PrivacyDropZone } from '@/components/tools/privacysecurity/PrivacyDropZone';

type Status = 'idle' | 'analyzing' | 'done' | 'error';

export function FileCheckupApp() {
  const [file, setFile] = useState<File | null>(null);
  const [report, setReport] = useState<FullReport | null>(null);
  const [status, setStatus] = useState<Status>('idle');
  const [progress, setProgress] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const [ctx, setCtx] = useState<FileContext | null>(null);
  const [fixingId, setFixingId] = useState<string | null>(null);
  const [fixedIds, setFixedIds] = useState<Set<string>>(new Set());
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [downloadName, setDownloadName] = useState<string | null>(null);
  const objectUrlRef = useRef<string | null>(null);

  // Fix-All + before/after rescan state, kept separate from the single-fix
  // flow above so both can coexist: Fix All is the primary path, individual
  // per-finding fixes remain available for granular control.
  const [fixingAll, setFixingAll] = useState(false);
  const [fixSteps, setFixSteps] = useState<FixAllStep[]>([]);
  const [afterReport, setAfterReport] = useState<FullReport | null>(null);

  const resetTool = useCallback(() => {
    setFile(null);
    setReport(null);
    setStatus('idle');
    setError(null);
    setCtx(null);
    setFixingId(null);
    setFixedIds(new Set());
    if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
    objectUrlRef.current = null;
    setDownloadUrl(null);
    setDownloadName(null);
    setFixingAll(false);
    setFixSteps([]);
    setAfterReport(null);
  }, []);

  const handleFiles = useCallback(async (files: File[]) => {
    const picked = files[0];
    if (!picked) return;
    resetTool();
    setFile(picked);
    setStatus('analyzing');
    setError(null);
    try {
      const result = await runFileCheckup(picked, { onProgress: setProgress });
      setReport(result);

      const detected = await detectFile(picked);
      const arrayBuffer = await picked.arrayBuffer();
      const hash = await sha256Hex(arrayBuffer);
      setCtx({ detected, arrayBuffer, hash });

      setStatus('done');
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'Something went wrong while analyzing this file.');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFix = useCallback(
    async (finding: Finding) => {
      if (!ctx || !finding.fixId || !hasFix(finding.fixId)) return;
      setFixingId(finding.id);
      try {
        const { file: cleanedFile, note } = await runFix(finding.fixId, ctx, report?.results.flatMap((r) => r.findings) ?? []);

        const newDetected = await detectFile(cleanedFile);
        const newBuffer = await cleanedFile.arrayBuffer();
        const newHash = await sha256Hex(newBuffer);
        setCtx({ detected: newDetected, arrayBuffer: newBuffer, hash: newHash });

        if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
        const url = URL.createObjectURL(cleanedFile);
        objectUrlRef.current = url;
        setDownloadUrl(url);
        setDownloadName(cleanedFile.name);

        setFixedIds((prev) => new Set(prev).add(finding.id));
        void note;
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Could not apply that fix.');
      } finally {
        setFixingId(null);
      }
    },
    [ctx, report]
  );

  /**
   * The headline feature: one button, every safe fix applied in order,
   * then an automatic rescan of the result so the person sees a real
   * before/after — not a claim that fixes worked, but a fresh report
   * proving it.
   */
  const handleFixAll = useCallback(async () => {
    if (!ctx || !report) return;
    setFixingAll(true);
    setError(null);
    try {
      const allFindings = report.results.flatMap((r) => r.findings);
      const { file: cleanedFile, steps } = await runAllFixes(ctx, allFindings);
      setFixSteps(steps);

      const newDetected = await detectFile(cleanedFile);
      const newBuffer = await cleanedFile.arrayBuffer();
      const newHash = await sha256Hex(newBuffer);
      const newCtx: FileContext = { detected: newDetected, arrayBuffer: newBuffer, hash: newHash };
      setCtx(newCtx);

      const rescanned = await runFileCheckup(cleanedFile, { onProgress: () => {} });
      setAfterReport(rescanned);

      if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
      const url = URL.createObjectURL(cleanedFile);
      objectUrlRef.current = url;
      setDownloadUrl(url);
      setDownloadName(cleanedFile.name);

      const fixedFindingIds = allFindings.filter((f) => steps.some((s) => s.fixId === f.fixId)).map((f) => f.id);
      setFixedIds((prev) => new Set([...prev, ...fixedFindingIds]));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not run Fix All on this file.');
    } finally {
      setFixingAll(false);
    }
  }, [ctx, report]);

  const dropzoneKey = useMemo(() => (file ? file.name + file.size : 'empty'), [file]);
  const validFileTypes = ".pdf, .docx, .xlsx, .pptx, .jpg, .jpeg, .png, .webp, .gif, .txt, .csv, .json, .xml, .html, and .md";
  return (
    <div className="space-y-5">
      <section className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]">
        <div className="relative p-3 sm:p-4 md:p-5">
          <div className="mb-3 flex flex-col gap-3 sm:mb-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <FileUp className="h-4 w-4 text-blue-300" aria-hidden="true" />
                <h2 className="flex items-center gap-2 text-base font-semibold tracking-tight text-white">
                  Drag & Drop File Checkup
                </h2>
              </div>
              <p className="mt-1 text-xs text-white/60 sm:text-sm">
                Drop any file to get a full privacy, security, and quality report — then fix what needs fixing, in one click.
              </p>
            </div>
            {file && (
              <button
                type="button"
                onClick={resetTool}
                className="flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs font-medium text-white/80 transition hover:border-blue-400/30 hover:bg-white/10 sm:px-4 sm:text-sm"
              >
                <Trash2 className="h-3.5 w-3.5 text-blue-300" aria-hidden="true" />
                Start Over
              </button>
            )}
          </div>

          <PrivacyDropZone key={dropzoneKey} allowMultiple={false} onFiles={handleFiles} validFileTypes={validFileTypes} />
        </div>
      </section>

      {status === 'analyzing' && (
        <section className="flex items-center gap-3 rounded-2xl border border-blue-400/20 bg-blue-400/5 px-4 py-3 text-sm text-blue-100">
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
          {progress || 'Analyzing…'}
        </section>
      )}

      {error && (
        <section role="alert" className="rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
          {error}
        </section>
      )}

      {status === 'done' && report && (
        <FileReportView
          report={report}
          afterReport={afterReport}
          fixSteps={fixSteps}
          onFix={handleFix}
          onFixAll={handleFixAll}
          fixingAll={fixingAll}
          fixingId={fixingId}
          fixedIds={fixedIds}
          downloadUrl={downloadUrl}
          downloadName={downloadName}
        />
      )}
    </div>
  );
}
