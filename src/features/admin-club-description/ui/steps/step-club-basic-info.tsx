import Image from 'next/image';
import Input from '@/shared/ui/input';
import { Button } from '@/shared/ui/button';
import { ClubAffiliationLabel, ClubCategoryLabel } from '@/shared/model/type';
import { ClubFormData } from '../../model/type';

interface StepClubBasicInfoProps {
  formData: ClubFormData;
  errors: Partial<Record<keyof ClubFormData, string>>;
  onChange: (name: keyof ClubFormData, value: string) => void;
  onBlur: (name: keyof ClubFormData) => void;
  preview: string | null;
  onLogoClick: () => void;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputRef: React.RefObject<HTMLInputElement | null>;
}

function StepClubBasicInfo({
  formData,
  errors,
  onChange,
  onBlur,
  preview,
  onLogoClick,
  onFileChange,
  inputRef,
}: StepClubBasicInfoProps) {
  return (
    <div className="flex flex-col gap-7 lg:gap-10">
      <fieldset className="flex flex-col gap-1.5">
        <label
          htmlFor="name"
          className="flex items-center gap-3 text-base font-medium lg:font-semibold"
        >
          동아리 이름
          {errors.name && (
            <p className="pt-1 text-xs font-medium text-red-500">
              {errors.name}
            </p>
          )}
        </label>
        <Input
          id="name"
          name="name"
          value={formData.name}
          variant={errors.name ? 'error' : 'default'}
          onChange={(e) => onChange('name', e.target.value)}
          onBlur={() => onBlur('name')}
        />
      </fieldset>

      <fieldset className="flex flex-col gap-1.5">
        <label
          htmlFor="category"
          className="flex items-center gap-3 text-base font-medium lg:font-semibold"
        >
          카테고리
          {errors.category && (
            <p className="pt-1 text-xs font-medium text-red-500">
              {errors.category}
            </p>
          )}
        </label>
        <div className="mt-2 flex flex-wrap gap-3 lg:gap-5">
          {Object.entries(ClubCategoryLabel).map(([key, label]) => (
            <Button
              variant={
                formData.category === key ? 'optionsSelected' : 'options'
              }
              size="none"
              key={`category-${key}`}
              type="button"
              onClick={() => onChange('category', key)}
              onBlur={() => onBlur('category')}
            >
              {label}
            </Button>
          ))}
        </div>
      </fieldset>

      <fieldset className="flex flex-col gap-1.5">
        <label
          htmlFor="affiliation"
          className="flex items-center gap-3 text-base font-medium lg:font-semibold"
        >
          소속
          {errors.affiliation && (
            <p className="pt-1 text-xs font-medium text-red-500">
              {errors.affiliation}
            </p>
          )}
        </label>
        <div className="mt-2 flex flex-wrap gap-3 lg:gap-5">
          {Object.entries(ClubAffiliationLabel).map(([key, label]) => (
            <Button
              variant={
                formData.affiliation === key ? 'optionsSelected' : 'options'
              }
              size="none"
              key={`affiliation-${key}`}
              type="button"
              onClick={() => onChange('affiliation', key)}
              onBlur={() => onBlur('affiliation')}
            >
              {label}
            </Button>
          ))}
        </div>
      </fieldset>

      <fieldset className="flex flex-col gap-1.5">
        <label
          htmlFor="instagram"
          className="flex items-center gap-3 text-base font-medium lg:font-semibold"
        >
          인스타그램
          {errors.instagram && (
            <p className="pt-1 text-xs font-medium text-red-500">
              {errors.instagram}
            </p>
          )}
        </label>
        <Input
          id="instagram"
          name="instagram"
          value={formData.instagram}
          placeholder="https://www.instagram.com/"
          variant={errors.instagram ? 'error' : 'default'}
          onChange={(e) => onChange('instagram', e.target.value)}
          onBlur={() => onBlur('instagram')}
        />
      </fieldset>

      <div className="my-6 flex">
        <button
          type="button"
          onClick={onLogoClick}
          className="flex h-20 w-20 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-[#F4F4F4]"
        >
          {preview ? (
            <Image
              src={preview}
              alt="미리보기 이미지"
              width={80}
              height={80}
              className="h-20 w-20 rounded-full object-cover"
            />
          ) : (
            <Image
              src="/club-register/cameraIcon.svg"
              alt="이미지 등록"
              width={20}
              height={16}
            />
          )}
        </button>
        <div className="flex flex-1 flex-col items-start justify-center gap-1 p-4">
          <p className="font-bold">동아리 로고 이미지</p>
          <span className="text-xs text-[#00D451]">
            PNG, JPG 형식의 이미지를 업로드해주세요!
          </span>
        </div>
      </div>
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={onFileChange}
        style={{ display: 'none' }}
      />
    </div>
  );
}

export default StepClubBasicInfo;
