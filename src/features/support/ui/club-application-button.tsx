'use client';

import Link from 'next/link';
import Image from 'next/image';
import { toast } from 'react-toastify';
import { useSession } from '@/shared/lib/session-context';

interface ClubApplicationButtonProps {
  universityCode: string;
}

function ClubApplicationButton({ universityCode }: ClubApplicationButtonProps) {
  const { session } = useSession();

  const handleClick = (e: React.MouseEvent) => {
    if (!session) {
      e.preventDefault();
      toast.error('로그인이 필요합니다.');
    }
  };

  return (
    <Link
      href={`/${universityCode}/club-application`}
      onClick={handleClick}
      className="bg-gray4 mt-6 flex w-full items-center justify-between rounded-md p-4"
    >
      <span className="text-text-primary text-sm lg:text-base">
        동아리/동아리장 신청하기
      </span>
      <Image src="/nextBlack.svg" alt="바로가기" width={8} height={12} />
    </Link>
  );
}

export default ClubApplicationButton;
