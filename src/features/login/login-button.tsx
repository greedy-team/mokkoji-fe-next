'use client';

import { signIn } from 'next-auth/react';
import { Button } from '@/shared/ui/button';
import KakaoIcon from '@/shared/ui/kakao-icon';

function LoginButton() {
  return (
    <Button
      variant="kakao"
      onClick={() => signIn('kakao')}
      className="mt-20 flex h-12 w-full cursor-pointer justify-around text-base font-medium"
    >
      <KakaoIcon />
      카카오 로그인
      <span />
    </Button>
  );
}

export default LoginButton;
