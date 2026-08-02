'use client';

import { useState } from 'react';
import useLogout from '@/shared/hooks/useLogout';
import ConfirmDialog from '@/shared/ui/ConfirmDialog';

import Image from 'next/image';

export default function LogoutLink() {
  const logout = useLogout();
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    setOpen(false);
    await logout();
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="mt-2 flex items-center gap-2 text-sm font-bold text-[#FF383C] hover:underline"
      >
        로그아웃
        <Image src="/nextBlack.svg" alt="arrow" width={8} height={12} />
      </button>

      <ConfirmDialog
        title="로그아웃"
        description="로그아웃 하시겠습니까?"
        confirmLabel="로그아웃"
        open={open}
        onOpenChange={setOpen}
        onConfirm={handleLogout}
      />
    </>
  );
}
