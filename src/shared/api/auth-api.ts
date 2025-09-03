'use server';

import 'server-only';
import ky from 'ky';
import { auth } from '@/auth';
import serverApi from './server-api';

async function authAPi() {
  return ky.create({
    prefixUrl: process.env.NEXT_PUBLIC_API_URL,
    hooks: {
      beforeRequest: [
        async (req) => {
          if (!req.headers.get('Authorization')) {
            const session = await auth();
            if (!session || !session.accessToken) return req;
            req.headers.set('Authorization', `Bearer ${session.accessToken}`);
            return req;
          }
          return req;
        },
      ],
      afterResponse: [
        async (request, options, response) => {
          if (response.status !== 401) return response;
          const session = await auth();
          if (!session || !session.refreshToken) return response;

          const refreshResponse = await serverApi.post('users/auth/refresh', {
            headers: {
              Authorization: `Bearer ${session.refreshToken}`,
            },
          });
          console.log('refreshResponse!', refreshResponse);

          const refreshData: { data: { accessToken: string } } =
            await refreshResponse.json();

          request.headers.set(
            'Authorization',
            `Bearer ${refreshData.data.accessToken}`,
          );

          return ky(request);
        },
      ],
    },
  });
}
export default authAPi;
