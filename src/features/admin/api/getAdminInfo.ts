import 'server-only';
import api from '@/shared/api/dashboard-api';
import type { AdminInfo } from '@/features/admin/model/dashboard-types';

async function getAdminInfo(): Promise<AdminInfo | null> {
  try {
    const result = await api.get('admin/me').json<{ data: AdminInfo }>();

    return result.data ?? null;
  } catch {
    return null;
  }
}

export default getAdminInfo;
