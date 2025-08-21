import {
  ApiResponse,
  ClubAffiliation,
  ClubCategory,
} from '@/shared/model/type';
import authApi from '@/shared/api/auth-api';
import ErrorHandler from '@/shared/lib/error-message';
import { auth } from '@/auth';
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
  const session = await auth();

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
      response = await (
        await authApi()
      )
        .get('recruitments', {
          searchParams,
        })
        .json();
    } else {
      response = await serverApi
        .get('recruitments', {
          searchParams,
          cache: 'force-cache',
          next: { revalidate: 300, tags: ['recruitments'] },
        })
        .json();
    }
    return { ok: true, message: '성공', data: response.data };
  } catch (e) {
    return ErrorHandler(e as Error);
  }
}

export default getClubRecruitList;
