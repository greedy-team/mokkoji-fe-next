import { StateProp } from '../model/type';

export default function isFormValid({ formData, errors }: StateProp) {
  const allFilled = Object.entries(formData).every(([_, val]) => {
    return typeof val !== 'string' || val.trim() !== '';
  });
  const noErrors = Object.values(errors).every((msg) => !msg);
  return allFilled && noErrors;
}
