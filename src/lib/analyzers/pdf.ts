import type { Analyzer, Finding } from '@/lib/engine/types';
import { analyzePdfSearchableText } from '@/lib/analyzers/pdf-text';
import { scanTextForSensitiveData } from '@/lib/analyzers/sensitive-data';

export const pdfAnalyzer: Analyzer = {
  id: 'pdf-analysis',
  label: 'PDF Analysis',
  appliesTo: ['pdf'],
  async run(ctx) {
    const started = performance.now();
    const findings: Finding[] = [];
    const facts: Record<string, string> = {};

    const { PDFDocument } = await import('pdf-lib');

    let doc;
    try {
      doc = await PDFDocument.load(ctx.arrayBuffer, { ignoreEncryption: true, updateMetadata: false });
    } catch (err) {
      findings.push({
        id: 'pdf-parse-failed',
        severity: 'critical',
        title: 'PDF structure could not be parsed',
        description: 'This file could not be opened as a valid PDF. It may be corrupted, truncated, or not actually a PDF despite its extension.',
        section: 'integrity',
      });
      return {
        analyzerId: this.id,
        label: this.label,
        score: 10,
        findings,
        durationMs: performance.now() - started,
      };
    }

    const isEncrypted = doc.isEncrypted;
    facts['Pages'] = String(doc.getPageCount());
    facts['Encrypted'] = isEncrypted ? 'Yes' : 'No';

    try {
      const header = new TextDecoder('ascii').decode(ctx.arrayBuffer.slice(0, 16));
      const versionMatch = header.match(/%PDF-(\d\.\d)/);
      if (versionMatch) facts['PDF Version'] = versionMatch[1]!;
    } catch {
      // Non-fatal — version is a nice-to-have fact.
    }
    try {
      const tailBytes = ctx.arrayBuffer.slice(Math.max(0, ctx.arrayBuffer.byteLength - 32));
      const tail = new TextDecoder('ascii', { fatal: false }).decode(tailBytes);
      if (!tail.includes('%%EOF')) {
        findings.push({
          id: 'pdf-missing-eof',
          severity: 'warning',
          title: 'Missing end-of-file marker',
          description: 'This PDF doesn\u2019t end with the standard "%%EOF" marker. The file opened anyway, but this is a common sign of truncation during a download or incomplete save — worth re-downloading or re-saving from the source if anything looks cut off.',
          section: 'integrity',
        });
      }
    } catch {
      // Non-fatal — this is a supplementary signal, not the primary parse check.
    }

    try {
      const raw = new TextDecoder('latin1').decode(ctx.arrayBuffer);
      const sizeMatch = raw.match(/\/Size\s+(\d+)/);
      const objMatches = raw.match(/\d+\s+0\s+obj\b/g);
      if (sizeMatch && objMatches) {
        const declaredSize = parseInt(sizeMatch[1]!, 10);
        const actualObjCount = objMatches.length;
        // Object streams (common in PDF 1.5+) mean many objects never appear
        // as "N 0 obj" at all, so only flag a LARGE shortfall, not any diff.
        if (declaredSize > 0 && actualObjCount < declaredSize * 0.5) {
          findings.push({
            id: 'pdf-object-count-mismatch',
            severity: 'info',
            title: 'Object count lower than expected',
            description: `The file's cross-reference table declares ${declaredSize} objects, but only ${actualObjCount} object declarations were found in the file. This can indicate a truncated file, or simply that this PDF uses compressed object streams (normal in modern PDFs) — not a definitive corruption verdict on its own.`,
            section: 'integrity',
          });
        }
      }
    } catch {
      // Non-fatal — same approximate-signal caveat as above.
    }

    if (isEncrypted) {
      findings.push({
        id: 'pdf-encrypted',
        severity: 'info',
        title: 'Password-protected or encrypted',
        description: 'This PDF has encryption or a password applied. That is good for confidentiality, but confirm the recipient has the password.',
        section: 'security',
      });
    }

    const title = doc.getTitle();
    const author = doc.getAuthor();
    const producer = doc.getProducer();
    const creator = doc.getCreator();
    const subject = doc.getSubject();
    const keywords = doc.getKeywords();
    const creationDate = doc.getCreationDate();
    const modDate = doc.getModificationDate();

    if (author) {
      facts['Author'] = author;
      findings.push({
        id: 'pdf-author-metadata',
        severity: 'warning',
        title: 'Author name embedded in document metadata',
        description: `The document properties list "${author}" as the author. This is visible to anyone who checks file properties.`,
        section: 'privacy',
        fixId: 'strip-pdf-metadata',
      });
    }
    if (producer) facts['Producer'] = producer;
    if (creator) facts['Created With'] = creator;
    if (title) facts['Title'] = title;
    if (subject) facts['Subject'] = subject;
    if (keywords) {
      findings.push({
        id: 'pdf-keywords',
        severity: 'info',
        title: 'Keywords metadata present',
        description: 'Custom keyword metadata is embedded and may be indexed by document management systems.',
        section: 'privacy',
        fixId: 'strip-pdf-metadata',
      });
    }
    if (creationDate) facts['Created'] = creationDate.toLocaleString();
    if (modDate) facts['Modified'] = modDate.toLocaleString();

    // Page geometry checks (rotation / mixed sizes)
    const pages = doc.getPages();
    const sizes = new Set<string>();
    let rotatedCount = 0;
    for (const page of pages) {
      const { width, height } = page.getSize();
      sizes.add(`${Math.round(width)}x${Math.round(height)}`);
      if (page.getRotation().angle !== 0) rotatedCount++;
    }

    if (sizes.size > 1) {
      findings.push({
        id: 'pdf-mixed-page-sizes',
        severity: 'warning',
        title: 'Mixed page sizes',
        description: `This document contains ${sizes.size} different page dimensions, which can cause awkward margins when printed.`,
        section: 'quality',
      });
    }

    if (rotatedCount > 0) {
      findings.push({
        id: 'pdf-rotated-pages',
        severity: 'warning',
        title: `${rotatedCount} page${rotatedCount > 1 ? 's' : ''} rotated`,
        description: 'Some pages have a non-zero rotation applied, which can display sideways in certain viewers.',
        section: 'quality',
        fixId: 'normalize-pdf-pages',
      });
    }

    if (doc.getPageCount() === 0) {
      findings.push({
        id: 'pdf-no-pages',
        severity: 'critical',
        title: 'Document has no pages',
        description: 'This PDF does not contain any pages.',
        section: 'integrity',
      });
    }

    const preview = bufferToLatin1Preview(ctx.arrayBuffer);

    const hasJavaScript = /\/JavaScript|\/JS\b/.test(preview);
    if (hasJavaScript) {
      findings.push({
        id: 'pdf-embedded-js',
        severity: 'critical',
        title: 'Embedded JavaScript detected',
        description: 'This PDF contains embedded JavaScript, which some viewers execute automatically. Only trust this if you know the source.',
        section: 'security',
        fixId: 'strip-pdf-actions',
      });
    }

    const hasLaunchAction = /\/Launch\b/.test(preview);
    if (hasLaunchAction) {
      findings.push({
        id: 'pdf-launch-action',
        severity: 'critical',
        title: 'Launch action detected',
        description: 'This PDF is configured to launch an external application or file when opened — a technique sometimes used to deliver malware. Only trust this if you know the source.',
        section: 'security',
        fixId: 'strip-pdf-actions',
      });
    }

    const hasAutoOpenAction = /\/OpenAction\b/.test(preview) || /\/AA\b/.test(preview);
    if (hasAutoOpenAction && !hasLaunchAction) {
      findings.push({
        id: 'pdf-auto-open-action',
        severity: 'warning',
        title: 'Document runs an action automatically on open',
        description: 'This PDF has an action configured to run as soon as it\u2019s opened (for example, jumping to a page or running a script). This is common in interactive forms, but worth confirming if the source is unfamiliar.',
        section: 'security',
        fixId: 'strip-pdf-actions',
      });
    }

    const hasEmbeddedFiles = /\/EmbeddedFile/.test(preview);
    if (hasEmbeddedFiles) {
      findings.push({
        id: 'pdf-embedded-files',
        severity: 'warning',
        title: 'Embedded file attachments',
        description: 'This PDF has other files attached inside it. Review them before sharing, since they travel with the document invisibly.',
        section: 'security',
        fixId: 'strip-pdf-actions',
      });
    }
    try {
      const { findings: textFindings, facts: textFacts, extractedText } = await analyzePdfSearchableText(
        ctx.arrayBuffer,
        doc.getPageCount()
      );
      findings.push(...textFindings);
      Object.assign(facts, textFacts);
      if (extractedText.trim()) {
        findings.push(...scanTextForSensitiveData(extractedText));
      }
    } catch (err) {
      console.error('[pdf-analysis] text analysis failed:', err);
      findings.push({
        id: 'pdf-text-analysis-failed',
        severity: 'info',
        title: 'Could not fully analyze page content',
        description: 'Searchable-text detection and text scanning could not complete for this PDF, but the document-level checks above are unaffected.',
        section: 'integrity',
      });
    }

    const score = 100 - findings.reduce((acc, f) => acc + (f.severity === 'critical' ? 30 : f.severity === 'warning' ? 10 : 2), 0);

    return {
      analyzerId: this.id,
      label: this.label,
      score: Math.max(0, Math.min(100, score)),
      findings,
      facts,
      durationMs: performance.now() - started,
    };
  },
};

function bufferToLatin1Preview(buffer: ArrayBuffer, maxBytes = 5_000_000): string {
  const bytes = new Uint8Array(buffer, 0, Math.min(buffer.byteLength, maxBytes));
  let out = '';
  const chunkSize = 8192;
  for (let i = 0; i < bytes.length; i += chunkSize) {
    out += String.fromCharCode(...bytes.subarray(i, i + chunkSize));
  }
  return out;
}
