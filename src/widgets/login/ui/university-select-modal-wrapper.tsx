'use client';

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import type { University } from '@/entities/university/model/type';
import patchUniversityCode from '@/features/my/api/patchUniversityCode';
import useServerAction from '@/shared/hooks/useServerAction';
import { toUrlCode } from '@/shared/lib/urlCodeConverter';
import { Button } from '@/shared/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/shared/ui/dialog';
import nextBlackIcon from '@/shared/assets/images/nextBlack.svg';
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
  const [pendingCode, setPendingCode] = useState<string | null>(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const appliedCodeRef = useRef<string | null>(null);

  const { mutate: changeUniversity, isPending: isLoading } = useServerAction(
    patchUniversityCode,
    {
      showSuccessToast: false,
      onSuccess: () => {
        setIsConfirmOpen(false);
        setIsOpen(false);

        router.push(`/${toUrlCode(appliedCodeRef.current!)}`);
        router.refresh();
      },
    },
  );

  const applyUniversityChange = (code: string) => {
    appliedCodeRef.current = code;
    changeUniversity(code);
  };

  const handleConfirm = (code: string) => {
    if (code === universityCode) {
      setIsOpen(false);
      return;
    }

    if (universityCode === null) {
      applyUniversityChange(code);
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
        <Image src={nextBlackIcon} alt="arrow" width={8} height={12} />
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
