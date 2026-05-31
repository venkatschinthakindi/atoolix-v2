import { ReactNode } from "react";
import { FloatingDock } from "./floating-dock";
import { BackgroundOrbs } from "@/components/dashboard/background-orbs";

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