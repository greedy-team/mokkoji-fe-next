'use client';

import Link from 'next/link';
import { useState, useRef } from 'react';
import { Button } from '@/shared/ui/button';
import Image from 'next/image';
import useClickOutside from '@/shared/model/useClickOutside';
import { useSession } from '@/shared/lib/session-context';
import {
  ChevronIcon,
  UserIcon,
  LogoutIcon,
} from '@/shared/ui/icons/header-icons';

interface HeaderLoginProps {
  userName: string;
}

function HeaderLogin({ userName: initialUserName }: HeaderLoginProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { status } = useSession();
  const isLoggedIn =
    status === 'authenticated' || (status === 'loading' && !!initialUserName);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useClickOutside(dropdownRef, () => setIsDropdownOpen(false));

  const handleSignOut = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    window.location.href = '/';
  };

  return (
    <span className="rounded-sm p-2 px-4 text-xs font-light text-[#9C9C9C] lg:text-sm">
      {isLoggedIn ? (
        <div className="relative" ref={dropdownRef}>
          <Button
            variant="none"
            size="none"
            onClick={() => setIsDropdownOpen((prev) => !prev)}
            className="flex items-center gap-2 rounded-full px-3 py-1.5 transition-all hover:bg-[#e6e6e6]"
          >
            <Image
              src="/header/profile.svg"
              alt="프로필"
              width={21}
              height={22}
            />
            <ChevronIcon isOpen={isDropdownOpen} />
          </Button>

          {isDropdownOpen && (
            <div className="absolute top-full right-0 z-50 mt-2 min-w-[140px] overflow-hidden rounded-xl bg-[#f1f1f1] py-1 shadow-lg">
              <Button variant="dropdownItem" size="none" asChild>
                <Link href="/my">
                  <UserIcon />
                  마이페이지
                </Link>
              </Button>

              <div className="mx-3 my-1 border-t border-[#d9d9d9]" />

              <Button
                variant="dropdownItemDanger"
                size="none"
                onClick={handleSignOut}
              >
                <LogoutIcon />
                로그아웃
              </Button>
            </div>
          )}
        </div>
      ) : (
        <div className="flex gap-2 whitespace-nowrap">
          <Link href="/login" className="cursor-pointer whitespace-nowrap">
            로그인
          </Link>
        </div>
      )}
    </span>
  );
}

export default HeaderLogin;
