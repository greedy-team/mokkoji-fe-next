import { NextRequest, NextResponse } from 'next/server';
import {
  ResponseCookies,
  RequestCookies,
} from 'next/dist/compiled/@edge-runtime/cookies';
import {
  SESSION_COOKIE_NAME,
  SESSION_COOKIE_OPTIONS,
  parseSessionCookie,
  CookieSession,
} from '@/shared/lib/cookie-session';
import getTokenExpiration from '@/shared/lib/getTokenExpiration';

/**
 * 메인 서비스 세션의 토큰 수명 관리를 담당한다.
 * 쿠키 읽기 → 만료 판정 → 갱신 → 쿠키 반영까지가 하나의 관심사다.
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface SessionState {
  session: CookieSession | null;
  /** 요청 시점에 accessToken이 만료돼 있었는지 */
  isExpired: boolean;
  /** 갱신 또는 폐기로 세션이 바뀌어 쿠키를 다시 써야 하는지 */
  isUpdated: boolean;
}

/**
 * refreshToken을 사용하여 백엔드에 새 accessToken을 요청한다.
 * 미들웨어는 Edge Runtime에서 실행되므로 ky 대신 네이티브 fetch를 사용한다.
 * @returns 새 accessToken 또는 null(실패 시)
 */
async function refreshAccessToken(
  refreshToken: string,
): Promise<string | null> {
  try {
    const res = await fetch(`${API_URL}/users/auth/refresh`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${refreshToken}` },
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.data?.accessToken ?? null;
  } catch {
    return null;
  }
}

/**
 * 쿠키에서 세션을 읽고, 만료됐으면 갱신까지 마친 상태를 돌려준다.
 * refreshToken마저 무효면 세션을 폐기(null)해 로그아웃으로 처리한다.
 */
export async function resolveSession(req: NextRequest): Promise<SessionState> {
  const session = parseSessionCookie(
    req.cookies.get(SESSION_COOKIE_NAME)?.value,
  );

  // expiresAt이 없으면 만료 판단 불가 → 만료되지 않은 것으로 간주
  const isExpired = session?.expiresAt
    ? Date.now() >= session.expiresAt
    : false;

  if (!session || !isExpired || !session.refreshToken) {
    return { session, isExpired, isUpdated: false };
  }

  const newToken = await refreshAccessToken(session.refreshToken);
  if (!newToken) {
    return { session: null, isExpired, isUpdated: true };
  }

  return {
    session: {
      ...session,
      accessToken: newToken,
      expiresAt: getTokenExpiration(newToken) ?? undefined,
    },
    isExpired,
    isUpdated: true,
  };
}

/** 갱신되거나 폐기된 세션을 응답 쿠키에 반영한다. */
export function applySessionCookie(
  response: NextResponse,
  { session, isUpdated }: SessionState,
): void {
  if (!isUpdated) return;

  if (session) {
    response.cookies.set(
      SESSION_COOKIE_NAME,
      encodeURIComponent(JSON.stringify(session)),
      SESSION_COOKIE_OPTIONS,
    );
  } else {
    response.cookies.delete(SESSION_COOKIE_NAME);
  }
}

export function clearSessionCookie(response: NextResponse): void {
  response.cookies.delete(SESSION_COOKIE_NAME);
}

/**
 * 미들웨어에서 response에 설정한 Set-Cookie를 request 헤더에도 반영한다.
 * 이렇게 해야 같은 요청 내 RSC에서 cookies().get()으로 갱신된 값을 읽을 수 있다.
 *
 * 배경: 미들웨어의 response.cookies.set()은 브라우저로 보내는 Set-Cookie 헤더만 설정하고,
 * 원래 요청의 Cookie 헤더는 변경하지 않는다. Next.js는 x-middleware-request-* 헤더를 통해
 * 요청 헤더를 오버라이드할 수 있으므로, 이를 활용하여 RSC에 갱신된 쿠키를 전달한다.
 *
 * @see https://github.com/vercel/next.js/issues/49442
 */
export function applySetCookie(req: NextRequest, res: NextResponse): void {
  const setCookies = new ResponseCookies(res.headers);
  const newReqHeaders = new Headers(req.headers);
  const newReqCookies = new RequestCookies(newReqHeaders);

  setCookies.getAll().forEach((cookie) => newReqCookies.set(cookie));

  NextResponse.next({
    request: { headers: newReqHeaders },
  }).headers.forEach((value, key) => {
    if (
      key === 'x-middleware-override-headers' ||
      key.startsWith('x-middleware-request-')
    ) {
      res.headers.set(key, value);
    }
  });
}
