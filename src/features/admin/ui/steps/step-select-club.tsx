'use client';

import { Button } from '@/shared/ui/button';
import type { AdminClubInfo } from '../../model/types';

interface StepSelectClubProps {
  clubs: AdminClubInfo[];
  onNext: (clubId: number, clubName: string) => void;
}

function StepSelectClub({ clubs, onNext }: StepSelectClubProps) {
  return (
    <div className="flex w-full flex-col items-center gap-10">
      <p className="text-xl font-semibold">
        동아리 등록/모집 공고를 작성할 동아리를 선택해주세요!
      </p>

      <div className="flex w-full flex-col items-center gap-4">
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
