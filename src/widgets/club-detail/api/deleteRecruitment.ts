'use server';

import api from '@/shared/api/auth-api';
import { revalidateTag } from 'next/cache';
import createErrorResponse from '@/shared/lib/error-message';
import { RecruitmentDeleteResponse } from '@/features/post-recruitment/model/type';

async function deleteRecruitment(
  clubId: number,
): Promise<RecruitmentDeleteResponse> {
  try {
    const response = await api
      .delete(`recruitments/${clubId}`)
      .json<RecruitmentDeleteResponse>();
    revalidateTag('recruitments');
    revalidateTag(String(clubId));
    return { ok: true, message: '삭제가 완료되었습니다.', data: response.data };
  } catch (e) {
    return createErrorResponse(e as Error);
  }
}

export default deleteRecruitment;
