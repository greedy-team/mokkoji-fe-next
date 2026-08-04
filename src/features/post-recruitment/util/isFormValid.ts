import isRichTextEmpty from '@/shared/lib/isRichTextEmpty';
import { RecruitmentFormField, RecruitmentFormState } from '../model/type';

export default function isFormValid(
  { formData, errors }: RecruitmentFormState,
  fields: RecruitmentFormField[],
) {
  const allFilled = fields.every((field) => {
    const val = formData[field.name as keyof typeof formData];

    if (Array.isArray(val)) {
      return val.length > 0;
    }

    if (typeof val !== 'string') return false;

    if (field.type === 'textarea') {
      return !isRichTextEmpty(val);
    }

    return val.trim() !== '';
  });

  const noErrors = Object.values(errors).every((msg) => !msg);
  return allFilled && noErrors;
}
