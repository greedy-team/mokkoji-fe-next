'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import NavButton from './nav-button';
import HeaderManageModal from './header-manage-modal';
import { ManageClub, UserRole } from '../model/type';
import cn from '../lib/utils';

interface MobileMenuClientProps {
  sessionRole?: string;
  sessionAccessToken?: string;
  manageClubInfo: ManageClub[];
}

function MoblieHeader({
  sessionRole,
  sessionAccessToken,
  manageClubInfo,
}: MobileMenuClientProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <button
        onClick={toggleMenu}
        className="rounded-md p-2 hover:bg-gray-100 md:hidden"
      >
        {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
      </button>
      <div
        className={cn(
          'fixed top-[60px] right-0 left-0 z-40 overflow-hidden border-t border-gray-100 bg-white shadow-lg md:hidden',
          'transition-all duration-500 ease-in-out',
          isMenuOpen ? 'max-h-screen' : 'max-h-0',
        )}
      >
        <nav className="flex flex-col gap-4 py-4">
          <NavButton
            label="전체 동아리"
            href="/club/all"
            onItemClick={closeMenu}
          />
          <NavButton
            label="모집 공고"
            href="/recruit"
            onItemClick={closeMenu}
          />
          <NavButton
            label="즐겨찾기"
            href="/favorite?page=1&size=6"
            onItemClick={closeMenu}
          />

          {sessionRole &&
            sessionAccessToken &&
            sessionRole !== UserRole.NORMAL &&
            (sessionRole === UserRole.CLUB_ADMIN ||
            sessionRole === UserRole.GREEDY_ADMIN ? (
              <NavButton
                label="동아리 등록"
                href="/club-register"
                onItemClick={closeMenu}
              />
            ) : (
              <HeaderManageModal
                manageClubInfo={manageClubInfo}
                menu="register"
                onItemClick={closeMenu}
              />
            ))}
          {sessionRole &&
            sessionAccessToken &&
            sessionRole !== UserRole.NORMAL && (
              <HeaderManageModal
                manageClubInfo={manageClubInfo}
                menu="recruitment"
                onItemClick={closeMenu}
              />
            )}
          <NavButton label="고객센터" href="/support" onItemClick={closeMenu} />
        </nav>
      </div>
    </>
  );
}

export default MoblieHeader;
