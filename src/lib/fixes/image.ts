import type { FixDefinition } from '@/lib/engine/types';

const CANVAS_SAFE_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp']);

export const stripImageMetadataFix: FixDefinition = {
  id: 'strip-metadata',
  label: 'Remove metadata (GPS, camera info, author)',
  async run(ctx) {
    const mimeType = ctx.detected.mimeType;

    // GIF is deliberately excluded from the canvas re-encode path below.
    // createImageBitmap()+canvas only ever captures a single frame, so
    // "fixing" an animated GIF this way would silently collapse it to a
    // static image — exactly the kind of unexpected content change this
    // fix engine is supposed to never do. GIFs also rarely carry
    // meaningful EXIF/GPS metadata in the first place (that's a JPEG/TIFF
    // convention), so the privacy upside here is small next to the
    // animation-destroying downside. Until frame-preserving GIF metadata
    // stripping is implemented, this is a clear no-op with an honest note
    // rather than a fix that quietly breaks the file.
    if (mimeType === 'image/gif') {
      return {
        file: ctx.detected.file,
        note: 'Skipped: re-encoding a GIF through canvas would destroy any animation, so this fix leaves GIFs untouched. GIFs rarely carry EXIF/GPS data to begin with.',
      };
    }

    const blob = new Blob([ctx.arrayBuffer], { type: mimeType });
    const bitmap = await createImageBitmap(blob);

    const canvas = document.createElement('canvas');
    canvas.width = bitmap.width;
    canvas.height = bitmap.height;
    const g = canvas.getContext('2d');
    if (!g) throw new Error('Canvas 2D context unavailable in this browser.');
    g.drawImage(bitmap, 0, 0);
    bitmap.close();

    // Re-encoding through <canvas> never carries EXIF/IPTC/XMP forward —
    // this is what actually strips the metadata, not a flag or option.
    // Preserve the original format for anything canvas can re-encode
    // natively (PNG/WebP keep transparency; JPEG doesn't have alpha to
    // begin with) instead of silently collapsing everything to JPEG.
    const outputType = CANVAS_SAFE_TYPES.has(mimeType) ? mimeType : 'image/jpeg';
    const quality = outputType === 'image/jpeg' || outputType === 'image/webp' ? 0.92 : undefined;

    const outBlob: Blob = await new Promise((resolve, reject) => {
      canvas.toBlob(
        (b) => (b ? resolve(b) : reject(new Error('Failed to re-encode image'))),
        outputType,
        quality
      );
    });

    const cleanName = ctx.detected.file.name.replace(/(\.[^.]+)$/, '-clean$1');
    const file = new File([outBlob], cleanName, { type: outputType });

    return { file, note: 'Re-encoded the image, which removes all embedded GPS, camera, and author metadata.' };
  },
};

/**
 * Distinct from stripImageMetadataFix: this one deliberately re-encodes at
 * a lower quality setting to actually shrink file size (the metadata fix
 * uses a high, effectively-lossless quality since its only job is removing
 * metadata, not saving space). Also GIF-excluded for the same
 * animation-preservation reason as above. PNG is skipped too — canvas
 * re-encoding a PNG doesn't apply lossy compression, so there's nothing
 * meaningful for this fix to do there beyond what the metadata fix already
 * achieves; a real PNG size reduction needs palette/quantization logic this
 * pass doesn't include.
 */
export const compressImageFix: FixDefinition = {
  id: 'compress-image',
  label: 'Compress image to reduce file size',
  async run(ctx) {
    const mimeType = ctx.detected.mimeType;

    if (mimeType === 'image/gif') {
      return { file: ctx.detected.file, note: 'Skipped: compressing a GIF through canvas would destroy any animation.' };
    }
    if (mimeType === 'image/png') {
      return {
        file: ctx.detected.file,
        note: 'Skipped: canvas re-encoding doesn\u2019t meaningfully shrink PNGs (no lossy quality setting to lower). Try the metadata-removal fix, or convert to JPEG/WebP if some quality loss is acceptable.',
      };
    }

    const blob = new Blob([ctx.arrayBuffer], { type: mimeType });
    const bitmap = await createImageBitmap(blob);
    const canvas = document.createElement('canvas');
    canvas.width = bitmap.width;
    canvas.height = bitmap.height;
    const g = canvas.getContext('2d');
    if (!g) throw new Error('Canvas 2D context unavailable in this browser.');
    g.drawImage(bitmap, 0, 0);
    bitmap.close();

    const outputType = mimeType === 'image/webp' ? 'image/webp' : 'image/jpeg';
    const outBlob: Blob = await new Promise((resolve, reject) => {
      canvas.toBlob((b) => (b ? resolve(b) : reject(new Error('Failed to re-encode image'))), outputType, 0.72);
    });

    const savedPct = Math.max(0, Math.round((1 - outBlob.size / ctx.detected.file.size) * 100));
    const cleanName = ctx.detected.file.name.replace(/(\.[^.]+)$/, '-compressed$1');
    const file = new File([outBlob], cleanName, { type: outputType });

    return {
      file,
      note: savedPct > 0 ? `Reduced file size by ~${savedPct}% (also removes metadata as a side effect of re-encoding).` : 'Re-encoded at reduced quality, though file size did not shrink meaningfully for this image.',
    };
  },
};
