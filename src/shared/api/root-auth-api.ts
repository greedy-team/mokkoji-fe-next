import ky from 'ky';
import { getSession } from '@/shared/lib/cookie-session';

const rootBaseUrl = (process.env.NEXT_PUBLIC_API_URL ?? '').split('/api/')[0];

const rootApi = ky.create({
  prefixUrl: rootBaseUrl,
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
  },
});

export default rootApi;
