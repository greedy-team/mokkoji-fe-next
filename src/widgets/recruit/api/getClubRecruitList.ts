import { ApiResponse, ClubCategory } from '@/shared/model/type';
import api from '@/shared/api/auth-api';
import ErrorHandler from '@/shared/lib/error-message';
import { getSession } from '@/shared/lib/cookie-session';
import serverApi from '@/shared/api/server-api';
import { RecruitmentResponse } from '../model/type';

async function getClubRecruitList({
  page,
  size,
  category,
}: {
  page: number;
  size: number;
  category?: ClubCategory;
}) {
  const session = await getSession();

  const rawParams = {
    page,
    size,
    category,
  };

  const searchParams = new URLSearchParams();

  Object.entries(rawParams).forEach(([key, value]) => {
    if (value !== undefined) {
      searchParams.set(key, String(value));
    }
  });

  try {
    let response: ApiResponse<RecruitmentResponse>;
    if (session?.accessToken) {
      response = await api
        .get('recruitments', {
          searchParams,
          next: { tags: ['recruitments'] },
        })
        .json();
    } else {
      response = await serverApi
        .get('recruitments', {
          searchParams,
          next: { tags: ['recruitments'] },
        })
        .json();
    }
    return { ok: true, message: '성공', data: response.data };
  } catch (e) {
    return ErrorHandler(e as Error);
  }
}

export default getClubRecruitList;
