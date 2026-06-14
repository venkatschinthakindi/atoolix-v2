import { ReactNode } from "react";
import { FloatingDock } from "./floatingDock";
import { BackgroundOrbs } from "@/components/dashboard/backgroundOrbs";

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