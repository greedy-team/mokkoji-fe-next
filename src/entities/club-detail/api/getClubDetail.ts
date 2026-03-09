import createErrorResponse from '@/shared/lib/error-message';
import { ApiResponse } from '@/shared/model/type';
import { ClubDetail } from '@/entities/club-detail/model/type';
import api from '@/shared/api/auth-api';

async function getClubDetail(id: number) {
  try {
    const response: ApiResponse<ClubDetail> = await api
      .get(`clubs/${id}`)
      .json();
    return { ok: true, data: response.data, status: 200 };
  } catch (e) {
    return createErrorResponse(e as Error);
  }
}

export default getClubDetail;
