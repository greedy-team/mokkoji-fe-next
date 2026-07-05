'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import Image from 'next/image';
import useUniversityCode from '@/shared/hooks/useUniversityCode';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/shared/ui/dialog';
import { Button } from '@/shared/ui/button';
import deleteUser from '../api/deleteUser';

export default function WithdrawButton() {
  const router = useRouter();
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
    toast.success('회원 탈퇴가 완료되었습니다.');
    setOpen(false);
    router.push(`/${universityCode}`);
    router.refresh();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          type="button"
          className="mt-2 flex items-center gap-2 text-[#FF383C] hover:underline"
        >
          회원 탈퇴
          <Image src="/nextBlack.svg" alt="arrow" width={8} height={12} />
        </button>
      </DialogTrigger>

      <DialogContent
        aria-describedby="withdraw-desc"
        className="w-[400px] rounded-2xl"
      >
        <DialogHeader>
          <DialogTitle className="font-semibold">회원 탈퇴</DialogTitle>
          <DialogDescription id="withdraw-desc" className="text-sm">
            탈퇴 시 계정과 관련된{' '}
            <span className="font-semibold underline">
              모든 데이터가 삭제되며 복구할 수 없습니다.
            </span>
            <br />
            <br />
            정말 탈퇴하시겠습니까?
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={submitting}
          >
            취소
          </Button>
          <Button
            className="bg-red-500 text-white hover:bg-red-600"
            onClick={handleWithdraw}
            disabled={submitting}
          >
            {submitting ? '탈퇴 중…' : '탈퇴'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
