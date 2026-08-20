'use client';

import Image from 'next/image';
import FavoriteButton from '@/shared/ui/favorite-button';
import detailBorderIcon from '@/shared/assets/images/detail/border.svg';
import detailInstagramIcon from '@/shared/assets/images/detail/instaIcon.svg';
import detailLinkGrayIcon from '@/shared/assets/images/detail/linkGray.svg';

interface ClubDetailHeaderControlProps {
  instagram: string;
  clubId: number;
  isFavorite: boolean;
}
function ClubDetailHeaderControl({
  instagram,
  isFavorite,
  clubId,
}: ClubDetailHeaderControlProps) {
  return (
    <div className="flex w-full origin-left scale-90 flex-row items-center gap-4 lg:scale-100 lg:flex-row-reverse">
      <FavoriteButton
        clubId={clubId}
        isFavorite={isFavorite}
        customClass="w-[23px] h-[23px] flex items-center justify-center cursor-pointer"
      />

      <Image src={detailBorderIcon} alt="경계선" width={1} height={24} />

      <button
        className="cursor-pointer rounded-full bg-[#F7F7F7] px-5 py-2"
        onClick={() => window.open(instagram, '_blank')}
      >
        <div className="flex items-center gap-3">
          <Image
            src={detailInstagramIcon}
            alt="인스타그램"
            width={20}
            height={20}
          />
          <span className="text-xs">Instagram</span>
          <Image
            className="ml-2"
            src={detailLinkGrayIcon}
            alt="링크"
            width={16}
            height={14}
          />
        </div>
      </button>
    </div>
  );
}

export default ClubDetailHeaderControl;
