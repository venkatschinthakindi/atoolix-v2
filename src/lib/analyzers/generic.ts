import type { Analyzer, Finding } from '@/lib/engine/types';
import { formatBytes, sha1Hex, md5Hex, crc32Hex, shannonEntropy } from '@/lib/utils/format';

export const genericAnalyzer: Analyzer = {
  id: 'generic-metadata',
  label: 'File Summary',
  appliesTo: ['pdf', 'image', 'text', 'vector', 'spreadsheet', 'document', 'presentation', 'archive', 'audio', 'video', 'unknown'],
  async run(ctx) {
    const started = performance.now();
    const { detected } = ctx;
    const findings: Finding[] = [];

    if (detected.extensionMismatch) {
      findings.push({
        id: 'extension-mismatch',
        severity: 'warning',
        title: 'File extension does not match its contents',
        description: `This file is named ".${detected.extension}" but its actual contents look like a different format. Renaming or re-exporting from the source app usually fixes this.`,
        section: 'integrity',
      });
    }

    if (detected.file.size === 0) {
      findings.push({
        id: 'empty-file',
        severity: 'critical',
        title: 'File is empty',
        description: 'This file contains 0 bytes. It may have failed to save, download, or export correctly.',
        section: 'integrity',
      });
    }

    if (detected.file.size > 100 * 1024 * 1024) {
      findings.push({
        id: 'very-large-file',
        severity: 'info',
        title: 'Large file',
        description: `At ${formatBytes(detected.file.size)}, this file may be slow to email, upload, or open on lower-powered devices.`,
        section: 'size',
      });
    }

    // --- Hashes & entropy (File Identity) ---------------------------------
    const [sha1, md5, crc32] = await Promise.all([
      sha1Hex(ctx.arrayBuffer),
      Promise.resolve(md5Hex(ctx.arrayBuffer)),
      Promise.resolve(crc32Hex(ctx.arrayBuffer)),
    ]);
    const entropy = shannonEntropy(ctx.arrayBuffer);

    // High entropy in a file that's supposed to be plain text is unusual —
    // typical prose/code sits well under 6 bits/byte. Genuinely compressed
    // formats (jpg/zip/mp3/mp4) are expected to run hot, so we don't flag
    // those categories at all to avoid false "encrypted!" alarms.
    if (detected.category === 'text' && entropy > 7.2 && detected.file.size > 256) {
      findings.push({
        id: 'unexpected-high-entropy',
        severity: 'info',
        title: 'Unusually high data randomness for a text file',
        description: `This file's byte distribution (${entropy.toFixed(2)} bits/byte, close to the 8.0 max) looks more like compressed or encrypted data than plain text — worth confirming it opens correctly.`,
        section: 'integrity',
      });
    }

    // --- Binary/Text classification ----------------------------------------
    // Same heuristic git/most `file`-type tools use: a NUL byte anywhere in
    // a leading sample is a reliable, deterministic binary signal — text
    // encodings (including multi-byte UTF-8/16) never legitimately contain
    // a NUL byte in real content.
    const sampleSize = Math.min(ctx.arrayBuffer.byteLength, 8000);
    const sample = new Uint8Array(ctx.arrayBuffer, 0, sampleSize);
    const isBinary = sample.includes(0);

    // --- Character encoding (only meaningful for text-like content) --------
    let encodingLabel: string | null = null;
    if (!isBinary) {
      if (sample.length >= 3 && sample[0] === 0xef && sample[1] === 0xbb && sample[2] === 0xbf) {
        encodingLabel = 'UTF-8 (with BOM)';
      } else if (sample.length >= 2 && sample[0] === 0xff && sample[1] === 0xfe) {
        encodingLabel = 'UTF-16 LE (with BOM)';
      } else if (sample.length >= 2 && sample[0] === 0xfe && sample[1] === 0xff) {
        encodingLabel = 'UTF-16 BE (with BOM)';
      } else {
        try {
          new TextDecoder('utf-8', { fatal: true }).decode(sample);
          encodingLabel = 'UTF-8 (no BOM)';
        } catch {
          encodingLabel = 'Not valid UTF-8 (legacy 8-bit encoding, e.g. Latin-1/Windows-1252)';
        }
      }
    }

    return {
      analyzerId: this.id,
      label: this.label,
      score: findings.length === 0 ? 100 : Math.max(60, 100 - findings.length * 10),
      findings,
      facts: {
        Name: detected.file.name,
        Extension: `.${detected.extension}`,
        'Declared MIME Type': detected.mimeType,
        ...(detected.detectedMimeType ? { 'Real File Type (from content)': detected.detectedMimeType } : {}),
        'Binary / Text': isBinary ? 'Binary' : 'Text',
        ...(encodingLabel ? { 'Character Encoding': encodingLabel } : {}),
        Size: formatBytes(detected.file.size),
        Modified: detected.file.lastModified ? new Date(detected.file.lastModified).toLocaleString() : 'Unknown',
        'SHA-256': `${ctx.hash.slice(0, 20)}…`,
        'SHA-1': sha1,
        MD5: md5,
        CRC32: crc32,
        Entropy: `${entropy.toFixed(2)} bits/byte`,
      },
      durationMs: performance.now() - started,
    };
  },
};
