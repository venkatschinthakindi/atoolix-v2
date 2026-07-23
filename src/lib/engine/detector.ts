import type { DetectedFile, FileCategory } from '@/lib/engine/types';

/** Magic-byte signatures for the formats we can positively identify client-side. */
const SIGNATURES: Array<{ category: FileCategory; ext: string; check: (bytes: Uint8Array) => boolean }> = [
  { category: 'pdf', ext: 'pdf', check: (b) => matches(b, [0x25, 0x50, 0x44, 0x46]) }, // %PDF
  { category: 'image', ext: 'png', check: (b) => matches(b, [0x89, 0x50, 0x4e, 0x47]) },
  { category: 'image', ext: 'jpg', check: (b) => matches(b, [0xff, 0xd8, 0xff]) },
  { category: 'image', ext: 'webp', check: (b) => matches(b, [0x52, 0x49, 0x46, 0x46]) && matches(b.slice(8), [0x57, 0x45, 0x42, 0x50]) },
  { category: 'image', ext: 'gif', check: (b) => matches(b, [0x47, 0x49, 0x46, 0x38]) },
  { category: 'archive', ext: 'zip', check: (b) => matches(b, [0x50, 0x4b, 0x03, 0x04]) },
  { category: 'audio', ext: 'mp3', check: (b) => matches(b, [0x49, 0x44, 0x33]) || matches(b, [0xff, 0xfb]) },
];

function matches(bytes: Uint8Array, signature: number[]): boolean {
  if (bytes.length < signature.length) return false;
  for (let i = 0; i < signature.length; i++) {
    if (bytes[i] !== signature[i]) return false;
  }
  return true;
}

const EXT_CATEGORY: Record<string, FileCategory> = {
  pdf: 'pdf',
  jpg: 'image',
  jpeg: 'image',
  png: 'image',
  webp: 'image',
  gif: 'image',
  svg: 'vector',
  txt: 'text',
  md: 'text',
  json: 'text',
  csv: 'text',
  xml: 'text',
  html: 'text',
  htm: 'text',
  docx: 'document',
  docm: 'document',
  dotx: 'document',
  dotm: 'document',
  xlsx: 'spreadsheet',
  xlsm: 'spreadsheet',
  xltx: 'spreadsheet',
  xltm: 'spreadsheet',
  pptx: 'presentation',
  pptm: 'presentation',
  potx: 'presentation',
  potm: 'presentation',
  zip: 'archive',
  mp3: 'audio',
  mp4: 'video',
};

// Office Open XML formats (docx/xlsx/pptx, and their macro-enabled .docm/
// .xlsm/.pptm and template .dotx/.xltx/.potx siblings) are themselves ZIP
// containers, so ZIP magic bytes are ambiguous — we disambiguate using the
// declared extension when the ZIP signature matches, since a full
// central-directory scan is deferred to the dedicated analyzer for that format.
const ZIP_BASED_EXT = new Set([
  'docx', 'docm', 'dotx', 'dotm',
  'xlsx', 'xlsm', 'xltx', 'xltm',
  'pptx', 'pptm', 'potx', 'potm',
  'zip',
]);

const SIGNATURE_MIME: Record<string, string> = {
  pdf: 'application/pdf',
  png: 'image/png',
  jpg: 'image/jpeg',
  webp: 'image/webp',
  gif: 'image/gif',
  zip: 'application/zip',
  mp3: 'audio/mpeg',
};

// Zip-based Office formats have their own canonical MIME types distinct
// from generic "application/zip" — used once we know the declared
// extension disambiguates a ZIP-signature match into one of these.
const OOXML_MIME: Record<string, string> = {
  docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  pptx: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
};

export async function detectFile(file: File): Promise<DetectedFile> {
  const declaredExt = (file.name.split('.').pop() || '').toLowerCase();
  const head = new Uint8Array(await file.slice(0, 16).arrayBuffer());

  const signatureMatch = SIGNATURES.find((s) => s.check(head));

  let category: FileCategory;
  let extensionMismatch = false;
  let detectedMimeType: string | undefined;

  if (signatureMatch) {
    if (signatureMatch.ext === 'zip' && ZIP_BASED_EXT.has(declaredExt)) {
      category = EXT_CATEGORY[declaredExt] ?? 'archive';
      detectedMimeType = OOXML_MIME[declaredExt] ?? SIGNATURE_MIME.zip;
    } else {
      category = signatureMatch.category;
      extensionMismatch = declaredExt !== '' && declaredExt !== signatureMatch.ext && !isImageAliasMatch(declaredExt, signatureMatch.ext);
      detectedMimeType = SIGNATURE_MIME[signatureMatch.ext];
    }
  } else if (EXT_CATEGORY[declaredExt]) {
    // No binary signature (typical for plain-text formats like txt/json/csv/xml/svg).
    category = EXT_CATEGORY[declaredExt];
  } else {
    category = 'unknown';
  }

  return {
    file,
    category,
    extension: declaredExt || 'unknown',
    mimeType: file.type || 'application/octet-stream',
    detectedMimeType,
    extensionMismatch,
  };
}

function isImageAliasMatch(declared: string, detected: string): boolean {
  if (detected === 'jpg' && declared === 'jpeg') return true;
  return false;
}
