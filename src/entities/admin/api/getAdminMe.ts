import ky from 'ky';

export interface AdminMe {
  role: string;
  universityCode: string;
}

async function getAdminMe(): Promise<AdminMe> {
  const json = await ky.get('/api/admin/me').json<{ data: AdminMe }>();
  return json.data;
}

export default getAdminMe;
