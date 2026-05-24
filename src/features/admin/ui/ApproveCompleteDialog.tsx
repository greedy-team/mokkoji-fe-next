'use client';

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
              <div className="flex h-10 w-10 items-center justify-center">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <circle cx="20" cy="20" r="20" fill="#00BD79" />
                  <path
                    d="M11 20L17 26L29 14"
                    stroke="white"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <Dialog.Title className="text-center text-[16px] leading-[140%] font-medium text-[#000000]">
                승인이 완료되었어요.
                <br />
                신청자에게 안내 메일이 발송됩니다.
              </Dialog.Title>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="flex h-[51px] w-full items-center justify-center rounded-[12px] bg-[#4AF38A] text-[16px] leading-[140%] font-medium text-[#474747] transition-colors hover:bg-[#22CF64]"
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
