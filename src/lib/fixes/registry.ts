import type { FileContext, Finding, FixDefinition } from '@/lib/engine/types';

type FixLoader = () => Promise<FixDefinition>;

const FIX_REGISTRY: Record<string, FixLoader> = {
  'strip-metadata': async () => (await import('@/lib/fixes/image')).stripImageMetadataFix,
  'compress-image': async () => (await import('@/lib/fixes/image')).compressImageFix,
  'strip-pdf-metadata': async () => (await import('@/lib/fixes/pdf')).stripPdfMetadataFix,
  'strip-pdf-actions': async () => (await import('@/lib/fixes/pdf')).stripPdfActionsFix,
  'normalize-pdf-pages': async () => (await import('@/lib/fixes/pdf')).normalizePdfPagesFix,
  'strip-ooxml-metadata': async () => (await import('@/lib/fixes/ooxml')).stripOoxmlMetadataFix,
  'strip-ooxml-executable-embeds': async () => (await import('@/lib/fixes/ooxml')).stripOoxmlExecutableEmbedsFix,
  'redact-text-secrets': async () => (await import('@/lib/fixes/text')).redactTextSecretsFix,
  'normalize-text': async () => (await import('@/lib/fixes/text')).normalizeTextFix,
};

/**
 * Fix-All runs safe, deterministic operations in this fixed order so the
 * result never depends on which findings happened to fire first:
 *   1. Metadata/property stripping (privacy) — cheapest, least likely to
 *      interact with anything else.
 *   2. Security fixes (PDF actions/JS) — before quality/rotation, in case a
 *      malformed action dictionary would otherwise confuse later saves.
 *   3. Quality/normalization (page rotation).
 *   4. Sensitive-data redaction — last, since it rewrites content and
 *      should act on the already-cleaned file.
 * Only fixIds actually present among the current findings run — nothing
 * is applied speculatively.
 */
const FIX_ORDER = [
  'strip-metadata',
  'strip-pdf-metadata',
  'strip-ooxml-metadata',
  'strip-pdf-actions',
  'strip-ooxml-executable-embeds',
  'normalize-pdf-pages',
  'compress-image',
  'redact-text-secrets',
  'normalize-text',
];

export async function runFix(fixId: string, ctx: FileContext, findings: Finding[]): Promise<{ file: File; note: string }> {
  const loader = FIX_REGISTRY[fixId];
  if (!loader) throw new Error(`No fix registered for "${fixId}"`);
  const fix = await loader();
  return fix.run(ctx, findings);
}

export function hasFix(fixId: string | undefined): fixId is string {
  return !!fixId && fixId in FIX_REGISTRY;
}

export interface FixAllStep {
  fixId: string;
  label: string;
  note: string;
}

export interface FixAllResult {
  file: File;
  steps: FixAllStep[];
}

/**
 * Applies every distinct, registered fixId found among the current
 * findings, once each, in `FIX_ORDER`, threading the output of each step
 * into the next (so e.g. metadata stripping happens on the file that PDF
 * actions get removed from next, not on three independent copies of the
 * original). Returns the final file plus a per-step log for the
 * before/after UI. Findings with no registered fix (e.g. macros, which
 * this product deliberately never auto-removes) are simply not included —
 * they stay as warnings for the user to review themselves.
 */
export async function runAllFixes(ctx: FileContext, findings: Finding[]): Promise<FixAllResult> {
  const presentFixIds = new Set(findings.map((f) => f.fixId).filter((id): id is string => hasFix(id)));
  const orderedIds = [...FIX_ORDER.filter((id) => presentFixIds.has(id)), ...[...presentFixIds].filter((id) => !FIX_ORDER.includes(id))];

  let currentFile = ctx.detected.file;
  let currentBuffer = ctx.arrayBuffer;
  const steps: FixAllStep[] = [];

  for (const fixId of orderedIds) {
    const loader = FIX_REGISTRY[fixId];
    if (!loader) {
      // Shouldn't happen — orderedIds is built entirely from IDs that
      // hasFix() already confirmed are registered — but this is the one
      // path that rewrites the user's file, so it fails soft (skip +
      // record why) rather than trusting that invariant blindly.
      steps.push({ fixId, label: fixId, note: 'No fix implementation was found registered for this ID — skipped.' });
      continue;
    }
    const fix = await loader();
    const stepCtx: FileContext = {
      ...ctx,
      arrayBuffer: currentBuffer,
      detected: { ...ctx.detected, file: currentFile },
    };
    try {
      const { file, note } = await fix.run(stepCtx, findings);
      currentFile = file;
      currentBuffer = await file.arrayBuffer();
      steps.push({ fixId, label: fix.label, note });
    } catch (err) {
      steps.push({
        fixId,
        label: fix.label,
        note: `Could not apply this fix (${err instanceof Error ? err.message : 'unknown error'}) — earlier fixes in this run are unaffected.`,
      });
    }
  }

  return { file: currentFile, steps };
}
