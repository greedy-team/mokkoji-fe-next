import ky from 'ky';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// 동시에 여러 요청이 401 을 받아도 갱신은 한 번만 보낸다
let refreshing: Promise<boolean> | null = null;

function refreshTokens(): Promise<boolean> {
  refreshing ??= ky
    .post(`${API_URL}/users/auth/refresh`, {
      credentials: 'include',
      throwHttpErrors: false,
    })
    .then((response) => response.ok)
    .catch(() => false)
    .finally(() => {
      refreshing = null;
    });
  return refreshing;
}

/**
 * 브라우저에서 백엔드를 직접 부른다. 인증은 백엔드가 준 HttpOnly 쿠키가 담당하므로 토큰을 다루지 않는다.
 * access 토큰이 만료돼 401 이 오면 refresh 쿠키로 한 번 갱신하고 같은 요청을 다시 보낸다.
 */
const clientApi = ky.create({
  prefixUrl: API_URL,
  credentials: 'include',
  hooks: {
    beforeRequest: [
      () => {
        if (typeof window === 'undefined') {
          throw new Error('clientApi is not available on the server');
        }
      },
    ],
    afterResponse: [
      async (request, _options, response) => {
        if (response.status !== 401) return response;
        const isRefreshed = await refreshTokens();
        return isRefreshed ? ky(request, { credentials: 'include' }) : response;
      },
    ],
  },
});

export default clientApi;
