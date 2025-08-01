'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';

function HeaderLogin() {
  const { data: session, status } = useSession();

  return (
    <span className="text-base font-light text-[#9C9C9C]">
      {status === 'authenticated' && session?.user ? (
        <span className="flex gap-2 font-semibold whitespace-nowrap">
          <span className="font-bold text-gray-400">
            {session.user.name}님!
          </span>
          안녕하세요
        </span>
      ) : (
        <div className="flex gap-2 whitespace-nowrap">
          <Link href="/register" className="whitespace-nowrap">
            회원가입
          </Link>
          <span className="whitespace-nowrap">|</span>
          <Link href="/login" className="whitespace-nowrap">
            로그인
          </Link>
        </div>
      )}
    </span>
  );
}

export default HeaderLogin;
