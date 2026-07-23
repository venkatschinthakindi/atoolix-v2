/**
 * Minimal, namespace-agnostic XML tag reader for the small, predictable
 * fragments we need out of OOXML parts (docProps/core.xml, app.xml,
 * workbook.xml). Not a general XML parser — deliberately simple so its
 * behavior is identical (and testable) in both Node and the browser,
 * with no DOMParser dependency.
 */
export function extractXmlTagText(xml: string, localName: string): string | null {
  const re = new RegExp(`<(?:\\w+:)?${escapeRe(localName)}(?:\\s[^>]*)?>([\\s\\S]*?)</(?:\\w+:)?${escapeRe(localName)}>`, 'i');
  const match = xml.match(re);
  if (!match) return null;
  return decodeXmlEntities(match[1] ?? '').trim();
}

export function countXmlOccurrences(xml: string, pattern: RegExp): number {
  const re = new RegExp(pattern.source, pattern.flags.includes('g') ? pattern.flags : `${pattern.flags}g`);
  const matches = xml.match(re);
  return matches ? matches.length : 0;
}

export function xmlHasTag(xml: string, tagPattern: RegExp): boolean {
  return tagPattern.test(xml);
}

/** Strips all tags to give a rough plain-text rendering, good enough for sensitive-data scanning. */
export function stripXmlTags(xml: string): string {
  return decodeXmlEntities(xml.replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim();
}

/**
 * Blanks the text content of every occurrence of a tag (matched by local
 * name, namespace-agnostic — same convention as `extractXmlTagText`),
 * leaving the tag itself in place so the surrounding XML stays well-formed.
 * Self-closing tags (`<dc:creator/>`) are left as-is since they carry no
 * text to blank.
 */
export function clearXmlTagText(xml: string, localName: string): string {
  const re = new RegExp(`(<(?:\\w+:)?${escapeRe(localName)}(?:\\s[^>]*)?>)([\\s\\S]*?)(</(?:\\w+:)?${escapeRe(localName)}>)`, 'gi');
  return xml.replace(re, (_match, open, _content, close) => `${open}${close}`);
}

function escapeRe(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function decodeXmlEntities(s: string): string {
  return s
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&amp;/g, '&');
}
