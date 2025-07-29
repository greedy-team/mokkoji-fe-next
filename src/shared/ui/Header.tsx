'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import React from 'react';
import { useSession } from 'next-auth/react';
import NavButton from './nav-button';

function Header() {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <>
      <div className="h-[65px]" />
      <header className="fixed top-0 right-0 left-0 z-50 flex h-[60px] items-center border-b border-b-[#D6D6D6] bg-white px-[150px] text-base font-semibold">
        <Link href="/" className="mr-9 flex items-center text-2xl font-bold">
          <div className="mr-4 h-5 w-5 bg-gray-100" />{' '}
          {/* 로고 이미지로 대체되어야함. */}
          Mokkoji
        </Link>
        <nav className="flex h-full items-center gap-6 whitespace-nowrap">
          <NavButton
            label="전체 동아리"
            href="/club"
            active={pathname === '/club'}
          />
          <NavButton
            label="모집 공고"
            href="/recruit"
            active={pathname.startsWith('/recruit')}
          />
          <NavButton
            label="즐겨찾기"
            href="/favorite"
            active={pathname === '/favorite'}
          />
          <NavButton
            label="동아리 등록"
            href="/club-register"
            active={pathname === '/club-register'}
          />
          <NavButton
            label="고객센터"
            href="/support"
            active={pathname === '/support'}
          />
        </nav>
        <div className="ml-auto flex items-center gap-3.5">
          <span className="text-base font-light text-[#9C9C9C]">
            {session?.user?.name ? (
              <span className="flex gap-2 font-semibold whitespace-nowrap">
                <span className="font-bold text-gray-400">
                  {session?.user?.name}님!
                </span>
                안녕하세요
              </span>
            ) : (
              <Link href="/login?callbackUrl=/" className="whitespace-nowrap">
                로그인
              </Link>
            )}
          </span>
          <Link href="/search">
            <Image
              src="/header/search.svg"
              alt="검색"
              width={20}
              height={20}
              className="cursor-pointer"
            />
          </Link>
        </div>
      </header>
    </>
  );
}

export default Header;
