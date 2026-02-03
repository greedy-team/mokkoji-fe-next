'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { UserRole } from '@/shared/model/type';

interface HeaderAdminLinkProps {
  role?: UserRole;
  isLoggedIn: boolean;
}

function HeaderAdminLink({ role, isLoggedIn }: HeaderAdminLinkProps) {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent) => {
    if (!isLoggedIn) {
      e.preventDefault();
      toast.info('로그인을 먼저 진행해 주세요.');
      router.push('/login');
      return;
    }

    if (role === UserRole.NORMAL) {
      e.preventDefault();
      toast.warning('관리자 전용 페이지입니다!');
    }
  };

  return (
    <Link
      href="/admin"
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
