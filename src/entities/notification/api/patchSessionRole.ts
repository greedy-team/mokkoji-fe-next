import clientApi from '@/shared/api/client-api';
import type { UserRole } from '@/shared/model/type';

interface SessionRoleResult {
  role: UserRole;
  changed: boolean;
}

/** SSE로 받은 role을 httpOnly 세션 쿠키에 반영한다. 실제로 바뀌었는지 반환한다. */
async function patchSessionRole(role: UserRole): Promise<boolean> {
  try {
    const result = await clientApi
      .patch('api/auth/session/role', { json: { role } })
      .json<SessionRoleResult>();

    return result.changed;
  } catch {
    return false;
  }
}

export default patchSessionRole;
