import authApi from '@/shared/api/auth-api';
import { RecruitmentFormData, RecruitmentResponse } from '../model/type';

export default async function postRecruitmentForm(
  data: RecruitmentFormData,
  clubId: number,
): Promise<RecruitmentResponse> {
  const response = await authApi
    .post(`recruitments/${clubId}`, {
      json: data,
    })
    .json<RecruitmentResponse>();

  return response;
}
