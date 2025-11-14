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
}) {
  return (
    <>
      <label htmlFor="image" className="mt-4 font-bold">
        이미지 파일 업로드
      </label>

      <div
        className={cn(
          'mt-2 rounded-md border-2 px-4 py-3',
          imageFiles.length > 0 && 'border-[#00D451]',
        )}
      >
        <input
          name="image"
          type="file"
          accept="image/*"
          ref={inputRef}
          multiple
          onChange={handleImageChange}
          className="flex cursor-pointer items-center justify-center text-sm"
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
    </>
  );
}

export default ImageUploadSection;
