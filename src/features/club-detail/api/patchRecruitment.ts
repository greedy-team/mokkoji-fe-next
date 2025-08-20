'use server';

import authApi from '@/shared/api/auth-api';
import { revalidateTag } from 'next/cache';
import ErrorHandler from '@/shared/lib/error-message';
import {
  RecruitmentFormData,
  RecruitmentPatchResponse,
} from '@/features/post-recruitment/model/type';

async function patchRecruitmentForm(
  data: RecruitmentFormData,
  clubId: number,
): Promise<RecruitmentPatchResponse> {
  try {
    const response = await (
      await authApi()
    )
      .patch(`recruitments/${clubId}`, {
        json: data,
      })
      .json<RecruitmentPatchResponse>();
    revalidateTag('recruitments');
    revalidateTag(String(clubId));
    return { ok: true, message: '등록이 완료되었습니다.', data: response.data };
  } catch (e) {
    return ErrorHandler(e as Error);
  }
}

export default patchRecruitmentForm;
