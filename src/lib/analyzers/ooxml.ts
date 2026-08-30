import type { Analyzer, Finding } from '@/lib/engine/types';
import { extractXmlTagText, stripXmlTags } from '@/lib/utils/xml';
import { scanTextForSensitiveData } from '@/lib/analyzers/sensitive-data';

export const ooxmlAnalyzer: Analyzer = {
  id: 'ooxml-analysis',
  label: 'Office Document Analysis',
  appliesTo: ['document', 'spreadsheet', 'presentation'],
  async run(ctx) {
    const started = performance.now();
    const findings: Finding[] = [];
    const facts: Record<string, string> = {};

    // --- Password-protection precheck -------------------------------------
    // A password-protected DOCX/XLSX/PPTX isn't a ZIP at all — Office wraps
    // it in an OLE2/CFB container (the same legacy format .doc/.xls used)
    // holding an encrypted package stream. That container has a fixed,
    // unambiguous 8-byte signature, so this check is deterministic (not a
    // heuristic guess) and lets us give a precise, correct finding instead
    // of a generic "corrupted or not really a DOCX" message.
    const OLE2_SIGNATURE = [0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1];
    const head = new Uint8Array(ctx.arrayBuffer.slice(0, 8));
    const isOle2Container = OLE2_SIGNATURE.every((b, i) => head[i] === b);
    if (isOle2Container) {
      return {
        analyzerId: this.id,
        label: this.label,
        score: 60,
        findings: [
          {
            id: 'ooxml-password-protected',
            severity: 'info',
            title: 'Password-protected document',
            description: 'This file is wrapped in an encrypted OLE2 container, which is how Office stores a password-protected DOCX/XLSX/PPTX. Its contents can\u2019t be inspected without the password — that\u2019s expected and good for confidentiality, but confirm the recipient has it.',
            section: 'security',
          },
        ],
        facts: { 'Password Protected': 'Yes' },
        durationMs: performance.now() - started,
      };
    }

    let entries: Record<string, Uint8Array>;
    try {
      const { unzipSync } = await import('fflate');
      entries = unzipSync(new Uint8Array(ctx.arrayBuffer));
    } catch {
      findings.push({
        id: 'ooxml-unzip-failed',
        severity: 'critical',
        title: 'Could not open document structure',
        description: 'This file could not be read as a valid Office document container. It may be corrupted or not actually a DOCX/XLSX/PPTX despite its extension.',
        section: 'integrity',
      });
      return { analyzerId: this.id, label: this.label, score: 10, findings, durationMs: performance.now() - started };
    }

    const decoder = new TextDecoder('utf-8', { fatal: false });
    const readEntry = (path: string): string | null => {
      const bytes = entries[path];
      return bytes ? decoder.decode(bytes) : null;
    };
    const hasEntry = (path: string) => path in entries;

    // --- Broken XML check ---------------------------------------------------
    // The ZIP layer parsing above only proves the ARCHIVE structure is
    // intact — it says nothing about whether the XML parts inside are
    // themselves well-formed. Uses the browser's native DOMParser (zero new
    // dependency, and about as authoritative an XML-validity check as
    // exists): a real XML parser either succeeds or reports a parser error,
    // which is a deterministic yes/no, not a heuristic.
    const MAIN_PART_BY_CATEGORY: Record<string, string> = {
      document: 'word/document.xml',
      spreadsheet: 'xl/workbook.xml',
      presentation: 'ppt/presentation.xml',
    };
    const mainPartPath = MAIN_PART_BY_CATEGORY[ctx.detected.category];
    const partsToValidate = [
      ['docProps/core.xml', 'Document properties'],
      ...(mainPartPath ? [[mainPartPath, 'Main document content']] : []),
    ] as const;

    for (const [path, label] of partsToValidate) {
      const xml = readEntry(path);
      if (!xml) continue;
      try {
        const parsed = new DOMParser().parseFromString(xml, 'application/xml');
        const parserError = parsed.getElementsByTagName('parsererror')[0];
        if (parserError) {
          findings.push({
            id: 'ooxml-broken-xml',
            severity: 'critical',
            title: `Broken XML in ${label.toLowerCase()}`,
            description: `The "${path}" part inside this document is not well-formed XML and could not be parsed. This part of the file is likely corrupted or was hand-edited incorrectly — the document may fail to open correctly in Word/Excel/PowerPoint.`,
            section: 'integrity',
          });
        }
      } catch {
        // DOMParser itself doesn't throw for malformed XML (it returns a
        // parsererror document instead), so reaching here would be
        // unexpected — treated as non-fatal rather than crashing the analyzer.
      }
    }

    // --- Core & extended properties (docProps) ---------------------------------
    const coreXml = readEntry('docProps/core.xml');
    if (coreXml) {
      const creator = extractXmlTagText(coreXml, 'dc:creator') ?? extractXmlTagText(coreXml, 'creator');
      const lastModifiedBy = extractXmlTagText(coreXml, 'cp:lastModifiedBy') ?? extractXmlTagText(coreXml, 'lastModifiedBy');
      const created = extractXmlTagText(coreXml, 'dcterms:created') ?? extractXmlTagText(coreXml, 'created');
      const modified = extractXmlTagText(coreXml, 'dcterms:modified') ?? extractXmlTagText(coreXml, 'modified');
      const title = extractXmlTagText(coreXml, 'dc:title') ?? extractXmlTagText(coreXml, 'title');

      if (creator) {
        facts['Author'] = creator;
        findings.push({
          id: 'ooxml-author-metadata',
          severity: 'warning',
          title: 'Author name embedded in document properties',
          description: `The document properties list "${creator}" as the author, visible to anyone who checks file properties.`,
          section: 'privacy',
          fixId: 'strip-ooxml-metadata',
        });
      }
      if (lastModifiedBy && lastModifiedBy !== creator) {
        facts['Last Modified By'] = lastModifiedBy;
        findings.push({
          id: 'ooxml-last-modified-by',
          severity: 'info',
          title: 'Last editor name embedded',
          description: `The document records "${lastModifiedBy}" as the last person who edited it.`,
          section: 'privacy',
          fixId: 'strip-ooxml-metadata',
        });
      }
      if (created) facts['Created'] = created;
      if (modified) facts['Modified'] = modified;
      if (title) facts['Title'] = title;
    }

    const appXml = readEntry('docProps/app.xml');
    if (appXml) {
      const company = extractXmlTagText(appXml, 'Company');
      const application = extractXmlTagText(appXml, 'Application');
      if (company) {
        facts['Company'] = company;
        findings.push({
          id: 'ooxml-company-metadata',
          severity: 'info',
          title: 'Company name embedded in document',
          description: `The document properties reveal it was created within the organization "${company}".`,
          section: 'privacy',
          fixId: 'strip-ooxml-metadata',
        });
      }
      if (application) facts['Created With'] = application;
      const appVersion = extractXmlTagText(appXml, 'AppVersion');
      if (appVersion) facts['Application Version'] = appVersion;
    }

    // --- Macros ------------------------------------------------------------
    const hasMacros = Object.keys(entries).some((name) => /vbaProject\.bin$/i.test(name));
    facts['Macros'] = hasMacros ? 'Yes' : 'No';
    if (hasMacros) {
      findings.push({
        id: 'ooxml-macros',
        severity: 'critical',
        title: 'VBA macros embedded',
        description: 'This document contains VBA macro code, which can run automatically and is a common malware vector. Only trust macros from a source you know.',
        section: 'security',
      });
    }

    // --- OLE embedded objects ------------------------------------------------
    // word/xl/ppt/embeddings/*.bin entries are OLE Package Objects — used
    // legitimately to embed e.g. an Excel table inside a Word doc, but also
    // a well-known technique for smuggling an executable inside an OLE
    // wrapper that Office will run on double-click. This checks the
    // embedded object's OWN magic bytes: a normal embedded document starts
    // with the OLE2/CFB signature; an executable starts with "MZ" — that
    // distinction is what separates "normal embed" from "critical risk"
    // here, not just the presence of an embeddings folder at all.
    const embeddingPaths = Object.keys(entries).filter((name) => /^(word|xl|ppt)\/embeddings\//i.test(name));
    if (embeddingPaths.length > 0) {
      facts['Embedded Objects'] = String(embeddingPaths.length);
      const executablePayloads = embeddingPaths.filter((path) => {
        const bytes = entries[path];
        if (!bytes || bytes.length < 2) return false;
        return bytes[0] === 0x4d && bytes[1] === 0x5a; // "MZ" — Windows executable header
      });
      if (executablePayloads.length > 0) {
        findings.push({
          id: 'ooxml-embedded-executable',
          severity: 'critical',
          title: 'Embedded executable disguised as a document object',
          description: `${executablePayloads.length} embedded object(s) inside this file are actual Windows executables (not documents), packaged to run when the object is opened — a well-known malware delivery technique. Do not open the embedded object unless you fully trust the source.`,
          section: 'security',
          fixId: 'strip-ooxml-executable-embeds',
        });
      } else {
        findings.push({
          id: 'ooxml-embedded-object',
          severity: 'warning',
          title: `${embeddingPaths.length} embedded object${embeddingPaths.length > 1 ? 's' : ''} (OLE)`,
          description: 'This document has other files/objects embedded inside it (e.g. a spreadsheet or another document). Review them before sharing, since they travel with the file invisibly.',
          section: 'security',
        });
      }
    }

    // --- External / remote links (any part's .rels) ----------------------------
    const relsFiles = Object.keys(entries).filter((name) => name.endsWith('.rels'));
    let externalLinkCount = 0;
    for (const relPath of relsFiles) {
      const rel = readEntry(relPath);
      if (rel) externalLinkCount += (rel.match(/TargetMode="External"/g) ?? []).length;
    }
    if (externalLinkCount > 0) {
      findings.push({
        id: 'ooxml-external-links',
        severity: 'warning',
        title: `${externalLinkCount} external link${externalLinkCount > 1 ? 's' : ''} embedded`,
        description: 'This document references external resources (URLs or linked files). Some viewers fetch these automatically when the document opens.',
        section: 'security',
      });
    }

    // --- Word-specific: track changes / comments --------------------------------
    if (hasEntry('word/document.xml')) {
      const documentXml = readEntry('word/document.xml') ?? '';
      const hasTrackChanges = /<w:ins[\s>]/.test(documentXml) || /<w:del[\s>]/.test(documentXml);
      if (hasTrackChanges) {
        findings.push({
          id: 'docx-track-changes',
          severity: 'warning',
          title: 'Unresolved tracked changes present',
          description: 'This document contains tracked insertions or deletions that are still visible in the file, even if not shown in your current view.',
          section: 'privacy',
        });
      }
      if (hasEntry('word/comments.xml')) {
        findings.push({
          id: 'docx-comments',
          severity: 'warning',
          title: 'Comments present',
          description: 'This document has comments attached, which travel with the file even if collapsed in the viewer.',
          section: 'privacy',
        });
      }

      const plainText = stripXmlTags(documentXml);
      findings.push(...scanTextForSensitiveData(plainText));
    }

    // --- Excel-specific: hidden sheets ------------------------------------------
    if (hasEntry('xl/workbook.xml')) {
      const workbookXml = readEntry('xl/workbook.xml') ?? '';
      const hiddenSheetMatches = workbookXml.match(/<sheet\b[^>]*state="(?:hidden|veryHidden)"[^>]*>/g) ?? [];
      if (hiddenSheetMatches.length > 0) {
        findings.push({
          id: 'xlsx-hidden-sheets',
          severity: 'warning',
          title: `${hiddenSheetMatches.length} hidden sheet${hiddenSheetMatches.length > 1 ? 's' : ''}`,
          description: 'This workbook contains sheets that are hidden from view but still present in the file — anyone can unhide them.',
          section: 'privacy',
        });
      }
      facts['Sheets'] = String((workbookXml.match(/<sheet\b/g) ?? []).length);
    }

    // --- PowerPoint-specific: speaker notes with content -------------------------
    const notesSlides = Object.keys(entries).filter((n) => /ppt\/notesSlides\/notesSlide\d+\.xml/.test(n));
    if (notesSlides.length > 0) {
      findings.push({
        id: 'pptx-speaker-notes',
        severity: 'info',
        title: `Speaker notes present on ${notesSlides.length} slide${notesSlides.length > 1 ? 's' : ''}`,
        description: 'This presentation includes speaker notes, which are not visible during a slideshow but are included in the file.',
        section: 'privacy',
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
