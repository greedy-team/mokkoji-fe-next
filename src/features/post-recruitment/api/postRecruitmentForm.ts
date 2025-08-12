import serverApi from '@/shared/api/server-api';
import { RecruitmentFormData, RecruitmentResponse } from '../model/type';

export default async function postRecruitmentForm(
  data: RecruitmentFormData,
  accessToken: string,
  clubId: number,
): Promise<RecruitmentResponse> {
  const response = await serverApi
    .post(`recruitments/${clubId}`, {
      json: data,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .json<RecruitmentResponse>();

  return response;
}
