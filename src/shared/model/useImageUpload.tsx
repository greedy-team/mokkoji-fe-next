import { useCallback, useEffect, useRef, useState } from 'react';
import { arrayMove } from '@dnd-kit/sortable';
import { toast } from 'react-toastify';
import {
  clearDraft,
  deserializeFile,
  readDraft,
  serializeFile,
  writeDraft,
  type SerializedFile,
} from '../lib/formDraftStorage';
import convertImageToWebp, {
  RECRUITMENT_IMAGE_MAX_DIMENSION,
} from '../lib/convertImageToWebp';

const CONVERT_CONCURRENCY = 3;
const DRAFT_WRITE_DELAY_MS = 600;

interface ImageItem {
  id: string;
  file: File;
  previewUrl: string;
  imageName: string;
}

interface DraftImageItem {
  id: string;
  imageName: string;
  serialized: SerializedFile;
}

async function urlToFile(url: string, fileName: string): Promise<File> {
  const res = await fetch(url);
  const blob = await res.blob();
  return new File([blob], fileName, { type: blob.type });
}

function useImageUpload(
  imageUrls: string[] = [],
  maxLength: number = 20,
  draftKey?: string,
) {
  const [imageFiles, setImageFiles] = useState<ImageItem[]>([]);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isDraftRestored, setIsDraftRestored] = useState(!draftKey);
  const hasDraftRef = useRef(false);
  const serializedCacheRef = useRef(new Map<string, SerializedFile>());

  useEffect(() => {
    if (!draftKey) return;

    const draft = readDraft<DraftImageItem[]>(draftKey);

    if (draft && draft.length > 0) {
      hasDraftRef.current = true;
      setImageFiles(
        draft.map((item) => {
          const file = deserializeFile(item.serialized);
          serializedCacheRef.current.set(item.id, item.serialized);

          return {
            id: item.id,
            file,
            previewUrl: URL.createObjectURL(file),
            imageName: item.imageName,
          };
        }),
      );
    }

    setIsDraftRestored(true);
  }, [draftKey]);

  useEffect(() => {
    if (!draftKey || !isDraftRestored) return undefined;

    const timer = setTimeout(async () => {
      const cache = serializedCacheRef.current;
      const draft: DraftImageItem[] = await Promise.all(
        imageFiles.map(async (item) => {
          const cached = cache.get(item.id);
          const serialized = cached ?? (await serializeFile(item.file));
          cache.set(item.id, serialized);

          return { id: item.id, imageName: item.imageName, serialized };
        }),
      );

      writeDraft(draftKey, draft);
    }, DRAFT_WRITE_DELAY_MS);

    const flush = () => {
      const cache = serializedCacheRef.current;
      const cached = imageFiles.filter((item) => cache.has(item.id));
      if (cached.length !== imageFiles.length) return;

      clearTimeout(timer);
      writeDraft(
        draftKey,
        cached.map((item) => ({
          id: item.id,
          imageName: item.imageName,
          serialized: cache.get(item.id)!,
        })),
      );
    };

    window.addEventListener('pagehide', flush);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('pagehide', flush);
    };
  }, [draftKey, isDraftRestored, imageFiles]);

  useEffect(() => {
    if (imageUrls.length === 0 || hasDraftRef.current || !isDraftRestored)
      return;

    const loadInitialImages = async () => {
      const items: ImageItem[] = await Promise.all(
        imageUrls.map(async (url) => {
          const imageName = url.split('/').pop()!.split('?')[0];

          const file = await urlToFile(url, imageName);

          return {
            id: crypto.randomUUID(),
            file,
            previewUrl: URL.createObjectURL(file),
            imageName,
          };
        }),
      );

      setImageFiles(items);
    };

    loadInitialImages();
  }, [imageUrls, isDraftRestored]);

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const { files } = e.dataTransfer;
    if (!files || files.length === 0) return;

    const syntheticEvent = {
      target: { files },
    } as React.ChangeEvent<HTMLInputElement>;

    handleImageChange(syntheticEvent);
  };

  const handleSortEnd = (activeId: string, overId: string) => {
    setImageFiles((prev) => {
      const oldIndex = prev.findIndex((item) => item.id === activeId);
      const newIndex = prev.findIndex((item) => item.id === overId);
      return arrayMove(prev, oldIndex, newIndex);
    });
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (!files) return;
    const fileArray = Array.from(files);

    if (imageFiles.length + fileArray.length > maxLength) {
      toast.warn(`이미지는 최대 ${maxLength}개까지만 업로드할 수 있습니다.`);
      return;
    }

    for (
      let index = 0;
      index < fileArray.length;
      index += CONVERT_CONCURRENCY
    ) {
      const batch = fileArray.slice(index, index + CONVERT_CONCURRENCY);

      // 한 번에 전부 변환하면 원본 비트맵이 동시에 메모리에 올라와 모바일에서 탭이 죽는다
      // eslint-disable-next-line no-await-in-loop
      const convertedBatch: ImageItem[] = await Promise.all(
        batch.map(async (file) => {
          const webpFile = await convertImageToWebp(
            file,
            RECRUITMENT_IMAGE_MAX_DIMENSION,
          );

          return {
            id: crypto.randomUUID(),
            file: webpFile,
            previewUrl: URL.createObjectURL(webpFile),
            imageName: webpFile.name,
          };
        }),
      );

      setImageFiles((prev) => [...prev, ...convertedBatch]);
    }
  };

  const handleImageRemove = (id: string) => {
    serializedCacheRef.current.delete(id);

    setImageFiles((prev) => {
      const target = prev.find((item) => item.id === id);
      if (target) URL.revokeObjectURL(target.previewUrl);

      if (prev.length === 1 && inputRef.current) {
        inputRef.current.value = '';
      }

      return prev.filter((item) => item.id !== id);
    });
  };

  const clearImageDraft = useCallback(() => {
    if (draftKey) clearDraft(draftKey);
  }, [draftKey]);

  return {
    imageFiles,
    handleImageChange,
    handleImageRemove,
    inputRef,
    handleSortEnd,
    onDragOver,
    onDrop,
    maxLength,
    clearImageDraft,
  };
}

export default useImageUpload;
