// src/components/favorites/FavoriteButton.tsx
'use client';

import { memo, useEffect } from 'react';
import { useFavoriteTool } from '@/hooks/useFavoriteTool';
import { cn } from '@/utility/cn';
import { ToolRegistryEntry } from '@/data/tools';
import { useRecentTool } from '@/hooks/useRecentTool';

export const FavoriteButton = memo(function FavoriteButton({
  tool,
}: {
  tool: ToolRegistryEntry;
}) {
    const { isFavorite, toggle } = useFavoriteTool(tool.id);
    const { push } = useRecentTool();

    useEffect(() => {
      push(tool);
    }, [push]);

    return (
      <button
        type="button"
        title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        aria-pressed={isFavorite}
        aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        onClick={() => toggle(tool)}
        className={cn(
          'inline-flex h-7 w-7 items-center justify-center rounded-full border transition-transform duration-200 active:scale-95',
          isFavorite
            ? 'border-yellow-300 bg-orange-400 text-slate-50 hover:bg-orange-500'
            : 'border-border bg-background text-muted-foreground hover:bg-muted'
        )}
      >
        <span
          className={cn(
            'text-3xl leading-none transition-transform duration-200',
            isFavorite && 'scale-110'
          )}
        >
          {isFavorite ? '★' : '☆'}
        </span>
      </button>
    );
});