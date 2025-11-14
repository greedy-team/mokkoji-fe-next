import { useRef, useState } from 'react';

interface ImageItem {
  id: string;
  file: File;
  previewUrl: string;
}

function useImageUpload() {
  const [imageFiles, setImageFiles] = useState<ImageItem[]>([]);
  const inputRef = useRef<HTMLInputElement | null>(null);

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
  };
}

export default useImageUpload;
