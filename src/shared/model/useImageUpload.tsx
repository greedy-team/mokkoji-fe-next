import { useRef, useState } from 'react';

interface ImageItem {
  id: string;
  file: File;
  previewUrl: string;
}

function useImageUpload() {
  const [imageFiles, setImageFiles] = useState<ImageItem[]>([]);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [draggingId, setDraggingId] = useState<string | null>(null);

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

    const newItems: ImageItem[] = fileArray.map((file) => ({
      id: crypto.randomUUID(),
      file,
      previewUrl: URL.createObjectURL(file),
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
    handleDragStart,
    handleDragOver,
    handleDragEnd,
    draggingId,
  };
}

export default useImageUpload;
