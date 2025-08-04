'use client';

import Image from 'next/image';
import FavoriteButton from '@/shared/ui/favorite-button';

interface RecruitDetailHeaderControlProps {
  instagram: string;
  clubId: number;
  isFavorite: boolean;
}
function RecruitDetailHeaderControl({
  instagram,
  isFavorite,
  clubId,
}: RecruitDetailHeaderControlProps) {
  return (
    <div className="mt-5 mb-10 flex flex-row items-center gap-3.5">
      <div className="rounded-full border-1 border-black p-1">
        <FavoriteButton
          clubId={clubId.toString()}
          isFavorite={isFavorite}
          customClass="flex items-center justify-center cursor-pointer"
        />{' '}
      </div>

      <button
        className="cursor-pointer rounded-full border-1 border-black p-1"
        onClick={() => window.open(instagram, '_blank')}
      >
        <Image
          src="/detail/instaIcon.svg"
          alt="인스타그램"
          width={25}
          height={25}
        />
      </button>
    </div>
  );
}

export default RecruitDetailHeaderControl;
