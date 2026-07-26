import 'server-only';
import api from '@/shared/api/auth-api';
import createErrorResponse from '@/shared/lib/error-message';
import { ApiResponse } from '@/shared/model/type';

async function getCurrentUserRole() {
  try {
    const response = await api
      .get('users/roles')
      .json<ApiResponse<{ role: string }>>();

    return { ok: true, message: '성공', data: response.data, status: 200 };
  } catch (error) {
    return createErrorResponse(error as Error);
  }
}

export default getCurrentUserRole;
