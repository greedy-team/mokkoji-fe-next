import {
  ClubCategory,
  ClubAffiliation,
  ClubSearchRawResponse,
  mapClubType,
} from '@/shared/model/type';
import serverApi from '@/shared/api/server-api';
import createErrorResponse from '@/shared/lib/error-message';
import { getSession } from '@/shared/lib/cookie-session';

interface SearchClubsParams {
  keyword?: string;
  category?: ClubCategory;
  affiliation?: ClubAffiliation;
  recruitStatus?: string;
  page?: number;
  size?: number;
  universityCode?: string;
}

async function searchClubs(params: SearchClubsParams) {
  const session = await getSession();
  const effectiveUniversityCode =
    session?.universityCode ?? params.universityCode ?? 'SEJONG';

  const searchParams = new URLSearchParams();

  searchParams.set('keyword', params.keyword || '');
  searchParams.set('category', params.category || '');
  searchParams.set('affiliation', params.affiliation || '');
  searchParams.set('recruitStatus', params.recruitStatus || '');
  searchParams.set('page', String(params.page || 1));
  searchParams.set('size', String(params.size || 10));
  searchParams.set('universityCode', effectiveUniversityCode);

  try {
    const response = await serverApi
      .get('clubs/search', {
        searchParams,
        next: { tags: ['clubs-search'] },
      })
      .json<{ data: ClubSearchRawResponse }>();

    const data = {
      ...response.data,
      clubs: response.data.clubs.map(mapClubType),
    };

    return {
      ok: true,
      message: '성공',
      data,
      status: 200,
    };
  } catch (e) {
    return createErrorResponse(e as Error);
  }
}

export default searchClubs;
