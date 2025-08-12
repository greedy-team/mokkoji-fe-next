import serverApi from '@/shared/api/server-api';
import { ApiResponse } from '@/shared/model/type';
import { RecruitmentDetail } from '@/views/recruit/model/type';

async function getRecruitDetail(id: string) {
  const response: ApiResponse<RecruitmentDetail> = await serverApi
    .get(`recruitments/${id}`)
    .json();

  return response.data;
}

export default getRecruitDetail;
