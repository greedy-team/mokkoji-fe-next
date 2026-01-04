'use client';

import { X } from 'lucide-react';
import Image from 'next/image';
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
}) {
  return (
    <fieldset>
      <label htmlFor="image" className="text-base font-semibold">
        이미지 파일 업로드
      </label>
      <div
        className="mt-3 flex h-fit w-full cursor-pointer flex-col"
        onDragOver={onDragOver}
        onDrop={onDrop}
      >
        <div className="flex gap-5">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#D9D9D930]">
            <Image
              src="/admin/Image_upload.png"
              alt="이미지 업로드"
              width={20}
              height={20}
            />
          </div>
          <div className="flex flex-col justify-center">
            <span className="text-left text-base font-bold">
              모집 공고 이미지
            </span>
            <span className="text-xs text-[#9D9D9D]">
              PNG, JPG 형식의 이미지를 업로드해주세요!
            </span>
          </div>
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
        {imageFiles.length > 0 && (
          <div className="scrollbar-hide mt-4 flex gap-3 overflow-x-auto">
            {imageFiles.map((item) => (
              <div
                key={item.id}
                draggable
                onDragStart={() => handleDragStart(item.id)}
                onDragOver={(e) => handleDragOver(e, item.id)}
                onDragEnd={handleDragEnd}
                className={cn(
                  'relative h-32 w-32 flex-shrink-0 overflow-hidden rounded-md border transition-all sm:h-40 sm:w-40',
                  draggingId === item.id && 'scale-95 opacity-50',
                )}
              >
                <img
                  src={item.previewUrl}
                  alt="preview"
                  className="pointer-events-none h-full w-full object-contain"
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
