import api from '@/shared/api/auth-api';
import { ApiResponse } from '@/shared/model/type';
import createErrorResponse from '@/shared/lib/error-message';
import { MyClubMasterApplicationListType } from '../model/type';

async function getMyClubMasterApplications() {
  try {
    const response: ApiResponse<MyClubMasterApplicationListType> = await api
      .get('club-master-applications/me', {
        cache: 'no-store',
        next: { tags: ['club-master-applications-me'] },
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

export default getMyClubMasterApplications;
