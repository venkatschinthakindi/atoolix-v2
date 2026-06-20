import { ReactNode } from "react";
import { BackgroundOrbs } from "@/components/dashboard/backgroundOrbs";
import FloatingDockLoader from "@/components/layout/floatingDockLoader";

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({
  children,
}: AppShellProps) {
  return (
    <main className="app-shell">
      <BackgroundOrbs />

      <>
        <FloatingDockLoader />
      </>

      <div className="app-container">
        {children}
      </div>
    </main>
  );
}