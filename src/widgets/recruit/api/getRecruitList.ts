import {
  ApiResponse,
  ClubCategory,
  ClubList,
  ClubAffiliation,
} from '@/shared/model/type';
import authApi from '@/shared/api/auth-api';
import serverApi from '@/shared/api/server-api';

interface GetRecruitListParams {
  page: number;
  size: number;
  keyword?: string;
  category?: ClubCategory;
  affiliation?: ClubAffiliation;
  recruitStatus?: string;
}

async function getRecruitList(params: GetRecruitListParams, auth?: boolean) {
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

  let response: ApiResponse<ClubList>;
  if (auth) {
    response = await authApi
      .get('clubs', {
        searchParams,
      })
      .json<ApiResponse<ClubList>>();
  } else {
    response = await serverApi
      .get('clubs', {
        searchParams,
      })
      .json<ApiResponse<ClubList>>();
  }

  return response.data.clubs;
}

export default getRecruitList;
