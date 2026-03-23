'use client';

import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  horizontalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { X, Upload } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import cn from '../lib/utils';

interface ImageItem {
  id: string;
  file: File;
  previewUrl: string;
}

function SortableImage({
  item,
  onRemove,
}: {
  item: ImageItem;
  onRemove: (id: string) => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    touchAction: 'none' as const,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={cn(
        'relative h-32 w-32 flex-shrink-0 overflow-hidden rounded-md border transition-all sm:h-40 sm:w-40',
        isDragging && 'scale-95 opacity-50',
      )}
    >
      <img
        src={item.previewUrl}
        alt="preview"
        className="pointer-events-none h-full w-full object-contain"
      />
      <X
        className="absolute top-1 right-1 z-10 h-5 w-5 cursor-pointer transition-colors hover:text-red-600"
        onPointerDown={(e) => e.stopPropagation()}
        onClick={() => onRemove(item.id)}
      />
    </div>
  );
}

function ImageUploadSection({
  imageFiles,
  handleImageRemove,
  handleImageChange,
  inputRef,
  handleSortEnd,
  onDragOver,
  onDrop,
}: {
  imageFiles: ImageItem[];
  handleImageRemove: (id: string) => void;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputRef: React.RefObject<HTMLInputElement | null>;
  handleSortEnd: (activeId: string, overId: string) => void;
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
}) {
  const [isDragActive, setIsDragActive] = useState(false);
  const [activeItem, setActiveItem] = useState<ImageItem | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 250, tolerance: 10 },
    }),
  );

  const handleDragStart = (event: DragStartEvent) => {
    const found = imageFiles.find((item) => item.id === event.active.id);
    setActiveItem(found ?? null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveItem(null);
    if (over && active.id !== over.id) {
      handleSortEnd(String(active.id), String(over.id));
    }
  };

  const handleDragEnter = (e: React.DragEvent<HTMLFieldSetElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.types.includes('Files')) {
      setIsDragActive(true);
    }
  };

  const handleDragLeave = (e: React.DragEvent<HTMLFieldSetElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    const { clientX: x, clientY: y } = e;
    if (
      x <= rect.left ||
      x >= rect.right ||
      y <= rect.top ||
      y >= rect.bottom
    ) {
      setIsDragActive(false);
    }
  };

  const handleDropWithOverlay = (e: React.DragEvent<HTMLDivElement>) => {
    setIsDragActive(false);
    onDrop(e);
  };

  const handleDragOverWithOverlay = (e: React.DragEvent<HTMLDivElement>) => {
    onDragOver(e);
  };

  return (
    <fieldset
      className="relative w-full min-w-0"
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
    >
      {isDragActive && (
        <div
          className="absolute inset-0 z-50 flex items-center justify-center rounded-lg border-2 border-dashed border-[#00D451] bg-black/80 backdrop-blur-sm"
          onDragOver={handleDragOverWithOverlay}
          onDrop={handleDropWithOverlay}
        >
          <div className="pointer-events-none flex flex-col items-center gap-3">
            <Upload className="h-12 w-12 text-[#00D451]" />
            <p className="text-lg font-semibold text-white">
              이미지를 여기에 드롭하세요
            </p>
          </div>
        </div>
      )}
      <label htmlFor="image" className="text-base font-medium lg:font-semibold">
        이미지 파일 업로드
      </label>
      <div
        className="mt-3 flex h-fit w-full cursor-pointer flex-col"
        onDragOver={handleDragOverWithOverlay}
        onDrop={handleDropWithOverlay}
      >
        <button
          type="button"
          className="flex cursor-pointer gap-5"
          onClick={() => inputRef.current?.click()}
        >
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
        </button>
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
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={imageFiles.map((item) => item.id)}
              strategy={horizontalListSortingStrategy}
            >
              <div className="scrollbar-hide mt-4 flex w-full max-w-full gap-3 overflow-x-auto">
                {imageFiles.map((item) => (
                  <SortableImage
                    key={item.id}
                    item={item}
                    onRemove={handleImageRemove}
                  />
                ))}
              </div>
            </SortableContext>
            <DragOverlay>
              {activeItem && (
                <div className="h-32 w-32 overflow-hidden rounded-md border opacity-90 shadow-lg sm:h-40 sm:w-40">
                  <img
                    src={activeItem.previewUrl}
                    alt="dragging"
                    className="h-full w-full object-contain"
                  />
                </div>
              )}
            </DragOverlay>
          </DndContext>
        )}
      </div>
    </fieldset>
  );
}

export default ImageUploadSection;
