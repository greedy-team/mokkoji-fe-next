'use server';

import 'server-only';
import ky from 'ky';
import { getSession, updateSessionToken } from '@/shared/lib/cookie-session';
import getTokenExpiration from '@/shared/lib/getTokenExpiration';
import serverApi from './server-api';

async function refreshAccessToken(refreshToken: string) {
  const refreshResponse = await serverApi.post('users/auth/refresh', {
    headers: { Authorization: `Bearer ${refreshToken}` },
  });
  const refreshData: { data: { accessToken: string } } =
    await refreshResponse.json();
  return refreshData.data?.accessToken ?? null;
}

const api = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_API_URL,
  hooks: {
    beforeRequest: [
      async (req) => {
        if (req.headers.get('Authorization')) return;
        const session = await getSession();
        if (session?.accessToken) {
          req.headers.set('Authorization', `Bearer ${session.accessToken}`);
        }
      },
    ],
    afterResponse: [
      async (request, options, response) => {
        if (response.status !== 401) return response;
        if (request.headers.get('X-Retry-After-Refresh')) return response;

        const session = await getSession();
        if (!session?.refreshToken) return response;

        try {
          const newToken = await refreshAccessToken(session.refreshToken);
          if (!newToken) return response;

          try {
            await updateSessionToken(
              newToken,
              getTokenExpiration(newToken) ?? undefined,
            );
          } catch {
            // RSC에서는 쿠키 수정 불가 — 헤더에만 토큰 사용
          }

          request.headers.set('Authorization', `Bearer ${newToken}`);
          request.headers.set('X-Retry-After-Refresh', 'true');
          return await ky(request, options);
        } catch {
          return response;
        }
      },
    ],
  },
});

export default api;
