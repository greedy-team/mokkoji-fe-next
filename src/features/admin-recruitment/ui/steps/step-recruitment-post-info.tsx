import RichTextEditor from '@/shared/ui/RichTextEditor';
import { RecruitmentFormData } from '../../model/type';

interface StepRecruitmentPostInfoProps {
  formData: RecruitmentFormData;
  errors: Partial<Record<keyof RecruitmentFormData, string>>;
  onChange: <K extends keyof RecruitmentFormData>(
    field: K,
    value: RecruitmentFormData[K],
  ) => void;
}

function StepRecruitmentPostInfo({
  formData,
  errors,
  onChange,
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
      <RichTextEditor
        initialContent={formData.content}
        placeholder="5000자 이내로 작성해주세요!"
        onChange={(html) => onChange('content', html)}
      />
    </>
  );
}

export default StepRecruitmentPostInfo;
