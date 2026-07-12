import 'server-only';
import { HTTPError } from 'ky';
import api from '@/shared/api/dashboard-api';
import type { AdminInfo } from '@/features/admin/model/dashboard-types';

async function getAdminInfo(): Promise<AdminInfo | null> {
  try {
    const result = await api.get('admin/me').json<{ data: AdminInfo }>();

    return result.data ?? null;
  } catch (error) {
    if (error instanceof HTTPError && error.response.status < 500) {
      return null;
    }
    throw error;
  }
}

export default getAdminInfo;
