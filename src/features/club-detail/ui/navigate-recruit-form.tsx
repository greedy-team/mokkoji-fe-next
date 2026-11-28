'use client';

import { RecruitStatus } from '@/shared/model/type';
import { Button } from '@/shared/ui/button';
import Link from 'next/link';
import cn from '@/shared/lib/utils';
import postApplyClick from '@/features/club-detail/api/postApplyClick';
import shouldCollectApplyClick from '@/entities/club-detail/util/shouldCollectApplyClick';

interface NavigateRecruitFormProps {
  recruitmentId: number;
  recruitForm: string;
  recruitStatus: RecruitStatus;
}

function NavigateRecruitForm({
  recruitmentId,
  recruitForm,
  recruitStatus,
}: NavigateRecruitFormProps) {
  if (!recruitForm) return null;

  const isDisabled = recruitStatus === 'BEFORE' || recruitStatus === 'CLOSED';

  // 응답을 기다리면 새 탭 열림이 늦어지므로 await하지 않는다.
  const handleApplyClick = () => {
    if (!shouldCollectApplyClick({ recruitForm, recruitStatus })) return;
    postApplyClick(recruitmentId);
  };

  return (
    <Button
      asChild={!isDisabled}
      variant="none"
      size="navi"
      className={cn(
        'mb-21 flex h-[120px] w-[120px] scale-60 flex-col items-center justify-center gap-1.5 rounded-full text-[17px] lg:mb-0 lg:scale-100',
        isDisabled
          ? 'cursor-not-allowed bg-[#D8F6E3] text-white'
          : 'cursor-pointer bg-gradient-to-r from-[#4AF38A] to-[#32E2D0] text-black transition hover:brightness-105',
      )}
    >
      {!isDisabled ? (
        <Link
          href={recruitForm}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center"
          onClick={handleApplyClick}
        >
          <span className="font-extrabold">동아리</span>
          <span className="font-semibold">지원하기</span>
        </Link>
      ) : (
        <div className="flex flex-col items-center justify-center">
          <span className="font-extrabold">동아리</span>
          <span className="font-semibold">지원하기</span>
        </div>
      )}
    </Button>
  );
}

export default NavigateRecruitForm;
