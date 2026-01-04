import Textarea from '@/shared/ui/textarea';
import { RecruitmentFormData } from '../../model/type';

interface ContentRecruitmentProps {
  formData: RecruitmentFormData;
  errors: Partial<Record<keyof RecruitmentFormData, string>>;
  onChange: <K extends keyof RecruitmentFormData>(
    field: K,
    value: RecruitmentFormData[K],
  ) => void;
  onBlur: (field: keyof RecruitmentFormData) => void;
}

function StepContentRecruitment({
  formData,
  errors,
  onChange,
  onBlur,
}: ContentRecruitmentProps) {
  return (
    <>
      <label
        htmlFor="content"
        className="mt-4 flex gap-2 text-base font-semibold"
      >
        모집 공고
        {errors.content && (
          <p className="pt-1 text-xs font-medium text-red-500">
            {errors.content}
          </p>
        )}
      </label>
      <p className="text-xs text-[#00D451]">5000자 이내로 작성해주세요!</p>
      <Textarea
        id="content"
        name="content"
        value={formData.content}
        onChange={(e) => onChange('content', e.target.value)}
        variant={errors.content ? 'error' : 'default'}
        maxLength={5000}
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

export default StepContentRecruitment;
