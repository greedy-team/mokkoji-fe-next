'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';

interface HeaderSearchProps {
  isSearchVisible: boolean;
  setIsSearchVisible: (isSearchVisible: boolean) => void;
}

function HeaderSearch({
  isSearchVisible,
  setIsSearchVisible,
}: HeaderSearchProps) {
  const wrapperRef = useRef<HTMLFormElement>(null);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsSearchVisible(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (!isSearchVisible) {
      wrapperRef.current?.reset();
    }
  }, [isSearchVisible]);

  return (
    <form
      action="/search"
      method="GET"
      ref={wrapperRef}
      className="flex items-center"
    >
      <label htmlFor="header-search" className="sr-only">
        동아리 검색
      </label>
      <input
        id="header-search"
        type="text"
        name="q"
        placeholder="검색어를 입력해주세요"
        required
        className={`border- focus-within:border-primary-500 z-10 border-b-2 bg-white px-2 py-2 text-xs transition-all duration-300 ease-in-out outline-none lg:text-sm ${isSearchVisible ? 'mr-2 w-40 opacity-100 lg:w-52' : 'w-0 overflow-hidden opacity-0'}`}
        autoComplete="off"
      />
      <button
        type={isSearchVisible ? 'submit' : 'button'}
        aria-label={isSearchVisible ? '검색' : '검색창 열기'}
        onClick={(e) => {
          if (!isSearchVisible) {
            e.preventDefault();
            setIsSearchVisible(true);
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
  );
}

export default HeaderSearch;
