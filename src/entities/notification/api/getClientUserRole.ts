import clientApi from '@/shared/api/client-api';
import type { ApiResponse, UserRole } from '@/shared/model/type';

/** role-changed는 값이 없는 신호라, 현재 role을 서버에 되묻는다. */
async function getClientUserRole(): Promise<UserRole | null> {
  try {
    const response = await clientApi
      .get('api/users/role')
      .json<ApiResponse<{ role: UserRole }>>();

    return response.data?.role ?? null;
  } catch {
    return null;
  }
}

export default getClientUserRole;
