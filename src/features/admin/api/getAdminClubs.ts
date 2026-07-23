import 'server-only';
import api from '@/shared/api/dashboard-api';
import createErrorResponse from '@/shared/lib/error-message';
import { ApiResponse } from '@/shared/model/type';
import type {
  AdminClub,
  PaginationMeta,
} from '@/features/admin/model/dashboard-types';

interface Params {
  page: number;
  size: number;
  universityCode?: string;
}

interface AdminClubsResponse {
  clubs: AdminClub[];
  page: PaginationMeta;
}

async function getAdminClubs(params: Params) {
  try {
    const query = new URLSearchParams({
      page: String(params.page),
      size: String(params.size),
    });
    if (params.universityCode)
      query.set('universityCode', params.universityCode);

    const response = await api
      .get(`admin/clubs?${query.toString()}`)
      .json<ApiResponse<AdminClubsResponse>>();

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

export default getAdminClubs;
