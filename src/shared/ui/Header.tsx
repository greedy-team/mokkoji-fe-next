import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import HeaderSearch from '@/features/header/ui/header-search';
import HeaderLogin from '@/features/header/ui/header-login';
import { auth } from '@/auth';
import NavButton from './nav-button';
import { UserRole } from '../model/type';
import HeaderManageModal from './header-manage-modal';
import MoblieHeader from './moblie-header';

async function Header() {
  const session = await auth();
  const role = session?.role;

  return (
    <>
      <div className="h-[65px]" />
      <header className="fixed top-0 right-0 left-0 z-50 flex h-[60px] items-center border-b border-gray-100 bg-white px-4 text-base font-semibold shadow-sm sm:px-8 lg:px-[150px]">
        <Link
          href="/"
          className="mr-2 flex flex-shrink-0 items-center gap-1 text-lg font-bold sm:mr-4 sm:gap-1.5 sm:text-xl lg:mr-6 lg:text-2xl"
        >
          <Image
            src="/header/mokkojiLogo.svg"
            alt="모꼬지 로고"
            width={24}
            height={24}
            className="h-5 w-5 sm:h-6 sm:w-6 lg:h-6 lg:w-6"
          />
          <span>Mokkoji</span>
        </Link>
        <nav className="ml-6 hidden h-full flex-1 items-center gap-1 overflow-hidden whitespace-nowrap md:flex lg:gap-2 xl:gap-3">
          <NavButton label="전체 동아리" href="/club" />
          <NavButton label="모집 공고" href="/recruit" />
          <NavButton label="즐겨찾기" href="/favorite?page=1&size=6" />
          <NavButton label="고객센터" href="/support" />
          {role &&
            role !== UserRole.NORMAL &&
            (role === UserRole.CLUB_ADMIN || role === UserRole.GREEDY_ADMIN ? (
              <NavButton label="동아리 등록" href="/club-register" />
            ) : (
              <HeaderManageModal
                manageClubInfo={session?.manageClubInfo || []}
                menu="register"
              />
            ))}
          {role &&
            (role === UserRole.CLUB_ADMIN ||
              role === UserRole.GREEDY_ADMIN) && (
              <HeaderManageModal
                manageClubInfo={session?.manageClubInfo || []}
                menu="recruitment"
              />
            )}
        </nav>
        <div className="ml-auto flex flex-shrink-0 items-center gap-1 sm:gap-2 lg:gap-3">
          <HeaderLogin />
          <HeaderSearch />
          <MoblieHeader
            sessionRole={role}
            manageClubInfo={session?.manageClubInfo || []}
          />
        </div>
      </header>
    </>
  );
}

export default Header;
