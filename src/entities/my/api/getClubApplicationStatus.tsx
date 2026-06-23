import api from '@/shared/api/auth-api';
import { ApiResponse } from '@/shared/model/type';
import createErrorResponse from '@/shared/lib/error-message';
import { ClubApplicationListType } from '../model/type';

async function getClubApplicationStatus() {
  try {
    const response: ApiResponse<ClubApplicationListType> = await api
      .get('club-applications/me', {
        cache: 'no-store',
        next: { tags: ['club-applications-me'] },
      })
      .json();
    return {
      ok: true,
      data: response.data,
      status: 200,
    };
  } catch (error) {
    return createErrorResponse(error as Error);
  }
}

export default getClubApplicationStatus;
