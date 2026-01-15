import { ClubFormData } from '../model/type';

function getValidationError(name: keyof ClubFormData, value: string): string {
  if (name !== 'instagram' && !value.trim()) {
    return '필수 입력 항목입니다.';
  }

  if (
    name === 'instagram' &&
    value.trim() !== '' &&
    !/^https:\/\/www\.instagram\.com\/[a-zA-Z0-9._]+\/?$/.test(value)
  ) {
    return '올바른 인스타그램 계정 URL을 입력해주세요.';
  }

  if (name === 'clubMasterStudentId' && !/^[0-9]{8}$/.test(value)) {
    return '동아리 회장의 학번 8자리를 입력해주세요.';
  }

  return '';
}

export default getValidationError;
