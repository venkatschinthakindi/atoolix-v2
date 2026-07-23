import type { FixDefinition } from '@/lib/engine/types';

export const stripPdfMetadataFix: FixDefinition = {
  id: 'strip-pdf-metadata',
  label: 'Remove document metadata (author, title, keywords, XMP)',
  async run(ctx) {
    const { PDFDocument, PDFName, PDFDict } = await import('pdf-lib');
    const doc = await PDFDocument.load(ctx.arrayBuffer, { ignoreEncryption: true, updateMetadata: false });

    doc.setTitle('');
    doc.setAuthor('');
    doc.setSubject('');
    doc.setKeywords([]);
    doc.setProducer('');
    doc.setCreator('');

    // Also drop the catalog-level XMP metadata stream and the Info-dict
    // CreationDate/ModDate entries, if present — pdf-lib's setTitle/setAuthor/
    // etc. above don't touch dates, and dates are exactly what the Timeline
    // module flags as embedded history.
    let removedXmp = false;
    let removedDates = false;
    try {
      doc.catalog.delete(PDFName.of('Metadata'));
      removedXmp = true;
    } catch {
      // Non-fatal — Info-dictionary fields above are still cleared either way.
    }
    try {
      const infoRef = doc.context.trailerInfo.Info;
      if (infoRef) {
        const infoDict = doc.context.lookup(infoRef, PDFDict);
        if (infoDict) {
          infoDict.delete(PDFName.of('CreationDate'));
          infoDict.delete(PDFName.of('ModDate'));
          removedDates = true;
        }
      }
    } catch {
      // Best-effort — not all PDFs expose a conventional Info dict reference.
    }

    const bytes = await doc.save();
    const cleanName = ctx.detected.file.name.replace(/(\.[^.]+)$/, '-clean$1');
    const file = new File([bytes as BlobPart], cleanName, { type: 'application/pdf' });

    return {
      file,
      note: `Cleared author, title, subject, keywords, and producer metadata${removedXmp ? ', removed the embedded XMP metadata stream' : ''}${removedDates ? ', and removed creation/modification timestamps' : ''}.`,
    };
  },
};

/**
 * Removes document-level auto-run triggers: /OpenAction, /AA (additional
 * actions on the catalog), and the document-level /JavaScript name tree.
 *
 * Honest scope note: this removes triggers reachable from the document
 * catalog, which is where PDFs that auto-run something on open must
 * register it. It does NOT attempt to strip JavaScript embedded inside
 * individual form-field/annotation actions deep in the page tree — walking
 * every annotation's action dictionary safely (without corrupting form
 * functionality some users want to keep) is a larger, riskier change than
 * this pass includes. Each removal step is independently try/caught so a
 * PDF with an unusual structure still gets whatever partial cleanup
 * succeeds, reflected honestly in the returned note rather than assumed.
 */
export const stripPdfActionsFix: FixDefinition = {
  id: 'strip-pdf-actions',
  label: 'Remove JavaScript, launch actions, and auto-open triggers',
  async run(ctx) {
    const { PDFDocument, PDFName, PDFDict } = await import('pdf-lib');
    const doc = await PDFDocument.load(ctx.arrayBuffer, { ignoreEncryption: true, updateMetadata: false });

    const removed: string[] = [];

    try {
      if (doc.catalog.get(PDFName.of('OpenAction'))) {
        doc.catalog.delete(PDFName.of('OpenAction'));
        removed.push('auto-open action');
      }
    } catch {
      /* best-effort */
    }

    try {
      if (doc.catalog.get(PDFName.of('AA'))) {
        doc.catalog.delete(PDFName.of('AA'));
        removed.push('document-level auto-run actions');
      }
    } catch {
      /* best-effort */
    }

    try {
      const namesRef = doc.catalog.get(PDFName.of('Names'));
      if (namesRef) {
        const namesDict = doc.context.lookup(namesRef, PDFDict);
        if (namesDict && namesDict.get(PDFName.of('JavaScript'))) {
          namesDict.delete(PDFName.of('JavaScript'));
          removed.push('document-level JavaScript');
        }
        if (namesDict && namesDict.get(PDFName.of('EmbeddedFiles'))) {
          namesDict.delete(PDFName.of('EmbeddedFiles'));
          removed.push('embedded-file references');
        }
      }
    } catch {
      /* best-effort */
    }

    const bytes = await doc.save();
    const cleanName = ctx.detected.file.name.replace(/(\.[^.]+)$/, '-clean$1');
    const file = new File([bytes as BlobPart], cleanName, { type: 'application/pdf' });

    const note =
      removed.length > 0
        ? `Removed: ${removed.join(', ')}. Note: JavaScript removal targets document-level triggers only (not annotations/form fields), and embedded-file removal drops the reference tree that makes attachments discoverable/openable — the underlying bytes may still be present in the saved file, so don\u2019t rely on this alone if the attachment itself is the sensitive part.`
        : 'No document-level auto-run actions, JavaScript, or embedded-file references were found to remove.';

    return { file, note };
  },
};

export const normalizePdfPagesFix: FixDefinition = {
  id: 'normalize-pdf-pages',
  label: 'Reset page rotation to upright',
  async run(ctx) {
    const { PDFDocument, degrees } = await import('pdf-lib');
    const doc = await PDFDocument.load(ctx.arrayBuffer, { ignoreEncryption: true, updateMetadata: false });

    let changed = 0;
    for (const page of doc.getPages()) {
      if (page.getRotation().angle !== 0) {
        page.setRotation(degrees(0));
        changed++;
      }
    }

    const bytes = await doc.save();
    const cleanName = ctx.detected.file.name.replace(/(\.[^.]+)$/, '-clean$1');
    const file = new File([bytes as BlobPart], cleanName, { type: 'application/pdf' });

    return {
      file,
      note: changed > 0 ? `Reset rotation to upright on ${changed} page${changed > 1 ? 's' : ''}.` : 'No rotated pages were found.',
    };
  },
};
