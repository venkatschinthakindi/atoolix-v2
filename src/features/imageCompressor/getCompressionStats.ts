export function getCompressionStats(
  originalSize: number,
  compressedSize: number
) {
  const savingsPercent =
    originalSize === 0
      ? 0
      : Number(
          (
            ((originalSize -
              compressedSize) /
              originalSize) *
            100
          ).toFixed(2)
        );

  return {
    originalSize,
    compressedSize,
    savingsPercent,
  };
}