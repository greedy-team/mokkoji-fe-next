import { ApiResponse, ClubCategory, ClubList } from '@/shared/model/type';
import authApi from '@/shared/api/auth-api';
import { auth } from '@/auth';
import serverApi from '@/shared/api/server-api';
import ErrorHandler from '@/shared/lib/error-message';

interface GetRecruitListParams {
  page: number;
  size: number;
  keyword?: string;
  category?: ClubCategory;
  recruitStatus?: string;
}

async function getClubList(params: GetRecruitListParams) {
  const session = await auth();
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
    let response: ApiResponse<ClubList>;
    if (session?.accessToken) {
      response = await (
        await authApi()
      )
        .get('clubs', {
          searchParams,
        })
        .json<ApiResponse<ClubList>>();
    } else {
      response = await serverApi
        .get('clubs', {
          searchParams,
          cache: 'force-cache',
          next: { revalidate: 240, tags: ['clubs'] },
        })
        .json<ApiResponse<ClubList>>();
    }
    return { ok: true, message: '성공', data: response.data };
  } catch (e) {
    return ErrorHandler(e as Error);
  }
}

export default getClubList;
