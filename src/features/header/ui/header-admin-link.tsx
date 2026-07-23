'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'react-toastify';
import useUniversityCode from '@/shared/hooks/useUniversityCode';
import { ApiResponse, UserRole } from '@/shared/model/type';

interface HeaderAdminLinkProps {
  isLoggedIn: boolean;
}

const ALLOWED_ROLES = [
  UserRole.GREEDY_ADMIN,
  UserRole.CLUB_ADMIN,
  UserRole.CLUB_MASTER,
];

function HeaderAdminLink({ isLoggedIn }: HeaderAdminLinkProps) {
  const universityCode = useUniversityCode();
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(false);

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();

    if (!isLoggedIn) {
      toast.info('로그인을 먼저 진행해 주세요.');
      return;
    }

    if (isChecking) return;

    setIsChecking(true);
    try {
      const response = await fetch('/api/users/role');
      const body: ApiResponse<{ role: UserRole }> = await response.json();
      const role = body.data?.role;

      if (role && ALLOWED_ROLES.includes(role)) {
        router.push(`/${universityCode}/admin`);
      } else {
        toast.warning('관리자 전용 페이지입니다!');
      }
    } catch {
      toast.warning('관리자 전용 페이지입니다!');
    } finally {
      setIsChecking(false);
    }
  };

  return (
    <Link
      href={`/${universityCode}/admin`}
      className="flex items-center font-semibold"
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
