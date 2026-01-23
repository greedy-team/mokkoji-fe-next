import Textarea from '@/shared/ui/textarea';
import { ClubFormData } from '../../model/type';

interface StepClubDescriptionProps {
  formData: ClubFormData;
  errors: Partial<Record<keyof ClubFormData, string>>;
  onChange: (name: keyof ClubFormData, value: string) => void;
  onBlur: (name: keyof ClubFormData) => void;
}

function StepClubDescription({
  formData,
  errors,
  onChange,
  onBlur,
}: StepClubDescriptionProps) {
  return (
    <>
      <label
        htmlFor="description"
        className="flex gap-2 text-base font-semibold"
      >
        동아리 소개
        {errors.description && (
          <p className="pb-1 text-sm font-medium text-red-500">
            {errors.description}
          </p>
        )}
      </label>
      <Textarea
        id="description"
        name="description"
        value={formData.description}
        onChange={(e) => onChange('description', e.target.value)}
        variant={errors.description ? 'blackError' : 'blackDefault'}
        maxLength={5000}
        placeholder="5000자 이내로 작성해주세요!"
        className="transition-colors duration-300"
        onBlur={() => onBlur('description')}
      />
      <p className="text-end text-xs text-[#474747]">
        {formData.description.length}{' '}
        <span className="text-[#CCCCCC]">/ 5000자</span>
      </p>
    </>
  );
}

export default StepClubDescription;
