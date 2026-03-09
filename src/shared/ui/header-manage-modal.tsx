'use client';

import { useState } from 'react';
import { useSession } from '@/shared/lib/session-context';
import { usePathname } from 'next/navigation';
import ManageModal from './manage-modal';
import { ManageClub } from '../model/type';
import cn from '../lib/utils';

interface HeaderManageModalProps {
  manageClubInfo: ManageClub[];
  manageAction: 'register' | 'recruitment';
  onItemClick?: () => void;
}

function HeaderManageModal({
  manageClubInfo,
  manageAction,
  onItemClick,
}: HeaderManageModalProps) {
  const { session, status } = useSession();
  const isAuthenticated = status === 'authenticated';
  const [isModalOpen, setIsModalOpen] = useState(false);
  const pathname = usePathname();

  const isRegisterActive = pathname.startsWith('/club-register');
  const isRecruitmentActive = pathname.startsWith('/post-recruitment');

  const isActive =
    (manageAction === 'register' && isRegisterActive) ||
    (manageAction === 'recruitment' && isRecruitmentActive);

  return (
    <div className="h-full">
      {isAuthenticated && session?.user ? (
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
            {manageAction === 'register'
              ? '동아리 정보 수정'
              : '모집 공고 작성'}
          </button>
          <ManageModal
            open={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            manageClubInfo={manageClubInfo}
            manageAction={manageAction}
          />
        </>
      ) : null}
    </div>
  );
}

export default HeaderManageModal;
