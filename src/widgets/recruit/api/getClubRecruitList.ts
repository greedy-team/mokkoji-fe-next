import { ApiResponse, ClubAffiliation } from '@/shared/model/type';
import authApi from '@/shared/api/auth-api';
import ErrorHandler from '@/shared/lib/error-message';
import { RecruitmentResponse } from '../model/type';

async function getClubRecruitList({
  page,
  size,
  affiliation,
}: {
  page: number;
  size: number;
  affiliation?: ClubAffiliation;
}) {
  const rawParams = {
    page,
    size,
    affiliation,
  };

  const searchParams = new URLSearchParams();

  Object.entries(rawParams).forEach(([key, value]) => {
    if (value !== undefined) {
      searchParams.set(key, String(value));
    }
  });
  try {
    const response: ApiResponse<RecruitmentResponse> = await (
      await authApi()
    )
      .get('recruitments', {
        searchParams,
        cache: 'force-cache',
        next: { revalidate: 3600, tags: ['recruitments'] },
      })
      .json();
    return { ok: true, message: '성공', data: response.data };
  } catch (e) {
    return ErrorHandler(e as Error);
  }
}

export default getClubRecruitList;
