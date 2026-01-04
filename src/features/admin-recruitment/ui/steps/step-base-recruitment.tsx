import DateRangePicker from '@/shared/ui/calender/date-range-picker';
import Input from '@/shared/ui/input';
import { ClubInfoType } from '@/shared/model/type';
import ImageUploadSection from '@/shared/ui/image-upload-section';
import { RecruitmentFormData } from '../../model/type';

interface ImageItem {
  id: string;
  file: File;
  previewUrl: string;
  imageName: string;
}

interface BaseRecruitmentProps {
  formData: RecruitmentFormData;
  errors: Partial<Record<keyof RecruitmentFormData, string>>;
  onChange: <K extends keyof RecruitmentFormData>(
    field: K,
    value: RecruitmentFormData[K],
  ) => void;
  onBlur: (field: keyof RecruitmentFormData) => void;
  clubInfo?: ClubInfoType;
  imageFiles: ImageItem[];
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleImageRemove: (id: string) => void;
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
}

function StepBaseRecruitment({
  formData,
  errors,
  onChange,
  onBlur,
  clubInfo,
  imageFiles,
  handleImageChange,
  handleImageRemove,
  inputRef,
  handleDragStart,
  handleDragOver,
  handleDragEnd,
  draggingId,
  onDragOver,
  onDrop,
}: BaseRecruitmentProps) {
  return (
    <div className="flex flex-col gap-10">
      <fieldset>
        <label htmlFor="name" className="text-base font-semibold">
          동아리 이름
        </label>
        <Input id="name" name="name" value={clubInfo?.name} disabled />
      </fieldset>
      <fieldset>
        <label htmlFor="title" className="flex gap-2 text-base font-semibold">
          모집글 제목
          {errors.title && (
            <p className="pt-1 text-xs font-medium text-red-500">
              {errors.title}
            </p>
          )}
        </label>
        <Input
          id="title"
          name="title"
          value={formData.title}
          variant={errors.title ? 'error' : 'default'}
          onChange={(e) => onChange('title', e.target.value)}
          onBlur={() => onBlur('title')}
        />
      </fieldset>
      <fieldset>
        <label
          htmlFor="recruitForm"
          className="flex gap-2 text-base font-semibold"
        >
          모집폼 링크
          {errors.recruitForm && (
            <p className="pt-1 text-xs font-medium text-red-500">
              {errors.recruitForm}
            </p>
          )}
        </label>
        <Input
          id="recruitForm"
          name="recruitForm"
          placeholder="https://example.com"
          value={formData.recruitForm}
          variant={errors.recruitForm ? 'error' : 'default'}
          onChange={(e) => onChange('recruitForm', e.target.value)}
          onBlur={() => onBlur('recruitForm')}
        />
      </fieldset>
      <DateRangePicker
        startDate={formData.recruitStart}
        endDate={formData.recruitEnd}
        onStartDateChange={(date) => onChange('recruitStart', date)}
        onEndDateChange={(date) => onChange('recruitEnd', date)}
        onRangeComplete={() => {
          onBlur('recruitStart');
          onBlur('recruitEnd');
        }}
        label="모집 기간"
        variant="dark"
      />
      <ImageUploadSection
        imageFiles={imageFiles}
        handleImageRemove={handleImageRemove}
        handleImageChange={handleImageChange}
        inputRef={inputRef}
        handleDragStart={handleDragStart}
        handleDragOver={handleDragOver}
        handleDragEnd={handleDragEnd}
        draggingId={draggingId}
        onDragOver={onDragOver}
        onDrop={onDrop}
      />
    </div>
  );
}

export default StepBaseRecruitment;
