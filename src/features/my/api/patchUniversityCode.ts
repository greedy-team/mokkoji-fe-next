'use server';

import api from '@/shared/api/auth-api';
import createErrorResponse from '@/shared/lib/error-message';
import { revalidateTag } from 'next/cache';

async function patchUniversityCode(universityCode: string | null) {
  const body =
    universityCode === null
      ? { clearUniversityCode: true }
      : { universityCode };

  try {
    const response = await api.patch('users', {
      json: body,
    });

    const data = await response.json();
    revalidateTag('users');
    return { ok: true, message: '학교 정보가 변경되었습니다.', data };
  } catch (e) {
    return createErrorResponse(e as Error);
  }
}

export default patchUniversityCode;
