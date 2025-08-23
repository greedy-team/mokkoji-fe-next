'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import ManageModal from './manage-modal';
import { ManageClub } from '../model/type';
import cn from '../lib/utils';

interface HeaderManageModalProps {
  manageClubInfo: ManageClub[];
  menu: string;
  onItemClick?: () => void;
}

function HeaderManageModal({
  manageClubInfo,
  menu,
  onItemClick,
}: HeaderManageModalProps) {
  const { data: session, status } = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const pathname = usePathname();

  const isRegisterActive = pathname.startsWith('/club-register');
  const isRecruitmentActive = pathname.startsWith('/post-recruitment');

  const isActive =
    (menu === 'register' && isRegisterActive) ||
    (menu === 'recruitment' && isRecruitmentActive);

  return (
    <div className="h-full">
      {status === 'authenticated' && session.user ? (
        <>
          <button
            onClick={() => {
              setIsModalOpen(true);
              if (onItemClick) {
                onItemClick();
              }
            }}
            className={cn(
              'relative z-[70] mx-1 flex h-full cursor-pointer items-center px-2 no-underline transition-colors duration-500 hover:border-b-2 hover:border-[#585858] lg:mx-1 lg:px-2 lg:py-2 lg:hover:border-b-2',
              {
                'ml-2 w-fit font-extrabold lg:border-b-3 lg:border-black':
                  isActive,
              },
            )}
          >
            {menu === 'register' ? '동아리 정보 수정' : '모집 공고 작성'}
          </button>
          <ManageModal
            open={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            manageClubInfo={manageClubInfo}
            menu={menu}
          />
        </>
      ) : null}
    </div>
  );
}

export default HeaderManageModal;
