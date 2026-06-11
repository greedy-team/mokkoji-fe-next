import 'server-only';
import api from '@/shared/api/auth-api';
import type {
  ClubMasterApplication,
  PaginationMeta,
} from '@/features/admin/model/dashboard-types';

interface Params {
  page: number;
  size: number;
}

interface Response {
  applications: ClubMasterApplication[];
  pagination: PaginationMeta;
}

async function getClubMasterApplications(
  params: Params,
): Promise<Response | null> {
  try {
    const query = new URLSearchParams({
      page: String(params.page),
      size: String(params.size),
    });

    const result = await api
      .get(`admin/club-master-applications?${query.toString()}`)
      .json<{ data: Response }>();

    return result.data ?? null;
  } catch {
    return null;
  }
}

export default getClubMasterApplications;
