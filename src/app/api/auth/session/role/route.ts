/* eslint-disable import/prefer-default-export */
import { NextResponse } from 'next/server';
import getMyInfo from '@/entities/my/api/getMyInfo';
import resolveRoleChange from '@/entities/notification/lib/resolveRoleChange';
import { buildSessionCookie, getSession } from '@/shared/lib/cookie-session';
import { UserRole } from '@/shared/model/type';

const ALLOWED_ROLES = Object.values(UserRole);

const isUserRole = (value: unknown): value is UserRole =>
  typeof value === 'string' && ALLOWED_ROLES.includes(value as UserRole);

/**
 * 백엔드의 현재 role로 httpOnly 세션 쿠키를 맞춘다.
 * role을 body로 받지 않는다. 클라이언트 값을 믿으면 임의 role로 쿠키를 바꿀 수 있다.
 * 서버 컴포넌트인 Header가 session.role을 읽으므로, 클라이언트는
 * changed일 때 router.refresh()로 서버 트리를 다시 그려야 한다.
 */
export async function PATCH() {
  const session = await getSession();
  if (!session?.accessToken) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const myInfo = await getMyInfo();
  if (!myInfo.ok || !myInfo.data) {
    return NextResponse.json(
      { error: 'Failed to fetch user role' },
      { status: myInfo.status },
    );
  }

  const fetchedRole = isUserRole(myInfo.data.role) ? myInfo.data.role : null;
  const { shouldUpdate, role } = resolveRoleChange(session.role, fetchedRole);
  if (!shouldUpdate || !role) {
    return NextResponse.json({ role: session.role, changed: false });
  }

  const response = NextResponse.json({ role, changed: true });
  response.cookies.set(
    buildSessionCookie({ ...session, user: myInfo.data, role }),
  );
  return response;
}
