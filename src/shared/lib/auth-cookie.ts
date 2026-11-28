import getTokenExpiration from '@/shared/lib/getTokenExpiration';

export const ACCESS_TOKEN_COOKIE_NAME = 'access_token';
export const REFRESH_TOKEN_COOKIE_NAME = 'refresh_token';
// 쿠키 인증 전 Next 가 직접 만들던 세션 쿠키. 남아 있으면 지운다
export const LEGACY_SESSION_COOKIE_NAME = 'app-session';

const AUTH_COOKIE_NAMES = [
  ACCESS_TOKEN_COOKIE_NAME,
  REFRESH_TOKEN_COOKIE_NAME,
] as const;

// 요청이 백엔드에 닿기 전에 만료되지 않도록 여유를 둔다
const EXPIRATION_MARGIN_MILLISECONDS = 30 * 1000;

type CookieReader = (name: string) => string | undefined;

/** 서버(RSC·Server Action·미들웨어)가 백엔드를 부를 때 사용자의 인증 쿠키만 골라 그대로 넘긴다. */
export function buildForwardedCookieHeader(
  readCookie: CookieReader,
): string | null {
  const pairs = AUTH_COOKIE_NAMES.flatMap((name) => {
    const value = readCookie(name);
    return value ? [`${name}=${value}`] : [];
  });
  return pairs.length > 0 ? pairs.join('; ') : null;
}

export function needsTokenRefresh({
  accessToken,
  refreshToken,
  now,
}: {
  accessToken?: string;
  refreshToken?: string;
  now: number;
}): boolean {
  if (!refreshToken) return false;
  if (!accessToken) return true;

  const expiresAt = getTokenExpiration(accessToken);
  if (expiresAt === null) return true;
  return now >= expiresAt - EXPIRATION_MARGIN_MILLISECONDS;
}

/**
 * 서버끼리 호출한 백엔드 응답의 Set-Cookie 를 브라우저로 가는 응답에 옮긴다.
 * 백엔드가 Next 서버에 준 쿠키는 브라우저까지 저절로 가지 않기 때문이다.
 */
export function relaySetCookies(source: Headers, target: Headers): void {
  source
    .getSetCookie()
    .forEach((cookie) => target.append('Set-Cookie', cookie));
}
