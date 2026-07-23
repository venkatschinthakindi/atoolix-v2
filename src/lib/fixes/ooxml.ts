import type { FixDefinition } from '@/lib/engine/types';
import { clearXmlTagText } from '@/lib/utils/xml';

const CORE_TAGS_TO_CLEAR = [
  'dc:creator',
  'cp:lastModifiedBy',
  'dc:subject',
  'dc:description',
  'cp:keywords',
  'cp:category',
  'cp:contentStatus',
  'dcterms:created',
  'dcterms:modified',
  'cp:revision',
];
const APP_TAGS_TO_CLEAR = ['Company', 'Manager', 'HyperlinkBase'];

/**
 * Rebuilds the OOXML ZIP package with document/custom properties cleared.
 * DOCX/XLSX/PPTX are just ZIP archives of XML parts, so "removing metadata"
 * here means: unzip, blank the relevant tags in the two/three property
 * parts, drop the custom-properties part entirely, and re-zip everything
 * else byte-for-byte unchanged (content, styles, media, etc. all pass
 * through untouched).
 *
 * Not included in this pass (flagged, not silently skipped): revision
 * history and comments/tracked-changes removal. Comments/tracked-changes
 * live inside the document content parts themselves (word/comments.xml,
 * w:ins/w:del runs in document.xml) — safely stripping those without
 * corrupting document structure or accidentally changing visible content
 * is a bigger, riskier change than a property-blanking pass, so for V1
 * those stay "detected and flagged" only, matching this product's own
 * precedent for macros ("cannot safely be removed automatically").
 */
export const stripOoxmlMetadataFix: FixDefinition = {
  id: 'strip-ooxml-metadata',
  label: 'Remove document properties (author, company, last editor, custom properties)',
  async run(ctx) {
    const { unzipSync, zipSync } = await import('fflate');
    const entries = unzipSync(new Uint8Array(ctx.arrayBuffer));

    const decoder = new TextDecoder('utf-8', { fatal: false });
    const encoder = new TextEncoder();
    const cleared: string[] = [];

    const corePath = 'docProps/core.xml';
    if (entries[corePath]) {
      let xml = decoder.decode(entries[corePath]);
      for (const tag of CORE_TAGS_TO_CLEAR) {
        const before = xml;
        xml = clearXmlTagText(xml, tag);
        if (xml !== before) cleared.push(tag.replace(/^\w+:/, ''));
      }
      entries[corePath] = encoder.encode(xml);
    }

    const appPath = 'docProps/app.xml';
    if (entries[appPath]) {
      let xml = decoder.decode(entries[appPath]);
      for (const tag of APP_TAGS_TO_CLEAR) {
        const before = xml;
        xml = clearXmlTagText(xml, tag);
        if (xml !== before) cleared.push(tag);
      }
      entries[appPath] = encoder.encode(xml);
    }

    let removedCustomProps = false;
    if (entries['docProps/custom.xml']) {
      delete entries['docProps/custom.xml'];
      removedCustomProps = true;
      // Best-effort: also drop the relationship + content-type entries that
      // reference the now-deleted part, so strict OOXML validators don't
      // flag a dangling reference. Malformed edge cases here fail silently
      // (try/catch) rather than aborting the whole fix, since Word/Excel/
      // PowerPoint themselves tolerate a stray relationship far more often
      // than they tolerate a missing part.
      try {
        const relsPath = '_rels/.rels';
        if (entries[relsPath]) {
          const relsXml = decoder.decode(entries[relsPath]).replace(/<Relationship[^>]*Target="docProps\/custom\.xml"[^>]*\/>/i, '');
          entries[relsPath] = encoder.encode(relsXml);
        }
        const ctPath = '[Content_Types].xml';
        if (entries[ctPath]) {
          const ctXml = decoder.decode(entries[ctPath]).replace(/<Override[^>]*PartName="\/docProps\/custom\.xml"[^>]*\/>/i, '');
          entries[ctPath] = encoder.encode(ctXml);
        }
      } catch {
        /* best-effort cleanup only */
      }
    }

    const zipped = zipSync(entries, { level: 6 });
    const cleanName = ctx.detected.file.name.replace(/(\.[^.]+)$/, '-clean$1');
    const file = new File([zipped as BlobPart], cleanName, { type: ctx.detected.file.type || 'application/octet-stream' });

    const parts: string[] = [];
    if (cleared.length > 0) parts.push(`cleared: ${Array.from(new Set(cleared)).join(', ')}`);
    if (removedCustomProps) parts.push('removed custom document properties');
    const note = parts.length > 0 ? `Document properties ${parts.join('; ')}.` : 'No document properties needed clearing.';

    return { file, note };
  },
};

/**
 * Deliberately narrow: removes ONLY embedded objects whose own magic bytes
 * are a Windows executable ("MZ" header) — never a legitimate embedded
 * spreadsheet/document object, even though both live under the same
 * `word|xl|ppt/embeddings/` path. This is what makes it safe to auto-apply:
 * a normal embedded OLE object (an actual document) is left completely
 * untouched, so this can never break a feature the user intentionally put
 * in the file. Only unambiguous executable payloads are removed.
 */
export const stripOoxmlExecutableEmbedsFix: FixDefinition = {
  id: 'strip-ooxml-executable-embeds',
  label: 'Remove embedded executable objects',
  async run(ctx) {
    const { unzipSync, zipSync } = await import('fflate');
    const entries = unzipSync(new Uint8Array(ctx.arrayBuffer));

    let removedCount = 0;
    for (const path of Object.keys(entries)) {
      if (!/^(word|xl|ppt)\/embeddings\//i.test(path)) continue;
      const bytes = entries[path];
      if (bytes && bytes.length >= 2 && bytes[0] === 0x4d && bytes[1] === 0x5a) {
        delete entries[path];
        removedCount++;
      }
    }

    const zipped = zipSync(entries, { level: 6 });
    const cleanName = ctx.detected.file.name.replace(/(\.[^.]+)$/, '-clean$1');
    const file = new File([zipped as BlobPart], cleanName, { type: ctx.detected.file.type || 'application/octet-stream' });

    return {
      file,
      note:
        removedCount > 0
          ? `Removed ${removedCount} embedded executable object(s). Any legitimate embedded documents/spreadsheets were left untouched.`
          : 'No embedded executable objects were found to remove.',
    };
  },
};
