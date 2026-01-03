'use client';

import { Button } from '@/shared/ui/button';
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
    <div className="flex w-full flex-col items-center gap-10">
      <div className="flex flex-col items-center gap-2">
        <p className="text-sm text-gray-400">{clubName}</p>
        <p className="text-xl font-semibold">어떤 글을 작성하시겠습니까?</p>
      </div>

      <div className="flex flex-col items-center gap-4">
        <Button
          variant="optionsBlackGround"
          size="none"
          onClick={() => onNext('recruitment')}
        >
          모집 공고
        </Button>
        <Button
          variant="optionsBlackGround"
          size="none"
          onClick={() => onNext('description')}
        >
          소개글
        </Button>
      </div>

      <Button variant="options" size="none" onClick={onBack} className="mt-4">
        이전으로
      </Button>
    </div>
  );
}

export default StepSelectContent;
