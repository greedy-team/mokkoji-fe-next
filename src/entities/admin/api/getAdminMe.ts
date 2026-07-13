export interface AdminMe {
  role: string;
  universityCode: string;
}

async function getAdminMe(): Promise<AdminMe> {
  const response = await fetch('/api/admin/me');
  const json = await response.json();
  return json.data;
}

export default getAdminMe;
