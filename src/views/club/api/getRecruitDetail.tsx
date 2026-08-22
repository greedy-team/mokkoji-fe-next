import createErrorResponse from '@/shared/lib/error-message';
import { ApiResponse } from '@/shared/model/type';
import api from '@/shared/api/auth-api';
import { getSession } from '@/shared/lib/cookie-session';
import serverApi from '@/shared/api/server-api';
import type { RecruitmentDetail } from '@/entities/club-detail/model/type';

// clubId는 요청에 쓰이지 않는다. 공고 무효화가 동아리 단위로만 일어나므로
// 캐시 태그의 스코프를 맞추기 위해서만 받는다.
async function getRecruitDetail(recruitmentId: number, clubId: number) {
  const session = await getSession();
  try {
    let response: ApiResponse<RecruitmentDetail>;
    if (session?.accessToken) {
      response = await api.get(`recruitments/${recruitmentId}`).json();
    } else {
      response = await serverApi
        .get(`recruitments/${recruitmentId}`, {
          cache: 'force-cache',
          next: { tags: [String(clubId)], revalidate: 3600 },
        })
        .json();
    }
    if (!response.data) return { ok: false, message: '데이터 없음' };
    return {
      ok: true,
      data: response.data,
      status: 200,
    };
  } catch (e) {
    return createErrorResponse(e as Error);
  }
}

export default getRecruitDetail;
