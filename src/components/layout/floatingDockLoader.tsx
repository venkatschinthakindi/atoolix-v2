import dynamic from "next/dynamic";

const FloatingDock = dynamic(
  () =>
    import("@/components/layout/floatingDock").then(
      (mod) => mod.FloatingDock
    ),
);

export default function FloatingDockLoader() {
  return <FloatingDock />;
}