import type { Analyzer, Finding } from '@/lib/engine/types';
import { formatBytes } from '@/lib/utils/format';

const LARGE_FILE_BYTES = 10 * 1024 * 1024;

/**
 * Size Analyzer (module 7): explains what's driving file size using real
 * structural parsing, not a guess:
 *   - JPEG/PNG: walks the actual marker/chunk table to sum metadata
 *     (EXIF/XMP/text chunks) and ICC profile bytes separately from pixel data
 *   - DOCX/XLSX/PPTX: sums ZIP entry sizes by category (media vs XML vs other)
 *   - PDF: total size + a simple bytes-per-page figure (a true per-object
 *     breakdown would need walking the full xref table, which this pass
 *     doesn't attempt — the number given is real, just coarser than the
 *     image/OOXML breakdowns)
 */
export const sizeAnalyzer: Analyzer = {
  id: 'size-analysis',
  label: 'Size Analysis',
  appliesTo: ['image', 'pdf', 'document', 'spreadsheet', 'presentation'],
  async run(ctx) {
    const started = performance.now();
    const findings: Finding[] = [];
    const facts: Record<string, string> = { 'Total Size': formatBytes(ctx.detected.file.size) };

    if (ctx.detected.category === 'image' && (ctx.detected.mimeType === 'image/jpeg' || ctx.detected.mimeType === 'image/png')) {
      const breakdown = breakdownImageBytes(ctx.arrayBuffer, ctx.detected.mimeType);
      if (breakdown) {
        const { metadataBytes, iccBytes, pixelBytes } = breakdown;
        facts['Metadata'] = formatBytes(metadataBytes);
        facts['Color Profile'] = formatBytes(iccBytes);
        facts['Image Data'] = formatBytes(pixelBytes);
        const metaPct = ctx.detected.file.size > 0 ? Math.round(((metadataBytes + iccBytes) / ctx.detected.file.size) * 100) : 0;
        if (metaPct >= 10) {
          findings.push({
            id: 'size-metadata-share',
            severity: metaPct > 25 ? 'warning' : 'info',
            title: `Metadata and color profile account for ~${metaPct}% of file size`,
            description: `${formatBytes(metadataBytes)} of metadata and ${formatBytes(iccBytes)} of ICC profile data, out of ${formatBytes(ctx.detected.file.size)} total.`,
            section: 'size',
            fixId: 'strip-metadata',
          });
        }
      }
    }

    if (['document', 'spreadsheet', 'presentation'].includes(ctx.detected.category)) {
      try {
        const { unzipSync } = await import('fflate');
        const entries = unzipSync(new Uint8Array(ctx.arrayBuffer));
        let mediaBytes = 0;
        let xmlBytes = 0;
        let otherBytes = 0;
        for (const [path, bytes] of Object.entries(entries)) {
          if (/^(word|xl|ppt)\/media\//.test(path)) mediaBytes += bytes.length;
          else if (path.endsWith('.xml') || path.endsWith('.rels')) xmlBytes += bytes.length;
          else otherBytes += bytes.length;
        }
        facts['Embedded Media'] = formatBytes(mediaBytes);
        facts['Document XML'] = formatBytes(xmlBytes);
        if (otherBytes > 0) facts['Other Parts'] = formatBytes(otherBytes);

        const mediaPct = ctx.detected.file.size > 0 ? Math.round((mediaBytes / ctx.detected.file.size) * 100) : 0;
        if (mediaPct >= 60) {
          findings.push({
            id: 'size-media-dominant',
            severity: 'info',
            title: `Embedded images/media make up ~${mediaPct}% of file size`,
            description: 'Compressing embedded images before inserting them is usually the single biggest way to shrink this file.',
            section: 'size',
          });
        }
      } catch {
        // If the OOXML analyzer already reported a container/password-protection
        // issue for this file, this just quietly contributes no breakdown.
      }
    }

    if (ctx.detected.category === 'pdf') {
      try {
        const { PDFDocument } = await import('pdf-lib');
        const doc = await PDFDocument.load(ctx.arrayBuffer, { ignoreEncryption: true, updateMetadata: false });
        const pages = doc.getPageCount();
        if (pages > 0) facts['Average Per Page'] = formatBytes(Math.round(ctx.detected.file.size / pages));
      } catch {
        // Parse failure already reported by the PDF analyzer itself.
      }
    }

    if (ctx.detected.file.size > LARGE_FILE_BYTES) {
      findings.push({
        id: 'size-large-file',
        severity: 'info',
        title: `Large file (${formatBytes(ctx.detected.file.size)})`,
        description: 'This may be slow to upload, email, or open on a mobile connection. See the breakdown above for what to target.',
        section: 'size',
      });
    }

    return {
      analyzerId: this.id,
      label: this.label,
      score: 100, // informational — doesn't independently penalize overall health
      findings,
      facts,
      durationMs: performance.now() - started,
    };
  },
};

function breakdownImageBytes(buffer: ArrayBuffer, mimeType: string): { metadataBytes: number; iccBytes: number; pixelBytes: number } | null {
  const bytes = new Uint8Array(buffer);
  let metadataBytes = 0;
  let iccBytes = 0;

  if (mimeType === 'image/jpeg') {
    let i = 2;
    while (i < bytes.length - 4) {
      if (bytes[i] !== 0xff) break;
      const marker = bytes[i + 1]!;
      if (marker === 0xd8 || marker === 0xd9) {
        i += 2;
        continue;
      }
      if (marker >= 0xd0 && marker <= 0xd7) {
        i += 2;
        continue;
      }
      if (marker === 0xda) break; // start of scan — rest is compressed pixel data
      const length = (bytes[i + 2]! << 8) | bytes[i + 3]!;
      if (marker === 0xe1) metadataBytes += length; // APP1: EXIF/XMP
      if (marker === 0xe2) iccBytes += length; // APP2: ICC profile
      i += 2 + length;
    }
  } else if (mimeType === 'image/png') {
    let i = 8;
    while (i < bytes.length - 8) {
      const length = (bytes[i]! << 24) | (bytes[i + 1]! << 16) | (bytes[i + 2]! << 8) | bytes[i + 3]!;
      const type = String.fromCharCode(bytes[i + 4]!, bytes[i + 5]!, bytes[i + 6]!, bytes[i + 7]!);
      if (['eXIf', 'tEXt', 'iTXt', 'zTXt'].includes(type)) metadataBytes += length;
      if (type === 'iCCP') iccBytes += length;
      if (type === 'IEND') break;
      if (length < 0) break; // guard against malformed chunk length
      i += 8 + length + 4;
    }
  } else {
    return null;
  }

  const pixelBytes = Math.max(0, bytes.length - metadataBytes - iccBytes);
  return { metadataBytes, iccBytes, pixelBytes };
}
