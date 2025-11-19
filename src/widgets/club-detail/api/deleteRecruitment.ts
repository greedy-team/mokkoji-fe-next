'use server';

import api from '@/shared/api/auth-api';
import { revalidateTag } from 'next/cache';
import ErrorHandler from '@/shared/lib/error-message';
import { RecruitmentDeleteResponse } from '@/features/post-recruitment/model/type';

async function deleteRecruitmentForm(
  clubId: number,
): Promise<RecruitmentDeleteResponse> {
  try {
    const response = await api
      .delete(`recruitments/${clubId}`)
      .json<RecruitmentDeleteResponse>();
    revalidateTag('recruitments');
    revalidateTag(String(clubId));
    return { ok: true, message: '등록이 완료되었습니다.', data: response.data };
  } catch (e) {
    return ErrorHandler(e as Error);
  }
}

export default deleteRecruitmentForm;
