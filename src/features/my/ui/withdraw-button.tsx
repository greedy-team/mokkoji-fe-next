'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import Image from 'next/image';
import useUniversityCode from '@/shared/hooks/useUniversityCode';
import { useSession } from '@/shared/lib/session-context';
import ConfirmDialog from '@/shared/ui/ConfirmDialog';
import deleteUser from '../api/deleteUser';

export default function WithdrawButton() {
  const router = useRouter();
  const { refresh } = useSession();
  const universityCode = useUniversityCode();
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleWithdraw = async () => {
    setSubmitting(true);
    const response = await deleteUser();
    if (!response.ok) {
      toast.error(response.message);
      setSubmitting(false);
      return;
    }
    await fetch('/api/auth/logout', { method: 'POST' });
    refresh();
    toast.success('회원 탈퇴가 완료되었습니다.');
    setOpen(false);
    router.push(`/${universityCode}`);
    router.refresh();
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="text-gray mt-2 flex items-center gap-2 text-sm hover:underline"
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
        pending={submitting}
        onOpenChange={setOpen}
        onConfirm={handleWithdraw}
      />
    </>
  );
}
