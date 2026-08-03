'use client';

import { useState } from 'react';
import Image from 'next/image';
import useServerAction from '@/shared/hooks/useServerAction';
import useLogout from '@/shared/hooks/useLogout';
import ConfirmDialog from '@/shared/ui/ConfirmDialog';
import deleteUser from '../api/deleteUser';

export default function WithdrawButton() {
  const logout = useLogout();
  const [open, setOpen] = useState(false);
  const { mutate, isPending } = useServerAction(deleteUser, {
    onSuccess: async () => {
      setOpen(false);
      await logout();
    },
  });

  const handleWithdraw = () => mutate();

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="text-gray mt-2 flex items-center gap-2 text-sm font-bold hover:underline"
      >
        회원 탈퇴
        <Image src="/nextBlack.svg" alt="arrow" width={8} height={12} />
      </button>

      <ConfirmDialog
        title="회원 탈퇴"
        description={
          <>
            탈퇴 시 계정과 관련된{' '}
            <span className="font-semibold underline">
              모든 데이터가 삭제되며 복구할 수 없습니다.
            </span>
            <br />
            <br />
            정말 탈퇴하시겠습니까?
          </>
        }
        confirmLabel="탈퇴"
        pendingLabel="탈퇴 중…"
        open={open}
        pending={isPending}
        onOpenChange={setOpen}
        onConfirm={handleWithdraw}
      />
    </>
  );
}
