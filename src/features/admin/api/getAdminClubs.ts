import 'server-only';
import api from '@/shared/api/dashboard-api';
import type {
  AdminClub,
  PaginationMeta,
} from '@/features/admin/model/dashboard-types';

interface Params {
  page: number;
  size: number;
  universityCode?: string;
}

interface Response {
  clubs: AdminClub[];
  pagination: PaginationMeta;
}

async function getAdminClubs(params: Params): Promise<Response | null> {
  try {
    const query = new URLSearchParams({
      page: String(params.page),
      size: String(params.size),
    });
    if (params.universityCode)
      query.set('universityCode', params.universityCode);

    const result = await api
      .get(`admin/clubs?${query.toString()}`)
      .json<{ data: Response }>();

    return result.data ?? null;
  } catch {
    return null;
  }
}

export default getAdminClubs;
