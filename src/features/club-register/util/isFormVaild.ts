import { UserRole } from '@/shared/model/type';
import { StateProp } from '../model/type';

export default function isFormValid(
  { formData, errors }: StateProp,
  role: string,
) {
  const isClubMaster = role === UserRole.CLUB_MASTER;

  const requiredFields = isClubMaster
    ? [
        'name',
        'category',
        'affiliation',
        'description',
        'leaderId',
        'instagram',
      ]
    : ['name', 'category', 'affiliation', 'leaderId'];

  const allFilled = requiredFields.every((key) => {
    const val = formData[key as keyof typeof formData];
    return typeof val !== 'string' || val.trim() !== '';
  });

  const noErrors = Object.values(errors).every((msg) => !msg);

  return allFilled && noErrors;
}
