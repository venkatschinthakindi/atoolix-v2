// src/components/tool/ToolHeaderFavorite.tsx
'use client';

import { FavoriteButton } from '@/components/favorites/favoriteButton';
import { ToolRegistryEntry } from '@/data/tools';

export function ToolHeaderFavorite({
  tool,
}: {
  tool: ToolRegistryEntry;
}) {
  return <FavoriteButton tool={tool} />;
}