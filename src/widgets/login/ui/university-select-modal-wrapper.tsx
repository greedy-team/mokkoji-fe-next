'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { toast } from 'react-toastify';
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

  const applyUniversityChange = async (code: string) => {
    setIsLoading(true);
    const response = await patchUniversityCode(code);
    setIsLoading(false);

    if (!response.ok) {
      toast.error(response.message);
      return;
    }

    setIsConfirmOpen(false);
    setIsOpen(false);

    router.push(`/${code}`);
    router.refresh();
  };

  const handleConfirm = (code: string) => {
    if (code === universityCode) {
      setIsOpen(false);
      return;
    }

    setPendingCode(code);
    setIsConfirmOpen(true);
  };

  const pendingUniversityName = universities.find(
    (university) => university.code === pendingCode,
  )?.name;

  return (
    <>
      <Button
        type="button"
        variant="none"
        size="none"
        className="text-sm text-[#00E457]"
        onClick={() => setIsOpen(true)}
      >
        학교 수정하기
        <Image src="/nextBlack.svg" alt="arrow" width={8} height={12} />
      </Button>

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
              학교를 변경하게 되면 지금부터{' '}
              {pendingUniversityName ?? pendingCode} 모꼬지를 이용하게 되며,
              기존 즐겨찾기는 모두 삭제됩니다.
              <br />
              계속하시겠어요?
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
              onClick={() => pendingCode && applyUniversityChange(pendingCode)}
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
