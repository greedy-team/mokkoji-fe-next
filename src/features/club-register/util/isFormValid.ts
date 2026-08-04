import isRichTextEmpty from '@/shared/lib/isRichTextEmpty';
import { ClubRegisterFormField, ClubRegisterFormState } from '../model/type';

export default function isFormValid(
  { formData, errors }: ClubRegisterFormState,
  fields: ClubRegisterFormField[],
) {
  const allFilled = fields
    .filter((field) => field.name !== 'instagram')
    .every((field) => {
      const val = formData[field.name as keyof typeof formData];
      if (typeof val !== 'string') return false;

      if (field.type === 'textarea') {
        return !isRichTextEmpty(val);
      }

      return val.trim() !== '';
    });

  const noErrors = Object.values(errors).every((msg) => !msg);
  return allFilled && noErrors;
}
