import ky, { HTTPError } from 'ky';
import { auth } from '@/auth';

const serverApi = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_API_URL,
  hooks: {
    beforeRequest: [
      async (req) => {
        if (!req.headers.get('Authorization')) {
          const session = await auth();
          req.headers.set('Authorization', `Bearer ${session?.accessToken}`);
        }
      },
    ],
    beforeError: [
      async (error) => {
        if (error instanceof HTTPError) {
          switch (error.response.status) {
            case 400:
              throw new Error('잘못된 요청입니다.');
            case 401:
              throw new Error('인증이 만료되었습니다.');
            case 403:
              throw new Error('권한이 없습니다.');
            case 404:
              throw new Error('요청한 자원을 찾을 수 없습니다.');
            case 409:
              throw new Error('이미 등록된 솔루션입니다.');
            case 500:
              throw new Error('서버 오류가 발생했습니다. 다시 시도해주세요.');
            default:
              throw new Error(
                '알 수 없는 오류가 발생했습니다. 다시 시도해주세요.',
              );
          }
        }
        throw new Error('알 수 없는 오류가 발생했습니다. 다시 시도해주세요.');
      },
    ],
  },
});

export default serverApi;
