'use server';

import 'server-only';
import ky from 'ky';
import { auth } from '@/auth';

async function authAPi() {
  const session = await auth();

  if (!session?.accessToken) {
    return ky.create({
      prefixUrl: process.env.NEXT_PUBLIC_API_URL,
    });
  }

  return ky.create({
    prefixUrl: process.env.NEXT_PUBLIC_API_URL,
    hooks: {
      beforeRequest: [
        async (req) => {
          if (session.accessToken && !req.headers.get('Authorization')) {
            req.headers.set('Authorization', `Bearer ${session.accessToken}`);
          }
        },
      ],
    },
  });
}
export default authAPi;
