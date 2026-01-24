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
}: {
  page: number;
  size: number;
  category?: ClubCategory;
  affiliation?: ClubAffiliation;
}) {
  const session = await auth();

  const rawParams: Record<string, string | undefined> = {
    page: String(page),
    size: String(size),
    category: category ? String(category) : undefined,
    affiliation: affiliation ? String(affiliation) : undefined,
  };

  const searchParams = new URLSearchParams();

  Object.entries(rawParams).forEach(([key, value]) => {
    if (value !== undefined) {
      searchParams.set(key, value);
    }
  });

  try {
    const client = session?.accessToken ? api : serverApi;

    const res = await client.get('clubs', { searchParams });
    console.log('final url', res.url);

    const response = await client
      .get('clubs', { searchParams, next: { tags: ['clubs'] } })
      .json<ApiResponse<ClubsResponse>>();

    console.log('first club', response.data?.clubs?.[0]);

    return { ok: true, message: '성공', data: response.data };
  } catch (e) {
    return ErrorHandler(e as Error);
  }
}

export default getClubList;
