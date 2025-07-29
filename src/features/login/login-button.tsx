'use client';

import { Button } from '@/shared/ui/button';
import KakaoIcon from '@/shared/ui/kakao-icon';

function LoginButton() {
  const handleKakaoLogin = () => {
    const kakaoAuthURL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URL}`;
    window.location.href = kakaoAuthURL;
  };
  return (
    <Button
      variant="kakao"
      onClick={handleKakaoLogin}
      className="mt-20 flex h-12 w-full cursor-pointer justify-around text-base font-medium"
    >
      <KakaoIcon />
      카카오 로그인
      <span />
    </Button>
  );
}

export default LoginButton;
