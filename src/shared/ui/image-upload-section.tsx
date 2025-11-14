import cn from '../lib/utils';
import { Button } from './button';

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
}: {
  imageFiles: ImageItem[];
  handleImageRemove: (id: string) => void;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputRef: React.RefObject<HTMLInputElement | null>;
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
                className="relative h-32 w-full overflow-hidden rounded-md border sm:h-40"
              >
                <img
                  src={item.previewUrl}
                  alt="preview"
                  className="h-full w-full object-cover"
                />

                <Button
                  type="button"
                  variant="delete"
                  className="absolute top-1 right-1 h-[20px] w-[50px]"
                  onClick={() => handleImageRemove(item.id)}
                >
                  삭제
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default ImageUploadSection;
