import { cookies } from 'next/headers';
import { UserRole } from '@/shared/model/type';
import UserInfoType from '@/shared/model/user';

/* ────────────────────────────────────────────
 * 상수 & 타입 (미들웨어·RSC 공용)
 * ──────────────────────────────────────────── */

export const SESSION_COOKIE_NAME = 'app-session';

export const SESSION_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  path: '/',
  maxAge: 60 * 60 * 24 * 3, // 3일
};

export interface CookieSession {
  accessToken: string;
  refreshToken: string;
  user: UserInfoType['user'];
  role?: UserRole;
  expiresAt?: number;
}

/* ────────────────────────────────────────────
 * 순수 유틸 (Edge Runtime 호환)
 * ──────────────────────────────────────────── */

/**
 * encodeURIComponent로 인코딩된 쿠키 문자열을 CookieSession으로 파싱한다.
 * 미들웨어에서는 req.cookies로 꺼낸 raw 값을, RSC에서는 getSession()이 내부적으로 사용한다.
 */
export function parseSessionCookie(
  raw: string | undefined,
): CookieSession | null {
  if (!raw) return null;
  try {
    return JSON.parse(decodeURIComponent(raw)) as CookieSession;
  } catch {
    return null;
  }
}

/* ────────────────────────────────────────────
 * RSC / Server Action 전용 (next/headers 의존)
 * ──────────────────────────────────────────── */

export async function getSession(): Promise<CookieSession | null> {
  const cookieStore = await cookies();
  const raw = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  return parseSessionCookie(raw);
}

export function buildSessionCookie(session: CookieSession) {
  return {
    name: SESSION_COOKIE_NAME,
    value: encodeURIComponent(JSON.stringify(session)),
    ...SESSION_COOKIE_OPTIONS,
  };
}
