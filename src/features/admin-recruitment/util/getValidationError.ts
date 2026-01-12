import { RecruitmentFormData } from '../model/type';

function getValidationError(
  name: keyof RecruitmentFormData,
  value: string,
): string {
  if (!value.trim()) {
    return '필수 입력 항목입니다.';
  }

  if (name === 'recruitForm' && !/^https:\/\//.test(value)) {
    return '올바른 모집 신청 폼 링크를 입력해주세요.';
  }

  return '';
}

export default getValidationError;
