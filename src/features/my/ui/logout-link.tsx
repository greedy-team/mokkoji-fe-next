'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function LogoutLink() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/');
    router.refresh();
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
