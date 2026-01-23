'use client';

import Image from 'next/image';
import { PrevButton } from '@/shared/ui/navigation-button';
import { UserRole } from '@/shared/model/type';
import type { ActionType, ContentType } from '../../model/types';

interface StepSelectEditModeProps {
  clubName?: string;
  contentType?: ContentType;
  role?: UserRole;
  onNext: (actionType: ActionType) => void;
  onBack: () => void;
}

function StepSelectEditMode({
  clubName,
  contentType,
  role,
  onNext,
  onBack,
}: StepSelectEditModeProps) {
  const isDescription = contentType === 'description';
  const isGreedyAdmin = role === UserRole.GREEDY_ADMIN;

  return (
    <div className="flex min-h-[calc(100vh-134px)] w-full flex-col items-center justify-between">
      <div className="flex flex-col items-center gap-2 pt-10">
        <Image
          src="/admin/main_logo.png"
          alt="logo"
          width={329}
          height={119}
          className="h-auto w-[158px] object-contain md:w-[250px]"
        />
        <p className="text-sm text-[#1AE166]">
          권한 | <span className="font-bold">{clubName} 동아리장</span>
        </p>
      </div>

      <div className="flex flex-col items-center gap-5 lg:gap-9">
        {isDescription ? (
          <>
            {isGreedyAdmin && (
              <button
                type="button"
                className="flex gap-2 lg:gap-3.5"
                onClick={() => onNext('create')}
              >
                <span className="text-base font-bold lg:text-2xl">
                  소개글 등록
                </span>
                <Image
                  src="/admin/arrow.svg"
                  alt="바로가기"
                  width={18}
                  height={14}
                  className="h-auto w-4"
                />
              </button>
            )}
            <button
              type="button"
              className="flex gap-2 lg:gap-3.5"
              onClick={() => onNext('edit')}
            >
              <span className="text-base font-bold lg:text-2xl">
                소개글 수정
              </span>
              <Image
                src="/admin/arrow.svg"
                alt="바로가기"
                width={18}
                height={14}
                className="h-auto w-4"
              />
            </button>
          </>
        ) : (
          <>
            <button
              type="button"
              className="flex gap-3.5"
              onClick={() => onNext('create')}
            >
              <span className="text-base font-bold lg:text-2xl">
                모집글 생성
              </span>
              <Image
                src="/admin/arrow.svg"
                alt="바로가기"
                width={18}
                height={14}
                className="h-auto w-4"
              />
            </button>
            <button
              type="button"
              className="flex gap-3.5"
              onClick={() => onNext('edit')}
            >
              <span className="text-base font-bold lg:text-2xl">
                모집글 수정 및 삭제
              </span>
              <Image
                src="/admin/arrow.svg"
                alt="바로가기"
                width={18}
                height={14}
                className="h-auto w-4"
              />
            </button>
          </>
        )}
      </div>

      <PrevButton onClick={onBack} className="mt-4">
        콘텐츠 다시 선택하기
      </PrevButton>
    </div>
  );
}

export default StepSelectEditMode;
