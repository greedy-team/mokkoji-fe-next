/* eslint-disable import/prefer-default-export */
import { NextResponse } from 'next/server';
import { buildSessionCookie, getSession } from '@/shared/lib/cookie-session';
import { UserRole } from '@/shared/model/type';

const ALLOWED_ROLES = Object.values(UserRole);

const isUserRole = (value: unknown): value is UserRole =>
  typeof value === 'string' && ALLOWED_ROLES.includes(value as UserRole);

/**
 * SSE로 받은 role을 httpOnly 세션 쿠키에 반영한다.
 * 서버 컴포넌트인 Header가 session.role을 읽으므로, 클라이언트는
 * 이 호출 뒤 router.refresh()로 서버 트리를 다시 그려야 한다.
 */
export async function PATCH(request: Request) {
  const session = await getSession();
  if (!session?.accessToken) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let role: unknown;
  try {
    ({ role } = await request.json());
  } catch {
    return NextResponse.json({ error: 'Invalid body' }, { status: 400 });
  }

  if (!isUserRole(role)) {
    return NextResponse.json({ error: 'Invalid role' }, { status: 400 });
  }

  if (session.role === role) {
    return NextResponse.json({ role, changed: false });
  }

  const response = NextResponse.json({ role, changed: true });
  response.cookies.set(buildSessionCookie({ ...session, role }));
  return response;
}
