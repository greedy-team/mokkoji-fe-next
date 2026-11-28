import 'server-only';
import ky from 'ky';
import { cookies } from 'next/headers';
import { buildForwardedCookieHeader } from '@/shared/lib/auth-cookie';

const SAFE_METHODS = new Set(['GET', 'HEAD', 'OPTIONS']);

const api = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_API_URL,
  hooks: {
    beforeRequest: [
      async (request) => {
        if (request.headers.get('Authorization')) return;
        const cookieStore = await cookies();
        const cookieHeader = buildForwardedCookieHeader(
          (name) => cookieStore.get(name)?.value,
        );
        if (cookieHeader) {
          request.headers.set('Cookie', cookieHeader);
        }
        // 백엔드는 쿠키로 인증된 상태 변경 요청의 Origin 을 확인한다. 서버끼리 호출엔 Origin 이 없어서 직접 붙인다
        if (
          !SAFE_METHODS.has(request.method) &&
          process.env.NEXT_PUBLIC_BASE_URL
        ) {
          request.headers.set('Origin', process.env.NEXT_PUBLIC_BASE_URL);
        }
      },
    ],
  },
});

export default api;
