/* eslint-disable import/no-extraneous-dependencies, import/prefer-default-export */
import { http, HttpResponse } from 'msw';
import { apiUrl, type MockResponse } from '../response';

const SEVEN_DAYS_IN_SECONDS = 60 * 60 * 24 * 7;

const toBase64Url = (value: object) =>
  btoa(JSON.stringify(value))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');

// getTokenExpiration은 서명을 검증하지 않고 payload의 exp만 읽는다.
// exp를 멀리 두는 이유는 Edge 미들웨어의 토큰 갱신 fetch를 MSW가 가로채지 못해서, 만료되면 로그아웃되기 때문이다.
// 단 session-context가 만료 시각에 setTimeout으로 새로고침하므로 최대 지연(약 24.8일)을 넘기면 즉시 새로고침이 반복된다.
export const createMockToken = () =>
  [
    toBase64Url({ alg: 'none', typ: 'JWT' }),
    toBase64Url({
      sub: 'mock-user',
      exp: Math.floor(Date.now() / 1000) + SEVEN_DAYS_IN_SECONDS,
    }),
    'mock-signature',
  ].join('.');

interface TokenPair {
  accessToken: string;
  refreshToken: string;
}

export const authHandlers = [
  http.post<never, never, MockResponse<TokenPair & { isNewUser: boolean }>>(
    apiUrl('/users/auth/kakao'),
    () =>
      HttpResponse.json({
        data: {
          accessToken: createMockToken(),
          refreshToken: createMockToken(),
          isNewUser: false,
        },
      }),
  ),

  http.post<never, never, MockResponse<{ accessToken: string }>>(
    apiUrl('/users/auth/refresh'),
    () => HttpResponse.json({ data: { accessToken: createMockToken() } }),
  ),

  http.post<never, never, MockResponse<TokenPair>>(
    apiUrl('/admin/auth/login'),
    () =>
      HttpResponse.json({
        data: {
          accessToken: createMockToken(),
          refreshToken: createMockToken(),
        },
      }),
  ),
];
