'use server';

import 'server-only';
import ky from 'ky';
import { auth } from '@/auth';
import serverApi from './server-api';

const api = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_API_URL,
  hooks: {
    beforeRequest: [
      async (req) => {
        if (!req.headers.get('Authorization')) {
          const session = await auth();
          if (session?.accessToken) {
            req.headers.set('Authorization', `Bearer ${session.accessToken}`);
          }
        }
      },
    ],
    afterResponse: [
      async (request, options, response) => {
        if (response.status !== 401) return response;

        const session = await auth();
        if (!session?.refreshToken) return response;

        const refreshResponse = await serverApi.post('users/auth/refresh', {
          headers: {
            Authorization: `Bearer ${session.refreshToken}`,
          },
        });

        const refreshData: { data: { accessToken: string } } =
          await refreshResponse.json();

        request.headers.set(
          'Authorization',
          `Bearer ${refreshData.data.accessToken}`,
        );

        return ky(request, options);
      },
    ],
  },
});

export default api;
