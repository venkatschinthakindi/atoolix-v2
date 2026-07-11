
import Link from "next/link";
import { navigationItems } from "@/data/navigation";

export function FloatingDock() {
  return (
    <nav className="fixed top-6 left-1/2 z-50 -translate-x-1/2">
      <div className="floating-dock">
        <div className="glass flex items-center gap-2 px-3 py-3">
          {navigationItems.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.label}
                href={item.href}
                aria-label={item.label}
                className="flex items-center gap-2 rounded-2xl px-4 py-2 text-sm text-white/70 transition-all hover:bg-white/10 hover:text-white"
              >
                <Icon size={18} aria-hidden="true" />
                <span className="hidden md:block">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}