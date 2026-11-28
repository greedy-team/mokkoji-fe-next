'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'react-toastify';
import useUniversityCode from '@/shared/hooks/use-university-code';
import { UserRole } from '@/shared/model/type';
import { useSession } from '@/shared/lib/session-context';
import cn from '@/shared/lib/utils';

interface HeaderAdminLinkProps {
  isLoggedIn: boolean;
  className?: string;
}

const ALLOWED_ROLES = [
  UserRole.GREEDY_ADMIN,
  UserRole.CLUB_ADMIN,
  UserRole.CLUB_MASTER,
];

function HeaderAdminLink({ isLoggedIn, className }: HeaderAdminLinkProps) {
  const universityCode = useUniversityCode();
  const router = useRouter();
  const { session } = useSession();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();

    if (!isLoggedIn) {
      toast.info('로그인을 먼저 진행해 주세요.');
      return;
    }

    const role = session?.role;
    if (role && ALLOWED_ROLES.includes(role)) {
      router.push(`/${universityCode}/admin`);
    } else {
      toast.warning('관리자 전용 페이지입니다!');
    }
  };

  return (
    <Link
      href={`/${universityCode}/admin`}
      className={cn('flex items-center font-semibold', className)}
      onClick={handleClick}
    >
      동아리 관리
      <span className="ml-2 rounded-[40px] border border-[#22CF64] px-[10px] py-[7px] text-[11px] font-extrabold text-[#22CF64]">
        관리자용
      </span>
    </Link>
  );
}

export default HeaderAdminLink;
