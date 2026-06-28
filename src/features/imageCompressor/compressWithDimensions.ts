export interface CompressorConfig {
  mode?: "quality" | "target-size";
  defaultQuality?: number;
  targetKB?: number;
  lockTarget?: boolean;
  allowedFormats?: string[];
  topSectionHeader?: string;
  topSectionDescription?: string;

  enableResize?: boolean;
  defaultWidth?: number;
  defaultHeight?: number;
  allowUpscale?: boolean;
}

export interface CompressImageOptions {
  mode: "quality" | "target-size";
  quality: number;
  targetKB?: number;
  lockTarget?: boolean;

  resize?: boolean;
  width?: number;
  height?: number;
  lockAspectRatio?: boolean;

  allowUpscale?: boolean;
  outputMimeType?: string;
}

export interface CompressionResult {
  blob: Blob;
  originalSize: number;
  compressedSize: number;
  originalWidth: number;
  originalHeight: number;
  outputWidth: number;
  outputHeight: number;
  iterations?: number;
  mimeType: string;
}

type Context2D = CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D;
type CanvasLike = HTMLCanvasElement | OffscreenCanvas;

function clampDimension(value: number, min = 1): number {
  return Math.max(min, Math.floor(value || 0));
}

function fileToImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.decoding = "async";
    img.onload = () => { URL.revokeObjectURL(url); resolve(img); };
    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error("Failed to load image")); };
    img.src = url;
  });
}

function pickMimeType(file: File, preferred?: string): string {
  if (preferred) return preferred;
  const type = (file.type || "").toLowerCase();
  if (type.includes("webp")) return "image/webp";
  if (type.includes("avif")) return "image/avif";
  if (type.includes("png"))  return "image/png";
  return "image/jpeg";
}

function createCanvas(width: number, height: number): CanvasLike {
  if (typeof OffscreenCanvas !== "undefined") return new OffscreenCanvas(width, height);
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  return canvas;
}

function get2DContext(canvas: CanvasLike): Context2D {
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Unable to get 2D canvas context");
  return ctx;
}

function setup2DContext(ctx: Context2D): void {
  ctx.imageSmoothingEnabled = true;
  if ("imageSmoothingQuality" in ctx) {
    (ctx as CanvasRenderingContext2D).imageSmoothingQuality = "high";
  }
}

async function canvasToBlob(
  canvas: CanvasLike,
  mimeType: string,
  quality?: number
): Promise<Blob> {
  if ("convertToBlob" in canvas) {
    return (canvas as OffscreenCanvas).convertToBlob({ type: mimeType, quality });
  }
  return new Promise((resolve, reject) => {
    (canvas as HTMLCanvasElement).toBlob(
      (blob) => {
        if (!blob) { reject(new Error("Canvas export failed")); return; }
        resolve(blob);
      },
      mimeType,
      quality
    );
  });
}

async function renderCanvas(
  img: HTMLImageElement,
  width: number,
  height: number
): Promise<CanvasLike> {
  const canvas = createCanvas(width, height);
  const ctx = get2DContext(canvas);
  setup2DContext(ctx);
  ctx.clearRect(0, 0, width, height);
  ctx.drawImage(img, 0, 0, width, height);
  return canvas;
}

// ─── Dimension computation ────────────────────────────────────────────────────

function computeTargetSize(
  originalWidth: number,
  originalHeight: number,
  options: CompressImageOptions
): { width: number; height: number } {
  if (!options.resize) return { width: originalWidth, height: originalHeight };

  let width  = clampDimension(options.width  ?? originalWidth);
  let height = clampDimension(options.height ?? originalHeight);

  if (options.lockAspectRatio) {
    const ratio = originalWidth / originalHeight;
    if (options.width && !options.height) {
      height = clampDimension(width / ratio);
    } else if (options.height && !options.width) {
      width = clampDimension(height * ratio);
    } else if (options.width && options.height) {
      if (Math.abs(width / height - ratio) > 0.01) {
        height = clampDimension(width / ratio);
      }
    }
  }
  return { width, height };
}

interface QualitySearchResult {
  blob: Blob;
  quality: number;
  reachedCeiling: boolean; // true → even max quality is under target (canvas too small)
  reachedFloor: boolean;   // true → even min quality is over target  (canvas too large)
}

async function searchClosestQuality(
  canvas: CanvasLike,
  mimeType: string,
  targetBytes: number
): Promise<QualitySearchResult> {
  // ── Boundary checks first (avoids wasted iterations) ─────────────────────
  const maxBlob = await canvasToBlob(canvas, mimeType, 0.98);
  if (maxBlob.size <= targetBytes) {
    return { blob: maxBlob, quality: 0.98, reachedCeiling: true, reachedFloor: false };
  }

  const minBlob = await canvasToBlob(canvas, mimeType, 0.01);
  if (minBlob.size >= targetBytes) {
    return { blob: minBlob, quality: 0.01, reachedCeiling: false, reachedFloor: true };
  }

  // ── Coarse binary search ──────────────────────────────────────────────────
  let low  = 0.01;
  let high = 0.98;
  let bestBlob    = maxBlob;
  let bestQuality = 0.98;
  let bestDiff    = Math.abs(maxBlob.size - targetBytes);

  for (let i = 0; i < 16; i++) {
    const quality = (low + high) / 2;
    const blob    = await canvasToBlob(canvas, mimeType, quality);
    const diff    = Math.abs(blob.size - targetBytes);

    if (diff < bestDiff) { bestDiff = diff; bestBlob = blob; bestQuality = quality; }

    // Higher quality → larger file, so:
    if (blob.size > targetBytes) high = quality; // overshoot → lower quality
    else                         low  = quality; // undershoot → higher quality
  }

  // ── Fine linear sweep ±0.15 around coarse best ───────────────────────────
  const fineMin   = Math.max(0.01, bestQuality - 0.15);
  const fineMax   = Math.min(0.98, bestQuality + 0.15);
  const FINE_STEPS = 30;

  for (let i = 0; i <= FINE_STEPS; i++) {
    const quality = fineMin + ((fineMax - fineMin) * i) / FINE_STEPS;
    const blob    = await canvasToBlob(canvas, mimeType, quality);
    const diff    = Math.abs(blob.size - targetBytes);

    if (diff < bestDiff) { bestDiff = diff; bestBlob = blob; bestQuality = quality; }
  }

  return { blob: bestBlob, quality: bestQuality, reachedCeiling: false, reachedFloor: false };
}

