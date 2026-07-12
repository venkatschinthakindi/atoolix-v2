"use client";

export default function RetryButton() {
  return (
    <button
      onClick={() => window.location.reload()}
      className="mt-8 rounded-xl bg-primary px-5 py-3 text-primary-foreground"
    >
      Retry
    </button>
  );
}