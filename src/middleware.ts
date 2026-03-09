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
import { publicRoutes } from '../route';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

/* ────────────────────────────────────────────
 * 미들웨어 전용 유틸리티
 * ──────────────────────────────────────────── */

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
 * 미들웨어에서 response에 설정한 Set-Cookie를 request 헤더에도 반영한다.
 * 이렇게 해야 같은 요청 내 RSC에서 cookies().get()으로 갱신된 값을 읽을 수 있다.
 *
 * 배경: 미들웨어의 response.cookies.set()은 브라우저로 보내는 Set-Cookie 헤더만 설정하고,
 * 원래 요청의 Cookie 헤더는 변경하지 않는다. Next.js는 x-middleware-request-* 헤더를 통해
 * 요청 헤더를 오버라이드할 수 있으므로, 이를 활용하여 RSC에 갱신된 쿠키를 전달한다.
 *
 * @see https://github.com/vercel/next.js/issues/49442
 */
function applySetCookie(req: NextRequest, res: NextResponse): void {
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

/**
 * route.ts에 정의된 publicRoutes와 대조하여 인증 없이 접근 가능한 경로인지 판별한다.
 * '/:path*'로 끝나는 패턴은 하위 경로까지 포함한다.
 */
function isPublicPath(pathname: string) {
  return publicRoutes.some((route) => {
    if (route.endsWith('/:path*')) {
      return pathname.startsWith(route.replace('/:path*', ''));
    }
    return route === pathname;
  });
}

/* ────────────────────────────────────────────
 * 미들웨어 본체
 *
 * 처리 순서:
 *   1. 세션 쿠키 파싱 & 토큰 만료 여부 확인
 *   2. 만료 시 refreshToken으로 accessToken 갱신
 *   3. 인증 상태 + 경로 공개 여부에 따라 라우팅(통과/리다이렉트)
 *   4. 갱신된 세션이 있으면 응답 쿠키에 반영
 *   5. User-Agent 기반 디바이스 타입 쿠키 설정
 *   6. applySetCookie로 요청 헤더 오버라이드 → RSC에서 갱신된 쿠키 즉시 사용 가능
 * ──────────────────────────────────────────── */

export default async function middleware(req: NextRequest) {
  const { nextUrl } = req;
  const sessionCookie = req.cookies.get(SESSION_COOKIE_NAME)?.value;
  let session: CookieSession | null = parseSessionCookie(sessionCookie);
  let sessionUpdated = false;

  // ── 1) 토큰 만료 여부 확인 ──
  // expiresAt이 없으면 만료 판단 불가 → 만료되지 않은 것으로 간주
  const isExpired = session?.expiresAt
    ? Date.now() >= session.expiresAt
    : false;

  // ── 2) 토큰 갱신 ──
  // accessToken이 만료되었고 refreshToken이 존재하면 갱신을 시도한다.
  // 갱신 성공 시 세션을 새 토큰으로 교체하고, 실패 시 세션을 null로 만들어 로그아웃 처리한다.
  if (session && isExpired && session.refreshToken) {
    const newToken = await refreshAccessToken(session.refreshToken);
    if (newToken) {
      session = {
        ...session,
        accessToken: newToken,
        expiresAt: getTokenExpiration(newToken) ?? undefined,
      };
      sessionUpdated = true;
    } else {
      // refreshToken마저 만료/무효 → 세션 폐기
      session = null;
      sessionUpdated = true;
    }
  }

  // ── 3) 라우팅 결정 ──
  const isNowLoggedIn = !!session?.accessToken;
  const isPublic = isPublicPath(nextUrl.pathname);

  let response: NextResponse;

  if (session && isExpired && !session.refreshToken && !sessionUpdated) {
    // accessToken 만료 + refreshToken 없음 → 세션 쿠키 삭제, 비공개 경로면 홈으로 리다이렉트
    response = isPublic
      ? NextResponse.next()
      : NextResponse.redirect(new URL('/', nextUrl));
    response.cookies.delete(SESSION_COOKIE_NAME);
  } else if (!isNowLoggedIn && !isPublic) {
    // 비로그인 상태에서 비공개 경로 접근 → 홈으로 리다이렉트
    response = NextResponse.redirect(new URL('/', nextUrl));
  } else {
    // 그 외 → 정상 통과
    response = NextResponse.next();
  }

  // ── 4) 갱신된 세션 쿠키 반영 ──
  // response.cookies.set()은 브라우저에 Set-Cookie 헤더를 전달한다.
  // RSC로의 전파는 6단계 applySetCookie에서 처리한다.
  if (sessionUpdated) {
    if (session) {
      const cookieValue = encodeURIComponent(JSON.stringify(session));
      response.cookies.set(
        SESSION_COOKIE_NAME,
        cookieValue,
        SESSION_COOKIE_OPTIONS,
      );
    } else {
      response.cookies.delete(SESSION_COOKIE_NAME);
    }
  }

  // ── 5) 디바이스 타입 쿠키 ──
  // SSR 시점에 User-Agent 기반으로 모바일/데스크탑을 판별하여 쿠키에 저장한다.
  // 서버 컴포넌트에서 이 쿠키를 읽어 반응형 초기 렌더링에 활용할 수 있다.
  const userAgent = req.headers.get('user-agent') || '';
  const isMobile =
    /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
  const currentDeviceCookie = req.cookies.get('x-device-type')?.value;
  const targetDevice = isMobile ? 'mobile' : 'desktop';

  if (currentDeviceCookie !== targetDevice) {
    response.cookies.set('x-device-type', targetDevice, {
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7일
      sameSite: 'lax',
    });
  }

  // ── 6) 요청 쿠키 오버라이드 ──
  // response에 설정한 Set-Cookie를 request 헤더에도 반영하여
  // 이후 RSC에서 cookies().get()으로 갱신된 값을 읽을 수 있게 한다.
  applySetCookie(req, response);

  return response;
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|images|favicon.ico|.*\\.svg$|.*\\.png$|.*\\.gif$|sitemap\\.xml|robots\\.txt|ads\\.txt).*)',
  ],
};
