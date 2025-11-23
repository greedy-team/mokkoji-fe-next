import { useEffect, useRef, useState } from 'react';
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
  const [draggingId, setDraggingId] = useState<string | null>(null);

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

  const handleDragStart = (id: string) => {
    setDraggingId(id);
  };

  const handleDragOver = (
    e: React.DragEvent<HTMLDivElement>,
    targetId: string,
  ) => {
    e.preventDefault();
    if (draggingId === targetId) return;

    setImageFiles((prev) => {
      const draggingIndex = prev.findIndex((item) => item.id === draggingId);
      const targetIndex = prev.findIndex((item) => item.id === targetId);

      const newArr = [...prev];
      const [dragItem] = newArr.splice(draggingIndex, 1);
      newArr.splice(targetIndex, 0, dragItem);
      return newArr;
    });
  };

  const handleDragEnd = () => {
    setDraggingId(null);
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
    setImageFiles,
    handleImageChange,
    handleImageRemove,
    inputRef,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
    draggingId,
    onDragOver,
    onDrop,
    maxLength,
  };
}

export default useImageUpload;
