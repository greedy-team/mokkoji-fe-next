import {
  ClubDescriptionFormField,
  ClubDescriptionFormState,
} from '../model/type';

export default function isFormValid(
  { formData, errors }: ClubDescriptionFormState,
  fields: ClubDescriptionFormField[],
) {
  const allFilled = fields
    .filter((field) => field.name !== 'instagram')
    .every((field) => {
      const val = formData[field.name as keyof typeof formData];
      return typeof val === 'string' && val.trim() !== '';
    });

  const noErrors = Object.values(errors).every((msg) => !msg);
  return allFilled && noErrors;
}
