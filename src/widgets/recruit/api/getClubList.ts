import {
  ApiResponse,
  ClubCategory,
  ClubListRaw,
  mapClubType,
} from '@/shared/model/type';
import api from '@/shared/api/auth-api';
import { getSession } from '@/shared/lib/cookie-session';
import serverApi from '@/shared/api/server-api';
import createErrorResponse from '@/shared/lib/error-message';

interface GetRecruitListParams {
  page: number;
  size: number;
  keyword?: string;
  category?: ClubCategory;
  recruitStatus?: string;
}

async function getClubList(params: GetRecruitListParams) {
  const session = await getSession();
  const rawParams = {
    page: params.page,
    size: params.size,
    keyword: params.keyword,
    category: params.category,
    recruitStatus: params.recruitStatus,
  };

  const searchParams = new URLSearchParams();

  Object.entries(rawParams).forEach(([key, value]) => {
    if (value !== undefined) {
      searchParams.set(key, String(value));
    }
  });
  try {
    const isAuthenticated = !!session?.accessToken;
    const client = isAuthenticated ? api : serverApi;
    const fetchOptions = isAuthenticated
      ? { searchParams, cache: 'no-store' as const }
      : { searchParams, next: { tags: ['clubs'] } };

    const response = await client
      .get('clubs', fetchOptions)
      .json<ApiResponse<ClubListRaw>>();

    const responseData = response.data;
    if (!responseData) return { ok: false, message: '데이터 없음' };

    const data = {
      ...responseData,
      clubs: responseData.clubs.map(mapClubType),
    };

    return { ok: true, message: '성공', data, status: 200 };
  } catch (e) {
    return createErrorResponse(e as Error);
  }
}

export default getClubList;
