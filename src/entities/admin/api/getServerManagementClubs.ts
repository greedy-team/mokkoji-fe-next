import 'server-only';
import api from '@/shared/api/dashboard-api';
import type { AdminClubsData } from './getManagementClubs';

interface Params {
  page: number;
  size: number;
  universityCode: string;
}

async function getServerManagementClubs({
  page,
  size,
  universityCode,
}: Params): Promise<AdminClubsData> {
  const json = await api
    .get('admin/clubs', {
      searchParams: {
        page: String(page),
        size: String(size),
        universityCode,
      },
    })
    .json<{ data: AdminClubsData }>();

  return json.data;
}

export default getServerManagementClubs;
