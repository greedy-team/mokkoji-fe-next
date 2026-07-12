'use client';

import Image from 'next/image';
import * as Dialog from '@radix-ui/react-dialog';

interface ApproveCompleteDialogProps {
  open: boolean;
  onClose: () => void;
}

function ApproveCompleteDialog({ open, onClose }: ApproveCompleteDialogProps) {
  return (
    <Dialog.Root open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 z-50 flex w-[385px] -translate-x-1/2 -translate-y-1/2 flex-col items-start rounded-[20px] bg-white px-6 pt-6 pb-5">
          <div className="flex w-[337px] flex-col items-center gap-6">
            <div className="flex flex-col items-center gap-[17px]">
              <Image
                src="/dashboard/approve-check.svg"
                alt="승인 완료"
                width={40}
                height={40}
              />
              <Dialog.Title className="text-center text-[16px] leading-[140%] font-medium text-[#000000]">
                승인이 완료되었어요.
                <br />
                신청자에게 안내 메일이 발송됩니다.
              </Dialog.Title>
              <Dialog.Description className="sr-only">
                승인이 완료되었습니다.
              </Dialog.Description>
            </div>
            <button
              type="button"
              onClick={onClose}
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

export default ApproveCompleteDialog;
