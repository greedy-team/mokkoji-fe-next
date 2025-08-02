'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';

function HeaderLogin() {
  const { data: session } = useSession();

  return (
    <span className="text-base font-light text-[#9C9C9C]">
      {session?.user?.name ? (
        <span className="flex gap-2 font-semibold whitespace-nowrap">
          <span className="font-bold text-gray-400">
            {session?.user?.name}님!
          </span>
          안녕하세요
        </span>
      ) : (
        <Link href="/login" className="whitespace-nowrap">
          로그인
        </Link>
      )}
    </span>
  );
}

export default HeaderLogin;
