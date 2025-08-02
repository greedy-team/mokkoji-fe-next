import Link from 'next/link';
import React from 'react';
import HeaderSearch from '@/features/header/ui/header-search';
import HeaderLogin from '@/features/header/ui/header-login';
import NavButton from './nav-button';

function Header() {
  return (
    <>
      <div className="h-[65px]" />
      <header className="fixed top-0 right-0 left-0 z-50 flex h-[60px] items-center bg-white text-base font-semibold shadow-md sm:px-8 lg:px-[150px]">
        <Link
          href="/"
          className="mr-9 flex items-center gap-1.5 text-2xl font-bold"
        >
          <img
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
          <NavButton label="즐겨찾기" href="/favorite" />
          <NavButton label="동아리 등록" href="/club-register" />
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
