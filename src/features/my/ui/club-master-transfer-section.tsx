'use client';

import Image from 'next/image';
import { toast } from 'react-toastify';
import { ManageClub } from '@/shared/model/type';

type ClubMasterTransferSectionProps = {
  clubs: ManageClub[];
};

function ClubMasterTransferSection({ clubs }: ClubMasterTransferSectionProps) {
  if (clubs.length === 0) {
    return null;
  }

  const handleClick = () => {
    toast.info('준비 중');
  };

  return (
    <div className="mb-8 flex flex-col gap-2">
      {clubs.map((club) => (
        <button
          key={club.clubId}
          type="button"
          onClick={handleClick}
          className="bg-gray4 flex items-center justify-between rounded-lg px-4 py-3.5 text-left"
        >
          <span className="text-text-secondary text-sm font-medium">
            {`'${club.clubName}' 동아리장 위임하기`}
          </span>
          <Image src="/nextBlack.svg" alt="" width={8} height={12} />
        </button>
      ))}
    </div>
  );
}

export default ClubMasterTransferSection;
