'use client';

import { signOut } from 'next-auth/react';
import Image from 'next/image';

export default function LogoutLink() {
  const handleLogout = () => {
    signOut({ callbackUrl: '/' });
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      className="flex items-center gap-1 text-[#00E457] hover:underline"
    >
      로그아웃
      <Image src="/favorite/next.svg" alt="arrow" width={6} height={6} />
    </button>
  );
}