interface TargetKBResult {
  blob: Blob;
  width: number;
  height: number;
  quality: number;
  iterations: number;
  /** True when the target was not reachable and we returned the closest possible. */
  clamped: boolean;
}

/** Internal tracking type — includes `diff` for round-to-round comparison. */
interface TargetKBCandidate extends TargetKBResult {
  diff: number;
}

async function compressTargetKB(
  img: HTMLImageElement,
  options: CompressImageOptions,
  base: { width: number; height: number },
  mimeType: string,
  targetBytes: number
): Promise<TargetKBResult> {
  const TOLERANCE  = Math.max(512, Math.floor(targetBytes * 0.02)); // 2% or ≥ 512 B
  const MAX_ROUNDS = 10;
  const SCALE_STEP = 0.88;

  const hasDimensions = options.resize === true;

  // ── LOCKED-DIMENSION PATH ─────────────────────────────────────────────────
  // User passed explicit dimensions. Honour them exactly, vary quality only.
  if (hasDimensions) {
    const canvas  = await renderCanvas(img, base.width, base.height);
    const attempt = await searchClosestQuality(canvas, mimeType, targetBytes);

    // KB target is reachable purely by quality at these dimensions → perfect.
    if (!attempt.reachedCeiling && !attempt.reachedFloor) {
      return {
        blob: attempt.blob,
        width: base.width, height: base.height,
        quality: attempt.quality,
        iterations: 47,
        clamped: false,
      };
    }

    // KB target not reachable (canvas too small or too large for this target).
    // Return best possible at the exact requested dimensions.
    return {
      blob: attempt.blob,
      width: base.width, height: base.height,
      quality: attempt.quality,
      iterations: 2,
      clamped: true,
    };
  }

  let scale = 1;
  let best: TargetKBCandidate | null = null;

  for (let round = 0; round < MAX_ROUNDS; round++) {
    const width  = clampDimension(Math.round(base.width  * scale));
    const height = clampDimension(Math.round(base.height * scale));
    const canvas = await renderCanvas(img, width, height);
    const result = await searchClosestQuality(canvas, mimeType, targetBytes);
    const diff   = Math.abs(result.blob.size - targetBytes);

    if (!best || diff < best.diff) {
      best = {
        blob: result.blob, width, height,
        quality: result.quality,
        iterations: (round + 1) * 47,
        clamped: false,
        diff,
      };
    }

    if (diff <= TOLERANCE) break;

    if (result.reachedCeiling) {
      // Canvas too small even at max quality → scale up.
      scale *= 1 / SCALE_STEP;
      if (!options.allowUpscale) scale = Math.min(scale, 1);
    } else if (result.reachedFloor) {
      // Canvas too large even at min quality → scale down.
      scale *= SCALE_STEP;
    } else {
      // Quality found a bracket; nudge scale toward target for next round.
      scale *= result.blob.size > targetBytes ? SCALE_STEP : 1 / SCALE_STEP;
      if (!options.allowUpscale) scale = Math.min(scale, 1);
    }

    const maxScale = options.allowUpscale ? 16 : 1;
    scale = Math.max(0.01, Math.min(scale, maxScale));
  }

  if (!best) {
    const fc = await renderCanvas(img, base.width, base.height);
    const fb = await canvasToBlob(fc, mimeType, 0.5);
    return { blob: fb, width: base.width, height: base.height, quality: 0.5, iterations: 1, clamped: true };
  }

  best.clamped = best.diff > Math.max(1024, targetBytes * 0.05);
  return best;
}

// ─── Public API ───────────────────────────────────────────────────────────────

export async function compressWithDimensionsImage(
  file: File,
  options: CompressImageOptions
): Promise<CompressionResult> {
  const img = await fileToImage(file);

  const originalWidth  = img.naturalWidth  || img.width;
  const originalHeight = img.naturalHeight || img.height;
  const base           = computeTargetSize(originalWidth, originalHeight, options);
  const mimeType       = pickMimeType(file, options.outputMimeType);
  const originalSize   = file.size;

  // ── Quality mode ──────────────────────────────────────────────────────────
  if (options.mode === "quality") {
    const canvas = await renderCanvas(img, base.width, base.height);
    const blob   = await canvasToBlob(canvas, mimeType, options.quality);
    return {
      blob,
      originalSize,
      compressedSize: blob.size,
      originalWidth, originalHeight,
      outputWidth: base.width, outputHeight: base.height,
      iterations: 1,
      mimeType,
    };
  }

  // ── Target-KB mode ────────────────────────────────────────────────────────
  const targetBytes = Math.max(1, (options.targetKB ?? 100) * 1024);
  const result      = await compressTargetKB(img, options, base, mimeType, targetBytes);

  return {
    blob: result.blob,
    originalSize,
    compressedSize: result.blob.size,
    originalWidth, originalHeight,
    outputWidth:  result.width,
    outputHeight: result.height,
    iterations:   result.iterations,
    mimeType,
  };
}