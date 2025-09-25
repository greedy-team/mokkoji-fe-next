import ErrorHandler from '@/shared/lib/error-message';
import { ApiResponse } from '@/shared/model/type';
import { ClubDetailType } from '@/views/club/model/type';
import api from '@/shared/api/auth-api';

async function getClubDetail(id: string) {
  try {
    const response: ApiResponse<ClubDetailType> = await api
      .get(`clubs/${id}`)
      .json();
    return { ok: true, data: response.data, status: 200 };
  } catch (e) {
    return ErrorHandler(e as Error);
  }
}

export default getClubDetail;
