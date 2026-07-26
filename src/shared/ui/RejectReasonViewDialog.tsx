'use client';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/ui/dialog';
import { Button } from '@/shared/ui/button';

interface RejectReasonViewDialogProps {
  rejectReason: string | null;
  triggerLabel?: string;
  triggerClassName?: string;
}

function RejectReasonViewDialog({
  rejectReason,
  triggerLabel = '반려 사유 확인',
  triggerClassName = 'text-text-tertiary text-xs underline',
}: RejectReasonViewDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button type="button" className={triggerClassName}>
          {triggerLabel}
        </button>
      </DialogTrigger>
      <DialogContent
        aria-describedby="reject-reason-description"
        className="w-[400px] rounded-2xl"
      >
        <DialogHeader>
          <DialogTitle className="flex items-start font-semibold">
            반려 사유
          </DialogTitle>
        </DialogHeader>
        <DialogDescription
          id="reject-reason-description"
          className="text-text-secondary text-sm"
        >
          {rejectReason}
        </DialogDescription>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              type="button"
              variant="submit-default"
              className="mt-2 rounded-xl bg-[#4AF38A] py-6 font-normal text-[#474747] disabled:text-white"
            >
              확인
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default RejectReasonViewDialog;
