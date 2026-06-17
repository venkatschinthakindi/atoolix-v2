"use client";

export default function FloatingDockClient({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <nav className="fixed top-6 left-1/2 z-50 -translate-x-1/2">
      <div className="floating-dock">
        <div className="glass flex items-center gap-2 px-3 py-3">
          {children}
        </div>
      </div>
    </nav>
  );
}