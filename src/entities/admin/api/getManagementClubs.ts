import ky from 'ky';
import type { Pagination } from '@/shared/model/type';
import type { AdminClub } from '@/entities/admin/model/types';

interface Params {
  page: number;
  size: number;
  universityCode?: string;
}

interface AdminClubsData {
  clubs: AdminClub[];
  page: Pagination;
}

async function getManagementClubs(params: Params): Promise<AdminClubsData> {
  const searchParams = new URLSearchParams({
    page: String(params.page),
    size: String(params.size),
  });

  if (params.universityCode) {
    searchParams.set('universityCode', params.universityCode);
  }

  const json = await ky
    .get('/api/admin/clubs', { searchParams })
    .json<{ data: AdminClubsData }>();

  return json.data;
}

export default getManagementClubs;
