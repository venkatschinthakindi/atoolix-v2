import type { Analyzer, Finding } from '@/lib/engine/types';
import { extractXmlTagText } from '@/lib/utils/xml';

/**
 * Timeline Analyzer (module 9): surfaces document history — when it was
 * created, last modified, what software touched it, and revision count —
 * as its own section, rather than scattered facts under Summary.
 *
 * Each format branch is independent and defensively wrapped: a failure in
 * one (e.g. a PDF that pdf-lib can't fully parse) degrades to "no timeline
 * data" rather than failing the whole analyzer.
 */
export const timelineAnalyzer: Analyzer = {
  id: 'timeline-analysis',
  label: 'Timeline Analysis',
  appliesTo: ['image', 'pdf', 'document', 'spreadsheet', 'presentation'],
  async run(ctx) {
    const started = performance.now();
    const findings: Finding[] = [];
    const facts: Record<string, string> = {};

    if (ctx.detected.category === 'image') {
      try {
        const exifrModule = await import('exifr');
        const parse = exifrModule.parse ?? (exifrModule as unknown as { default: typeof exifrModule }).default?.parse;
        const exif = parse ? ((await parse(ctx.arrayBuffer, true)) as Record<string, unknown> | null) : null;
        if (exif?.DateTimeOriginal) facts['Captured'] = new Date(exif.DateTimeOriginal as string).toLocaleString();
        if (exif?.ModifyDate) facts['Modified'] = new Date(exif.ModifyDate as string).toLocaleString();
        if (exif?.Software) facts['Software'] = String(exif.Software);
      } catch {
        // No EXIF timeline data — normal for screenshots/re-saved images.
      }
    }

    if (ctx.detected.category === 'pdf') {
      try {
        const { PDFDocument } = await import('pdf-lib');
        const doc = await PDFDocument.load(ctx.arrayBuffer, { ignoreEncryption: true, updateMetadata: false });
        const created = doc.getCreationDate();
        const modified = doc.getModificationDate();
        const creator = doc.getCreator();
        const producer = doc.getProducer();
        if (created) facts['Created'] = created.toLocaleString();
        if (modified) facts['Modified'] = modified.toLocaleString();
        if (creator) facts['Created With'] = creator;
        if (producer) facts['Last Saved With'] = producer;
      } catch {
        // Encrypted or malformed PDFs simply won't yield timeline facts here.
      }
    }

    if (['document', 'spreadsheet', 'presentation'].includes(ctx.detected.category)) {
      try {
        const { unzipSync } = await import('fflate');
        const entries = unzipSync(new Uint8Array(ctx.arrayBuffer));
        const decoder = new TextDecoder('utf-8', { fatal: false });
        const coreXml = entries['docProps/core.xml'] ? decoder.decode(entries['docProps/core.xml']) : null;
        const appXml = entries['docProps/app.xml'] ? decoder.decode(entries['docProps/app.xml']) : null;
        if (coreXml) {
          const created = extractXmlTagText(coreXml, 'dcterms:created') ?? extractXmlTagText(coreXml, 'created');
          const modified = extractXmlTagText(coreXml, 'dcterms:modified') ?? extractXmlTagText(coreXml, 'modified');
          const revision = extractXmlTagText(coreXml, 'cp:revision') ?? extractXmlTagText(coreXml, 'revision');
          if (created) facts['Created'] = new Date(created).toLocaleString();
          if (modified) facts['Modified'] = new Date(modified).toLocaleString();
          if (revision) facts['Revision'] = revision;
        }
        if (appXml) {
          const application = extractXmlTagText(appXml, 'Application');
          if (application) facts['Created With'] = application;
        }
      } catch {
        // Password-protected (OLE2) files never reach here — the OOXML
        // analyzer's precheck already reports that case separately.
      }
    }

    const hasTimelineData = Object.keys(facts).length > 0;
    if (hasTimelineData) {
      const fixId = ctx.detected.category === 'image' ? 'strip-metadata' : ctx.detected.category === 'pdf' ? 'strip-pdf-metadata' : 'strip-ooxml-metadata';
      findings.push({
        id: 'timeline-data-present',
        severity: 'info',
        title: 'Creation/modification history embedded',
        description: 'This file records when it was created and/or last modified, and what software touched it. This travels with the file when shared.',
        section: 'timeline',
        fixId,
      });
    }

    return {
      analyzerId: this.id,
      label: this.label,
      score: 100, // informational module — doesn't independently penalize overall health
      findings,
      facts,
      durationMs: performance.now() - started,
    };
  },
};
