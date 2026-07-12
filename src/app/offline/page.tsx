import type { Metadata } from "next";
import RetryButton from "./retry-button";

export const metadata: Metadata = {
  title: "Offline",
  robots: {
    index: false,
    follow: false,
  },
};

export default function OfflinePage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="max-w-md text-center">
        <div className="mb-6 text-6xl">📡</div>

        <h1 className="text-3xl font-bold">
          You're Offline
        </h1>

        <p className="mt-3 text-muted-foreground">
          Internet connection was lost.
          Reconnect and try again.
        </p>

        <RetryButton />
      </div>
    </main>
  );
}