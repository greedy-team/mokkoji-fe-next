'use client';

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
import Input from '@/shared/ui/input';
import cn from '@/shared/lib/utils';
import Image from 'next/image';
import useEmailEdit from '../model/useEmailEdit';

type EmailChangeDialogProps = {
  initialEmail?: string;
  triggerClassName?: string;
  triggerLabel?: string;
};

export default function EmailChangeDialog({
  initialEmail,
  triggerClassName,
  triggerLabel = '이메일 수정하기',
}: EmailChangeDialogProps) {
  const {
    open,
    setOpen,
    email,
    setEmail,
    submitting,
    isValidEmail,
    helperText,
    resetState,
    handleSubmit,
  } = useEmailEdit(initialEmail);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        asChild
        onClick={() => {
          resetState();
          setOpen(true);
        }}
      >
        <Button className={cn(triggerClassName)} variant="none">
          {triggerLabel}
          <Image src="favorite/next.svg" alt="edit" width={6} height={6} />
        </Button>
      </DialogTrigger>

      <DialogContent
        aria-describedby="email-change-desc"
        className="w-[400px] rounded-2xl"
      >
        <DialogHeader>
          <DialogTitle className="font-semibold">이메일 수정하기</DialogTitle>
          <DialogDescription
            id="email-change-desc"
            className="text-xs text-[#00E457]"
          >
            메일 주소를 입력하세요!
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="grid gap-2">
          <label htmlFor="email" className="hidden text-sm font-medium">
            이메일
          </label>

          <Input
            id="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@domain.com"
            disabled={submitting}
            aria-describedby="email-helper"
          />
          <p
            id="email-helper"
            aria-live="polite"
            className="text-xs text-[#9C9C9C]"
          >
            {helperText}
          </p>

          <DialogFooter>
            <Button
              className="h-[50px] w-full"
              type="submit"
              variant="submit"
              disabled={submitting || !email || !isValidEmail}
            >
              {submitting ? '저장 중…' : '확인'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
