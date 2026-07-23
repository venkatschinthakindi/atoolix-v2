import { detectFile } from '@/lib/engine/detector';
import { getAnalyzersFor } from '@/lib/engine/registry';
import { sha256Hex } from '@/lib/utils/format';
import { SEVERITY_WEIGHT, type AnalyzerResult, type FileContext, type FullReport } from '@/lib/engine/types';

export interface RunOptions {
  onProgress?: (stage: string) => void;
}

export async function runFileCheckup(file: File, opts: RunOptions = {}): Promise<FullReport> {
  opts.onProgress?.('Reading file');
  const detected = await detectFile(file);

  opts.onProgress?.('Hashing contents');
  const arrayBuffer = await file.arrayBuffer();
  const hash = await sha256Hex(arrayBuffer);

  const ctx: FileContext = { detected, arrayBuffer, hash };

  opts.onProgress?.('Selecting analyzers');
  const loaders = getAnalyzersFor(detected.category);

  const results: AnalyzerResult[] = [];
  for (const load of loaders) {
    const analyzer = await load();
    opts.onProgress?.(`Running ${analyzer.label}`);
    const started = performance.now();
    try {
      const result = await analyzer.run(ctx);
      results.push(result);
    } catch (err) {
      results.push({
        analyzerId: analyzer.id,
        label: analyzer.label,
        score: 50,
        durationMs: performance.now() - started,
        findings: [
          {
            id: `${analyzer.id}-error`,
            severity: 'warning',
            title: `${analyzer.label} could not complete`,
            description: err instanceof Error ? err.message : 'Unexpected error during analysis.',
            section: 'integrity',
          },
        ],
      });
    }
  }

  const overallScore = computeOverallScore(results);

  return {
    fileName: file.name,
    fileSize: file.size,
    category: detected.category,
    mimeType: detected.mimeType,
    hash,
    overallScore,
    results,
    generatedAt: new Date().toISOString(),
  };
}

function computeOverallScore(results: AnalyzerResult[]): number {
  let score = 100;
  for (const result of results) {
    for (const finding of result.findings) {
      score -= SEVERITY_WEIGHT[finding.severity];
    }
  }
  return Math.max(0, Math.min(100, Math.round(score)));
}
