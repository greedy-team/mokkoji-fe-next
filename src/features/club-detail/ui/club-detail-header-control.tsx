'use client';

import Image from 'next/image';
import FavoriteButton from '@/shared/ui/favorite-button';
import { GetClubManageInfoResponse } from '@/shared/model/type';

interface ClubDetailHeaderControlProps {
  instagram: string;
  clubId: number;
  isFavorite: boolean;
  session?: GetClubManageInfoResponse;
}
function ClubDetailHeaderControl({
  instagram,
  isFavorite,
  clubId,
  session,
}: ClubDetailHeaderControlProps) {
  return (
    <div className="mt-5 mb-5 flex w-full flex-row items-center gap-2 lg:gap-3.5">
      <div className="scale-90 rounded-full border-1 border-black p-1 lg:scale-100">
        <FavoriteButton
          clubId={clubId.toString()}
          isFavorite={isFavorite}
          customClass="flex items-center justify-center cursor-pointer"
          session={session}
        />{' '}
      </div>
      <button
        className="scale-90 cursor-pointer rounded-full border-1 border-black p-1 lg:scale-100"
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

export default ClubDetailHeaderControl;
