import {
  ApiResponse,
  ClubCategory,
  ClubList,
  ClubAffiliation,
} from '@/shared/model/type';
import authApi from '@/shared/api/auth-api';
import ErrorHandler from '@/shared/lib/error-message';

interface GetRecruitListParams {
  page: number;
  size: number;
  keyword?: string;
  category?: ClubCategory;
  affiliation?: ClubAffiliation;
  recruitStatus?: string;
}

async function getClubList(params: GetRecruitListParams) {
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
  try {
    const response: ApiResponse<ClubList> = await (
      await authApi()
    )
      .get('clubs', {
        searchParams,
        cache: 'force-cache',
        next: { revalidate: 3600, tags: ['clubs'] },
      })
      .json<ApiResponse<ClubList>>();
    return { ok: true, message: '성공', data: response.data };
  } catch (e) {
    return ErrorHandler(e as Error);
  }
}

export default getClubList;
