import { useEffect, useRef, useState } from 'react';
import { arrayMove } from '@dnd-kit/sortable';
import { toast } from 'react-toastify';

interface ImageItem {
  id: string;
  file: File;
  previewUrl: string;
  imageName: string;
}

async function urlToFile(url: string, fileName: string): Promise<File> {
  const res = await fetch(url);
  const blob = await res.blob();
  return new File([blob], fileName, { type: blob.type });
}

function useImageUpload(imageUrls: string[] = [], maxLength: number = 20) {
  const [imageFiles, setImageFiles] = useState<ImageItem[]>([]);
  const inputRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    if (imageUrls.length === 0) return;

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
  }, [imageUrls]);

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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (!files) return;
    const fileArray = Array.from(files);

    if (imageFiles.length + fileArray.length > maxLength) {
      toast.warn(`이미지는 최대 ${maxLength}개까지만 업로드할 수 있습니다.`);
      return;
    }

    const newItems: ImageItem[] = fileArray.map((file) => ({
      id: crypto.randomUUID(),
      file,
      previewUrl: URL.createObjectURL(file),
      imageName: file.name,
    }));

    setImageFiles((prev) => [...prev, ...newItems]);
  };

  const handleImageRemove = (id: string) => {
    setImageFiles((prev) => {
      const target = prev.find((item) => item.id === id);
      if (target) URL.revokeObjectURL(target.previewUrl);

      if (prev.length === 1 && inputRef.current) {
        inputRef.current.value = '';
      }

      return prev.filter((item) => item.id !== id);
    });
  };

  return {
    imageFiles,
    handleImageChange,
    handleImageRemove,
    inputRef,
    handleSortEnd,
    onDragOver,
    onDrop,
    maxLength,
  };
}

export default useImageUpload;
