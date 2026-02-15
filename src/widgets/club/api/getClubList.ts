import {
  ApiResponse,
  ClubAffiliation,
  ClubCategory,
} from '@/shared/model/type';
import api from '@/shared/api/auth-api';
import ErrorHandler from '@/shared/lib/error-message';
import { auth } from '@/auth';
import serverApi from '@/shared/api/server-api';
import { ClubsResponse } from '../model/type';

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
  keyword: string;
}) {
  const session = await auth();

  const rawParams: Record<string, string | undefined> = {
    page: String(page),
    size: String(size),
    category: category ? String(category) : undefined,
    affiliation: affiliation ? String(affiliation) : undefined,
    keyword: String(keyword),
  };

  const searchParams = new URLSearchParams();

  Object.entries(rawParams).forEach(([key, value]) => {
    if (value !== undefined) {
      searchParams.set(key, value);
    }
  });

  try {
    const client = session?.accessToken ? api : serverApi;

    const response = await client
      .get('clubs', { searchParams, next: { tags: ['clubs'] } })
      .json<ApiResponse<ClubsResponse>>();

    return { ok: true, message: '성공', data: response.data };
  } catch (e) {
    return ErrorHandler(e as Error);
  }
}

export default getClubList;
