'use client';

import { Button } from '@/shared/ui/button';
import KakaoIcon from '@/shared/ui/kakao-icon';

function LoginButton() {
  const handleKakaoLogin = () => {
    console.log('카카오 로그인 시도');
  };

  return (
    <Button
      variant="kakao"
      onClick={handleKakaoLogin}
      className="flex h-12 w-full cursor-pointer justify-around text-base font-medium"
    >
      <KakaoIcon />
      카카오 로그인
      <span />
    </Button>
  );
}

export default LoginButton;
