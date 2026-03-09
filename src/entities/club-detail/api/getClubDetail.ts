import createErrorResponse from '@/shared/lib/error-message';
import { ApiResponse } from '@/shared/model/type';
import {
  ClubDetailRaw,
  mapClubDetail,
} from '@/entities/club-detail/model/type';
import api from '@/shared/api/auth-api';

async function getClubDetail(id: number) {
  try {
    const response: ApiResponse<ClubDetailRaw> = await api
      .get(`clubs/${id}`)
      .json();
    if (!response.data) return { ok: false, message: '데이터 없음' };
    return {
      ok: true,
      data: mapClubDetail(response.data),
      status: 200,
    };
  } catch (e) {
    return createErrorResponse(e as Error);
  }
}

export default getClubDetail;
