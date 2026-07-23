// src/components/favorites/RenameFavoriteDialog.tsx
'use client';

import { useState } from 'react';
import { useFavoriteToolStore } from '@/stores/favoriteToolsStore';

export function RenameFavoriteDialog({
  toolId,
  currentName,
  onClose,
}: {
  toolId: string;
  currentName?: string;
  onClose: () => void;
}) {
  const rename = useFavoriteToolStore((s:any) => s.rename);
  const [name, setName] = useState(currentName || '');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-2xl bg-background p-5 shadow-xl">
        <h2 className="text-lg font-semibold">Rename Favorite</h2>
        <label className="mt-4 block text-sm font-medium">Display Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-2 w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-primary"
          placeholder="Display Name"
        />
        <div className="mt-4 flex justify-end gap-2">
          <button onClick={onClose} className="rounded-lg border px-4 py-2">
            Cancel
          </button>
          <button
            onClick={() => {
              rename(toolId, name);
              onClose();
            }}
            className="rounded-lg bg-primary px-4 py-2 text-primary-foreground"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}