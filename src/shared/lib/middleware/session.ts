import { NextRequest, NextResponse } from 'next/server';
import {
  ResponseCookies,
  RequestCookies,
} from 'next/dist/compiled/@edge-runtime/cookies';
import {
  ACCESS_TOKEN_COOKIE_NAME,
  LEGACY_SESSION_COOKIE_NAME,
  REFRESH_TOKEN_COOKIE_NAME,
  buildForwardedCookieHeader,
  needsTokenRefresh,
  relaySetCookies,
} from '@/shared/lib/auth-cookie';

/**
 * 메인 서비스 세션의 토큰 수명 관리를 담당한다.
 * 토큰은 백엔드가 발급한 HttpOnly 쿠키에 있고, 여기서는 만료 직전이면 갱신을 부탁해 받은 쿠키를 반영한다.
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface SessionState {
  isAuthenticated: boolean;
  /** 백엔드 갱신 응답의 Set-Cookie. 성공이면 새 토큰, 실패면 백엔드가 만료시킨 쿠키가 담긴다 */
  refreshedCookies: Headers | null;
}

/**
 * 미들웨어는 Edge Runtime 에서 실행되므로 ky 대신 네이티브 fetch 를 사용한다.
 * 백엔드에는 브라우저가 보낸 refresh 쿠키를 그대로 실어 보낸다.
 */
async function refreshTokens(req: NextRequest): Promise<Response | null> {
  const cookieHeader = buildForwardedCookieHeader(
    (name) => req.cookies.get(name)?.value,
  );
  if (!cookieHeader) return null;
  try {
    return await fetch(`${API_URL}/users/auth/refresh`, {
      method: 'POST',
      headers: { Cookie: cookieHeader },
    });
  } catch {
    return null;
  }
}

export async function resolveSession(req: NextRequest): Promise<SessionState> {
  const accessToken = req.cookies.get(ACCESS_TOKEN_COOKIE_NAME)?.value;
  const refreshToken = req.cookies.get(REFRESH_TOKEN_COOKIE_NAME)?.value;

  if (!needsTokenRefresh({ accessToken, refreshToken, now: Date.now() })) {
    return { isAuthenticated: !!accessToken, refreshedCookies: null };
  }

  const response = await refreshTokens(req);
  if (!response) {
    return { isAuthenticated: false, refreshedCookies: null };
  }
  return { isAuthenticated: response.ok, refreshedCookies: response.headers };
}

/** 갱신으로 받은 쿠키를 브라우저 응답에 옮기고, 쿠키 인증 전의 세션 쿠키가 남아 있으면 지운다. */
export function applySessionCookie(
  req: NextRequest,
  response: NextResponse,
  { refreshedCookies }: SessionState,
): void {
  if (refreshedCookies) {
    relaySetCookies(refreshedCookies, response.headers);
  }
  if (req.cookies.has(LEGACY_SESSION_COOKIE_NAME)) {
    response.cookies.delete(LEGACY_SESSION_COOKIE_NAME);
  }
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
