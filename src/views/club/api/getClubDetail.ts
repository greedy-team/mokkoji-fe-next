import authApi from '@/shared/api/auth-api';
import ErrorHandler from '@/shared/lib/error-message';
import { ApiResponse } from '@/shared/model/type';
import { ClubDetailType } from '@/views/club/model/type';

async function getClubDetail(id: string) {
  try {
    const response: ApiResponse<ClubDetailType> = await (await authApi())
      .get(`clubs/${id}`)
      .json();
    return { ok: true, data: response.data, status: 200 };
  } catch (e) {
    return ErrorHandler(e as Error);
  }
}

export default getClubDetail;
