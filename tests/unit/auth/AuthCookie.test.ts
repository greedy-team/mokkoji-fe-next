import assert from 'node:assert/strict';
import { test } from 'node:test';

import {
  buildForwardedCookieHeader,
  needsTokenRefresh,
  relaySetCookies,
} from '@/shared/lib/auth-cookie';

function createToken(expiresAtSeconds: number) {
  const encode = (value: object) =>
    Buffer.from(JSON.stringify(value)).toString('base64url');
  return `${encode({ alg: 'HS256' })}.${encode({ sub: '1', exp: expiresAtSeconds })}.signature`;
}

const now = Date.UTC(2026, 10, 28, 12, 0, 0);
const nowSeconds = now / 1000;

test('인증 쿠키 두 개만 골라 Cookie 헤더로 만든다', () => {
  const cookies: Record<string, string> = {
    access_token: 'access',
    refresh_token: 'refresh',
    _ga: 'analytics',
  };

  assert.equal(
    buildForwardedCookieHeader((name) => cookies[name]),
    'access_token=access; refresh_token=refresh',
  );
});

test('인증 쿠키가 하나도 없으면 Cookie 헤더를 만들지 않는다', () => {
  assert.equal(
    buildForwardedCookieHeader(() => undefined),
    null,
  );
});

test('refresh 토큰만 남아 있으면 갱신한다', () => {
  assert.equal(needsTokenRefresh({ refreshToken: 'refresh', now }), true);
});

test('access 토큰이 만료됐으면 갱신한다', () => {
  assert.equal(
    needsTokenRefresh({
      accessToken: createToken(nowSeconds - 1),
      refreshToken: 'refresh',
      now,
    }),
    true,
  );
});

test('access 토큰이 곧 만료되면 미리 갱신한다', () => {
  assert.equal(
    needsTokenRefresh({
      accessToken: createToken(nowSeconds + 5),
      refreshToken: 'refresh',
      now,
    }),
    true,
  );
});

test('access 토큰이 아직 유효하면 갱신하지 않는다', () => {
  assert.equal(
    needsTokenRefresh({
      accessToken: createToken(nowSeconds + 600),
      refreshToken: 'refresh',
      now,
    }),
    false,
  );
});

test('refresh 토큰이 없으면 갱신하지 않는다', () => {
  assert.equal(
    needsTokenRefresh({ accessToken: createToken(nowSeconds - 1), now }),
    false,
  );
});

test('백엔드 응답의 Set-Cookie 를 빠짐없이 브라우저 응답으로 옮긴다', () => {
  const backendHeaders = new Headers();
  backendHeaders.append(
    'Set-Cookie',
    'access_token=new; Path=/; Domain=.mokkoji.site; HttpOnly',
  );
  backendHeaders.append(
    'Set-Cookie',
    'refresh_token=next; Path=/; Domain=.mokkoji.site; HttpOnly',
  );
  const browserHeaders = new Headers({ 'Set-Cookie': 'x-device-type=mobile' });

  relaySetCookies(backendHeaders, browserHeaders);

  assert.deepEqual(browserHeaders.getSetCookie(), [
    'x-device-type=mobile',
    'access_token=new; Path=/; Domain=.mokkoji.site; HttpOnly',
    'refresh_token=next; Path=/; Domain=.mokkoji.site; HttpOnly',
  ]);
});
