'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { useState, useRef } from 'react';
import { Button } from '@/shared/ui/button';
import Image from 'next/image';
import LoginModal from '@/widgets/login/ui/login-modal';

function HeaderLogin() {
  const { data: session, status } = useSession();
  const [showLogout, setShowLogout] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const hideTimerRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (hideTimerRef.current) {
      clearTimeout(hideTimerRef.current);
    }
    setShowLogout(true);
  };

  const handleMouseLeave = () => {
    hideTimerRef.current = setTimeout(() => {
      setShowLogout(false);
    }, 1000);
  };

  return (
    <span className="relative rounded-sm bg-[#F4F4F4] p-1 text-sm font-light text-[#9C9C9C]">
      {status === 'authenticated' && session?.user ? (
        <div
          className="relative flex flex-col gap-1 font-semibold whitespace-nowrap"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="flex items-center gap-2">
            <span className="cursor-pointer font-bold text-gray-400">
              {session.user.name}님!
            </span>
            안녕하세요
          </div>

          {showLogout && (
            <Button
              onClick={() => signOut()}
              variant="submit"
              className="absolute top-full left-0 mt-1 w-full min-w-[120px] rounded-lg bg-white p-1 text-xs text-[#9C9C9C] shadow-md"
            >
              <Image
                src="/header/logout.svg"
                alt="로그아웃"
                width={15}
                height={15}
              />
              <span className="ml-2">로그아웃</span>
            </Button>
          )}
        </div>
      ) : (
        <div className="flex gap-2 whitespace-nowrap">
          <Link href="/register" className="whitespace-nowrap">
            회원가입
          </Link>
          <span className="whitespace-nowrap">|</span>
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
