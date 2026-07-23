// src/components/favorites/FavoriteCard.tsx
'use client';

import { FavoriteButton } from "@/components/favorites/favoriteButton";
import { ToolRegistryEntry } from "@/data/tools";

export function FavoriteCard({
  tool,
}: {
  tool: ToolRegistryEntry;
}) {
  return (
    
    <div className="flex items-center justify-between rounded-xl border p-4">
      <div className="min-w-0">
        <div className="truncate font-medium">{tool.toolShortName || tool.onPageTitle}</div>
        <div className="text-sm text-muted-foreground">{tool.id}</div>
      </div>
      <FavoriteButton tool={tool} />
    </div>
  );
}