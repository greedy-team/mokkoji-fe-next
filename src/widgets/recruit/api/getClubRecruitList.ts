import { ApiResponse, ClubAffiliation } from '@/shared/model/type';
import authApi from '@/shared/api/auth-api';
import { RecruitmentResponse } from '../model/type';

async function getClubRecruitList({
  page,
  size,
  affiliation,
}: {
  page: number;
  size: number;
  affiliation?: ClubAffiliation;
}) {
  const rawParams = {
    page,
    size,
    affiliation,
  };

  const searchParams = new URLSearchParams();

  Object.entries(rawParams).forEach(([key, value]) => {
    if (value !== undefined) {
      searchParams.set(key, String(value));
    }
  });
  const response: ApiResponse<RecruitmentResponse> = await (
    await authApi()
  )
    .get('recruitments', {
      searchParams,
    })
    .json();
  return response.data;
}

export default getClubRecruitList;
