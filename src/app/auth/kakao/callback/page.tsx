'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import ky from 'ky';

export default function KakaoCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get('code');

  useEffect(() => {
    const loginWithKakao = async () => {
      if (!code) return;

      try {
        const response = await ky
          .post(`${process.env.NEXT_PUBLIC_API_URL}/users/auth/login`, {
            json: { code },
          })
          .json<{ accessToken: string; user: any }>();

        document.cookie = `accessToken=${response.accessToken}; path=/; max-age=${60 * 60 * 24}; secure;`;

        router.push('/dashboard');
      } catch (error) {
        console.error('카카오 로그인 실패:', error);
      }
    };

    loginWithKakao();
  }, [code, router]);

  return <p>로그인 처리 중...</p>;
}
