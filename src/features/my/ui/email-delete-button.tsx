'use client';

import { useState } from 'react';
import { toast } from 'react-toastify';
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
import Image from 'next/image';
import deleteEmail from '../api/deleteEmail';

export default function EmailDeleteButton() {
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleDelete = async () => {
    setSubmitting(true);
    const response = await deleteEmail();
    if (!response.ok) {
      toast.error(response.message);
      setSubmitting(false);
      return;
    }
    toast.success('이메일이 삭제되었습니다.');
    setOpen(false);
    setSubmitting(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="none" size="none" className="text-sm text-red-500">
          이메일 삭제
          <Image src="/nextBlack.svg" alt="edit" width={8} height={12} />
        </Button>
      </DialogTrigger>

      <DialogContent
        aria-describedby="email-delete-desc"
        className="w-[400px] rounded-2xl"
      >
        <DialogHeader>
          <DialogTitle className="font-semibold">이메일 삭제</DialogTitle>
          <DialogDescription id="email-delete-desc" className="text-sm">
            이메일을 삭제할 경우, 동아리 모집 정보가 수신되지 않습니다.
            <br />
            <br />
            삭제하시겠습니까?
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
            onClick={handleDelete}
            disabled={submitting}
          >
            {submitting ? '삭제 중…' : '삭제'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
