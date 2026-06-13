
import Link from "next/link";
import { navigationItems } from "@/data/navigation";
import FloatingDockClient from "@/components/layout/floating-dock-client";

export function FloatingDock() {
  return (
    <FloatingDockClient>
      {navigationItems.map((item) => {
        const Icon = item.icon;

        return (
          <Link
            key={item.label}
            href={item.href}
            className="flex items-center gap-2 rounded-2xl px-4 py-2 text-sm text-white/70 transition-all hover:bg-white/10 hover:text-white"
          >
            <Icon size={18} />
            <span className="hidden md:block">{item.label}</span>
          </Link>
        );
      })}
    </FloatingDockClient>
  );
}