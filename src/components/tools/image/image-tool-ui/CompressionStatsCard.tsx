interface Props {
  originalSize: number;
  compressedSize: number;
  savingsPercent: number;
}

export function CompressionStatsCard({
  originalSize,
  compressedSize,
  savingsPercent,
}: Props) {
  return (
    <div className="grid grid-cols-3 gap-4">

      <div className="rounded-xl border border-white/10 p-4">
        <div className="text-xs text-white/50">
          Original
        </div>

        <div className="font-semibold">
          {(originalSize / 1024 / 1024).toFixed(2)} MB
        </div>
      </div>

      <div className="rounded-xl border border-white/10 p-4">
        <div className="text-xs text-white/50">
          Compressed
        </div>

        <div className="font-semibold">
          {(compressedSize / 1024 / 1024).toFixed(2)} MB
        </div>
      </div>

      <div className="rounded-xl border border-white/10 p-4">
        <div className="text-xs text-white/50">
          Savings
        </div>

        <div className="font-semibold text-green-400">
          {savingsPercent}%
        </div>
      </div>

    </div>
  );
}