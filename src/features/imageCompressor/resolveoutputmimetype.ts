
export function hasTransparency(ctx: CanvasRenderingContext2D, width: number, height: number): boolean {
  if (width === 0 || height === 0) return false;

  const { data } = ctx.getImageData(0, 0, width, height);
  const step = Math.max(4, Math.floor((data.length / 4 / 20000) * 4)); // sample ~20k pixels max

  for (let i = 3; i < data.length; i += step) {
    if (data[i] < 255) return true;
  }
  return false;
}

export function resolveOutputMimeType(ctx: CanvasRenderingContext2D, width: number, height: number): string {
  return hasTransparency(ctx, width, height) ? "image/webp" : "image/jpeg";
}

export function paintWhiteBackground(ctx: CanvasRenderingContext2D, width: number, height: number) {
  ctx.save();
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, width, height);
  ctx.restore();
}