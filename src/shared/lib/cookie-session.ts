import { cookies } from 'next/headers';
import { UserRole } from '@/shared/model/type';
import UserInfoType from '@/entities/my/model/type';

export interface CookieSession {
  accessToken: string;
  refreshToken: string;
  user: UserInfoType['user'];
  role?: UserRole;
  expiresAt?: number;
}

const SESSION_COOKIE_NAME = 'app-session';

export async function getSession(): Promise<CookieSession | null> {
  const cookieStore = await cookies();
  const raw = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  if (!raw) return null;

  try {
    return JSON.parse(decodeURIComponent(raw)) as CookieSession;
  } catch {
    return null;
  }
}

export function buildSessionCookie(session: CookieSession) {
  return {
    name: SESSION_COOKIE_NAME,
    value: encodeURIComponent(JSON.stringify(session)),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    path: '/',
    maxAge: 60 * 60 * 24 * 3, // 3 days
  };
}

export { SESSION_COOKIE_NAME };
