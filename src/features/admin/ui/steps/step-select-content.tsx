'use client';

import Image from 'next/image';
import { PrevButton } from '@/shared/ui/navigation-button';
import type { ContentType } from '../../model/types';

interface StepSelectContentProps {
  clubName?: string;
  onNext: (contentType: ContentType) => void;
  onBack: () => void;
}

function StepSelectContent({
  clubName,
  onNext,
  onBack,
}: StepSelectContentProps) {
  return (
    <div className="flex min-h-[calc(100vh-134px)] w-full flex-col items-center justify-between">
      <div className="flex flex-col items-center gap-2">
        <Image src="/admin/main_logo.png" alt="logo" width={329} height={119} />
        <p className="text-sm text-[#1AE166]">
          권한 | <span className="font-bold">{clubName} 동아리장</span>
        </p>
      </div>

      <div className="flex flex-col items-center gap-9">
        <button
          type="button"
          className="flex gap-3.5"
          onClick={() => onNext('recruitment')}
        >
          <span className="text-2xl font-bold">모집글</span>
          <Image src="/admin/arrow.svg" alt="바로가기" width={18} height={14} />
        </button>
        <button
          type="button"
          className="flex gap-3.5"
          onClick={() => onNext('description')}
        >
          <span className="text-2xl font-bold">소개글</span>
          <Image src="/admin/arrow.svg" alt="바로가기" width={18} height={14} />
        </button>
      </div>

      <PrevButton onClick={onBack} className="mt-4">
        동아리 다시 선택하기
      </PrevButton>
    </div>
  );
}

export default StepSelectContent;
