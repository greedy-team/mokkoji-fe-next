'use client';

import { useState } from 'react';
import useUniversityCode from '@/shared/hooks/useUniversityCode';
import { useSession } from '@/shared/lib/session-context';
import ConfirmDialog from '@/shared/ui/ConfirmDialog';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function LogoutLink() {
  const router = useRouter();
  const { refresh } = useSession();
  const universityCode = useUniversityCode();
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    refresh();
    setOpen(false);
    router.push(`/${universityCode}`);
    router.refresh();
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="mt-2 flex items-center gap-2 text-sm text-[#FF383C] hover:underline"
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
