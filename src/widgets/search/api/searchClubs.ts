import {
  ClubCategory,
  ClubAffiliation,
  ClubSearchResponse,
} from '@/shared/model/type';
import serverApi from '@/shared/api/server-api';
import ErrorHandler from '@/shared/lib/error-message';

interface SearchClubsParams {
  keyword?: string;
  category?: ClubCategory;
  affiliation?: ClubAffiliation;
  recruitStatus?: string;
  page?: number;
  size?: number;
}

async function searchClubs(params: SearchClubsParams) {
  const searchParams = new URLSearchParams();

  searchParams.set('keyword', params.keyword || '');
  searchParams.set('category', params.category || '');
  searchParams.set('affiliation', params.affiliation || '');
  searchParams.set('recruitStatus', params.recruitStatus || '');
  searchParams.set('page', String(params.page || 1));
  searchParams.set('size', String(params.size || 10));

  try {
    const response = await serverApi
      .get('clubs/search', {
        searchParams,
        next: { tags: ['clubs-search'] },
      })
      .json<{ data: ClubSearchResponse }>();

    return {
      ok: true,
      message: '성공',
      data: response.data,
      status: 200,
    };
  } catch (e) {
    return ErrorHandler(e as Error);
  }
}

export default searchClubs;
