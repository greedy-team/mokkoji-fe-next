import authApi from '@/shared/api/auth-api';
import { ApiResponse } from '@/shared/model/type';
import { RecruitmentResponse } from '../model/type';

async function getClubRecruitList({
  page,
  size,
}: {
  page: number;
  size: number;
}) {
  const response: ApiResponse<RecruitmentResponse> = await authApi
    .get('recruitments', {
      searchParams: {
        page,
        size,
      },
    })
    .json();
  return response.data;
}

export default getClubRecruitList;
