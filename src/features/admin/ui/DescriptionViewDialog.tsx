'use client';

import * as Dialog from '@radix-ui/react-dialog';
import convertLinkText from '@/entities/club-detail/util/convertLinkText';

interface DescriptionViewDialogProps {
  open: boolean;
  onClose: () => void;
  clubName: string;
  description: string;
}

function DescriptionViewDialog({
  open,
  onClose,
  clubName,
  description,
}: DescriptionViewDialogProps) {
  return (
    <Dialog.Root open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 z-50 flex w-[531px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-[20px] bg-white p-7">
          <div className="flex w-[475px] flex-col gap-6">
            <div className="flex flex-col gap-1">
              <Dialog.Title className="text-[20px] leading-[140%] font-semibold tracking-[-0.03em] text-[#000000]">
                한 줄 소개
              </Dialog.Title>
              <Dialog.Description className="text-[16px] leading-[140%] font-medium text-[#8B95A1]">
                {clubName}
              </Dialog.Description>
            </div>
            <div
              className="min-h-[120px] w-full rounded-[16px] border border-[#E2E2E2] px-5 py-5 text-[16px] leading-[140%] font-medium break-words whitespace-pre-wrap text-[#474747] [&_a]:text-[#20E86C] [&_a]:underline"
              dangerouslySetInnerHTML={{ __html: convertLinkText(description) }}
            />
            <button
              type="button"
              onClick={onClose}
              className="flex h-[51px] w-full cursor-pointer items-center justify-center rounded-[12px] bg-[#4AF38A] text-[16px] leading-[140%] font-medium text-[#474747] transition-colors hover:bg-[#22CF64]"
            >
              확인
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default DescriptionViewDialog;
