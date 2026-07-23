// src/components/favorites/FavoriteEmpty.tsx
export function FavoriteEmpty() {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed p-8 text-center text-sm text-muted-foreground">
      <div className="text-3xl">⭐</div>
      <p className="mt-3 font-medium text-foreground">No favorite tools yet.</p>
      <p className="mt-1 max-w-xs">
        Favorite tools you use often for quick access.
      </p>
    </div>
  );
}