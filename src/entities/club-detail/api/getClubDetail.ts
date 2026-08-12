import createErrorResponse from '@/shared/lib/error-message';
import { ApiResponse } from '@/shared/model/type';
import { ClubDetail } from '@/entities/club-detail/model/type';
import api from '@/shared/api/auth-api';
import serverApi from '@/shared/api/server-api';
import { getSession } from '@/shared/lib/cookie-session';

async function getClubDetail(id: number) {
  const session = await getSession();
  try {
    let response: ApiResponse<ClubDetail>;
    if (session?.accessToken) {
      response = await api.get(`clubs/${id}`).json();
    } else {
      response = await serverApi
        .get(`clubs/${id}`, {
          next: { tags: ['clubs', String(id)] },
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

export default getClubDetail;
