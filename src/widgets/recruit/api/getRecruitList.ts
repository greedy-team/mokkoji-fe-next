import {
  ApiResponse,
  ClubCategory,
  ClubList,
  ClubAffiliation,
} from '@/shared/model/type';
import serverApi from '@/shared/api/server-api';

interface GetRecruitListParams {
  page: number;
  size: number;
  keyword: string | undefined;
  category: ClubCategory | undefined;
  affiliation: ClubAffiliation | undefined;
  recruitStatus: string | undefined;
}

async function getRecruitList(params: GetRecruitListParams) {
  const rawParams = {
    page: params.page,
    size: params.size,
    keyword: params.keyword,
    category: params.category,
    affiliation: params.affiliation,
    recruitStatus: params.recruitStatus,
  };

  const searchParams = new URLSearchParams();

  Object.entries(rawParams).forEach(([key, value]) => {
    if (value !== undefined) {
      searchParams.set(key, String(value));
    }
  });

  const response: ApiResponse<ClubList> = await serverApi
    .get('clubs', {
      searchParams,
    })
    .json();

  return response.data.clubs;
}

export default getRecruitList;
