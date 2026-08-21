'use client';

import { useCallback, useRef, useState, type DragEvent, type ChangeEvent } from 'react';
import { UploadCloud } from 'lucide-react';
import { clsx } from 'clsx';

interface DropZoneProps {
  onFiles: (files: File[]) => void;
  allowMultiple?: boolean;
  /** Accept string for the native file input (e.g. all files, or a narrower filter) */
  validFileTypes?: string;
  maxSizeBytes?: number;
}

export function PrivacyDropZone({ onFiles, allowMultiple = false, validFileTypes = '*/*', maxSizeBytes }: DropZoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [sizeError, setSizeError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const MAX_FILE_SIZE_BYTES = 250 * 1024 * 1024; // 250 MB
  
  const handleFilesList = useCallback(
    (list: FileList | null) => {
      if (!list || list.length === 0) return;
      const files = Array.from(list);
      const first = files[0];
      
      if (!first) return;
        const tooBig = files.find(
        (file) => file.size > MAX_FILE_SIZE_BYTES
      );

      if (tooBig) {
        setSizeError(
          `"${tooBig.name}" exceeds the maximum file size of 250 MB.`
        );
        return;
      }
      setSizeError(null);
      onFiles(allowMultiple ? files : [first]);
    },
    [allowMultiple, maxSizeBytes, onFiles]
  );

  const onDrop = useCallback(
    (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragging(false);
      handleFilesList(e.dataTransfer.files);
    },
    [handleFilesList]
  );

  const onDragOver = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const onDragLeave = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const onInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      handleFilesList(e.target.files);
      e.target.value = '';
    },
    [handleFilesList]
  );

  return (
    <div>
      <div
        role="button"
        tabIndex={0}
        aria-label="Drag and drop a file here, or press Enter to browse your device"
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            inputRef.current?.click();
          }
        }}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        className={clsx(
          'group relative flex cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed px-4 py-10 text-center transition-all duration-200 sm:py-14',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b0f1a]',
          isDragging ? 'border-blue-400 bg-blue-400/10 scale-[1.01]' : 'border-white/15 bg-white/[0.02] hover:border-blue-400/40 hover:bg-white/[0.04]'
        )}
      >
        <div
          className={clsx(
            'flex h-14 w-14 items-center justify-center rounded-full border transition-colors sm:h-16 sm:w-16',
            isDragging ? 'border-blue-400/50 bg-blue-400/20' : 'border-white/10 bg-white/5 group-hover:border-blue-400/30'
          )}
        >
          <UploadCloud className="h-6 w-6 text-blue-300 sm:h-7 sm:w-7" aria-hidden="true" />
        </div>

        <div>
          <p className="text-sm font-medium text-white sm:text-base">
            {isDragging ? 'Drop it here' : 'Drag & drop your file'}
          </p>
          <p className="mt-1 text-xs text-white/50 sm:text-sm">
            or <span className="text-blue-300 underline underline-offset-2">browse your device</span> — PDF, image, text, and more
          </p>
        </div>

        <p className="text-[11px] text-white/30">Processed entirely on your device. Nothing is uploaded.</p>

        <input
          ref={inputRef}
          type="file"
          accept={validFileTypes}
          multiple={allowMultiple}
          onChange={onInputChange}
          className="sr-only"
          aria-hidden="true"
        />
      </div>
      {sizeError && (
        <p role="alert" className="mt-2 text-xs text-red-300">
          {sizeError}
        </p>
      )}
    </div>
  );
}
