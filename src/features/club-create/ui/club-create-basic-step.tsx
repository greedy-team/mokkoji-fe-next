import Image from 'next/image';
import Input from '@/shared/ui/input';
import { Button } from '@/shared/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/select';
import {
  ClubAffiliation,
  ClubAffiliationLabel,
  ClubCategory,
  ClubCategoryIcon,
  ClubCategoryToStringLabel,
} from '@/shared/model/type';
import type { University } from '@/entities/university/model/type';
import { urlCodeToApiCode } from '@/shared/lib/universityMeta';
import type { ClubCreateFormData } from './club-crete-form';

interface ClubCreateBasicStepProps {
  formData: ClubCreateFormData;
  setFormData: React.Dispatch<React.SetStateAction<ClubCreateFormData>>;
  logoPreview: string | null;
  logoInputRef: React.RefObject<HTMLInputElement | null>;
  handleLogoChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isConfirmed: boolean;
  setIsConfirmed: React.Dispatch<React.SetStateAction<boolean>>;
  onNext: () => void;
  universities: University[];
}

function ClubCreateBasicStep({
  formData,
  setFormData,
  logoPreview,
  logoInputRef,
  handleLogoChange,
  isConfirmed,
  setIsConfirmed,
  onNext,
  universities,
}: ClubCreateBasicStepProps) {
  const isValid =
    formData.clubName !== '' &&
    formData.universityCode !== '' &&
    formData.clubCategory !== '';

  return (
    <div className="flex flex-col gap-6 py-8">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="club-name" className="text-sm">
          동아리명
        </label>
        <Input
          id="club-name"
          placeholder="모꼬지"
          value={formData.clubName}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, clubName: e.target.value }))
          }
          className="rounded-lg border border-[#D6D6D6] bg-white px-4 py-3 text-sm placeholder:text-[#C0C0C0]"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="club-school" className="text-sm">
          학교
        </label>
        <Select
          value={formData.universityCode}
          onValueChange={(value) =>
            setFormData((prev) => ({
              ...prev,
              universityCode: urlCodeToApiCode(value),
            }))
          }
        >
          <SelectTrigger
            id="club-school"
            className="h-auto w-full rounded-lg border border-[#D6D6D6] bg-white py-5 indent-1.5 text-sm transition-colors duration-200 focus:border-[#00E457] data-[placeholder]:text-[#9C9C9C]"
          >
            <SelectValue
              placeholder="모꼬지대학교"
              className="placeholder:text-[#C0C0C0]"
            />
          </SelectTrigger>
          <SelectContent>
            {universities.map(({ code, name }) => (
              <SelectItem key={code} value={code}>
                {name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-3">
        <p className="text-sm">소속</p>
        <div className="flex flex-wrap gap-3">
          {(
            Object.entries(ClubAffiliationLabel) as [ClubAffiliation, string][]
          ).map(([key, label]) => {
            const isSelected = formData.clubAffiliation === key;
            return (
              <Button
                key={key}
                type="button"
                variant={isSelected ? 'optionsSelected' : 'options'}
                size="none"
                className={`px-4 py-2.5 text-sm ${isSelected ? 'border-[#22CF64] text-[#22CF64]' : 'border-[#F8F8F8] bg-[#F8F8F8] text-[#8B95A1]'}`}
                onClick={() =>
                  setFormData((prev) => ({ ...prev, clubAffiliation: key }))
                }
              >
                {label}
              </Button>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <p className="text-sm">카테고리</p>
        <div className="flex flex-wrap gap-3">
          {(
            Object.entries(ClubCategoryToStringLabel) as [
              ClubCategory,
              string,
            ][]
          ).map(([key, label]) => {
            const isSelected = formData.clubCategory === key;
            const iconSrc = ClubCategoryIcon[key];
            return (
              <Button
                key={key}
                type="button"
                variant={isSelected ? 'optionsSelected' : 'options'}
                size="none"
                className={`px-4 py-2.5 text-sm ${isSelected ? 'border-[#22CF64] text-[#22CF64]' : 'border-[#F8F8F8] bg-[#F8F8F8] text-[#8B95A1]'}`}
                onClick={() =>
                  setFormData((prev) => ({ ...prev, clubCategory: key }))
                }
              >
                {label}
                {iconSrc && (
                  <Image src={iconSrc} alt={label} width={16} height={16} />
                )}
              </Button>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <button
          type="button"
          className="flex items-center gap-4"
          onClick={() => logoInputRef.current?.click()}
        >
          <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-[#F8F8F8]">
            {logoPreview ? (
              <Image
                src={logoPreview}
                alt="동아리 로고"
                width={64}
                height={64}
                className="h-full w-full object-cover"
                unoptimized
              />
            ) : (
              <Image
                src="/club-application/camera.svg"
                alt="이미지등록"
                width={20}
                height={16}
              />
            )}
          </div>
          <div className="flex flex-col items-start gap-0.5">
            <span className="text-sm">
              동아리 로고{' '}
              <span className="font-normal text-[#1AE166]">(선택)</span>
            </span>
            <span className="text-xs text-[#9C9C9C]">
              PNG, JPG 형식의 이미지를 업로드해주세요!
            </span>
          </div>
        </button>
        <input
          ref={logoInputRef}
          type="file"
          accept="image/png, image/jpeg"
          className="hidden"
          onChange={handleLogoChange}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="club-instagram" className="text-sm">
          인스타그램 주소{' '}
          <span className="font-normal text-[#1AE166]">(선택)</span>
        </label>
        <Input
          className="rounded-lg border border-[#D6D6D6] bg-white px-4 py-3 text-sm placeholder:text-[#C0C0C0]"
          id="club-instagram"
          placeholder="https://www.instagram.com/mokkoji"
          value={formData.instagram}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, instagram: e.target.value }))
          }
        />
      </div>

      <div className="flex flex-col gap-3">
        <p className="text-sm leading-relaxed text-[#474747]">
          신청 전, 해당 동아리가 이미 등록되어 있는지 확인해주세요.
          <br />
          중복 신청 시 승인이 제한될 수 있습니다.
        </p>
        <label className="flex cursor-pointer items-center gap-2">
          <input
            type="checkbox"
            checked={isConfirmed}
            onChange={() => setIsConfirmed(!isConfirmed)}
            className="h-4 w-4 cursor-pointer"
          />
          <span className="text-sm text-[#474747]">확인했어요.</span>
        </label>
      </div>

      <Button
        type="button"
        variant="submit-default"
        disabled={!isValid || !isConfirmed}
        onClick={onNext}
        className="mt-2 rounded-xl bg-[#4AF38A] py-6 font-normal text-[#474747] disabled:text-white"
      >
        다음
      </Button>
    </div>
  );
}

export default ClubCreateBasicStep;
