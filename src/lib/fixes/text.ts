import type { FixDefinition } from '@/lib/engine/types';
import { redactSensitiveData } from '@/lib/analyzers/sensitive-data';

/**
 * Whole-file redaction is only offered for plain-text-ish formats (TXT,
 * CSV, JSON, XML, HTML, Markdown), where the raw text IS the file — there's
 * no risk of corrupting a binary container. Redacting the same categories
 * inside a PDF or DOCX would mean surgically rewriting a content stream or
 * XML run without breaking the surrounding structure, which is real work
 * this pass doesn't attempt (those formats' sensitive-data findings are
 * flagged but not auto-fixable yet — same "warn only" precedent as macros).
 */
export const redactTextSecretsFix: FixDefinition = {
  id: 'redact-text-secrets',
  label: 'Redact detected secrets and personal data',
  async run(ctx) {
    const decoder = new TextDecoder('utf-8', { fatal: false });
    const text = decoder.decode(ctx.arrayBuffer);
    const { redacted, count } = redactSensitiveData(text);

    const encoder = new TextEncoder();
    const bytes = encoder.encode(redacted);
    const cleanName = ctx.detected.file.name.replace(/(\.[^.]+)$/, '-redacted$1');
    const file = new File([bytes as BlobPart], cleanName, { type: ctx.detected.file.type || 'text/plain' });

    return {
      file,
      note: count > 0 ? `Redacted ${count} match(es) of detected secrets/personal data (replaced with █ blocks).` : 'No redactable matches were found on re-scan.',
    };
  },
};

/**
 * Normalizes encoding to UTF-8, trims trailing whitespace per line, and
 * converts line endings to LF. Purely cosmetic/hygiene — never touches the
 * actual visible content of any line, so this is safe to run unconditionally
 * on any text-based file without a specific finding driving it.
 */
export const normalizeTextFix: FixDefinition = {
  id: 'normalize-text',
  label: 'Normalize encoding, whitespace, and line endings',
  async run(ctx) {
    const decoder = new TextDecoder('utf-8', { fatal: false });
    let text = decoder.decode(ctx.arrayBuffer);

    const hadCRLF = /\r\n/.test(text);
    text = text.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
    const lines = text.split('\n');
    const hadTrailingWhitespace = lines.some((l) => /[ \t]+$/.test(l));
    text = lines.map((l) => l.replace(/[ \t]+$/, '')).join('\n');

    const encoder = new TextEncoder();
    const bytes = encoder.encode(text);
    const cleanName = ctx.detected.file.name.replace(/(\.[^.]+)$/, '-normalized$1');
    const file = new File([bytes as BlobPart], cleanName, { type: ctx.detected.file.type || 'text/plain' });

    const changes = [hadCRLF && 'line endings to LF', hadTrailingWhitespace && 'trailing whitespace'].filter(Boolean);
    return {
      file,
      note: changes.length > 0 ? `Normalized: ${changes.join(', ')}. Re-encoded as UTF-8.` : 'File was already normalized (UTF-8, LF line endings, no trailing whitespace).',
    };
  },
};
