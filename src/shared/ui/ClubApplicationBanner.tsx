'use client';

import Link from 'next/link';
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
      <svg
        width="8"
        height="12"
        viewBox="0 0 8 12"
        fill="none"
        className="text-text-secondary"
        aria-hidden="true"
      >
        <path
          d="M8 6C8 6.17281 7.9182 6.32489 7.76278 6.45622L1.28425 11.8134C1.13701 11.9378 0.957055 12 0.744376 12C0.327198 12 0 11.7304 0 11.371C0 11.1912 0.0817996 11.0392 0.212679 10.9217L6.16769 6L0.212679 1.07834C0.0817996 0.960829 0 0.801843 0 0.629032C0 0.269585 0.327198 0 0.744376 0C0.957055 0 1.13701 0.062212 1.28425 0.179724L7.76278 5.54378C7.9182 5.6682 8 5.82719 8 6Z"
          fill="currentColor"
        />
      </svg>
    </Link>
  );
}

export default ClubApplicationBanner;
