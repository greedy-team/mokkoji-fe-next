import ky from 'ky';
import { auth } from '@/auth';
import ErrorMessage from '../lib/error-message';

const authApi = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_API_URL,
  hooks: {
    beforeRequest: [
      async (req) => {
        if (!req.headers.get('Authorization')) {
          const session = await auth();
          console.log('session', session);
          req.headers.set('Authorization', `Bearer ${session?.accessToken}`);
        }
      },
    ],
    beforeError: [
      async (error) => {
        ErrorMessage(error);
        return error;
      },
    ],
  },
});

export default authApi;
