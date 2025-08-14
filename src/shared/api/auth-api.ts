'use server';

import 'server-only';
import ky from 'ky';
import { headers } from 'next/headers';
import { getToken } from 'next-auth/jwt';

async function authAPi() {
  const reqLike = {
    headers: { cookie: (await headers()).get('cookie') ?? '' },
  } as any;

  const jwt = await getToken({
    req: reqLike,
    secret: process.env.NEXT_AUTH_SECRET,
  });

  const access = jwt?.accessToken as string | undefined;

  console.log('access', access);

  return ky.create({
    prefixUrl: process.env.NEXT_PUBLIC_API_URL,
    hooks: {
      beforeRequest: [
        async (req) => {
          if (access && !req.headers.get('Authorization')) {
            req.headers.set('Authorization', `Bearer ${access}`);
          }
        },
      ],
    },
  });
}
export default authAPi;
