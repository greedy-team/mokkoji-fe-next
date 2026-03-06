import { NextRequest, NextResponse } from 'next/server';
import { publicRoutes } from '../route';

const SESSION_COOKIE_NAME = 'app-session';
const API_URL = process.env.NEXT_PUBLIC_API_URL;

const SESSION_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  path: '/',
  maxAge: 60 * 60 * 24 * 3,
};

interface SessionPayload {
  accessToken?: string;
  refreshToken?: string;
  expiresAt?: number;
  [key: string]: unknown;
}

function parseSession(raw: string | undefined): SessionPayload | null {
  if (!raw) return null;
  try {
    return JSON.parse(decodeURIComponent(raw));
  } catch {
    return null;
  }
}

function getTokenExpiration(token: string): number | null {
  try {
    const [, payload] = token.split('.');
    const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
    const decoded = JSON.parse(atob(base64));
    return decoded.exp ? decoded.exp * 1000 : null;
  } catch {
    return null;
  }
}

async function refreshAccessToken(
  refreshToken: string,
): Promise<string | null> {
  try {
    const baseUrl = API_URL?.endsWith('/') ? API_URL : `${API_URL}/`;
    const res = await fetch(`${baseUrl}users/auth/refresh`, {
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

function isPublicPath(pathname: string) {
  return publicRoutes.some((route) => {
    if (route.endsWith('/:path*')) {
      return pathname.startsWith(route.replace('/:path*', ''));
    }
    return route === pathname;
  });
}

export default async function middleware(req: NextRequest) {
  const { nextUrl } = req;
  const sessionCookie = req.cookies.get(SESSION_COOKIE_NAME)?.value;
  let session = parseSession(sessionCookie);
  let sessionUpdated = false;

  const isExpired = session?.expiresAt
    ? Date.now() >= session.expiresAt
    : false;

  // 만료된 세션 처리: refresh 시도 또는 세션 제거
  if (session && isExpired) {
    if (session.refreshToken) {
      const newToken = await refreshAccessToken(session.refreshToken);
      if (newToken) {
        session = {
          ...session,
          accessToken: newToken,
          expiresAt: getTokenExpiration(newToken) ?? undefined,
        };
      } else {
        session = null;
      }
    } else {
      session = null;
    }
    sessionUpdated = true;
  }

  const isNowLoggedIn = !!session?.accessToken;
  const isPublic = isPublicPath(nextUrl.pathname);

  let response: NextResponse;

  if (!isNowLoggedIn && !isPublic) {
    response = NextResponse.redirect(new URL('/', nextUrl));
  } else {
    response = NextResponse.next();
  }

  // 갱신된 세션 쿠키 저장 (response → 브라우저, request 전파 → RSC)
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

  const userAgent = req.headers.get('user-agent') || '';
  const isMobile =
    /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
  const currentDeviceCookie = req.cookies.get('x-device-type')?.value;
  const targetDevice = isMobile ? 'mobile' : 'desktop';

  if (currentDeviceCookie !== targetDevice) {
    response.cookies.set('x-device-type', targetDevice, {
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
      sameSite: 'lax',
    });
  }

  return response;
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|images|favicon.ico|.*\\.svg$|.*\\.png$|.*\\.gif$|sitemap\\.xml|robots\\.txt|ads\\.txt).*)',
  ],
};
