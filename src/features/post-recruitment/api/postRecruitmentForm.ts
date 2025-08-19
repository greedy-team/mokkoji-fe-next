'use server';

import authApi from '@/shared/api/auth-api';
import { revalidatePath } from 'next/cache';
import ErrorHandler from '@/shared/lib/error-message';
import { RecruitmentFormData, RecruitmentResponse } from '../model/type';

async function postRecruitmentForm(
  data: RecruitmentFormData,
  clubId: number,
): Promise<RecruitmentResponse> {
  try {
    const response = await (
      await authApi()
    )
      .post(`recruitments/${clubId}`, {
        json: data,
      })
      .json<RecruitmentResponse>();
    revalidatePath('/recruit');
    return { ok: true, message: '등록이 완료되었습니다.', data: response.data };
  } catch (e) {
    return ErrorHandler(e as Error);
  }
}

export default postRecruitmentForm;
