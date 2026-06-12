import 'server-only';
import ky from 'ky';
import { getDashboardSession } from '@/shared/lib/dashboard-session';

const dashboardApi = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_API_URL,
  hooks: {
    beforeRequest: [
      async (req) => {
        if (req.headers.get('Authorization')) return;
        const session = await getDashboardSession();
        if (session?.accessToken) {
          req.headers.set('Authorization', `Bearer ${session.accessToken}`);
        }
      },
    ],
  },
});

export default dashboardApi;
