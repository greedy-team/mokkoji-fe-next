'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import type { University } from '@/entities/university/model/type';
import patchUniversityCode from '@/features/my/api/patchUniversityCode';
import { Button } from '@/shared/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/shared/ui/dialog';
import UniversitySelectModal from './university-select-modal';

interface UniversitySelectModalWrapperProps {
  defaultOpen?: boolean;
  universityCode: string | null;
  universities: University[];
}

function UniversitySelectModalWrapper({
  defaultOpen = false,
  universityCode,
  universities,
}: UniversitySelectModalWrapperProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [isLoading, setIsLoading] = useState(false);
  const [pendingCode, setPendingCode] = useState<string | null>(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const applyUniversityChange = async (code: string | null) => {
    setIsLoading(true);
    await patchUniversityCode(code);
    setIsLoading(false);
    setIsConfirmOpen(false);
    setIsOpen(false);
    router.refresh();
  };

  const handleConfirm = (code: string) => {
    const normalizedCode = code === 'NONE' ? null : code;

    if (normalizedCode === universityCode) {
      setIsOpen(false);
      return;
    }

    setPendingCode(normalizedCode);
    setIsConfirmOpen(true);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="mt-2 flex items-center gap-2 font-semibold text-gray-600 hover:underline"
      >
        학교 수정하기
        <Image src="/nextBlack.svg" alt="arrow" width={8} height={12} />
      </button>

      <UniversitySelectModal
        isOpen={isOpen}
        isLoading={isLoading}
        universities={universities}
        universityCode={universityCode}
        onClose={() => setIsOpen(false)}
        onConfirm={handleConfirm}
      />

      <Dialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
        <DialogContent
          aria-describedby="university-change-desc"
          className="w-[360px] rounded-2xl"
        >
          <DialogHeader>
            <DialogTitle className="font-semibold">
              학교를 변경할까요?
            </DialogTitle>
            <DialogDescription
              id="university-change-desc"
              className="text-text-secondary text-sm"
            >
              학교를 변경하면 기존 즐겨찾기가 모두 삭제됩니다. 계속하시겠어요?
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              disabled={isLoading}
              onClick={() => setIsConfirmOpen(false)}
            >
              취소
            </Button>
            <Button
              type="button"
              variant="submit-default"
              className="flex-1"
              disabled={isLoading}
              onClick={() => applyUniversityChange(pendingCode)}
            >
              {isLoading ? '변경 중…' : '변경하기'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default UniversitySelectModalWrapper;
