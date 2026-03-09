import 'server-only';
import ky from 'ky';
import { getSession } from '@/shared/lib/cookie-session';

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
  },
});

export default api;
