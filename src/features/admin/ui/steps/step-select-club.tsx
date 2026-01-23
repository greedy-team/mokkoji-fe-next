'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/shared/ui/button';
import { UserRole } from '@/shared/model/type';
import type { AdminClubInfo } from '../../model/types';

interface StepSelectClubProps {
  clubs: AdminClubInfo[];
  role?: UserRole;
  onNext: (clubId: number, clubName: string) => void;
}

function StepSelectClub({ clubs, role, onNext }: StepSelectClubProps) {
  const isGreedyAdmin = role === UserRole.GREEDY_ADMIN;

  return (
    <div className="flex w-full flex-col items-center gap-10">
      <p className="text-center text-base font-semibold lg:text-xl">
        동아리 등록/모집 공고를 작성할 동아리를 선택해주세요!
      </p>

      {isGreedyAdmin && (
        <div className="flex flex-col items-center gap-1">
          <span className="text-xs text-gray-300">
            새로운 동아리를 등록하고 싶으신가요?
          </span>
          <Link
            href="/admin/description/create/0"
            className="flex items-center gap-2"
          >
            <span className="text-base font-bold lg:text-2xl">
              동아리 등록하기
            </span>
            <Image
              src="/admin/arrow.svg"
              alt="바로가기"
              width={18}
              height={14}
              className="h-auto w-4"
            />
          </Link>
        </div>
      )}

      <div className="flex w-full flex-wrap justify-center gap-4 lg:w-[40%]">
        {clubs.map((club) => (
          <Button
            key={club.clubId}
            variant="optionsBlackGround"
            size="none"
            onClick={() => onNext(club.clubId, club.clubName)}
          >
            {club.clubName}
          </Button>
        ))}
      </div>
    </div>
  );
}

export default StepSelectClub;
