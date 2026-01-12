import Textarea from '@/shared/ui/textarea';
import { RecruitmentFormData } from '../../model/type';

interface StepRecruitmentPostInfoProps {
  formData: RecruitmentFormData;
  errors: Partial<Record<keyof RecruitmentFormData, string>>;
  onChange: <K extends keyof RecruitmentFormData>(
    field: K,
    value: RecruitmentFormData[K],
  ) => void;
  onBlur: (field: keyof RecruitmentFormData) => void;
}

function StepRecruitmentPostInfo({
  formData,
  errors,
  onChange,
  onBlur,
}: StepRecruitmentPostInfoProps) {
  return (
    <>
      <label htmlFor="content" className="flex gap-2 text-base font-semibold">
        {errors.content && (
          <p className="pb-1 text-sm font-medium text-red-500">
            {errors.content}
          </p>
        )}
      </label>
      <Textarea
        id="content"
        name="content"
        value={formData.content}
        onChange={(e) => onChange('content', e.target.value)}
        variant={errors.content ? 'blackError' : 'blackDefault'}
        maxLength={5000}
        placeholder="5000자 이내로 작성해주세요!"
        className="transition-colors duration-300"
        onBlur={() => onBlur('content')}
      />
      <p className="text-end text-xs text-[#474747]">
        {formData.content.length}{' '}
        <span className="text-[#CCCCCC]">/ 5000자</span>
      </p>
    </>
  );
}

export default StepRecruitmentPostInfo;
