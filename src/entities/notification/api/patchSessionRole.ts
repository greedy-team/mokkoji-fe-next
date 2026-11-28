import clientApi from '@/shared/api/client-api';
import type { UserRole } from '@/shared/model/type';

interface SessionRoleResult {
  role?: UserRole;
  changed: boolean;
}

/**
 * 세션 쿠키의 role을 백엔드의 현재 role로 맞추라고 요청한다.
 * role 값은 라우트가 백엔드에서 직접 조회하므로 보내지 않는다.
 *
 * 실패(ok: false)와 "이미 같은 role이라 안 바뀜"(changed: false)은 다르다.
 */
async function patchSessionRole(): Promise<
  { ok: boolean } & SessionRoleResult
> {
  try {
    const result = await clientApi
      .patch('api/auth/session/role')
      .json<SessionRoleResult>();

    return { ok: true, role: result.role, changed: result.changed };
  } catch {
    return { ok: false, changed: false };
  }
}

export default patchSessionRole;
