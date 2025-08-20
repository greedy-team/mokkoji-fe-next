import authAPi from '@/shared/api/auth-api';
import { ApiResponse } from '@/shared/model/type';
import { RecruitmentDetail } from '@/views/recruit/model/type';

async function getRecruitDetail(id: string) {
  const response: ApiResponse<RecruitmentDetail> = await (await authAPi())
    .get(`recruitments/${id}`)
    .json();

  return response.data;
}

export default getRecruitDetail;
