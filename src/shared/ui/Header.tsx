'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

function Header() {
  const pathname = usePathname();

  return (
    <header className="flex h-[78px] items-center border-b border-b-[#D6D6D6] px-[150px] text-base font-semibold">
      <Link href="/" className="mr-9 flex items-center text-2xl font-bold">
        <div className="mr-4 h-5 w-5 bg-gray-100" />{' '}
        {/* 로고 이미지로 대체되어야함. */}
        Mokkoji
      </Link>
      <nav className="flex h-full items-center">
        <Link
          href="/clubs"
          className={`flex h-full items-center px-3.25 no-underline ${pathname === '/clubs' ? 'border-b-3' : ''}`}
        >
          전체 동아리
        </Link>
        <Link
          href="/recruit"
          className={`relative flex h-full items-center px-3.25 no-underline ${pathname === '/recruit' ? 'border-b-3' : ''}`}
        >
          모집 공고
        </Link>
        <Link
          href="/favorite"
          className={`flex h-full items-center px-3.25 no-underline ${pathname === '/favorite' ? 'border-b-3' : ''}`}
        >
          즐겨찾기
        </Link>
      </nav>
      <div className="ml-auto flex items-center gap-3.5">
        <span className="text-base font-light text-[#9C9C9C]">
          <span className="font-semibold">모꼬지님!</span> 안녕하세요
        </span>
        <img
          src="/header/search.svg"
          alt="검색"
          className="h-5 w-5 cursor-pointer"
        />
      </div>
    </header>
  );
}

export default Header;
