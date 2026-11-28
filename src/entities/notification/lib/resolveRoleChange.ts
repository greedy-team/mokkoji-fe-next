import type { UserRole } from '@/shared/model/type';

// 런타임 enum을 import하면 shared/model/type의 SVG 에셋이 Node 테스트로 끌려온다
const ADMIN_ROLES: `${UserRole}`[] = ['CLUB_ADMIN', 'GREEDY_ADMIN'];

/**
 * connect 이벤트의 role로 세션 role을 덮어쓸지 판단한다.
 *
 * 백엔드 UserRole은 NORMAL·CLUB_MASTER 2종뿐이고, 관리자 토큰은
 * AuthRole.USER가 아니라서 role이 null로 내려온다. null을 그대로 반영하면
 * CLUB_ADMIN·GREEDY_ADMIN 세션의 권한이 지워지므로 건드리지 않는다.
 */
function resolveRoleChange(
  currentRole: UserRole | undefined,
  incomingRole: UserRole | null,
): { shouldUpdate: boolean; role?: UserRole } {
  if (incomingRole === null) {
    return { shouldUpdate: false };
  }

  if (currentRole === incomingRole) {
    return { shouldUpdate: false };
  }

  if (currentRole && ADMIN_ROLES.includes(currentRole)) {
    return { shouldUpdate: false };
  }

  return { shouldUpdate: true, role: incomingRole };
}

export default resolveRoleChange;
