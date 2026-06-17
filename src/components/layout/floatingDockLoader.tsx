"use client";

import dynamic from "next/dynamic";

const FloatingDock = dynamic(
  () =>
    import("@/components/layout/floatingDock").then(
      (mod) => mod.FloatingDock
    ),
  {
    ssr: false,
  }
);

export default function FloatingDockLoader() {
  return <FloatingDock />;
}