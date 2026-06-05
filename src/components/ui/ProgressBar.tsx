"use client";

export function ProgressBar({ value }: { value: number }) {
  return (
    <div className="w-full bg-gray-900 rounded-full h-2 overflow-hidden">
      <div
        className="h-2 bg-blue-500 transition-all"
        style={{ width: `${value}%` }}
      />
    </div>
  );
}