import { ReactNode } from "react";
import { BackgroundOrbs } from "@/components/dashboard/backgroundOrbs";
import { FloatingDock } from "@/components/layout/floatingDock";

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({
  children,
}: AppShellProps) {
  return (
    <main className="app-shell">
      <BackgroundOrbs />

      <FloatingDock />

      <div className="app-container">
        {children}
      </div>
    </main>
  );
}