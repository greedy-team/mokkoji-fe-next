'use client';

import { Button } from '@/shared/ui/button';
import type { ActionType, ContentType } from '../../model/types';

interface StepSelectActionProps {
  clubName?: string;
  contentType: ContentType;
  onNext: (actionType: ActionType) => void;
  onBack: () => void;
}

function StepSelectAction({
  clubName,
  contentType,
  onNext,
  onBack,
}: StepSelectActionProps) {
  const contentTypeLabel =
    contentType === 'recruitment' ? '모집 공고' : '소개글';

  return (
    <div className="flex w-full flex-col items-center gap-10">
      <div className="flex flex-col items-center gap-2">
        <p className="text-sm text-gray-400">
          {clubName} · {contentTypeLabel}
        </p>
        <p className="text-xl font-semibold">작업을 선택해주세요</p>
      </div>

      <div className="flex flex-col items-center gap-4">
        <Button
          variant="optionsBlackGround"
          size="none"
          onClick={() => onNext('create')}
        >
          새로 작성하기
        </Button>
        <Button
          variant="optionsBlackGround"
          size="none"
          onClick={() => onNext('edit')}
        >
          수정하기
        </Button>
      </div>

      <Button variant="options" size="none" onClick={onBack} className="mt-4">
        이전으로
      </Button>
    </div>
  );
}

export default StepSelectAction;
