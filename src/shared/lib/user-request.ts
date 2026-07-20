// API Route Handler 전용 — 일반 유저 클라이언트 요청을 백엔드로 프록시하는 인증 헬퍼
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import ky from 'ky';
import {
  getSession,
  CookieSession,
  SESSION_COOKIE_NAME,
  SESSION_COOKIE_OPTIONS,
} from '@/shared/lib/cookie-session';
import getTokenExpiration from '@/shared/lib/getTokenExpiration';

const API_BASE = process.env.NEXT_PUBLIC_API_URL!;

interface RequestByUserOptions {
  searchParams?: URLSearchParams;
  method?: string;
  body?: unknown;
}

async function authorizedFetch(
  pathname: string,
  accessToken: string,
  options?: RequestByUserOptions,
) {
  const url = new URL(`${API_BASE}/${pathname}`);
  options?.searchParams?.forEach((value, key) =>
    url.searchParams.set(key, value),
  );

  const response = await ky(url, {
    method: options?.method ?? 'GET',
    headers: { Authorization: `Bearer ${accessToken}` },
    json: options?.body ?? undefined,
    throwHttpErrors: false,
  });

  const text = await response.text();
  if (!text) return new NextResponse(null, { status: response.status });
  return NextResponse.json(JSON.parse(text), { status: response.status });
}

async function renewAuthorization(
  session: CookieSession,
): Promise<string | null> {
  try {
    const response = await ky.post(`${API_BASE}/users/auth/refresh`, {
      headers: { Authorization: `Bearer ${session.refreshToken}` },
      throwHttpErrors: false,
    });
    if (!response.ok) return null;

    const data = await response.json<{ data?: { accessToken?: string } }>();
    const newAccessToken = data.data?.accessToken ?? null;
    if (!newAccessToken) return null;

    const cookieStore = await cookies();
    cookieStore.set(
      SESSION_COOKIE_NAME,
      encodeURIComponent(
        JSON.stringify({
          ...session,
          accessToken: newAccessToken,
          expiresAt: getTokenExpiration(newAccessToken) ?? undefined,
        }),
      ),
      SESSION_COOKIE_OPTIONS,
    );

    return newAccessToken;
  } catch {
    return null;
  }
}

async function requestByUser(pathname: string, options?: RequestByUserOptions) {
  const session = await getSession();
  if (!session?.accessToken) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const response = await authorizedFetch(
    pathname,
    session.accessToken,
    options,
  );

  if (response.status !== 401 || !session.refreshToken) {
    return response;
  }

  const newAccessToken = await renewAuthorization(session);
  if (!newAccessToken) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  return authorizedFetch(pathname, newAccessToken, options);
}

export default requestByUser;
