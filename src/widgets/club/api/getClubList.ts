import {
  ApiResponse,
  ClubAffiliation,
  ClubCategory,
} from '@/shared/model/type';
import api from '@/shared/api/auth-api';
import createErrorResponse from '@/shared/lib/error-message';
import { getSession } from '@/shared/lib/cookie-session';
import serverApi from '@/shared/api/server-api';
import { mapClub } from '@/entities/club/model/type';
import { ClubsRawResponse } from '../model/type';

async function getClubList({
  page,
  size,
  category,
  affiliation,
  keyword,
}: {
  page: number;
  size: number;
  category?: ClubCategory;
  affiliation?: ClubAffiliation;
  keyword?: string;
}) {
  const session = await getSession();

  const rawParams: Record<string, string | undefined> = {
    page: String(page),
    size: String(size),
    category: category ? String(category) : undefined,
    affiliation: affiliation ? String(affiliation) : undefined,
    keyword: keyword?.trim() ? String(keyword?.trim()) : undefined,
  };

  const searchParams = new URLSearchParams();

  Object.entries(rawParams).forEach(([key, value]) => {
    if (value !== undefined) {
      searchParams.set(key, value);
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
      .json<ApiResponse<ClubsRawResponse>>();

    const responseData = response.data;
    if (!responseData) return { ok: false, message: '데이터 없음' };

    const data = {
      ...responseData,
      clubs: responseData.clubs.map(mapClub),
    };

    return { ok: true, message: '성공', data };
  } catch (e) {
    return createErrorResponse(e as Error);
  }
}

export default getClubList;
