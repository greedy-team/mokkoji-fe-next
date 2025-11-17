import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import { auth } from '@/auth';
import getClubManageInfo from '@/shared/api/manage-api';
import NavButton from './nav-button';
import { UserRole } from '../model/type';
import HeaderManageModal from './header-manage-modal';
import HeaderMenuSection from './header-menu-section';

async function Header() {
  const session = await auth();
  const role = session?.role;
  const getClubManageInfoRes = await getClubManageInfo({ role });

  return (
    <>
      <div className="h-[65px]" />
      <header className="fixed top-0 right-0 left-0 z-50 flex h-[60px] items-center bg-white px-4 text-base font-semibold sm:px-8 lg:px-[150px]">
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
          <NavButton label="즐겨찾기" href="/favorite?page=1&size=6" />
          <NavButton label="고객센터" href="/support" />
          {role &&
            role !== UserRole.NORMAL &&
            (role === UserRole.GREEDY_ADMIN || role === UserRole.CLUB_ADMIN ? (
              <NavButton label="동아리 등록" href="/club-register" />
            ) : (
              <HeaderManageModal
                manageClubInfo={getClubManageInfoRes.data?.clubs || []}
                menu="register"
              />
            ))}
          {role &&
            (role === UserRole.CLUB_MASTER ||
              role === UserRole.GREEDY_ADMIN) && (
              <HeaderManageModal
                manageClubInfo={getClubManageInfoRes.data?.clubs || []}
                menu="recruitment"
              />
            )}
        </nav>
        <div className="ml-auto flex flex-shrink-0 items-center gap-1 sm:gap-2 lg:gap-3">
          <HeaderMenuSection role={role} session={session} />
        </div>
        <span className="absolute bottom-0 left-0 h-0.5 w-screen bg-gray-200 transition-colors duration-500" />
      </header>
    </>
  );
}

export default Header;
