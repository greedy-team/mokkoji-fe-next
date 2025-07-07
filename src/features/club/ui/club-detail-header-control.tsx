'use client';

import Image from 'next/image';

interface ClubDetailHeaderControlProps {
  instagramLink: string;
}
function ClubDetailHeaderControl({
  instagramLink,
}: ClubDetailHeaderControlProps) {
  return (
    <div className="mt-2 mb-10 flex flex-row items-center gap-2">
      <Image
        src="/instagram.svg"
        alt="인스타그램"
        width={30}
        height={30}
        className="cursor-pointer"
        onClick={() => window.open(instagramLink, '_blank')}
      />
    </div>
  );
}

export default ClubDetailHeaderControl;
