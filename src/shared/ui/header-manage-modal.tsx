'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import ManageModal from './manage-modal';
import { ManageClub } from '../model/type';

interface HeaderManageModalProps {
  manageClubInfo: ManageClub[];
  menu: string;
}

function HeaderManageModal({ manageClubInfo, menu }: HeaderManageModalProps) {
  const { data: session, status } = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex h-full cursor-pointer items-center px-3 transition-colors duration-500 hover:border-b-2 hover:border-[#585858]">
      {status === 'authenticated' && session.user ? (
        <>
          <button
            onClick={() => setIsModalOpen(true)}
            className="cursor-pointer whitespace-nowrap"
          >
            {menu === 'register' ? '동아리 등록' : '모집 공고 작성'}
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
