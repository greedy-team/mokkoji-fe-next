import { ClubFormData } from '../model/type';

function getValidationError(name: keyof ClubFormData, value: string): string {
  if (name === 'clubMasterStudentId' && !/^[0-9]{8}$/.test(value)) {
    return '동아리 회장의 학번 8자리를 입력해주세요.';
  }

  return '';
}

export default getValidationError;
