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
      className="mt-2 flex items-center gap-2 font-semibold text-[#FF383C] hover:underline"
    >
      로그아웃
      <Image src="/nextBlack.svg" alt="arrow" width={8} height={12} />
    </button>
  );
}
