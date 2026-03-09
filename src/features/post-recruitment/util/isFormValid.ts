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

    return typeof val === 'string' && val.trim() !== '';
  });

  const noErrors = Object.values(errors).every((msg) => !msg);
  return allFilled && noErrors;
}
