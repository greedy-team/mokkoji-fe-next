'use server';

import authApi from '@/shared/api/auth-api';
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

  return response;
}

export default postRecruitmentForm;
