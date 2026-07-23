'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Input from '@/shared/ui/input';
import { Button } from '@/shared/ui/button';
import { Eye, EyeOff } from 'lucide-react';
import DotsPulseLoader from '@/shared/ui/DotsPulseLoader';

export default function DashboardLoginPage() {
  const router = useRouter();
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!loginId || !password) return;

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const res = await fetch('/api/auth/dashboard-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ loginId, password }),
      });
      const data = await res.json();

      if (!res.ok || !data.ok) {
        setErrorMessage(data.message ?? '아이디 또는 비밀번호를 확인해주세요.');
        return;
      }

      router.push('/dashboard');
    } catch {
      setErrorMessage('로그인 중 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-[400px] rounded-2xl bg-white px-8 py-10 shadow-md">
        <div className="mb-8 flex flex-col items-center gap-2">
          <div className="flex items-center gap-1.5">
            <Image
              src="/header/mokkojiLogo.svg"
              alt="모꼬지 로고"
              width={28}
              height={28}
            />
            <span className="text-2xl font-bold text-black">Mokkoji</span>
          </div>
          <p className="text-sm text-gray-500">총동아리연합회 관리자 로그인</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="loginId" className="text-xs font-medium">
              아이디
            </label>
            <Input
              id="loginId"
              name="loginId"
              type="text"
              placeholder="아이디를 입력해주세요"
              value={loginId}
              onChange={(e) => setLoginId(e.target.value)}
              autoComplete="username"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="password" className="text-xs font-medium">
              비밀번호
            </label>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={isPasswordVisible ? 'text' : 'password'}
                placeholder="비밀번호를 입력해주세요"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setIsPasswordVisible((prev) => !prev)}
                className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400"
                aria-label="비밀번호 보기 토글"
              >
                {isPasswordVisible ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {errorMessage && (
            <p className="text-xs text-[#FF383C]">{errorMessage}</p>
          )}

          {isSubmitting ? (
            <div className="flex h-11 items-center justify-center">
              <DotsPulseLoader className="mr-3" text="로그인 중..." />
            </div>
          ) : (
            <Button
              type="submit"
              disabled={!loginId || !password}
              className="mt-2 h-11 w-full bg-black font-medium text-white disabled:bg-[#D9D9D9] disabled:text-[#9C9C9C]"
            >
              로그인
            </Button>
          )}
        </form>
      </div>
    </div>
  );
}
