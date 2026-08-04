import RichTextEditor from '@/shared/ui/RichTextEditor';
import { ClubFormData } from '../../model/type';

interface StepClubDescriptionProps {
  formData: ClubFormData;
  errors: Partial<Record<keyof ClubFormData, string>>;
  onChange: (name: keyof ClubFormData, value: string) => void;
}

function StepClubDescription({
  formData,
  errors,
  onChange,
}: StepClubDescriptionProps) {
  return (
    <>
      <label
        htmlFor="description"
        className="flex gap-2 text-base font-semibold"
      >
        {errors.description && (
          <p className="pb-1 text-sm font-medium text-red-500">
            {errors.description}
          </p>
        )}
      </label>
      <RichTextEditor
        initialContent={formData.description}
        onChange={(html) => onChange('description', html)}
      />
    </>
  );
}

export default StepClubDescription;
