// src/lib/favorite-utils.ts
import type { FavoriteTool } from '@/types/favorite/favorite';

export const FAVORITE_STORAGE_KEY = 'atoolix.favorite-tools';

export function sortFavorites(items: FavoriteTool[]) {
  return [...items].sort((a, b) => a.order - b.order || b.addedAt - a.addedAt);
}

export function nextOrder(items: FavoriteTool[]) {
  return items.length ? Math.max(...items.map((i) => i.order)) + 1 : 0;
}

export function favoriteExists(items: FavoriteTool[], toolId: string) {
  return items.some((i) => i.toolId === toolId);
}