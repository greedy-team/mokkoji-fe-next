'use client';

import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { useState, useRef } from 'react';
import { Button } from '@/shared/ui/button';
import Image from 'next/image';
import LoginModal from '@/widgets/login/ui/login-modal';

interface HeaderLoginProps {
  userName: string;
}

function HeaderLogin({ userName }: HeaderLoginProps) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const hideTimerRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (hideTimerRef.current) {
      clearTimeout(hideTimerRef.current);
    }
    setShowDropdown(true);
  };

  const handleMouseLeave = () => {
    hideTimerRef.current = setTimeout(() => {
      setShowDropdown(false);
    }, 3000);
  };

  return (
    <span className="absolute right-[22%] rounded-sm bg-[#F4F4F4] p-2 px-4 text-xs font-light text-[#9C9C9C] lg:right-[15%] lg:text-sm">
      {userName ? (
        <div
          className="relative flex flex-col gap-1 font-semibold whitespace-nowrap"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="flex items-center gap-2">
            <span className="cursor-pointer font-bold">{userName}님!</span>
            안녕하세요
          </div>

          {showDropdown && (
            <>
              <button
                aria-label="닫기"
                className="fixed inset-0 z-40"
                onClick={() => setShowDropdown(false)}
              />
              <Link
                href="/my"
                className="absolute top-full left-0 z-50 mt-4 h-[35px] w-full min-w-[120px] rounded-lg bg-white pt-2.5 text-center text-xs text-[#9C9C9C] shadow-md hover:bg-[#00c94c] hover:text-black"
              >
                <span className="ml-2">마이페이지</span>
              </Link>
              <Button
                onClick={() => {
                  signOut({ callbackUrl: '/' });
                }}
                variant="submit"
                className="absolute top-16 left-0 z-50 mt-4 w-full min-w-[120px] rounded-lg bg-white p-1 text-xs text-[#9C9C9C] shadow-md hover:text-black"
              >
                <Image
                  src="/header/logout.svg"
                  alt="로그아웃"
                  width={12}
                  height={12}
                />
                <span className="ml-1">로그아웃</span>
              </Button>
            </>
          )}
        </div>
      ) : (
        <div className="flex gap-2 whitespace-nowrap">
          {/* <Link href="/register" className="whitespace-nowrap">
            회원가입
          </Link>
          <span className="whitespace-nowrap">|</span> */}
          <button
            onClick={() => setIsLoginOpen(true)}
            className="cursor-pointer whitespace-nowrap"
          >
            로그인
          </button>
          <LoginModal
            open={isLoginOpen}
            onClose={() => setIsLoginOpen(false)}
          />
        </div>
      )}
    </span>
  );
}

export default HeaderLogin;
