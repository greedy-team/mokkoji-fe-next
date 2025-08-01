'use client';

import { useState } from 'react';
import { Button } from '@/shared/ui/button';
import KakaoIcon from '@/shared/ui/kakao-icon';
import { signIn } from 'next-auth/react';

function LoginForm() {
  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');

  const handleKakaoLogin = () => {
    const kakaoAuthURL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URL}`;
    window.location.href = kakaoAuthURL;
  };

  const handleSubmit = async () => {
    await signIn('credentials', {
      redirect: true,
      studentId,
      password,
    });
  };
  return (
    <div className="mt-20 w-full space-y-4">
      <input
        type="text"
        placeholder="학번"
        value={studentId}
        onChange={(e) => setStudentId(e.target.value)}
        className="w-full rounded border px-3 py-2"
      />
      <input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full rounded border px-3 py-2"
      />
      <Button
        onClick={handleSubmit}
        className="h-10 w-full bg-black font-medium text-white"
      >
        로그인
      </Button>
      <Button
        variant="kakao"
        onClick={handleKakaoLogin}
        className="flex h-12 w-full cursor-pointer justify-around text-base font-medium"
      >
        <KakaoIcon />
        카카오 로그인
        <span />
      </Button>
    </div>
  );
}

export default LoginForm;
