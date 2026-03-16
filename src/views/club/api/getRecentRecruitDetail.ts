import createErrorResponse from '@/shared/lib/error-message';
import { ApiResponse } from '@/shared/model/type';
import api from '@/shared/api/auth-api';
import { getSession } from '@/shared/lib/cookie-session';
import serverApi from '@/shared/api/server-api';
import type { RecruitmentDetailRaw } from '@/entities/club-detail/model/type';
import { mapRecruitmentDetail } from '../model/type';

async function getRecentRecruitDetail(id: number) {
  const session = await getSession();
  try {
    let response: ApiResponse<RecruitmentDetailRaw>;
    if (session?.accessToken) {
      response = await api.get(`recruitments/club/recent/${id}`).json();
    } else {
      response = await serverApi
        .get(`recruitments/club/recent/${id}`, {
          cache: 'force-cache',
          next: { revalidate: 3600 },
        })
        .json();
    }
    if (!response.data) return { ok: false, message: '데이터 없음' };
    return {
      ok: true,
      data: mapRecruitmentDetail(response.data),
      status: 200,
    };
  } catch (e) {
    return createErrorResponse(e as Error);
  }
}

export default getRecentRecruitDetail;
