import type { Analyzer, Finding } from '@/lib/engine/types';
import { formatBytes } from '@/lib/utils/format';
import { scanTextForSensitiveData } from '@/lib/analyzers/sensitive-data';

interface ExifData {
  Make?: string;
  Model?: string;
  Software?: string;
  DateTimeOriginal?: Date;
  latitude?: number;
  longitude?: number;
  Artist?: string;
  Copyright?: string;
  ImageDescription?: string;
  Orientation?: number;
}

export const imageAnalyzer: Analyzer = {
  id: 'image-analysis',
  label: 'Image Analysis',
  appliesTo: ['image'],
  async run(ctx) {
    const started = performance.now();
    const findings: Finding[] = [];
    const facts: Record<string, string> = {};

    // --- EXIF / GPS / Privacy -------------------------------------------------
    let exif: ExifData | null = null;
    try {
      const exifrModule = await import('exifr');
      // Support both the named export and default-export shapes a bundler
      // might produce for this dual CJS/ESM package.
      const parse = exifrModule.parse ?? (exifrModule as unknown as { default: typeof exifrModule }).default?.parse;
      if (!parse) throw new Error('exifr.parse was not found on the loaded module');
      exif = (await parse(ctx.arrayBuffer, true)) as ExifData | null;
    } catch (err) {
      // Only a genuinely EXIF-less image (e.g. a re-saved PNG) should reach
      // here silently. Anything else — a failed chunk load, a parser bug —
      // gets surfaced as a finding so it never looks identical to "no issues".
      const message = err instanceof Error ? err.message : String(err);
      const looksLikeNoExif = /no exif|unknown file format|invalid input/i.test(message);
      if (!looksLikeNoExif) {
        console.error('[image-analysis] EXIF parsing failed:', err);
        findings.push({
          id: 'exif-parse-failed',
          severity: 'warning',
          title: 'Could not fully check for embedded metadata',
          description: 'The metadata scanner hit an unexpected error on this image, so GPS/camera/author fields may not have been checked. Try again, or check a different file to confirm this is specific to this image.',
          section: 'integrity',
          meta: { error: message },
        });
      }
    }

    if (exif?.latitude != null && exif?.longitude != null) {
      findings.push({
        id: 'gps-location',
        severity: 'critical',
        title: 'GPS location embedded in photo',
        description: `This image reveals exactly where it was taken (${exif.latitude.toFixed(4)}, ${exif.longitude.toFixed(4)}). Remove this before sharing publicly.`,
        section: 'privacy',
        fixId: 'strip-metadata',
      });
    }

    if (exif?.Make || exif?.Model) {
      facts['Camera'] = [exif.Make, exif.Model].filter(Boolean).join(' ');
      findings.push({
        id: 'camera-info',
        severity: 'info',
        title: 'Camera / device info embedded',
        description: `Metadata reveals this photo was taken with a ${[exif.Make, exif.Model].filter(Boolean).join(' ')}.`,
        section: 'privacy',
        fixId: 'strip-metadata',
      });
    }

    if (exif?.Artist || exif?.Copyright) {
      const who = [exif.Artist, exif.Copyright].filter(Boolean).join(' / ');
      findings.push({
        id: 'author-metadata',
        severity: 'warning',
        title: 'Author or copyright metadata present',
        description: `This image's metadata identifies "${who}" as the author/copyright holder. This is visible to anyone who checks file properties.`,
        section: 'privacy',
        fixId: 'strip-metadata',
      });
    }

    if (exif?.Software) facts['Software'] = exif.Software;
    if (exif?.DateTimeOriginal) facts['Captured'] = new Date(exif.DateTimeOriginal).toLocaleString();

    // --- Dimensions / quality via bitmap decode --------------------------------
    try {
      const blob = new Blob([ctx.arrayBuffer], { type: ctx.detected.mimeType });
      const bitmap = await createImageBitmap(blob);
      facts['Dimensions'] = `${bitmap.width} × ${bitmap.height}px`;
      const megapixels = (bitmap.width * bitmap.height) / 1_000_000;
      facts['Resolution'] = `${megapixels.toFixed(1)} MP`;

      const bytesPerPixel = ctx.detected.file.size / (bitmap.width * bitmap.height);
      if (bytesPerPixel < 0.08 && ctx.detected.extension !== 'png') {
        findings.push({
          id: 'heavy-compression',
          severity: 'warning',
          title: 'Heavily compressed image',
          description: 'The bytes-per-pixel ratio is very low, which usually means visible compression artifacts (blockiness, blur around edges).',
          section: 'quality',
        });
      } else if (bytesPerPixel > 3 && (ctx.detected.mimeType === 'image/jpeg' || ctx.detected.mimeType === 'image/webp')) {
        findings.push({
          id: 'compressible-image',
          severity: 'info',
          title: 'Image could likely be compressed further',
          description: 'This image is large relative to its pixel dimensions. Compressing it can meaningfully reduce file size with little visible quality loss.',
          section: 'optimization',
          fixId: 'compress-image',
        });
      }

      // Distinct from the compression recommendation above: this fires on
      // raw pixel dimensions regardless of compression level. A 6000px-wide
      // photo destined for a web page is oversized no matter how well it's
      // compressed — resizing down is the bigger lever there, compression
      // is secondary. (No auto-fix offered: choosing a target size is a
      // judgment call this product shouldn't make silently.)
      const longestEdge = Math.max(bitmap.width, bitmap.height);
      if (longestEdge > 4000) {
        findings.push({
          id: 'oversized-dimensions',
          severity: 'info',
          title: `Very large pixel dimensions (${bitmap.width}×${bitmap.height})`,
          description: 'If this is headed for web or email rather than print, resizing to a smaller width (e.g. 2000px) before compressing will usually cut file size far more than compression alone.',
          section: 'optimization',
        });
      }

      if (bitmap.width < 640 || bitmap.height < 640) {
        findings.push({
          id: 'low-resolution',
          severity: 'info',
          title: 'Low resolution',
          description: `At ${bitmap.width}×${bitmap.height}px, this image may look blurry when printed or displayed large.`,
          section: 'quality',
        });
      }

      const aspect = bitmap.width / bitmap.height;
      facts['Aspect Ratio'] = aspect > 1 ? `${aspect.toFixed(2)}:1 (landscape)` : aspect < 1 ? `1:${(1 / aspect).toFixed(2)} (portrait)` : '1:1 (square)';

      // --- Transparency check (any format) ---------------------------------
      // Sampled via canvas alpha channel rather than assumed from file
      // extension, since a PNG/WebP/GIF can be fully opaque despite
      // supporting an alpha channel. Downscaled for very large images to
      // keep this fast; the box-filtered downscale still preserves any
      // meaningfully-sized transparent region.
      try {
        const scale = Math.min(1, 800 / Math.max(bitmap.width, bitmap.height));
        const sw = Math.max(1, Math.round(bitmap.width * scale));
        const sh = Math.max(1, Math.round(bitmap.height * scale));
        const alphaCanvas = document.createElement('canvas');
        alphaCanvas.width = sw;
        alphaCanvas.height = sh;
        const actx = alphaCanvas.getContext('2d');
        if (actx) {
          actx.drawImage(bitmap, 0, 0, sw, sh);
          const { data } = actx.getImageData(0, 0, sw, sh);
          let hasTransparency = false;
          for (let i = 3; i < data.length; i += 4) {
            if (data[i]! < 255) {
              hasTransparency = true;
              break;
            }
          }
          facts['Transparency'] = hasTransparency ? 'Yes' : 'No';
        }
      } catch {
        // Non-fatal — transparency is a nice-to-have fact, not core analysis.
      }

      // --- QR / barcode detection -----------------------------------------
      // Prefer the browser's NATIVE BarcodeDetector API (Shape Detection
      // API) when available — it's a built-in browser capability, not a
      // third-party library, so it adds zero bundle weight and covers UPC,
      // EAN, Code128, Code39, ITF, PDF417, Aztec, DataMatrix, QR, and more.
      // Currently shipped in Chromium-based browsers only. Where it isn't
      // available (Firefox, Safari, older browsers), this honestly falls
      // back to jsQR — QR codes only — rather than silently reporting zero
      // coverage or claiming detection it can't actually do. Which path ran
      // is recorded as a fact so this is never ambiguous.
      try {
        const scale = Math.min(1, 1600 / Math.max(bitmap.width, bitmap.height));
        const scanW = Math.max(1, Math.round(bitmap.width * scale));
        const scanH = Math.max(1, Math.round(bitmap.height * scale));
        const canvas = document.createElement('canvas');
        canvas.width = scanW;
        canvas.height = scanH;
        const g2d = canvas.getContext('2d');

        if (g2d) {
          g2d.drawImage(bitmap, 0, 0, scanW, scanH);

          type NativeBarcodeDetector = { detect(source: CanvasImageSource): Promise<Array<{ format: string; rawValue: string }>> };
          type NativeBarcodeDetectorCtor = { new (opts?: { formats?: string[] }): NativeBarcodeDetector; getSupportedFormats(): Promise<string[]> };
          const win = window as unknown as { BarcodeDetector?: NativeBarcodeDetectorCtor };

          let handled = false;
          if (win.BarcodeDetector) {
            try {
              const supportedFormats = await win.BarcodeDetector.getSupportedFormats();
              const detector = new win.BarcodeDetector({ formats: supportedFormats });
              const results = await detector.detect(canvas);
              facts['Barcode Scan Method'] = 'Native browser BarcodeDetector API (all supported formats)';
              handled = true;

              for (const result of results) {
                const preview = result.rawValue.length > 60 ? `${result.rawValue.slice(0, 57)}…` : result.rawValue;
                const isQr = result.format === 'qr_code';
                findings.push({
                  id: isQr ? 'qr-code-detected' : `barcode-detected-${result.format}`,
                  severity: 'info',
                  title: isQr ? 'QR code detected in image' : `Barcode detected (${result.format})`,
                  description: `This image contains a${isQr ? '' : ' ' + result.format} code encoding: "${preview}". Make sure you intended to share whatever it links to or contains.`,
                  section: 'privacy',
                });
                for (const f of scanTextForSensitiveData(result.rawValue)) {
                  findings.push({ ...f, id: `${isQr ? 'qr' : 'barcode'}-${f.id}`, title: `${f.title} inside ${isQr ? 'QR code' : 'barcode'}` });
                }
              }
            } catch (nativeErr) {
              console.warn('[image-analysis] Native BarcodeDetector failed, falling back to jsQR:', nativeErr);
            }
          }

          if (!handled) {
            facts['Barcode Scan Method'] = 'jsQR fallback — QR codes only (this browser lacks native barcode API support for UPC/EAN/Code128/etc.)';
            const imageData = g2d.getImageData(0, 0, scanW, scanH);
            const jsQR = (await import('jsqr')).default;
            const qr = jsQR(imageData.data, scanW, scanH);
            if (qr?.data) {
              const preview = qr.data.length > 60 ? `${qr.data.slice(0, 57)}…` : qr.data;
              findings.push({
                id: 'qr-code-detected',
                severity: 'info',
                title: 'QR code detected in image',
                description: `This image contains a QR code encoding: "${preview}". Make sure you intended to share whatever it links to or contains.`,
                section: 'privacy',
              });
              for (const f of scanTextForSensitiveData(qr.data)) {
                findings.push({ ...f, id: `qr-${f.id}`, title: `${f.title} inside QR code` });
              }
            }
          }
        }
      } catch (err) {
        console.warn('[image-analysis] Barcode/QR scan failed:', err);
      }

      bitmap.close();
    } catch {
      findings.push({
        id: 'decode-failed',
        severity: 'critical',
        title: 'Image could not be decoded',
        description: 'The browser could not render this image. The file may be corrupted or use an unsupported codec profile.',
        section: 'integrity',
      });
    }

    // --- Size breakdown ---------------------------------------------------------
    facts['File Size'] = formatBytes(ctx.detected.file.size);

    // --- PNG bit depth / color type (fixed-offset read of the IHDR chunk,
    // which the PNG spec guarantees is always the first chunk) -----------------
    if (ctx.detected.mimeType === 'image/png') {
      const bytes = new Uint8Array(ctx.arrayBuffer);
      if (bytes.length > 25) {
        const bitDepth = bytes[24]!;
        const colorType = bytes[25]!;
        const colorTypeLabel: Record<number, string> = {
          0: 'Grayscale',
          2: 'RGB (truecolor)',
          3: 'Palette-indexed',
          4: 'Grayscale + alpha',
          6: 'RGBA (truecolor + alpha)',
        };
        facts['Bit Depth'] = `${bitDepth}-bit`;
        facts['Color Type'] = colorTypeLabel[colorType] ?? `Unknown (${colorType})`;
      }
    }

    // --- GIF animation detection (real block-structure walk, not a byte-count
    // guess — correctly skips over image data sub-blocks so stray 0x2C bytes
    // inside compressed pixel data can't produce a false frame count) ----------
    if (ctx.detected.mimeType === 'image/gif') {
      const frameCount = countGifFrames(new Uint8Array(ctx.arrayBuffer));
      facts['Frames'] = String(frameCount);
      facts['Animated'] = frameCount > 1 ? 'Yes' : 'No';
      if (frameCount > 1) {
        findings.push({
          id: 'gif-animated',
          severity: 'info',
          title: `Animated GIF (${frameCount} frames)`,
          description: 'This is an animated image. Note: the metadata-removal fix does not re-encode animated GIFs, to avoid collapsing them to a single static frame.',
          section: 'quality',
        });
      }
    }

    const score = 100 - findings.reduce((acc, f) => acc + (f.severity === 'critical' ? 30 : f.severity === 'warning' ? 12 : 2), 0);

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

/**
 * Walks the real GIF89a block structure to count Image Descriptor blocks
 * (0x2C), correctly skipping Extension blocks and their sub-block chains.
 * A naive "count 0x2C bytes in the file" would false-positive constantly,
 * since compressed image data is full of arbitrary byte values including
 * 0x2C — this only counts bytes that appear exactly where the format
 * defines a new block boundary.
 */
function countGifFrames(bytes: Uint8Array): number {
  if (bytes.length < 13) return 0;
  let i = 6; // skip "GIF87a"/"GIF89a" signature
  const globalColorTableFlag = (bytes[10]! & 0x80) !== 0;
  const globalColorTableSize = 2 << (bytes[10]! & 0x07);
  i = 13; // past the 6-byte header + 7-byte Logical Screen Descriptor
  if (globalColorTableFlag) i += globalColorTableSize * 3;

  let frames = 0;
  while (i < bytes.length) {
    const blockType = bytes[i];
    if (blockType === 0x3b) break; // Trailer
    if (blockType === 0x21) {
      // Extension block: label byte, then a chain of sub-blocks each
      // prefixed by their own length byte, terminated by a zero-length block.
      i += 2;
      while (i < bytes.length && bytes[i] !== 0) i += bytes[i]! + 1;
      i += 1; // consume the terminating zero-length byte
    } else if (blockType === 0x2c) {
      frames++;
      const localColorTableFlag = (bytes[i + 9]! & 0x80) !== 0;
      const localColorTableSize = 2 << (bytes[i + 9]! & 0x07);
      i += 10; // Image Descriptor fixed fields
      if (localColorTableFlag) i += localColorTableSize * 3;
      i += 1; // LZW minimum code size byte
      while (i < bytes.length && bytes[i] !== 0) i += bytes[i]! + 1;
      i += 1; // terminating zero-length block
    } else {
      break; // unexpected byte — stop rather than risk an infinite/garbage loop
    }
  }
  return frames;
}
