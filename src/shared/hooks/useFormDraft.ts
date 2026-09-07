'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import {
  clearDraft as removeDraft,
  readDraft,
  writeDraft,
} from '@/shared/lib/formDraftStorage';

const WRITE_DELAY_MS = 400;

interface UseFormDraftOptions<T> {
  key: string;
  value: T;
  onRestore: (draft: T) => void;
  enabled?: boolean;
}

export default function useFormDraft<T>({
  key,
  value,
  onRestore,
  enabled = true,
}: UseFormDraftOptions<T>) {
  const [isRestored, setIsRestored] = useState(false);
  const onRestoreRef = useRef(onRestore);
  onRestoreRef.current = onRestore;

  useEffect(() => {
    if (!enabled) return;

    const draft = readDraft<T>(key);
    if (draft !== null) onRestoreRef.current(draft);
    setIsRestored(true);
  }, [enabled, key]);

  useEffect(() => {
    if (!enabled || !isRestored) return undefined;

    const timer = setTimeout(() => writeDraft(key, value), WRITE_DELAY_MS);

    const flush = () => {
      clearTimeout(timer);
      writeDraft(key, value);
    };

    window.addEventListener('pagehide', flush);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('pagehide', flush);
    };
  }, [enabled, isRestored, key, value]);

  return useCallback(() => removeDraft(key), [key]);
}
