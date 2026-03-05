'use server';

import 'server-only';
import ky from 'ky';
import {
  getSession,
  updateSessionToken,
  deleteSession,
} from '@/shared/lib/cookie-session';
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
        if (!session?.accessToken) return;

        const isExpired = session.expiresAt
          ? Date.now() >= session.expiresAt
          : false;

        if (isExpired && session.refreshToken) {
          try {
            const newToken = await refreshAccessToken(session.refreshToken);
            if (newToken) {
              await updateSessionToken(
                newToken,
                getTokenExpiration(newToken) ?? undefined,
              );
              req.headers.set('Authorization', `Bearer ${newToken}`);
              return;
            }
          } catch {
            await deleteSession();
            return;
          }
        }

        req.headers.set('Authorization', `Bearer ${session.accessToken}`);
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
          if (!newToken) {
            await deleteSession();
            return response;
          }

          await updateSessionToken(
            newToken,
            getTokenExpiration(newToken) ?? undefined,
          );

          request.headers.set('Authorization', `Bearer ${newToken}`);
          request.headers.set('X-Retry-After-Refresh', 'true');

          return await ky(request, options);
        } catch {
          await deleteSession();
          return response;
        }
      },
    ],
  },
});

export default api;
