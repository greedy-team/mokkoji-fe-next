import clientApi from '@/shared/api/client-api';
import type { UserRole } from '@/shared/model/type';

interface SessionRoleResult {
  role: UserRole;
  changed: boolean;
}

/**
 * SSE로 받은 role을 httpOnly 세션 쿠키에 반영한다.
 *
 * 호출자가 실패를 되돌릴 수 있도록 ok와 changed를 나눠 돌려준다.
 * 실패(ok: false)와 "이미 같은 role이라 안 바뀜"(changed: false)은 다르다.
 */
async function patchSessionRole(
  role: UserRole,
): Promise<{ ok: boolean; changed: boolean }> {
  try {
    const result = await clientApi
      .patch('api/auth/session/role', { json: { role } })
      .json<SessionRoleResult>();

    return { ok: true, changed: result.changed };
  } catch {
    return { ok: false, changed: false };
  }
}

export default patchSessionRole;
