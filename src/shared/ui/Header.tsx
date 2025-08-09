'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import HeaderSearch from '@/features/header/ui/header-search';
import HeaderLogin from '@/features/header/ui/header-login';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import NavButton from './nav-button';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

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

        {/* 태블릿/데스크탑 네비게이션 */}
        <nav className="hidden h-full flex-1 items-center justify-center gap-1 overflow-hidden whitespace-nowrap md:flex lg:gap-2 xl:gap-3">
          <NavButton label="전체 동아리" href="/club/all" />
          <NavButton label="모집 공고" href="/recruit" />
          <NavButton label="즐겨찾기" href="/favorite?page=1&size=6" />
          <NavButton label="동아리 등록" href="/club-register" />
          <NavButton label="고객센터" href="/support" />
        </nav>

        <div className="ml-auto flex flex-shrink-0 items-center gap-1 sm:gap-2 lg:gap-3">
          <HeaderLogin />
          <HeaderSearch />

          {/* 모바일 햄버거 메뉴 버튼 */}
          <button
            onClick={toggleMenu}
            className="rounded-md p-2 hover:bg-gray-100 md:hidden"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* 모바일 메뉴 오버레이 */}
      {isMenuOpen && (
        <div className="fixed top-[60px] right-0 left-0 z-40 border-t border-gray-100 bg-white shadow-lg md:hidden">
          <nav className="flex flex-col py-4">
            <NavButton label="전체 동아리" href="/club/all" isMobile />
            <NavButton label="모집 공고" href="/recruit" isMobile />
            <NavButton
              label="즐겨찾기"
              href="/favorite?page=1&size=6"
              isMobile
            />
            <NavButton label="동아리 등록" href="/club-register" isMobile />
            <NavButton label="고객센터" href="/support" isMobile />
          </nav>
        </div>
      )}
    </>
  );
}

export default Header;
