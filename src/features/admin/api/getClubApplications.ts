import 'server-only';
import api from '@/shared/api/dashboard-api';
import createErrorResponse from '@/shared/lib/error-message';
import { ApiResponse } from '@/shared/model/type';
import type {
  ClubApplication,
  ApplicationStatus,
  PaginationMeta,
} from '@/features/admin/model/dashboard-types';

interface Params {
  status: ApplicationStatus;
  page: number;
  size: number;
  universityCode?: string;
}

interface ClubApplicationsResponse {
  applications: ClubApplication[];
  page: PaginationMeta;
}

async function getClubApplications(params: Params) {
  try {
    const query = new URLSearchParams({
      status: params.status,
      page: String(params.page),
      size: String(params.size),
    });
    if (params.universityCode)
      query.set('universityCode', params.universityCode);

    const response = await api
      .get(`admin/club-applications?${query.toString()}`)
      .json<ApiResponse<ClubApplicationsResponse>>();

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

export default getClubApplications;
