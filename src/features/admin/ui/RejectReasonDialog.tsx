'use client';

import { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';

interface RejectReasonDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (rejectReason?: string) => void;
}

function RejectReasonDialog({
  open,
  onClose,
  onConfirm,
}: RejectReasonDialogProps) {
  const [reason, setReason] = useState('');

  const handleConfirm = () => {
    onConfirm(reason.trim() || undefined);
    setReason('');
  };

  const handleClose = () => {
    setReason('');
    onClose();
  };

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(isOpen) => !isOpen && handleClose()}
    >
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 z-50 flex w-[531px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-[20px] bg-white p-7">
          <div className="flex w-[475px] flex-col gap-6">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <Dialog.Title className="text-[20px] leading-[140%] font-semibold tracking-[-0.03em] text-[#000000]">
                  반려하기
                </Dialog.Title>
                <Dialog.Description className="text-[16px] leading-[140%] font-medium text-[#8B95A1]">
                  구체적인 반려 사유를 알려주세요.
                </Dialog.Description>
              </div>
              <textarea
                value={reason}
                onChange={(event) => setReason(event.target.value)}
                placeholder="반려 사유를 입력해주세요"
                className="h-[160px] w-full resize-none rounded-[16px] border border-[#7F7F7F] px-5 pt-5 text-[16px] leading-[140%] font-medium text-[#474747] placeholder:text-[#9F9F9F] focus:outline-none"
              />
            </div>
            <button
              type="button"
              onClick={handleConfirm}
              className="flex h-[51px] w-full cursor-pointer items-center justify-center rounded-[12px] bg-[#4AF38A] text-[16px] leading-[140%] font-medium text-[#474747] transition-colors hover:bg-[#22CF64]"
            >
              완료
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default RejectReasonDialog;
