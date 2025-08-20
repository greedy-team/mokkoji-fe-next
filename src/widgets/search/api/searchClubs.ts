import { ApiResponse, ClubList } from '@/shared/model/type';
import serverApi from '@/shared/api/server-api';
import ErrorHandler from '@/shared/lib/error-message';

interface SearchClubsParams {
  keyword: string;
  page?: number;
  size?: number;
}

async function searchClubs(params: SearchClubsParams) {
  const searchParams = new URLSearchParams();

  searchParams.set('keyword', params.keyword);
  searchParams.set('page', String(params.page || 1));
  searchParams.set('size', String(params.size || 10));

  try {
    const response: ApiResponse<ClubList> = await serverApi
      .get('clubs', {
        searchParams,
      })
      .json();

    return response.data.clubs;
  } catch (e) {
    return ErrorHandler(e as Error);
  }
}

export default searchClubs;
