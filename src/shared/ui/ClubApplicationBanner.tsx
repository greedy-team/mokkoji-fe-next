'use client';

import Link from 'next/link';
import Image from 'next/image';
import { toast } from 'react-toastify';
import { useSession } from '@/shared/lib/session-context';
import cn from '@/shared/lib/utils';

interface ClubApplicationBannerProps {
  universityCode: string;
  className?: string;
}

function ClubApplicationBanner({
  universityCode,
  className,
}: ClubApplicationBannerProps) {
  const { session } = useSession();

  const handleClick = (event: React.MouseEvent) => {
    if (!session) {
      event.preventDefault();
      toast.error('로그인이 필요합니다.');
    }
  };

  return (
    <Link
      href={`/${universityCode}/club-application`}
      onClick={handleClick}
      className={cn(
        'bg-lightmode-tag flex w-full items-center justify-between rounded-lg pt-3.5 pr-[15px] pb-[13px] pl-3 transition-opacity hover:opacity-90',
        className,
      )}
    >
      <span className="text-text-primary text-sm font-medium tracking-[-0.03em]">
        동아리/동아리장 신청하기
      </span>
      <Image
        src="/club-application/arrowRight.svg"
        alt=""
        width={8}
        height={12}
        aria-hidden="true"
      />
    </Link>
  );
}

export default ClubApplicationBanner;
