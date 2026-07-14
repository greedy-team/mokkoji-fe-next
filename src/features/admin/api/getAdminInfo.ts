import 'server-only';
import api from '@/shared/api/dashboard-api';
import createErrorResponse from '@/shared/lib/error-message';
import { ApiResponse } from '@/shared/model/type';
import type { AdminInfo } from '@/features/admin/model/dashboard-types';

async function getAdminInfo() {
  try {
    const response = await api.get('admin/me').json<ApiResponse<AdminInfo>>();

    if (!response.data) {
      return {
        ok: false,
        message: '데이터 없음',
        data: undefined,
        status: 200,
      };
    }

    return { ok: true, message: '성공', data: response.data, status: 200 };
  } catch (error) {
    return createErrorResponse(error as Error);
  }
}

export default getAdminInfo;
