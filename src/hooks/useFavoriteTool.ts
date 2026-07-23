// src/hooks/useFavoriteTool.ts
'use client';

import { useMemo } from 'react';
import { useFavoriteToolStore } from '@/stores/favoriteToolsStore';

export function useFavoriteTool(toolId: string) {
  const items = useFavoriteToolStore((s:any) => s.items);
  const add = useFavoriteToolStore((s:any) => s.add);
  const remove = useFavoriteToolStore((s:any) => s.remove);
  const rename = useFavoriteToolStore((s:any) => s.rename);
  const toggle = useFavoriteToolStore((s:any) => s.toggle);
  const isFavorite = useMemo(
    () => items.some((i:any) => i.toolId === toolId),
    [items, toolId]
  );
  return { isFavorite, add, remove, rename, toggle };
}