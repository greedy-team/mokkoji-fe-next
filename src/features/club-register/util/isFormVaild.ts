import { FormField, StateProp } from '../model/type';

export default function isFormValid(
  { formData, errors }: StateProp,
  fields: FormField[],
) {
  const allFilled = fields.every((field) => {
    const val = formData[field.name as keyof typeof formData];
    return typeof val === 'string' && val.trim() !== '';
  });

  const noErrors = Object.values(errors).every((msg) => !msg);
  return allFilled && noErrors;
}
