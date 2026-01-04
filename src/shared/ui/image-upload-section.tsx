'use client';

import { X } from 'lucide-react';
import cn from '../lib/utils';

interface ImageItem {
  id: string;
  file: File;
  previewUrl: string;
}

function ImageUploadSection({
  imageFiles,
  handleImageRemove,
  handleImageChange,
  inputRef,
  handleDragStart,
  handleDragOver,
  handleDragEnd,
  draggingId,
  onDragOver,
  onDrop,
  maxLength = 20,
}: {
  imageFiles: ImageItem[];
  handleImageRemove: (id: string) => void;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputRef: React.RefObject<HTMLInputElement | null>;
  handleDragStart: (id: string) => void;
  handleDragOver: (
    e: React.DragEvent<HTMLDivElement>,
    targetId: string,
  ) => void;
  handleDragEnd: () => void;
  draggingId: string | null;
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  maxLength?: number;
}) {
  return (
    <fieldset>
      <label htmlFor="image" className="mt-4 text-base font-semibold">
        이미지 파일 업로드
      </label>

      <div
        className={cn(
          'mt-2 rounded-md border-2 border-transparent bg-[#D9D9D920] px-4 py-3 transition-all',
          imageFiles.length > 0 && 'border-[#00D451]',
        )}
        onDragOver={onDragOver}
        onDrop={onDrop}
      >
        <div className="flex justify-between">
          <label
            htmlFor="imageInput"
            className="cursor-pointer text-sm text-gray-700"
          >
            {`이미지 선택: ${
              imageFiles.length > 0
                ? imageFiles[imageFiles.length - 1].file.name
                : ''
            }`}
          </label>{' '}
          <span className="text-xs text-[#474747]">
            {`${imageFiles.length}/${maxLength}`}
          </span>
        </div>

        <input
          id="imageInput"
          name="image"
          type="file"
          accept="image/*"
          ref={inputRef}
          multiple
          onChange={handleImageChange}
          className="hidden"
        />
        <p className="text-primary-500 text-xs">다중 선택 가능</p>

        {imageFiles.length > 0 && (
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {imageFiles.map((item) => (
              <div
                key={item.id}
                draggable
                onDragStart={() => handleDragStart(item.id)}
                onDragOver={(e) => handleDragOver(e, item.id)}
                onDragEnd={handleDragEnd}
                className={cn(
                  'relative h-32 w-full overflow-hidden rounded-md border transition-all sm:h-40',
                  draggingId === item.id && 'scale-95 opacity-50',
                )}
              >
                <img
                  src={item.previewUrl}
                  alt="preview"
                  className="pointer-events-none h-full w-full object-cover"
                />

                <X
                  className="absolute top-1 right-1 z-10 h-5 w-5 cursor-pointer transition-colors hover:text-red-600"
                  onClick={() => handleImageRemove(item.id)}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </fieldset>
  );
}

export default ImageUploadSection;
