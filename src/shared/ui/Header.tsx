import Link from 'next/link';
import React from 'react';
import HeaderSearch from '@/features/header/ui/header-search';
import HeaderLogin from '@/features/header/ui/header-login';
import { auth } from '@/auth';
import Image from 'next/image';
import NavButton from './nav-button';
import { ManageClub, UserRole } from '../model/type';
import HeaderManageModal from './header-manage-modal';
import getClubManageInfo from '../api/manage-api';

async function Header() {
  const session = await auth();
  const role = session?.role;
  const accessToken = session?.accessToken;

  let manageClubInfo: ManageClub[] = [];
  if (accessToken && role && role !== UserRole.NORMAL) {
    try {
      const res = await getClubManageInfo(accessToken);
      manageClubInfo = res.data.clubs;
    } catch (e) {
      console.error('Failed to fetch manage clubs', e);
    }
  }

  return (
    <>
      <div className="h-[65px]" />
      <header className="fixed top-0 right-0 left-0 z-50 flex h-[60px] items-center bg-white text-base font-semibold shadow-md sm:px-8 lg:px-[150px]">
        <Link
          href="/"
          className="mr-9 flex items-center gap-1.5 text-2xl font-bold"
        >
          <Image
            src="/header/mokkojiLogo.svg"
            alt="모꼬지 로고"
            width={24}
            height={24}
          />
          <span>Mokkoji</span>
        </Link>
        <nav className="scrollbar-hide flex h-full items-center gap-4 overflow-auto whitespace-nowrap">
          <NavButton label="전체 동아리" href="/club/all" />
          <NavButton label="모집 공고" href="/recruit" />
          <NavButton label="즐겨찾기" href="/favorite?page=1&size=6" />
          {role && accessToken && role !== UserRole.NORMAL && (
            <HeaderManageModal
              manageClubInfo={manageClubInfo}
              menu="register"
            />
          )}
          {role && accessToken && role !== UserRole.NORMAL && (
            <HeaderManageModal
              manageClubInfo={manageClubInfo}
              menu="recruitment"
            />
          )}
          <NavButton label="고객센터" href="/support" />
        </nav>
        <div className="ml-auto flex items-center gap-3.5">
          <HeaderLogin />
          <HeaderSearch />
        </div>
      </header>
    </>
  );
}

export default Header;
