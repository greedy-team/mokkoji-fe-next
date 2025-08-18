'use server';

import 'server-only';
import ky from 'ky';
import { headers } from 'next/headers';
import { getToken } from 'next-auth/jwt';

async function authAPi() {
  const reqLike = {
    headers: { cookie: (await headers()).get('cookie') ?? '' },
  };

  const jwt = await getToken({
    req: reqLike,
    secret: '1004',
  });

  if (!jwt) {
    return ky.create({
      prefixUrl: process.env.NEXT_PUBLIC_API_URL,
    });
  }

  const access = jwt.accessToken;

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
