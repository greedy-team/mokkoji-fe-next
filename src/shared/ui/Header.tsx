'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import { useSession } from 'next-auth/react';
import NavButton from './nav-button';

function Header() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [showSearch, setShowSearch] = useState(false);
  const wrapperRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setShowSearch(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (!showSearch) {
      wrapperRef.current?.reset();
    }
  }, [showSearch]);

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
          <form
            action="/search"
            method="GET"
            ref={wrapperRef}
            className="flex items-center"
          >
            <input
              type="text"
              name="keyword"
              placeholder="검색어를 입력해주세요"
              className={`border- z-10 border-b-2 px-2 py-2 text-sm transition-all duration-300 ease-in-out outline-none focus-within:border-[#00E804] ${showSearch ? 'mr-2 w-52 opacity-100' : 'w-0 overflow-hidden opacity-0'}`}
              autoComplete="off"
            />
            <button
              type={showSearch ? 'submit' : 'button'}
              onClick={(e) => {
                if (!showSearch) {
                  e.preventDefault();
                  setShowSearch(true);
                }
              }}
              className="flex items-center justify-center"
            >
              <Image
                src="/header/search.svg"
                alt="검색"
                width={20}
                height={20}
                className="cursor-pointer"
              />
            </button>
          </form>
        </div>
      </header>
    </>
  );
}

export default Header;
