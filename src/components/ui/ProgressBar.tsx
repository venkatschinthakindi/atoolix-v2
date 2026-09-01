"use client";

export function ProgressBar({ value }: { value: number }) {
  return (
    <div className="w-full bg-surface-sunken rounded-full h-2 overflow-hidden">
      <div
        className="h-2 bg-accent-image transition-all"
        style={{ width: `${value}%` }}
      />
    </div>
  );
}