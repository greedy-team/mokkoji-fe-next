'use client';

import ky from 'ky';
import { useSession } from 'next-auth/react';
import ErrorMessage from '../lib/error-message';

const clientAuthApi = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_API_URL,
  hooks: {
    beforeRequest: [
      async (req) => {
        if (!req.headers.get('Authorization')) {
          const session = useSession();
          req.headers.set(
            'Authorization',
            `Bearer ${session?.data?.accessToken}`,
          );
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

export default clientAuthApi;
