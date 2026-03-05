'use server';

import 'server-only';
import ky from 'ky';
import { getSession } from '@/shared/lib/cookie-session';
import serverApi from './server-api';

const api = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_API_URL,
  hooks: {
    beforeRequest: [
      async (req) => {
        if (!req.headers.get('Authorization')) {
          const session = await getSession();

          if (!session?.accessToken) return;

          const isExpired = session.expiresAt
            ? Date.now() >= (session.expiresAt as number)
            : false;

          if (isExpired && session.refreshToken) {
            try {
              const refreshResponse = await serverApi.post(
                'users/auth/refresh',
                {
                  headers: {
                    Authorization: `Bearer ${session.refreshToken}`,
                  },
                },
              );
              const refreshData: { data: { accessToken: string } } =
                await refreshResponse.json();

              if (refreshData.data?.accessToken) {
                req.headers.set(
                  'Authorization',
                  `Bearer ${refreshData.data.accessToken}`,
                );
                return;
              }
            } catch {
              // 갱신 실패 시 afterResponse에서 처리
            }
          }

          req.headers.set('Authorization', `Bearer ${session.accessToken}`);
        }
      },
    ],
    afterResponse: [
      async (request, options, response) => {
        if (response.status !== 401) return response;

        // 이미 재시도한 요청이면 무한 루프 방지
        if (request.headers.get('X-Retry-After-Refresh')) {
          return response;
        }

        const session = await getSession();

        // 리프레시 토큰 만료됐으면 시도하지 않음
        if (!session?.refreshToken) {
          return response;
        }

        try {
          const refreshResponse = await serverApi.post('users/auth/refresh', {
            headers: {
              Authorization: `Bearer ${session.refreshToken}`,
            },
          });

          const refreshData: { data: { accessToken: string } } =
            await refreshResponse.json();

          if (!refreshData.data?.accessToken) {
            return response;
          }

          request.headers.set(
            'Authorization',
            `Bearer ${refreshData.data.accessToken}`,
          );
          request.headers.set('X-Retry-After-Refresh', 'true');

          return await ky(request, options);
        } catch {
          // 리프레시 실패 시 원래 401 응답 반환
          return response;
        }
      },
    ],
  },
});

export default api;
