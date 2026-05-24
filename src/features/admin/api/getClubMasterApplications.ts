import 'server-only';
import api from '@/shared/api/auth-api';
import type {
  ClubMasterApplication,
  ApplicationStatus,
  PaginationMeta,
} from '@/features/admin/model/dashboard-types';

interface Params {
  status: ApplicationStatus;
  page: number;
  size: number;
  universityCode?: string;
}

interface Response {
  applications: ClubMasterApplication[];
  page: PaginationMeta;
}

async function getClubMasterApplications(
  params: Params,
): Promise<Response | null> {
  try {
    const query = new URLSearchParams({
      status: params.status,
      page: String(params.page),
      size: String(params.size),
    });
    if (params.universityCode)
      query.set('universityCode', params.universityCode);

    const result = await api
      .get(`admin/club-master-applications?${query.toString()}`)
      .json<{ data: Response }>();

    return result.data ?? null;
  } catch {
    return null;
  }
}

export default getClubMasterApplications;
