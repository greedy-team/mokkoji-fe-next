import api from '@/shared/api/auth-api';
import createErrorResponse from '@/shared/lib/error-message';
import { ApiResponse } from '@/shared/model/type';
import { MyCommentsData } from '../model/type';

async function getMyComments() {
  try {
    const response: ApiResponse<MyCommentsData> = await api
      .get('/comments/my', { cache: 'no-store' })
      .json();
    return { ok: true, data: response.data, status: response.status };
  } catch (error) {
    return createErrorResponse(error as Error);
  }
}

export default getMyComments;
