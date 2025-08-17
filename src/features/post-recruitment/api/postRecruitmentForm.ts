'use server';

import authApi from '@/shared/api/auth-api';
import { revalidatePath } from 'next/cache';
import { RecruitmentFormData, RecruitmentResponse } from '../model/type';

async function postRecruitmentForm(
  data: RecruitmentFormData,
  clubId: number,
): Promise<RecruitmentResponse> {
  const response = await (
    await authApi()
  )
    .post(`recruitments/${clubId}`, {
      json: data,
    })
    .json<RecruitmentResponse>();
  revalidatePath('/recruit');
  return response;
}

export default postRecruitmentForm;
