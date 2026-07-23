// src/components/favorites/FavoriteList.tsx
'use client';

import Link from 'next/link';
import { useFavoriteToolStore } from '@/stores/favoriteToolsStore';

export function FavoriteList({ maxItems = 10 }: { maxItems?: number }) {
  const items = useFavoriteToolStore((s:any) => s.items).slice(0, maxItems);

  if (!items.length) {
    return (
      <div className="rounded-xl border p-6 text-sm text-muted-foreground">
        No favorite tools yet.
      </div>
    );
  }

  return (
    <div className="max-h-[420px] overflow-y-auto rounded-xl border p-2">
      {items.map((item:any) => (
        <Link
          key={item.toolId}
          href={`/tools/${item.toolId}`}
          className="block rounded-lg px-3 py-2 hover:bg-muted"
        >
          <div className="font-medium">{item.displayName || item.toolId}</div>
        </Link>
      ))}
    </div>
  );
}