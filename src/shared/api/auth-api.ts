import 'server-only';
import ky from 'ky';
import {
  getSession,
  updateSessionToken,
  deleteSession,
} from '@/shared/lib/cookie-session';
import getTokenExpiration from '@/shared/lib/getTokenExpiration';
import serverApi from './server-api';

// 동시 refresh 방지용 — 진행 중인 refresh Promise를 공유
let refreshPromise: Promise<string | null> | null = null;

async function refreshAccessToken(refreshToken: string) {
  const refreshResponse = await serverApi.post('users/auth/refresh', {
    headers: { Authorization: `Bearer ${refreshToken}` },
  });
  const refreshData: { data: { accessToken: string } } =
    await refreshResponse.json();
  return refreshData.data?.accessToken ?? null;
}

/**
 * 동시에 여러 요청이 401을 받아도 refresh API는 1번만 호출됨.
 * 이미 진행 중이면 같은 Promise를 반환하고,
 * 완료(성공/실패) 후 finally로 초기화하여 다음 사이클 허용.
 */
async function getRefreshedToken(refreshToken: string) {
  if (refreshPromise) return refreshPromise;

  refreshPromise = refreshAccessToken(refreshToken).finally(() => {
    refreshPromise = null;
  });

  return refreshPromise;
}

const api = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_API_URL,
  hooks: {
    // 매 요청마다 쿠키에서 accessToken을 꺼내 Authorization 헤더에 주입
    beforeRequest: [
      async (req) => {
        if (req.headers.get('Authorization')) return;
        const session = await getSession();
        if (session?.accessToken) {
          req.headers.set('Authorization', `Bearer ${session.accessToken}`);
        }
      },
    ],
    // 401 응답 시 토큰 갱신 후 재시도
    afterResponse: [
      async (request, options, response) => {
        if (response.status !== 401) return response;
        // 이미 refresh 후 재시도한 요청이면 무한루프 방지
        if (request.headers.get('X-Retry-After-Refresh')) return response;

        const session = await getSession();
        if (!session?.refreshToken) return response;

        try {
          const newToken = await getRefreshedToken(session.refreshToken);

          // refresh 실패 → 세션 삭제 (로그아웃 처리)
          if (!newToken) {
            try {
              await deleteSession();
            } catch {
              /* RSC에서는 쿠키 삭제 불가 */
            }
            return response;
          }

          // 새 토큰을 쿠키에 저장 (RSC에서는 실패해도 헤더로 대체)
          try {
            await updateSessionToken(
              newToken,
              getTokenExpiration(newToken) ?? undefined,
            );
          } catch {
            /* RSC에서는 쿠키 수정 불가 */
          }

          // 새 토큰으로 원래 요청 재시도
          request.headers.set('Authorization', `Bearer ${newToken}`);
          request.headers.set('X-Retry-After-Refresh', 'true');
          return await ky(request, options);
        } catch {
          // refresh API 자체가 실패 → 세션 삭제
          try {
            await deleteSession();
          } catch {
            /* RSC에서는 쿠키 삭제 불가 */
          }
          return response;
        }
      },
    ],
  },
});

export default api;
