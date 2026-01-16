'use server';

import api from '@/shared/api/auth-api';
import { revalidateTag } from 'next/cache';
import ErrorHandler from '@/shared/lib/error-message';

async function deleteRecruitmentForm(recruitmentId: number) {
  try {
    await api.delete(`recruitments/${recruitmentId}`);
    revalidateTag('recruitments');
    return { ok: true, message: '삭제가 완료되었습니다.' };
  } catch (e) {
    return ErrorHandler(e as Error);
  }
}

export default deleteRecruitmentForm;
